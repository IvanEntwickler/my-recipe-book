import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild ('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild ('amountInput', {static: true}) amountInput: ElementRef;
  @Output() createIngredient = new EventEmitter<Ingredient>();
  @Output() deleteIngredient = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickAdd() {
    const typedName = this.nameInput.nativeElement.value;
    const typedAmount = this.amountInput.nativeElement.value;

    const newIngredient = new Ingredient(typedName, typedAmount);
    return this.createIngredient.emit(newIngredient);
  }

  onClickDelete() {
    return this.deleteIngredient.emit();
  }

}
