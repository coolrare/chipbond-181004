import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getLoginUserName() {
    return of('Mike');
  }

  getLoginUserAge() {
    return of(18);
  }

  checkUserExist(username) {
    console.log(`Check Username => ${username}`);
    return iif(() => username === 'Mike', of(true), of(false));
  }

  getIdentity() {
    // TODO: 實際上呼叫受 IdentityServer 保護的 API
    return of(null);
  }
}
