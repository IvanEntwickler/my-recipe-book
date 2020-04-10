import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  ingredients: Ingredient[];
  @ViewChild ('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild ('amountInput', {static: true}) amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onClickAdd() {
    const typedName = this.nameInput.nativeElement.value;
    const typedAmount = this.amountInput.nativeElement.value;

    const newIngredient = new Ingredient(typedName, typedAmount);
    return this.shoppingListService.onAddIngredients(newIngredient);
  }



  onClickDelete() {
    return this.shoppingListService.onDeleteIngredients();
  }

}
