import { Recipe } from './../../recipe.model';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';



@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() outputDetail = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onPushToDetail() {
    return this.outputDetail.emit();
  }

}
