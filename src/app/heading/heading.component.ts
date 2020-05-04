import { Recipe } from './../recipes/recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Component } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
  recipe: Recipe[];

  constructor(private router: Router, private dataStorageService: DataStorageService) { }

  onSaveData() {
    return this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }


  // onClickShopping() {
  //   this.router.navigate(['/shopping-list']);
  // }
  // onClickRecipes() {
  //   this.router.navigate(['/']);
  // }


}
