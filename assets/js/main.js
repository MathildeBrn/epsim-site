/* ---------------------------------------------------------------------------
   EPSIM — comportements d'interface.
   Aucune dépendance. Le site reste entièrement consultable sans ce fichier :
   le JavaScript n'ajoute que du confort, jamais du contenu.
   --------------------------------------------------------------------------- */
(function () {
  'use strict';

  // Signale au filet de sécurité du <head> que le script s'est bien exécuté.
  // Sans ce drapeau, la classe `.js` est retirée au bout de 2 s et le contenu
  // s'affiche sans animation plutôt que de rester invisible.
  window.__epsim = true;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------------------
     1. En-tête : bascule en fond blanc une fois le visuel d'en-tête dépassé.
     ------------------------------------------------------------------------- */
  var header = document.getElementById('site-header');

  if (header) {
    var SEUIL = 80;
    var tickEnCours = false;

    var majHeader = function () {
      header.classList.toggle('is-solid', window.scrollY > SEUIL);
      tickEnCours = false;
    };

    window.addEventListener('scroll', function () {
      if (!tickEnCours) {
        tickEnCours = true;
        window.requestAnimationFrame(majHeader);
      }
    }, { passive: true });

    majHeader();
  }

  /* -------------------------------------------------------------------------
     2. Menu mobile : ouverture, fermeture, piège de focus et touche Échap.
     ------------------------------------------------------------------------- */
  var menu = document.getElementById('mobile-menu');
  var boutonOuvrir = document.getElementById('menu-toggle');
  var boutonFermer = document.getElementById('menu-close');

  if (menu && boutonOuvrir && boutonFermer) {
    var SELECTEUR_FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    var ouvrirMenu = function () {
      menu.hidden = false;
      boutonOuvrir.setAttribute('aria-expanded', 'true');
      // Empêche le défilement de la page derrière le panneau.
      document.documentElement.style.overflow = 'hidden';
      boutonFermer.focus();
      document.addEventListener('keydown', gererClavier);
    };

    var fermerMenu = function () {
      menu.hidden = true;
      boutonOuvrir.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      boutonOuvrir.focus();
      document.removeEventListener('keydown', gererClavier);
    };

    var gererClavier = function (e) {
      if (e.key === 'Escape') {
        fermerMenu();
        return;
      }

      if (e.key !== 'Tab') return;

      // Piège de focus : le tabulateur ne sort jamais du panneau ouvert.
      var cibles = Array.prototype.filter.call(
        menu.querySelectorAll(SELECTEUR_FOCUSABLE),
        function (el) { return el.offsetParent !== null; }
      );
      if (!cibles.length) return;

      var premier = cibles[0];
      var dernier = cibles[cibles.length - 1];

      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };

    boutonOuvrir.addEventListener('click', ouvrirMenu);
    boutonFermer.addEventListener('click', fermerMenu);

    // Le panneau n'existe qu'en mobile : on le referme si l'on repasse en desktop.
    window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
      if (e.matches && !menu.hidden) fermerMenu();
    });
  }

  /* -------------------------------------------------------------------------
     3. Cascade automatique : dans un `.reveal-group`, chaque enfant direct
        `.reveal` reçoit un délai croissant (60 ms par défaut, `data-reveal-step`
        sur le groupe pour l'ajuster) sans qu'on ait à l'écrire à la main sur
        chaque élément — c'est exactement ce qui avait produit des délais
        dupliqués par copier-coller. Un `data-reveal-delay` déjà posé à la main
        est toujours respecté et n'est jamais écrasé.
     ------------------------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.reveal-group'), function (groupe) {
    var pas = parseInt(groupe.getAttribute('data-reveal-step'), 10) || 60;
    var enfants = Array.prototype.filter.call(groupe.children, function (el) {
      return el.classList.contains('reveal');
    });
    enfants.forEach(function (el, i) {
      if (!el.hasAttribute('data-reveal-delay')) {
        el.setAttribute('data-reveal-delay', String(i * pas));
      }
    });
  });

  /* -------------------------------------------------------------------------
     4. Révélation au défilement : une seule animation, déclenchée une fois.
        Si le mouvement réduit est demandé ou si l'API n'existe pas,
        tout est affiché immédiatement.
     ------------------------------------------------------------------------- */
  var aReveler = document.querySelectorAll('.reveal');

  if (!aReveler.length) {
    // rien à faire
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(aReveler, function (el) {
      el.style.opacity = '1';
    });
  } else {
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (!entree.isIntersecting) return;
        var el = entree.target;
        var delai = parseInt(el.getAttribute('data-reveal-delay'), 10) || 0;
        el.style.animationDelay = delai + 'ms';
        el.classList.add('is-visible');
        observateur.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(aReveler, function (el) {
      observateur.observe(el);
    });
  }

  /* -------------------------------------------------------------------------
     5. Année courante dans le pied de page.
     ------------------------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-annee]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* -------------------------------------------------------------------------
     6. Carte Google Maps chargée au clic.
        Aucune requête n'est envoyée à Google tant que l'utilisateur n'a pas
        explicitement demandé l'affichage de la carte.
     ------------------------------------------------------------------------- */
  var zoneCarte = document.getElementById('carte-zone');

  if (zoneCarte) {
    var boutonCarte = document.getElementById('carte-charger');

    boutonCarte.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = zoneCarte.getAttribute('data-carte-src');
      iframe.title = 'Carte de localisation du cabinet EPSIM';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      iframe.className = 'absolute inset-0 h-full w-full rounded-xl border-0';
      zoneCarte.innerHTML = '';
      zoneCarte.appendChild(iframe);
      iframe.focus();
    });
  }

  /* -------------------------------------------------------------------------
     7. Bandeau d'information cookies. Purement informatif — ce site ne dépose
        aucun cookie de mesure d'audience ni de publicité, il n'y a donc rien
        à faire accepter ou refuser. Affiché une fois, puis mémorisé.
     ------------------------------------------------------------------------- */
  var bandeauCookies = document.getElementById('info-cookies');

  if (bandeauCookies) {
    var CLE_INFO_COOKIES = 'epsim-info-cookies-vue';
    var dejaVu = false;
    try { dejaVu = !!window.localStorage && !!localStorage.getItem(CLE_INFO_COOKIES); } catch (e) {}

    if (!dejaVu) {
      bandeauCookies.hidden = false;
    }

    document.getElementById('fermer-info-cookies').addEventListener('click', function () {
      bandeauCookies.hidden = true;
      try { localStorage.setItem(CLE_INFO_COOKIES, '1'); } catch (e) {}
    });
  }
})();
