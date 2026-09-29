/**
 * ============================================================
 *  PROJETS — ajoutez, modifiez ou retirez vos projets ici
 * ============================================================
 *  Ils s'affichent automatiquement sur l'accueil, dans la fenêtre
 *  de détails et sur leur page « étude de cas » (projet.html?p=slug).
 *
 *  - slug      : identifiant court utilisé dans l'adresse de la page
 *  - category  : 'js', 'wp' ou 'algo' (utilisé par les filtres)
 *  - images    : captures d'écran, ex. ['img/projets/boutique-1.webp', ...]
 *                La première sert de couverture. Vide = illustration avec icône.
 *  - github / demo : liens. Vide = bouton masqué.
 *  - challenge / learned : textes de l'étude de cas. Vide = section masquée.
 */
window.PROJECTS = [
  {
    slug: 'le-delice',
    category: 'js',
    accent: '#B5735A',
    icon: 'utensils',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    images: [],
    github: '',
    demo: '',
    fr: {
      cat: 'JavaScript',
      name: 'Le Délice — Restaurant',
      short: 'Site vitrine avec carte interactive et réservation.',
      desc: 'Site vitrine moderne pour un restaurant gastronomique avec carte des plats interactive, galerie photos et module de réservation de table dynamique.',
      points: ['Design élégant et soigné', 'Menu interactif avec filtres', 'Validation de formulaire en direct'],
      challenge: '',
      learned: ''
    },
    en: {
      cat: 'JavaScript',
      name: 'Le Délice — Restaurant',
      short: 'Showcase site with interactive menu and booking.',
      desc: 'A modern showcase website for a fine-dining restaurant with an interactive menu, photo gallery and dynamic table booking.',
      points: ['Elegant, polished design', 'Interactive menu with filters', 'Live form validation'],
      challenge: '',
      learned: ''
    }
  }
];
