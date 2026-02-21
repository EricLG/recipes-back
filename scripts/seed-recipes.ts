import { RecipeCategory } from '../src/domain/recipe/enums/recipe-category.enum'
import { RecipeSeason } from '../src/domain/recipe/enums/recipe-season.enum'
import { RecipeVegetarianStatus } from './../src/domain/recipe/enums/recipe-vegetarian-status.enum'

// Type pour le seed avec noms d'ingrédients en string
export interface SeedRecipe {
    name: string
    ingredients: {
        ingredient: string // Nom de l'ingrédient (sera résolu vers ObjectId lors de l'import)
        quantity?: number
        unit?: string
    }[]
    instructions: string
    season?: RecipeSeason[]
    vegetarianStatus: RecipeVegetarianStatus
    servings: number
    category: string
}

export const seedRecipes: SeedRecipe[] = [
    {
        name: 'BOWL CAKE',
        ingredients: [
            {
                ingredient: 'Banane, pulpe, crue 100 gr',
                quantity: 80,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier', // À ajouter à seed-ingredients si nécessaire
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Miel de printemps',
                quantity: 0.5,
                unit: 'càc',
            },
            {
                ingredient: 'Lait demi-écrémé',
                quantity: 50,
                unit: 'ml',
            },
            {
                ingredient: 'Whey nutripure',
                quantity: 15,
                unit: 'g',
            },
            {
                ingredient: 'Flocons d\'avoine',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Chocolat Pépites Koro 70%',
                quantity: 10,
                unit: 'g',
            },
        ],
        instructions: 'Au micro-onde pendant 2m30',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 1,
        category: RecipeCategory.BREAKFAST,
    },
    {
        name: 'SHAKER PROTÉINÉ',
        ingredients: [
            {
                ingredient: 'Whey nutripure',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Lait demi-écrémé', // À ajouter à seed-ingredients si nécessaire
                quantity: 125,
                unit: 'ml',
            },
            {
                ingredient: 'Eau', // À ajouter à seed-ingredients si nécessaire
                quantity: 375,
                unit: 'ml',
            },
            {
                ingredient: 'Arôme de banane', // À ajouter à seed-ingredients si nécessaire
                quantity: 1,
                unit: 'dosette',
            },
        ],
        instructions: 'Mélanger le tout en évitant les grumeaux',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 1,
        category: RecipeCategory.DRINK,
    },
    {
        name: 'BOWL PORRIDGE',
        ingredients: [
            {
                ingredient: 'Banane, pulpe, crue 100 gr',
                quantity: 80,
                unit: 'g',
            },
            {
                ingredient: 'Petit Suisse 60 gr',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Miel de printemps',
                quantity: 0.5,
                unit: 'càc',
            },
            {
                ingredient: 'Lait demi-écrémé',
                quantity: 40,
                unit: 'ml',
            },
            {
                ingredient: 'Levure de bière en paillettes',
                quantity: 2,
                unit: 'dosette',
            },
            {
                ingredient: 'Flocons d\'avoine',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Chocolat Pépites Koro 70%',
                quantity: 10,
                unit: 'g',
            },
            {
                ingredient: 'Soja crispies au cacao Koro',
                quantity: 1,
                unit: 'dosette',
            },
            {
                ingredient: 'Psyllium', // À ajouter à seed-ingredients si nécessaire
                quantity: 3,
                unit: 'dosette',
            },
        ],
        instructions: 'Réserver une demi-banane pour le topping. Mélanger le reste des ingrédients',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 1,
        category: RecipeCategory.BREAKFAST,
    },
    {
        name: 'GRANOLA BOWL',
        ingredients: [
            {
                ingredient: 'Petit Suisse 60 gr',
                quantity: 2,
                unit: 'pièce',
            },
            {
                ingredient: 'Sucre de canne Blond',
                quantity: 5,
                unit: 'g',
            },
            {
                ingredient: 'Chocolat Pépites Koro 70%',
                quantity: 10,
                unit: 'g',
            },
            {
                ingredient: 'Soja crispies au cacao Koro',
                quantity: 1,
                unit: 'dosette',
            },
            {
                ingredient: 'Granola Noix & Graines U Céréales',
                quantity: 35,
                unit: 'g',
            },
        ],
        instructions: 'Mélanger les ingrédients et mettre les céréales en topping',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 1,
        category: RecipeCategory.BREAKFAST,
    },
    {
        name: 'COURGETTE FARCIE',
        ingredients: [
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 1200,
                unit: 'g',
            },
            {
                ingredient: 'Poivron rouge, cru',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Fromage de madame Loïc',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Couscous 1/2 complet',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 80,
                unit: 'g',
            },
            {
                ingredient: 'Parmesan',
                quantity: 35,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 10,
                unit: 'ml',
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousse',
            },
            {
                ingredient: 'Epices à couscous',
                quantity: 5,
                unit: 'g',
            },
        ],
        instructions: 'Réhydrater les protéines de soja. Couper la courgette en deux. La vider. Racler la chair pour diminuer l\'épaisseur (conserver environ 1 cm). Blanchir les courgettes : les faire bouillir 8/10 min en les plongeant entièrement dans l\'eau. A la fin de la cuisson, les égoutter à l\'envers. Découper le poivron en petit morceau. Faire revenir l\'ail dans un peu d\'huile, y ajouter la chair de courgette et le poivron. Laisser cuire 5 min. Ajouter le couscous et 50 cl de bouillon. Mélanger. Laisser cuire 10 min. Ajouter le fromage de Madame Loic et les protéines de soja. Farcir les courgettes. Et saupoudrer de parmesan.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'BOWL CAKE SALÉ',
        ingredients: [
            {
                ingredient: 'Fromage blanc nature 3% MG (100 gr)',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Flocons d\'avoine',
                quantity: 45,
                unit: 'g',
            },
            {
                ingredient: 'Gruyère',
                quantity: 25,
                unit: 'g',
            },
            {
                ingredient: 'Sel',
                quantity: 1,
                unit: 'pincée',
            },
        ],
        instructions: 'Mélanger tous les ingrédients ensemble',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 1,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'COUSCOUS',
        ingredients: [
            {
                ingredient: 'Carotte',
                quantity: 360,
                unit: 'g',
            },
            {
                ingredient: 'Poivron rouge, cru',
                quantity: 160,
                unit: 'g',
            },
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Haricots Blanc 280 gr',
                quantity: 280,
                unit: 'g',
            },
            {
                ingredient: 'Couscous 1/2 complet',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Chipolatas U (par 6, 330 gr)',
                quantity: 330,
                unit: 'g',
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 15,
                unit: 'ml',
            },
            {
                ingredient: 'Oignon',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Ail',
                quantity: 3,
                unit: 'gousse',
            },
            {
                ingredient: 'Raz-el-Hanout',
                quantity: 1,
                unit: 'càc',
            },
            {
                ingredient: 'Epices à couscous',
                quantity: 1,
                unit: 'càc',
            },
        ],
        instructions: 'Préparer une sauce tomate. Découper les légumes en morceaux. Faire revenir les légumes dans la sauce tomate. Ajouter 75 cl d\'eau et laisser cuire 40 min, jusqu\'à ce que les légumes soient fondants. Ajouter les haricots blancs et les épices. Pendant ce temps, faire gonfler le couscous et cuire les chipolatas.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'CROQUE-MONSIEURS (10)',
        ingredients: [
            {
                ingredient: 'Pain de mie U (500 g/24 tranches)',
                quantity: 20,
                unit: 'tranches',
            },
            {
                ingredient: 'Jambons 4 tranches 140 gr',
                quantity: 4,
                unit: 'tranches',
            },
            {
                ingredient: 'Fromage Croque emmental x20 - 340 gr',
                quantity: 10,
                unit: 'tranches',
            },
            {
                ingredient: 'Champignons',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Lait demi-écrémé',
                quantity: 250,
                unit: 'ml',
            },
            {
                ingredient: 'Beurre demi sel',
                quantity: 15,
                unit: 'g',
            },
            {
                ingredient: 'Maizena',
                quantity: 20,
                unit: 'g',
            },
            {
                ingredient: 'Parmesan',
                quantity: 20,
                unit: 'g',
            },
        ],
        instructions: 'Préparer une béchamel au parmesan. Pour 1 croque : mettre une cuillère à soupe de béchamel, ajouter 0.4 tranche de jambon, 1 tranche de fromage et la moitié d\'un champignon en rondelles. Pour 4 croques, préparer 15 gr de beurre. En mettre la moitié sur la tranche supérieure des croques, et l\'autre moitié à fondre dans la poêle. Faire cuire 5 min de chaque côté sur feu 7, avec le couvercle. Ou cuire 15 min au four directement sans préchauffage à 180°C.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 5,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'CROQUE-COURGETTE',
        ingredients: [
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 600,
                unit: 'g',
            },
            {
                ingredient: 'Farine T65',
                quantity: 75,
                unit: 'g',
            },
            {
                ingredient: 'Whey nutripure',
                quantity: 15,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Son d\'avoine Markal',
                quantity: 20,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 1, // huile, quantité variable
                unit: 'ml',
            },
            {
                ingredient: 'Jambons 4 tranches 140 gr',
                quantity: 2,
                unit: 'tranches',
            },
            {
                ingredient: 'Fromage Croque emmental x20 - 340 gr',
                quantity: 2,
                unit: 'tranches',
            },
        ],
        instructions: 'Râper finement la chair de courgette. L\'essorer dans un torchon afin d\'en retirer le maximum d\'eau. Mélanger la courgette avec la farine, la whey, le son d\'avoine et l\'oeuf. Utiliser le plateau rectangulaire en métal. Mettre une feuille de papier cuisson et une dose d\'huile. Étaler le mélange uniformément. Découper le rectangle en 4, garnir comme un croque, puis enfourner 10 min à 190°C.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 2,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'CROZIFLETTE',
        ingredients: [
            {
                ingredient: 'Crozets',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Reblochon petit 240 gr',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Crème liquide entière U bio',
                quantity: 100,
                unit: 'ml',
            },
            {
                ingredient: 'Dés de jambon Herta Nature  2x75 gr',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Poireau, cru',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Oignon',
                quantity: 1, // quantité variable
                unit: 'pièce',
            },
        ],
        instructions: 'Faire revenir les poireaux avec un oignon dans un fond d\'eau pendant 15 min. Cuire les crozets pendant 5 min. Égoutter. Dans le moyen rectangulaire, mélanger les crozets, poireaux, dés de jambon, et la crème. Ajouter le reblochon coupé en deux dessus.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'CRUMBLE D\'HIVER',
        ingredients: [
            {
                ingredient: 'Patate douce, crue',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Potimarron',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 50,
                unit: 'g',
            },
            {
                ingredient: 'Paprika',
                quantity: 1, // épice
                unit: 'g',
            },
            {
                ingredient: 'Flocons d\'avoine',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Farine T65',
                quantity: 60,
                unit: 'g',
            },
            {
                ingredient: 'Whey nutripure',
                quantity: 15,
                unit: 'g',
            },
            {
                ingredient: 'Fromage de madame Loïc',
                quantity: 90,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 25,
                unit: 'g',
            },
        ],
        instructions: 'Réhydrater les protéines de soja avec de l\'eau bouillante pendant 15 min minimum. Couper les légumes en cubes (garder la peau sur le potimarron est jeune et bio). Les mettre dans le lèche-frites sur une feuille de papier cuisson. Arroser de 2 doses d\'huile, de paprika puis cuire au four en remuant régulièrement. Préparer le crumble : Dans un saladier, mélanger 90 g de fromage émietté avec les flocons de céréales, la farine et les huiles jusqu\'à obtenir une pâte qu\'il faut émietter dessus les légumes.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'CRUMBLE D\'ÉTÉ',
        ingredients: [
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Champignons',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Moutarde',
                quantity: 15,
                unit: 'ml',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Flocons d\'avoine',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Farine T65',
                quantity: 60,
                unit: 'g',
            },
            {
                ingredient: 'Whey nutripure',
                quantity: 15,
                unit: 'g',
            },
            {
                ingredient: 'Fromage tartare',
                quantity: 90,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 25,
                unit: 'g',
            },
        ],
        instructions: 'Réhydrater les protéines de soja avec de l\'eau bouillante pendant 10 min. Peler l\'oignon et le ciseler finement. Couper les tomates, courgettes en petits cubes. Couper les champignons en 4 ou 6 selon épaisseur. Faire revenir l\'oignon dans une sauteuse avec un peu d\'huile puis ajouter les courgettes. Laisser cuire 10 minutes puis ajouter les tomates, les champignons et la moutarde. Poursuivre la cuisson 5 minutes puis débarrasser dans le plat rectangulaire moyen. Préparer le crumble : Dans un saladier, mélanger le fromage Tartare avec les flocons de céréales, la farine, la whey et l\'huile jusqu\'à obtenir une pâte qu\'il faut émietter dessus les légumes.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'CURRY AMÉRICAIN',
        ingredients: [
            {
                ingredient: 'Riz Basmati semi complet',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Pomme de terre crue',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Crème liquide entière U bio',
                quantity: 100,
                unit: 'ml',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 1,
                unit: 'ml',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Ail',
                quantity: 1,
                unit: 'gousse',
            },
            {
                ingredient: 'Sucre de canne Blond',
                quantity: 5,
                unit: 'g',
            },
            {
                ingredient: 'Curry',
                quantity: 12,
                unit: 'g',
            },
            {
                ingredient: 'Curcuma',
                quantity: 3,
                unit: 'g',
            },
        ],
        instructions: 'Faire revenir l\'oignon et l\'ail dans le wok avec un fond d\'huile. Ajouter les légumes et les protéines. Mélanger bien et couvrir d\'eau. Faire cuire 10/15 min. Ajouter le concentré de tomates, la crème entière, le sucre et les épices. Mélanger bien et laisser cuire 10 min. Servir avec du riz.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'DAHL DE LENTILLES CORAILS',
        ingredients: [
            {
                ingredient: 'Lentilles corails',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Patate douce, crue',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Epinards en branche surgelés',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Crème Soja liquide',
                quantity: 200,
                unit: 'ml',
            },
            {
                ingredient: 'Quinoa Trio en vrac',
                quantity: 180,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 1,
                unit: 'ml',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Gingembre',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Curry',
                quantity: 1,
                unit: 'g',
            },
        ],
        instructions: 'Peler les oignons et les patates douces. Couper en lamelles les oignons et en petits cubes les patates douces. Dans un wok, faire chauffer un filet d\'huile et y faire dorer l\'oignon. Ajouter les épices et faire cuire 1min. Ajouter la crème soja, 350 ml de bouillon ; sel, poivre et porter à ébullition. Ajouter les lentilles et les patates douces. Faire cuire à couvert 20min à petite ébullition. Ajouter les épinards, et cuire encore 10min jusqu\'à ce qu\'ils fondent totalement. Servir avec du quinoa.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'GRATIN COQUILLETTES BUTTERNUT',
        ingredients: [
            {
                ingredient: 'Butternut',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Dés de jambon Herta Nature  2x75 gr',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Ricotta (250 gr)',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Coquillettes 1/2 Complètes',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Gruyère',
                quantity: 30,
                unit: 'g',
            },
        ],
        instructions: 'Couper le butternut en cubes, et la faire cuire comme les patates sautées. Pendant ce temps faire cuire les coquillettes. Mélanger la ricotta avec un oeuf. Mélanger le butternut, les dés de jambon, les coquillettes et ricotta dans le plat rectangulaire moyen. Mettre le gruyère.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'GRATIN DE GNOCCHI VÉGÉTAL',
        ingredients: [
            {
                ingredient: 'Gnocchi à poêler U 300 gr',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Tomates entières en conserve 400 g',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Moutarde',
                quantity: 15,
                unit: 'ml',
            },
            {
                ingredient: 'Sucre de canne Blond',
                quantity: 5,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 1,
                unit: 'ml',
            },
            {
                ingredient: 'Gruyère',
                quantity: 50,
                unit: 'g',
            },
            {
                ingredient: 'Graines de lin',
                quantity: 20,
                unit: 'g',
            },
            {
                ingredient: 'Origan',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Paprika',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
        ],
        instructions: 'Réhydrater les protéines de soja. Faire revenir un oignon avec 1 dose d\'huile. Ajouter les tomates en conserve, le sucre, le paprika, le sel et l\'origan et laisser cuire 5 min. Mélanger tous les éléments dans le plat carré. Ajouter les graines de lin moulues et le gruyère rapé.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 3,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'GRATIN POMMES DE TERRE ET CHOU',
        ingredients: [
            {
                ingredient: 'Pomme de terre crue',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Dés de jambon Herta Nature  2x75 gr',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Chou frisé',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Crème liquide entière U bio',
                quantity: 100,
                unit: 'ml',
            },
            {
                ingredient: 'Amandes entières',
                quantity: 40,
                unit: 'g',
            },
            {
                ingredient: 'Gruyère',
                quantity: 50,
                unit: 'g',
            },
            {
                ingredient: 'Pomme (fruit)',
                quantity: 1,
                unit: 'pièce',
            },
        ],
        instructions: 'Couper le chou frisé en lanières, et le faire cuire dans l\'eau bouillante pendant 10 min. Râper les pommes de terre et la pomme. Dans le grand plat rectangulaire, mélanger le chou, les pommes de terre, la pomme, les lardons, les amandes concassées et la crème. Mettre le gruyère.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'HACHIS VÉGÉTARIEN',
        ingredients: [
            {
                ingredient: 'Pomme de terre crue',
                quantity: 1000,
                unit: 'g',
            },
            {
                ingredient: 'Lait demi-écrémé',
                quantity: 250,
                unit: 'ml',
            },
            {
                ingredient: 'Carotte',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Champignons',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 130,
                unit: 'g',
            },
            {
                ingredient: 'Lentilles vertes',
                quantity: 160,
                unit: 'g',
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Ail',
                quantity: 1,
                unit: 'gousse',
            },
            {
                ingredient: 'Gruyère',
                quantity: 80,
                unit: 'g',
            },
        ],
        instructions: 'Faire cuire les pommes de terre (10 min vapeur). Faire une purée avec le lait. Réserver. Cuire les lentilles vertes avec les carottes coupées en petits cubes pendant 25 min. Réhydrater les protéines de soja. Faire une sauce tomate (chauffer de l\'huile, ajouter les oignons, laissez dorer. Ajouter la boite de concentré de tomates et l\'ail. Rallonger avec de l\'eau. Mettre une cuillère à café de sucre et une pincée de bouillon en poudre). Mélanger la sauce tomate avec les lentilles, carottes, et protéines de soja. Mettre dans le très grand plat transparent. Ajouter les champignons CRUS en rondelles. Puis la purée, et terminer avec le gruyère râpé.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 6,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'LASAGNES',
        ingredients: [
            {
                ingredient: 'Viande hachée 5 %',
                quantity: 350,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 40,
                unit: 'g',
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 180,
                unit: 'g',
            },
            {
                ingredient: 'Gruyère',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Lasagnes PANZANI',
                quantity: 1,
                unit: 'feuille',
            },
            {
                ingredient: 'Lait Entier',
                quantity: 500,
                unit: 'ml',
            },
            {
                ingredient: 'Beurre demi sel',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Maizena',
                quantity: 40,
                unit: 'g',
            },
            {
                ingredient: 'Parmesan',
                quantity: 40,
                unit: 'g',
            },
        ],
        instructions: 'Si il y en a, réhydrater les protéines de soja dans l\'eau bouillante. Pendant ce temps, faire une sauce tomate, y ajouter la viande hachée et les carottes râpées. Faire cuire 15 min. 5 min avant la fin, ajouter les protéines de soja. Monter les lasagnes : 3 càs de béchamel, puis une pâte à lasagne, puis la viande. Et ainsi de suite. Finir par de la béchamel et du gruyère râpé en prenant soin de recouvrir tous les morceaux de pâte sèche.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'MOGETTE FAÇON CHAKCHOUKA',
        ingredients: [
            {
                ingredient: 'Haricots Blanc 280 gr',
                quantity: 280,
                unit: 'g',
            },
            {
                ingredient: 'Tomates entières en conserve 400 g',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Moutarde',
                quantity: 5,
                unit: 'ml',
            },
            {
                ingredient: 'Paprika',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousse',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 2,
                unit: 'pièce',
            },
            {
                ingredient: 'Pain de mie U (500 g/24 tranches)',
                quantity: 1,
                unit: 'tranches',
            },
            {
                ingredient: 'Beurre demi sel',
                quantity: 1,
                unit: 'g',
            },
        ],
        instructions: 'Faire revenir les haricots avec l\'ail. Ajouter les tomates, la moutarde, le paprika, le sel puis mélanger. Creuser un trou dans la sauce, y casser les oeufs. Laisser cuire 5 min, le temps que l\'oeuf soit cuit. Servir avec du pain frais beurré.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 2,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'ONE PAN BLÉ ET COURGETTE',
        ingredients: [
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 1200,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 320,
                unit: 'g',
            },
            {
                ingredient: 'Reblochon petit 240 gr',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Blé Ebly portion 65 gr sec',
                quantity: 125,
                unit: 'g',
            },
            {
                ingredient: 'Lentilles corails',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 1,
                unit: 'ml',
            },
        ],
        instructions: 'Découper la courgette en petits cubes (comme pour les patates sautées). Les faire revenir à la poele (comme les patates sautées). 5 min avant la fin, ajouter les tomates cerises coupées en deux. Pendant ce temps, cuire le blé avec les lentilles corails selon les instructions du paquet. Quand tout est cuit, mettre dans le plus grand plat transparent. Mélanger, assaisonner, et déposer le reblochon dessus.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'ONE PAN QUINOA',
        ingredients: [
            {
                ingredient: 'Quinoa Trio en vrac',
                quantity: 125,
                unit: 'g',
            },
            {
                ingredient: 'Haricots noirs 230 gr',
                quantity: 230,
                unit: 'g',
            },
            {
                ingredient: 'Tomates entières en conserve 400 g',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Maïs sans sucre ajouté 140 gr',
                quantity: 140,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 6,
                unit: 'pièce',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 1,
                unit: 'ml',
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousse',
            },
            {
                ingredient: 'Poivron rouge, cru',
                quantity: 50,
                unit: 'g',
            },
            {
                ingredient: 'Bouillon',
                quantity: 50,
                unit: 'ml',
            },
            {
                ingredient: 'Cumin',
                quantity: 2.5,
                unit: 'g',
            },
            {
                ingredient: 'Raz-el-Hanout',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Jus de citron',
                quantity: 1,
                unit: 'ml',
            },
            {
                ingredient: 'Whey nutripure',
                quantity: 1,
                unit: 'g',
            },
        ],
        instructions: 'Faire sauter l\'ail avec le poivron pendant 1min. Ajouter les haricots, les tomates, le maïs, les épices et le bouillon. Porter à ébullition puis baisser le feu, et laisser frémir à couvert pendant 20 min. Pendant ce temps, faire cuire le quinoa 10 min dans une casserole. A la fin de la cuisson, mélanger l\'ensemble du plat et arroser d\'un filet de jus de citron. Servir avec deux oeufs au plat par personne ou 1 shaker de whey.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 3,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'ONE POT AU RIZ TOMATE',
        ingredients: [
            {
                ingredient: 'Haricots noirs 230 gr',
                quantity: 230,
                unit: 'g',
            },
            {
                ingredient: 'Tomates entières en conserve 400 g',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Riz Basmati semi complet',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Poulet, blanc, cru',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 15,
                unit: 'ml',
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousse',
            },
            {
                ingredient: 'Eau',
                quantity: 150,
                unit: 'ml',
            },
            {
                ingredient: 'Epices à couscous',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Tempeh à cuisiner 200 gr',
                quantity: 200,
                unit: 'g',
            },
        ],
        instructions: 'Cuire le riz à part. Découper le poulet en petits morceaux et le faire revenir dans le wok avec les oignons et un peu d\'huile. Rajouter l\'eau et faire revenir le tout jusqu\'à ébullition. Après 10 min, rajouter les haricots et les tomates concassées. Rajouter les épices, saler, poivrer. Laisser cuire le tout pour encore 10 min, et remuer de temps en temps. Rajouter de l\'eau si besoin. Ajouter le riz cuit à la préparation, ainsi que l\'huile de colza avant de servir.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 2,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'ONE POT HARICOTS BLANCS',
        ingredients: [
            {
                ingredient: 'Haricots Blanc 280 gr',
                quantity: 280,
                unit: 'g',
            },
            {
                ingredient: 'Crème Soja liquide',
                quantity: 100,
                unit: 'ml',
            },
            {
                ingredient: 'Beurre de cacahuètes',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Epinards en branche surgelés',
                quantity: 80,
                unit: 'g',
            },
            {
                ingredient: 'Miso (sachet 22 gr)',
                quantity: 22,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 15,
                unit: 'ml',
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousse',
            },
            {
                ingredient: 'Paprika',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Curcuma',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Gingembre',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Pain de mie U (500 g/24 tranches)',
                quantity: 1,
                unit: 'tranches',
            },
        ],
        instructions: 'Décongeler les épinards. Faire revenir les gousses d\'ail et l\'oignon émincés dans un fond d\'eau. Ajouter le concentré de tomates, les épinards, les haricots, la crème soja, le miso, le beurre de cacahuètes et les épices. Ajouter de l\'eau juste assez pour couvrir le mélange. Laisser mijoter à feu doux pendant quelques minutes. Rallonger avec un peu d\'eau au besoin. Ajouter l\'huile de colza en fin de cuisson. Servir avec un morceau de pain à partager à deux.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 2,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'POÊLÉ THAÏ',
        ingredients: [
            {
                ingredient: 'Nouilles en nids',
                quantity: 125,
                unit: 'g',
            },
            {
                ingredient: 'Crevettes',
                quantity: 180,
                unit: 'g',
            },
            {
                ingredient: 'Poivron rouge, cru',
                quantity: 160,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Epinards en branche surgelés',
                quantity: 90,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 65,
                unit: 'g',
            },
            {
                ingredient: 'Petits pois surgelés',
                quantity: 50,
                unit: 'g',
            },
            {
                ingredient: 'Huile de sésame',
                quantity: 1,
                unit: 'ml',
            },
            {
                ingredient: 'Échalote',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Cumin',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Curcuma',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Gingembre',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Moutarde',
                quantity: 1,
                unit: 'g',
            },
        ],
        instructions: 'Faire frire les crevettes avec l\'huile de sésame et les épices. Réserver. Râper les carottes au plus gros. Découper le poivron en lanière fine. Faire revenir dans le wok avec l\'échalote pendant 15 min. A côté, faire cuire les épinards selon les instructions du paquet. Rassembler tous les ingrédients dans le wok et laisser cuire 5/10 min. Préparer le paquet de nouilles.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 2,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'PÂTES SAUCE ALFREDO',
        ingredients: [
            {
                ingredient: 'Coquillettes 1/2 Complètes',
                quantity: 220,
                unit: 'g',
            },
            {
                ingredient: 'Chou-fleur surgelé',
                quantity: 450,
                unit: 'g',
            },
            {
                ingredient: 'Lait demi-écrémé',
                quantity: 100,
                unit: 'ml',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 30,
                unit: 'ml',
            },
            {
                ingredient: 'Parmesan',
                quantity: 50,
                unit: 'g',
            },
            {
                ingredient: 'Poulet, blanc, cru',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousse',
            },
        ],
        instructions: 'Cuire le chou-fleur et l\'ail dans de l\'eau bouillante pendant 10 min. Cuire les coquillettes à part. Découper le poulet en petits morceaux et le faire dorer à la poêle. Lorsque le chou-fleur est cuit, l\'égoutter, et le mixer avec le mixeur plongeant. Ajouter le lait, le parmesan, l\'huile de colza et une louche d\'eau de cuisson des pâtes (environ 150 ml). La texture doit être bien lisse, si ce n\'est pas le cas, rajouter de l\'eau de cuisson des pâtes. Saler / poivrer, et ajouter du persil. Mélanger les coquillettes cuites avec la sauce, et le poulet.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'POULET A LA CRÈME',
        ingredients: [
            {
                ingredient: 'Poulet, blanc, cru',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Champignons',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Petits pois surgelés',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Epinards en branche surgelés',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Poivron grillés à l\'huile 190 gr',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Lait Entier',
                quantity: 125,
                unit: 'ml',
            },
            {
                ingredient: 'Fromage de madame Loïc',
                quantity: 90,
                unit: 'g',
            },
            {
                ingredient: 'Parmesan',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Échalote',
                quantity: 2,
                unit: 'pièce',
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousse',
            },
            {
                ingredient: 'Nouilles en nids',
                quantity: 125,
                unit: 'g',
            },
        ],
        instructions: 'Faire cuire les épinards selon le paquet, ainsi que les nouilles en nids (mettre les petits pois avec). Découper le poulet en lanières, et faire dorer dans une poêle avec un peu d\'huile des poivrons griller. Saler et poivrer. Réserver. Mettre les échalotes ciselées et les gousses d\'ail pressé dans la poêle et laisser fondre. Ajouter les poivrons découpés en lanières et les champignons coupés en lamelles, laisser cuire quelques minutes. Dans un bol, mélanger le lait, le parmesan et le fromage tartare puis mettre dans la poêle. Ajouter les épinards, mélanger bien et rectifier l\'assaisonnement avant d\'ajouter le poulet.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'POULET FAÇON MAFÉ',
        ingredients: [
            {
                ingredient: 'Poulet, blanc, cru',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Brocoli surgelé Bio U',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Tomates entières en conserve 400 g',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Beurre de cacahuètes',
                quantity: 60,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 10,
                unit: 'ml',
            },
            {
                ingredient: 'Ail',
                quantity: 1,
                unit: 'gousse',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Riz Basmati semi complet',
                quantity: 200,
                unit: 'g',
            },
        ],
        instructions: 'Faire revenir l\'ail et l\'oignon dans l\'huile. Couper le poulet en lanières et le faire cuire 10 min. Dans une casserole à côté, faire cuire le brocoli selon les instructions du paquet. Découper les carottes en tout petits morceaux et les ajouter au poulet, avec les tomates en conserve ainsi que 300 ml d\'eau. Saler, poivrer et incorporer le beurre de cacahuète. Remuer afin que le beurre de cacahuète se lie au reste de la sauce. Laisser mijoter à couvert pendant une vingtaine de minutes. Remuer de temps à autre. La sauce doit avoir réduit en fin de cuisson. Ajouter 10 ml d\'huile de colza.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'POULET EN COCOTTE MINUTE',
        ingredients: [
            {
                ingredient: 'Poulet, blanc, cru',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Pomme de terre crue',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Champignons',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Ail',
                quantity: 1,
                unit: 'gousse',
            },
            {
                ingredient: 'Paprika',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Bouillon',
                quantity: 750,
                unit: 'ml',
            },
        ],
        instructions: 'Couper les légumes en petits morceaux et les champignons en 4. Faire revenir le poulet dans l\'huile pendant 10 min. Réserver. Faire revenir un oignon dans l\'huile, ajouter l\'ail, le concentré de tomates, et le paprika. Mélanger bien et ajouter les légumes, et le bouillon. Cuire sous pression pendant 10 min.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'QUICHE CHAMPIGNONS ET BACON',
        ingredients: [
            {
                ingredient: 'Pâte brisée maison (280 gr)',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Champignons',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Bacon fumé JUSTIN BRIDOU, 16 tranches soit 160g',
                quantity: 80,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 3,
                unit: 'pièce',
            },
            {
                ingredient: 'Lait Entier',
                quantity: 200,
                unit: 'ml',
            },
            {
                ingredient: 'Maizena',
                quantity: 20,
                unit: 'g',
            },
            {
                ingredient: 'Gruyère',
                quantity: 80,
                unit: 'g',
            },
            {
                ingredient: 'Moutarde',
                quantity: 1,
                unit: 'g',
            },
        ],
        instructions: 'Préparer la pâte brisée. Faire revenir les champignons à feu vif avec une noisette de beurre. Étaler une fine couche de moutarde sur le fond de tarte. Y ajouter les champignons cuits et le bacon. Mélanger les oeufs, le lait, la maizena et le gruyère râpé. Verser cette préparation dessus les ingrédients.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 5,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'QUICHE AUX LÉGUMES COMME UN TIAN',
        ingredients: [
            {
                ingredient: 'Pâte brisée maison (280 gr)',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Aubergine, pulpe et peau, rôtie/cuite au four',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Mozarella',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Fromage de madame Loïc',
                quantity: 90,
                unit: 'g',
            },
            {
                ingredient: 'Origan',
                quantity: 1,
                unit: 'g',
            },
        ],
        instructions: 'Couper les légumes et la mozzarella en tranches fines. Étaler le fromage ail et fines herbes sur la pâte puis déposer les rondelles de légumes et de mozzarella en les alternant et en les faisant se chevaucher. Saupoudrer d\'origan.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 5,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'QUICHE CAROTTES CHAMPIGNONS',
        ingredients: [
            {
                ingredient: 'Pâte brisée maison (280 gr)',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Carotte',
                quantity: 120,
                unit: 'g',
            },
            {
                ingredient: 'Champignons',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 4,
                unit: 'pièce',
            },
            {
                ingredient: 'Jambons 4 tranches 140 gr',
                quantity: 2,
                unit: 'tranches',
            },
            {
                ingredient: 'Fromage blanc nature 3% MG (100 gr)',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Lait Entier',
                quantity: 100,
                unit: 'ml',
            },
            {
                ingredient: 'Gruyère',
                quantity: 60,
                unit: 'g',
            },
        ],
        instructions: 'Préparer une pâte brisée. Râper les carottes et couper les champignons en tranches. Dans un bol à part, mélanger le fromage blanc, les oeufs et le lait. Saler. Déposer tous les ingrédients sur la pâte. Saupoudrer de gruyère râpé.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 5,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'SALADE DE PÂTES AU POULET',
        ingredients: [
            {
                ingredient: 'Coquillettes 1/2 Complètes',
                quantity: 220,
                unit: 'g',
            },
            {
                ingredient: 'Poulet, blanc, cru',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Parmesan',
                quantity: 40,
                unit: 'g',
            },
            {
                ingredient: 'Amandes entières',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Fromage blanc nature 3% MG (100 gr)',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Moutarde',
                quantity: 10,
                unit: 'g',
            },
            {
                ingredient: 'Levure de bière en paillettes',
                quantity: 6,
                unit: 'g',
            },
        ],
        instructions: 'Découper le poulet en tout petit morceau, et le faire cuire à la poêle jusqu\'à ce qu\'il soit bien doré. Cuire les coquillettes. Arrêter la cuisson à l\'eau froide. Découper les tomates en petits morceaux. Mélanger coquillettes, poulet, tomates, les amandes concassées, la levure de bière, le fromage blanc et la moutarde. Saupoudrez de gros éclats de parmesan.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'QUICHE RICOTTA LÉGUMES',
        ingredients: [
            {
                ingredient: 'Pâte brisée maison (280 gr)',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 500,
                unit: 'g',
            },
            {
                ingredient: 'Poireau, cru',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Ricotta (250 gr)',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 2,
                unit: 'pièce',
            },
            {
                ingredient: 'Dés de jambon Herta Nature  2x75 gr',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Lait Entier',
                quantity: 100,
                unit: 'ml',
            },
            {
                ingredient: 'Gruyère',
                quantity: 25,
                unit: 'g',
            },
            {
                ingredient: 'Origan',
                quantity: 1,
                unit: 'g',
            },
        ],
        instructions: 'Préparer une pâte brisée. Râper les courgettes, ou émincer les poireaux en petits morceaux et les faire revenir à la poele pendant 15 min. Dans un bol à part, mélanger la ricotta, les oeufs et le lait. Saler + origan. Mélanger les légumes cuits, l\'appareil liquide et les dés de jambons. Déposer sur la pâte. Saupoudrer de gruyère râpé.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 5,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'SALADE DE PÂTES, PESTO, MOZZA',
        ingredients: [
            {
                ingredient: 'Coquillettes 1/2 Complètes',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Pesto aux fanes de radis (maison)',
                quantity: 60,
                unit: 'g',
            },
            {
                ingredient: 'Vinaigre balsamique',
                quantity: 15,
                unit: 'ml',
            },
            {
                ingredient: 'Mozarella',
                quantity: 250,
                unit: 'g',
            },
        ],
        instructions: 'Dans une casserole d\'eau bouillante salée, faire cuire les pâtes selon les instructions du paquet. En fin de cuisson, égoutter-les. Pendant ce temps, laver puis couper les tomates en fines lamelles. Préparer la vinaigrette. Dans un bol, mélanger : le vinaigre balsamique avec le pesto. Poivrer. Dans une assiette, ajouter les pâtes refroidies, les tomates et la mozzarella. Arroser le tout de vinaigrette et ajouter quelques feuilles de basilic, si vous en avez. Mélanger.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'SALADE PIÉMONTAISE',
        ingredients: [
            {
                ingredient: 'Pomme de terre crue',
                quantity: 800,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 8,
                unit: 'pièce',
            },
            {
                ingredient: 'Rôti de porc FLEURY MICHON 210 gr 6 tranches',
                quantity: 140,
                unit: 'g',
            },
            {
                ingredient: 'Cornichons',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Sel',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Poivre',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Ciboulette',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Herbe de provence',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Fromage blanc nature 3% MG (100 gr)',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Mayonnaise',
                quantity: 40,
                unit: 'g',
            },
            {
                ingredient: 'Moutarde',
                quantity: 20,
                unit: 'g',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Jus de citron',
                quantity: 10,
                unit: 'ml',
            },
        ],
        instructions: 'A préparer minimum 12 h en avance. Dans une casserole d\'eau bouillante, faire cuire les oeufs 10 min. Éplucher les patates, et les faire cuire à la vapeur. Puis laisser refroidir. Mélanger tous les ingrédients de la sauce. Découper les patates en morceaux. Ainsi que les cornichons, les tomates et les oeufs. Mélanger le tout avec le rôti cuit en morceaux et la sauce.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'SOUPE D’HIVER AUX POIS CASSÉS',
        ingredients: [
            {
                ingredient: 'Pois cassés (230 gr)',
                quantity: 230,
                unit: 'g',
            },
            {
                ingredient: 'Tomates entières en conserve 400 g',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Chou frisé',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Parmesan',
                quantity: 40,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 1,
                unit: 'ml',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Ail',
                quantity: 1,
                unit: 'gousse',
            },
            {
                ingredient: 'Cumin',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Bouillon',
                quantity: 750,
                unit: 'ml',
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 2,
                unit: 'pièce',
            },
        ],
        instructions: 'Émincer finement le chou et faire cuire 20 min dans de l\'eau bouillante. Couper les carottes en tout petits morceaux. Faire revenir l\'oignon et l\'ail dans le wok avec un fond d\'huile. Ajouter les carottes et les tomates. Mélanger bien et laisser cuire 1 minute. Ajouter le bouillon et le cumin, porter à frémissement. Faire cuire 35 min, jusqu\'à ce que les carottes soient tendres. Égoutter les pois cassés et les ajouter 5 min avant la fin, ainsi que le chou. Servir avec un oeuf au plat par personne. Saupoudrez de parmesan.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 2,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'SALADE DE RIZ THON MAÏS',
        ingredients: [
            {
                ingredient: 'Riz Basmati semi complet',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Thon entier au naturel 140 gr',
                quantity: 215,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 400,
                unit: 'g',
            },
            {
                ingredient: 'Maïs sans sucre ajouté 140 gr',
                quantity: 140,
                unit: 'g',
            },
            {
                ingredient: 'Gruyère',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Fromage blanc nature 3% MG (100 gr)',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Mayonnaise',
                quantity: 40,
                unit: 'g',
            },
            {
                ingredient: 'Moutarde',
                quantity: 20,
                unit: 'g',
            },
        ],
        instructions: 'Faire cuire le riz. Une fois refroidi, ajouter le thon émietté, les tomates coupées en dés et le maïs. Préparer la sauce et l\'ajouter à la préparation. Option : séparer la préparation en deux grandes boîtes de tupperware. Dans l\'une d\'elle, ajouter 25 g de gruyère.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'SOUPE DE RIZ AUTOMNALE',
        ingredients: [
            {
                ingredient: 'Riz Basmati semi complet',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Patate douce, crue',
                quantity: 320,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 240,
                unit: 'g',
            },
            {
                ingredient: 'Champignons',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 90,
                unit: 'g',
            },
            {
                ingredient: 'Lait Entier',
                quantity: 300,
                unit: 'ml',
            },
            {
                ingredient: 'Whey nutripure',
                quantity: 30,
                unit: 'g',
            },
            {
                ingredient: 'Bouillon',
                quantity: 1000,
                unit: 'ml',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 30,
                unit: 'ml',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Ail',
                quantity: 1,
                unit: 'gousse',
            },
        ],
        instructions: 'Couper les légumes en tout petits morceaux. Couper les champignons en lamelles. Faire revenir l\'oignon et l\'ail dans la cocotte avec un fond d\'eau. Ajouter les légumes et le riz. Mélanger bien et laisser cuire 1 minute. Ajouter le bouillon et le lait une partie du lait (en garder de côté pour mélanger la whey), porter à frémissement, faire cuire 15/20 min sans fermer la cocotte. Pendant ce temps, réhydrater les protéines de soja. En fin de cuisson, ajouter l\'huile de colza, les protéines, et la protéine en poudre.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'SPAGHETTI BOLOGNAISE',
        ingredients: [
            {
                ingredient: 'Viande hachée 5 %',
                quantity: 350,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 600,
                unit: 'g',
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Son d\'avoine Markal',
                quantity: 25,
                unit: 'g',
            },
            {
                ingredient: 'Nouilles en nids',
                quantity: 250,
                unit: 'g',
            },
            {
                ingredient: 'Parmesan',
                quantity: 80,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 1,
                unit: 'ml',
            },
            {
                ingredient: 'Sucre de canne Blond',
                quantity: 5,
                unit: 'g',
            },
            {
                ingredient: 'Paprika',
                quantity: 1,
                unit: 'g',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
        ],
        instructions: 'Découper les tomates en petits cubes. Les faire revenir dans une poêle avec de l\'huile et l\'oignon pendant 15/20 min. Ajouter le concentré de tomate, le sucre, le paprika, et le sel. Ajouter 3/4 pots d\'eau de concentré. Ajouter la viande hachée. Laisser mijoter 15 min. En fin de cuisson, ajouter le son d\'avoine. Cuire les nouilles en nids. Parsemer de parmesan après avoir servi.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'TACOS FAÇON SAMOUSSAS',
        ingredients: [
            {
                ingredient: 'Tortilla de blé nature (grande 41 gr)',
                quantity: 8,
                unit: 'pièce',
            },
            {
                ingredient: 'Viande hachée 5 %',
                quantity: 350,
                unit: 'g',
            },
            {
                ingredient: 'Champignons',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g',
            },
            {
                ingredient: 'Gruyère',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Oignon',
                quantity: 1,
                unit: 'pièce',
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousse',
            },
            {
                ingredient: 'Paprika',
                quantity: 5,
                unit: 'g',
            },
            {
                ingredient: 'Piment',
                quantity: 1,
                unit: 'pincée',
            },
        ],
        instructions: 'Éplucher l\'oignon puis le ciseler finement. Peler et dégermer les gousses d\'ail. Mettre un filet d\'huile dans une poêle et y faire revenir l\'oignon ciselé et les gousses d\'ail pressées. Ajouter la viande hachée, saler et poivrer. Laisser cuire la viande jusqu\'à ce qu\'elle soit bien dorée puis ajouter les champignons, le concentré de tomates avec une pincée de sucre, 1 càc de paprika fumé et 1 pincée de piment. Mélanger bien et laisser refroidir. Couper le wrap en deux et y déposer la préparation à la viande hachée. Ajouter un peu de fromage râpé et plier comme pour un samoussa. Réchauffer au micro-onde 1min pour un samoussas chaud et moelleux.',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'TABOULÉ',
        ingredients: [
            {
                ingredient: 'Couscous 1/2 complet',
                quantity: 200,
                unit: 'g',
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 100,
                unit: 'g',
            },
            {
                ingredient: 'Tomate grappe, crue',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Feta',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Concombre, pulpe, cru',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Huile de tournesol',
                quantity: 30,
                unit: 'ml',
            },
            {
                ingredient: 'Jus de citron',
                quantity: 30,
                unit: 'ml',
            },
            {
                ingredient: 'Vinaigre de cidre',
                quantity: 15,
                unit: 'ml',
            },
            {
                ingredient: 'Origan',
                quantity: 1,
                unit: 'g',
            },
        ],
        instructions: 'Mettre le couscous dans une boîte, recouvrir d\'eau froide, et laisser gonfler 10 min. Réhydrater les protéines de soja. Découper la feta et les légumes en petits cubes. Faire une sauce avec 2 càs d\'huile, 1 càs de vinaigre et 2 càs de jus de citron. Saupoudrer d\'origan. Mélanger tous les ingrédients. Réfrigérer au moins 1 h.',
        vegetarianStatus: RecipeVegetarianStatus.VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
    {
        name: 'WRAP FROID',
        ingredients: [
            {
                ingredient: 'Tortilla de blé complete (géante 58 gr)',
                quantity: 4,
                unit: 'pièce',
            },
            {
                ingredient: 'Jambons 4 tranches 140 gr',
                quantity: 4,
                unit: 'tranches',
            },
            {
                ingredient: 'Fromage de madame Loïc',
                quantity: 150,
                unit: 'g',
            },
            {
                ingredient: 'Gruyère',
                quantity: 80,
                unit: 'g',
            },
            {
                ingredient: 'Carotte',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Concombre, pulpe, cru',
                quantity: 300,
                unit: 'g',
            },
            {
                ingredient: 'Maïs sans sucre ajouté 140 gr',
                quantity: 140,
                unit: 'g',
            },
            {
                ingredient: 'Laitue',
                quantity: 1,
                unit: 'feuille',
            },
        ],
        instructions: 'Chacun fait comme il veut :D',
        vegetarianStatus: RecipeVegetarianStatus.NON_VEGETARIAN,
        servings: 4,
        category: RecipeCategory.MAIN,
    },
]
