import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoFormPageRoutingModule } from './treino-exercicio-form-routing.module';
import { TreinoExercicioFormPage } from './treino-exercicio-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinoFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TreinoExercicioFormPage]
})
export class TreinoFormPageModule {}
