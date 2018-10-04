import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CalculatorComponent } from './demo/components/calculator/calculator.component';
import { ChatRoomComponent } from './demo/components/chat-room/chat-room.component';
import { DataTableComponent } from './demo/components/data-table/data-table.component';
import { SignupComponent } from './demo/components/signup/signup.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { UtilsDemoComponent } from './demo/view/utilsdemo.component';
import { LayoutComponent } from './layout/components/layout/layout.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardDemoComponent },
      { path: 'sample', component: SampleDemoComponent },
      { path: 'forms', component: FormsDemoComponent },
      { path: 'data', component: DataDemoComponent },
      { path: 'panels', component: PanelsDemoComponent },
      { path: 'overlays', component: OverlaysDemoComponent },
      { path: 'menus', component: MenusDemoComponent },
      { path: 'messages', component: MessagesDemoComponent },
      { path: 'misc', component: MiscDemoComponent },
      { path: 'empty', component: EmptyDemoComponent },
      { path: 'charts', component: ChartsDemoComponent },
      { path: 'file', component: FileDemoComponent },
      { path: 'utils', component: UtilsDemoComponent },
      { path: 'documentation', component: DocumentationComponent },
      { path: 'calculator', component: CalculatorComponent },
      { path: 'datatable', component: DataTableComponent },
      { path: 'chatroom', component: ChatRoomComponent },
      { path: 'datatable/:id', component: DataTableComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
