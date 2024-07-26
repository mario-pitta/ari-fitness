import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinosPageRoutingModule } from './treinos-routing.module';

import { TreinosPage } from './treinos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TreinosPage],
  exports: [TreinosPage],
})
export class TreinosPageModule {}
