import { DataStorageService } from './../shared/data-storage.service';
import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';

import { Ingredient } from './../shared/ingredient.model';
import {Injectable} from '@angular/core';
import { Recipe } from './recipe.model';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Wiener Schnitzel',
      'super-tasty Schnitzel',
      'https://static.essen-und-trinken.de/bilder/e9/b1/7321/galleryimage/ed956d4fa02f282fabdb282aa6bc6447.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ],
    ),
    new Recipe(
      'Burger',
      'super-tasty Burger',
      'https://media.kaufland.com/images/PPIM/AP_Content_2708/std.lang.all/66/67/Asset_3306667.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Cheese', 2),
        new Ingredient('Bread', 1)
      ]
    )
  ];

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
