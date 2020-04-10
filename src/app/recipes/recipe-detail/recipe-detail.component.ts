
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  pushRecipeToShoppingList() {
    this.recipeService.onAddIngredientsToShoppingList(this.recipe.ingredients);
  }

}
