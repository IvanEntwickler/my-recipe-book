import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
  } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    // find out whether the user is authenthicated or not by looking at the user BehaivourSubject
    // pipe is needed because the user Object cant be assigned to type boolean
    // subscribing to a user Service and with take just listen only once to the user value
    // take operator will automatically unsubscribe after it took the latest user value
    return this.authService.userSubject.pipe(
      take(1),
      map(user => {
      // converts user into boolean and stores it in variable
      // -> mapping the value into true or false
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      // handles redirection after auth was blocked if it is false
      return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
