
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'

})
export class AuthComponent {
  @ViewChild('f') form: NgForm;
  // by putting Directive inside viewchild,
  // viewchild finds the first place were we use it in the Template
  // @ViewChild('alert', { static: false, read: ViewContainerRef }) alertViewContainer: ViewContainerRef;
  signMode = true;
  isLoading = false;
  isError: string = null;
  // private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
    ) {}

  // dynamic Component approach with *ngIf
  onCloseError() {
    this.isError = null;
  }

  // toggles between signin and sign up
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
      // sets the property equal to the errorMessage which comes from the Observable
      this.isError = errorMessage;
      // this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });
    form.reset();
  }

  // ngOnDestroy() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

  // dynamic Component approach creation method programmatically
  // private showErrorAlert(message: string) {
  //   // object that knows how to create AlertComponents
  //  const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);


  //  // clearing everything that might have rendered before in that place of DOM
  //  this.alertViewContainer.clear();
  //  // passing the factory in the createComponent method
  //  // which will create a new component in this place in DOM
  //  const componentRef = this.alertViewContainer.createComponent(alertComponentFactory);

  //  // to get access of the properties from the passed AlertComponent
  //  componentRef.instance.message = message;
  //  // listens to the closeButton Event and unsubscribes it
  //  this. subscription = componentRef.instance.closeButton.subscribe(() => {
  //    this.subscription.unsubscribe();
  //    this.alertViewContainer.clear();
  //  });
  // }
}
