import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './schema/recipe.schema';
import { Model } from 'mongoose';
import { responseError, responseOk } from 'src/shared/helper/response.helper';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>,
  ) {}

  async getRecipes() {
    return await this.recipeModel.find().lean();
  }

  async getRecipeById(id: string) {
    const recipe = await this.recipeModel.findById(id).lean();
    if (!recipe) {
      return responseError('레시피를 찾을 수 없습니다.');
    }
    return responseOk('검색완료', recipe);
  }

  async createRecipe(dto: CreateRecipeDto) {
    const isDuplicated = await this.recipeModel.findOne({
      name: dto.name,
    });

    if (isDuplicated) {
      return responseError('이미 존재하는 레시피입니다.');
    }

    const recipe = new this.recipeModel(dto);
    await this.recipeModel.create(recipe);
    return responseOk('레시피가 추가되었습니다.');
  }

  async updateRecipe(id: string, dto: CreateRecipeDto) {
    const recipe = await this.recipeModel.findById(id).lean();
    if (!recipe) {
      return responseError('레시피를 찾을 수 없습니다.');
    }

    const isDuplicated = await this.recipeModel.findOne({
      name: dto.name,
      _id: { $ne: recipe._id },
    });

    if (isDuplicated) {
      return responseError('이미 존재하는 레시피입니다.');
    }

    // const ingredients = await this.ingredientModel.find({
    //   _id: { $in: dto.ingredients },
    // });
    // if (ingredients.length !== dto.ingredients.length) {
    //   return responseError('잘못된 재료가 포함되어 있습니다.');
    // }

    // const serves = ingredients.map((ingredient) => ingredient.serve);
    const updateRecipe = {
      name: dto.name || recipe.name,
      description: dto.description || recipe.description,
      ingredients: dto.ingredients || recipe.ingredients,
      tags: dto.tags || recipe.tags,
      // totalServes: this.calculateNutrients(serves),
    };

    await this.recipeModel.findByIdAndUpdate(id, updateRecipe);
    return responseOk('레시피가 수정되었습니다.');
  }

  async deleteRecipe(id: string) {
    const recipe = await this.recipeModel.findById(id).lean();
    if (!recipe) {
      return responseError('레시피를 찾을 수 없습니다.');
    }

    await this.recipeModel.findByIdAndDelete(id);
    return responseOk('레시피가 삭제되었습니다.');
  }

  // private calculateNutrients(nutrients: Nutrient[]) {
  //   return nutrients.reduce((acc, cur) => {
  //     return {
  //       serve: acc.serve,
  //       calories: acc.calories + cur.calories,
  //       carbohydrates: acc.carbohydrates + cur.carbohydrates,
  //       protein: acc.protein + cur.protein,
  //       fat: acc.fat + cur.fat,
  //       saturatedFat: acc.saturatedFat + cur.saturatedFat,
  //       transFat: acc.transFat + cur.transFat,
  //       cholesterol: acc.cholesterol + cur.cholesterol,
  //       sodium: acc.sodium + cur.sodium,
  //       sugar: acc.sugar + cur.sugar,
  //       calcium: acc.calcium + cur.calcium,
  //       iron: acc.iron + cur.iron,
  //       vitaminA: acc.vitaminA + cur.vitaminA,
  //       vitaminC: acc.vitaminC + cur.vitaminC,
  //     };
  //   });
  // }
}
