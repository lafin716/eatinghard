import { Schema, SchemaOptions } from '@nestjs/mongoose';

const options: SchemaOptions = {
  collection: 'categories',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  _id: true,
};

@Schema(options)
export class Category {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
