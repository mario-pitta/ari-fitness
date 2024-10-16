import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipamentoFormPage } from './form.page';

const routes: Routes = [
  {
    path: '',
    component: EquipamentoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipamentoFormRoutingModule {}
