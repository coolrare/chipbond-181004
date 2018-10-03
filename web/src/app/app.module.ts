import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './demo/components/calculator/calculator.component';
import { ChatRoomComponent } from './demo/components/chat-room/chat-room.component';
import { DataTableComponent } from './demo/components/data-table/data-table.component';
import { SignupComponent } from './demo/components/signup/signup.component';
import { CarService } from './demo/service/carservice';
import { CountryService } from './demo/service/countryservice';
import { EventService } from './demo/service/eventservice';
import { NodeService } from './demo/service/nodeservice';
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
import { LayoutModule } from './layout/layout.module';
import { PrimengSharedModule } from './primeng-shared/primeng-shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimengSharedModule,
    LayoutModule
  ],
  declarations: [
    AppComponent,
    DashboardDemoComponent,
    SampleDemoComponent,
    FormsDemoComponent,
    DataDemoComponent,
    PanelsDemoComponent,
    OverlaysDemoComponent,
    MenusDemoComponent,
    MessagesDemoComponent,
    MessagesDemoComponent,
    MiscDemoComponent,
    ChartsDemoComponent,
    EmptyDemoComponent,
    FileDemoComponent,
    UtilsDemoComponent,
    DocumentationComponent,
    CalculatorComponent,
    SignupComponent,
    DataTableComponent,
    ChatRoomComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CarService,
    CountryService,
    EventService,
    NodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
