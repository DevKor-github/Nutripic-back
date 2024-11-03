import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.respository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}
}
