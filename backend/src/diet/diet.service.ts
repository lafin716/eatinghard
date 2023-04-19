import { Injectable } from '@nestjs/common';
import { RecipeService } from 'src/recipe/recipe.service';
import { responseError } from 'src/shared/helper/response.helper';

@Injectable()
export class DietService {
  constructor(private readonly recipeService: RecipeService) {}

  async getTodayRecommendation() {
    const recipes = await this.recipeService.getRecipes();
    if (!recipes) {
      return responseError('레시피를 찾을 수 없습니다.');
    }

    // 랜덤하게 한개만 추천
    return recipes[Math.floor(Math.random() * recipes.length)];
  }
}
