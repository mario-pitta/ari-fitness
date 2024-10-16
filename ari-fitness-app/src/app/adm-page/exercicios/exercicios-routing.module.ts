import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciciosPage } from './exercicios.page';
import { ExercicioFormComponent } from 'src/app/adm-page/exercicios/exercicio-form/exercicio-form.component';

const routes: Routes = [
  {
    path: '',
    component: ExerciciosPage
  },
  {
    path: 'form',
    component: ExercicioFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciciosPageRoutingModule {}
