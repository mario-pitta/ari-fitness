import { NgModule } from "@angular/core";
import { AdminHomeComponent } from "./admin-home.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    IonicModule,
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
