import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'ficha-treino-aluno',
    loadChildren: () => import('./ficha-treino-aluno/ficha-treino-aluno.module').then( m => m.FichaTreinoAlunoPageModule)
  },
  {
    path: 'treino-list',
    loadChildren: () => import('./treino-list/treino-list.module').then( m => m.TreinoListPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
