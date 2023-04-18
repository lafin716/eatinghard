import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { AddNutrientDto } from './dto/add-nutrient.dto';

@Controller('ingredients')
@UseGuards(JwtAuthGuard)
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientsService) {}

  @Get()
  getIngredients() {
    return this.ingredientService.getIngredients();
  }

  @Post(':id/nutrients')
  addNutrients(@Param('id') id: string, @Body() dto: AddNutrientDto) {
    return this.ingredientService.addNutrient(id, dto);
  }

  @Post()
  createIngredient(@Body() dto: CreateIngredientDto) {
    return this.ingredientService.createIngredient(dto);
  }

  @Put(':id')
  updateIngredient(@Param('id') id: string, @Body() dto: CreateIngredientDto) {
    return this.ingredientService.updateIngredient(id, dto);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.ingredientService.deleteIngredient(id);
  }

  @Get(':id')
  getIngredientById(@Param('id') id: string) {
    return this.ingredientService.getIngredientById(id);
  }

  @Get('search/:tags')
  getIngredientByTag(@Param('tags') tag: string) {
    // 공백을 제거한 후 콤마로 구분. 구분 후에도 공백이 있을 수 있으므로 trim()을 사용
    const tags = tag.split(',').map((tag) => tag.trim());
    return this.ingredientService.getIngredientsByTags(tags);
  }
}
