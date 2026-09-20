const apprenants = [
  {
    id: 1,
    nomComplet: "Hamza Faraj",
    ville: "Nador",
    resultats: [
      { jour: 1, exercicesTermines: 18, totalExercices: 20, challengeTermine: true },
      { jour: 2, exercicesTermines: 14, totalExercices: 20, challengeTermine: false }
    ]
  },
  {
    id: 2,
    nomComplet: "Yassine Ramdani",
    ville: "Oujda",
    resultats: [
      { jour: 1, exercicesTermines: 12, totalExercices: 20, challengeTermine: false }
    ]
  },
  {
    id: 3,
    nomComplet: "Salma Idrissi",
    ville: "Fès",
    resultats: [
      { jour: 1, exercicesTermines: 20, totalExercices: 20, challengeTermine: true },
      { jour: 2, exercicesTermines: 19, totalExercices: 20, challengeTermine: true },
      { jour: 3, exercicesTermines: 18, totalExercices: 20, challengeTermine: true }
    ]
  },
  {
    id: 4,
    nomComplet: "Karim Bennani",
    ville: "Tanger",
    resultats: [
      { jour: 1, exercicesTermines: 5, totalExercices: 20, challengeTermine: false },
      { jour: 2, exercicesTermines: 6, totalExercices: 20, challengeTermine: false }
    ]
  }
];

module.exports = apprenants;