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
    },
    {
        name: 'COURGETTE FARCIE',
        ingredients: [
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 1200,
                unit: 'g'
            },
            {
                ingredient: 'Poivron rouge, cru',
                quantity: 150,
                unit: 'g'
            },
            {
                ingredient: 'Fromage de madame Loïc',
                quantity: 150,
                unit: 'g'
            },
            {
                ingredient: 'Couscous 1/2 complet',
                quantity: 200,
                unit: 'g'
            },
            {
                ingredient: 'Protéines de soja Vantastic',
                quantity: 80,
                unit: 'g'
            },
            {
                ingredient: 'Parmesan',
                quantity: 35,
                unit: 'g'
            },
            {
                ingredient: 'huile de tournesol',
                quantity: 10,
                unit: 'ml'
            },
            {
                ingredient: 'Ail',
                quantity: 2,
                unit: 'gousses'
            },
            {
                ingredient: 'Epices à couscous',
                quantity: 5,
                unit: 'g'
            }
        ],
        instructions: 'Réhydrater les protéines de soja. Couper la courgette en deux. La vider. Racler la chair pour diminuer l\'épaisseur (conserver environ 1 cm). Blanchir les courgettes : les faire bouillir 8/10 min en les plongeant entièrement dans l\'eau. A la fin de la cuisson, les égoutter à l\'envers. Découper le poivron en petit morceau. Faire revenir l\'ail dans un peu d\'huile, y ajouter la chair de courgette et le poivron. Laisser cuire 5 min. Ajouter le couscous et 50 cl de bouillon. Mélanger. Laisser cuire 10 min. Ajouter le fromage de Madame Loic et les protéines de soja. Farcir les courgettes. Et saupoudrer de parmesan.',
        season: 'Toute saison',
        vegetarian: true,
        nbParts: 4,
        category: 'Plat principal'
    },
    {
        name: 'BOWL CAKE SALÉ',
        ingredients: [
            {
                ingredient: 'Fromage blanc nature 3% MG (100 gr)',
                quantity: 100,
                unit: 'g'
            },
            {
                ingredient: 'Oeuf entier',
                quantity: 1,
                unit: 'pièce'
            },
            {
                ingredient: "flocons d'avoine",
                quantity: 45,
                unit: 'g'
            },
            {
                ingredient: 'Gruyère',
                quantity: 25,
                unit: 'g'
            },
            {
                ingredient: 'Sel',
                quantity: 1,
                unit: 'pincée'
            }
        ],
        instructions: 'Mélanger tous les ingrédients ensemble',
        season: 'Toute saison',
        vegetarian: true,
        nbParts: 1,
        category: 'Plat principal'
    },
    {
        name: 'COUSCOUS',
        ingredients: [
            {
                ingredient: 'Carotte',
                quantity: 360,
                unit: 'g'
            },
            {
                ingredient: 'Poivron rouge, cru',
                quantity: 160,
                unit: 'g'
            },
            {
                ingredient: 'Courgette, pulpe et peau, crue',
                quantity: 500,
                unit: 'g'
            },
            {
                ingredient: 'Haricots Blanc 280 gr',
                quantity: 280,
                unit: 'g'
            },
            {
                ingredient: 'Couscous 1/2 complet',
                quantity: 150,
                unit: 'g'
            },
            {
                ingredient: 'Chipolatas U (par 6, 330 gr)',
                quantity: 330,
                unit: 'g'
            },
            {
                ingredient: 'Double concentré de tomates 3x70g',
                quantity: 70,
                unit: 'g'
            },
            {
                ingredient: 'huile de tournesol',
                quantity: 15,
                unit: 'ml'
            },
            {
                ingredient: 'Oignon',
                quantity: 100,
                unit: 'g'
            },
            {
                ingredient: 'Ail',
                quantity: 3,
                unit: 'gousses'
            },
            {
                ingredient: 'Raz-el-Hanout',
                quantity: 1,
                unit: 'càc'
            },
            {
                ingredient: 'Epices à couscous',
                quantity: 1,
                unit: 'càc'
            }
        ],
        instructions: 'Préparer une sauce tomate. Découper les légumes en morceaux. Faire revenir les légumes dans la sauce tomate. Ajouter 75 cl d\'eau et laisser cuire 40 min, jusqu\'à ce que les légumes soient fondants. Ajouter les haricots blancs et les épices. Pendant ce temps, faire gonfler le couscous et cuire les chipolatas.',
        season: 'Toute saison',
        vegetarian: false,
        nbParts: 4,
        category: 'Plat principal'
    },
    {
        name: '10 CROQUE-MONSIEURS',
        ingredients: [
            {
                ingredient: 'Pain de mie U (500 g/24 tranches)',
                quantity: 20,
                unit: 'tranches'
            },
            {
                ingredient: 'Jambons 4 tranches 140 gr',
                quantity: 4,
                unit: 'tranches'
            },
            {
                ingredient: 'Fromage Croque emmental x20 - 340 gr',
                quantity: 10,
                unit: 'tranches'
            },
            {
                ingredient: 'Champignons',
                quantity: 300,
                unit: 'g'
            },
            {
                ingredient: 'Lait demi-écrémé',
                quantity: 250,
                unit: 'ml'
            },
            {
                ingredient: 'Beurre demi sel',
                quantity: 15,
                unit: 'g'
            },
            {
                ingredient: 'Maizena',
                quantity: 20,
                unit: 'g'
            },
            {
                ingredient: 'Parmesan',
                quantity: 20,
                unit: 'g'
            }
        ],
        instructions: 'Préparer une béchamel au parmesan. Pour 1 croque : mettre une cuillère à soupe de béchamel, ajouter 0.4 tranche de jambon, 1 tranche de fromage et la moitié d\'un champignon en rondelles. Pour 4 croques, préparer 15 gr de beurre. En mettre la moitié sur la tranche supérieure des croques, et l\'autre moitié à fondre dans la poêle. Faire cuire 5 min de chaque côté sur feu 7, avec le couvercle. Ou cuire 15 min au four directement sans préchauffage à 180°C.',
        season: 'Toute saison',
        vegetarian: false,
        nbParts: 5,
        category: 'Plat principal'
    }
];
