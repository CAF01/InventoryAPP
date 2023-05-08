import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './site/private-layout/components/layout/layout.component';
import { AuthGuard } from './site/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: 'home/dashboard'
  },
  { path: 'login', pathMatch:"full", loadChildren: () => import('./site/account/account.module').then(m => m.AccountModule) },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
    { path: 'dashboard', loadChildren: () => import('./site/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
    { path: 'products', loadChildren: () => import('./site/products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard] }, 
    { path: 'catalogs', loadChildren: () => import('./site/catalogs/catalogs.module').then(m => m.CatalogsModule), canActivate: [AuthGuard] }, 
    { path: 'movements', loadChildren: () => import('./site/movements/movements.module').then(m => m.MovementsModule), canActivate: [AuthGuard] }, 
    ]
  },
  { path: 'private-layout', loadChildren: () => import('./site/private-layout/private-layout.module').then(m => m.PrivateLayoutModule) }, 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
