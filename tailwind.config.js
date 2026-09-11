/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Blanc dominant, gris anthracite, et le bleu marine structurant en appui.
        //
        // Le bleu de MARQUE est #004677. Il ne vit plus que dans les logos et le
        // favicon (fichiers SVG d'assets/img/), et n'a volontairement pas de jeton
        // ici : aucun aplat, aucun texte, aucune bordure ne doit le reprendre.
        // Il était trop lumineux pour de grandes surfaces.
        navy: {
          DEFAULT: '#063052', // en-tête, pied de page, titres, boutons pleins
          // Survol. Il ÉCLAIRCIT au lieu d'assombrir : #063052 est déjà si bas en
          // luminance qu'un cran plus sombre virerait au noir en perdant le bleu.
          // Même teinte (206,8°) et même saturation que le fond, écart 1,37 — soit
          // la marche de l'ancien couple #004677/#00325A (1,34), à l'envers.
          deep: '#094575',
        },
        accent: '#0081C5',    // filets, gros display, focus. JAMAIS en texte courant.
        ink: {
          DEFAULT: '#1C1C1E', // texte courant — anthracite
          soft: '#4E545B',    // texte secondaire — 7,9:1 sur blanc
        },
        surface: '#F4F6F7',   // gris très clair des volumes ; le blanc reste dominant
        line: '#CDD5DC',      // filets sur blanc
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Le contraste vient de l'écart de taille : la display n'existe qu'en 400.
        //
        // ÉCHELLE — le rapport de référence est hero/courant, mesuré sur le
        // courant à 17 px, qui ne bouge pas :
        //   grand écran  80/17 = 4,7   (auparavant 4,0, soit pile le plancher)
        //   mobile       46/17 = 2,7   (auparavant 2,24)
        // Le mobile ne peut pas atteindre 4 : il faudrait un hero de 68 px sur
        // un écran de 375 px, soit sept caractères par ligne. 46 px est le
        // plancher le plus haut qui reste lisible.
        //
        // Le maillon faible était h3 : 22 px contre 17 px de courant, soit 1,29,
        // un sous-titre qui ne se distinguait pas du corps. Il passe à 30 px,
        // donc 1,76.
        //
        // Interlignes : serrés sur les grands titres, généreux sur le courant.
        hero: ['clamp(2.875rem, 1.7rem + 5vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '400' }],
        h2: ['clamp(2.125rem, 1.55rem + 2.4vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.015em', fontWeight: '400' }],
        // Plancher à 24 px et non 22 : à 22 px le rapport au courant tombait à
        // 1,29 en mobile, sous le seuil de 1,4 en deçà duquel un sous-titre ne
        // se distingue plus du corps de texte. À 24 px il vaut 1,41.
        h3: ['clamp(1.5rem, 1.24rem + 1.1vw, 1.875rem)', { lineHeight: '1.24', letterSpacing: '-0.008em', fontWeight: '600' }],
        data: ['clamp(2.375rem, 1.8rem + 2vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '400' }],
        // Surtitre à 13 px et non 11,5 : la cible a entre 50 et 60 ans, et
        // 11,5 px en capitales espacées était le plus petit texte du site.
        eyebrow: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.2em', fontWeight: '600' }],
        // PETIT TEXTE — une seule valeur pour tout ce qui est secondaire :
        // pied de page, navigation, légendes. Le site en comptait quatre pour
        // le même rang — 11,5 / 14 / 15 / 16 — sans que rien ne les distingue.
        // Il n'en reste que deux : 13 px pour le surtitre, 15 px pour le reste.
        // `sm` remplace le 0,875rem de Tailwind : les 35 usages suivent seuls.
        sm: ['0.9375rem', { lineHeight: '1.6' }],
        lead: ['clamp(1.125rem, 1.06rem + 0.28vw, 1.3125rem)', { lineHeight: '1.6' }],
        // Le courant ne change pas : 17 px / 1,7 était déjà conforme.
        base: ['1.0625rem', { lineHeight: '1.7' }],
        // Label de bouton : 17 px. Un label de 14 px dans une boîte de 52 px
        // donnait des proportions datées, et la cible a entre 50 et 60 ans.
        btn: ['1.0625rem', { lineHeight: '1', letterSpacing: '0.01em', fontWeight: '500' }],
      },
      // Point de rupture des grilles de LECTURE (deux colonnes de texte).
      // À 1024 px, une grille 5/7 donne des colonnes de 326 px, soit 41
      // caractères ; à 1280 px, 54 caractères. Il faut 1320 px pour que la
      // colonne étroite atteigne 60 caractères, et 1480 px pour la grille 6/6
      // de « Méthode ». En dessous de ce seuil le texte repasse en colonne
      // pleine, où il est plafonné à 72 caractères par max-w-measure.
      // Les largeurs de VOLUME (.v-83, .v-right-72, --split) restent en `lg` :
      // l'élévation est un dispositif d'aplats, pas de lecture.
      screens: {
        lecture: '1480px',
      },
      maxWidth: {
        // 56ch, et non 64. L'unité `ch` vaut la largeur du chiffre zéro —
        // 10,2 px ici — alors qu'un caractère de texte courant français en
        // IBM Plex Sans mesure 7,89 px en moyenne. Un plafond de 64ch laissait
        // donc passer 83 caractères par ligne, très au-dessus des 75 visés :
        // 64 × 10,2 / 7,89 = 83. À 56ch le plafond tombe à 72 caractères.
        // Le rapport se conserve à toutes les tailles, `ch` et largeur moyenne
        // variant ensemble avec la taille de police.
        measure: '56ch',
        page: '1440px',
      },
      // Hiérarchie à trois paliers : léger (boutons), moyen (cartes), marqué
      // (photos, bandes CTA). Les grandes bandes structurelles qui composent
      // le profil en gradins restent carrées — voir tailwind.css.
      borderRadius: {
        none: '0',
        DEFAULT: '0.5rem',
        lg: '0.5rem',   // 8px  — boutons
        xl: '0.75rem',  // 12px — cartes
        '2xl': '1rem',  // 16px — photos, bandes CTA
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        // Zoom lent et continu sur les photos hero/bandeaux, appliqué une seule
        // fois (`both`, pas de répétition) : un zoom qui repart en boucle sur
        // une photo pleine largeur distrairait plus qu'il n'habillerait.
        'ken-burns': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.045)' },
        },
        // Fade sans translation, pour les grands aplats (ex. la boîte de
        // carte) où le glissement de `fade-up` ajoute du mouvement sans
        // ajouter de lisibilité.
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        // Réservé aux chiffres clés (`.data`) : un léger effet de zoom avant
        // qui les distingue du simple glissement du reste de la ligne.
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'ken-burns': 'ken-burns 14s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 700ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'scale-in': 'scale-in 650ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
      },
    },
  },
  safelist: ['btn-ghost'],
  plugins: [],
};
