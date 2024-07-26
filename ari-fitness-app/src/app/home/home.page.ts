import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user = {
    name: 'Mario',
    treinos: [
      {
        id: 1,
        descricao: 'Treino ABC1',
        exercicios: [
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
        ],
      },
      {
        id: 2,
        descricao: 'Treino ABC2',
        exercicios: [
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
        ],
      },
      {
        id: 3,
        descricao: 'Treino ABC3',
        exercicios: [
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
        ],
      },
      {
        id: 4,
        descricao: 'Treino ABC4',
        exercicios: [
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
          {
            exercicio: {id: 1, descricao: 'agachamento'},
            repeticao: '12',
            series: '3',
            carga: null,
            equipamento: 'halteres',
          },
        ],
      }
    ],
  };
  constructor() {}

  ngOnInit() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
