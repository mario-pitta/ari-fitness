import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmPagePage } from './adm-page.page';

const routes: Routes = [
  {
    path: '',
    component: AdmPagePage
  },  {
    path: 'equipamentos',
    loadChildren: () => import('./equipamentos/equipamentos.module').then( m => m.EquipamentosPageModule)
  },
  {
    path: 'exercicios',
    loadChildren: () => import('./exercicios/exercicios.module').then( m => m.ExerciciosPageModule)
  },
  {
    path: 'treinos',
    loadChildren: () => import('./treinos/treinos.module').then( m => m.TreinosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmPagePageRoutingModule {}
