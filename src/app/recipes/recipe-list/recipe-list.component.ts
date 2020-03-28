import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test', 'Test2', 'https://www.seoclerk.com/pics/want36192-1zCw5a1455908610.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
