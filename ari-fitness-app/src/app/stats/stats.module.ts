import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';

import { StatsPage } from './stats.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    NgxChartsModule
  ],
  declarations: [StatsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatsPageModule {}
