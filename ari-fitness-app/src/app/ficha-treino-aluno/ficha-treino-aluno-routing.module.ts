import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaTreinoAlunoPage } from './ficha-treino-aluno.page';

const routes: Routes = [
  {
    path: '',
    component: FichaTreinoAlunoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaTreinoAlunoPageRoutingModule {}
