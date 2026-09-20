function calculerProgression(apprenant) {
  let totalTermines = 0;
  let totalProposes = 0;

  for (const resultat of apprenant.resultats) {
    totalTermines = totalTermines + resultat.exercicesTermines;
    totalProposes = totalProposes + resultat.totalExercices;
  }

  let pourcentage = 0;

  if (totalProposes > 0) {
    pourcentage = (totalTermines / totalProposes) * 100;
  }

  return {
    totalTermines: totalTermines,
    totalProposes: totalProposes,
    pourcentage: pourcentage
  };
}

function normaliserNom(nom) {
  return nom.trim().toLowerCase();
}

function validerResultat(jour, exercicesTermines, totalExercices) {
  if (jour < 1 || jour > 7) {
    return { valide: false, message: "Le jour doit être compris entre 1 et 7." };
  }

  if (exercicesTermines < 0 || totalExercices < 0) {
    return { valide: false, message: "Les nombres d'exercices ne peuvent pas être négatifs." };
  }

  if (exercicesTermines > totalExercices) {
    return { valide: false, message: "Le nombre d'exercices terminés ne peut pas dépasser le total proposé." };
  }

  return { valide: true, message: "" };
}

function ajouterApprenant(apprenants, apprenantNouveau) {
  for (const apprenant of apprenants) {
    if (apprenant.id === apprenantNouveau.id) {
      return { succes: false, message: "Cet identifiant est déjà utilisé." };
    }
  }

  apprenants.push(apprenantNouveau);
  return { succes: true, message: "Apprenant ajouté avec succès." };
}

function enregistrerResultat(apprenant, jour, exercicesTermines, totalExercices, challengeTermine) {
  const validation = validerResultat(jour, exercicesTermines, totalExercices);

  if (!validation.valide) {
    return { succes: false, message: validation.message };
  }

  for (const resultat of apprenant.resultats) {
    if (resultat.jour === jour) {
      resultat.exercicesTermines = exercicesTermines;
      resultat.totalExercices = totalExercices;
      resultat.challengeTermine = challengeTermine;
      return { succes: true, message: "Résultat mis à jour." };
    }
  }

  apprenant.resultats.push({
    jour: jour,
    exercicesTermines: exercicesTermines,
    totalExercices: totalExercices,
    challengeTermine: challengeTermine
  });

  return { succes: true, message: "Résultat ajouté." };
}

function rechercherApprenant(apprenants, terme) {
  const termeNormalise = normaliserNom(terme);
  const resultats = [];

  for (const apprenant of apprenants) {
    const nomNormalise = normaliserNom(apprenant.nomComplet);
    if (nomNormalise.includes(termeNormalise)) {
      resultats.push(apprenant);
    }
  }

  return resultats;
}

function determinerNiveau(pourcentage) {
  if (pourcentage >= 80) {
    return "Solide";
  } else if (pourcentage >= 50) {
    return "En progression";
  } else {
    return "À renforcer";
  }
}

function filtrerParNiveau(apprenants, niveau) {
  return apprenants.filter(function (apprenant) {
    const progression = calculerProgression(apprenant);
    const niveauApprenant = determinerNiveau(progression.pourcentage);
    return niveauApprenant === niveau;
  });
}

function trierParProgression(apprenants) {
  const copie = [...apprenants];

  return copie.sort(function (a, b) {
    const progA = calculerProgression(a).pourcentage;
    const progB = calculerProgression(b).pourcentage;
    return progB - progA;
  });
}

function trierAlphabetiquement(apprenants) {
  const copie = [...apprenants];

  return copie.sort(function (a, b) {
    const nomA = normaliserNom(a.nomComplet);
    const nomB = normaliserNom(b.nomComplet);
    if (nomA < nomB) return -1;
    if (nomA > nomB) return 1;
    return 0;
  });
}

function afficherTableauDeBord(apprenants) {
  console.log("=== TABLEAU DE BORD ===");
  console.log("Nombre d'apprenants:", apprenants.length);

  let sommeTermines = 0;
  let sommeProposes = 0;
  let nbSolide = 0;
  let nbEnProgression = 0;
  let nbARenforcer = 0;

  for (const apprenant of apprenants) {
    const progression = calculerProgression(apprenant);
    sommeTermines = sommeTermines + progression.totalTermines;
    sommeProposes = sommeProposes + progression.totalProposes;

    const niveau = determinerNiveau(progression.pourcentage);
    if (niveau === "Solide") {
      nbSolide = nbSolide + 1;
    } else if (niveau === "En progression") {
      nbEnProgression = nbEnProgression + 1;
    } else {
      nbARenforcer = nbARenforcer + 1;
    }
  }

  let moyenneGroupe = 0;
  if (sommeProposes > 0) {
    moyenneGroupe = (sommeTermines / sommeProposes) * 100;
  }

  console.log("Progression moyenne du groupe:", moyenneGroupe.toFixed(1), "%");
  console.log("Solide:", nbSolide, "| En progression:", nbEnProgression, "| À renforcer:", nbARenforcer);

  const tries = trierParProgression(apprenants);
  console.log("--- Liste triée ---");

  for (const apprenant of tries) {
    const progression = calculerProgression(apprenant);
    const niveau = determinerNiveau(progression.pourcentage);
    console.log(apprenant.nomComplet, ":", progression.pourcentage.toFixed(1), "% -", niveau);

    const joursManquants = [];
    for (let j = 1; j <= 7; j++) {
      const existe = apprenant.resultats.find(function (r) {
        return r.jour === j;
      });
      if (!existe) {
        joursManquants.push(j);
      }
    }
    console.log("  Jours manquants:", joursManquants.length > 0 ? joursManquants.join(", ") : "aucun");

    const challengesManquants = apprenant.resultats.filter(function (r) {
      return !r.challengeTermine;
    });
    console.log("  Challenges non terminés:", challengesManquants.length);
  }
}

module.exports = {
  calculerProgression,
  normaliserNom,
  validerResultat,
  ajouterApprenant,
  enregistrerResultat,
  rechercherApprenant,
  determinerNiveau,
  filtrerParNiveau,
  trierParProgression,
  trierAlphabetiquement,
  afficherTableauDeBord
};