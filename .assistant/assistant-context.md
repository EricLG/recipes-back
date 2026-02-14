# Contexte assistant — NestJS v11 & Mongoose 8

Objectif
- Fournir au développeur et au CI un guide concis que j'utilise pour produire du code maintenable, lisible et conforme aux bonnes pratiques NestJS (v11) et Mongoose (v8).

Hypothèses
- NestJS v11, Mongoose 8, TypeScript strict (tsconfig strict = true), ESLint configuré.
- Architecture domain-driven like existing repo (domain, api, dto, services).

Principes généraux
- Contrôleurs: minces — validation/transform via `ValidationPipe({ transform: true, whitelist: true })`.
- Services: toute logique métier, transactions, orchestration d'appels aux repositories/services.
- Repositories: `@InjectModel` + méthodes Mongoose. Utiliser `lean()` pour les listes si on n'a pas besoin des méthodes mongoose.
- DTOs: obligatoires pour tous les inputs (controllers). Utiliser `class-validator` et `class-transformer`.
- Types: éviter `any`. Toujours typer retours et paramètres. Préférer interfaces explicites pour DTOs et résultats.

Spécificités NestJS v11
- Utiliser `@nestjs/mapped-types` pour `PartialType`/`OmitType`.
- Pipes globaux: Validation + transformation pour convertir query strings en bons types (ex: boolean, number, arrays).
- Exceptions: lancer `NotFoundException`, `BadRequestException`, etc. Services -> throw exceptions; controllers restent thin.

Bonnes pratiques Mongoose 8
- Schémas: types explicites, `default`, `required`. Exporter `RecipeDocument = Recipe & Document`.
- Requêtes: préférer `find().sort().limit().lean().exec()` pour listes (meilleure perf). Utiliser `.select()` pour projections quand possible.
- Filtrage: construire un objet `query` robuste; éviter d'injecter des regex non-sanitized depuis l'UI.
- Transactions: utiliser `startSession()` + `session.withTransaction()` pour opérations multi-documents (création avec relations).
- ObjectId: conserver les IDs comme `string` dans les DTOs pour la couche API, convertir côté service/repo avec `new Types.ObjectId(id)` si besoin.

ESLint / Qualité de code
- Pas d'erreurs ESLint: respecter règles du projet (no-unused-vars, no-explicit-any, consistent-return, prefer-readonly, etc.).
- Async/await: n'utiliser que `async/await` — ne pas mélanger callbacks/promise chains sans `await`.
- Logging: utiliser `Logger` NestJS au niveau service. Pas de console.log.

Validation & sécurité
- ValidationPipe global: `transform: true` pour transformer `vegetarian=true` -> boolean.
- Limiter la taille des query params et désinfecter les regex pour éviter ReDoS.
- Valider les enums via `@IsEnum(..., { each: true })` pour arrays.

Tests
- E2E: utiliser `supertest` + app NestJS. Pour DB, préférer `mongodb-memory-server` ou fixtures isolés.
- Unit: mocker `@InjectModel` et tester services sans DB.

Performance & indexation
- Indexer: suggérer d'ajouter des indexes sur `name` (text si recherche fulltext), `category`, `season`, `vegetarian` selon requêtes.
- Pagination: implémenter `limit/skip` ou `cursor-based` pour listes potentiellement larges.

Règles spécifiques pour ce repo
- Respecter la séparation Food vs Recipe: Food domain ne doit jamais dépendre de Recipe.
- RecipeSubRecipe: interdire cycles (vérifier avant création/update).
- Les recettes ne stockent pas la nutrition: calculer dynamiquement.

Workflow assistant
- Je produirai des changements ciblés, petits commits/patches.
- Avant modification majeure, j'ajoute un bref plan et préviens du changement (fichiers et objectif).
- Je corrige les erreurs ESLint apparentes liées au changement; si d'autres erreurs apparaissent, je signale et propose une option.

Exemples rapides (patterns)
- Query filtering: définir un `RecipeFilterDto` et dans controller: `@Query(new ValidationPipe({ transform: true })) filter: RecipeFilterDto` puis passer `filter` au service.
- Safe regex: `escapeRegExp(userInput)` avant `new RegExp()`.
- Upsert relations: utiliser transactions + supprimer les entités absentes dans la DTO.

Si tu veux que j'applique ces règles automatiquement (ex: fixer ESLint, ajouter ValidationPipe global, ajouter tests), dis-moi quelle action prioritaire tu veux.

— Assistant (mode développeur NestJS/Mongoose expérimenté)
