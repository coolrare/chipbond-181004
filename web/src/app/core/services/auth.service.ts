import { Injectable } from '@angular/core';
// import { User } from 'oidc-client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: 設定 UserManagerSetting

  constructor() {}

  login() {
    // TODO: 執行登入動作
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
