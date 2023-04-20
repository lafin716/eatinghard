import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Nutrition } from 'src/food/type/nutrition.type';
import { getDefaultSchemaOption } from 'src/shared/schema/default.schema.option';

@Schema(getDefaultSchemaOption('recipes'))
export class Recipe extends Document {
  _id?: Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ required: false })
  description?: string;
  @Prop({ required: false })
  ingredients?: Types.ObjectId[];
  @Prop({ required: false })
  tags?: string[];
  @Prop({ required: false, type: Object })
  totalServes?: Nutrition;
  createdAt?: Date;
  updatedAt?: Date;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
