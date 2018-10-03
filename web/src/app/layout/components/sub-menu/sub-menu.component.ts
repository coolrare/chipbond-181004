import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { LayoutService } from '../../services/layout.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-submenu]',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  animations: [
    trigger('children', [
      state(
        'hiddenAnimated',
        style({
          height: '0px'
        })
      ),
      state(
        'visibleAnimated',
        style({
          height: '*'
        })
      ),
      state(
        'visible',
        style({
          display: 'block'
        })
      ),
      state(
        'hidden',
        style({
          display: 'none'
        })
      ),
      transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class SubMenuComponent {
  @Input()
  item: MenuItem;

  @Input()
  root: boolean;

  @Input()
  visible: boolean;

  _reset: boolean;

  _parentActive: boolean;

  activeIndex: number;

  @Input()
  get reset(): boolean {
    return this._reset;
  }

  set reset(val: boolean) {
    this._reset = val;

    if (this._reset && (this.layoutService.isHorizontal() || this.layoutService.isSlim())) {
      this.activeIndex = null;
    }
  }

  @Input()
  get parentActive(): boolean {
    return this._parentActive;
  }

  set parentActive(val: boolean) {
    this._parentActive = val;

    if (!this._parentActive) {
      this.activeIndex = null;
    }
  }

  constructor(private layoutService: LayoutService) {}

  itemClick(event: Event, item: MenuItem, index: number) {
    if (this.root) {
      this.layoutService.toggleMenuHoverActive();
    }

    // avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    // activate current item and deactivate active sibling if any
    this.activeIndex = this.activeIndex === index ? null : index;

    // execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    // prevent hash change
    if (item.items || (!item.url && !item.routerLink)) {
      setTimeout(() => {
        this.layoutService.moveScrollPanelBar();
      }, 450);
      event.preventDefault();
    }

    // hide menu
    if (!item.items) {
      if (this.layoutService.isHorizontal() || this.layoutService.isSlim()) {
        this.layoutService.enableResetMenu();
      } else {
        this.layoutService.disableResetMenu();
      }

      this.layoutService.disableOverlayMenuActive();
      this.layoutService.disableStaticMenuMobileActive();
      this.layoutService.toggleMenuHoverActive();
    }
  }

  onMouseEnter(index: number) {
    if (
      this.root &&
      this.layoutService.isMenuHoverActive() &&
      (this.layoutService.isHorizontal() || this.layoutService.isSlim()) &&
      !this.layoutService.isMobile() &&
      !this.layoutService.isTablet()
    ) {
      this.activeIndex = index;
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex === index;
  }

  getChildrenAnimation(itemIndex: number) {
    const cancelAnimation = () => (this.layoutService.isSlim() || this.layoutService.isHorizontal()) && this.root;
    const animationPrefix = this.isActive(itemIndex) ? 'visible' : 'hidden';
    const animationPostfix = cancelAnimation() ? '' : 'Animated';
    return `${animationPrefix}${animationPostfix}`;
  }
}
