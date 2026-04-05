# 📊 Rapport d'Analyse - Backend NestJS + MongoDB

> Date : 26 avril 2026
> Projet : recipes-back

---

## Résumé Exécutif

Ce rapport présente une analyse approfondie du projet backend NestJS + MongoDB. Le projet démontre une **architecture solide** avec des patterns professionnels, mais présente des **lacunes de sécurité** importantes qui nécessitent une attention prioritaire.

| Domaine | Score | Status |
|---------|-------|--------|
| **Architecture** | 9/10 | Excellente |
| **Authentication** | 7/10 | Bonne, améliorations nécessaires |
| **Database** | 8/10 | Schémas robustes |
| **API Design** | 8/10 | RESTful propre |
| **Security** | 5/10 | Lacunes critiques |
| **Code Quality** | 8/10 | Type-safe |
| **Dependency Injection** | 10/10 | Parfait |
| **Error Handling** | 7/10 | Cohérent |
| **Configuration** | 6/10 | Basique |
| **Testing** | 3/10 | Couverture faible |

---

## 1. Architecture & Structure du Projet

### ✅ Bonnes Pratiques

**Organisation Domain-Driven Design**

Le projet suit une architecture modulaire claire avec séparation entre `domain/` et `api/` :

```
src/
├── api/                    # Couche présentation
│   ├── auth/
│   ├── food/
│   ├── recipe/
│   └── user/
├── domain/                 # Schémas et règles métier
│   ├── food/
│   ├── recipe/
│   └── user/
└── common/                 # Partagé
    ├── decorators/
    ├── guards/
    └── utils/
```

**Modules bien structurés** — [src/api/auth/](src/api/auth/)
- `controllers/` — Couche présentation thin
- `services/` — Logique métier
- `dto/` — Validation entrée
- `strategies/` — Authentification

**Module global** — [src/database/database.module.ts](src/database/database.module.ts)
```typescript
@Global()
@Module({
    imports: [MongooseModule.forRoot(...)],
    exports: [MongooseModule],
})
export class DatabaseModule {}
```

### ⚠️ Points à Améliorer

1. **Pas de couche Repository abstraite** — Les services injectent directement les modèles Mongoose
2. **Pas de logger centralisé** — Utilisation inconsistante

---

## 2. Authentication & Authorization

### ✅ Bonnes Pratiques

**JWT Strategy robuste** — [src/api/auth/strategies/jwt.strategy.ts](src/api/auth/strategies/jwt.strategy.ts)

```typescript
// filepath: src/api/auth/strategies/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET', 'defaultSecret'),
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userModel.findById(payload.sub).exec()
        if (!user) {
            throw new UnauthorizedException('User not found')
        }
        return user
    }
}
```

- ✅ Bearer token extraction correcte
- ✅ Vérification utilisateur en BD à chaque requête
- ✅ Expiration JWT validée

**Guards globaux** — [src/app.module.ts](src/app.module.ts)

```typescript
// filepath: src/app.module.ts
providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
]
```

**Public Decorator** — [src/common/decorators/public.decorator.ts](src/common/decorators/public.decorator.ts)

```typescript
// filepath: src/common/decorators/public.decorator.ts
export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
```

### 🔴 Problèmes de Sécurité

1. **JWT Secret par défaut dangereux**

```typescript
// filepath: src/api/auth/strategies/jwt.strategy.ts
secretOrKey: config.get<string>('JWT_SECRET', 'defaultSecret')  // 🔴 Fallback non sécurisé
```

2. **Expiration JWT dur-codée**

```typescript
// filepath: src/api/auth/auth.module.ts
signOptions: { expiresIn: '8h' },  // Pas flexible
```

3. **Pas de refresh token** — Après 8h, utilisateurs doivent se reconnecter

4. **Pas de rate limiting** — Vulnérable au brute force

---

## 3. Database & Schémas

### ✅ Bonnes Pratiques

**Schémas Mongoose typés** — [src/domain/food/schemas/food.schema.ts](src/domain/food/schemas/food.schema.ts)

```typescript
// filepath: src/domain/food/schemas/food.schema.ts
@Schema({ collection: 'foods', timestamps: true })
export class Food {
    @Prop({ required: true })
    name: string

    @Prop({ type: Nutrients, required: true })
    nutrientsPer100: Nutrients

    @Prop({ required: true, enum: FoodCategory })
    category: FoodCategory
}
```

**Hooks pré-save pour password** — [src/domain/user/schemas/user.schema.ts](src/domain/user/schemas/user.schema.ts)

```typescript
// filepath: src/domain/user/schemas/user.schema.ts
UserSchema.pre<UserDocument>('save', function (next) {
    if (!this.isModified('password')) return next()
    const saltRounds: number = 10
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})
```

### ⚠️ Points à Améliorer

1. **Pas d'indexes** — Notamment sur `email` dans User pour les requêtes de login
2. **Pas de transactions** pour les opérations atomiques

---

## 4. API Design

### ✅ Bonnes Pratiques

**Thin Controllers** — [src/api/food/controllers/foods.controller.ts](src/api/food/controllers/foods.controller.ts)

```typescript
// filepath: src/api/food/controllers/foods.controller.ts
@Controller('foods')
export class FoodsController {
    constructor(private readonly foodsService: FoodsService) {}

    @Roles(UserRole.ADMIN)
    @Post()
    async create(@Body() createFoodDto: CreateFoodDto): Promise<Food> {
        return this.foodsService.create(createFoodDto)
    }
}
```

**DTOs avec validation** — [src/api/food/dto/food.dto.ts](src/api/food/dto/food.dto.ts)

```typescript
// filepath: src/api/food/dto/food.dto.ts
class CreateFoodDto {
    @IsString()
    name: string

    @ValidateNested()
    @Type(() => NutrientsDto)
    nutrientsPer100: NutrientsDto
}
```

**Upload sécurisé** — [src/api/recipe/recipe.module.ts](src/api/recipe/recipe.module.ts)

```typescript
// filepath: src/api/recipe/recipe.module.ts
MulterModule.register({
    storage: diskStorage({
        destination: './uploads/recipes',
        filename: (req, file, cb) => {
            const uuid = uuidv4()
            cb(null, `${uuid}${extname(file.originalname)}`)
        },
    }),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
            return cb(new BadRequestException('Format non supporté'), false)
        }
        cb(null, true)
    },
    limits: { fileSize: 5 * 1024 * 1024 },
})
```

### ⚠️ Points à Améliorer

1. **Pas de pagination** — `findAll()` retourne tous les documents
2. **Pas de versioning API** — `/api/foods` sans version

---

## 5. Sécurité

### ✅ Bonnes Pratiques

**ValidationPipe global** — [src/main.ts](src/main.ts)

```typescript
// filepath: src/main.ts
app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
}))
```

**Regex escape** — [src/common/utils/regex.util.ts](src/common/utils/regex.util.ts)

```typescript
// filepath: src/common/utils/regex.util.ts
export function escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
```

### 🔴 Lacunes Critiques (Maintenant corrigé)

1. **Pas de rate limiting** — ~~Vulnérable au brute force~~ ✅ CORRIGÉ avec @nestjs/throttler
2. **Pas de CORS explicite** — ~~Configuration par défaut~~ ✅ CORRIGÉ avec configuration via helmet + CORS
3. **Pas de helmet headers** — ~~Aucune protection contre attaques communes~~ ✅ CORRIGÉ avec helmet.js
4. **Pas de CSRF protection**

---

## 6. Qualité du Code

### ✅ Bonnes Pratiques

**Logging structuré** — [src/api/food/services/foods.service.ts](src/api/food/services/foods.service.ts)

```typescript
// filepath: src/api/food/services/foods.service.ts
private readonly logger = new Logger(FoodsService.name)

this.logger.log(`✅ Created food - ID: ${foodIdStr}, name: "${saved.name}"`)
```

**Enums stricts** — [src/domain/food/enums/food-category.enum.ts](src/domain/food/enums/food-category.enum.ts)

```typescript
// filepath: src/domain/food/enums/food-category.enum.ts
export enum FoodCategory {
    ANIMAL_PROTEINS = 'animal_proteins',
    BEVERAGES = 'beverages',
    // ...
}
```

**Détection de cycles** — [src/api/recipe/services/recipe-sub-recipes.service.ts](src/api/recipe/services/recipe-sub-recipes.service.ts)

```typescript
// filepath: src/api/recipe/services/recipe-sub-recipes.service.ts
private async wouldCreateCycle(parentId: string, childId: string): Promise<boolean> {
    const visited = new Set<string>()
    const stack = [childId]
    while (stack.length > 0) {
        const current = stack.pop()!
        if (visited.has(current)) continue
        visited.add(current)

        if (current === parentId) return true

        const subRecipes = await this.recipeSubRecipeModel.find({
            parentRecipeId: current,
        }).exec()

        for (const sub of subRecipes) {
            stack.push(sub.childRecipeId.toString())
        }
    }
    return false
}
```

### ⚠️ Points à Améliorer

1. **ESLint disable sans justification** — Présent dans plusieurs fichiers
2. **console.error direct** — Au lieu d'utiliser NestJS Logger

---

## 7. Gestion des Erreurs

### ✅ Bonnes Pratiques

**Exceptions standardisées**

```typescript
throw new NotFoundException(`Food with ID ${id} not found`)
throw new BadRequestException('Only one measure can have isDefault set to true')
throw new UnauthorizedException('Invalid credentials')
throw new ForbiddenException('Insufficient permissions')
```

### ⚠️ Points à Améliorer

1. **Pas de global exception filter**
2. **Pas de correlation IDs** pour le tracking

---

## 8. Configuration

### ✅ Bonnes Pratiques

**ConfigModule** — [src/app.module.ts](src/app.module.ts)

```typescript
// filepath: src/app.module.ts
imports: [ConfigModule.forRoot(), DatabaseModule, ApiModule],
```

### ⚠️ Points à Améliorer

1. **Pas de validation config** au démarrage
2. **Pas de .env.example**
3. **Pas de config par environment**

---

## 9. Tests

### ✅ Configuration

**Jest configuré** — [test/jest-e2e.json](test/jest-e2e.json)

### 🔴 Lacunes

1. **Pas de unit tests** pour les services
2. **Pas de tests d'authentification**
3. **Pas de tests de validation DTOs**

---

## 🚀 Recommandations Prioritaires

### 🔴 Critique (Maintenant corrigé)

1. **Rate-limiting** — ~~Vulnérable au brute force sur `/auth/login`~~ ✅ CORRIGÉ
   - `@nestjs/throttler` installé et configuré
   - Login: 5 requêtes/minute (protection brute force)
   - Search: 30 requêtes/minute (protection abuse)

2. **Configurer CORS et Helmet** — ~~Dans `main.ts`~~ ✅ CORRIGÉ
   - Helmet.js ajouté pour security headers
   - CORS configuré (désactivé en production via NGINX)

### 🟠 Haute Priorité (Maintenant corrigé)

3. **Implémenter suite de tests** unitaires pour les services
4. **Valider la configuration** au démarrage de l'application ✅ CORRIGÉ
   - `config.validator.ts` ajouté
   - `.env.example` créé
   - Validation au startup avec class-validator

### 🟡 Moyenne Priorité

5. **Ajouter pagination** aux endpoints `findAll()`
6. **Créer pattern Repository** pour abstraire Mongoose

### 🟢 Basse Priorité

7. **Ajouter versioning API** (`/api/v1/`)
8. **Implémenter Refresh tokens**

---

## Fichiers Clés Analysés

| Fichier | Domaine |
|---------|---------|
| [src/app.module.ts](src/app.module.ts) | Architecture |
| [src/main.ts](src/main.ts) | Configuration |
| [src/api/auth/strategies/jwt.strategy.ts](src/api/auth/strategies/jwt.strategy.ts) | Auth |
| [src/api/auth/services/auth.service.ts](src/api/auth/services/auth.service.ts) | Auth |
| [src/common/guards/roles.guard.ts](src/common/guards/roles.guard.ts) | Sécurité |
| [src/domain/user/schemas/user.schema.ts](src/domain/user/schemas/user.schema.ts) | Database |
| [src/api/recipe/services/recipes.service.ts](src/api/recipe/services/recipes.service.ts) | API |
| [src/api/food/services/foods.service.ts](src/api/food/services/foods.service.ts) | API |

---

*Rapport généré le 26 avril 2026*
