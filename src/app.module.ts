import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { IngredientsModule } from './api/ingredients/ingredients.module';
import { RecipesModule } from './api/recipes/recipes.module';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, IngredientsModule, RecipesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
