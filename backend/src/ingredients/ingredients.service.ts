import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient } from './schema/ingredients.schema';
import { Model } from 'mongoose';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { responseError, responseOk } from 'src/shared/helper/response.helper';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { AddNutrientDto } from './dto/add-nutrient.dto';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  async getIngredients() {
    return await this.ingredientModel.find().lean();
  }

  async getIngredientById(id: string) {
    const ingredient = await this.ingredientModel.findById(id).lean();
    if (!ingredient) {
      return responseError('재료를 찾을 수 없습니다.');
    }

    return responseOk('검색완료', ingredient);
  }

  async createIngredient(dto: CreateIngredientDto) {
    const isDuplicated = await this.ingredientModel.findOne({
      name: dto.name,
    });

    if (isDuplicated) {
      return responseError('이미 존재하는 재료입니다.');
    }

    const ingredient = new this.ingredientModel(dto);
    this.ingredientModel.create(ingredient);
    return responseOk('재료가 추가되었습니다.');
  }

  async updateIngredient(id: string, dto: UpdateIngredientDto) {
    const ingredient = await this.ingredientModel.findById(id).lean();
    if (!ingredient) {
      return responseError('재료를 찾을 수 없습니다.');
    }

    const updateIngredient = {
      name: dto.name || ingredient.name,
      description: dto.description || ingredient.description,
      tags: dto.tags || ingredient.tags,
      serve: dto.serve || ingredient.serve,
      serves: ingredient.serves,
    };

    this.ingredientModel.findByIdAndUpdate(id, updateIngredient);
    return responseOk('재료가 수정되었습니다.');
  }

  async deleteIngredient(id: string) {
    await this.ingredientModel.findByIdAndDelete(id);
    return responseOk('재료가 삭제되었습니다.');
  }

  async getIngredientsByTags(tags: string[]) {
    const ingredients = await this.ingredientModel
      .find({ tags: { $in: tags } })
      .lean();
    if (!ingredients) {
      return responseError('해당 태그로 등록된 재료를 찾을 수 없습니다.');
    }

    return responseOk('검색완료', ingredients);
  }

  async getIngredientsByNames(names: string[]) {
    const ingredients = await this.ingredientModel
      .find({ name: { $in: names } })
      .lean();
    if (!ingredients) {
      return responseError('해당 이름으로 등록된 재료를 찾을 수 없습니다.');
    }

    return responseOk('검색완료', ingredients);
  }

  async addNutrient(id: string, nutrients: AddNutrientDto) {
    try {
      const ingredient = await this.ingredientModel.findById(id).lean();
      if (!ingredient) {
        return responseError('재료를 찾을 수 없습니다.');
      }

      const updateIngredient = {
        name: ingredient.name,
        description: ingredient.description,
        tags: ingredient.tags,
        serve: ingredient.serve,
        serves: [
          ...ingredient.serves,
          {
            ...nutrients.nutrient,
          },
        ],
      };

      await this.ingredientModel.findByIdAndUpdate(id, updateIngredient);
      return responseOk('영양소가 추가되었습니다.');
    } catch (error) {
      return responseError('영양소 추가가 실패하였습니다. :: ' + error);
    }
  }
}
