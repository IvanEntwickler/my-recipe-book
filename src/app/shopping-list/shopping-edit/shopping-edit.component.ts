import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) editForm: NgForm;
  editedIndex: number;
  editMode = false;
  editedItem: Ingredient;
  wasEdited: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.editShoppingItem.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onClickAdd(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    return this.shoppingListService.onAddIngredients(newIngredient);
  }

  onUpdate(form: NgForm) {
    const value = form.value;
    const updateIndex = this.editedIndex;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.editIngredient(updateIndex, newIngredient);
    this.editMode = false;
    form.reset();
  }



  onClickDelete() {
    this.onClearForm();
    this.shoppingListService.onDeleteIngredients(this.editedIndex);
  }

  onClearForm() {
    this.editForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    return this.wasEdited.unsubscribe();
  }

}
