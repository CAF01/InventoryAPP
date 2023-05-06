import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutRoutingModule } from './private-layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    PrivateLayoutRoutingModule,
  ]
})
export class PrivateLayoutModule { }
