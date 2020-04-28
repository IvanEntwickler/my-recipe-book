

import { RecipeService } from './../recipe.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})
export class RecipesEditComponent implements OnInit {
  editmode = false;
  id: number;
  recipeForm: FormGroup;


  constructor(private route: ActivatedRoute, private recipeService: RecipeService ) { }

  // fetching id and checking if we are in edit mode or creating a new Recipe
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>  {
        /* tslint:disable:no-string-literal */
        this.id = +params['id'];
       /* tslint:enable:no-string-literal */
        /* tslint:disable:no-string-literal */
        this.editmode = params['id'] != null;
         /* tslint:disable:no-string-literal */
        this.initForm();
       });
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    // tslint:disable-next-line:prefer-const
    let recipeIngredients = new FormArray([]);

    if (this.editmode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        // tslint:disable-next-line:prefer-const
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required])
                })
              );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onNewIngredient() {
    return (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
          name: new FormControl(null, Validators.required ),
          amount: new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/), Validators.required])
          })
        );
  }

}
