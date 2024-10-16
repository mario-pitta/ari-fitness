import { EquipamentoService } from 'src/core/services/equipamento/equipamento.service';
import { ToastrService } from './../../../../core/services/toastr/toastr.service';
import { Categoria, Equipamento } from './../../../../core/models/Equipamento';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CategoriaService } from 'src/core/services/categoria/categoria.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PagetitleService } from 'src/core/services/pagetitle.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class EquipamentoFormPage implements OnInit, OnDestroy {
  form!: FormGroup;
  fb = inject(FormBuilder);
  categoriaService = inject(CategoriaService);
  toastr = inject(ToastrService);
  router = inject(Router);
  equipamento!: Equipamento;
  categorias$!: Observable<Categoria[]>;
  loading: boolean = false;
  equipamentoService = inject(EquipamentoService);
  page = inject(PagetitleService);
  aRoute = inject(ActivatedRoute);
  subs$ = new Subscription();

  constructor() {
    this.subs$.add(
      this.router.events.subscribe({
        next: (ev) => {
          if (
            ev instanceof NavigationEnd &&
            ev.url.indexOf('/admin/equipamentos/form') > -1
          ) {
            console.log('NavigationEnd: ', ev);
            this.page.setTitle('Form. Equipamento'.toLocaleUpperCase());
          }
        },
      })
    );
  }

  ngOnInit() {
    console.log('iniciando equipamentoForm...');
    this.createForm();
    this.getCategorias();
    console.log('this.aRoute.snapshot: ', this.aRoute.snapshot);

    if (this.aRoute.snapshot.queryParams['eqpId']) {
      this.getById(this.aRoute.snapshot.queryParams['eqpId']);
    }
  }

  createForm() {
    this.form = this.fb.group({
      id: [null, [Validators.nullValidator]],
      nome: [null, [Validators.required]],
      foto_url: [null, [Validators.nullValidator]],
      categoria_id: [null, [Validators.required]],
      fl_ativo: [true, [Validators.required]],
    });
  }

  getById(id: number) {
    this.form.disable();
    this.loading = true;
    this.equipamentoService.find({ id: id }).subscribe({
      next: (eq) => this.form.patchValue(eq[0]),
      complete: () => {
        this.form.enable();
        this.loading = false;
      },
    });
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

  getCategorias() {
    this.categorias$ = this.categoriaService.find({ fl_ativo: true });
  }

  save() {
    this.equipamentoService.save(this.form.value).subscribe({
      next: (r: any) => {
        this.toastr.success('Sucesso');
      },
      error: (er: any) => {
        console.log(er);
      },
      complete: () => (this.loading = false),
    });
  }
}
