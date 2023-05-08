import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementListComponent } from './components/movement-list/movement-list.component';
import { AddMovementComponent } from './components/add-movement/add-movement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MovementListComponent,
    AddMovementComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MovementsModule { }
