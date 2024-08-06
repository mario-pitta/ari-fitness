import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinosListPage } from './treino-list.page';

const routes: Routes = [
  {
    path: '',
    component: TreinosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreinoListPageRoutingModule {}
