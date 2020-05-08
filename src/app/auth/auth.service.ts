import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs'; /// creates a new observable which wraps the error

/// Data we get back from Firebase
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; /// only needed in signIn
}


@Injectable({providedIn: 'root'})
export class AuthService {
  userSubject = new Subject<User>();
  constructor(private http: HttpClient) {}

  // user signUp
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvCDuw8y-IOeBgYCAS4hwkX6rLOsvcmUc'
      ,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap( resData => {
      return this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    })); // tap handles the response data without altering the observable chain
  }


  // user signIn
  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvCDuw8y-IOeBgYCAS4hwkX6rLOsvcmUc'
      ,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      return this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    })); // tap handles the response data without altering the observable chain
  }

  // outsourced the auth handling for signin and signup into a private method
  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
      // creating the Date and from sec to millisec
      // after that Date() is converting it back to an Date Object
      const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
      // the user is constructed which gets send via next() as the currently logged in user
      const user = new User(
        email,
        userId,
        token,
        expireDate
      );
      this.userSubject.next(user);
  }

  // outsourced the error handling for signin and signup into a private method
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct!';
        break;
    }
    return throwError(errorMessage);
    }
}
