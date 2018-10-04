import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { LayoutService } from '../../services/layout.service';

interface UserInfo {
  name: string;
  age: number;
}
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  rotateMenuButton$ = this.layoutService.rotateMenuButton$;
  topMenuActive$ = this.layoutService.topbarMenuActive$;

  // TODO: 檢查使用者是否有登入
  // TODO: 呼叫受保護的 API

  get activeTopbarItem() {
    return this.layoutService.getActiveTopbarItem();
  }

  userInfo$: Observable<UserInfo>;

  constructor(
    private layoutService: LayoutService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      console.log(user);
    });
  }

  isDisplayProfileItem() {
    return this.layoutService.isTopProfileMode();
  }

  onMenuButtonClick($event: Event) {
    this.layoutService.onMenuButtonClick();
    $event.preventDefault();
  }

  onTopbarMenuButtonClick($event: Event) {
    this.layoutService.onTopbarMenuButtonClick();
    $event.preventDefault();
  }

  onTopbarItemClick($event: Event, profile: any) {
    this.layoutService.onTopbarItemClick(profile);
    $event.preventDefault();
  }

  onTopbarSubItemClick($event: Event) {
    this.layoutService.onTopbarSubItemClick();
    $event.preventDefault();
  }

  login() {
    // TODO: 執行登入行為
    this.authService.login();
  }

  logout() {
    // TODO: 執行登出動做
    this.authService.logout();
  }
}
