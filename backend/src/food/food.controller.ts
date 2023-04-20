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
import { FoodService } from './food.service';
import { AddNutritionDto } from './dto/add-nutrition.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('foods')
@UseGuards(JwtAuthGuard)
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  getFoods() {
    return this.foodService.getFoods();
  }

  @Post(':id/nutrients')
  addNutrients(@Param('id') id: string, @Body() dto: AddNutritionDto) {
    return this.foodService.addNutrition(id, dto);
  }

  @Post()
  createIngredient(@Body() dto: CreateFoodDto) {
    return this.foodService.createFood(dto);
  }

  @Put(':id')
  updateIngredient(@Param('id') id: string, @Body() dto: UpdateFoodDto) {
    return this.foodService.updateFood(id, dto);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.foodService.deleteFood(id);
  }

  @Get(':id')
  getIngredientById(@Param('id') id: string) {
    return this.foodService.getFoodById(id);
  }

  @Get('search/:tags')
  getIngredientByTag(@Param('tags') tag: string) {
    // 공백을 제거한 후 콤마로 구분. 구분 후에도 공백이 있을 수 있으므로 trim()을 사용
    const tags = tag.split(',').map((tag) => tag.trim());
    return this.foodService.getFoodByTags(tags);
  }
}
