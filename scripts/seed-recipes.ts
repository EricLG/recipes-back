// Type pour le seed avec noms d'ingrédients en string
interface SeedRecipe {
    name: string;
    ingredients: {
        ingredient: string; // Nom de l'ingrédient (sera résolu vers ObjectId lors de l'import)
        quantity?: number;
        unit?: string;
    }[];
    instructions: string;
    season?: string;
    vegetarian: boolean;
    nbParts: number;
    category: string;
}

export const seedRecipes: SeedRecipe[] = [
    {
        name: 'BOWL CAKE',
        ingredients: [
            {
                ingredient: 'Banane, pulpe, crue 100 gr',
                quantity: 80,
                unit: 'g'
            },
            {
                ingredient: 'Oeuf entier', // À ajouter à seed-ingredients si nécessaire
                quantity: 1,
                unit: 'pièce'
            },
            {
                ingredient: 'Miel de printemps',
                quantity: 0.5,
                unit: 'càc'
            },
            {
                ingredient: 'Lait demi-écrémé',
                quantity: 50,
                unit: 'ml'
            },
            {
                ingredient: 'Whey nutripure',
                quantity: 15,
                unit: 'g'
            },
            {
                ingredient: "flocons d'avoine",
                quantity: 30,
                unit: 'g'
            },
            {
                ingredient: 'Chocolat Pépites Koro 70%',
                quantity: 10,
                unit: 'g'
            }
        ],
        instructions: 'Au micro-onde pendant 2m30',
        season: 'Toute saison',
        vegetarian: true,
        nbParts: 1,
        category: 'Dessert'
    },
    {
        name: 'SHAKER PROTÉINÉ',
        ingredients: [
            {
                ingredient: 'Whey nutripure',
                quantity: 30,
                unit: 'g'
            },
            {
                ingredient: 'Lait demi-écrémé', // À ajouter à seed-ingredients si nécessaire
                quantity: 125,
                unit: 'ml'
            },
            {
                ingredient: 'Eau', // À ajouter à seed-ingredients si nécessaire
                quantity: 375,
                unit: 'ml'
            },
            {
                ingredient: 'Arôme de banane', // À ajouter à seed-ingredients si nécessaire
                quantity: 1,
                unit: 'dosette'
            }
        ],
        instructions: 'Mélanger le tout en évitant les grumeaux',
        season: 'Toute saison',
        vegetarian: true,
        nbParts: 1,
        category: 'Boisson protéinée'
    },
    {
        name: 'BOWL PORRIDGE',
        ingredients: [
            {
                ingredient: 'Banane, pulpe, crue 100 gr',
                quantity: 80,
                unit: 'g'
            },
            {
                ingredient: 'Petit Suisse 60 gr',
                quantity: 1,
                unit: 'pièce'
            },
            {
                ingredient: 'Miel de printemps',
                quantity: 0.5,
                unit: 'càc'
            },
            {
                ingredient: 'Lait demi-écrémé',
                quantity: 40,
                unit: 'ml'
            },
            {
                ingredient: 'Levure de bière en paillettes',
                quantity: 2,
                unit: 'dosettes'
            },
            {
                ingredient: "flocons d'avoine",
                quantity: 30,
                unit: 'g'
            },
            {
                ingredient: 'Chocolat Pépites Koro 70%',
                quantity: 10,
                unit: 'g'
            },
            {
                ingredient: 'Soja crispies au cacao Koro',
                quantity: 1,
                unit: 'dosette'
            },
            {
                ingredient: 'Psyllium', // À ajouter à seed-ingredients si nécessaire
                quantity: 3,
                unit: 'dosettes'
            }
        ],
        instructions: 'Réserver une demi-banane pour le topping. Mélanger le reste des ingrédients',
        season: 'Toute saison',
        vegetarian: true,
        nbParts: 1,
        category: 'Petit-déjeuner'
    },
    {
        name: 'GRANOLA BOWL',
        ingredients: [
            {
                ingredient: 'Petit Suisse 60 gr',
                quantity: 2,
                unit: 'pièces'
            },
            {
                ingredient: 'Sucre de canne Blond',
                quantity: 5,
                unit: 'g'
            },
            {
                ingredient: 'Chocolat Pépites Koro 70%',
                quantity: 10,
                unit: 'g'
            },
            {
                ingredient: 'Soja crispies au cacao Koro',
                quantity: 1,
                unit: 'dosette'
            },
            {
                ingredient: 'Granola Noix & Graines U Céréales',
                quantity: 35,
                unit: 'g'
            }
        ],
        instructions: 'Mélanger les ingrédients et mettre les céréales en topping',
        season: 'Toute saison',
        vegetarian: true,
        nbParts: 1,
        category: 'Petit-déjeuner'
    }
];
