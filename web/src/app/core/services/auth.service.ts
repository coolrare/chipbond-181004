import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { Observable, of } from 'rxjs';

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
    // TODO: 執行登出動作
  }

  getUser(): Observable<any> {
    // TODO: 取得登入的使用者資訊
    return of(null);
  }

  isLoggedIn(): Observable<boolean> {
    // TODO: 檢查使用者是否有登入
    return of(true);
  }
}
