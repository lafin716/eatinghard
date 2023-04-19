import { Module } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Diet.name, schema: DietSchema }]),
    RecipeModule,
  ],
  controllers: [DietController],
  providers: [DietService],
  exports: [DietService],
})
export class DietModule {}
