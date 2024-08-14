import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/core/models/Usuario';
import { AuthService } from 'src/core/services/auth/auth.service';
import { TreinoExercicioFormPage } from '../treino-exercicio-form/treino-exercicio-form.page';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Exercicio } from 'src/core/models/Exercicio';
const confetti = require('canvas-confetti');
@Component({
  selector: 'app-treinos',
  templateUrl: './treinos.page.html',
  styleUrls: ['./treinos.page.scss'],
})
export class TreinosPage implements OnInit {
  user!: Usuario;
  selectedTreino: any;
  interval: any;
  openModal: boolean = false;
  selectedExercicio: any | Exercicio;
  constructor(
    private auth: AuthService,
    private modalController: ModalController,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.onTreinoSelected(
          this.aRoute.snapshot.queryParamMap.get('treinoId')
        );
      }
    });
  }

  ngOnInit() {
    console.log('iniciando treinosPage');
    this.user = this.auth.getUser;
    console.log(this.user);
    this.onTreinoSelected(this.aRoute.snapshot.queryParamMap.get('treinoId'));
    // this.selectedTreino =
    //   this.user?.ficha_aluno &&
    //   this.user.ficha_aluno[0].treinos.find((t: any) => t.treino.id == event).treino;
    console.log(this.selectedTreino);
  }

  counter: number = 15;
  icon: string = 'play';

  onTreinoSelected(event: any) {
    console.log(event);
    this.selectedTreino =
      this.user.ficha_aluno &&
      this.user.ficha_aluno[0].treinos.find((t: any) => t.treino.id == event)
        .treino;
    console.log(this.selectedTreino);
  }

  toggleClock(time: number) {
    console.log(this.interval);
    if (this.interval) {
      this.clearInterval(this.interval);
      this.interval = null;
      this.icon = 'play';
    } else {
      this.icon = 'pause';
      this.interval = setInterval(async () => {
        if (this.counter > 0) {
          this.counter--;
          if (this.counter < 4) {
            if (this.counter > 0) {
              await this.playSound('som-de-sino-2.mp3');
            } else {
              await this.playSound('som-de-sino-1.mp3');
            }
          }
        } else {
          // confetti({

          // })
          this.resetCounter();
        }
      }, 1000);
    }
  }

  playSound(sound: string) {
    const path = '../../assets/audios/' + sound;
    const audio = new Audio(path);
    console.log('pronto pra tocar', audio);
    audio.play();
    // document.body.removeChild(audio);
  }

  setInterval(e: any) {
    this.interval = e.value;
    console.log(this.interval);
    console.log(this.interval);
  }

  enableRotation(el: any) {
    el.target.style.setProperty('--rotation-duration', `${this.interval}s`);
    el.target.style.setProperty('--color', `warning`);
    el.target.classList.toggle('clock-animated');

    setTimeout(() => {}, this.interval);
  }

  resetCounter() {
    this.icon = 'play';
    // this.selectedExercicio = null;
    this.counter = this.selectedExercicio.intervalo || 15;
    this.clearInterval(this.interval);
  }

  clearInterval(interval: any) {
    if (interval) {
      clearInterval(interval);
      this.interval = null;
    }
  }


  exercicioPresets: any = {}
  buildExercicioPresets(){
    console.log('this.selectedExercicio', this.selectedExercicio)
    this.exercicioPresets = {
      carga: this.selectedExercicio.carga,
      repeticoes:  this.selectedExercicio.repeticoes,
      series: this.selectedExercicio.series,
    }
  }

  openTreinoForm() {
    this.modalController
      .create({
        component: TreinoExercicioFormPage,
      })
      .then((modal) => {
        modal.present();
      });
  }
}
