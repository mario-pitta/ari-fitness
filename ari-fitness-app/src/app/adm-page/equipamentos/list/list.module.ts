import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipamentoListPageRoutingModule } from './list-routing.module';

import { EquipamentoListPage } from './list.page';
import { FilterByNamePipe } from 'src/core/pipes/filter-by-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipamentoListPageRoutingModule,
    FilterByNamePipe,
  ],
  declarations: [EquipamentoListPage],
})
export class ListPageModule {}
