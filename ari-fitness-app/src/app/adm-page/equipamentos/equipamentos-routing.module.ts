import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipamentosPage } from './equipamentos.page';

const routes: Routes = [
  {
    path: '',
    component: EquipamentosPage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListPageModule),
      },
      {
        path: 'form',
        loadChildren: () =>
          import('./form/form.module').then((m) => m.AdminEquipamentoFormModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipamentosPageRoutingModule {}
