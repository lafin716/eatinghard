import { Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DefaultSchema,
  getDefaultSchemaOption,
} from 'src/shared/schema/default.schema.option';

@Schema(getDefaultSchemaOption('diets'))
class Diet extends DefaultSchema {
  name: string;
  description?: string;
  tags?: string[];
}

export const DietSchema = SchemaFactory.createForClass(Diet);
