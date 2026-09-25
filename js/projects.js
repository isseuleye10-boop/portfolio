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
    slug: 'boutique',
    category: 'js',
    accent: '#C6A15B',
    icon: 'bag-shopping',
    tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage'],
    images: [],
    github: '',
    demo: '',
    fr: {
      cat: 'JavaScript',
      name: 'Boutique E-Commerce Interactive',
      short: 'Catalogue dynamique, panier et persistance locale.',
      desc: "Application web simulant une boutique en ligne complète : catalogue dynamique, filtres instantanés, panier d'achat interactif et calcul automatique des montants avec persistance locale.",
      points: ['Gestion du panier en pur JavaScript', 'Sauvegarde des données dans LocalStorage', 'Design adaptatif mobile et ordinateur'],
      challenge: '',
      learned: ''
    },
    en: {
      cat: 'JavaScript',
      name: 'Interactive E-Commerce Store',
      short: 'Dynamic catalogue, cart and local persistence.',
      desc: 'A web app simulating a complete online store: dynamic catalogue, instant filters, interactive shopping cart and automatic totals with local persistence.',
      points: ['Cart logic in plain JavaScript', 'Data saved in LocalStorage', 'Responsive design for mobile and desktop'],
      challenge: '',
      learned: ''
    }
  },
  {
    slug: 'novatech',
    category: 'wp',
    accent: '#6B8CAE',
    icon: 'newspaper-o',
    tech: ['WordPress', 'Elementor', 'SEO On-Page'],
    images: [],
    github: '',
    demo: '',
    fr: {
      cat: 'WordPress',
      name: "NovaTech — Magazine d'actualités",
      short: 'Portail éditorial tech optimisé pour le SEO.',
      desc: "Portail d'actualités technologiques sous WordPress avec mise en page éditoriale soignée, filtres de catégories, optimisation de la vitesse de chargement et formulaires de contact.",
      points: ["Intégration d'un thème sur-mesure", 'Optimisation SEO complète', 'Formulaire de newsletter'],
      challenge: '',
      learned: ''
    },
    en: {
      cat: 'WordPress',
      name: 'NovaTech — News Magazine',
      short: 'SEO-optimised tech editorial portal.',
      desc: 'A WordPress tech news portal with a polished editorial layout, category filters, page-speed optimisation and contact forms.',
      points: ['Custom theme integration', 'Full on-page SEO optimisation', 'Newsletter sign-up form'],
      challenge: '',
      learned: ''
    }
  },
  {
    slug: 'taskmaster',
    category: 'js',
    accent: '#7C9A7E',
    icon: 'list-check',
    tech: ['HTML5', 'CSS3', 'JavaScript ES6+'],
    images: [],
    github: '',
    demo: '',
    fr: {
      cat: 'JavaScript',
      name: 'TaskMaster — Gestion de tâches',
      short: 'Tableau Kanban avec glisser-déposer et priorités.',
      desc: 'Outil interactif de gestion de productivité avec tableau de bord Kanban, création et déplacement de tâches, classement par priorité et sauvegarde locale continue.',
      points: ['Glisser-déposer fluide des tâches', "Gestion par niveau d'urgence", 'Sauvegarde automatique'],
      challenge: '',
      learned: ''
    },
    en: {
      cat: 'JavaScript',
      name: 'TaskMaster — Task Manager',
      short: 'Kanban board with drag-and-drop and priorities.',
      desc: 'An interactive productivity tool with a Kanban board, task creation and drag-and-drop, priority sorting and continuous local saving.',
      points: ['Smooth drag-and-drop of tasks', 'Urgency levels', 'Automatic saving'],
      challenge: '',
      learned: ''
    }
  },
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
  },
  {
    slug: 'afrochic',
    category: 'wp',
    accent: '#A2708F',
    icon: 'shirt',
    tech: ['WordPress', 'WooCommerce', 'Elementor'],
    images: [],
    github: '',
    demo: '',
    fr: {
      cat: 'WordPress',
      name: 'AfroChic — Boutique WooCommerce',
      short: 'E-commerce de mode avec variations et commandes.',
      desc: 'Plateforme e-commerce propulsée par WooCommerce : gestion de catalogue vestimentaire, variations de tailles et couleurs, panier et commandes en ligne.',
      points: ['Catalogue complet avec variations', 'Tunnel de commande fluide', 'Adaptation mobile optimale'],
      challenge: '',
      learned: ''
    },
    en: {
      cat: 'WordPress',
      name: 'AfroChic — WooCommerce Store',
      short: 'Fashion e-commerce with variations and orders.',
      desc: 'A WooCommerce-powered e-commerce platform: clothing catalogue, size and colour variations, cart and online orders.',
      points: ['Full catalogue with variations', 'Smooth checkout flow', 'Optimised for mobile'],
      challenge: '',
      learned: ''
    }
  },
  {
    slug: 'algolab',
    category: 'algo',
    accent: '#8A7FB8',
    icon: 'chart-simple',
    tech: ['Algorithmique', 'JavaScript', 'CSS'],
    images: [],
    github: '',
    demo: '',
    fr: {
      cat: 'Algorithmique',
      name: 'AlgoLab — Visualiseur de tris',
      short: 'Outil pédagogique pour voir les algorithmes en action.',
      desc: 'Application pédagogique pour visualiser le fonctionnement des algorithmes de tri (Bulles, Insertion) et effectuer des conversions de bases numériques (Binaire, Hexadécimal).',
      points: ['Visualisation graphique pas à pas', 'Convertisseur numérique instantané', 'Démonstration des fondamentaux informatiques'],
      challenge: '',
      learned: ''
    },
    en: {
      cat: 'Algorithms',
      name: 'AlgoLab — Sorting Visualiser',
      short: 'A teaching tool to watch algorithms in action.',
      desc: 'An educational app that visualises how sorting algorithms work (Bubble, Insertion) and converts between number bases (Binary, Hexadecimal).',
      points: ['Step-by-step visualisation', 'Instant number-base converter', 'Demonstrates computer-science fundamentals'],
      challenge: '',
      learned: ''
    }
  }
];
