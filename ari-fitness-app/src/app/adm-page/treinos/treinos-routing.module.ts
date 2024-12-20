import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinosPage } from './treinos.page';

const routes: Routes = [
  {
    path: '',
      loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreinosPageRoutingModule {}
