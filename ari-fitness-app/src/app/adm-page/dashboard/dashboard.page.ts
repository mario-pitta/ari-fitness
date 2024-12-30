import { Component,  HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Constants from 'src/core/Constants';
import { IUsuario } from 'src/core/models/Usuario';
import { UsuarioService } from 'src/core/services/usuario/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
view: [number,number] =  [520, 230];
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile();


  }

  chartSizes: number[] = [];
  searchControl: FormControl = new FormControl();

  isMobile() {
    const innerWidth = window.innerWidth;
    console.log('innerWidth: ', innerWidth);

    if (innerWidth < 500) {
      this.view = [350, 100];
    }else if (innerWidth < 800) {
      this.view = [430, 230];
    }else if (innerWidth < 900) {
      this.view = [470, 230];
    }else if(innerWidth < 1000){
      this.view = [650, 230];
    }else if( innerWidth < 1980){

      this.view = [780, 230];
    }
    console.log('this.view: ', this.view);
  }

  constructor(private usuarioService: UsuarioService) {
    this.searchControl.valueChanges.subscribe((value) => {
      this.getMembers(value);
    });
  }

  receitasMensais = [
    {
      name: 'Meses',
      series: [
        {
          name: 'Jan',
          value: 100,
          despesas: 50,
        },
        {
          name: 'Fev',
          value: 400,
          despesas: 100,
        },
        {
          name: 'Mar',
          value: 300,
          despesas: 150,
        },
        {
          name: 'Abr',
          value: 3200,
          despesas: 200,
        },
        {
          name: 'Mai',
          value: 900,
          despesas: 250,
        },
        {
          name: 'Jun',
          value: 2600,
          despesas: 300,
        },
        {
          name: 'Jul',
          value: 700,
          despesas: 350,
        },
        {
          name: 'Ago',
          value: 800,
          despesas: 400,
        },
        {
          name: 'Set',
          value: 900,
          despesas: 450,
        },
        {
          name: 'Out',
          value: 1000,
          despesas: 500,
        },
        {
          name: 'Nov',
          value: 1100,
          despesas: 550,
        },
        {
          name: 'Dez',
          value: 1200,
          despesas: 600,
        },
      ],
    },
  ];

  members: IUsuario[] = [
  ];

  loading: boolean = true;
  ngOnInit() {
    console.log('iniciando dashboard...');

    this.getMembers();

    this.isMobile();
  }
  getMembers(text?: string, flag_ativo: boolean = true, orderBy: string = 'nome') {

    this.loading = true;
    const filters: Partial<IUsuario> = {
      tipo_usuario: Constants.ALUNO_ID,
      fl_ativo: flag_ativo,
     };

     if(text) {
      filters['nome'] = text
     }

    this.usuarioService.findByFilters(filters).subscribe({
      next: (res) => {
        console.log('res: ', res);
        this.members = res;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
      complete: () => (this.loading = false),

    });
  }


}
