import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  recipe: Recipe[];
  isAuth = false;

  ngOnInit() {
    // if user object is there isAuth will become true, if null isAuth=false
    this.subscription = this.authService.userSubject.subscribe(
      user => {
        switch (user) {
          case user:
          this.isAuth = !this.isAuth;
          break;
          case null:
          return this.isAuth;
        }
      }
    );
  }

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  onSaveData() {
    return this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
