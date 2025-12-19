import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Treino } from 'src/core/models/Treino';
import { Usuario } from 'src/core/models/Usuario';
import { TreinoService } from 'src/core/services/treino/treino.service';

@Component({
  selector: 'app-treino-list-item',
  templateUrl: './treino-list-item.component.html',
  styleUrls: ['./treino-list-item.component.scss'],
})
export class TreinoListItemComponent implements OnInit {
  @Input() treino!: Treino | any;
  @Input() user!: Usuario | any;
  @Input() enableEdit!: boolean;
  @Input() enableSelect!: boolean;
  @Output() output: EventEmitter<any> = new EventEmitter();
  constructor(private treinoService: TreinoService) {}

  ngOnInit() {}
 
 
  deleteTreino(id: number) {
    this.output.emit({action: 'loading', value: true});
    this.treinoService.delete(id).subscribe({
      next: () => {
        this.output.emit({action: 'reload', value: true});
      },
      error: (err) => console.error(err),
      complete: () => {

      }
    })
  }


}
