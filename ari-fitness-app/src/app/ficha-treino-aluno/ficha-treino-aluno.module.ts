import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaTreinoAlunoPageRoutingModule } from './ficha-treino-aluno-routing.module';

import { FichaTreinoAlunoPage } from './ficha-treino-aluno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FichaTreinoAlunoPageRoutingModule
  ],
  declarations: [FichaTreinoAlunoPage]
})
export class FichaTreinoAlunoPageModule {}
