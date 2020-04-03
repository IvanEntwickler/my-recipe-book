import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Banana', 4),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredients(ingredient: Ingredient) {
      return this.ingredients.push(ingredient);

  }

}
