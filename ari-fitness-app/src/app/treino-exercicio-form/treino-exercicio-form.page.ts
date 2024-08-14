import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EquipamentoService } from 'src/core/services/equipamento/equipamento.service';
import { forkJoin, of } from 'rxjs';
import { MusculoService } from 'src/core/services/musculo/musculo.service';
import { Equipamento } from 'src/core/models/Equipamento';
import { Musculo } from 'src/core/models/Musculo';
import { Exercicio } from 'src/core/models/Exercicio';
import { ExercicioService } from 'src/core/services/exercicio/exercicio.service';
import { Treino } from 'src/core/models/Treino';
import { ParteDoCorpo } from 'src/core/models/ParteDoCorpo';
import { GrupoMuscular } from 'src/core/models/GrupoMuscular';

@Component({
  selector: 'app-treino-form',
  templateUrl: './treino-exercicio-form.page.html',
  styleUrls: ['./treino-exercicio-form.page.scss'],
})
export class TreinoExercicioFormPage implements OnInit {
  loading: boolean = false;
  form!: FormGroup;
  equipamentos: Equipamento[] = [];
  musculos: Musculo[] = [];
  exercicios: Exercicio[] = [];
  @Input() partesDoCorpo: ParteDoCorpo[] = [];
  @Input() gruposMusculares: GrupoMuscular[] = [];
  @Input() treino!: Treino;


  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private equipamentoService: EquipamentoService,
    private musculoService: MusculoService,
    private exerciciosService: ExercicioService
  ) {}

  get f() {
    return this.form;
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      exercicio: [null, [Validators.required]],
      equipamento: [null, [Validators.required]],
      series: [null, [Validators.nullValidator]],
      repeticoes: [null, [Validators.nullValidator]],
      intervalo: [null, [Validators.nullValidator]],
      carga: [null, [Validators.nullValidator]],
    });
    this.loadData();
    if(this.treino) this.f.patchValue(this.treino)
      console.log(this.f)



  }

  async onSaveButtonClick() {
    console.log(this.f.value);
    this.onCloseModal(this.f.value);
  }

  loadData() {
    console.log('forkJoin initing')
    forkJoin([this.getEquipamentos(), this.getExercicios()])
  }

  getEquipamentos() {
    return this.equipamentoService.find()
    .subscribe({
      next: (arg: Equipamento[]) => {
        this.equipamentos = arg;
        return of(this.equipamentos)
      },
    });
  }
  getMusculos() {
    return this.musculoService.find()
    .subscribe({
      next: (arg: Musculo[]) => {
        this.musculos = arg;
        return of(this.musculos)
      },
    });
  }
  getExercicios() {
    this.exerciciosService.find().subscribe({
      next: (arg: Exercicio[]) => {
        this.exercicios = arg;
      },
    });
  }

  async onCloseModal(value: Treino['exercicios']) {
    await this.modalController.dismiss(value);
  }
}
