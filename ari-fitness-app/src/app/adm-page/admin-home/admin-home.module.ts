import { NgModule } from "@angular/core";
import { AdminHomeComponent } from "./admin-home.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminHomeComponent
  ],
  declarations: [
    AdminHomeComponent
  ]
})
export class AdminHomeModule {}
