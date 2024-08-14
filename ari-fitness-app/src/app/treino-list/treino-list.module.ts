import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoListPageRoutingModule } from './treino-list-routing.module';
import { TreinosListPage } from './treino-list.page';
import { TreinoListItemModule } from '../shared/treino-list-item/treino-list-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TreinoListPageRoutingModule,
    TreinoListItemModule,
  ],
  declarations: [TreinosListPage],
  schemas: [],
})
export class TreinoListPageModule {}
