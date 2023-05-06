import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { GetBrandsComponent } from './components/get-brands/get-brands.component';
import { GetCategoriesComponent } from './components/get-categories/get-categories.component';
import { GetLocationsComponent } from './components/get-locations/get-locations.component';

const routes: Routes = [
  { path: 'new-brand', component: AddBrandComponent },
  { path: 'new-category', component: AddCategoryComponent },
  { path: 'new-location', component: AddLocationComponent },
  { path: 'brands', component: GetBrandsComponent },
  { path: 'categories', component: GetCategoriesComponent },
  { path: 'locations', component: GetLocationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
