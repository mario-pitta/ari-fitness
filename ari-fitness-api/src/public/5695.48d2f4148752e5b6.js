"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5695],{5695:(F,h,t)=>{t.r(h),t.d(h,{TabsPageModule:()=>M});var s=t(8435),g=t(177),m=t(9417),d=t(8160),n=t(3953),r=t(5311),u=t(3607);const P=()=>["ficha-treino"],T=()=>["treinos"],c=[{path:"",component:(()=>{var o;class l{constructor(a,i,C){this.titleService=a,this.auth=i,this.router=C,this.pageTitle="Home",console.log("TabsComponent Initing...."),this.user=JSON.parse(localStorage.getItem("user")),this.titleService.title.asObservable().subscribe({next:v=>{console.log("TabsComponent getting page title"),this.pageTitle=v}})}ngOnInit(){console.log("iniciando tabsPage"),this.user=JSON.parse(localStorage.getItem("user")),this.user?this.updateLoggedUserData():this.router.navigate(["login"])}updateLoggedUserData(){this.auth.login(this.user.cpf,this.user.data_nascimento).subscribe({next:a=>{console.log("user: ",a)}})}ngOnDestroy(){console.log("destroying tabs page")}}return(o=l).\u0275fac=function(a){return new(a||o)(n.rXU(r.n),n.rXU(u.u),n.rXU(d.Ix))},o.\u0275cmp=n.VBU({type:o,selectors:[["app-tabs"]],decls:19,vars:6,consts:[[3,"translucent"],["slot","bottom"],["tab","home","routerLink","home"],["aria-hidden","true","name","home"],[3,"tab","routerLink"],["xmlns","http://www.w3.org/2000/svg","width","2em","height","2em","viewBox","0 0 512 512"],["fill","currentColor","d","M165.906 18.688C15.593 59.28-42.187 198.55 92.72 245.375h-1.095c.635.086 1.274.186 1.906.28c8.985 3.077 18.83 5.733 29.532 7.94C173.36 273.35 209.74 321.22 212.69 368c-33.514 23.096-59.47 62.844-59.47 62.844l26.28 38.686L138.28 493h81.97c-40.425-40.435-11.76-85.906 36.125-85.906c48.54 0 73.945 48.112 36.156 85.906h81.126l-40.375-23.47l26.283-38.686s-26.376-40.4-60.282-63.406c3.204-46.602 39.5-94.167 89.595-113.844c10.706-2.207 20.546-4.86 29.53-7.938c.633-.095 1.273-.195 1.908-.28h-1.125c134.927-46.82 77.163-186.094-73.157-226.69c-40.722 39.37 6.54 101.683 43.626 56.877c36.9 69.08 8.603 127.587-72.28 83.406c-11.88 24.492-34.213 41.374-60.688 41.374c-26.703 0-49.168-17.167-60.97-42c-81.774 45.38-110.512-13.372-73.437-82.78c37.09 44.805 84.35-17.508 43.626-56.876zm90.79 35.92c-27.388 0-51.33 27.556-51.33 63.61c0 36.056 23.942 62.995 51.33 62.995s51.327-26.94 51.327-62.994c0-36.058-23.94-63.61-51.328-63.61z"],["tab","usuarios","routerLink","usuarios"],["aria-hidden","true","name","people"]],template:function(a,i){1&a&&(n.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),n.EFF(3),n.k0s()()(),n.j41(4,"ion-tabs")(5,"ion-tab-bar",1)(6,"ion-tab-button",2),n.nrm(7,"ion-icon",3),n.j41(8,"ion-label"),n.EFF(9,"Home"),n.k0s()(),n.j41(10,"ion-tab-button",4),n.qSk(),n.j41(11,"svg",5),n.nrm(12,"path",6),n.k0s(),n.joV(),n.j41(13,"ion-label"),n.EFF(14,"Treinar"),n.k0s()(),n.j41(15,"ion-tab-button",7),n.nrm(16,"ion-icon",8),n.j41(17,"ion-label"),n.EFF(18,"Usuarios"),n.k0s()()()()),2&a&&(n.Y8G("translucent",!0),n.R7$(3),n.JRh(i.pageTitle),n.R7$(7),n.Y8G("tab",i.user.flagAdmin?"ficha-treino":"treinos")("routerLink",i.user.flagAdmin?n.lJ4(4,P):n.lJ4(5,T)))},dependencies:[s.eU,s.iq,s.he,s.Jq,s.qW,s.BC,s.ai,s.p4,s.N7]}),l})(),children:[{path:"home",loadChildren:()=>Promise.all([t.e(2076),t.e(1703)]).then(t.bind(t,1703)).then(o=>o.Tab1PageModule)},{path:"profile",loadChildren:()=>Promise.all([t.e(5841),t.e(2076),t.e(5378)]).then(t.bind(t,5378)).then(o=>o.Tab2PageModule)},{path:"cadastro-usuario",loadChildren:()=>Promise.all([t.e(6828),t.e(5248),t.e(2076),t.e(5113)]).then(t.bind(t,5113)).then(o=>o.Tab3PageModule)},{path:"cadastro-usuario/:id",loadChildren:()=>Promise.all([t.e(6828),t.e(5248),t.e(2076),t.e(5113)]).then(t.bind(t,5113)).then(o=>o.Tab3PageModule)},{path:"pessoa-form",loadChildren:()=>Promise.all([t.e(6828),t.e(5248)]).then(t.bind(t,5248)).then(o=>o.PessoaFormPageModule)},{path:"usuarios",loadChildren:()=>t.e(8919).then(t.bind(t,8919)).then(o=>o.UsuariosPageModule)},{path:"ficha-treino",loadChildren:()=>t.e(4944).then(t.bind(t,4944)).then(o=>o.FichaTreinoAlunoPageModule)},{path:"treinos",loadChildren:()=>t.e(5841).then(t.bind(t,5841)).then(o=>o.TreinosPageModule)},{path:"treino-form",loadChildren:()=>t.e(4633).then(t.bind(t,4633)).then(o=>o.TreinoFormPageModule)},{path:"treino-list",loadChildren:()=>t.e(3388).then(t.bind(t,3388)).then(o=>o.TreinoListPageModule)},{path:"treino-form/:id",loadChildren:()=>t.e(4633).then(t.bind(t,4633)).then(o=>o.TreinoFormPageModule)},{path:"",redirectTo:"home",pathMatch:"full"}]},{path:"",redirectTo:"home",pathMatch:"full"}];let f=(()=>{var o;class l{}return(o=l).\u0275fac=function(a){return new(a||o)},o.\u0275mod=n.$C({type:o}),o.\u0275inj=n.G2t({imports:[d.iI.forChild(c)]}),l})(),M=(()=>{var o;class l{}return(o=l).\u0275fac=function(a){return new(a||o)},o.\u0275mod=n.$C({type:o}),o.\u0275inj=n.G2t({imports:[s.bv,g.MD,m.YN,f]}),l})()}}]);