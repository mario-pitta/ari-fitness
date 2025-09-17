# Mvk Gym Manager 🏋️‍♂️💪

![GitHub repo size](https://img.shields.io/github/repo-size/mario-pitta/ari-fitness)
![GitHub last commit](https://img.shields.io/github/last-commit/mario-pitta/ari-fitness)
![GitHub issues](https://img.shields.io/github/issues/mario-pitta/ari-fitness)
![GitHub stars](https://img.shields.io/github/stars/mario-pitta/ari-fitness?style=social)



Aplicativo para **studios de atividade física**, composto por **app mobile**, **painel de gestão** e **API de backend**.
O objetivo é proporcionar aos **alunos** acompanhamento de treinos, planos personalizados e histórico, enquanto **professores/gestores** têm ferramentas de gestão e comunicação.

--- 
## 📖 Sumário

- [Descrição](#-descrição)
- [Funcionalidades](#-funcionalidades)
-  [Stack tecnológica](#-stack-tecnológica)
-  [Arquitetura](#-arquitetura)
-  [Rodando localmente](#-rodando-localmente)
-  [Deploy](#-deploy)
-  [Contribuindo](#-contribuindo)
-  [Licença](#-licença)
---
## 📌 Descrição

O **Ari Fitness** conecta **gestores, professores e alunos** em uma única plataforma digital:  
- **Alunos** podem acompanhar seus treinos, progresso e planos personalizados.  
-  **Gestores e professores** conseguem planejar, monitorar e gerenciar alunos de forma prática.  

## ⚡ Funcionalidades


### 👤 Para Alunos
- ✅ Histórico de aulas frequentadas 
- ✅ Consulta de horários e locais 
-  ✅ Check-in em aulas  
-  ✅ Registro de treinos externos  
-  ✅ Monitoramento de progresso  
-  ✅ Acesso a planos personalizados com vídeos 
-  ✅ Comunicação direta com o studio 

### 🏢 Para Gestores / Professores
 - 📋 Cadastro e edição de perfis de alunos  
  - 📊 Controle financeiro
  - 📝 Criação de treinos e planos personalizados  
   - 🎯 Definição de metas individuais 
   - 📅 Gerenciamento de horários e aulas  
   -  📢 Publicação de avisos e comunicados  

## 🛠 Stack Tecnológica
-  **Frontend (App Híbrido):** Ionic + Angular + TypeScript  
-  **Backend (API):** Node.js / NestJS  
-  **Banco de Dados:** PostgreSQL (via Supabase) 
-  **Infraestrutura:** Vercel (frontend), Heroku/GCP (backend)  


## 🗂 Arquitetura

``` 
ari-fitness/
├─ ari-fitness-app/     → App híbrido (Ionic Angular)
	└─ src/
		└─ app/
		└─ assets/
		└─ core/
		└─ environments/	
		└─ theme/
├─ ari-fitness-api/     → Backend / API do sistema
	└─ src/	
		└─ ...
	└─ test/
```


## 🚀 Rodando localmente
### 1. Clone o repositório
```bash
git clone https://github.com/mario-pitta/ari-fitness.git\ncd ari-fitness
```

### 2. Configure o backend
```bash
cd ari-fitness-api
npm install
cp .env.example .env   
```

### 4. Instalando dependências

#### 4.1 Frontend
```bash
cd ./ari-fitness-api
npm install
```
#### 4.2 Backend
```bash 
cd ./ari-fitness-app
npm install
```

### 5. Criando servidores locais
```bash 

cd ./ari-fitness-app
npm run start:full
```

Agora o app estará disponível em [http://localhost:8100](http://localhost:8100) e a API em  [http://localhost:3000](http://localhost:3000).

 


## 🤝 Contribuindo

Contribuições são sempre bem-vindas!  
1. Faça um fork do projeto  
2.  Crie uma branch: `git checkout -b minha-feature`  
3.  Commit suas alterações: `git commit -m 'feat: Minha nova feature'`  
4.  Envie para o branch: `git push origin minha-feature`  
5. Abra um Pull Request  


## 📄 Licença

Este projeto está sob a licença **MIT** – veja o arquivo [LICENSE](LICEsadsaNSE) para mais detalhes.

