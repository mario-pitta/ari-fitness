import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanejadorPage } from './planejador.page';

const routes: Routes = [
  {
    path: '',
    component: PlanejadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanejadorPageRoutingModule {}
