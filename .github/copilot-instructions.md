# Copilot Instructions — Backend (NestJS + MongoDB)

You are assisting on a backend project built with NestJS and MongoDB (Mongoose).
This project is a clean POC but follows professional backend practices.

## General Architecture
- Framework: NestJS
- Database: MongoDB with Mongoose
- Language: TypeScript
- Architecture: Domain-driven, modular

## Project Structure Rules
- Domain schemas:
  - src/domain/**/schemas
- API layer:
  - src/api/**/controllers
  - src/api/**/services
  - src/api/**/dto
- Enums:
  - src/domain/**/enums
- No circular dependencies between domains

## Domain Rules
### Food Domain
- Food, Measure, Nutrient belong to Food domain
- Food domain must NEVER depend on Recipe domain

### Recipe Domain
- Recipe domain MAY depend on Food domain
- Recipes never store nutritional values
- Nutritional values are computed dynamically
- Recipes can contain:
  - Foods (via RecipeFood)
  - Other Recipes (via RecipeSubRecipe)

### RecipeSubRecipe
- Represents reusable recipe bases (sauces, doughs, preparations)
- References:
  - parentRecipeId (Recipe)
  - childRecipeId (Recipe)
- Quantity is a multiplier relative to childRecipe.servings
- Cyclic dependencies between recipes must be prevented

## Coding Guidelines
- Use Mongoose schemas with decorators
- Use @InjectModel for repositories
- Controllers must be thin
- Business logic goes into services
- Use async/await only
- Use DTOs for input validation
- Throw NestJS HTTP exceptions (NotFoundException, BadRequestException)
- Use explicit types (avoid any)
- Prefer composition over inheritance

## API Guidelines
- Expose standard CRUD endpoints
- Use REST conventions
- Keep naming explicit and consistent
- Avoid premature optimization

## Documentation
- UML diagrams are written in Mermaid
- UML documentation is located under:
  - docs/uml/
- Code must follow documented domain rules

## Tone
- Generate clean, readable, professional code
- Prefer clarity over cleverness
