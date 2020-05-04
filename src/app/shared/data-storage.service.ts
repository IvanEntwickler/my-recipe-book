import { Recipe } from './../recipes/recipe.model';


import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataStorageService  {



constructor(private http: HttpClient, private recipeService: RecipeService) {}

storeRecipes() {
  const recipes = this.recipeService.getRecipes();
  this.http.put('https://ng-my-recipe-book-a7fe2.firebaseio.com/recipes.json', recipes).subscribe(
    (response) => {
      console.log(response);
    });
}

fetchRecipes() {
  this.http.get<Recipe[]>('https://ng-my-recipe-book-a7fe2.firebaseio.com/recipes.json').subscribe(
    (recipes) => {
    this.recipeService.replaceRecipe(recipes);
    });
}

}
