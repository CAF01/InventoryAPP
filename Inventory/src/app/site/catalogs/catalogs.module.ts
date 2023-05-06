import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { GetLocationsComponent } from './components/get-locations/get-locations.component';
import { GetBrandsComponent } from './components/get-brands/get-brands.component';
import { GetCategoriesComponent } from './components/get-categories/get-categories.component';


@NgModule({
  declarations: [
    AddBrandComponent,
       AddCategoryComponent,
       AddLocationComponent,
       GetLocationsComponent,
       GetBrandsComponent,
       GetCategoriesComponent
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule
  ]
})
export class CatalogsModule { }
