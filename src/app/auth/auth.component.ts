import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'

})
export class AuthComponent {
  @ViewChild('f') form: NgForm;
  signMode = true;

  constructor(private authService: AuthService) {}

  onToggleForm() {
    this.signMode = !this.signMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.signMode) {
      // ....
    } else {
      this.authService.signUp(email, password).subscribe(resData => {
        console.log(resData);
      }, error => {
        console.log(error);
      });
    }
    form.reset();
  }
}
