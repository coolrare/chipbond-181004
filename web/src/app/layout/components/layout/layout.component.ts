import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ScrollPanel } from 'primeng/primeng';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  overlayMenuActive$ = this.layoutService.overlayMenuActive$;
  darkMenu$ = this.layoutService.darkMenu$;
  staticMenuDesktopInactive$ = this.layoutService.staticMenuDesktopInactive$;
  staticMenuMobileActive$ = this.layoutService.staticMenuMobileActive$;
  resetMenu$ = this.layoutService.resetMenu$;

  @ViewChild('layoutMenuScroller')
  layoutMenuScrollerViewChild: ScrollPanel;

  constructor(public renderer: Renderer2, private layoutService: LayoutService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.layoutService.setScrollPanel(this.layoutMenuScrollerViewChild);
      this.layoutService.moveScrollPanelBar();
    }, 100);
  }

  onMenuClick($event: Event) {
    this.layoutService.onMenuClick();
    $event.preventDefault();
  }

  onLayoutClick() {
    this.layoutService.onLayoutClick();
  }

  isOverlay() {
    return this.layoutService.isOverlay();
  }

  isHorizontal() {
    return this.layoutService.isHorizontal();
  }

  isSlim() {
    return this.layoutService.isSlim();
  }

  isDisplayProfileItem() {
    return this.layoutService.isInlineProfileMode();
  }
}
