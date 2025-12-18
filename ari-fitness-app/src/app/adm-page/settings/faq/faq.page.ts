import { Component } from '@angular/core';

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
    }[]
  }[] = [
    {
      name: 'Primeiros Passos',
      icon: 'rocket-outline',
      questions: [
        {
          q: 'O que é o MvK Gym Manager?',
          a: 'O MvK Gym Manager é uma plataforma completa para academias, oferecendo ferramentas para gestão de alunos, treinos, finanças e muito mais.',
          videoId: 'PLACEHOLDER_ID_0' // ID do vídeo no YouTube
        },

        {
          q: 'Como alterar as informações da minha academia?',
          a: 'Para alterar as informações da sua academia, vá até a aba "Configurações" e edite os campos desejados.'
        },
        {
          q: 'Como cadastrar alunos?',
          a: 'Vá até a aba "Alunos", clique no botão "+" no canto inferior e preencha os dados básicos. Não esqueça de definir o plano para habilitar as funções financeiras.',
          videoId: 'PLACEHOLDER_ID_1' // ID do vídeo no YouTube
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
          videoId: 'PLACEHOLDER_ID_2'
        }
      ]
    },
    {
      name: 'Sistema de Check-in',
      icon: 'qr-code-outline',
      questions: [
        {
          q: 'O QR Code de Check-in é estático ou dinâmico?',
          a: 'O QR Code é gerado em tempo real. Os alunos podem escanear diretamente da recepção para validar a entrada automaticamente.',
          videoId: 'PLACEHOLDER_ID_3'
        }
      ]
    }
  ];

  constructor() {}
}
