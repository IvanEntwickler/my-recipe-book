import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipesEditComponent,
  ],
  imports: [
    RouterModule,
    RecipesRoutingModule,
    // SharedModule instead of CommonModule to demonstrate
    // CommonModule was put into SharedModule because it is in
    // used in ShoppingListModule and RecipesModule
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule {

}
