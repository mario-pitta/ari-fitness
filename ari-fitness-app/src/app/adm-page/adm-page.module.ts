import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmPagePageRoutingModule } from './adm-page-routing.module';

import { AdmPagePage } from './adm-page.page';
import { AdminHomeModule } from './admin-home/admin-home.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminHomeModule,
    AdmPagePageRoutingModule
  ],
  declarations: [AdmPagePage]
})
export class AdmPagePageModule {}
