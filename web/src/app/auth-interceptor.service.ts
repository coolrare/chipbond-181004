import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getUser().pipe(
      map(user => (user || <User>{}).access_token),
      map(accessToken =>
        req.clone({
          setHeaders: { Authorization: `Bearer ${accessToken}` }
        })
      ),
      switchMap(newRequest => next.handle(newRequest))
    );
  }

  constructor(private authService: AuthService) {}
}
