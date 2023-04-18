import { Nutrient } from '../type/nutrients.type';

export class UpdateIngredientDto {
  readonly name?: string;
  readonly description?: string;
  readonly tags?: string[];
  readonly serve?: Nutrient;
}
