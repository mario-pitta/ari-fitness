"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2448],{2448:(M,u,e)=>{e.r(u),e.d(u,{LoginPageModule:()=>k});var f=e(177),i=e(9417),a=e(8435),c=e(8160),d=e(467),p=e(4321),o=e(3953),h=e(3607),P=e(5804);const v=[{path:"",component:(()=>{var t;class r{constructor(n,l){this.fb=n,this.auth=l,this.cpfMask=p.A.cpfMask,this.maskPredicate=function(){var g=(0,d.A)(function*(m){return m.getInputElement()});return function(m){return g.apply(this,arguments)}}()}ngOnInit(){localStorage.clear(),this.form=this.fb.group({cpf:["",[i.k0.required]],dataNascimento:["",[i.k0.required]]})}logar(){this.auth.login(this.form.value.cpf,this.form.value.dataNascimento).subscribe({next:n=>{localStorage.setItem("user",JSON.stringify(n)),location.href="/#/home"}})}}return(t=r).\u0275fac=function(n){return new(n||t)(o.rXU(i.ok),o.rXU(h.u))},t.\u0275cmp=o.VBU({type:t,selectors:[["app-login"]],decls:15,vars:6,consts:[[3,"translucent"],[3,"fullscreen"],[1,"container"],[3,"formGroup"],["type","text","formControlName","cpf","label","CPF:","labelPlacement","floating",3,"maskito","maskitoElement"],["type","date","formControlName","dataNascimento","label","Data de Nascimento","labelPlacement","floating"],["expand","block","color","primary",3,"click","disabled"]],template:function(n,l){1&n&&(o.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),o.EFF(3,"login"),o.k0s()()(),o.j41(4,"ion-content",1)(5,"div",2)(6,"ion-card")(7,"ion-card-title"),o.EFF(8," Login "),o.k0s(),o.j41(9,"ion-card-content")(10,"form",3),o.nrm(11,"ion-input",4)(12,"ion-input",5),o.k0s(),o.j41(13,"ion-button",6),o.bIt("click",function(){return l.logar()}),o.EFF(14,"Logar"),o.k0s()()()()()),2&n&&(o.Y8G("translucent",!0),o.R7$(4),o.Y8G("fullscreen",!0),o.R7$(6),o.Y8G("formGroup",l.form),o.R7$(),o.Y8G("maskito",l.cpfMask)("maskitoElement",l.maskPredicate),o.R7$(2),o.Y8G("disabled",l.form.invalid))},dependencies:[i.qT,i.BC,i.cb,a.Jm,a.b_,a.I9,a.tN,a.W9,a.eU,a.$w,a.BC,a.ai,a.Gw,i.j4,i.JD,P.u]}),r})()}];let L=(()=>{var t;class r{}return(t=r).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.$C({type:t}),t.\u0275inj=o.G2t({imports:[c.iI.forChild(v),c.iI]}),r})(),k=(()=>{var t;class r{}return(t=r).\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.$C({type:t}),t.\u0275inj=o.G2t({imports:[f.MD,i.YN,a.bv,L,i.X1]}),r})()}}]);