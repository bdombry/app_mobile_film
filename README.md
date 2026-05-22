# Benjamin Dombry

# CineHub

Application mobile de films et séries réalisée avec React Native, Expo et TypeScript. Le projet utilise uniquement des données locales, sans API distante.

## Fonctionnalités réalisées

- Catalogue local de films et de séries
- Recherche par titre, genre, créateur et tag
- Filtres par type, genre et favoris
- Fiche détail complète avec résumé, tags et retour
- Système de favoris en mémoire
- Formulaire de recommandation avec validation
- Navigation entre l’accueil, le catalogue, la fiche détail et le formulaire

## Difficultés rencontrées

Le principal défi a été de faire cohabiter le routage Expo Router avec les différentes vues sans créer de doublons ni de conflits de navigation. J’ai aussi dû aligner plusieurs filtres et l’état des favoris pour que la recherche reste cohérente dans toute l’application.

## Installation

### Cloner le projet

```bash
git clone <URL_DU_DEPOT>
cd app_mobile_film
```

### Installer et lancer

```bash
npm install
```

Pour lancer le projet :

```bash
npx expo start
```
