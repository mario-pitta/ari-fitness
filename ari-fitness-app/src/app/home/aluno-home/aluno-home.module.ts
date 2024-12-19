import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AlunoHomeComponent } from "./aluno-home.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ],
  exports: [AlunoHomeComponent],
  declarations: [AlunoHomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlunoHomeModule { }
