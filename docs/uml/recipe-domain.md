# Recipe Domain Model

This document describes the Recipe domain.
The Recipe domain depends on the Food domain.

## MongoDB Collections
- recipes
- recipeFoods

## Rules
- Recipes never store nutritional values
- RecipeFood is a pivot collection
- RecipeFood references Food and Measure
- Recipe domain depends on Food domain
- Food domain must never depend on Recipe domain

```mermaid
classDiagram
    class Recipe {
        ObjectId _id
        string name
        string instructions
        boolean vegetarian
        RecipeSeason season
        RecipeCategory category
        number servings
    }

    class RecipeFood {
        ObjectId _id
        ObjectId recipeId
        ObjectId foodId
        ObjectId measureId
        number quantity
    }

    Recipe "1" --> "many" RecipeFood : contains
