import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Treino } from 'src/core/models/Treino';
import { Usuario } from 'src/core/models/Usuario';

@Component({
  selector: 'app-treino-list-item',
  templateUrl: './treino-list-item.component.html',
  styleUrls: ['./treino-list-item.component.scss'],
})
export class TreinoListItemComponent implements OnInit {
  @Input() treino!: Treino | any;
  @Input() user!: Usuario | any;
  @Input() enableEdit!: boolean;
  @Output() output: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}



}
