import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userSubject.pipe(
      // take enables to use values( in this case only one: the token) from Observables and unsubscribe after that
      // exhaustMap waits for the first Observable to complete, after that it gives us the latest user from the previous Observable
      // then a new Observable gets returned, which replaces the previous Observable
      take(1),
      exhaustMap(user => {
        // checks if we have an user: !user returns next.handle for the original HttpRequest
        if (!user) {
          return next.handle(req);
        }
        // returns when we have an userthen the modified Request gets returned
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
        return next.handle(modifiedReq);
      }));
  }
}
