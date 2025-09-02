import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPage } from './usuarios.page';
import Constants from 'src/core/Constants';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'formulario',
        loadChildren: () => import('../pessoa-form/pessoa-form.module').then(m => m.PessoaFormPageModule),
        data: {
          tipoUsuario: Constants.ALUNO_ID
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPageRoutingModule { }
