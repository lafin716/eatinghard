import { IsString } from 'class-validator';
import { Nutrient } from '../type/nutrients.type';

export class CreateIngredientDto {
  @IsString()
  readonly name: string;
  readonly description: string;
  readonly tags: string[];
  readonly serve: Nutrient;
}
