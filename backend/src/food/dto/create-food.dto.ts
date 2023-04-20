import { IsString } from 'class-validator';
import { Nutrition } from '../type/nutrition.type';

export class CreateFoodDto {
  @IsString()
  readonly name: string;
  readonly description: string;
  readonly tags: string[];
  readonly serve: Nutrition;
}
