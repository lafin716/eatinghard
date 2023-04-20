import { SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// 스키마 옵션
const getDefaultSchemaOption = (collectionName: string) => {
  return <SchemaOptions>{
    collection: collectionName,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    _id: true,
  };
};

// 기본 스키마 클래스
class DefaultSchema extends Document {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export { getDefaultSchemaOption, DefaultSchema };
