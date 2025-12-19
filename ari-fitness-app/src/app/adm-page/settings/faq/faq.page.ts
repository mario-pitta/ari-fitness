import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage {
  public faqCategories: {
    name: string;
    icon: string;
    questions: {
      q: string;
      a: string;
      videoId?: string; // ID do vídeo no YouTube
      videoUrl?: any;
    }[]
  }[] = []

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.faqCategories = [
      {
        name: 'Primeiros Passos',
        icon: 'rocket-outline',
        questions: [
          {
            q: 'O que é o MvK Gym Manager?',
            a: 'O MvK Gym Manager é uma plataforma completa para academias, oferecendo ferramentas para gestão de alunos, treinos, finanças e muito mais.',
           
          },

          {
            q: 'Como alterar as informações da minha academia?',
            a: 'Para alterar as informações da sua academia, vá até a aba "Configurações" e edite os campos desejados.',
            videoId: '97fJEksIgWo',
            videoUrl: this.sanitizeVideoUrl('97fJEksIgWo')
          },
          {
            q: 'Como cadastrar alunos?',
            a: 'Vá até a aba "Alunos", clique no botão "+" no canto inferior e preencha os dados básicos. Não esqueça de definir o plano para habilitar as funções financeiras.',
           
          },

        ]
      },
      {
        name: 'Gestão de Treinos',
        icon: 'barbell-outline',
        questions: [
          {
            q: 'Como vincular uma ficha de treino a um aluno?',
            a: 'No perfil do aluno, acesse a aba "Treinos" e selecione "Nova Ficha". Você pode montar o treino do zero ou replicar um modelo existente.',
           
          }
        ]
      },
      {
        name: 'Sistema de Check-in',
        icon: 'qr-code-outline',
        questions: [
          {
            q: 'O QR Code de Check-in é estático ou dinâmico?',
            a: 'O QR Code é unico por empresa, impedindo que alunos ingressem outras academias parceiras por engano. Ele é gerado em tempo real e os alunos podem escanear diretamente da recepção, inserir seus dados e registrar o check-in, caso prefiram, podem deixar seus dados salvos no dispositivo para agilizar os próximos check-ins.',
           
          }
        ]
      }
    ];
  }


  sanitizeVideoUrl(videoId: string) {
    return this.sanitizer.bypassSecurityTrustUrl(`https://www.youtube.com/watch?v=${videoId}`);
  }
}
