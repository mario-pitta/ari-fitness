import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  inject,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Equipamento } from 'src/core/models/Equipamento';
import { Exercicio } from 'src/core/models/Exercicio';
import { GrupoMuscular } from 'src/core/models/GrupoMuscular';
import { Musculo } from 'src/core/models/Musculo';
import { EquipamentoService } from 'src/core/services/equipamento/equipamento.service';
import { ExercicioService } from 'src/core/services/exercicio/exercicio.service';
import { GrupoMuscularService } from 'src/core/services/grupo-muscular/grupo-muscular.service';
import { MusculoService } from 'src/core/services/musculo/musculo.service';
import { PagetitleService } from 'src/core/services/pagetitle.service';
import { ToastrService } from 'src/core/services/toastr/toastr.service';

@Component({
  selector: 'app-exercicio-form',
  templateUrl: './exercicio-form.component.html',
  styleUrls: ['./exercicio-form.component.scss'],
})
export class ExercicioFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading: any = false;
  aRoute = inject(ActivatedRoute);
  constructor(
    private fb: FormBuilder,
    private musculoService: MusculoService,
    private gpMuscularService: GrupoMuscularService,
    private exerService: ExercicioService,
    private toastr: ToastrService,
    private equipamentoService: EquipamentoService,
    private page: PagetitleService,
    private router: Router
  ) {}
  subs$ = new Subscription();
  ngOnInit() {
    console.log(' ExercicioFormComponent ngOnInit: ');
    this.createForm();
    this.loadData();
    if (this.aRoute.snapshot.queryParams['exId']) {
      this.getById(this.aRoute.snapshot.queryParams['exId']);
    }
    this.subs$.add(
      this.router.events.subscribe({
        next: (ev) => {
          if (ev instanceof NavigationEnd
            && ev.url.indexOf("/admin/exercicios/form") > -1
          ) {
            console.log('NavigationEnd: ', ev);
            this.page.setTitle(('Form. Exercício').toLocaleUpperCase());
          }
        },
      })
    );
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: ');

    this.subs$.unsubscribe();
  }

  loadData() {
    forkJoin([
      this.getMusculos(),
      this.getGruposMusculares(),
      this.getEquipamentos(),
    ]);
  }

  createForm() {
    this.form = this.fb.group({
      id: [null, [Validators.nullValidator]],
      nome: [null, [Validators.required]],
      fl_ativo: [true, [Validators.required]],
      midia_url: [null, [Validators.nullValidator]],
      grupo_muscular_id: [null, [Validators.required]],
      musculo_id: [null, [Validators.required]],
      equipamento_id: [null, [Validators.nullValidator]],
    });
  }

  filterMusculos() {
    const params: Partial<Musculo> = {
      fl_ativo: true,
      grupo_muscular_id: this.form.value.grupo_muscular_id,
    };

    this.musculos$ = this.musculoService.find(params);
  }
  getById(id: number) {
    this.form.disable();
    this.loading = true;
    this.exerService.find({ id: id }).subscribe({
      next: (eq) => this.form.patchValue(eq[0]),
      complete: () => {
        this.form.enable();
        this.loading = false;
      },
    });
  }

  musculos$!: Observable<Musculo[]>;
  getMusculos() {
    this.musculos$ = this.musculoService.find({ fl_ativo: true });
  }

  gruposMusculares$!: Observable<GrupoMuscular[]>;
  getGruposMusculares() {
    this.gruposMusculares$ = this.gpMuscularService.findAll({ fl_ativo: true });
  }
  equipamentos$!: Observable<Equipamento[]>;
  getEquipamentos() {
    this.equipamentos$ = this.equipamentoService.find({ fl_ativo: true });
  }

  save() {
    this.loading = true;
    this.exerService.save(this.form.value).subscribe({
      next: (r: any) => this.toastr.success('Salvo com sucesso'),
      error: (er: any) => console.error(er),
      complete: () => (this.loading = false),
    });
  }
}
