import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciciosPageRoutingModule } from './exercicios-routing.module';

import { ExerciciosPage } from './exercicios.page';
import { FilterByNamePipe } from "../../../core/pipes/filter-by-name.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciciosPageRoutingModule,
    FilterByNamePipe
],
  declarations: [ExerciciosPage]
})
export class ExerciciosPageModule {}
