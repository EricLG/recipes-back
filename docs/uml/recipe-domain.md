# Recipe Domain Model

This document describes the Recipe domain.
The Recipe domain depends on the Food domain.

## MongoDB Collections
- recipes
- recipeFoods
- RecipeSubRecipe
- weeklyRecipePlans

## Rules
- Recipes never store nutritional values
- RecipeFood is a pivot collection between Recipe and Food
- RecipeSubRecipe allows a recipe to reference another recipe
- Sub-recipes are full recipes with their own ingredients and instructions
- Recipes must have a status: draft or approved
- Recipe domain depends on Food domain
- Food domain must never depend on Recipe domain
- Cycles between recipes must be prevented (no recursive loops)
- Weekly plans and cooking history belong to the authenticated user (unique userId/weekStart).
- Full recipe yields are used without duplicates or assigned preparation days; target defaults to 24.
- Completion preserves choices, selects random approved seasonal MAIN or OTHERS recipes and accepts shortages/surpluses.
- Candidates exclude recipes cooked in S−1/S−2; replacement uses the same filters and may create a shortage.
- Manual additions accept any approved recipe; cooking must be unmarked before removal/replacement.
- Current/next weeks are editable, past weeks read-only; cooking is only editable in the current week.
- Only recipes marked as cooked contribute to future planning history
- Recipe names and yields are snapshotted in plan items to preserve historical plans

```mermaid
classDiagram
    class Recipe {
        ObjectId _id
        string name
        string instructions
        RecipeStatus status
        RecipeVegetarianStatus vegetarianStatus
        RecipeSeason[] season
        RecipeCategory category
        number servings
        string preparationTime
        string kitchenTools
        string remark
    }

    class RecipeFood {
        ObjectId _id
        ObjectId recipeId
        ObjectId foodId
        ObjectId measureId
        number quantity
    }

    class RecipeSubRecipe {
        ObjectId _id
        ObjectId parentRecipeId
        ObjectId childRecipeId
        number quantity
    }

    class WeeklyRecipePlan {
        ObjectId _id
        ObjectId userId
        string weekStart
        number targetServings
        number totalServings
        number shortage
        number surplus
        WeeklyRecipePlanItem[] items
    }

    class WeeklyRecipePlanItem {
        ObjectId recipeId
        string recipeName
        number servings
        WeeklyPlanRecipeSource source
        Date cookedAt
    }

    Recipe "1" --> "many" RecipeFood : contains foods
    Recipe "1" --> "many" RecipeSubRecipe : contains sub-recipes
    RecipeSubRecipe --> Recipe : references
    WeeklyRecipePlan "1" --> "many" WeeklyRecipePlanItem : contains
    WeeklyRecipePlanItem --> Recipe : snapshots approved recipe

Completion targets equal recipe counts of VEGETARIAN versus NON_VEGETARIAN/FLEXIBLE,
including existing manual choices using current recipe statuses. Prefer the minority
group, randomly break ties, and fall back if a group is exhausted. Stop at the serving
target; preserve existing choices. Missing/unknown statuses do not count in the ratio.
Replacement does not enforce the ratio; no snapshot or API shape change.
