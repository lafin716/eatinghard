import { Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DefaultSchema,
  defaultSchemaOption,
} from 'src/shared/schema/default.schema.option';

@Schema(defaultSchemaOption)
class Diet extends DefaultSchema {
  name: string;
  description?: string;
  tags?: string[];
}

export const DietSchema = SchemaFactory.createForClass(Diet);
