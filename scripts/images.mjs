/* ---------------------------------------------------------------------------
   Génération des images du site — `npm run images`

   Produit, pour chaque photographie source, un jeu de largeurs en JPEG et en
   WebP. Les fichiers sortent dans assets/img/ et sont référencés par les
   <picture> des pages. Les sources restent dans images/ et ne sont jamais
   servies : elles pèsent de 1 à 4 Mo.

   POURQUOI DES LARGEURS MULTIPLES — sur les hero et bandeaux, l'image occupe
   40 % de la fenêtre au-delà de 1280 px, 32 % entre 1024 et 1280, et la pleine
   largeur en dessous. Un fichier unique de 1800 px était donc servi à un
   emplacement de 570 px CSS : trois fois trop de pixels en densité 1.

   POURQUOI UN RECADRAGE ICI — les sources n'ont pas le rapport d'affichage
   attendu. Le rognage se fait toujours PAR LE HAUT : sur ces prises de vue en
   contre-plongée, le haut est du ciel ou un étage sans intérêt, le sujet est en
   bas. Recadrer par le centre couperait la porte ou le dôme.
   --------------------------------------------------------------------------- */

import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

const LARGEURS = [640, 960, 1280, 1600];
const Q_JPEG = 76;
const Q_WEBP = 72;

const IMAGES = [
  {
    nom: 'hero-accueil',
    source: 'images/hero-accueil-source.jpg',
    rapport: 1800 / 1013,          // paysage, le hero de l'accueil
    page: 'index.html',
  },
  {
    nom: 'bandeau-services',
    source: 'images/the-yardcoworking-hhkbgL35J5I-unsplash.jpg',
    rapport: 1800 / 1198,
    page: 'services.html',
  },
  {
    nom: 'bandeau-references',
    source: 'images/hero-contact.jpg',   // nom de fichier trompeur : voir PHOTOS-A-FOURNIR.md
    rapport: 0.8,                        // portrait 4:5
    page: 'references.html',
  },
  {
    nom: 'bandeau-contact',
    source: 'images/hero-reference.jpg', // idem, les deux sources sont permutées
    rapport: 0.8,
    page: 'contact.html',
  },
];

const ko = (o) => (o / 1024).toFixed(0).padStart(4);

async function poids(p) {
  try { return (await stat(p)).size; } catch { return 0; }
}

await mkdir('assets/img', { recursive: true });

let totalJpeg = 0, totalWebp = 0;

for (const img of IMAGES) {
  const src = sharp(img.source);
  const { width: sw, height: sh } = await src.metadata();

  // Fenêtre au bon rapport, ancrée en BAS de la source.
  let cw = sw, ch = Math.round(sw / img.rapport);
  if (ch > sh) { ch = sh; cw = Math.round(sh * img.rapport); }
  const gauche = Math.round((sw - cw) / 2);
  const haut = sh - ch;

  console.log(`\n${img.nom}  ←  ${img.source}`);
  console.log(`  source ${sw}×${sh}  →  fenêtre ${cw}×${ch} (rognage de ${haut} px par le haut)`);

  for (const L of LARGEURS) {
    if (L > cw) { console.log(`  ${L}px — ignoré, la source n'est pas assez large`); continue; }
    const base = sharp(img.source).extract({ left: gauche, top: haut, width: cw, height: ch })
                                  .resize(L, Math.round(L / img.rapport), { kernel: 'lanczos3' });
    const fj = `assets/img/${img.nom}-${L}.jpg`;
    const fw = `assets/img/${img.nom}-${L}.webp`;
    await base.clone().jpeg({ quality: Q_JPEG, progressive: true, mozjpeg: true }).toFile(fj);
    await base.clone().webp({ quality: Q_WEBP }).toFile(fw);
    const pj = await poids(fj), pw = await poids(fw);
    totalJpeg += pj; totalWebp += pw;
    console.log(`  ${String(L).padStart(4)}px   jpeg ${ko(pj)} Ko   webp ${ko(pw)} Ko   (−${Math.round((1 - pw / pj) * 100)} %)`);
  }

  // Le fichier sans suffixe est le repli du `src`, pour les navigateurs qui
  // ignorent srcset. On prend une largeur INTERMÉDIAIRE, pas la plus grande :
  // ce fichier ne doit jamais être le plus lourd du jeu, puisqu'il est servi
  // là où l'on ne sait rien de la fenêtre ni de la densité d'écran.
  const REPLI = 1280;
  const repli = LARGEURS.filter((L) => L <= Math.min(cw, REPLI)).pop();
  const { copyFile } = await import('node:fs/promises');
  await copyFile(`assets/img/${img.nom}-${repli}.jpg`, `assets/img/${img.nom}.jpg`);
  console.log(`  repli   ${img.nom}.jpg = copie du ${repli}px`);
}

console.log(`\nTotal jeu complet : ${ko(totalJpeg)} Ko en JPEG, ${ko(totalWebp)} Ko en WebP` +
            `  (−${Math.round((1 - totalWebp / totalJpeg) * 100)} %)`);
