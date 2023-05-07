import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovementListComponent } from './components/movement-list/movement-list.component';
import { AddMovementComponent } from './components/add-movement/add-movement.component';

const routes: Routes = [
  {
    path: '',
    component:MovementListComponent
  },
  {
    path: 'add-movement',
    component:AddMovementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRoutingModule { }
