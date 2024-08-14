import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaTreinoAlunoPage } from './ficha-treino-aluno.page';

const routes: Routes = [
  {
    path: '',
    component: FichaTreinoAlunoPage,
    children: [
      {
        path: 'treino',
        loadChildren: () => import('../treinos/treinos.module').then(m => m.TreinosPageModule),

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaTreinoAlunoPageRoutingModule {}
