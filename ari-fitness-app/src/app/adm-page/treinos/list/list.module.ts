import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { TreinoListPageModule } from 'src/app/treino-list/treino-list.module';
// import { TreinosPageModule } from 'src/app/treinos/treinos.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    TreinoListPageModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
