import { Ingridient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingridient[] = [
    new Ingridient('Apples', 5),
    new Ingridient('Tomatos', 3)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
