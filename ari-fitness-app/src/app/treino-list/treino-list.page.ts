import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/core/models/Usuario';
import { AuthService } from 'src/core/services/auth/auth.service';
import { TreinoExercicioFormPage } from '../treino-exercicio-form/treino-exercicio-form.page';
import { Treino } from 'src/core/models/Treino';
import { TreinoService } from 'src/core/services/treino/treino.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercicio } from 'src/core/models/Exercicio';
import { ParteDoCorpoService } from 'src/core/services/parte-do-corpo/parte-do-corpo.service';
import { GrupoMuscularService } from 'src/core/services/grupo-muscular/grupo-muscular.service';
import { ParteDoCorpo } from 'src/core/models/ParteDoCorpo';
import { GrupoMuscular } from 'src/core/models/GrupoMuscular';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'src/core/services/toastr/toastr.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-treinos-list',
  templateUrl: './treino-list.page.html',
  styleUrls: ['./treino-list.page.scss'],
})
export class TreinosListPage implements OnInit {
  filteredTreinos: Treino[] = [];

  user!: Usuario;
  selectedTreino: any;
  interval: number = 15;
  openModal: boolean = false;
  loading: boolean = false;
  treinos: Treino[] = [];
  form: FormGroup = new FormGroup({});
  partesDoCorpo: ParteDoCorpo[] = [];
  gruposMusculares: GrupoMuscular[] = [];
  searchText: string = '';
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private modalController: ModalController,
    private treinoService: TreinoService,
    private parteDoCorpoService: ParteDoCorpoService,
    private grupoMuscularService: GrupoMuscularService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser;
    console.log(this.user);
    this.createForm();
    this.loadData();
    // this.selectedTreino = this.user.treinos && this.user.treinos[0];
  }

  loadData() {
    console.log('forkJoin initing, list page...');
    forkJoin([
      this.getTreinos(),
      this.getGruposMusculares(),
      this.getPartesDoCorpo(),
    ]);
  }

  getTreinos() {
    return this.treinoService.find().subscribe({
      next: (treinos: Treino[]) => {
        return (this.filteredTreinos = this.treinos = treinos);
      },
    });
  }

  onTreinoSelected(event: any) {
    // this.selectedTreino = this.user.treinos
    // console.log(this.selectedTreino);
    this.form?.patchValue({
      ...this.treinos.find((t: any) => t.id === event.detail.value),
    });
  }

  get f() {
    return this.form;
  }

  get exercicios() {
    return this.f?.get('exercicios') as FormArray;
  }

  createForm() {
    this.form = this.fb.group({
      id: [null, Validators.nullValidator],
      nome: ['', [Validators.required]],
      exercicios: this.fb.array([]),
      grupo_muscular_id: [null, Validators.nullValidator],
      grupo_muscular: this.fb.group({}),
      parte_do_corpo_id: [null, Validators.nullValidator],
      parte_do_corpo: this.fb.group({}),
      descricao: [null, Validators.nullValidator],
      fl_publico: [null, Validators.nullValidator],
      nivel_dificuldade: [null, Validators.nullValidator],
    });
  }

  openTreinoEditor(treino: Treino) {
    this.openModal = !this.openModal;
    this.f.patchValue(treino);
    treino.treino_exercicio.forEach((tr: any) => {
      this.setNewExercicio(tr);
    });
  }

  setNewExercicio(ex: Exercicio) {
    console.log('setando novo exer:: ', ex);

    this.exercicios.setControl(
      this.exercicios.value.length,
      this.fb.group(
        ex
        //   {
        //   id: [null, [Validators.nullValidator]],
        //   created_at: [null, [Validators.nullValidator]],
        //   nome: [null, [Validators.nullValidator]],
        //   fl_ativo: [null, [Validators.nullValidator]],
        //   grupo_muscular_id: [null, [Validators.nullValidator]],
        //   grupo_muscular: [null, [Validators.nullValidator]],
        //   musculo_id: [null, [Validators.nullValidator]],
        //   musculo: [null, [Validators.nullValidator]],
        //   equipamento_id: [null, [Validators.nullValidator]],
        //   equipamentos: [null, [Validators.nullValidator]],

        // }
      )
    );

    console.log('this.f: ', this.f);
  }

  removeExercicio(index: number) {
    // const _exercicios = this.exercicios.value;
    this.exercicios.removeAt(index);
    // this.exercicios.patchValue({
    //   ...this.exercicios.value.slice(index, 1),
    // });
  }

  setInterval(e: any) {
    this.interval = e.value;
    console.log(this.interval);
    console.log(this.interval);
  }

  getPartesDoCorpo() {
    return this.parteDoCorpoService.findAll().subscribe({
      next: (partes: ParteDoCorpo[]) => {
        return (this.partesDoCorpo = partes);
      },
    });
  }
  getGruposMusculares() {
    return this.grupoMuscularService.findAll().subscribe({
      next: (grupos: GrupoMuscular[]) => {
        return (this.gruposMusculares = grupos);
      },
    });
  }

  enableRotation(el: any) {
    el.target.style.setProperty('--rotation-duration', `${this.interval}s`);
    el.target.style.setProperty('--color', `warning`);
    el.target.classList.toggle('clock-animated');

    setTimeout(() => {}, this.interval);
  }

  openClock() {
    alert('vai abrir o cronometro!');
  }

  closeClock() {}

  openTreinoForm(treino?: Treino) {
    console.log(treino);
    this.modalController
      .create({
        component: TreinoExercicioFormPage,
        componentProps: {
          partesDoCorpo: this.partesDoCorpo,
          gruposMusculares: this.gruposMusculares,
          treino: treino,
        },
      })
      .then(async (modal) => {
        modal.present();

        const { data } = await modal.onDidDismiss();
        console.log('retornando do modal', data);
        if (data?.exercicio) this.setNewExercicio(data);
      });
  }

  closeModal() {
    // this.exercicios.patchValue([]);
    this.exercicios.clear();
    this.f.reset();
    this.modalController.dismiss();
  }

  submitForm() {
    console.log('Submitting form...', this.f.value);
    const req = !this.f.value.id
      ? this.treinoService.create(this.f.value)
      : this.treinoService.update(this.f.value);

    this.loading = true;
    req.subscribe({
      next: (res) => {
        this.loading = false;
        this.closeModal();
        this.getTreinos();
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  excluirTreino(id: number) {
    Swal.fire({
      title: 'Atenção',
      text: 'Tem certeza que deseja excluir esse item? Essa ação não poderá ser desfeita.',
      icon: 'warning',
      cancelButtonText: 'Não',
      showCancelButton: true,
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.treinoService.delete(id).subscribe({
          next: (res) => {
            if (res) {
              this.toastr.success('Treino deletado.');
              this.getTreinos();
            }
          },
        });
      }
    });
  }

  filterList() {
    this.filteredTreinos = this.treinos.filter((tr) =>
      tr.nome.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}

@Component({
  selector: 'app-treinos-list',
  template: `<div class="ion-card">
    <h3>{{ message }}</h3>
    <div class="d-flex">
      <button mat-button (click)="(onDeny)">Action1</button>
      <button mat-button (click)="(onConfirm)">Action2</button>
    </div>
  </div>`,
  styleUrls: ['./treino-list.page.scss'],
})
export class ConfirmModalComponent {
  @Input() message!: string;
  constructor() {}

  onConfirm() {}

  onDeny() {}
}
