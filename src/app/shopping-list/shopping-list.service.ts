import { EventEmitter } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChange = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Banana', 4),
  ];

getShoppingData() {
  return this.ingredients.slice();
}

onAddIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.emit(this.ingredients.slice());
}

onDeleteIngredients() {
  this.ingredients.pop();
  this.ingredientsChange.emit(this.ingredients.slice());
}

addRecipeToList(ingredients: Ingredient[]) {
this.ingredients = this.ingredients.concat(...ingredients);
this.ingredientsChange.emit(this.ingredients);
}

}
