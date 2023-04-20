import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Nutrition } from '../type/nutrition.type';
import {
  DefaultSchema,
  getDefaultSchemaOption,
} from 'src/shared/schema/default.schema.option';

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
