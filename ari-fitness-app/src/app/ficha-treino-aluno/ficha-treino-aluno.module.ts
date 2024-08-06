import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaTreinoAlunoPageRoutingModule } from './ficha-treino-aluno-routing.module';

import { FichaTreinoAlunoPage } from './ficha-treino-aluno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaTreinoAlunoPageRoutingModule
  ],
  declarations: [FichaTreinoAlunoPage]
})
export class FichaTreinoAlunoPageModule {}
