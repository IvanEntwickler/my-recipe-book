import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'

})
export class AuthComponent {
  @ViewChild('f') form: NgForm;
  signMode = true;
  isLoading = false;
  isError: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onToggleForm() {
    this.signMode = !this.signMode;
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // variable with type Observable that will store the subscription
    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true; // the loading spinner
    if (this.signMode) {
      authObservable = this.authService.signIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    // outsourced subscription after the if state above for DRY code
    authObservable.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.isError = errorMessage; // sets the property equal to the errorMessage which comes from the Observable
      this.isLoading = false;
    });
    form.reset();
  }
}
