import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckInPageRoutingModule } from './check-in-routing.module';

import { CheckInPage } from './check-in.page';
import { QRCodeModule } from 'angularx-qrcode';
import { MaskitoDirective } from "@maskito/angular";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckInPageRoutingModule,
    QRCodeModule,
    MaskitoDirective
],
  declarations: [CheckInPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckInPageModule {}
