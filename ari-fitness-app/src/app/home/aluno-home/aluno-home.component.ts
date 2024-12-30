import { Component, Input, OnInit } from '@angular/core';
import { MALE_BG_URLS } from '../home.page';
import { Treino } from 'src/core/models/Treino';
import { FichaAluno } from 'src/core/models/FichaAluno';
import { Usuario } from 'src/core/models/Usuario';
import { Exercicio } from 'src/core/models/Exercicio';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aluno-home',
  templateUrl: './aluno-home.component.html',
  styleUrls: ['./aluno-home.component.scss'],
})
export class AlunoHomeComponent implements OnInit {
  goToTreino(arg0: number | undefined) {
    this.router.navigate(['treinar/treino'], {
      queryParams: {
        treinoId: arg0,
        userId: this.user.id,
      },
    });
  }
  goToExercicio(exercicioId: number | undefined) {
    this.router.navigate(['exercicios', exercicioId]);
  }
  constructor(private router: Router) {}

  categories = [
    { name: 'Peito', id: 1, url: MALE_BG_URLS.PEITO },
    { name: 'Costas', id: 2, url: MALE_BG_URLS.COSTAS },
    { name: 'Braços', id: 4, url: MALE_BG_URLS.BRACOS },
    { name: 'Pernas', id: 14, url: MALE_BG_URLS.PERNAS },
    { name: 'Gluteos', id: 9, url: MALE_BG_URLS.GLUTEOS },
    { name: 'Abdomem', id: 11, url: MALE_BG_URLS.ABDOMINAL },
  ];

  imageSet = new Map();
  treino!: Treino;
  treinoUrlImage: string = MALE_BG_URLS.PERNAS;
  exRecomendados: Exercicio[] = [];
  @Input() ficha!: FichaAluno;
  @Input() user!: Usuario;
  ngOnInit() {
    this.categories.forEach((c) => this.imageSet.set(c.id, c.url));

    if(this.user.flagAdmin) this.router.navigate(['admin']);

    if (this.user && this.user.ficha_aluno) {
      this.ficha = this.user.ficha_aluno[this.user.ficha_aluno.length - 1];
      console.log('this.ficha: ', this.ficha);
      //TODO APÓS A PERSISTENCIA DO HISTORICO DE TREINOS, ESSE TREINO DEVE SER CALCULADO COMO PROXIMO TREINO, OU O PRIMEIRO DA FICHA CASO NÃO HAJA PROXIMO. EM CASO DE NOVA FICHA, O TREINO DEVE SER O PRIMEIRO.
      this.treino = this.ficha.treinos[this.ficha.treinos.length - 3].treino;
      this.exRecomendados = this.treino.treino_exercicio.map(
        (e: any) => e.exercicio
      );
      console.log('this.exRecomendados: ', this.exRecomendados);
    }
    // this.treinoUrlImage = this.imageSet.get(this.ficha[0].treinos[0].treino.grupo_muscular_id);
  }

  goToExercicios(categoriaId: number) {
    this.router.navigate(['exercicios'], {
      queryParams: {
        grupo_muscular_id: categoriaId,
      },
    });
  }
}
