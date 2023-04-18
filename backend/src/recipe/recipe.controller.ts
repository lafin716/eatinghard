import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get(':id')
  getRecipeById(@Param('id') id: string) {
    return this.recipeService.getRecipeById(id);
  }

  @Post()
  createRecipe(@Body() dto: CreateRecipeDto) {
    return this.recipeService.createRecipe(dto);
  }

  @Put(':id')
  updateRecipe(@Param('id') id: string, @Body() dto: CreateRecipeDto) {
    return this.recipeService.updateRecipe(id, dto);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: string) {
    return this.recipeService.deleteRecipe(id);
  }
}
