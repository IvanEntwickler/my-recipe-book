import { ShoppingListService } from './../shopping-list/shopping-list.service';

import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';


@Injectable()
export class RecipeService {
  recipeWasClicked = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Wiener Schnitzel',
      'super-tasty Schnitzel',
      'https://static.essen-und-trinken.de/bilder/e9/b1/7321/galleryimage/ed956d4fa02f282fabdb282aa6bc6447.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}


  getRecipes() {
    return this.recipes.slice();
  }

  onAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addRecipeToList(ingredients);
  }

}
