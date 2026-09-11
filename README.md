# Site EPSIM

Site vitrine statique du cabinet EPSIM, conseil indépendant en immobilier
d'entreprise à Paris.

HTML + Tailwind CSS, multipages, sans framework et sans base de données.
Le dossier peut être déposé tel quel sur n'importe quel hébergement statique ;
l'hébergeur retenu est **Netlify**, dont les coordonnées figurent dans
`mentions-legales.html`.

---

## À faire avant la mise en ligne

- [ ] **Remplacer l'adresse postale restante.** Le téléphone (`01 42 12 04 04`)
      et l'email (`contact@epsim.net`) sont à jour dans les cinq fichiers HTML.
      Il reste `[Adresse à compléter]` à rechercher. Le siège social renseigné
      dans `mentions-legales.html` est le **100 rue de Saussure, 75017 Paris** :
      vérifier que c'est bien aussi l'adresse d'accueil du public avant de la
      reprendre sur la page contact et dans le pied de page.
- [ ] **Remplacer le domaine.** Rechercher `www.epsim.fr` dans les fichiers HTML,
      `robots.txt` et `sitemap.xml`.
- [ ] **Fournir les deux visuels manquants** — substitut de carte et image de
      partage. Voir `PHOTOS-A-FOURNIR.md`.
- [ ] **Compléter le bloc JSON-LD** de `index.html`. L'adresse, le téléphone et
      l'email y sont à jour ; il reste les **coordonnées GPS**, retirées parce
      qu'elles pointaient l'Île de la Cité, à trois kilomètres du siège. Un
      commentaire au-dessus du bloc détaille la réserve restante.

Le **formulaire de contact a été supprimé définitivement** : le cabinet se joint
par téléphone, email et sur rendez-vous. Si un formulaire est un jour réintroduit,
la rubrique « Données personnelles » des mentions légales devient fausse et doit
être réécrite — elle décrit aujourd'hui un site sans aucune collecte.

---

## Direction artistique

### Le système : « l'élévation et la réserve »

Le logo EPSIM est un **volume bâti en aplat, entaillé d'une réserve verticale**.
Le site tout entier en découle, par deux règles appliquées partout.

**1. L'élévation.** Aucune section n'est pleine largeur. Chaque volume a une
largeur déclarée et tous partent du même bord gauche. Seuls les bords droits
varient : la page dessine en descendant un profil en gradins, comme une façade.
Une seule inversion, la bande d'appel au contact, ancre son volume à droite :
c'est le décroché de la façade. Sous 1024 px tout repasse pleine largeur,
l'élévation n'a pas de sens sur un téléphone.

Le profil de la page d'accueil, de haut en bas :

| Section | Largeur | Ce qui rend le bord visible |
|---|---|---|
| Hero | 60 % | la photographie occupe les 40 % restants |
| Trois métiers | 83 % | le bord droit du troisième volume gris |
| Pourquoi EPSIM | pleine largeur | — **aucun bord**, voir ci-dessous |
| Appel au contact | 72 %, **ancré à droite** | l'aplat bleu lui-même |

**Un volume dont le bord ne se voit pas n'existe pas.** Le partage du hero était
bloqué à 68 % au lieu de 60 % — les deux
requêtes média qui définissent `--split` étaient écrites dans le mauvais ordre,
si bien que celle de 1280 px, déclarée avant celle de 1024 px, était écrasée et
n'a jamais rien fait. **Leur ordre dans `src/tailwind.css` est donc à préserver :
le bloc 1280 doit rester après le bloc 1024.**

**« Pourquoi choisir EPSIM » n'a pas de gradin, et c'est délibéré.** Un essai lui
a donné un volume de 58 % marqué par la réserve : le motif s'inversait en barre
bleue pleine sur fond blanc, ne renvoyait plus au logo et se lisait comme un
défaut de mise en page. La section est revenue à deux colonnes pleine largeur,
qui fonctionnent mieux. Trois gradins sur quatre suffisent au profil.

**2. La réserve.** Une fente verticale de largeur constante (`--rsv` : 10 px,
16 px, 24 px selon la taille d'écran). Blanche lorsqu'elle entaille un aplat bleu
— c'est le vide du logo — bleue lorsqu'elle marque une section sur fond blanc,
c'est-à-dire le plein. Elle sert de séparateur entre les trois métiers, de joint
entre les missions, de marqueur de surtitre et de coupe dans le pied de page.
**Sa largeur ne change jamais dans une même page** : c'est ce qui la rend
reconnaissable.

### Le hero, sans voile

Le texte n'est jamais posé sur une photographie assombrie. Il est posé sur un
**fond blanc plein** et la photographie reste **à pleine lumière** à côté,
séparée par la réserve en plein bleu. Un voile translucide à 40-45 % aurait donné
2,14:1 à 2,39:1 sur une photo claire, soit un texte illisible ; aucun réglage
d'opacité ne pouvait fonctionner. Aucun dégradé nulle part, uniquement des aplats.

### Le rythme vertical

Sections à **96 / 128 / 160 px** selon la taille d'écran (`.section-rythme`),
volumes internes au même pas (`.volume-inner`). Le rythme précédent — 80/96/112 —
était celui, serré, d'un site des années 2010 : sur ce registre, la respiration
fait autant que la couleur.

Les **bordures de séparation ont disparu** des listes. Le motif « lignes de
tableau bordées », à 32 ou 40 px de retrait, datait les pages à lui seul. Rien ne
les remplace : l'écart entre les lignes suffit, à 56 puis 64 px (`.ligne-liste`,
dont les retraits sont neutralisés aux extrémités pour ne pas s'ajouter à ceux de
la section).

`.section-rythme-court` (48/64 px) s'applique aux sections qui **précèdent un
aplat coloré** : sans elle, les 160 px de blanc de la section s'ajoutaient aux
96 px de retrait interne de l'aplat, et l'écart montait à 305 px.

---

## Charte

| | |
|---|---|
| Blanc | `#FFFFFF` — fond dominant |
| Bleu marine | `#063052` — aplats, titres, texte fort |
| Bleu marine clair | `#094575` — survols |
| Accent | `#0081C5` |
| Texte courant | `#1C1C1E` |
| Texte secondaire | `#4E545B` |
| Filets | `#CDD5DC` |
| Display | **Instrument Serif** 400 — titres uniquement |
| Courant | **IBM Plex Sans** 400 / 500 / 600 |

### Le bleu de marque ne sert plus qu'au logo

`#004677` était trop lumineux pour de grandes surfaces. Il reste le bleu de la
marque et ne vit plus que dans `logo-epsim.svg`, `logo-epsim-blanc.svg` et
`favicon.svg`. **Aucun aplat, aucun texte, aucune bordure ne doit le reprendre** —
il n'a d'ailleurs volontairement pas de jeton dans `tailwind.config.js`.

### Le survol s'éclaircit

Contre-intuitif, mais imposé par l'arithmétique : `#063052` est si bas en
luminance qu'un cran plus sombre virerait au noir en perdant le bleu. L'écart
plafonnait à 1,25 dans ce sens. `#094575` — même teinte (206,8°), même saturation
— donne un écart de **1,37**, soit exactement la marche de l'ancien couple
`#004677`/`#00325A` (1,34), mais dans l'autre sens.

### La règle de l'accent

`#0081C5` vaut **4,25:1 sur blanc**, **3,92:1 sur le gris des volumes** et
**3,19:1 sur `#063052`**. D'où un interdit et un usage :

- **jamais de texte courant en `#0081C5`**, quel que soit le fond — 4,25:1 est
  déjà sous le seuil AA de 4,5:1 pour le petit texte ;
- **autorisé au-delà de 24 px** (ou 18,66 px en gras), où le seuil AA tombe à
  3:1 — et non textuel au-delà de 3:1 également.

Le passage à `#063052` a levé l'ancien interdit « jamais d'accent sur bleu » :
à 2,31:1 sur `#004677` il était illisible, à 3,19:1 sur `#063052` il passe. C'est
ce qui autorise désormais l'accent **en display sur les aplats bleus** — la
seconde proposition du titre du bandeau d'appel au contact — et **en non textuel**,
comme la réserve du pied de page (`.slot-accent`).

Les boutons pleins restent en `#063052` avec texte blanc (13,53:1), jamais en
accent : celui-ci ne peut pas porter de texte d'interface.

### L'échelle typographique

Le rapport de référence est hero / texte courant, le courant étant fixe à 17 px :

| | Hero | Rapport |
|---|---|---|
| Grand écran | 80 px | **4,7** |
| Mobile | 46 px | **2,7** |

Le mobile ne peut pas atteindre 4 : il faudrait un hero de 68 px sur un écran de
375 px, soit sept caractères par ligne. 46 px est le plancher le plus haut qui
reste lisible.

`h3` est passé de 22 à 30 px, plancher mobile à 24 px. À 22 px contre 17 px de
courant — un rapport de 1,29 — les sous-titres ne se distinguaient pas du corps
de texte ; c'était le maillon faible de l'échelle, plus encore que le hero.

### Le petit texte n'a que deux valeurs

Le site en comptait quatre pour le même rang — 11,5, 14, 15 et 16 px — sans que
rien ne les distingue. Il n'en reste que deux :

| | | |
|---|---|---|
| **13 px** | `text-eyebrow` | surtitres, en capitales espacées |
| **15 px** | `text-sm` | pied de page, navigation, légendes |

Le surtitre était à 11,5 px, le plus petit texte du site, pour une cible qui a
entre 50 et 60 ans. Les libellés d'action — bouton d'en-tête, lien fléché — ont
rejoint le jeton `text-btn` à 17 px, avec les boutons : ce sont des commandes,
pas du texte secondaire.

**Une seule valeur reste sous 16 px sans être un de ces deux jetons** : le `<sup>`
des ordinaux de la page Références (« Paris 2ᵉ »), à 9,8 px. C'est un exposant
typographique, pas du texte à lire.

### La longueur de ligne

Cible 60 à 75 caractères. Deux réglages la gouvernent :

- **`max-w-measure` vaut `56ch`, pas 64.** L'unité `ch` est la largeur du chiffre
  zéro — 10,2 px ici — alors qu'un caractère de texte courant français en mesure
  7,89 en moyenne. Un plafond de 64ch laissait passer **83 caractères**.
- **Le point de rupture `lecture` (1480 px)** commande les grilles à deux
  colonnes de texte. En dessous, le texte repasse en colonne pleine, où le
  plafond le tient à 72 caractères. Une grille 5/7 exige 1320 px pour que sa
  colonne étroite atteigne 60 caractères, une grille 6/6 en exige 1480.

**Les trois métiers font exception, et c'est géométrique** : trois colonnes de
60 caractères demanderaient une fenêtre de 2170 px. Elles plafonnent à 47.

### Les boutons ne reposent jamais sur un contour fin

Un filet d'1 px sur fond blanc est le marqueur le plus sûr d'un dessin des années
2010. Le second niveau est donc un **aplat gris plein** (`.btn-ghost`), et sur les
aplats bleus un **contour franc de 2 px à pleine opacité** (`.btn-outline`) — plus
le contour à 45 % d'opacité de l'ancien bouton d'en-tête, remplacé par un aplat
blanc plein qui s'inverse en bleu au défilement.

Les labels sont à **17 px** dans une boîte de 60 px. À 14 px dans une boîte de
52 px, la proportion était celle de 2015 — et le texte petit pour une cible de
50 à 60 ans.

### Marqueurs numérotés

Les cinq arguments de « Pourquoi choisir EPSIM » **ne portent pas de numéros** :
ils ne forment pas une séquence, l'ordre n'y véhicule aucune information. Chacun
est introduit par la donnée concrète sur laquelle il repose — `30 ans`, `1 seul`,
`Rue par rue`… — soit le fait à la place du rang.

En revanche la **méthode de travail**, page « Nos services », conserve `01`–`05` :
c'est une vraie séquence, l'ordre y est l'information.

---

## Structure

```
index.html                  Accueil
services.html               Nos services
references.html             Références
contact.html                Contact (coordonnées + carte)
mentions-legales.html       Mentions légales (à compléter)

src/tailwind.css            Feuille de style SOURCE — c'est ici qu'on modifie
assets/css/styles.css       Feuille de style COMPILÉE — ne pas éditer à la main
assets/js/main.js           Menu mobile, en-tête au défilement, révélations, carte
assets/fonts/               Instrument Serif + IBM Plex Sans, auto-hébergées
assets/img/                 GÉNÉRÉ par npm run images — ne rien y déposer
assets/img/placeholders/    Placeholders des photos manquantes
images/                     Sources pleine résolution (PDF du logo, photos brutes)
scripts/images.mjs          Recadrage et génération des largeurs JPEG + WebP

tailwind.config.js          Couleurs, typographie, échelles de la charte
package.json                Scripts de compilation
robots.txt  sitemap.xml
PHOTOS-A-FOURNIR.md         Visuels attendus et dimensions
```

**L'en-tête et le pied de page sont dupliqués dans les cinq fichiers HTML.**
C'est volontaire — le site reste modifiable sans outil de construction — mais
cela implique de répercuter toute modification de navigation ou de coordonnées
dans les cinq fichiers.

---

## Modifier le style

`assets/css/styles.css` est **généré**. Toute modification se fait dans
`src/tailwind.css` (composants) ou `tailwind.config.js` (couleurs, tailles),
puis se recompile :

```bash
npm install          # une seule fois
npm run build        # compile assets/css/styles.css
npm run dev          # recompile automatiquement pendant les modifications
npm run serve        # prévisualise le site en local
npm run images       # régénère les images depuis images/ (voir plus bas)
```

Sans Node.js, le binaire autonome de Tailwind (`tailwindcss-macos-arm64`, sur les
releases GitHub du projet) accepte les mêmes commandes.

**Important :** la feuille compilée ne contient que les classes réellement
présentes dans les fichiers HTML au moment de la compilation. Après avoir ajouté
une classe Tailwind, relancer `npm run build`.

---

## Images

`assets/img/` est **généré**. Les photographies pleine résolution vivent dans
`images/` et ne sont jamais servies. `npm run images` (voir `scripts/images.mjs`)
recadre chaque source et produit quatre largeurs — 640, 960, 1280 et 1600 px —
en JPEG et en WebP, plus un fichier de repli sans suffixe.

Chaque emplacement est un `<picture>` : une `<source>` WebP, un `<img>` JPEG en
repli, et le même `sizes` sur les deux. Ce dernier point n'est pas cosmétique.
Sur les hero, la photographie apparaît **deux fois** dans le HTML — une version
bureau en position absolue, une version mobile — et les deux sont téléchargées
même quand l'une est masquée. Des `sizes` identiques les font converger vers le
même candidat, donc vers **une seule requête**. Les désynchroniser doublerait le
téléchargement.

```
sizes="(min-width:1280px) 40vw, (min-width:1024px) 32vw, 100vw"
```

Ces valeurs suivent `--split` : l'image occupe 40 % de la fenêtre au-delà de
1280 px, 32 % entre 1024 et 1280, la pleine largeur en dessous. **Si `--split`
change, ce `sizes` doit changer avec lui**, sinon le navigateur choisit une
largeur pour une autre.

Le fichier de repli est volontairement une largeur **intermédiaire** (1280 px) et
non la plus grande : il est servi là où l'on ne sait rien de la fenêtre ni de la
densité d'écran, il ne doit donc jamais être le plus lourd du jeu.

Poids réellement transmis, fenêtre de 1440 px :

| Page | Avant | Densité 1 | Densité 2 |
|---|---|---|---|
| Accueil | 243 Ko | **29 Ko** | 88 Ko |
| Nos services | 184 Ko | **22 Ko** | 53 Ko |
| Références | 291 Ko | **38 Ko** | 112 Ko |
| Contact | 352 Ko | **85 Ko** | 264 Ko |

Le bandeau de contact reste le plus lourd : pierre de taille, ferronneries,
feuillage et écorce saturent la compression. Il ne descend pas — 222 Ko à
qualité 58 contre 264 à qualité 72, pour une dégradation visible des moulures.

## Accessibilité

Le site vise le niveau **AA** du RGAA / WCAG 2.1 :

- contrastes vérifiés : texte courant 17,0:1, titres et blanc sur bleu 13,5:1,
  texte secondaire 7,7:1 ; l'accent n'apparaît qu'au-delà de 24 px (4,25:1 sur
  blanc, 3,92:1 sur gris, 3,19:1 sur bleu) ou en non textuel ;
- navigation complète au clavier, lien d'évitement en début de page ;
- indicateur de focus visible sur tous les éléments interactifs, en blanc sur les
  aplats bleus où l'accent serait illisible ;
- menu mobile avec piège de focus, `aria-expanded` et fermeture par `Échap` ;
- `prefers-reduced-motion` respecté : toutes les animations sont neutralisées ;
- cibles tactiles d'au moins 44 px ;
- aucune icône emoji — uniquement des SVG avec `aria-hidden`.

Le site reste **entièrement consultable sans JavaScript**. Les états qui en
dépendent sont conditionnés à une classe `.js` posée par un script en ligne du
`<head>` : sans elle, le contenu est visible et l'en-tête reste bleu, donc
lisible. Un délai de sécurité retire cette classe si `main.js` ne s'est pas
exécuté, pour qu'une panne de script ne puisse jamais vider une page.

---

## Vie privée

Aucun cookie, aucune mesure d'audience, aucune requête vers un domaine tiers au
chargement des pages : les polices et le logo sont hébergés localement. La carte
Google Maps n'est chargée qu'après un clic explicite du visiteur.

Si un outil de statistiques est ajouté par la suite, il faudra mettre à jour la
rubrique « Cookies et services tiers » des mentions légales et, selon l'outil,
prévoir un bandeau de consentement.
