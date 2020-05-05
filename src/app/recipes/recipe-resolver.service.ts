import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  // resolve will subcribe once the data is there!!
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // checking if recipes are there to avoid a bug to edit the recipe
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    }
    return recipes;
  }
}
