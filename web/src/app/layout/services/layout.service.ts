import { Injectable } from '@angular/core';
import { ScrollPanel } from 'primeng/primeng';
import { BehaviorSubject } from 'rxjs';
import { MenuOrientation } from '../enums/menu-orientation.enum';
import { ProfileMode } from '../enums/profile-mode.enum';

const DESKTOP_MIN_SIZE = 1024;
const MOBILE_MAX_SIZE = 640;

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  layoutMode$ = new BehaviorSubject(MenuOrientation.STATIC);
  profileMode$ = new BehaviorSubject(ProfileMode.Inline);
  activeTopbarItem$ = new BehaviorSubject(null);

  menuClick$ = new BehaviorSubject(false);
  topbarItemClick$ = new BehaviorSubject(false);
  darkMenu$ = new BehaviorSubject(false);
  rotateMenuButton$ = new BehaviorSubject(false);
  topbarMenuActive$ = new BehaviorSubject(false);
  overlayMenuActive$ = new BehaviorSubject(false);
  staticMenuDesktopInactive$ = new BehaviorSubject(false);
  staticMenuMobileActive$ = new BehaviorSubject(false);
  resetMenu$ = new BehaviorSubject(false);
  menuHoverActive$ = new BehaviorSubject(false);

  private _menuScrollPanel: ScrollPanel;

  constructor() {}

  // #region layoutMode

  isOverlay() {
    return this.layoutMode$.value === MenuOrientation.OVERLAY;
  }

  isHorizontal() {
    return this.layoutMode$.value === MenuOrientation.HORIZONTAL;
  }

  isSlim() {
    return this.layoutMode$.value === MenuOrientation.SLIM;
  }

  changeToStaticMenu() {
    this.layoutMode$.next(MenuOrientation.STATIC);
  }

  changeToOverlayMenu() {
    this.layoutMode$.next(MenuOrientation.OVERLAY);
  }

  changeToHorizontalMenu() {
    this.layoutMode$.next(MenuOrientation.HORIZONTAL);
  }

  changeToSlimMenu() {
    this.layoutMode$.next(MenuOrientation.SLIM);
  }

  // #endregion

  // #region darkMenu

  disableDarkMenu() {
    this.darkMenu$.next(false);
  }

  enableDarkMenu() {
    this.darkMenu$.next(true);
  }

  // #endregion

  // #region profileMode

  changeInlineProfileMode() {
    this.profileMode$.next(ProfileMode.Inline);
  }

  changeTopProfileMode() {
    this.profileMode$.next(ProfileMode.Top);
  }

  isInlineProfileMode() {
    return this.profileMode$.value === ProfileMode.Inline && !this.isHorizontal();
  }

  isTopProfileMode() {
    return this.profileMode$.value === ProfileMode.Top || this.isHorizontal();
  }

  // #endregion

  // #region rotateMenuButton

  toggleRotateMenuButton() {
    this.rotateMenuButton$.next(!this.rotateMenuButton$.value);
  }

  disableRotateMenuButton() {
    this.rotateMenuButton$.next(false);
  }

  // #endregion

  // #region topbarMenuActive

  toggleTopbarMenuActive() {
    this.topbarMenuActive$.next(!this.topbarMenuActive$.value);
  }

  disableTopbarMenuActive() {
    this.topbarMenuActive$.next(false);
  }

  // #endregion

  // #region OverlayMenuActive

  isOverlayMenuActive() {
    return this.overlayMenuActive$.value;
  }

  toggleOverlayMenuActive() {
    this.overlayMenuActive$.next(!this.overlayMenuActive$.value);
  }

  disableOverlayMenuActive() {
    this.overlayMenuActive$.next(false);
  }

  // #endregion

  // #region staticMenuDesktopInactive

  toggleStaticMenuDesktopInactive() {
    this.staticMenuDesktopInactive$.next(!this.staticMenuDesktopInactive$.value);
  }

  // #endregion

  // #region staticMenuMobileActive

  isStaticMenuMobileActive() {
    return this.staticMenuMobileActive$.value;
  }

  toggleStaticMenuMobileActive() {
    this.staticMenuMobileActive$.next(!this.staticMenuMobileActive$.value);
    console.log(this.staticMenuMobileActive$.value);
  }

  disableStaticMenuMobileActive() {
    this.staticMenuMobileActive$.next(false);
  }

  // #endregion

  // #region menuClick

  isMenuClick() {
    return this.menuClick$.value;
  }

  disableMenuClick() {
    return this.menuClick$.next(false);
  }

  enableMenuClick() {
    return this.menuClick$.next(true);
  }

  // #endregion

  // #region topbarItemClick

  isTopbarItemClick() {
    return this.topbarItemClick$.value;
  }

  disableTopbarItemClick() {
    this.topbarItemClick$.next(false);
  }

  enableTopbarItemClick() {
    this.topbarItemClick$.next(true);
  }

  // #endregion

  // #region activeTopbarItem

  getActiveTopbarItem() {
    return this.activeTopbarItem$.value;
  }

  resetActiveTopbarItem() {
    this.activeTopbarItem$.next(null);
  }

  setActiveTopbarItem(item) {
    this.activeTopbarItem$.next(item);
  }

  // #endregion

  // #region resetMenu

  enableResetMenu() {
    this.resetMenu$.next(true);
  }

  disableResetMenu() {
    this.resetMenu$.next(false);
  }

  // #endregion

  // #region menuHoverActive

  isMenuHoverActive() {
    return this.menuHoverActive$.value;
  }

  toggleMenuHoverActive() {
    return this.menuHoverActive$.next(!this.menuHoverActive$.value);
  }

  disableMenuHoverActive() {
    return this.menuHoverActive$.next(false);
  }

  // #endregion

  // #region screen size

  isTablet() {
    const width = window.innerWidth;
    return width <= DESKTOP_MIN_SIZE && width > MOBILE_MAX_SIZE;
  }

  isDesktop() {
    return window.innerWidth > DESKTOP_MIN_SIZE;
  }

  isMobile() {
    return window.innerWidth <= MOBILE_MAX_SIZE;
  }

  // #endregion

  // #region menuScrollPanel

  setScrollPanel(scrollPanel: ScrollPanel) {
    this._menuScrollPanel = scrollPanel;
  }

  moveScrollPanelBar() {
    this._menuScrollPanel.moveBar();
  }

  // #endregion

  // #region events

  onMenuClick() {
    this.enableMenuClick();
    this.disableResetMenu();

    if (!this.isHorizontal()) {
      setTimeout(() => {
        this.moveScrollPanelBar();
      }, 450);
    }
  }

  onLayoutClick() {
    if (!this.isTopbarItemClick()) {
      this.resetActiveTopbarItem();
      this.disableTopbarMenuActive();
    }

    if (!this.isMenuClick()) {
      if (this.isHorizontal() || this.isSlim()) {
        this.enableResetMenu();
      }

      if (this.isOverlayMenuActive() || this.isStaticMenuMobileActive()) {
        this._hideOverlayMenu();
      }

      this.disableMenuHoverActive();
    }

    this.disableTopbarItemClick();
    this.disableMenuClick();
  }

  onMenuButtonClick() {
    this.enableMenuClick();
    this.toggleRotateMenuButton();
    this.disableTopbarMenuActive();

    if (this.isOverlay()) {
      this.toggleOverlayMenuActive();
    } else {
      if (this.isDesktop()) {
        this.toggleStaticMenuDesktopInactive();
      } else {
        this.toggleStaticMenuMobileActive();
      }
    }
  }

  onTopbarMenuButtonClick() {
    this.enableTopbarItemClick();
    this.toggleTopbarMenuActive();

    this._hideOverlayMenu();
  }

  onTopbarItemClick(item) {
    this.enableTopbarItemClick();
    if (this.getActiveTopbarItem() === item) {
      this.resetActiveTopbarItem();
    } else {
      this.setActiveTopbarItem(item);
    }
  }

  onTopbarSubItemClick() {}

  private _hideOverlayMenu() {
    this.disableRotateMenuButton();
    this.disableOverlayMenuActive();
    this.disableStaticMenuMobileActive();
  }

  // #endregion
}
