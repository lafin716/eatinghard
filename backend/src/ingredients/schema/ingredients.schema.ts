import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Nutrient } from '../type/nutrients.type';

// 스키마 옵션
const options: SchemaOptions = {
  collection: 'ingredients',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  _id: true,
};

@Schema(options)
export class Ingredient extends Document {
  _id?: Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: true, type: Object })
  serve: Nutrient;
  @Prop({ required: false })
  serves: Nutrient[];
  @Prop({ required: false })
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
