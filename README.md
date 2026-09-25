# Portfolio — Isseu Leye

Portfolio personnel d'**Isseu Leye**, développeuse web et étudiante en Licence Informatique (Saint-Louis, Sénégal).

Site statique en HTML, CSS et JavaScript, sans outil de compilation : il s'ouvre directement dans le navigateur.

---

## Fonctionnalités

- Design éditorial noir et doré, **thème clair / sombre** (mémorisé)
- **Version française et anglaise** (bouton FR / EN)
- Projets avec filtres, fenêtre de détails et **page « étude de cas »** pour chacun
- **CV** consultable dans le site et **téléchargeable en PDF** (FR et EN)
- **Formulaire de contact** avec envoi direct (Web3Forms) ou ouverture de la messagerie en secours
- Bouton **« Copier l'email »**
- Statistiques de visites optionnelles (GoatCounter)
- Image d'aperçu pour les partages (WhatsApp, LinkedIn…)
- Responsive, accessible au clavier, animations réduites si le visiteur le demande

---

## Structure

```text
3PORTFOLIO/
├── index.html          Page d'accueil
├── projet.html         Page « étude de cas » (projet.html?p=slug)
├── cv.html             CV (source des PDF)
├── cv/                 CV en PDF (FR et EN)
├── css/style.css       Styles
├── img/                Photos, image d'aperçu (og-image.jpg)
└── js/
    ├── config.js       ⭐ Réglages : liens, clé du formulaire, statistiques
    ├── projects.js     ⭐ Vos projets (FR et EN)
    ├── i18n.js         Traductions anglaises
    ├── icons.js        Icônes (sous-ensemble de Font Awesome Free)
    ├── main.js         Fonctionnement du site
    └── case.js         Fonctionnement de la page étude de cas
```

---

## À compléter

### 1. Vos liens et réglages — `js/config.js`

| Champ | À quoi ça sert |
|---|---|
| `github`, `linkedin` | Vos profils. Tant qu'ils sont vides, les icônes sont masquées. |
| `web3formsKey` | Envoi direct des messages. Créez une clé gratuite sur [web3forms.com](https://web3forms.com) avec votre email et collez-la ici. |
| `goatcounter` | Statistiques de visites. Créez un compte gratuit sur [goatcounter.com](https://www.goatcounter.com) et indiquez votre code. |

### 2. Vos projets — `js/projects.js`

Pour chaque projet, vous pouvez renseigner :

- `images` : vos captures d'écran, par exemple `['img/projets/boutique-1.webp', 'img/projets/boutique-2.webp']`. La première sert de couverture, les suivantes forment la galerie de l'étude de cas. Format conseillé : 1600 × 1000 px, en WebP ou JPG.
- `github` et `demo` : les liens vers le code et la version en ligne. Vides = boutons masqués.
- `challenge` et `learned` : le défi rencontré et ce que vous avez appris, en français (`fr`) et en anglais (`en`). Ces sections n'apparaissent que si elles sont remplies.

Le nombre de projets affiché dans « À propos » se met à jour automatiquement.

### 3. Le CV — `cv.html`

Après modification de `cv.html`, regénérez les PDF :

1. Ouvrez `cv.html?lang=fr` dans Chrome.
2. Ctrl / Cmd + P → Destination « Enregistrer au format PDF ».
3. Marges : **Aucune**, cochez **Graphiques d'arrière-plan**.
4. Enregistrez sous `cv/Isseu-Leye-CV.pdf`.
5. Recommencez avec `cv.html?lang=en` → `cv/Isseu-Leye-CV-EN.pdf`.

### 4. Les traductions — `js/i18n.js`

Le français est écrit dans les pages HTML ; l'anglais est dans `js/i18n.js`. Si vous modifiez un texte français, pensez à mettre à jour sa traduction (même clé `data-i18n`).

---

## Mise en ligne (gratuite)

1. **Retirez les photos originales** (`img/CAP*.png`, plus de 35 Mo) du dossier à publier : le site ne les utilise pas.
2. Au choix :
   - **Netlify** : glissez-déposez le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop).
   - **GitHub Pages** : créez un dépôt, envoyez les fichiers, puis activez *Pages* dans les paramètres.
   - **Vercel** : importez le dossier ou le dépôt GitHub.
3. Une fois l'adresse connue, remplacez dans `index.html` la valeur de `og:image` par l'adresse complète, par exemple `https://isseuleye.netlify.app/img/og-image.jpg`, pour que l'aperçu s'affiche lors des partages.
4. Optionnel : achetez un nom de domaine (par exemple `isseuleye.com`) et reliez-le depuis Netlify ou Vercel.

---

Icônes : [Font Awesome Free](https://fontawesome.com) (licence CC BY 4.0).
