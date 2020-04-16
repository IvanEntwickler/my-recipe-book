
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.scss']
})
export class RecipesEditComponent implements OnInit {
  editmode = false;
  id: number;


  constructor(private route: ActivatedRoute ) { }

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
       });
  }

}
