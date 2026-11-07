# recipes-back — consignes pour les agents

## Rôle du projet

Backend NestJS 11 en TypeScript, avec MongoDB/Mongoose. L’application expose une API REST sous `/api` pour l’authentification, les utilisateurs, les aliments, les recettes, les plans hebdomadaires et les listes de courses.

## Architecture

```text
src/
├── api/       # modules, controllers, DTOs et services exposés par l’API
├── domain/    # schémas Mongoose, enums et mappers métier
├── common/    # guards, decorators, configuration et utilitaires partagés
└── database/  # connexion MongoDB et migrations
```

- Garder les controllers minces : validation/transport HTTP dans `api/**/controllers`, logique applicative dans les services.
- Placer les DTOs sous `api/**/dto` et les schémas/enums métier sous `domain/**`.
- Respecter l’indépendance du domaine Food vis-à-vis du domaine Recipe.
- Lorsqu’une relation de recette est créée ou modifiée, préserver l’interdiction des cycles de sous-recettes.
- Utiliser les exceptions NestJS (`BadRequestException`, `UnauthorizedException`, `ForbiddenException`, `NotFoundException`, etc.) et le logger NestJS ; éviter `console.*` dans le code applicatif.
- Toute route protégée doit laisser les guards globaux déterminer l’utilisateur à partir du JWT. Ne pas accepter un `userId` fourni par le client pour choisir la ressource propriétaire.

## Contrats importants

- Lire [`docs/uml/recipe-domain.md`](./docs/uml/recipe-domain.md) et [`docs/uml/food-domain.md`](./docs/uml/food-domain.md) avant toute évolution de schéma.
- Lire [`docs/api/shopping-lists.md`](./docs/api/shopping-lists.md) et [`docs/api/shopping-lists-frontend.md`](./docs/api/shopping-lists-frontend.md) avant toute évolution des listes de courses.
- Le préfixe global est `/api`, la validation globale utilise `ValidationPipe` avec `whitelist` et `transform`, et les routes sont protégées par défaut par JWT.
- Une liste de courses est identifiée par l’utilisateur authentifié et `weekStart`, qui doit être un lundi au format ISO. Le `PUT` remplace le snapshot complet de façon atomique ; le backend ne recalcule pas les ingrédients.
- Les magasins sont des `string[]`, `store` contient le nom exact d’un magasin et `itemKey` doit être stable et unique. Toute évolution vers les articles libres ou l’import de recettes doit conserver la distinction entre snapshot d’ingrédient et article libre, puis mettre à jour les contrats documentés.

## Sécurité et données

- Ne jamais ajouter de secret par défaut en production ; conserver la validation de configuration et les protections Helmet, CORS et throttling existantes.
- Valider strictement les DTOs et les identifiants avant les requêtes MongoDB.
- Ajouter ou vérifier les index et les contraintes d’unicité lorsque le modèle l’exige, notamment pour les ressources par utilisateur et par semaine.
- Les fichiers uploadés vont sous `uploads/`; ne pas ajouter de données réelles au dépôt.
- Les migrations doivent être idempotentes et accompagnées de tests lorsque leur comportement est modifié.

## Commandes

Depuis `recipes-back/` :

```bash
npm install
npm run start:dev
npm run build
npm run lint
npm test
npm run test:e2e
npm run test:cov
```

Pour une modification de service, controller, DTO ou schéma, ajouter/adapter les tests proches du fichier modifié et exécuter au moins `npm run lint`, `npm test` et `npm run build`.
