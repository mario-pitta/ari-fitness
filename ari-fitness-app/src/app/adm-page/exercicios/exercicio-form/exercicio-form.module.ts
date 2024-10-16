import { NgModule } from '@angular/core';
import { ExercicioFormComponent } from './exercicio-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FilterByNamePipe } from 'src/core/pipes/filter-by-name.pipe';



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule, IonicModule, FilterByNamePipe
  ],
  exports: [ExercicioFormComponent],
  declarations: [ExercicioFormComponent],
  providers: [],
})
export class ExercicioFormModule { }
