import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrimengSharedModule } from '../primeng-shared/primeng-shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { InlineProfileComponent } from './components/inline-profile/inline-profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';


@NgModule({
  imports: [CommonModule, PrimengSharedModule],
  declarations: [
    LayoutComponent,
    TopbarComponent,
    InlineProfileComponent,
    MenuComponent,
    SubMenuComponent,
    FooterComponent
  ]
})
export class LayoutModule {}
