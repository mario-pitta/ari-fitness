import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmPagePage } from './adm-page.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdmPagePage,
    children: [
      {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full'
      },
      // {
      //   path: 'membros',
      //   loadChildren: () => import('../usuarios/usuarios.module').then( m => m.UsuariosPageModule),
      //   data: {role: 'admin'},

      // },

      {
        path: 'membros',
        children: [
          {
            path: '',
            loadChildren: () => import('../usuarios/usuarios.module').then( m => m.UsuariosPageModule),
            data: {role: 'admin'}
          },
          {
            path: 'cadastro-usuario',
            loadChildren: () => import('../pessoa-form/pessoa-form.module').then( m => m.PessoaFormPageModule),
            data: {role: 'admin'}
          },
          {
            path: 'ficha-de-treino',
            loadChildren: () => import('../ficha-treino-aluno/ficha-treino-aluno.module').then( m => m.FichaTreinoAlunoPageModule),
            data: {role: 'admin'}
          }
        ]
      },
      {
        path: 'financas',
        loadChildren: () => import('./financas/financas.module').then( m => m.FinancasModule)      },
      {
        path: 'equipamentos',
        loadChildren: () => import('./equipamentos/equipamentos.module').then( m => m.EquipamentosPageModule)
      },
      {
        path: 'exercicios',
        loadChildren: () => import('./exercicios/exercicios.module').then( m => m.ExerciciosPageModule)
      },
      {
        path: 'treinos',
        loadChildren: () => import('./treinos/treinos.module').then( m => m.TreinosPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'calendario',
        loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
      },
      {
        path: 'planejador',
        loadChildren: () => import('./planejador/planejador.module').then( m => m.PlanejadorPageModule)
      },
      {
        path: 'configuracoes',
        children: [
          {
            path: '',
            loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
          },
          {
            path: 'dados-cadastrais',
            loadChildren: () => import('../pessoa-form/pessoa-form.module').then( m => m.PessoaFormPageModule),
          },
          //minha-empresa
          //meus-planos
          //preferencias
        ]

      },
    ]
  },

  // {
  //   path: 'equipamentos',
  //   loadChildren: () => import('./equipamentos/equipamentos.module').then( m => m.EquipamentosPageModule)
  // },
  // {
  //   path: 'exercicios',
  //   loadChildren: () => import('./exercicios/exercicios.module').then( m => m.ExerciciosPageModule)
  // },
  // {
  //   path: 'treinos',
  //   loadChildren: () => import('./treinos/treinos.module').then( m => m.TreinosPageModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'calendario',
  //   loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule)
  // },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmPagePageRoutingModule {}
