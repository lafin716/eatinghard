import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DietService } from './diet.service';

@Controller('diets')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Get('today')
  getDiets() {
    return this.dietService.getTodayRecommendation();
  }

  // @Post()

  // @Put()

  // @Delete()
}
