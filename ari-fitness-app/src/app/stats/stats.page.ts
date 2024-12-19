import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Historico } from 'src/core/models/Historico';
// import { ChartComponent } from '@swimlane/ngx-charts';
import { Usuario } from 'src/core/models/Usuario';
import { AuthService } from 'src/core/services/auth/auth.service';
import Swiper from 'swiper';

declare interface Day {
  date: number;
  dayName: string;
  active: boolean;
  fulldate: Date;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  animations: [],
})
export class StatsPage implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiper?: Swiper | any = new Swiper('#swiper', {
    slidesPerView: 5,
  });
  // chart: ChartComponent = new ChartComponent();

  last7Days: Day[] = new Array(7)
    .fill({})
    .map((_, index) => ({
      date: new Date().getDate() - index,
      fulldate: new Date(new Date().setDate(new Date().getDate() - index)),
      dayName: new Date(new Date().setDate(new Date().getDate() - index))
        .toLocaleDateString('pt-BR', { weekday: 'short' })
        .replace('.', ''),
      active: index === 0 ? true : false,
    }))
    .reverse();
  @ViewChildren('days') days!: QueryList<any>;
  historico: Usuario['historico'] = [];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = false;
  showYAxis: boolean = false;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = false;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };

  multi: {
    name: string;
    series: {
      name: string;
      value: number;
    }[];
  }[] = [
    // {
    //   name: 'Germany',
    //   series: [
    //     {
    //       name: '2010',
    //       value: 7300000,
    //     },
    //     {
    //       name: '2011',
    //       value: 8940000,
    //     },
    //   ],
    // },
    // {
    //   name: 'USA',
    //   series: [
    //     {
    //       name: '2010',
    //       value: 7870000,
    //     },
    //     {
    //       name: '2011',
    //       value: 8270000,
    //     },
    //   ],
    // },
    // {
    //   name: 'France',
    //   series: [
    //     {
    //       name: '2010',
    //       value: 5000002,
    //     },
    //     {
    //       name: '2011',
    //       value: 5800000,
    //     },
    //   ],
    // },
  ];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.historico = this.filterHistorico(new Date().toDateString());
  }

  ngAfterViewInit() {
    this.swiper['nativeElement']?.swiper?.slideTo(
      this.last7Days.findIndex((day) => day.active),
      50,
      false
    );
    this.buildDChartData();
  }

  options: any = {};
  buildDChartData() {
    this.view = [700, 400];

    // options
    this.showXAxis = false;
    this.showYAxis = false;
    this.gradient = true;
    // this.showLegend = true;
    this.showXAxisLabel = false;
    this.xAxisLabel = 'Exercicio';
    this.showYAxisLabel = false;
    this.yAxisLabel = 'Peso';
    this.legendTitle = 'Peso';

    this.colorScheme = {
      domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    };

    this.multi = [];

    this.multi.push({
      name: '',
      series: this.historico
        ?.filter((h) => h.carga || h.repeticao > 0 || h.series > 0)
        .map((historico) => {
          return {
            name: historico.exercicio.nome.toUpperCase(),
            value: historico.carga || historico.repeticao || historico.series || 0,
          };
        }) || []
    });

    console.log('this.mult: ', this.multi);

    // this.multi = [
    //   {
    //     name: 'Brasil',
    //     series: [
    //       {
    //         name: '2010',
    //         value: 7300000,
    //       },
    //       {
    //         name: '2011',
    //         value: 8940000,
    //       },
    //       {
    //         name: '2012',
    //         value: 7500000,
    //       },
    //     ],
    //   },

    //   {
    //     name: 'USA',
    //     series: [
    //       {
    //         name: '2010',
    //         value: 7870000,
    //       },
    //       {
    //         name: '2011',
    //         value: 8270000,
    //       },
    //       {
    //         name: '2012',
    //         value: 9270000,
    //       },
    //     ],
    //   },

    //   {
    //     name: 'France',
    //     series: [
    //       {
    //         name: '2010',
    //         value: 5000002,
    //       },
    //       {
    //         name: '2011',
    //         value: 5800000,
    //       },
    //       {
    //         name: '2012',
    //         value: 4800000,
    //       },
    //     ],
    //   },
    // ];
  }

  buildFakeHistory() {
    const history = [];
    for (let i = 0; i < 5; i++) {
      history.push({
        id: i,
        data: new Date(),
        treino: {
          id: i,
          nome: 'Treino ' + i,
        },
        exercicio: {
          id: i,
          nome: 'Exercicio ' + i,
        },
        serie: i,
        repeticao: i,
        carga: Math.floor(Math.random() * 100),
        intervalo: i,
        nivel_dificuldade: i,
      });
    }
    return history as any[];
  }

  filterHistorico(date: string) {
    console.log('date: ', new Date(date).toLocaleString().split(',')[0]);
    this.historico = this.auth.user()?.historico?.filter((h) => {
      console.log('h.data: ', h.data, h.data.toLocaleString().split(',')[0]);

      return (
        h.data.toLocaleString().split(',')[0] ===
        new Date(date).toLocaleString().split(',')[0]
      );
    });

    console.log('this.historico: ', this.historico);
    this.buildDChartData();
    return this.historico;
  }
  selectDay(day: Day, index: number) {
    this.last7Days.forEach((day) => {
      day.active = false;
    });
    day.active = true;
    this.filterHistorico(day.fulldate.toString());
  }
}
