import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DefaultSchema,
  getDefaultSchemaOption,
} from 'src/shared/schema/default.schema.option';
import { Nutrition } from '../type/nutrition.type';
import { UpdateFoodDto } from '../dto/update-food.dto';
import tagParser from 'src/shared/helper/tag.parser';

@Schema(getDefaultSchemaOption('foods'))
export class Food extends DefaultSchema {
  @Prop({ required: true })
  name: string;
  @Prop({ required: false })
  description?: string;
  @Prop({ required: false })
  serves?: Nutrition[];
  @Prop({ required: false })
  tags?: string[];
}

export const FoodSchema = SchemaFactory.createForClass(Food);
