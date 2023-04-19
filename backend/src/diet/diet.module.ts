import { Module } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
  ],
  controllers: [DietController],
  providers: [DietService],
  exports: [DietService],
})
export class DietModule {}
