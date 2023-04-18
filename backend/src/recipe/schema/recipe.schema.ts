import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Nutrient } from 'src/ingredients/type/nutrients.type';

const options: SchemaOptions = {
  collection: 'recipes',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  _id: true,
};

@Schema(options)
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
  totalServes?: Nutrient;
  createdAt?: Date;
  updatedAt?: Date;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
