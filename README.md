# SAS Progress Console

## Description du projet

Ce projet est une application console développée en Node.js dans le cadre du projet final de synthèse du SAS JavaScript de YouCode. Elle permet à un formateur de gérer des apprenants fictifs, de suivre leurs résultats journaliers sur 7 jours, et de visualiser leur progression à travers un tableau de bord.

**Important : ce programme est un outil d'aide pédagogique. Il ne prend aucune décision d'admission ou de réussite. Les niveaux affichés décrivent uniquement les données enregistrées.**

## Structure des données

Chaque apprenant est représenté par un objet contenant :
- `id` : identifiant unique (aucun doublon accepté)
- `nomComplet` : nom de l'apprenant
- `ville` : ville de l'apprenant
- `resultats` : tableau des résultats journaliers

Chaque résultat journalier contient :
- `jour` : numéro du jour (1 à 7)
- `exercicesTermines` : nombre d'exercices terminés
- `totalExercices` : nombre d'exercices proposés
- `challengeTermine` : booléen indiquant si le challenge du jour est terminé

## Fonctionnalités réalisées

- Validation des entrées (jour entre 1 et 7, cohérence des exercices)
- Ajout d'un apprenant (sans doublon d'identifiant)
- Ajout ou mise à jour du résultat d'une journée
- Recherche d'un apprenant par identifiant ou par nom (partiel, insensible à la casse)
- Calcul de la progression individuelle (pourcentage, challenges, jours renseignés)
- Filtrage des apprenants par niveau
- Tri par progression décroissante et tri alphabétique
- Affichage d'un tableau de bord complet (moyenne du groupe, répartition par niveau, liste triée, jours et challenges manquants)
- Menu interactif en console (choix 0 à 9)

## Lancer le programme

Depuis le dossier `projet-final-sas`, exécuter :

```
node src/index.js
```

Le menu principal s'affiche et propose les choix suivants :

```
1. Afficher le tableau de bord
2. Afficher la liste des apprenants
3. Ajouter un apprenant
4. Consulter un apprenant par identifiant
5. Ajouter ou modifier le résultat d'une journée
6. Rechercher un apprenant par nom
7. Filtrer les apprenants par niveau
8. Trier les apprenants par progression décroissante
9. Trier les apprenants par ordre alphabétique
0. Quitter
```

## Lancer les tests

```
node tests/scenarios.js
```

## Scénarios testés

1. Ajout d'un apprenant valide, puis vérification qu'il est bien retrouvé.
2. Mise à jour du résultat d'un jour déjà existant (le résultat est remplacé, pas dupliqué).
3. Calcul de la progression d'un apprenant et recherche de son nom avec une casse différente.
4. Cas invalide : ajout d'un apprenant avec un identifiant déjà utilisé (refusé).
5. Cas invalide : validation d'un résultat incohérent (jour hors de 1 à 7, ou exercices terminés supérieurs au total proposé).

## Conventions retenues

**Calcul de la moyenne du groupe** : la moyenne du groupe est calculée en additionnant tous les exercices terminés de tous les apprenants, puis en les divisant par le total de tous les exercices proposés (et non en faisant la moyenne des pourcentages individuels).

**Données absentes** : si un apprenant n'a aucun résultat enregistré, le total d'exercices proposés est égal à 0. Dans ce cas, la progression est fixée à 0 % pour éviter une division par zéro.

**Jour non renseigné vs challenge non terminé** : un jour absent du tableau `resultats` signifie que la journée n'a pas été renseignée. Un résultat présent avec `challengeTermine: false` signifie que la journée a été renseignée mais que le challenge n'a pas été terminé. Ces deux cas sont affichés séparément dans le tableau de bord.

**Arrondi des pourcentages** : les pourcentages sont affichés avec une décimale (méthode `.toFixed(1)`), par exemple `80.0 %`.

**Seuils des niveaux** :
- Solide : 80 % et plus
- En progression : entre 50 % et 79 %
- À renforcer : moins de 50 %