import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoListPageRoutingModule } from './treino-list-routing.module';
import { TreinosListPage } from './treino-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinoListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TreinosListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TreinoListPageModule {}
