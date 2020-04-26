import { Subject } from 'rxjs';

import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChange = new Subject<Ingredient[]>();
  editShoppingItem = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Banana', 4),
  ];

getShoppingData() {
  return this.ingredients.slice();
}

getIngredient(index: number) {
  return this.ingredients[index];
}

editIngredient(index: number, newIngredient: Ingredient) {
  this.ingredients[index] = newIngredient;
  this.ingredientsChange.next(this.ingredients.slice());
}

onAddIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.next(this.ingredients.slice());
}

onDeleteIngredients(index: number) {
  this.ingredients.splice(index, 1);
  this.ingredientsChange.next(this.ingredients.slice());
}

addRecipeToList(ingredients: Ingredient[]) {
this.ingredients = this.ingredients.concat(...ingredients);
this.ingredientsChange.next(this.ingredients);
}



}
