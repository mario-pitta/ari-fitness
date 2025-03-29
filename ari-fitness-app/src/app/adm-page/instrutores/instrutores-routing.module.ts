import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstrutoresPage } from './instrutores.page';

const routes: Routes = [
  {
    path: '',
    component: InstrutoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrutoresPageRoutingModule {}
