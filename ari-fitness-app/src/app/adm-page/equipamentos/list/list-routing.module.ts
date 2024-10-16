import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipamentoListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    component: EquipamentoListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipamentoListPageRoutingModule {}
