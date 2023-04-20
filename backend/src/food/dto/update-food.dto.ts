import { Nutrition } from '../type/nutrition.type';

export class UpdateFoodDto {
  readonly name?: string;
  readonly description?: string;
  readonly tags?: string[];
  readonly serve?: Nutrition;
}
