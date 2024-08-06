"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2076],{2469:(y,h,r)=>{r.d(h,{c:()=>i});var f=r(3649),l=r(1086),c=r(8607);const i=(n,o)=>{let t,e;const u=(a,w,p)=>{if(typeof document>"u")return;const E=document.elementFromPoint(a,w);E&&o(E)&&!E.disabled?E!==t&&(s(),d(E,p)):s()},d=(a,w)=>{t=a,e||(e=t);const p=t;(0,f.w)(()=>p.classList.add("ion-activated")),w()},s=(a=!1)=>{if(!t)return;const w=t;(0,f.w)(()=>w.classList.remove("ion-activated")),a&&e!==t&&t.click(),t=void 0};return(0,c.createGesture)({el:n,gestureName:"buttonActiveDrag",threshold:0,onStart:a=>u(a.currentX,a.currentY,l.a),onMove:a=>u(a.currentX,a.currentY,l.b),onEnd:()=>{s(!0),(0,l.h)(),e=void 0}})}},8438:(y,h,r)=>{r.d(h,{g:()=>l});var f=r(8476);const l=()=>{if(void 0!==f.w)return f.w.Capacitor}},5572:(y,h,r)=>{r.d(h,{c:()=>f,i:()=>l});const f=(c,i,n)=>"function"==typeof n?n(c,i):"string"==typeof n?c[n]===i[n]:Array.isArray(i)?i.includes(c):c===i,l=(c,i,n)=>void 0!==c&&(Array.isArray(c)?c.some(o=>f(o,i,n)):f(c,i,n))},3351:(y,h,r)=>{r.d(h,{g:()=>f});const f=(o,t,e,u,d)=>c(o[1],t[1],e[1],u[1],d).map(s=>l(o[0],t[0],e[0],u[0],s)),l=(o,t,e,u,d)=>d*(3*t*Math.pow(d-1,2)+d*(-3*e*d+3*e+u*d))-o*Math.pow(d-1,3),c=(o,t,e,u,d)=>n((u-=d)-3*(e-=d)+3*(t-=d)-(o-=d),3*e-6*t+3*o,3*t-3*o,o).filter(a=>a>=0&&a<=1),n=(o,t,e,u)=>{if(0===o)return((o,t,e)=>{const u=t*t-4*o*e;return u<0?[]:[(-t+Math.sqrt(u))/(2*o),(-t-Math.sqrt(u))/(2*o)]})(t,e,u);const d=(3*(e/=o)-(t/=o)*t)/3,s=(2*t*t*t-9*t*e+27*(u/=o))/27;if(0===d)return[Math.pow(-s,1/3)];if(0===s)return[Math.sqrt(-d),-Math.sqrt(-d)];const a=Math.pow(s/2,2)+Math.pow(d/3,3);if(0===a)return[Math.pow(s/2,.5)-t/3];if(a>0)return[Math.pow(-s/2+Math.sqrt(a),1/3)-Math.pow(s/2+Math.sqrt(a),1/3)-t/3];const w=Math.sqrt(Math.pow(-d/3,3)),p=Math.acos(-s/(2*Math.sqrt(Math.pow(-d/3,3)))),E=2*Math.pow(w,1/3);return[E*Math.cos(p/3)-t/3,E*Math.cos((p+2*Math.PI)/3)-t/3,E*Math.cos((p+4*Math.PI)/3)-t/3]}},5083:(y,h,r)=>{r.d(h,{i:()=>f});const f=l=>l&&""!==l.dir?"rtl"===l.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},3126:(y,h,r)=>{r.r(h),r.d(h,{startFocusVisible:()=>i});const f="ion-focused",c=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],i=n=>{let o=[],t=!0;const e=n?n.shadowRoot:document,u=n||document.body,d=M=>{o.forEach(g=>g.classList.remove(f)),M.forEach(g=>g.classList.add(f)),o=M},s=()=>{t=!1,d([])},a=M=>{t=c.includes(M.key),t||d([])},w=M=>{if(t&&void 0!==M.composedPath){const g=M.composedPath().filter(_=>!!_.classList&&_.classList.contains("ion-focusable"));d(g)}},p=()=>{e.activeElement===u&&d([])};return e.addEventListener("keydown",a),e.addEventListener("focusin",w),e.addEventListener("focusout",p),e.addEventListener("touchstart",s,{passive:!0}),e.addEventListener("mousedown",s),{destroy:()=>{e.removeEventListener("keydown",a),e.removeEventListener("focusin",w),e.removeEventListener("focusout",p),e.removeEventListener("touchstart",s),e.removeEventListener("mousedown",s)},setFocus:d}}},1086:(y,h,r)=>{r.d(h,{I:()=>l,a:()=>t,b:()=>e,c:()=>o,d:()=>d,h:()=>u});var f=r(8438),l=function(s){return s.Heavy="HEAVY",s.Medium="MEDIUM",s.Light="LIGHT",s}(l||{});const i={getEngine(){const s=(0,f.g)();if(null!=s&&s.isPluginAvailable("Haptics"))return s.Plugins.Haptics},available(){if(!this.getEngine())return!1;const a=(0,f.g)();return"web"!==(null==a?void 0:a.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate},impact(s){const a=this.getEngine();a&&a.impact({style:s.style})},notification(s){const a=this.getEngine();a&&a.notification({type:s.type})},selection(){this.impact({style:l.Light})},selectionStart(){const s=this.getEngine();s&&s.selectionStart()},selectionChanged(){const s=this.getEngine();s&&s.selectionChanged()},selectionEnd(){const s=this.getEngine();s&&s.selectionEnd()}},n=()=>i.available(),o=()=>{n()&&i.selection()},t=()=>{n()&&i.selectionStart()},e=()=>{n()&&i.selectionChanged()},u=()=>{n()&&i.selectionEnd()},d=s=>{n()&&i.impact(s)}},909:(y,h,r)=>{r.d(h,{I:()=>o,a:()=>d,b:()=>n,c:()=>w,d:()=>E,f:()=>s,g:()=>u,i:()=>e,p:()=>p,r:()=>M,s:()=>a});var f=r(467),l=r(4920),c=r(4929);const n="ion-content",o=".ion-content-scroll-host",t=`${n}, ${o}`,e=g=>"ION-CONTENT"===g.tagName,u=function(){var g=(0,f.A)(function*(_){return e(_)?(yield new Promise(m=>(0,l.c)(_,m)),_.getScrollElement()):_});return function(m){return g.apply(this,arguments)}}(),d=g=>g.querySelector(o)||g.querySelector(t),s=g=>g.closest(t),a=(g,_)=>e(g)?g.scrollToTop(_):Promise.resolve(g.scrollTo({top:0,left:0,behavior:_>0?"smooth":"auto"})),w=(g,_,m,O)=>e(g)?g.scrollByPoint(_,m,O):Promise.resolve(g.scrollBy({top:m,left:_,behavior:O>0?"smooth":"auto"})),p=g=>(0,c.b)(g,n),E=g=>{if(e(g)){const m=g.scrollY;return g.scrollY=!1,m}return g.style.setProperty("overflow","hidden"),!0},M=(g,_)=>{e(g)?g.scrollY=_:g.style.removeProperty("overflow")}},3992:(y,h,r)=>{r.d(h,{a:()=>f,b:()=>w,c:()=>t,d:()=>p,e:()=>L,f:()=>o,g:()=>E,h:()=>c,i:()=>l,j:()=>v,k:()=>C,l:()=>e,m:()=>s,n:()=>M,o:()=>d,p:()=>n,q:()=>i,r:()=>D,s:()=>x,t:()=>a,u:()=>m,v:()=>O,w:()=>u,x:()=>g,y:()=>_});const f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",u="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M136 208l120-104 120 104M136 304l120 104 120-104' stroke-width='48' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none'/></svg>",d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",w="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",M="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='64'/><path d='M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72 38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 00-.1-34.76zM256 352a96 96 0 1196-96 96.11 96.11 0 01-96 96z'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM248 315.85l-51.79-51.79a2 2 0 00-3.39 1.69 64.11 64.11 0 0053.49 53.49 2 2 0 001.69-3.39zM264 196.15L315.87 248a2 2 0 003.4-1.69 64.13 64.13 0 00-53.55-53.55 2 2 0 00-1.72 3.39z'/><path d='M491 273.36a32.2 32.2 0 00-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 00-71.82 11.79 4 4 0 00-1.56 6.63l47.24 47.24a4 4 0 003.82 1.05 96 96 0 01116 116 4 4 0 001.05 3.81l67.95 68a4 4 0 005.4.24 343.81 343.81 0 0067.24-77.4zM256 352a96 96 0 01-93.3-118.63 4 4 0 00-1.05-3.81l-66.84-66.87a4 4 0 00-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0072.64-11.55 4 4 0 001.61-6.64l-47.47-47.46a4 4 0 00-3.81-1.05A96 96 0 01256 352z'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",O="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",D="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",x="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",L="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},243:(y,h,r)=>{r.d(h,{c:()=>i,g:()=>n});var f=r(8476),l=r(4920),c=r(4929);const i=(t,e,u)=>{let d,s;if(void 0!==f.w&&"MutationObserver"in f.w){const E=Array.isArray(e)?e:[e];d=new MutationObserver(M=>{for(const g of M)for(const _ of g.addedNodes)if(_.nodeType===Node.ELEMENT_NODE&&E.includes(_.slot))return u(),void(0,l.r)(()=>a(_))}),d.observe(t,{childList:!0,subtree:!0})}const a=E=>{var M;s&&(s.disconnect(),s=void 0),s=new MutationObserver(g=>{u();for(const _ of g)for(const m of _.removedNodes)m.nodeType===Node.ELEMENT_NODE&&m.slot===e&&p()}),s.observe(null!==(M=E.parentElement)&&void 0!==M?M:E,{subtree:!0,childList:!0})},p=()=>{s&&(s.disconnect(),s=void 0)};return{destroy:()=>{d&&(d.disconnect(),d=void 0),p()}}},n=(t,e,u)=>{const d=null==t?0:t.toString().length,s=o(d,e);if(void 0===u)return s;try{return u(d,e)}catch(a){return(0,c.a)("Exception in provided `counterFormatter`.",a),s}},o=(t,e)=>`${t} / ${e}`},1622:(y,h,r)=>{r.r(h),r.d(h,{KEYBOARD_DID_CLOSE:()=>n,KEYBOARD_DID_OPEN:()=>i,copyVisualViewport:()=>D,keyboardDidClose:()=>g,keyboardDidOpen:()=>E,keyboardDidResize:()=>M,resetKeyboardAssist:()=>d,setKeyboardClose:()=>p,setKeyboardOpen:()=>w,startKeyboardAssist:()=>s,trackViewportChanges:()=>O});var f=r(4379);r(8438),r(8476);const i="ionKeyboardDidShow",n="ionKeyboardDidHide";let t={},e={},u=!1;const d=()=>{t={},e={},u=!1},s=v=>{if(f.K.getEngine())a(v);else{if(!v.visualViewport)return;e=D(v.visualViewport),v.visualViewport.onresize=()=>{O(v),E()||M(v)?w(v):g(v)&&p(v)}}},a=v=>{v.addEventListener("keyboardDidShow",C=>w(v,C)),v.addEventListener("keyboardDidHide",()=>p(v))},w=(v,C)=>{_(v,C),u=!0},p=v=>{m(v),u=!1},E=()=>!u&&t.width===e.width&&(t.height-e.height)*e.scale>150,M=v=>u&&!g(v),g=v=>u&&e.height===v.innerHeight,_=(v,C)=>{const L=new CustomEvent(i,{detail:{keyboardHeight:C?C.keyboardHeight:v.innerHeight-e.height}});v.dispatchEvent(L)},m=v=>{const C=new CustomEvent(n);v.dispatchEvent(C)},O=v=>{t=Object.assign({},e),e=D(v.visualViewport)},D=v=>({width:Math.round(v.width),height:Math.round(v.height),offsetTop:v.offsetTop,offsetLeft:v.offsetLeft,pageTop:v.pageTop,pageLeft:v.pageLeft,scale:v.scale})},4379:(y,h,r)=>{r.d(h,{K:()=>i,a:()=>c});var f=r(8438),l=function(n){return n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE",n}(l||{}),c=function(n){return n.Body="body",n.Ionic="ionic",n.Native="native",n.None="none",n}(c||{});const i={getEngine(){const n=(0,f.g)();if(null!=n&&n.isPluginAvailable("Keyboard"))return n.Plugins.Keyboard},getResizeMode(){const n=this.getEngine();return null!=n&&n.getResizeMode?n.getResizeMode().catch(o=>{if(o.code!==l.Unimplemented)throw o}):Promise.resolve(void 0)}}},4731:(y,h,r)=>{r.d(h,{c:()=>o});var f=r(467),l=r(8476),c=r(4379);const i=t=>{if(void 0===l.d||t===c.a.None||void 0===t)return null;const e=l.d.querySelector("ion-app");return null!=e?e:l.d.body},n=t=>{const e=i(t);return null===e?0:e.clientHeight},o=function(){var t=(0,f.A)(function*(e){let u,d,s,a;const w=function(){var _=(0,f.A)(function*(){const m=yield c.K.getResizeMode(),O=void 0===m?void 0:m.mode;u=()=>{void 0===a&&(a=n(O)),s=!0,p(s,O)},d=()=>{s=!1,p(s,O)},null==l.w||l.w.addEventListener("keyboardWillShow",u),null==l.w||l.w.addEventListener("keyboardWillHide",d)});return function(){return _.apply(this,arguments)}}(),p=(_,m)=>{e&&e(_,E(m))},E=_=>{if(0===a||a===n(_))return;const m=i(_);return null!==m?new Promise(O=>{const v=new ResizeObserver(()=>{m.clientHeight===a&&(v.disconnect(),O())});v.observe(m)}):void 0};return yield w(),{init:w,destroy:()=>{null==l.w||l.w.removeEventListener("keyboardWillShow",u),null==l.w||l.w.removeEventListener("keyboardWillHide",d),u=d=void 0},isKeyboardVisible:()=>s}});return function(u){return t.apply(this,arguments)}}()},7838:(y,h,r)=>{r.d(h,{c:()=>l});var f=r(467);const l=()=>{let c;return{lock:function(){var n=(0,f.A)(function*(){const o=c;let t;return c=new Promise(e=>t=e),void 0!==o&&(yield o),t});return function(){return n.apply(this,arguments)}}()}}},9001:(y,h,r)=>{r.d(h,{c:()=>c});var f=r(8476),l=r(4920);const c=(i,n,o)=>{let t;const e=()=>!(void 0===n()||void 0!==i.label||null===o()),d=()=>{const a=n();if(void 0===a)return;if(!e())return void a.style.removeProperty("width");const w=o().scrollWidth;if(0===w&&null===a.offsetParent&&void 0!==f.w&&"IntersectionObserver"in f.w){if(void 0!==t)return;const p=t=new IntersectionObserver(E=>{1===E[0].intersectionRatio&&(d(),p.disconnect(),t=void 0)},{threshold:.01,root:i});p.observe(a)}else a.style.setProperty("width",.75*w+"px")};return{calculateNotchWidth:()=>{e()&&(0,l.r)(()=>{d()})},destroy:()=>{t&&(t.disconnect(),t=void 0)}}}},7895:(y,h,r)=>{r.d(h,{S:()=>l});const l={bubbles:{dur:1e3,circles:9,fn:(c,i,n)=>{const o=c*i/n-c+"ms",t=2*Math.PI*i/n;return{r:5,style:{top:32*Math.sin(t)+"%",left:32*Math.cos(t)+"%","animation-delay":o}}}},circles:{dur:1e3,circles:8,fn:(c,i,n)=>{const o=i/n,t=c*o-c+"ms",e=2*Math.PI*o;return{r:5,style:{top:32*Math.sin(e)+"%",left:32*Math.cos(e)+"%","animation-delay":t}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(c,i)=>({r:6,style:{left:32-32*i+"%","animation-delay":-110*i+"ms"}})},lines:{dur:1e3,lines:8,fn:(c,i,n)=>({y1:14,y2:26,style:{transform:`rotate(${360/n*i+(i<n/2?180:-180)}deg)`,"animation-delay":c*i/n-c+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(c,i,n)=>({y1:12,y2:20,style:{transform:`rotate(${360/n*i+(i<n/2?180:-180)}deg)`,"animation-delay":c*i/n-c+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(c,i,n)=>({y1:17,y2:29,style:{transform:`rotate(${30*i+(i<6?180:-180)}deg)`,"animation-delay":c*i/n-c+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(c,i,n)=>({y1:12,y2:20,style:{transform:`rotate(${30*i+(i<6?180:-180)}deg)`,"animation-delay":c*i/n-c+"ms"}})}}},7166:(y,h,r)=>{r.r(h),r.d(h,{createSwipeBackGesture:()=>n});var f=r(4920),l=r(5083),c=r(8607);r(1970);const n=(o,t,e,u,d)=>{const s=o.ownerDocument.defaultView;let a=(0,l.i)(o);const p=m=>a?-m.deltaX:m.deltaX;return(0,c.createGesture)({el:o,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:m=>(a=(0,l.i)(o),(m=>{const{startX:D}=m;return a?D>=s.innerWidth-50:D<=50})(m)&&t()),onStart:e,onMove:m=>{const D=p(m)/s.innerWidth;u(D)},onEnd:m=>{const O=p(m),D=s.innerWidth,v=O/D,C=(m=>a?-m.velocityX:m.velocityX)(m),L=C>=0&&(C>.2||O>D/2),P=(L?1-v:v)*D;let A=0;if(P>5){const B=P/Math.abs(C);A=Math.min(B,540)}d(L,v<=0?.01:(0,f.j)(0,v,.9999),A)}})}},2935:(y,h,r)=>{r.d(h,{w:()=>f});const f=(i,n,o)=>{if(typeof MutationObserver>"u")return;const t=new MutationObserver(e=>{o(l(e,n))});return t.observe(i,{childList:!0,subtree:!0}),t},l=(i,n)=>{let o;return i.forEach(t=>{for(let e=0;e<t.addedNodes.length;e++)o=c(t.addedNodes[e],n)||o}),o},c=(i,n)=>{if(1!==i.nodeType)return;const o=i;return(o.tagName===n.toUpperCase()?[o]:Array.from(o.querySelectorAll(n))).find(e=>e.value===o.value)}},1307:(y,h,r)=>{r.d(h,{S:()=>n});var f=r(177),l=r(9417),c=r(8435),i=r(3953);let n=(()=>{var o;class t{}return(o=t).\u0275fac=function(u){return new(u||o)},o.\u0275mod=i.$C({type:o}),o.\u0275inj=i.G2t({imports:[f.MD,l.YN,c.bv]}),t})()},3607:(y,h,r)=>{r.d(h,{u:()=>e});var f=r(5312),l=r(1413),c=r(4412),i=r(8141);class n{constructor({...d}){Object.assign(this,d)}}var o=r(3953),t=r(1626);let e=(()=>{var u;class d{constructor(a){this.http=a,this.user=new l.B,this.userValue=new c.t({}),this.setUser=w=>{localStorage.setItem("user",JSON.stringify(w))}}get getUser(){return this.userValue.next(JSON.parse(localStorage.getItem("user"))),this.userValue.value}login(a,w){return this.http.get(f.c.apiUrl+`/auth/login?cpf=${a}&dataNascimento=${w}`).pipe((0,i.M)(p=>{p instanceof n&&this.setUser(p)}))}}return(u=d).\u0275fac=function(a){return new(a||u)(o.KVO(t.Qq))},u.\u0275prov=o.jDH({token:u,factory:u.\u0275fac,providedIn:"root"}),d})()}}]);