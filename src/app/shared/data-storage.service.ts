
import { Recipe } from './../recipes/recipe.model';

import { map, tap } from 'rxjs/operators';

import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStorageService  {



constructor(
  private http: HttpClient,
  private recipeService: RecipeService,
  ) {}

storeRecipes() {
  const recipes = this.recipeService.getRecipes();
  this.http.put('https://ng-my-recipe-book-a7fe2.firebaseio.com/recipes.json', recipes).subscribe(
    (response) => {
      console.log(response);
    });
}

fetchRecipes() {
 return this.http.get<Recipe[]>('https://ng-my-recipe-book-a7fe2.firebaseio.com/recipes.json').pipe(
  map(recipes => {
    ///// AFTER MAP OPERATOR TRANSFORMATION, JS MAP RETURNS RECIPE WITH INGREDIENTS ARRAY IF !undefiend else empty ARRAY
    return recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}));
  }),
  tap(recipes => {
      this.recipeService.replaceRecipe(recipes);
    })
  );

}

}
