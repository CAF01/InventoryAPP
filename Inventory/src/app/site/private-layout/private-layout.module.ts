import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutRoutingModule } from './private-layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PrivateLayoutRoutingModule,
  ]
})
export class PrivateLayoutModule { }
