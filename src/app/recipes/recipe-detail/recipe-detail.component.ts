import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   this.route.params.subscribe(
     (params: Params) => {
       /* tslint:disable:no-string-literal */
       this.id = +params['id'];
      /* tslint:enable:no-string-literal */
       this.recipe = this.recipeService.getRecipe(this.id);
      });
  }

  pushRecipeToShoppingList() {
    this.recipeService.onAddIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
