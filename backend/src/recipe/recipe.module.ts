import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './schema/recipe.schema';
// import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    // IngredientsModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService, MongooseModule],
})
export class RecipeModule {}
