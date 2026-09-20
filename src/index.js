const readline = require("readline");
const apprenants = require("./data.js");
const progression = require("./progression.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function afficherMenu() {
  console.log("");
  console.log("SAS PROGRESS CONSOLE");
  console.log("1. Afficher le tableau de bord");
  console.log("2. Afficher la liste des apprenants");
  console.log("3. Ajouter un apprenant");
  console.log("4. Consulter un apprenant par identifiant");
  console.log("5. Ajouter ou modifier le résultat d'une journée");
  console.log("6. Rechercher un apprenant par nom");
  console.log("7. Filtrer les apprenants par niveau");
  console.log("8. Trier les apprenants par progression décroissante");
  console.log("9. Trier les apprenants par ordre alphabétique");
  console.log("0. Quitter");
}

function demarrer() {
  afficherMenu();
  rl.question("Votre choix : ", function (choix) {
    if (choix === "1") {
      progression.afficherTableauDeBord(apprenants);
      demarrer();
    } else if (choix === "2") {
      console.log("--- Liste des apprenants ---");
      for (const apprenant of apprenants) {
        console.log(apprenant.id, "-", apprenant.nomComplet, "-", apprenant.ville);
      }
      demarrer();
    } else if (choix === "3") {
      rl.question("Identifiant : ", function (idTexte) {
        const id = parseInt(idTexte);

        rl.question("Nom complet : ", function (nom) {
          rl.question("Ville : ", function (ville) {
            const nouvelApprenant = {
              id: id,
              nomComplet: nom,
              ville: ville,
              resultats: []
            };

            const resultat = progression.ajouterApprenant(apprenants, nouvelApprenant);
            console.log(resultat.message);

            demarrer();
          });
        });
      });
    } else if (choix === "4") {
      rl.question("Identifiant de l'apprenant : ", function (idTexte) {
        const id = parseInt(idTexte);
        const apprenant = apprenants.find(function (a) {
          return a.id === id;
        });

        if (apprenant) {
          const progressionApprenant = progression.calculerProgression(apprenant);
          console.log("Apprenant trouvé:", apprenant.nomComplet);
          console.log("Progression:", progressionApprenant.pourcentage.toFixed(1), "%");
        } else {
          console.log("Aucun apprenant avec cet identifiant.");
        }

        demarrer();
      });
    } else if (choix === "5") {
      rl.question("Identifiant de l'apprenant : ", function (idTexte) {
        const id = parseInt(idTexte);
        const apprenant = apprenants.find(function (a) {
          return a.id === id;
        });

        if (!apprenant) {
          console.log("Aucun apprenant avec cet identifiant.");
          demarrer();
          return;
        }

        console.log("Apprenant trouvé:", apprenant.nomComplet);

        rl.question("Jour (1 à 7) : ", function (jourTexte) {
          const jour = parseInt(jourTexte);

          rl.question("Exercices terminés : ", function (etTexte) {
            const exercicesTermines = parseInt(etTexte);

            rl.question("Total d'exercices proposés : ", function (teTexte) {
              const totalExercices = parseInt(teTexte);

              rl.question("Challenge terminé (oui/non) : ", function (challengeTexte) {
                const challengeTermine = challengeTexte === "oui";

                const resultat = progression.enregistrerResultat(apprenant, jour, exercicesTermines, totalExercices, challengeTermine);
                console.log(resultat.message);

                demarrer();
              });
            });
          });
        });
      });
    } else if (choix === "6") {
      rl.question("Nom (ou partie du nom) : ", function (terme) {
        const resultats = progression.rechercherApprenant(apprenants, terme);

        if (resultats.length > 0) {
          console.log("--- Résultats de la recherche ---");
          for (const apprenant of resultats) {
            console.log(apprenant.id, "-", apprenant.nomComplet);
          }
        } else {
          console.log("Aucun apprenant trouvé.");
        }

        demarrer();
      });
    } else if (choix === "7") {
      rl.question("Niveau (Solide / En progression / À renforcer) : ", function (niveau) {
        const resultats = progression.filtrerParNiveau(apprenants, niveau);

        if (resultats.length > 0) {
          console.log("--- Apprenants de niveau", niveau, "---");
          for (const apprenant of resultats) {
            const p = progression.calculerProgression(apprenant);
            console.log(apprenant.nomComplet, ":", p.pourcentage.toFixed(1), "%");
          }
        } else {
          console.log("Aucun apprenant à ce niveau.");
        }

        demarrer();
      });
    } else if (choix === "8") {
      const tries = progression.trierParProgression(apprenants);
      console.log("--- Triés par progression décroissante ---");
      for (const apprenant of tries) {
        const p = progression.calculerProgression(apprenant);
        console.log(apprenant.nomComplet, ":", p.pourcentage.toFixed(1), "%");
      }
      demarrer();
    } else if (choix === "9") {
      const tries = progression.trierAlphabetiquement(apprenants);
      console.log("--- Triés par ordre alphabétique ---");
      for (const apprenant of tries) {
        console.log(apprenant.nomComplet);
      }
      demarrer();
    } else if (choix === "0") {
      console.log("Au revoir.");
      rl.close();
    } else {
      console.log("Choix invalide.");
      demarrer();
    }
  });
}

demarrer();