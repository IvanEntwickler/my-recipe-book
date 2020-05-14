import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: ShoppingListComponent, children: [
      {path: ':shopping-edit', component: ShoppingEditComponent}
      ]}
    ]),
    // SharedModule instead of CommonModule to demonstrate
    // CommonModule was put into SharedModule because it is
    // used in ShoppingListModule and RecipesModule
    SharedModule,
    FormsModule
  ],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ]
})
export class ShoppingListModule {

}
