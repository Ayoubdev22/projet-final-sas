const progression = require("../src/progression.js");

console.log("=== SCÉNARIO 1 : Ajouter un apprenant valide ===");

const apprenants1 = [];

const nouvelApprenant = {
  id: 10,
  nomComplet: "Test Un",
  ville: "Test Ville",
  resultats: []
};

const resultat1 = progression.ajouterApprenant(apprenants1, nouvelApprenant);
console.log("Résultat:", resultat1);

const trouve = apprenants1.find(function (a) {
  return a.id === 10;
});

if (trouve) {
  console.log("Apprenant retrouvé: OUI");
} else {
  console.log("Apprenant retrouvé: NON");
}

console.log("");
console.log("=== SCÉNARIO 2 : Mettre à jour une journée existante ===");

const apprenantAvecResultat = {
  id: 20,
  nomComplet: "Test Deux",
  ville: "Test Ville",
  resultats: [
    { jour: 1, exercicesTermines: 10, totalExercices: 20, challengeTermine: false }
  ]
};

progression.enregistrerResultat(apprenantAvecResultat, 1, 18, 20, true);

console.log("Nombre de résultats:", apprenantAvecResultat.resultats.length);
console.log("Résultat du jour 1:", apprenantAvecResultat.resultats[0]);

console.log("");
console.log("=== SCÉNARIO 3 : Calculer et rechercher ===");

const farah = {
  id: 30,
  nomComplet: "Farah Tahiri",
  ville: "Nador",
  resultats: [
    { jour: 1, exercicesTermines: 18, totalExercices: 20, challengeTermine: true },
    { jour: 2, exercicesTermines: 14, totalExercices: 20, challengeTermine: false }
  ]
};

const apprenants3 = [farah];

const progressionFarah = progression.calculerProgression(farah);
console.log("Progression de Farah:", progressionFarah.pourcentage, "%");

const rechercheCasseDifferente = progression.rechercherApprenant(apprenants3, "FARAH");

if (rechercheCasseDifferente.length > 0) {
  console.log("Trouvée avec casse différente: OUI");
} else {
  console.log("Trouvée avec casse différente: NON");
}

console.log("");
console.log("=== SCÉNARIO 4 (invalide) : Identifiant déjà utilisé ===");

const apprenants4 = [
  { id: 40, nomComplet: "Premier", ville: "Ville A", resultats: [] }
];

const doublon = { id: 40, nomComplet: "Deuxième", ville: "Ville B", resultats: [] };
const resultat4 = progression.ajouterApprenant(apprenants4, doublon);

console.log("Résultat:", resultat4);

if (resultat4.succes === false) {
  console.log("Ajout refusé: OUI");
} else {
  console.log("Ajout refusé: NON");
}

console.log("");
console.log("=== SCÉNARIO 5 (invalide) : Résultat incohérent ===");

const validationJourInvalide = progression.validerResultat(9, 5, 20);
console.log("Jour hors limites (9):", validationJourInvalide);

const validationExercicesInvalides = progression.validerResultat(3, 25, 20);
console.log("Exercices dépassant le total (25/20):", validationExercicesInvalides);