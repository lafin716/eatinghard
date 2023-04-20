import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './schema/food.schema';
import { Model } from 'mongoose';
import { responseError, responseOk } from 'src/shared/helper/response.helper';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { AddNutritionDto } from './dto/add-nutrition.dto';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async getFoods() {
    return await this.foodModel.find().lean();
  }

  async getFoodById(id: string) {
    const Food = await this.foodModel.findById(id).lean();
    if (!Food) {
      return responseError('재료를 찾을 수 없습니다.');
    }

    return responseOk('검색완료', Food);
  }

  async createFood(dto: CreateFoodDto) {
    const isDuplicated = await this.foodModel.findOne({
      name: dto.name,
    });

    if (isDuplicated) {
      return responseError('이미 존재하는 재료입니다.');
    }

    const Food = new this.foodModel(dto);
    this.foodModel.create(Food);
    return responseOk('재료가 추가되었습니다.');
  }

  async updateFood(id: string, dto: UpdateFoodDto) {
    const food = await this.foodModel.findById(id).lean();
    if (!food) {
      return responseError('재료를 찾을 수 없습니다.');
    }

    const isDuplicated = await this.foodModel.findOne({
      name: dto.name,
      _id: { $ne: food._id },
    });

    if (isDuplicated) {
      return responseError('이미 존재하는 재료입니다.');
    }

    const updateFood = {
      name: dto.name || food.name,
      description: dto.description || food.description,
      tags: dto.tags || food.tags,
      serves: [...food.serves, dto.serve],
    };

    this.foodModel.findByIdAndUpdate(id, updateFood);
    return responseOk('재료가 수정되었습니다.');
  }

  async deleteFood(id: string) {
    await this.foodModel.findByIdAndDelete(id);
    return responseOk('재료가 삭제되었습니다.');
  }

  async getFoodByTags(tags: string[]) {
    const food = await this.foodModel.find({ tags: { $in: tags } }).lean();
    if (!food) {
      return responseError('해당 태그로 등록된 재료를 찾을 수 없습니다.');
    }

    return responseOk('검색완료', food);
  }

  async getFoodByNames(names: string[]) {
    const food = await this.foodModel.find({ name: { $in: names } }).lean();
    if (!food) {
      return responseError('해당 이름으로 등록된 재료를 찾을 수 없습니다.');
    }

    return responseOk('검색완료', food);
  }

  async addNutrition(id: string, nutrition: AddNutritionDto) {
    try {
      const food = await this.foodModel.findById(id).lean();
      if (!food) {
        return responseError('재료를 찾을 수 없습니다.');
      }

      const updateFood = {
        name: food.name,
        description: food.description,
        tags: food.tags,
        serves: [
          ...food.serves,
          {
            ...nutrition.nutrition,
          },
        ],
      };

      await this.foodModel.findByIdAndUpdate(id, updateFood);
      return responseOk('영양소가 추가되었습니다.');
    } catch (error) {
      return responseError('영양소 추가가 실패하였습니다. :: ' + error);
    }
  }
}
