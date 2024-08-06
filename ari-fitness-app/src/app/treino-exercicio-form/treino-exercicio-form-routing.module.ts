import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinoExercicioFormPage } from './treino-exercicio-form.page';

const routes: Routes = [
  {
    path: '',
    component: TreinoExercicioFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreinoFormPageRoutingModule {}
