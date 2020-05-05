import { DataStorageService } from './../shared/data-storage.service';
import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';

import { Ingredient } from './../shared/ingredient.model';
import {Injectable} from '@angular/core';
import { Recipe } from './recipe.model';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}


  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }

  replaceRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  onAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addRecipeToList(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
