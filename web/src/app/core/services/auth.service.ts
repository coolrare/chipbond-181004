import { Injectable } from '@angular/core';
import {
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore
} from 'oidc-client';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: 設定 UserManagerSetting
  private _config: UserManagerSettings = {
    authority: 'http://localhost:5000',
    client_id: 'Angular',
    redirect_uri: 'http://localhost:4200/assets/oidc-login.html',
    scope: 'openid profile',
    response_type: 'id_token token',
    post_logout_redirect_uri: 'http://localhost:4200/?postLogout=true',
    userStore: new WebStorageStateStore({ store: window.localStorage })
  };
  private _userManager = new UserManager(this._config);

  constructor() {}

  login() {
    this._userManager.signinRedirect();
  }

  logout() {
    this._userManager.signoutRedirect();
  }

  getUser(): Observable<User> {
    return from(this._userManager.getUser());
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(
      map(user => user && user.access_token && !user.expired)
    );
  }
}
