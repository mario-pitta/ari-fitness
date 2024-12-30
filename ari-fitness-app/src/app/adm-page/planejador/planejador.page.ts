import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckboxChangeEventDetail } from '@ionic/angular';
import { IonCheckboxCustomEvent } from '@ionic/core';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/core/models/Usuario';
import { AuthService } from 'src/core/services/auth/auth.service';
import { TarefasService } from 'src/core/services/tarefas/tarefas.service';
import { ToastrService } from 'src/core/services/toastr/toastr.service';

export interface TarefaStatus {
  id: number;
  title: string;
  color: string;
}
export interface Tarefa {
  posicao: any;
  titulo: string;
  descricao: string;
  status: TarefaStatus;
  prioridade: number;
  data_limite_conclusao: Date | string;
  id?: number;
  created_at: Date | string;
  criado_por: number;
  status_tarefa_id: number;
  tipo_tarefa_id: number;
}

@Component({
  selector: 'app-planejador',
  templateUrl: './planejador.page.html',
  styleUrls: ['./planejador.page.scss'],
})
export class PlanejadorPage implements OnInit, OnDestroy {
  prazoChange($event: IonCheckboxCustomEvent<CheckboxChangeEventDetail<any>>) {
    if (!$event.detail.checked) {
      this.taskForm.get('data_limite_conclusao')?.setValue(null);
    }
  }
  showTaskForm: boolean = false;
  cols: { title: string; tasks: Tarefa[]; status_tarefa_id: number }[] = [];

  user: Usuario | null = null;

  taskForm!: FormGroup;

  tiposTarefa: { id: number; descricao: string }[] = [];
  constructor(
    private tarefaService: TarefasService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private dragula: DragulaService
  ) {
    dragula.createGroup('tarefas', {
      removeOnSpill: false,
      revertOnSpill: true,
      direction: 'horizontal',
    });
  }
  @ViewChild('prazo') prazo!: any;
  sub$: Subscription = new Subscription();
  ngOnInit() {
    this.user = this.authService.getUser;
    this.loadTiposTarefa();
    this.loadTasks();
    this.createForm();
    this.buildDragableFeat();
  }

  buildDragableFeat() {
    this.sub$.add(
      this.dragula.drag('tarefas').subscribe((value) => {
        console.log('drag', value);
      })
    );
    this.sub$.add(
      this.dragula
        .dropModel('tarefas')
        .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {
           targetModel.forEach((task: any, index: number) => {
            task.posicao = index + 1;
            this.updateTaskStatus(
              task.id,
              Number(target.id.split('_')[1]),
              task.posicao
            );
          });


          setTimeout(() => {
            this.loadTasks();

          }, 500);
        })
    );
  }

  ngOnDestroy(): void {
    this.dragula.destroy('tarefas');
    this.sub$.unsubscribe();
  }

  loadTiposTarefa() {
    this.tarefaService.getTiposTarefa().subscribe((res: any) => {
      this.tiposTarefa = res;
    });
  }

  getNumberOfTasksByStatus(status: number) {
    return this.cols.find((c) => c.status_tarefa_id == status)?.tasks.length;
  }

  createForm(status: number = 1, task?: Tarefa) {
    this.taskForm = this.fb.group({
      id: [task?.id || null, [Validators.nullValidator]],
      titulo: [task?.titulo || null, [Validators.required]],
      descricao: [task?.descricao || '', [Validators.nullValidator]],
      data_limite_conclusao: [
        task?.data_limite_conclusao || null,
        [Validators.nullValidator],
      ],
      prioridade: [task?.prioridade || 0, [Validators.nullValidator]],
      tipo_tarefa_id: [task?.tipo_tarefa_id || 3, [Validators.nullValidator]],
      criado_por: [task?.criado_por || this.user?.id, [Validators.required]],
      status_tarefa_id: [
        task?.status_tarefa_id || status,
        [Validators.nullValidator],
      ],
      posicao: [
        task?.posicao || this.getNumberOfTasksByStatus(status),
        [Validators.nullValidator],
      ],
      empresa_id: [this.user?.empresa?.id, [Validators.nullValidator]],
    });

    setTimeout(() => {
      console.log('this.prazo: ', this.prazo);
      if (task?.data_limite_conclusao) {
        this.prazo.el.value = true;
      }
    }, 850);
  }

  updateTaskStatus(taskId: number, status: number, posicao: number = 0) {
    this.tarefaService
      .updateStatus(taskId, status, posicao)
      .subscribe((res) => {});
  }

  log(v: any) {
    console.log('logging: ', v);
  }
  loadTasks() {
    this.tarefaService
      .getByFilters({ fl_ativo: true, empresa_id: this.user?.empresa?.id })
      .subscribe((res) => {
        this.cols = [
          {
            title: 'A Fazer',
            tasks: res
              .filter((t: Tarefa) => t.status_tarefa_id == 1)
              .sort((a, b) => a.posicao - b.posicao),
            status_tarefa_id: 1,
          },
          {
            title: 'Fazendo',
            tasks: res
              .filter((t: Tarefa) => t.status_tarefa_id == 2)
              .sort((a, b) => a.posicao - b.posicao),
            status_tarefa_id: 2,
          },
          {
            title: 'Feito',
            tasks: res
              .filter((t: Tarefa) => t.status_tarefa_id == 3)
              .sort((a, b) => a.posicao - b.posicao),
            status_tarefa_id: 3,
          },
        ];
      });

    console.log('this.cols: ', this.cols);
  }

  get f() {
    return this.taskForm;
  }

  saveTask() {
    const tarefa = this.taskForm.value as unknown as Tarefa;
    console.log('tarefa: ', tarefa);

    if (!tarefa.id) delete tarefa.id;

    const req = !tarefa.id
      ? this.tarefaService.create(tarefa)
      : this.tarefaService.update(tarefa);
    req.subscribe({
      next: (res) => {
        console.log('res: ', res);
        this.loadTasks();
        this.showTaskForm = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        // this.toastr.error(err.message);
      },
    });
  }
}
