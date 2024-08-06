import { NgModule } from '@angular/core';
import { ExercicioFormComponent } from './exercicio-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ExercicioFormComponent],
  declarations: [ExercicioFormComponent],
  providers: [],
})
export class ExercicioFormModule { }
