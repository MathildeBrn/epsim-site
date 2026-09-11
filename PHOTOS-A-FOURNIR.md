# Photographies à fournir — site EPSIM

Quatre visuels sont en place. Deux restent à fournir — le substitut de carte et
l'image de partage. Le substitut de carte affiche encore un placeholder bleu
clair portant la mention « PHOTO À FOURNIR », dans `assets/img/placeholders/`.

## Comment remplacer une photo

**Ne pas préparer les dimensions à la main, et ne rien déposer dans
`assets/img/` :** ce dossier est désormais *généré*.

1. Déposer la photographie **en pleine résolution** dans `images/`.
2. Ouvrir `scripts/images.mjs` et pointer la bonne entrée du tableau `IMAGES`
   vers le nouveau fichier.
3. Lancer `npm run images`. Le script recadre, produit quatre largeurs
   (640, 960, 1280, 1600 px) en JPEG **et** en WebP, et régénère le fichier de
   repli.
4. Renseigner l'attribut `alt` du `<img>` dans le HTML si la photographie n'est
   pas purement décorative.

Le HTML n'a pas besoin d'être touché tant que le nom de l'image ne change pas :
les `<picture>` référencent déjà tout le jeu de largeurs.

**Le recadrage se fait toujours par le haut.** Sur des prises de vue en
contre-plongée, le haut est du ciel ou un étage sans intérêt, le sujet est en
bas ; un recadrage centré couperait la porte ou le dôme.

**Cadrage, règle générale.** Les photographies ne sont jamais recouvertes d'un
voile : elles sont posées à pleine lumière à côté d'un aplat bleu opaque qui
porte le texte. Aucune zone n'a donc besoin d'être « libre pour du texte ».
En revanche, sur les hero et bandeaux, l'image est **rognée en portrait étroit**
(environ 40 % de la largeur de l'écran sur toute la hauteur du bandeau) :
prévoir un sujet qui supporte un recadrage vertical.

---

## Déjà en place

### 1. Hero de la page d'accueil ✅

| | |
|---|---|
| **Fichier** | `assets/img/hero-accueil.jpg` (1800 × 1013 px, 243 Ko) |
| **Page** | `index.html` |
| **Source** | Photographie fournie par le cabinet |
| **Texte alternatif** | Aucun — image décorative |

### 2. Bandeau « Nos services » ⚠️ image d'attente

| | |
|---|---|
| **Fichier** | `assets/img/bandeau-services.jpg` (1800 × 1198 px, 275 Ko) |
| **Page** | `services.html` |
| **Source** | **Photographie de banque d'images (Unsplash)** — à remplacer par une vue réelle |

Cette image dépanne mais montre un espace de coworking, ce qui n'est pas le
positionnement du cabinet. À remplacer en priorité par un détail architectural
parisien : verrière, hall d'immeuble, escalier.

---

### 3. Bandeau « Références » ✅

| | |
|---|---|
| **Fichier** | `assets/img/bandeau-references.jpg` (1600 × 2000 px, 291 Ko) |
| **Page** | `references.html` |
| **Source** | `images/hero-contact.jpg` (3448 × 5386) — **malgré son nom**, voir la note ci-dessous |
| **Texte alternatif** | Descriptif |

**Sujet.** Immeuble haussmannien d'angle coiffé d'une rotonde à dôme d'ardoise
et lanternon, vu de la rue en contre-plongée.

**Recadrage.** Source très verticale (0,64 contre 0,80 attendu) : 1076 px rognés
**en haut**, soit 20 %, uniquement du ciel vide. La composition y gagne.

**Anonymat vérifié.** Aucune plaque, aucun nom de rue, aucun numéro, aucune
enseigne. Seuls un feu tricolore, un panneau de chantier et des échafaudages
apparaissent. Conforme à l'exigence de la page : aucun bien identifiable.

---

### 4. Bandeau « Contact » ✅

| | |
|---|---|
| **Fichier** | `assets/img/bandeau-contact.jpg` (1400 × 1750 px, 352 Ko) |
| **Page** | `contact.html` |
| **Source** | `images/hero-reference.jpg` (2884 × 4002) — **malgré son nom**, voir la note ci-dessous |
| **Texte alternatif** | Descriptif |

**Sujet.** Façade haussmannienne, porte cochère à deux battants ornée de
médaillons dorés, imposte cintrée en ferronnerie, troncs de platanes.

**Recadrage.** Source plus étroite que le 4:5 attendu (0,72) : 397 px rognés
**en haut**, ce qui écarte une véranda vitrée bleue qui tirait l'œil. La porte
reste centrée et entière.

**Réserve qui subsiste — plaques identifiantes.** L'immeuble porte une plaque
commémorative « Edmond Rostand » et une plaque de rue émaillée, toutes deux
collées au montant droit de la porte. **Les exclure par recadrage est
impossible : l'essai tronque la porte cochère, qui est le sujet même de
l'image.** Elles sont illisibles à la taille d'affichage (570 px de large), mais
elles identifient un immeuble précis, qui n'est pas le siège du cabinet. À
arbitrer : accepter, ou remplacer la photographie.

**Poids.** 352 Ko, au-dessus de la cible de 300 Ko. Cette photographie ne
compresse pas : pierre de taille, ferronneries, feuillage et écorce saturent le
JPEG. Sous la qualité 52 les moulures se délitent, et réduire les dimensions ne
gagne quasiment rien — 1400 px à q62 pèse autant que 1600 px à q52. Le WebP
prévu au bloc 5 est la vraie réponse.

---

## Note — les deux fichiers sources portent des noms permutés

`images/hero-reference.jpg` est la **porte cochère**, qui correspond au brief
« Contact ». `images/hero-contact.jpg` est la **vue urbaine d'angle**, qui
correspond au brief « Références ». Les deux photographies ont donc été
affectées **à l'inverse de leurs noms de fichiers**, conformément aux briefs.

Cette permutation a réglé du même coup le problème d'anonymat : les plaques
identifiantes étaient sur la page Références, dont le titre promet des missions
anonymisées. Elles sont désormais sur la page Contact, où l'exigence est moins
forte.

---

## À fournir

### 5. Visuel de substitution de la carte

| | |
|---|---|
| **Fichier attendu** | `assets/img/carte-substitution.jpg` |
| **Page** | `contact.html` |
| **Dimensions** | **1600 × 700 px** |
| **Poids cible** | < 150 Ko |
| **Texte alternatif** | Aucun — image décorative |

**Rôle.** Affiché à la place de la carte Google Maps tant que le visiteur n'a pas
cliqué sur « Afficher la carte ». Une capture du plan du quartier ou une photo de
la rue du cabinet conviennent. L'image est affichée à 20 % d'opacité sur l'aplat
bleu : privilégier un visuel clair et peu chargé.

---

### 6. Image de partage sur les réseaux sociaux

| | |
|---|---|
| **Fichier attendu** | `assets/img/og-image.jpg` |
| **Pages** | Les cinq pages (balise `og:image`) |
| **Dimensions** | **1200 × 630 px** |
| **Poids cible** | < 200 Ko |

**Rôle.** Vignette affichée lorsqu'un lien du site est partagé (LinkedIn, email,
messageries). Reprendre le hero d'accueil avec le logo blanc posé sur un aplat
bleu `#063052`, dans l'esprit du hero du site. Ce fichier n'existe pas encore.

---

## Recommandations générales

- **Format.** `.jpg` progressif, qualité 70 à 80. Une version `.webp` en plus
  fait gagner environ 30 % de poids.
- **Colorimétrie.** Tons froids, peu saturés, cohérents avec le bleu `#063052`.
  Les images à dominante chaude jurent avec la charte.
- **Droits.** Ne fournir que des photographies dont les droits d'exploitation
  commerciale sont détenus ou acquis. Les crédits sont à reporter dans
  `mentions-legales.html`, rubrique « Crédits ».
- **Personnes.** En cas de personne identifiable, une autorisation écrite de
  droit à l'image est nécessaire.
- **Compression.** Passer les fichiers par Squoosh ou ImageOptim avant dépôt :
  les poids cibles conditionnent la vitesse d'affichage, qui compte dans le
  référencement.

---

## Logo

Le logo a été **extrait du PDF fourni et vectorisé en SVG** (fond transparent).
Trois fichiers, dans `assets/img/` :

| Fichier | Usage |
|---|---|
| `logo-epsim.svg` | Bichrome, aux couleurs de la charte — fonds blancs |
| `logo-epsim-blanc.svg` | Monochrome blanc — aplats bleu nuit |
| `logo-epsim-mono.svg` | Monochrome `currentColor` — pour un usage en SVG inline |
| `favicon.svg` | Volume bâti seul, blanc sur carré bleu nuit |

Les sources d'origine restent dans `images/` et ne sont pas utilisées par le site.
