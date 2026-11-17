/* ===== Laboratório de Infoproduto — app ===== */
const KEY='lab-infoproduto-v2';
const SECTIONS=[
 {g:'Estratégia',id:'tipos',t:'Tipos de infoproduto',d:'Compare 14 formatos por esforço, ticket e tempo de produção. Escolha o principal e os complementares da sua esteira.'},
 {g:'Estratégia',id:'ideia',t:'Ideia, nicho e avatar',d:'Defina o recorte, a lacuna no mercado, o mapa de empatia do avatar e a promessa central.'},
 {g:'Estratégia',id:'validacao',t:'Validação',d:'Pontue a ideia em 10 critérios e siga o roteiro para validar com dinheiro real antes de produzir.'},
 {g:'Marca',id:'marca',t:'Posicionamento e marca',d:'Marketing corporativo: posicionamento, missão, visão, valores, tom de voz e arquétipo de marca.'},
 {g:'Marca',id:'cores',t:'Teoria das cores',d:'Círculo cromático, harmonias, psicologia das cores, regra 60-30-10 e verificador de contraste.'},
 {g:'Marca',id:'tipografia',t:'Tipografia',d:'Pares de fontes por personalidade e hierarquia tipográfica, com prévia ao vivo na sua paleta.'},
 {g:'Criação',id:'imagens',t:'Imagens e criativos',d:'Estúdio de criativos, gerador de prompts para IA de imagem, tamanhos por canal e checklist visual.'},
 {g:'Criação',id:'copy',t:'Copywriting',d:'Headlines, frameworks (AIDA, PAS, BAB, 4Ps, QUEST, storytelling), página de vendas, e-mails e objeções.'},
 {g:'Criação',id:'conteudo',t:'Estrutura do conteúdo',d:'Do ponto A ao ponto B, com estrutura sugerida para o formato escolhido.'},
 {g:'Criação',id:'producao',t:'Produção',d:'Etapas, especificações, controle de qualidade e cronograma de produção do formato escolhido.'},
 {g:'Venda',id:'oferta',t:'Oferta e preço',d:'Pilha de valor, calculadora de lucro com order bump e esteira de produtos.'},
 {g:'Venda',id:'marketing',t:'Marketing e conteúdo',d:'Funil, canais, pilares, isca digital, bio e calendário editorial de 4 semanas.'},
 {g:'Venda',id:'lancamento',t:'Lançamento',d:'Estratégia, cronograma com datas e checklist de cada fase.'},
 {g:'Venda',id:'metricas',t:'Métricas',d:'Compare seus números com referências e descubra onde agir primeiro.'},
 {g:'Entrega',id:'briefing',t:'Briefing final',d:'Tudo o que você construiu em uma página, pronto para copiar e enviar.'}];

let S={};
const DEF={cur:'tipos',crit:{},chk:{},tipoSec:[],aq:{},tom:{formal:60,serio:40,tecnico:65,reservado:55,respeitoso:30},
 palBase:'#0f766e',harm:'comp',pal:null,lpInv:false,font:'p7',mk_fmt:'post',mk_lay:'bold',mk_bg:'primaria',pr_peca:'anuncio',pr_est:'foto',
 favH:[],fw:'aida',stack:[['Produto principal',997],['Bônus: planilha de controle',97],['Bônus: comunidade',197]],
 mods:[],canais:['Instagram','Lista de e-mail'],pilares:['Educação','Autoridade','Prova social','Conexão'],calSeed:1,
 ladder:null,met:{},imgTab:'mock',cpTab:'head',tipoF:'todos',estrategia:'semente',parcelas:12,fun:{}};

/* ---------- utils ---------- */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const brl=v=>'R$ '+(isFinite(v)?v:0).toLocaleString('pt-BR',{maximumFractionDigits:0});
const brl2=v=>'R$ '+(isFinite(v)?v:0).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function V(k,ph){const x=String(S[k]??'').trim();return x||`⟦${ph}⟧`}
const cap=s=>s.startsWith('⟦')?s:s.charAt(0).toUpperCase()+s.slice(1);
const hl=t=>esc(t).replace(/⟦(.*?)⟧/g,'<span class="ph-hole">[$1]</span>');
const plain=t=>t.replace(/⟦(.*?)⟧/g,'[$1]');
const objs=()=>(S.objecoes||'').split('\n').map(x=>x.trim()).filter(Boolean);
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1800)}
async function copy(t,msg='Copiado'){try{await navigator.clipboard.writeText(plain(t));toast(msg)}catch(e){toast('Não foi possível copiar: selecione o texto manualmente')}}
function out(el,text){if(typeof el=='string')el=$(el);el.innerHTML='<button class="btn ghost sm cp">Copiar</button>'+hl(text);el.querySelector('.cp').onclick=()=>copy(text)}
function chkHtml(id,t){return `<label class="chk ${S.chk[id]?'d':''}"><input type="checkbox" data-ck="${id}" ${S.chk[id]?'checked':''}><span>${esc(t)}</span></label>`}
function bindChk(root,cb){$$(root+' [data-ck]').forEach(c=>c.onchange=()=>{S.chk[c.dataset.ck]=c.checked;c.parentElement.classList.toggle('d',c.checked);save();cb&&cb()})}
function chips(el,items,isSel,onClick){el=typeof el=='string'?$(el):el;el.innerHTML=items.map(([v,t])=>`<button class="chip ${isSel(v)?'sel':''}" data-v="${esc(v)}">${t}</button>`).join('');
 el.querySelectorAll('.chip').forEach(b=>b.onclick=()=>onClick(b.dataset.v))}
function rng(seed){let s=seed*9301+49297;return()=>{s=(s*9301+49297)%233280;return s/233280}}
const tipo=()=>TIPOS.find(t=>t.id==S.tipo);
const trilha=()=>TRILHA[S.tipo];
const modelo=()=>trilha()?trilha().modelo:'unico';
function order(){const t=trilha();const all=SECTIONS.map(s=>s.id);return t?[...t.ordem,...all.filter(id=>!t.ordem.includes(id))]:all}
function syncInputs(){$$('[data-k]').forEach(el=>{const k=el.dataset.k;if(S[k]===undefined||S[k]===null)return;if(el.type=='checkbox')el.checked=!!S[k];else if(document.activeElement!==el)el.value=S[k]})}
const font=()=>FONTES.find(f=>f.id==S.font)||FONTES[0];
const arq=()=>ARQ.find(a=>a.id==S.arq);

/* ---------- cores ---------- */
function hexRgb(h){h=h.replace('#','');if(h.length==3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]}
function rgbHex(r,g,b){return '#'+[r,g,b].map(x=>clamp(Math.round(x),0,255).toString(16).padStart(2,'0')).join('')}
function hexHsl(hex){let[r,g,b]=hexRgb(hex).map(x=>x/255);const mx=Math.max(r,g,b),mn=Math.min(r,g,b);let h=0,s=0,l=(mx+mn)/2;
 if(mx!=mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx==r?(g-b)/d+(g<b?6:0):mx==g?(b-r)/d+2:(r-g)/d+4;h*=60}return[h,s*100,l*100]}
function hsl(h,s,l){h=((h%360)+360)%360;s=clamp(s,0,100)/100;l=clamp(l,0,100)/100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1));return rgbHex(f(0)*255,f(8)*255,f(4)*255)}
function lum(hex){return hexRgb(hex).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0)}
function contrast(a,b){const x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function readable(bg){return contrast(bg,'#ffffff')>=contrast(bg,'#111111')?'#ffffff':'#111111'}
function cname(hex){const[h,s,l]=hexHsl(hex);if(l>93)return['branco','white'];if(l<10)return['preto','black'];
 if(s<12)return l>55?['cinza claro','light gray']:['cinza escuro','dark gray'];
 const n=[[12,'vermelho','red'],[40,'laranja','orange'],[65,'amarelo','yellow'],[165,'verde','green'],[195,'turquesa','teal'],[255,'azul','blue'],[290,'roxo','purple'],[340,'rosa','pink'],[361,'vermelho','red']].find(x=>h<x[0]);
 const pre=l<32?[' escuro','dark ']:l>72?[' claro','light ']:['',''];return[n[1]+pre[0],pre[1]+n[2]]}
function harmHues(h){return{mono:[h,h,h],analoga:[h,h+30,h-30],comp:[h,h,h+180],split:[h,h+150,h+210],triade:[h,h+120,h+240],tetra:[h,h+90,h+180]}[S.harm]}
function genPal(){const[h,s0,l0]=hexHsl(S.palBase);const s=clamp(s0,35,90),l=clamp(l0,28,55);const[,h2,h3]=harmHues(h);
 const prim=hsl(h,s,l);let sec,acc;
 if(S.harm=='mono'){sec=hsl(h,s*.55,78);acc=hsl(h,Math.min(95,s+15),20)}
 else if(S.harm=='comp'){sec=hsl(h,s*.5,82);acc=hsl(h3,Math.min(95,s+10),52)}
 else{sec=hsl(h2,s*.75,45);acc=hsl(h3,Math.min(95,s+10),52)}
 S.pal=[prim,sec,acc,hsl(h,28,96),hsl(h,30,12)];}
const ROLES=['Primária','Secundária','Destaque','Fundo','Texto'];

/* ---------- state ---------- */
function load(){let d={};try{d=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
 S=Object.assign(JSON.parse(JSON.stringify(DEF)),d);if(!S.pal)genPal();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}progress()}

function done(id){switch(id){
 case'tipos':return!!S.tipo;case'ideia':return['nome','avatarCurto','dor','p_res'].every(k=>S[k]);
 case'validacao':return Object.keys(S.crit).length>=CRITS.length;case'marca':return!!(S.arq&&S.m_dif);
 case'cores':return!!S.palTouched;case'tipografia':return!!S.fontTouched;case'imagens':return!!(S.mk_h||S.v_estilo);
 case'copy':return S.favH.length>0;case'conteudo':return S.mods.length>=3;case'oferta':return S.preco>0&&S.stack.length>0;
 case'marketing':return S.canais.length>0&&!!S.calSeen;case'lancamento':return!!S.dataAbertura;case'metricas':return Object.values(S.met).some(v=>v!==''&&v!=null);
 case'producao':return!!S.tipo&&trilha().prod.etapas.some((_,i)=>S.chk['prod_'+S.tipo+'_'+i]);
 case'briefing':return(trilha()?trilha().ordem:SECTIONS.map(s=>s.id)).filter(i=>i!='briefing').every(id=>done(id))}}
function progress(){const ids=(trilha()?trilha().ordem:SECTIONS.map(s=>s.id)).filter(i=>i!='briefing'),n=ids.length,d=ids.filter(id=>done(id)).length,p=Math.round(d/n*100);
 $('#pct').textContent=p+'%';$('#pbar').style.width=p+'%';$$('#nav .ok').forEach(o=>o.classList.toggle('done',done(o.dataset.id)));
 $('#projName').textContent=S.nome||'Projeto sem nome';}

/* ---------- nav ---------- */
function buildNav(){const t=trilha(),ti=tipo(),ord=order();let h='';
 const item=(id,n,comp)=>{const sc=SECTIONS.find(x=>x.id==id);return`<a href="#${id}" data-id="${id}" class="${comp?'comp':''}"><span class="i">${comp?'+':String(n).padStart(2,'0')}</span>${sc.t}<span class="ok" data-id="${id}"></span></a>`};
 if(t){h+=`<div class="trail-tag"><b>Trilha: ${ti.n}</b>${MODELO_NOME[t.modelo]} · ${t.ordem.length} etapas</div><div class="grp">Sua trilha</div>`+t.ordem.map((id,i)=>item(id,i+1)).join('');
  const rest=ord.filter(id=>!t.ordem.includes(id));if(rest.length)h+=`<div class="grp">Complementares</div>`+rest.map(id=>item(id,0,true)).join('')}
 else{let g='';SECTIONS.forEach((s,i)=>{if(s.g!=g){g=s.g;h+=`<div class="grp">${g}</div>`}h+=item(s.id,i+1)})}
 $('#nav').innerHTML=h;$$('#nav a').forEach(a=>a.onclick=()=>$('#side').classList.remove('open'));
 $$('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.id==S.cur));progress()}
function go(id){if(!SECTIONS.find(s=>s.id==id))id='tipos';S.cur=id;save();
 $$('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.id==id));$$('section').forEach(s=>s.classList.toggle('on',s.dataset.s==id));
 const ord=order(),i=ord.indexOf(id),s=SECTIONS.find(x=>x.id==id),t=trilha(),ti=tipo();
 let crumb;if(t){const k=t.ordem.indexOf(id);crumb=k>=0?`Trilha ${ti.n} · etapa ${k+1} de ${t.ordem.length}`:`Ferramenta complementar · ${s.g}`}else crumb=`${s.g} · ${String(i+1).padStart(2,'0')} de ${SECTIONS.length}`;
 const nota=t&&(id=='producao'?t.foco:t.notas[id]);
 $('#ph').innerHTML=`<span class="mono">${crumb}</span><h1>${s.t}</h1><p>${s.d}</p>${nota?`<div class="note"><span class="mono">${ti.n}</span><div>${nota}</div></div>`:''}`;
 $('#topTitle').textContent=s.t;$('#prev').style.visibility=i?'visible':'hidden';
 const nx=SECTIONS.find(x=>x.id==ord[(i+1)%ord.length]);$('#next').textContent=i==ord.length-1?'Voltar ao início':'Próximo: '+nx.t+' →';
 syncInputs();(R[id]||(()=>{}))();window.scrollTo(0,0);}
function step(d){const o=order(),i=o.indexOf(S.cur);location.hash=o[(i+d+o.length)%o.length]}
function setTipo(id){const t=TRILHA[id],ti=TIPOS.find(x=>x.id==id);S.tipo=id;S.tipoSec=S.tipoSec.filter(x=>x!=id);
 Object.assign(S,{estrategia:t.estr,mk_fmt:t.fmt,pr_peca:t.peca,canais:[...t.canais],preco:t.preco,conv:t.conv});
 if(!S.mods.length||S.modsAuto){S.mods=ESTRUTURAS[id].map(([a,b])=>({t:a,l:[...b]}));S.modsAuto=true}
 if(S.ladder)S.ladder[2]=['Principal',ti.n,t.preco];
 if(S.stack.length&&(S.stackAuto!==false))S.stack[0]=[ti.n,t.preco];
 save();buildNav();syncInputs();R.tipos();toast('Trilha de '+ti.n+' aplicada')}

/* ---------- campos simples ---------- */
function bind(){$$('[data-k]').forEach(el=>{const k=el.dataset.k;
 if(el.type=='checkbox'){el.checked=!!S[k]}else if(S[k]!==undefined&&S[k]!==null)el.value=S[k];else if(el.dataset.num||el.tagName=='SELECT')S[k]=el.dataset.num?+el.value:el.value;
 const h=()=>{S[k]=el.type=='checkbox'?el.checked:el.dataset.num?+el.value:el.value;save();(U[S.cur]||(()=>{}))(k)};
 el.addEventListener('input',h);if(el.tagName=='SELECT'||el.type=='checkbox')el.addEventListener('change',h)})}

/* ===================== SEÇÕES ===================== */
const R={},U={};

/* --- Tipos --- */
R.tipos=()=>{const F=[['todos','Todos'],['1','Esforço baixo'],['2','Esforço médio'],['3','Esforço alto'],['rec','Recorrentes'],['alto','Ticket alto']];
 chips('#tipoFiltro',F,v=>S.tipoF==v,v=>{S.tipoF=v;save();R.tipos()});
 const f=S.tipoF,list=TIPOS.filter(t=>f=='todos'||(f=='rec'?['assinatura','comunidade','newsletter'].includes(t.id):f=='alto'?['mentoria','curso','assinatura'].includes(t.id):t.esf==+f));
 $('#tipoGrid').innerHTML=list.map(t=>`<div class="tipo ${S.tipo==t.id?'sel':''}" data-t="${t.id}"><div class="row between"><span class="ic">${t.ic}</span>${S.tipo==t.id?'<span class="pill g">Principal</span>':S.tipoSec.includes(t.id)?'<span class="pill n">Esteira</span>':''}</div>
  <b>${t.n}</b><span class="hint" style="margin:0">${t.d}</span><div class="row between" style="margin-top:auto"><span class="mono">Esforço</span><span class="dots">${[1,2,3].map(i=>`<i class="${i<=t.esf?'f':''}"></i>`).join('')}</span></div>
  <div class="row between"><span class="mono">Ticket</span><span style="font-size:13px">${t.tk}</span></div></div>`).join('');
 $$('#tipoGrid .tipo').forEach(e=>e.onclick=()=>{if(S.tipo!=e.dataset.t)setTipo(e.dataset.t)});
 const t=tipo();$('#tipoSel').textContent=t?'Principal: '+t.n:'Nenhum formato escolhido';
 $('#tipoDet').innerHTML=t?`<div class="row between"><h2>${t.n}</h2><span class="pill g">Formato principal</span></div><p class="hint">${t.d}</p>
  <div class="detail"><div><span class="mono">Ideal para</span><br>${t.ideal}</div><div><span class="mono">Tempo de produção</span><br>${t.tempo}</div><div><span class="mono">Ticket típico</span><br>${t.tk}</div><div><span class="mono">Entregáveis</span><br>${t.entrega}</div>
  <div><span class="mono">Prós</span><ul class="cl">${t.pros.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><span class="mono">Contras</span><ul class="cl">${t.contras.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><span class="mono">Ferramentas</span><br>${t.ferr}</div></div>`
  :'<h2>Escolha um formato</h2><p class="hint" style="margin:0">Clique num card para ver os detalhes. Ao escolher, o laboratório monta uma trilha específica: ordem das etapas, recomendações, calculadora, estratégia de lançamento e métricas adequadas ao formato.</p>';
 const tr=trilha(),P=$('#trilhaPanel');P.style.display=tr?'':'none';
 if(tr){P.innerHTML=`<div class="row between"><div><span class="mono">Trilha recomendada</span><h2 style="margin-top:4px">${t.n}</h2></div><span class="pill g">${MODELO_NOME[tr.modelo]}</span></div><p style="margin:6px 0 10px">${tr.foco}</p>
  <div class="detail"><div><span class="mono">Lançamento</span><br>${{semente:'Semente',interno:'Interno',perpetuo:'Perpétuo',aplicacao:'Funil de aplicação'}[tr.estr]}</div><div><span class="mono">Preço sugerido</span><br>${brl(tr.preco)}${tr.modelo=='recorrente'?'/mês':''}</div><div><span class="mono">Peça visual principal</span><br>${MOCKFMT.find(m=>m[0]==tr.fmt)[1]}</div><div><span class="mono">Canais</span><br>${tr.canais.join(', ')}</div></div>
  <div class="steps">${tr.ordem.map((id,i)=>`<a href="#${id}" class="${done(id)?'d':''}"><span class="n">${String(i+1).padStart(2,'0')}</span>${SECTIONS.find(x=>x.id==id).t}</a>`).join('')}</div>
  <div class="row" style="margin-top:14px"><a class="btn" href="#${tr.ordem[1]}" style="text-decoration:none">Começar a trilha</a><span class="hint" style="margin:0">Estratégia, canais, preço e formato do criativo foram ajustados para este formato. Você pode alterar tudo depois.</span></div>`}
 chips('#tipoSec',TIPOS.filter(x=>x.id!=S.tipo).map(x=>[x.id,x.n]),v=>S.tipoSec.includes(v),v=>{S.tipoSec=S.tipoSec.includes(v)?S.tipoSec.filter(x=>x!=v):[...S.tipoSec,v];save();R.tipos()});};

/* --- Ideia --- */
R.ideia=U.ideia=()=>{const r=S.p_res;$('#promessa').innerHTML=r?`<b>Sua promessa:</b> ${hl(promessa())}`:'<span class="empty">Preencha o resultado específico para ver a promessa.</span>'};
function promessa(){return S.p_res?cap(`${S.p_res}${S.p_prazo?' '+S.p_prazo:''}${S.p_sem?', '+S.p_sem:''}${S.p_mec?', com o '+S.p_mec:''}.`):''}

/* --- Validação --- */
R.validacao=()=>{$('#crits').innerHTML=CRITS.map(([k,t,d])=>`<div class="crit"><div class="row between"><div><b>${t}</b><div class="hint" style="margin:0">${d}</div></div><span class="v" id="v_${k}">${S.crit[k]??'–'}</span></div><input type="range" min="0" max="10" value="${S.crit[k]??5}" data-c="${k}"></div>`).join('');
 $$('[data-c]').forEach(r=>r.oninput=()=>{S.crit[r.dataset.c]=+r.value;$('#v_'+r.dataset.c).textContent=r.value;save();vscore()});
 $('#valChk').innerHTML=VALCHK.map((t,i)=>chkHtml('val'+i,t)).join('');bindChk('#valChk');vscore();};
function vscore(){const sc=CRITS.reduce((a,[k])=>a+(S.crit[k]||0),0),n=Object.keys(S.crit).length;$('#vScore').textContent=sc;
 let c,l,t;if(n<CRITS.length){c='y';l=`${n}/${CRITS.length} avaliados`;t='Mova todos os controles para ver o diagnóstico.'}
 else if(sc>=75){c='g';l='Sinal verde';t='Ideia forte. Faça uma pré-venda para confirmar com dinheiro real.'}
 else if(sc>=55){c='y';l='Promissora';t='Há potencial, mas reforce os pontos fracos antes de investir em produção.'}
 else{c='r';l='Repense o recorte';t='Mude o nicho, o avatar ou a promessa e teste outro ângulo.'}
 $('#vPill').className='pill '+c;$('#vPill').textContent=l;$('#vTxt').textContent=t;S.vlabel=l;S.vscore=sc;
 const w=CRITS.filter(([k])=>S.crit[k]!=null).sort((a,b)=>S.crit[a[0]]-S.crit[b[0]]).slice(0,3);
 $('#vWeak').innerHTML=w.length?w.map(([k,t])=>`<div class="row between" style="padding:4px 0"><span>${t}</span><span class="pill ${S.crit[k]<5?'r':S.crit[k]<7?'y':'g'}">${S.crit[k]}</span></div>`).join(''):'<p class="empty">—</p>';}

/* --- Marca --- */
const TOMR={formal:['Frases completas, "você" respeitoso, sem gírias','Escreva como fala: "a gente", contrações, gírias leves do nicho'],
 serio:['Foco em fatos; sem piadas em temas sensíveis','Use humor, analogias divertidas e referências do dia a dia'],
 tecnico:['Use termos técnicos e dados precisos','Explique como para um amigo leigo; troque jargão por exemplo'],
 reservado:['Poucas exclamações e emojis; tom sóbrio','Energia alta: exclamações, emojis e verbos de ação'],
 respeitoso:['Acolha; nunca culpe o leitor','Provoque, confronte crenças, frases de impacto']};
R.marca=()=>{
 $('#tom').innerHTML=TOM.map(([k,a,b])=>`<div class="crit"><div class="row between"><span>${a}</span><span>${b}</span></div><input type="range" min="0" max="100" value="${S.tom[k]}" data-tom="${k}"></div>`).join('');
 $$('[data-tom]').forEach(r=>r.oninput=()=>{S.tom[r.dataset.tom]=+r.value;save();tomRules()});
 $('#arqQuiz').innerHTML=ARQQUIZ.map((q,i)=>`<label class="l">${i+1}. ${q.q}</label>`+q.o.map((o,j)=>`<div class="opt ${S.aq[i]==j?'sel':''}" data-aq="${i}" data-j="${j}">${o[0]}</div>`).join('')).join('');
 $$('[data-aq]').forEach(o=>o.onclick=()=>{S.aq[o.dataset.aq]=+o.dataset.j;const sc=arqScores(),best=Object.entries(sc).sort((a,b)=>b[1]-a[1])[0];
  if(Object.keys(S.aq).length==ARQQUIZ.length&&best){S.arq=best[0];toast('Arquétipo sugerido: '+ARQ.find(a=>a.id==best[0]).n)}save();R.marca()});
 const sc=arqScores(),mx=Math.max(1,...Object.values(sc));
 $('#arqGrid').innerHTML=ARQ.map(a=>`<div class="arq ${S.arq==a.id?'sel':''}" data-a="${a.id}"><div class="sw" style="background:${a.cor}"></div>${sc[a.id]?`<span class="sc mono">${Math.round(sc[a.id]/mx*100)}%</span>`:''}<b>${a.n}</b><div class="hint" style="margin:2px 0 0;font-size:12.5px">${a.des}</div></div>`).join('');
 $$('[data-a]').forEach(e=>e.onclick=()=>{S.arq=e.dataset.a;save();R.marca()});
 const a=arq();$('#arqSel').innerHTML=a?`<span class="pill g">${a.n}</span>`:'';
 const d=$('#arqDet');d.style.display=a?'block':'none';
 if(a)d.innerHTML=`<b>${a.n}</b> — deseja: ${a.des}. Medo: ${a.medo}.<br><b>Voz:</b> ${a.voz}. <b>Nichos típicos:</b> ${a.nichos}. <b>Marcas que usam:</b> ${a.ex}.<br><b>Cor sugerida:</b> <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${a.cor};vertical-align:middle"></span> ${a.cor} · <b>Fontes sugeridas:</b> ${FONTES.filter(f=>f.arq.includes(a.id)).map(f=>f.t+' + '+f.b).slice(0,2).join(' ou ')}`;
 tomRules();U.marca();};
function arqScores(){const sc={};Object.entries(S.aq).forEach(([i,j])=>{const o=ARQQUIZ[i]&&ARQQUIZ[i].o[j];o&&o[1].forEach((id,n)=>sc[id]=(sc[id]||0)+(3-Math.min(n,2)))});return sc}
function tomRules(){const sim=[],nao=[];Object.entries(TOMR).forEach(([k,[a,b]])=>{const v=S.tom[k];if(v<35){sim.push(a);nao.push(b)}else if(v>65){sim.push(b);nao.push(a)}});
 const p=(S.m_proib||'').trim();if(p)nao.push('Palavras proibidas: '+p);const w=(S.m_palavras||'').trim();if(w)sim.push('Use: '+w);
 $('#tomSim').innerHTML='<b>Fazer</b>\n'+(sim.length?sim.map(x=>'• '+esc(x)).join('\n'):'Tom equilibrado: ajuste os extremos para gerar regras.');
 $('#tomNao').innerHTML='<b>Evitar</b>\n'+(nao.length?nao.map(x=>'• '+esc(x)).join('\n'):'—');S.tomSim=sim;S.tomNao=nao;}
function posStmt(){return `Para ${V('avatarCurto','avatar')} que querem parar de ${V('dorCurta','dor curta')}, o ${V('nome','nome do produto')} é ${V('m_cat','categoria')} que ajuda a ${V('p_res','resultado')}. Diferente de ${V('m_conc','concorrente/alternativa')}, ele ${V('m_dif','diferencial')}.`}
U.marca=k=>{$('#posStmt').innerHTML='<b>Declaração de posicionamento:</b><br>'+hl(posStmt());
 const T=S.tema||'',r=S.p_res||'',d=S.dorCurta||'',m=S.p_mec||'',a=S.avatarCurto||'';
 const sl=[T&&cap(T)+' sem complicação.',T&&a&&`${cap(T)} feito para ${a}.`,d&&`Chega de ${d}.`,r&&`${cap(r)} é possível.`,r&&`O caminho simples para ${r}.`,S.desejo&&cap(S.desejo)+'. De verdade.'].filter(Boolean);
 $('#slogans').innerHTML=sl.length?'<span class="mono" style="align-self:center">Sugestões:</span>'+sl.map(s=>`<button class="chip" data-sl="${esc(s)}">${esc(s)}</button>`).join(''):'';
 $$('[data-sl]').forEach(b=>b.onclick=()=>{S.m_slogan=b.dataset.sl;$('[data-k=m_slogan]').value=S.m_slogan;save()});
 if(k=='m_palavras'||k=='m_proib')tomRules();};

/* --- Cores --- */
R.cores=()=>{$('#baseColor').value=S.palBase;$('#harm').innerHTML=HARMONIAS.map(([v,n])=>`<option value="${v}" ${S.harm==v?'selected':''}>${n}</option>`).join('');
 $('#psico').innerHTML=PSICO.map(([c,n,e,u,x])=>`<div class="psi" data-pc="${c}"><div class="dot" style="background:${c}"></div><div><b>${n}</b> — ${e}<div class="hint" style="margin:2px 0 0">Use em: ${u}. <i>Cuidado:</i> ${x}</div></div></div>`).join('');
 $$('[data-pc]').forEach(e=>e.onclick=()=>setBase(e.dataset.pc));
 const[fg,bg]=[S.pal[4],S.pal[3]];if(!S.cFg){S.cFg=fg;S.cBg=bg}$('#cFg').value=S.cFg;$('#cBg').value=S.cBg;drawPal();};
function setBase(c){S.palBase=c;S.palTouched=true;genPal();S.cFg=S.pal[4];S.cBg=S.pal[3];$('#baseColor').value=c;$('#cFg').value=S.cFg;$('#cBg').value=S.cBg;save();drawPal()}
function drawPal(){const P=S.pal;$('#harmTxt').textContent=HARMONIAS.find(h=>h[0]==S.harm)[2];
 const h=hexHsl(S.palBase)[0],hs=[...new Set(harmHues(h).map(x=>((Math.round(x)%360)+360)%360))];if(S.harm=='tetra')hs.push((h+270)%360);
 const pos=a=>{const t=(90+a)*Math.PI/180;return`left:${50+42*Math.sin(t)}%;top:${50-42*Math.cos(t)}%`};
 $('#wheel').innerHTML=`<div class="center" style="background:${P[0]};color:${readable(P[0])}">${P[0]}</div>`+hs.map((a,i)=>`<div class="mk ${i==0?'base':''}" style="${pos(a)};background:${hsl(a,80,50)}"></div>`).join('');
 $('#swatches').innerHTML=P.map((c,i)=>`<div class="swatch"><div class="c" style="background:${c}"><input type="color" value="${c}" data-sw="${i}"></div><div class="m"><b>${c.toUpperCase()}</b>${ROLES[i]}<br><span class="hint" style="font-size:11px">${cname(c)[0]}</span></div></div>`).join('');
 $$('[data-sw]').forEach(e=>e.oninput=()=>{S.pal[e.dataset.sw]=e.value;S.palTouched=true;save();drawPal()});
 const inv=S.lpInv,bg=inv?P[4]:P[3],fg=inv?P[3]:P[4],ft=font();
 $('#lp').innerHTML=`<div class="lp" style="background:${bg};color:${fg};font-family:'${ft.b}'"><div class="nav" style="background:${P[1]};color:${readable(P[1])}"><b>${esc(S.nome||'Sua marca')}</b><span>Método · Depoimentos · Preço</span></div>
  <div class="hero"><h4 style="font-family:'${ft.t}';color:${inv?P[3]:P[0]}">${esc(S.mk_h||promessa()||'Sua promessa principal aparece aqui')}</h4><p>${esc(S.mk_s||'Subtítulo que explica para quem é e como funciona.')}</p><span class="cta" style="background:${P[2]};color:${readable(P[2])}">${esc(S.mk_c||'Quero começar')}</span></div>
  <div class="feat">${['Benefício 1','Benefício 2','Benefício 3'].map(b=>`<div style="background:${P[1]};color:${readable(P[1])}">${b}</div>`).join('')}</div></div>`;
 const[hh,ss]=hexHsl(P[0]);$('#scale').innerHTML='<div class="scale">'+[95,88,78,66,55,45,35,25,15].map((l,i)=>{const c=hsl(hh,ss,l);return`<div style="background:${c};color:${readable(c)}">${[50,100,200,300,400,500,600,700,900][i]}</div>`}).join('')+'</div>';
 contrastUI();
 const pr=[];for(let i=0;i<5;i++)for(let j=i+1;j<5;j++)pr.push([i,j,contrast(P[i],P[j])]);pr.sort((a,b)=>b[2]-a[2]);
 $('#pairs').innerHTML=pr.map(([i,j,r])=>`<div style="background:${P[j]};color:${P[i]}"><b>Aa</b> ${ROLES[i]} / ${ROLES[j]}<br><span class="pill ${r>=4.5?'g':r>=3?'y':'r'}" style="margin-top:4px">${r.toFixed(1)}:1</span></div>`).join('');}
function contrastUI(){const f=S.cFg,b=S.cBg,r=contrast(f,b);$('#cSample').style.cssText=`background:${b};color:${f}`;$('#cRatio').textContent=r.toFixed(2)+':1';
 $('#cBadges').innerHTML=[['AA texto',4.5],['AA título',3],['AAA texto',7]].map(([n,m])=>`<span class="pill ${r>=m?'g':'r'}">${n}: ${r>=m?'aprovado':'reprovado'}</span>`).join('')}
function cssVars(){return `:root{\n${S.pal.map((c,i)=>`  --cor-${['primaria','secundaria','destaque','fundo','texto'][i]}: ${c};`).join('\n')}\n  --fonte-titulo: '${font().t}', serif;\n  --fonte-texto: '${font().b}', sans-serif;\n}`}

/* --- Tipografia --- */
R.tipografia=()=>{const a=arq();$('#fArq').disabled=!a;const only=$('#fArq').checked&&a;const txt=$('#fTxt').value||S.mk_h||promessa()||S.nome||'Transforme o que você sabe em um produto que vende';
 if(!$('#fTxt').value)$('#fTxt').placeholder=txt;const P=S.pal;
 $('#fontGrid').innerHTML=FONTES.filter(f=>!only||f.arq.includes(a.id)).map(f=>`<div class="fp ${S.font==f.id?'sel':''}" data-f="${f.id}" style="background:${P[3]};color:${P[4]}"><div class="row between"><span class="mono">${f.tag}</span>${S.font==f.id?'<span class="pill g">Escolhido</span>':a&&f.arq.includes(a.id)?'<span class="pill y">Combina com '+a.n+'</span>':''}</div>
  <div class="t" style="font-family:'${f.t}';color:${P[0]}">${esc(txt)}</div><div class="b" style="font-family:'${f.b}';color:${P[4]}">Texto corrido em ${f.b}. Boa leitura em parágrafos longos, legendas e e-mails.</div>
  <div class="mono" style="margin-top:10px">${f.t} + ${f.b}</div></div>`).join('')||'<p class="empty">Nenhum par para este filtro.</p>';
 $$('[data-f]').forEach(e=>e.onclick=()=>{S.font=e.dataset.f;S.fontTouched=true;save();R.tipografia();toast('Fontes escolhidas')});
 const f=font();$('#hier').innerHTML=[['H1 · título da página',49,f.t],['H2 · seção',39,f.t],['H3 · bloco',31,f.t],['H4 · subtítulo',25,f.t],['Corpo de texto',16,f.b],['Legenda / nota',13,f.b]].map(([n,px,ff])=>`<div class="row" style="padding:8px 0;border-bottom:1px dashed var(--line);flex-wrap:nowrap"><span class="mono" style="width:150px;flex:0 0 auto">${n}<br>${px}px</span><span style="font-family:'${ff}';font-size:${px}px;line-height:1.15;color:${P[0]};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(S.nome||'Seu infoproduto')}</span></div>`).join('');};

/* --- Imagens --- */
R.imagens=()=>{const T=[['mock','Estúdio de criativos'],['prompt','Prompts para IA'],['tam','Tamanhos'],['check','Checklist e direção visual']];
 $('#imgTabs').innerHTML=T.map(([v,t])=>`<button class="${S.imgTab==v?'on':''}" data-v="${v}">${t}</button>`).join('');
 $$('#imgTabs button').forEach(b=>b.onclick=()=>{S.imgTab=b.dataset.v;save();R.imagens()});
 $$('[data-it]').forEach(d=>d.style.display=d.dataset.it==S.imgTab?'block':'none');
 chips('#mFmt',MOCKFMT.map(m=>[m[0],m[1]]),v=>S.mk_fmt==v,v=>{S.mk_fmt=v;save();R.imagens()});
 chips('#mLay',[['bold','Impacto'],['split','Dividido'],['mini','Minimalista']],v=>S.mk_lay==v,v=>{S.mk_lay=v;save();R.imagens()});
 chips('#mBg',[['primaria','Cor primária'],['clara','Clara'],['escura','Escura'],['gradiente','Gradiente']],v=>S.mk_bg==v,v=>{S.mk_bg=v;save();R.imagens()});
 chips('#pPeca',PECAS.map(p=>[p[0],p[1]]),v=>S.pr_peca==v,v=>{S.pr_peca=v;save();prompts();R.imagens()});
 $('#pEst').innerHTML=ESTILOS.map(([id,n,d])=>`<div class="opt ${S.pr_est==id?'sel':''}" data-pe="${id}"><b>${n}</b> <span class="hint">— ${d}</span></div>`).join('');
 $$('[data-pe]').forEach(e=>e.onclick=()=>{S.pr_est=e.dataset.pe;save();R.imagens()});
 $('#tamTb').innerHTML='<tr><th>Peça</th><th>Pixels</th><th>Proporção</th><th>Uso</th></tr>'+TAMANHOS.map(r=>`<tr>${r.map((c,i)=>`<td>${i==1?'<b>'+c+'</b>':c}</td>`).join('')}</tr>`).join('');
 $('#criaChk').innerHTML=CHECKCRIA.map((t,i)=>chkHtml('cria'+i,t)).join('');bindChk('#criaChk');
 $('#vEstilo').innerHTML='<option value="">— escolha —</option>'+ESTILOS.map(e=>`<option value="${e[0]}" ${S.v_estilo==e[0]?'selected':''}>${e[1]}</option>`).join('');
 mock();prompts();};
U.imagens=()=>{mock();prompts()};
$('#mkFill')&&($('#mkFill').onclick=()=>{S.mk_h=S.p_res?cap(S.p_res)+(S.p_prazo?' '+S.p_prazo:''):(S.nome||'');S.mk_s=[S.p_sem,S.p_mec&&'com o '+S.p_mec].filter(Boolean).join(', ');S.mk_s=S.mk_s?cap(S.mk_s):'';
 S.mk_badge=S.mk_badge||(tipo()?tipo().n:'Novo');['mk_h','mk_s','mk_badge'].forEach(k=>$(`[data-k=${k}]`).value=S[k]);save();mock();toast('Preenchido com sua promessa')});
function mock(){const P=S.pal,f=font(),fm=MOCKFMT.find(m=>m[0]==S.mk_fmt)||MOCKFMT[0];let bg,fg,hc,bb;
 if(S.mk_bg=='primaria'){bg=P[0];fg=readable(P[0]);hc=fg;bb=P[2]}
 else if(S.mk_bg=='clara'){bg=P[3];fg=P[4];hc=P[0];bb=P[2]}
 else if(S.mk_bg=='escura'){bg=P[4];fg=P[3];hc=P[3];bb=P[2]}
 else{bg=`linear-gradient(135deg,${P[0]},${P[1]})`;fg=readable(P[0]);hc=fg;bb=P[2]}
 const H=esc(S.mk_h||(S.p_res?cap(S.p_res)+(S.p_prazo?' '+S.p_prazo:''):S.nome||'Seu título de impacto aqui')),Sb=esc(S.mk_s||'Subtítulo com o benefício principal'),C=esc(S.mk_c||'Garanta sua vaga'),B=esc(S.mk_badge||''),A=esc(S.mk_a||S.nome||'');
 const isE=S.mk_fmt=='ebook',lay=S.mk_lay,ic=(S.nome||'Infoproduto').split(/\s+/).filter(w=>w.length>2).map(w=>w[0]).join('').slice(0,2).toUpperCase();
 let deco='',inner='';
 if(lay=='bold'){deco=`<div class="shape" style="width:70cqw;height:70cqw;right:-25cqw;top:-20cqw;background:${P[2]};opacity:.9"></div><div class="shape" style="width:30cqw;height:30cqw;right:12cqw;bottom:-10cqw;background:${P[1]};opacity:.8"></div>`;
  inner=`${B?`<span class="badge" style="background:${bb};color:${readable(bb)}">${B}</span>`:''}<div style="margin-top:auto"></div><h3 class="h" style="color:${hc};font-family:'${f.t}';max-width:85%">${H}</h3><p class="s" style="font-family:'${f.b}'">${Sb}</p>${isE?`<span class="author">${A}</span>`:`<span class="c" style="background:${bb};color:${readable(bb)};font-family:'${f.b}'">${C} →</span>`}`}
 else if(lay=='split'){const wide=S.mk_fmt=='thumb';deco=wide?`<div style="position:absolute;right:0;top:0;bottom:0;width:42%;background:${P[1]}"></div><div class="face" style="right:6%;top:50%;transform:translateY(-50%);width:30cqw;height:30cqw;background:${P[2]};color:${readable(P[2])};font-family:'${f.t}';font-size:11cqw;font-weight:700">${ic}</div>`
   :`<div style="position:absolute;left:0;right:0;bottom:0;height:42%;background:${P[1]}"></div><div class="face" style="left:50%;bottom:8%;transform:translateX(-50%);width:34cqw;height:34cqw;background:${P[2]};color:${readable(P[2])};font-family:'${f.t}';font-size:11cqw;font-weight:700">${ic}</div>`;
  inner=`${B?`<span class="badge" style="background:${bb};color:${readable(bb)}">${B}</span>`:''}<h3 class="h" style="color:${hc};font-family:'${f.t}';max-width:${wide?'55%':'100%'}">${H}</h3><p class="s" style="font-family:'${f.b}';max-width:${wide?'55%':'100%'}">${Sb}</p>${isE?`<span class="author">${A}</span>`:`<span class="c" style="background:${bb};color:${readable(bb)};font-family:'${f.b}'">${C}</span>`}`}
 else{deco=`<div style="position:absolute;left:8cqw;right:8cqw;top:50%;height:0.6cqw;background:${P[2]};opacity:.0"></div>`;
  inner=`<div style="margin:auto 0;text-align:center;display:flex;flex-direction:column;gap:3cqw;align-items:center">${B?`<span class="mono" style="color:${fg};opacity:.7;font-size:3cqw">${B}</span>`:''}<h3 class="h" style="color:${hc};font-family:'${f.t}'">${H}</h3><div style="width:14cqw;height:.8cqw;background:${bb}"></div><p class="s" style="font-family:'${f.b}'">${Sb}</p></div>${isE?`<span class="author" style="text-align:center">${A}</span>`:`<span class="c" style="align-self:center;background:${bb};color:${readable(bb)};font-family:'${f.b}'">${C}</span>`}`}
 $('#mock').innerHTML=`<div class="mock ${S.mk_fmt}" style="aspect-ratio:${fm[2]};background:${bg};color:${fg};width:${S.mk_fmt=='thumb'?'560px':S.mk_fmt=='story'?'300px':'380px'};max-width:100%">${deco}<div class="inner">${inner}</div></div>`;}
function prompts(){const pc=PECAS.find(p=>p[0]==S.pr_peca)||PECAS[0],es=ESTILOS.find(e=>e[0]==S.pr_est)||ESTILOS[0],P=S.pal,a=arq();
 const cores=P.slice(0,3).map(c=>`${cname(c)[0]} (${c})`).join(', '),coresEn=P.slice(0,3).map(c=>`${cname(c)[1]} ${c}`).join(', ');
 const cena=S.pr_cena||'',mood=S.pr_mood||'',txt=S.pr_txt;
 const pt=`${pc[1]} para um infoproduto sobre ${V('tema','tema')}, voltado para ${V('avatarCurto','avatar')}. Estilo: ${es[1].toLowerCase()} — ${es[2].toLowerCase()}.${cena?` Cena: ${cena}.`:''}${mood?` Clima: ${mood}.`:''} Paleta de cores: ${cores}.${a?` Personalidade da marca: ${a.n.toLowerCase()}, ${a.voz.toLowerCase()}.`:''}${txt?' Deixe uma área limpa e vazia no topo para inserir o título.':''} Composição limpa, foco em um único elemento, alta resolução.`;
 const en=`${pc[2]}, topic: ${V('tema','tema')}, target audience: ${V('avatarCurto','avatar')}, ${es[3]}${cena?`, scene: ${cena}`:''}${mood?`, mood: ${mood}`:''}, color palette: ${coresEn}${a?`, brand personality: ${a.n} archetype`:''}${txt?', clean empty space at the top for headline text':''}, single focal point, high resolution, professional`;
 out('#prPt',pt);out('#prEn',en);out('#prNeg','Texto, letras distorcidas, marca d\'água, logotipos de terceiros, rostos de pessoas reais, mãos deformadas, baixa resolução, excesso de elementos, cores fora da paleta.\n\nEN: text, distorted letters, watermark, third-party logos, real people faces, deformed hands, low resolution, cluttered, off-palette colors');}

/* --- Copy --- */
function heads(){const R_=V('p_res','resultado'),P=V('p_prazo','prazo'),SEM=V('p_sem','sem o quê'),M=V('p_mec','mecanismo'),A=V('avatarCurto','avatar'),D=V('dorCurta','dor curta'),T=V('tema','tema'),N=V('nome','produto'),DES=V('desejo','desejo');
 const o=(objs()[0]||'').replace(/^["“]|["”]$/g,'');const ob=o?o.charAt(0).toLowerCase()+o.slice(1):'⟦objeção⟧';const n=S.mods.length>=3?S.mods.length:5;
 const pz=(S.p_prazo||'').replace(/^em\s+/i,'');
 return[`Como ${R_} ${P}, ${SEM}`,`${cap(A)}: conheça o ${M} para ${R_}`,`Cansou de ${D}? Veja como ${R_} ${P}`,`O jeito mais simples de ${R_}, mesmo que você ache que "${ob}"`,
 `${n} passos para ${R_} ${P}`,`Por que a maioria das pessoas nunca consegue ${R_} (e como ser a exceção)`,`O que ninguém te contou sobre ${T}`,`${cap(R_)} ${P} ou seu dinheiro de volta`,
 `O guia definitivo de ${T} para ${A}`,`Finalmente: um método de ${T} feito para ${A}`,`A verdade sobre ${T} que faz você ${D}`,`${cap(R_)}, ${SEM}? Sim, é possível`,
 `Atenção, ${A}: é possível ${R_} ${SEM}`,`7 erros que fazem ${A} ${D}`,pz?`O plano de ${pz} para ${R_}`:`O plano prático para ${R_}`,`Como eu consegui ${R_}, ${SEM} (e como você também pode)`,
 `${cap(R_)}: o passo a passo que eu queria ter tido no começo`,`Quanto custa continuar a ${D}?`,`${N}: ${R_} ${P}, ${SEM}`,`Imagine ${DES.charAt(0)=='⟦'?DES:DES.charAt(0).toLowerCase()+DES.slice(1)}. Agora imagine isso ${P}`]}
R.copy=()=>{const T=[['head','Headlines e CTAs'],['fw','Frameworks'],['pv','Página de vendas'],['email','E-mails'],['obj','Objeções e gatilhos'],['comp','Conformidade']];
 $('#cpTabs').innerHTML=T.map(([v,t])=>`<button class="${S.cpTab==v?'on':''}" data-v="${v}">${t}</button>`).join('');
 $$('#cpTabs button').forEach(b=>b.onclick=()=>{S.cpTab=b.dataset.v;save();R.copy()});
 $$('[data-ct]').forEach(d=>d.style.display=d.dataset.ct==S.cpTab?'block':'none');
 const t=S.cpTab;
 if(t=='head'){const H=heads();$('#hCount').textContent=H.length+' modelos';
  $('#heads').innerHTML=H.map((h,i)=>{const p=plain(h),f=S.favH.includes(p);return`<div class="row" style="flex-wrap:nowrap;padding:8px 0;border-bottom:1px dashed var(--line);align-items:flex-start"><button class="fav ${f?'on':''}" data-fav="${i}">${f?'Salva':'Salvar'}</button><span style="flex:1">${hl(h)}</span><button class="btn ghost sm" data-cph="${i}">Copiar</button></div>`}).join('');
  $$('[data-fav]').forEach(b=>b.onclick=()=>{const p=plain(H[b.dataset.fav]);S.favH=S.favH.includes(p)?S.favH.filter(x=>x!=p):[...S.favH,p];save();R.copy()});
  $$('[data-cph]').forEach(b=>b.onclick=()=>copy(H[b.dataset.cph]));
  $('#favs').innerHTML=S.favH.length?S.favH.map((h,i)=>`<div class="row between" style="flex-wrap:nowrap;padding:6px 0;border-bottom:1px dashed var(--line)"><span>${esc(h)}</span><button class="x" data-unf="${i}">×</button></div>`).join(''):'<p class="empty">Clique em Salvar nas headlines que mais gostar.</p>';
  $$('[data-unf]').forEach(b=>b.onclick=()=>{S.favH.splice(b.dataset.unf,1);save();R.copy()});
  const C=CTAS.map(c=>c.replace('{res}',V('p_res','resultado')).replace('{dorCurta}',V('dorCurta','dor curta')));
  $('#ctas').innerHTML=C.map((c,i)=>`<button class="chip" data-cta="${i}">${hl(c)}</button>`).join('');$$('[data-cta]').forEach(b=>b.onclick=()=>copy(C[b.dataset.cta]));
  const les=[];S.mods.forEach((m,i)=>m.l.filter(Boolean).forEach(l=>les.push([l,i])));const suf=['sem complicação','mesmo começando do zero','em poucos minutos por dia','e o erro que quase todo mundo comete aqui','passo a passo, com exemplos reais'];
  out('#bullets',les.length?les.slice(0,12).map(([l,i],j)=>`• ${cap(l)} — ${suf[j%suf.length]} (${tipo()?tipo().unid.toLowerCase():'módulo'} ${i+1})`).join('\n'):'Adicione aulas na aba Estrutura do conteúdo para gerar bullets.');}
 if(t=='fw'){chips('#fwSel',FW.map(f=>[f.id,f.n]),v=>S.fw==v,v=>{S.fw=v;save();R.copy()});const f=FW.find(x=>x.id==S.fw)||FW[0];
  $('#fwSteps').innerHTML=`<p class="hint">${f.d}</p>`+f.st.map(([n,d],i)=>`<div class="crit"><b>${i+1}. ${n}</b><div class="hint" style="margin:0">${d}</div></div>`).join('');out('#fwOut',f.g())}
 if(t=='pv')out('#pvOut',salesPage());
 if(t=='email'){const E=emails();$('#emails').innerHTML=E.map((e,i)=>`<div class="mod"><div class="row between"><span class="mono">${e[0]}</span><button class="btn ghost sm" data-em="${i}">Copiar</button></div><b>${hl('Assunto: '+e[1])}</b><div class="hint" style="margin:4px 0 0;white-space:pre-wrap">${hl(e[2])}</div></div>`).join('');
  $$('[data-em]').forEach(b=>b.onclick=()=>{const e=E[b.dataset.em];copy(`Assunto: ${e[1]}\n\n${e[2]}`)})}
 if(t=='obj'){const O=objs();$('#objs').innerHTML=O.length?O.map(o=>{const[r,f]=objResp(o);return`<div class="mod"><b>“${esc(o)}”</b><div style="margin-top:6px">${hl(r)}</div><div class="hint" style="margin:6px 0 0">FAQ: ${hl(f)}</div></div>`}).join(''):'<p class="empty">Liste as objeções do avatar em Ideia, nicho e avatar (uma por linha).</p>';
  $('#gat').innerHTML='<tr><th>Gatilho</th><th>Como usar</th><th>Limite ético</th></tr>'+GATILHOS.map(g=>`<tr><td><b>${g[0]}</b></td><td>${g[1]}</td><td class="hint">${g[2]}</td></tr>`).join('')}
 if(t=='comp'){$('#compChk').innerHTML=COMPLIANCE.map((c,i)=>chkHtml('comp'+i,c)).join('');bindChk('#compChk')}};
const FW=[
 {id:'aida',n:'AIDA',d:'Clássico para anúncios, posts e e-mails curtos.',st:[['Atenção','Headline que interrompe a rolagem'],['Interesse','Mostre que você entende a situação do leitor'],['Desejo','Pinte o resultado e o mecanismo'],['Ação','Uma chamada clara e única']],
  g:()=>`${heads()[0]}\n\nSe você faz parte das ${V('avatarCurto','avatar')}, sabe como é ${V('dorCurta','dor curta')}. ${S.dor?S.dor:'⟦dor nas palavras do avatar⟧'}\n\nAgora imagine: ${V('desejo','desejo')}. Com o ${V('p_mec','mecanismo')}, você vai ${V('p_res','resultado')} ${V('p_prazo','prazo')}, ${V('p_sem','sem o quê')}.\n\nClique no link e garanta seu acesso ao ${V('nome','produto')}.`},
 {id:'pas',n:'PAS',d:'Problema, agitação, solução. Forte para públicos com dor clara.',st:[['Problema','Nomeie a dor com as palavras do avatar'],['Agitação','Mostre o custo de não resolver'],['Solução','Apresente o produto como a saída']],
  g:()=>`${S.dor?S.dor:'⟦dor nas palavras do avatar⟧'}\n\nE o pior: quanto mais tempo passa, mais normal parece ${V('dorCurta','dor curta')}. ${S.e_medos?S.e_medos:'⟦medos e frustrações⟧'}. Você tenta resolver sozinho(a), mas ${S.lacuna?'as soluções que existem não servem para o seu caso: '+S.lacuna:'⟦por que as soluções atuais falham⟧'}\n\nFoi por isso que criei o ${V('nome','produto')}: o ${V('p_mec','mecanismo')} para ${V('p_res','resultado')} ${V('p_prazo','prazo')}, ${V('p_sem','sem o quê')}.\n\nComece hoje.`},
 {id:'bab',n:'Antes · Depois · Ponte',d:'Mostra a transformação. Ótimo para stories e depoimentos.',st:[['Antes','Como é a vida hoje'],['Depois','Como fica depois da transformação'],['Ponte','O produto que liga os dois']],
  g:()=>`ANTES: ${S.pontoA||S.dor||'⟦ponto A⟧'}\n\nDEPOIS: ${S.pontoB||S.desejo||'⟦ponto B⟧'}\n\nA PONTE: o ${V('nome','produto')}. Com o ${V('p_mec','mecanismo')}, você sai do primeiro cenário para o segundo ${V('p_prazo','prazo')}.\n\nQuero atravessar essa ponte.`},
 {id:'4ps',n:'4Ps',d:'Imagem, promessa, prova e proposta. Base para páginas de vendas curtas.',st:[['Imagem','Faça o leitor visualizar o resultado'],['Promessa','O que exatamente vai conseguir'],['Prova','Por que acreditar em você'],['Proposta','Oferta, preço, garantia e chamada']],
  g:()=>`IMAGEM: Imagine ${S.desejo?S.desejo.charAt(0).toLowerCase()+S.desejo.slice(1):'⟦desejo⟧'}.\n\nPROMESSA: Com o ${V('p_mec','mecanismo')}, você vai ${V('p_res','resultado')} ${V('p_prazo','prazo')}.\n\nPROVA: ${S.autoridade||'⟦sua autoridade e resultados⟧'}\n⟦depoimentos de alunos⟧\n\nPROPOSTA: ${V('nome','produto')} por ${brl(+S.preco||0)}${S.parcelas>1?` ou ${S.parcelas}x de ${brl2((+S.preco||0)/S.parcelas)}`:''}. Garantia de ${S.garantia||'7 dias'}.${S.urgencia?' '+S.urgencia+'.':''}\n\nGarantir minha vaga.`},
 {id:'quest',n:'QUEST',d:'Qualificar, entender, educar, estimular, transição. Ideal para cartas longas e webinars.',st:[['Qualificar','Diga para quem é'],['Entender','Mostre empatia com a situação'],['Educar','Ensine algo que muda a visão do problema'],['Estimular','Desperte o desejo pela solução'],['Transição','Leve para a oferta']],
  g:()=>`Este conteúdo é para ${V('avatarCurto','avatar')} que estão cansados(as) de ${V('dorCurta','dor curta')}.\n\nEu sei como é. ${S.e_pensa||'⟦o que o avatar pensa e sente⟧'}\n\nO problema não é você. ${S.lacuna?cap(S.lacuna):'⟦a lacuna: por que os métodos comuns falham⟧'}\n\nQuando você aplica o ${V('p_mec','mecanismo')}, tudo muda: ${V('p_res','resultado')} deixa de ser sonho e vira plano.\n\nPor isso criei o ${V('nome','produto')}. Veja como funciona a seguir.`},
 {id:'story',n:'Storytelling',d:'Jornada do herói curta: a história de virada (sua ou de um aluno).',st:[['Mundo comum','Como era antes'],['Chamado','O momento em que algo precisava mudar'],['Obstáculo','O que deu errado'],['Virada','A descoberta do método'],['Resultado','Como ficou depois'],['Convite','Chame o leitor para a mesma jornada']],
  g:()=>`Há um tempo, eu vivia exatamente isso: ${S.dor||'⟦a dor⟧'}\n\nAté que um dia ⟦momento de virada⟧.\n\nTentei de tudo: ⟦o que não funcionou⟧. Nada resolvia, porque ${S.lacuna||'⟦a lacuna⟧'}.\n\nFoi quando desenvolvi o ${V('p_mec','mecanismo')}. ${S.autoridade||'⟦resultado que você alcançou⟧'}\n\nHoje eu ensino esse caminho no ${V('nome','produto')}, para que você possa ${V('p_res','resultado')} ${V('p_prazo','prazo')}.\n\nVem comigo.`}];
function salesPage(){const N=V('nome','produto'),p=+S.preco||0,tot=S.stack.reduce((a,r)=>a+(+r[1]||0),0),un=tipo()?tipo().unid:'Módulo';
 const mods=S.mods.length?S.mods.map((m,i)=>`  ${i+1}. ${m.t}`+m.l.filter(Boolean).map(l=>`\n      – ${l}`).join('')).join('\n'):'  ⟦módulos da aba Estrutura do conteúdo⟧';
 const faq=[...objs().map(o=>objResp(o)[1]),'Como vou acessar o conteúdo?','Por quanto tempo terei acesso?','E se eu não gostar?'];
 return `01 · HEADLINE
${heads()[0]}

02 · SUBHEADLINE
${S.p_mec?`O ${S.p_mec} ajuda `:'⟦mecanismo⟧ ajuda '}${V('avatarCurto','avatar')} a ${V('p_res','resultado')}, ${V('p_sem','sem o quê')}.
[Botão: Quero começar]

03 · LEAD / IDENTIFICAÇÃO
Se você está cansado(a) de ${V('dorCurta','dor curta')}, saiba: não é falta de esforço.
${S.dor||'⟦dor nas palavras do avatar⟧'}

04 · AGITAÇÃO DO PROBLEMA
${S.e_medos||'⟦medos e frustrações do mapa de empatia⟧'}

05 · POR QUE AS OUTRAS SOLUÇÕES FALHAM
${S.lacuna||'⟦lacuna no mercado⟧'}

06 · O MECANISMO
Apresentando o ${V('p_mec','mecanismo')}: ${S.m_dif||'⟦o que o torna diferente⟧'}.

07 · O QUE VOCÊ VAI APRENDER (${un.toLowerCase()}s)
${mods}

08 · PARA QUEM É / PARA QUEM NÃO É
• Para ${V('avatarCurto','avatar')} que querem ${V('p_res','resultado')}
• Para quem ⟦outro perfil ideal⟧
• Não é para quem procura fórmula mágica ou resultado sem aplicação

09 · BÔNUS
${S.stack.slice(1).map(r=>`• ${r[0]} (valor: ${brl(+r[1])})`).join('\n')||'⟦bônus⟧'}

10 · PROVA SOCIAL
⟦3 a 5 depoimentos reais, com nome e resultado, autorizados⟧

11 · QUEM VAI TE ENSINAR
${S.autoridade||'⟦sua história e autoridade⟧'}

12 · OFERTA
Tudo o que você recebe: ${S.stack.map(r=>r[0]).join(' + ')}
Valor total: ${brl(tot)}
Hoje: ${brl(p)}${S.parcelas>1?` ou ${S.parcelas}x de ${brl2(p/S.parcelas)}`:''}
${S.urgencia?'Prazo: '+S.urgencia:''}
[Botão: Quero garantir minha vaga]

13 · GARANTIA
Garantia de ${S.garantia||'7 dias'}. Se não for para você, devolvemos 100% do valor. Simples assim.

14 · PERGUNTAS FREQUENTES
${faq.map(f=>'• '+f).join('\n')}

[Botão final: ${CTAS[0]}]
P.S. ${S.urgencia||'Lembre: a garantia tira todo o risco das suas costas.'}`}
function emails(){const N=V('nome','produto'),R_=V('p_res','resultado'),D=V('dorCurta','dor curta'),M=V('p_mec','mecanismo'),A=V('avatarCurto','avatar'),o=objs()[0]||'⟦principal objeção⟧';
 const E={semente:[['E-mail 1 · Convite (D-7)',`[Aula gratuita] Como ${R_}`,`Convide para a aula ao vivo. Fale da dor (${D}) e prometa 3 aprendizados práticos. CTA: confirmar presença.`],
   ['E-mail 2 · Lembrete (D-0, manhã)',`Hoje, às 20h: o primeiro passo para ${R_}`,`Lembrete curto + link da sala. Antecipe 1 surpresa da aula.`],
   ['E-mail 3 · Carrinho aberto',`As inscrições do ${N} estão abertas (turma de fundadores)`,`Resumo da aula, a oferta beta, os bônus de fundador e a garantia. CTA: garantir vaga.`],
   ['E-mail 4 · Objeções',`"${o}"`,`Responda a principal objeção com uma história ou exemplo real. Reforce a garantia.`],
   ['E-mail 5 · Último dia',`Últimas horas para entrar no ${N}`,`Urgência real: o que acontece quando fechar. Recapitule a oferta em bullets. CTA final.`]],
  interno:[['E-mail 1 · Boas-vindas à lista',`Você está dentro: o que vem por aí`,`Agradeça, explique o cronograma e peça para responder com a maior dificuldade em ${V('tema','tema')}.`],
   ['E-mail 2 · CPL 1 (oportunidade)',`O motivo real de ${A} ${D}`,`Link da aula 1. Mostre a oportunidade e quebre a crença principal.`],
   ['E-mail 3 · CPL 2 (método)',`O ${M} explicado`,`Link da aula 2. Apresente o método e um estudo de caso.`],
   ['E-mail 4 · CPL 3 (experiência de posse)',`Como seria sua vida depois de ${R_}?`,`Link da aula 3. Faça o leitor se ver com o resultado. Anuncie a data de abertura.`],
   ['E-mail 5 · Abertura do carrinho',`Abriu: ${N}`,`Oferta completa, bônus de ação rápida, garantia. CTA direto.`],
   ['E-mail 6 · Prova social e objeções',`O que quem já entrou está dizendo`,`Depoimentos + resposta a "${o}".`],
   ['E-mail 7 · Última chamada',`Fecha hoje à meia-noite`,`Curto, direto, com contagem regressiva e recapitulação.`]],
  perpetuo:[['Dia 0 · Entrega da isca',`Aqui está o seu ${S.isca||'material'} gratuito`,`Entregue o link, diga como usar em 5 minutos e o que esperar dos próximos e-mails.`],
   ['Dia 1 · História',`Eu também já precisei ${D}`,`Sua história de virada (use o framework Storytelling).`],
   ['Dia 2 · Erro comum',`O erro nº 1 de quem quer ${R_}`,`Ensine algo útil e mostre por que a lacuna existe.`],
   ['Dia 3 · O método',`Como funciona o ${M}`,`Explique os passos do método; apresente o ${N} no final.`],
   ['Dia 4 · Oferta',`Conheça o ${N}`,`Oferta completa com pilha de valor e garantia.`],
   ['Dia 5 · Objeção',`"${o}"`,`Quebre a objeção com prova e exemplo.`],
   ['Dia 6 · Urgência do bônus',`Seu bônus expira amanhã`,`Bônus por tempo limitado (real) para quem decidir agora.`]],
  aplicacao:[['Conteúdo 1 · Estudo de caso',`Como ⟦cliente⟧ conseguiu ${R_}`,`Conte a situação inicial, o diagnóstico e o resultado. Termine com o convite para aplicar.`],
   ['Conteúdo 2 · Diagnóstico',`3 sinais de que você precisa de acompanhamento para ${R_}`,`Ajude o leitor a se identificar; mostre que fazer sozinho custa mais caro.`],
   ['Convite para aplicação',`Abri vagas para o ${N}`,`Explique o processo: aplicação, chamada de diagnóstico e proposta. Chamada: preencher o formulário.`],
   ['Confirmação da chamada',`Sua chamada de diagnóstico está confirmada`,`Data, horário, link e o que preparar antes da conversa.`],
   ['Follow-up após a chamada',`Resumo da nossa conversa e próximos passos`,`Recapitule o diagnóstico, a proposta e o prazo para decisão.`]]};
 return E[S.estrategia]||E.semente}
function objResp(o){const l=o.toLowerCase(),M=V('p_mec','mecanismo'),N=V('nome','produto');
 if(/tempo|corrid|ocupad/.test(l))return[`Entendo. Por isso o ${N} foi pensado para rotinas apertadas: ${tipo()&&tipo().unid?tipo().unid.toLowerCase()+'s':'aulas'} curtas e um plano que cabe em poucos minutos por dia. Quem tem pouco tempo é justamente quem mais precisa de um caminho direto.`,'Quanto tempo por dia preciso dedicar?'];
 if(/caro|dinheiro|preço|preco|pagar|grana/.test(l))return[`Vamos colocar em perspectiva: ${brl(+S.preco||0)} dá cerca de ${brl2((+S.preco||0)/365)} por dia em um ano. Quanto custa continuar a ${V('dorCurta','dor curta')}? Além disso, você tem garantia de ${S.garantia||'7 dias'}: o risco é zero.`,'O investimento vale a pena para mim?'];
 if(/tentei|funciona|funcionou|já fiz|ja fiz/.test(l))return[`Faz sentido desconfiar. A diferença é que o ${M} ${S.m_dif||'⟦diferencial⟧'}. ${S.lacuna?'O que você tentou antes provavelmente não considerava isto: '+S.lacuna:''}`,'O que torna este método diferente?'];
 if(/pra mim|para mim|consigo|capaz|iniciante|zero/.test(l))return[`O ${N} foi feito para ${V('avatarCurto','avatar')}, inclusive quem está começando do zero. O passo a passo parte do básico e você tem suporte durante o caminho.`,'Serve para iniciantes?'];
 return[`Reconheça a objeção, reenquadre com um exemplo real, mostre prova (depoimento ou dado) e lembre da garantia de ${S.garantia||'7 dias'}.`,cap(o.replace(/[.!]$/,''))+'?']}
U.copy=()=>{};

/* --- Conteúdo --- */
R.conteudo=()=>{const t=tipo();$('#contHint').innerHTML=t?`Formato principal: <b>${t.n}</b>. Cada ${t.unid.toLowerCase()} deve entregar uma pequena vitória rumo ao ponto B.`:'Escolha um formato em Tipos de infoproduto para receber a estrutura sugerida.';
 $('#useTpl').style.display=t?'':'none';$('#modTitle').textContent=t?t.unid+'s':'Módulos';drawMods()};
$('#useTpl').onclick=()=>{const t=tipo();if(!t)return;S.modsAuto=true;S.mods=ESTRUTURAS[t.id].map(([a,b])=>({t:a,l:[...b]}));save();drawMods();toast('Estrutura sugerida aplicada')};
function drawMods(){const u=tipo()?tipo().unid:'Módulo';
 $('#mods').innerHTML=S.mods.length?S.mods.map((m,i)=>`<div class="mod"><div class="h"><span class="mono">${i+1}</span><input type="text" value="${esc(m.t)}" data-mt="${i}"><button class="x" data-up="${i}" title="Subir">↑</button><button class="x" data-md="${i}" title="Remover">×</button></div>
 ${m.l.map((l,j)=>`<div class="les"><span class="mono">${i+1}.${j+1}</span><input type="text" value="${esc(l)}" data-ml="${i}" data-mj="${j}" placeholder="Tópico / aula"><button class="x" data-mld="${i}" data-mj="${j}">×</button></div>`).join('')}
 <div style="margin:8px 0 0 22px"><button class="btn ghost sm" data-ma="${i}">+ Tópico</button></div></div>`).join(''):`<p class="empty">Nenhum ${u.toLowerCase()} ainda.</p>`;
 const n=S.mods.reduce((a,m)=>a+m.l.length,0);$('#modCount').textContent=`${S.mods.length} ${u.toLowerCase()}s · ${n} tópicos`;
 $$('[data-mt]').forEach(e=>e.oninput=()=>{S.mods[e.dataset.mt].t=e.value;save()});
 $$('[data-ml]').forEach(e=>e.oninput=()=>{S.mods[e.dataset.ml].l[e.dataset.mj]=e.value;save()});
 $$('[data-md]').forEach(e=>e.onclick=()=>{S.mods.splice(e.dataset.md,1);save();drawMods()});
 $$('[data-up]').forEach(e=>e.onclick=()=>{const i=+e.dataset.up;if(i>0){[S.mods[i-1],S.mods[i]]=[S.mods[i],S.mods[i-1]];save();drawMods()}});
 $$('[data-mld]').forEach(e=>e.onclick=()=>{S.mods[e.dataset.mld].l.splice(e.dataset.mj,1);save();drawMods()});
 $$('[data-ma]').forEach(e=>e.onclick=()=>{S.mods[e.dataset.ma].l.push('');save();drawMods()});}
$('#mods').addEventListener('input',()=>{S.modsAuto=false});$('#mods').addEventListener('click',e=>{if(e.target.closest('button'))S.modsAuto=false});
$('#addMod').onclick=()=>{S.modsAuto=false;const u=tipo()?tipo().unid:'Módulo';S.mods.push({t:`${u} ${S.mods.length+1} — `,l:['']});save();drawMods()};

/* --- Produção --- */
R.producao=U.producao=k=>{const t=trilha(),ti=tipo();$('#prodEmpty').style.display=t?'none':'';$('#prodBody').style.display=t?'':'none';if(!t)return;
 if(k!=='prodIni'&&k!=='prodDias'){$('#prodFoco').textContent=`Roteiro de produção para ${ti.n}. Tempo típico: ${ti.tempo}.`;
  $('#prodEtapas').innerHTML=t.prod.etapas.map((e,i)=>chkHtml(`prod_${S.tipo}_${i}`,`${String(i+1).padStart(2,'0')}  ${e}`)).join('');bindChk('#prodEtapas',()=>{pcount();progress()});
  $('#prodSpecs').innerHTML='<tr><th>Item</th><th>Recomendação</th></tr>'+t.prod.specs.map(([a,b])=>`<tr><td><b>${a}</b></td><td>${b}</td></tr>`).join('');$('#prodFerr').textContent=t.prod.ferr;
  $('#prodCheck').innerHTML=t.prod.check.map((c,i)=>chkHtml(`qc_${S.tipo}_${i}`,c)).join('');bindChk('#prodCheck');pcount()}
 const d0=S.prodIni?new Date(S.prodIni+'T12:00:00'):null,dd=+S.prodDias||3;
 $('#prodTl').innerHTML=t.prod.etapas.map((e,i)=>`<div class="ev"><span class="mono">${d0?new Date(d0.getTime()+i*dd*864e5).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}):'Dia '+(i*dd+1)}</span><br>${e}</div>`).join('')+`<div class="ev"><span class="mono">${d0?new Date(d0.getTime()+t.prod.etapas.length*dd*864e5).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}):'Dia '+(t.prod.etapas.length*dd+1)}</span><br><b>Produto pronto</b></div>`};
function pcount(){const t=trilha();if(!t)return;const n=t.prod.etapas.filter((_,i)=>S.chk[`prod_${S.tipo}_${i}`]).length;$('#prodCount').textContent=`${n}/${t.prod.etapas.length} concluídas`}

/* --- Oferta --- */
R.oferta=()=>{const m=modelo();$('#calcUnico').style.display=m=='unico'?'':'none';$('#calcRec').style.display=m=='recorrente'?'':'none';$('#calcHT').style.display=m=='highticket'?'':'none';
 $('#calcNote').textContent=tipo()?`Modelo de venda única para ${tipo().n}.`:'Escolha um formato para ajustar a calculadora ao seu modelo de negócio.';
 $$('[data-k=preco]').forEach(e=>e.value=S.preco??'');drawStack();ladder();U.oferta()};
U.oferta=()=>{stackCalc();calc();recCalc();htCalc()};
function recCalc(){const p=+S.preco||0,ini=+(S.r_ini??50),nv=+(S.r_novos??30),ch=(+(S.r_churn??6))/100,cac=+(S.r_cac??60),tx=(+(S.r_taxa??15))/100;
 let n=ini,rev=0;const serie=[];for(let m=1;m<=12;m++){n=n*(1-ch)+nv;rev+=n*p;serie.push(n)}
 const vida=ch?1/ch:0,ltv=p*(1-tx)*vida,ratio=cac?ltv/cac:0;
 $('#rAss').textContent=Math.round(n).toLocaleString('pt-BR');$('#rMrr').textContent=brl(n*p);$('#rRec').textContent=brl(rev);
 $('#rVida').textContent=ch?vida.toFixed(1):'—';$('#rLtv').textContent=brl(ltv);$('#rRatio').textContent=cac&&ch?ratio.toFixed(1)+'x':'—';
 const mx=Math.max(1,...serie);$('#rChart').innerHTML=`<span class="mono">Assinantes por mês</span><div class="mchart">${serie.map(v=>`<div style="height:${v/mx*100}%" title="${Math.round(v)}"></div>`).join('')}</div><div class="mchart-l">${serie.map((_,i)=>`<span>M${i+1}</span>`).join('')}</div>`;
 const teto=ch?nv/ch:0;
 $('#rTip').textContent=(ch>.08?'Cancelamento alto: priorize onboarding e rituais antes de investir em aquisição. ':ratio&&ratio<3?'LTV abaixo de 3x o custo de aquisição: reduza o CAC ou aumente a retenção. ':'Boa relação entre retenção e aquisição. ')+(ch?`Com esses números, a base tende a estabilizar em cerca de ${Math.round(teto).toLocaleString('pt-BR')} assinantes.`:'');
 if(modelo()=='recorrente')S.calc={tipo:'rec',n:Math.round(n),mrr:n*p,rev,ltv};}
function htCalc(){const p=+S.preco||0,L=+(S.h_leads??400),ap=L*(+(S.h_aplic??6))/100,cm=ap*(+(S.h_comp??70))/100,cli=cm*(+(S.h_fech??25))/100,cpl=+(S.h_cpl??8),mn=+(S.h_min??45),tx=(+(S.h_taxa??12))/100;
 const fat=cli*p,inv=L*cpl,liq=fat*(1-tx)-inv;
 $('#hCli').textContent=cli.toFixed(1).replace('.',',');$('#hFat').textContent=brl(fat);const l=$('#hLuc');l.textContent=brl(liq);l.style.color=liq<0?'var(--bad)':'var(--acc)';
 $('#hCac').textContent=cli?brl(inv/cli):'—';$('#hHoras').textContent=(cm*mn/60).toFixed(1).replace('.',',')+' h';$('#hVpc').textContent=cm?brl(fat/cm):'—';
 const st=[['Leads',L],['Aplicações',ap],['Chamadas realizadas',cm],['Clientes',cli]],mx=Math.max(1,L);
 $('#hFunnel').innerHTML='<div class="fbar">'+st.map(([n,v])=>`<div class="r"><span>${n}</span><div class="b" style="width:${Math.max(1,v/mx*100)}%"></div><span class="mono">${v<10?v.toFixed(1).replace('.',','):Math.round(v).toLocaleString('pt-BR')}</span></div>`).join('')+'</div>';
 $('#hTip').textContent=cli<1?'Menos de um cliente por mês: aumente o volume de leads ou melhore a taxa de aplicação com estudos de caso.':`Cada chamada vale em média ${brl(cm?fat/cm:0)}. Proteja sua agenda: qualifique bem no formulário.`;
 if(modelo()=='highticket')S.calc={tipo:'ht',cli,fat,inv,liq};}
function drawStack(){$('#stack').innerHTML=S.stack.map((r,i)=>`<div class="stack-row"><input type="text" value="${esc(r[0])}" data-si="${i}" data-sf="0"><input type="number" value="${r[1]}" data-si="${i}" data-sf="1"><button class="x" data-sd="${i}">×</button></div>`).join('');
 $$('[data-si]').forEach(e=>e.oninput=()=>{S.stackAuto=false;S.stack[e.dataset.si][e.dataset.sf]=e.dataset.sf=='1'?+e.value:e.value;save();stackCalc()});
 $$('[data-sd]').forEach(e=>e.onclick=()=>{S.stack.splice(e.dataset.sd,1);save();drawStack()});stackCalc()}
$('#addStack').onclick=()=>{S.stack.push(['Novo bônus',0]);save();drawStack()};
function stackCalc(){const t=S.stack.reduce((a,r)=>a+(+r[1]||0),0),p=+S.preco||0;$('#stTotal').textContent=brl(t);$('#stPrice').textContent=brl(p);$('#stRatio').textContent=p?(t/p).toFixed(1)+'x':'—'}
function calc(){const p=+S.preco||0,tx=(+S.taxa||0)/100,im=(+S.imposto||0)/100,L=+S.leads||0,c=+S.cpl||0,cv=(+S.conv||0)/100,bp=+S.bump||0,bpp=(+S.bumpPct||0)/100,cp=+S.custoProd||0;
 const v=Math.round(L*cv),fat=v*p+Math.round(v*bpp)*bp,inv=L*c,liq=fat*(1-tx-im)-inv-cp,roas=inv?fat/inv:0,maxc=cv*(p+bpp*bp)*(1-tx-im),be=p?Math.ceil(cp/(p*(1-tx-im))):0;
 $('#cVendas').textContent=v.toLocaleString('pt-BR');$('#cFat').textContent=brl(fat);$('#cInv').textContent=brl(inv);
 const l=$('#cLuc');l.textContent=brl(liq);l.style.color=liq<0?'var(--bad)':'var(--acc)';$('#cRoas').textContent=inv?roas.toFixed(1)+'x':'orgânico';$('#cMax').textContent=brl2(maxc);
 let t;if(!inv)t='Sem custo de aquisição: o resultado depende do tamanho e do engajamento da audiência.';
 else if(liq<0)t=`Prejuízo: o CPL está acima do ponto de equilíbrio (${brl2(maxc)}). Suba o preço, melhore a conversão ou reduza o CPL.`;
 else if(roas<2)t='Margem apertada. Use order bump, upsell ou aumente o ticket para dar folga ao tráfego.';
 else t='A conta fecha com folga. Escale o investimento aos poucos e acompanhe o CPL.';
 $('#cTip').textContent=t+(cp&&p?` São necessárias ${be} vendas para pagar o custo de produção.`:'');S.maxc=maxc;if(modelo()=='unico')S.calc={tipo:'unico',v,fat,inv,liq,roas,maxc};}
function ladder(){if(!S.ladder){const t=tipo();S.ladder=[['Isca gratuita','Checklist gratuito',0],['Entrada','E-book ou planilha',27],['Principal',t?t.n:'Curso',+S.preco||197],['Premium','Mentoria em grupo',1497],['Recorrência','Comunidade / assinatura',47]]}
 $('#ladder').innerHTML=S.ladder.map((r,i)=>`<div class="lv"><span>${i+1} · ${r[0]}</span><input type="text" value="${esc(r[1])}" data-ld="${i}" data-lf="1"><input type="number" value="${r[2]}" data-ld="${i}" data-lf="2"></div>`).join('')+`<p class="hint">LTV potencial se o cliente subir todos os degraus (12 meses de recorrência): <b id="ltv"></b></p>`;
 $$('[data-ld]').forEach(e=>e.oninput=()=>{S.ladder[e.dataset.ld][e.dataset.lf]=e.dataset.lf=='2'?+e.value:e.value;save();ltv()});ltv()}
function ltv(){const L=S.ladder;$('#ltv').textContent=brl((+L[1][2]||0)+(+L[2][2]||0)+(+L[3][2]||0)+(+L[4][2]||0)*12)}

/* --- Marketing --- */
R.marketing=()=>{S.calSeen=true;save();
 $('#funil').innerHTML=FUNIL.map((f,i)=>`<div class="st"><div><b>${f[0]}</b><div class="hint" style="margin:4px 0 0">${f[1]}</div></div><div><div style="font-size:14px"><span class="mono">Formatos</span> ${f[2]}</div><div style="font-size:14px"><span class="mono">Métricas</span> ${f[3]}</div><input type="text" data-fun="${i}" placeholder="Suas ações nesta etapa..." value="${esc(S.fun[i]||'')}" style="margin-top:6px"></div></div>`).join('');
 $$('[data-fun]').forEach(e=>e.oninput=()=>{S.fun[e.dataset.fun]=e.value;save()});
 chips('#canais',CANAIS.map(c=>[c,c]),v=>S.canais.includes(v),v=>{S.canais=S.canais.includes(v)?S.canais.filter(x=>x!=v):[...S.canais,v];save();R.marketing()});
 chips('#pilares',Object.keys(IDEIAS).filter(k=>k!='Venda').map(k=>[k,k]),v=>S.pilares.includes(v),v=>{S.pilares=S.pilares.includes(v)?S.pilares.filter(x=>x!=v):[...S.pilares,v];save();R.marketing()});
 U.marketing();cal();};
U.marketing=()=>{const isca=S.isca||'Checklist';
 out('#bio',`${cap(`ajudo ${V('avatarCurto','avatar')} a ${V('p_res','resultado')}`)}\n${S.p_sem?cap(S.p_sem)+' · ':''}${V('p_mec','mecanismo')}\n${isca} gratuito no link abaixo`);
 const R_=V('p_res','resultado'),T=V('tema','tema'),A=V('avatarCurto','avatar'),D=V('dorCurta','dor curta'),M=V('p_mec','mecanismo');
 const tit={'Checklist':`Checklist gratuito: ${S.mods.length||7} passos para ${R_}`,'Mini e-book':`Guia rápido: como parar de ${D}`,'Planilha gratuita':`Planilha gratuita de ${T} para ${A}`,'Aula gratuita':`Aula gratuita: o ${M} para ${R_}`,'Quiz de diagnóstico':`Quiz: descubra o que está fazendo você ${D}`,'Desafio de 5 dias':`Desafio de 5 dias: o primeiro passo para ${R_}`,'Template':`Template gratuito de ${T} pronto para usar`}[isca];
 out('#iscaOut',`TÍTULO DA ISCA\n${tit}\n\nPÁGINA DE CAPTURA\n${tit}\nPreencha seu nome e e-mail para receber agora, de graça.\n[Nome] [E-mail] [Botão: Quero receber]\n\nTEXTO DE CONSENTIMENTO (LGPD)\n[ ] Aceito receber e-mails com conteúdos e ofertas. Posso cancelar quando quiser. Veja a Política de Privacidade.`);};
$('#calShuffle').onclick=()=>{S.calSeed++;save();cal()};
function cal(){const r=rng(S.calSeed),fm=[];S.canais.forEach(c=>(FORMATOS[c]||[]).forEach(f=>fm.push(f+' · '+c)));if(!fm.length)fm.push('Post');
 const pil=S.pilares.length?S.pilares:['Educação'],dias=['Seg','Ter','Qua','Qui','Sex'],used={};
 const fill=s=>s.replace('{avatar}',V('avatarCurto','avatar')).replace('{dorCurta}',V('dorCurta','dor curta')).replace('{res}',V('p_res','resultado')).replace(/\{tema\}/g,V('tema','tema')).replace('{mec}',V('p_mec','mecanismo')).replace('{nome}',V('nome','produto')).replace('{obj}',objs()[0]||'⟦objeção⟧');
 let h='<div></div>'+dias.map(d=>`<div class="hd">${d}</div>`).join('');
 for(let w=0;w<4;w++){h+=`<div class="hd">Sem ${w+1}</div>`;dias.forEach((d,i)=>{const p=(w==3&&i%2==0)?'Venda':pil[(w*5+i)%pil.length];const L=IDEIAS[p];used[p]=(used[p]||Math.floor(r()*L.length))+1;const idea=L[used[p]%L.length];
  h+=`<div class="cell"><div class="f">${esc(fm[Math.floor(r()*fm.length)])}</div><div style="margin:4px 0">${hl(fill(idea))}</div><div class="p">${p}</div></div>`})}
 $('#cal').innerHTML=h;}

/* --- Lançamento --- */
R.lancamento=U.lancamento=k=>{const e=S.estrategia||'semente';$('#estrTip').textContent=ESTR_TIPS[e];const ph=PHASES[e];
 const d0=S.dataAbertura?new Date(S.dataAbertura+'T12:00:00'):null;
 const fmt=off=>d0?new Date(d0.getTime()+off*864e5).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}):(off<0?'D'+off:off==0?'D-0':'D+'+off);
 $('#timeline').innerHTML=ph.map(([n,off])=>`<div class="ev"><span class="mono">${fmt(off)}</span><br><b>${n}</b></div>`).join('')+(d0?'':'<p class="hint">Defina a data de abertura para ver as datas reais.</p>');
 if(k&&k!=='estrategia')return;
 $('#phases').innerHTML=ph.map(([n,off,its],i)=>`<div class="phase"><h3><span>${n}</span><span class="mono" data-pc="${i}"></span></h3>${its.map((t,j)=>chkHtml(`${e}_${i}_${j}`,t)).join('')}</div>`).join('');
 bindChk('#phases',pc);pc();};
function pc(){const e=S.estrategia||'semente';PHASES[e].forEach((p,i)=>{const d=p[2].filter((_,j)=>S.chk[`${e}_${i}_${j}`]).length;const el=$(`[data-pc="${i}"]`);if(el)el.textContent=`${d}/${p[2].length}`})}

/* --- Métricas --- */
const mets=()=>METRICAS.filter(m=>!m[6]||m[6].includes(modelo())||m[6].includes(S.tipo)).filter(m=>!(modelo()!='unico'&&m[0]=='cpl'));
R.metricas=()=>{$('#mets').innerHTML=mets().map(([k,n,u,f,ref])=>`<div class="met"><div><b>${n}</b><div class="hint" style="margin:0;font-size:12.5px">${ref}</div></div><input type="number" step="0.1" data-met="${k}" value="${S.met[k]??''}" placeholder="${u}"><span id="ms_${k}"></span></div>`).join('');
 $$('[data-met]').forEach(e=>e.oninput=()=>{S.met[e.dataset.met]=e.value===''?'':+e.value;save();metStat()});metStat()};
function metStat(){const diag=[];mets().forEach(([k,n,u,f,ref,act])=>{const v=S.met[k];let st='n',lb='—';
 if(v!==''&&v!=null){if(k=='cpl'){const mx=S.maxc||0;st=mx?(v<=mx*.8?'g':v<=mx?'y':'r'):'n';lb=mx?(st=='g'?'Ótimo':st=='y'?'No limite':'Acima'):'Ver oferta'}else{st=f(v);lb=st=='g'?'Bom':st=='y'?'Atenção':'Crítico'}}
 $('#ms_'+k).innerHTML=`<span class="pill ${st}">${lb}</span>`;if(st=='r'||st=='y')diag.push([st,n,act])});
 diag.sort((a,b)=>a[0]=='r'?-1:1);
 $('#metDiag').innerHTML=diag.length?diag.map(([s,n,a],i)=>`<div class="mod"><div class="row between"><b>${i+1}. ${n}</b><span class="pill ${s}">${s=='r'?'Prioridade':'Atenção'}</span></div><div style="margin-top:4px">${a}</div></div>`).join('')
  :'<p class="empty">Preencha as métricas. Os pontos críticos aparecem aqui em ordem de prioridade.</p>';}

/* --- Briefing --- */
function brief(){const t=tipo(),a=arq(),f=font();return[
 ['Produto',[S.nome,t&&`Formato: ${t.n} (${MODELO_NOME[modelo()]})`,S.tipoSec.length&&'Esteira: '+S.tipoSec.map(x=>TIPOS.find(y=>y.id==x).n).join(', ')].filter(Boolean).join('\n')],
 ['Nicho',[S.mercado,S.subnicho,S.recorte].filter(Boolean).join(' › ')],['Avatar',[S.avatarCurto,S.avatar].filter(Boolean).join('\n')],
 ['Dor',S.dor],['Desejo',S.desejo],['Objeções',objs().map(o=>'• '+o).join('\n')],['Promessa',promessa()],['Lacuna no mercado',S.lacuna],['Autoridade',S.autoridade],
 ['Validação',Object.keys(S.crit).length?`${S.vscore||0}/100 — ${S.vlabel||''}`:''],
 ['Posicionamento',S.m_dif?plain(posStmt()):''],['Missão · visão · valores',[S.m_missao&&'Missão: '+S.m_missao,S.m_visao&&'Visão: '+S.m_visao,S.m_valores&&'Valores: '+S.m_valores].filter(Boolean).join('\n')],
 ['Slogan',S.m_slogan],['Arquétipo e tom de voz',[a&&`${a.n}: ${a.voz}`,(S.tomSim||[]).map(x=>'Fazer: '+x).join('\n'),(S.tomNao||[]).map(x=>'Evitar: '+x).join('\n')].filter(Boolean).join('\n')],
 ['Identidade visual',`Cores: ${S.pal.map((c,i)=>ROLES[i]+' '+c).join(' · ')}\nFontes: ${f.t} (títulos) + ${f.b} (texto)${S.v_estilo?'\nEstilo de imagem: '+ESTILOS.find(e=>e[0]==S.v_estilo)[1]:''}${S.v_evitar?'\nEvitar: '+S.v_evitar:''}`],
 ['Headlines favoritas',S.favH.map(h=>'• '+h).join('\n')],
 ['Conteúdo',[S.pontoA&&'De: '+S.pontoA,S.pontoB&&'Para: '+S.pontoB,S.mods.map((m,i)=>`${i+1}. ${m.t}`).join('\n')].filter(Boolean).join('\n')],
 ['Oferta',S.stack.map(r=>`• ${r[0]} (${brl(+r[1])})`).join('\n')+`\nPreço: ${brl(+S.preco||0)}${S.parcelas>1?` ou ${S.parcelas}x`:''} · Garantia: ${S.garantia||'—'}${S.urgencia?'\nUrgência: '+S.urgencia:''}`],
 ['Projeção',!S.calc?'':S.calc.tipo=='rec'?`${S.calc.n} assinantes no mês 12 · MRR ${brl(S.calc.mrr)} · receita em 12 meses ${brl(S.calc.rev)} · LTV ${brl(S.calc.ltv)}`:S.calc.tipo=='ht'?`${S.calc.cli.toFixed(1)} clientes/mês · faturamento ${brl(S.calc.fat)} · lucro ${brl(S.calc.liq)}`:`${S.calc.v} vendas · faturamento ${brl(S.calc.fat)} · investimento ${brl(S.calc.inv)} · lucro ${brl(S.calc.liq)}`],
 ['Esteira',S.ladder?S.ladder.map(r=>`${r[0]}: ${r[1]} (${brl(+r[2])})`).join('\n'):''],
 ['Marketing',`Canais: ${S.canais.join(', ')||'—'}\nPilares: ${S.pilares.join(', ')}\nIsca: ${S.isca||'—'}`],
 ['Lançamento',`${{semente:'Semente',interno:'Interno',perpetuo:'Perpétuo',aplicacao:'Funil de aplicação'}[S.estrategia||'semente']}${S.dataAbertura?' · abertura em '+new Date(S.dataAbertura+'T12:00').toLocaleDateString('pt-BR'):''}`]]}
R.briefing=()=>{const f=font(),a=arq();$('#bTitle').textContent=S.nome?'Briefing: '+S.nome:'Briefing do infoproduto';
 $('#bBrand').innerHTML=`<div class="row" style="gap:6px">${S.pal.map((c,i)=>`<div style="text-align:center"><div style="width:64px;height:44px;border-radius:9px;background:${c};border:1px solid var(--line)"></div><span class="mono" style="font-size:9.5px">${ROLES[i]}</span></div>`).join('')}
  <div style="margin-left:12px"><div style="font:700 24px '${f.t}';color:${S.pal[0]}">${esc(S.nome||'Seu infoproduto')}</div><div style="font-family:'${f.b}'" class="hint">${f.t} + ${f.b}${a?' · '+a.n:''}${S.m_slogan?' · '+esc(S.m_slogan):''}</div></div></div>`;
 $('#canvas').innerHTML=brief().map(([t,v])=>`<div class="c"><span class="mono">${t}</span><p>${v?esc(v):'<span class="empty">Não preenchido</span>'}</p></div>`).join('');};
$('#copyBrief').onclick=()=>copy(`# Briefing — ${S.nome||'Infoproduto'}\n\n`+brief().map(([t,v])=>`## ${t}\n${v||'—'}`).join('\n\n'),'Briefing copiado');
$('#copyBrand').onclick=()=>{const a=arq(),f=font();copy(`# Manual de marca — ${S.nome||''}\n\n## Essência\nMissão: ${S.m_missao||'—'}\nVisão: ${S.m_visao||'—'}\nValores: ${S.m_valores||'—'}\nSlogan: ${S.m_slogan||'—'}\nArquétipo: ${a?a.n+' — '+a.voz:'—'}\n\n## Tom de voz\n${(S.tomSim||[]).map(x=>'Fazer: '+x).join('\n')}\n${(S.tomNao||[]).map(x=>'Evitar: '+x).join('\n')}\n\n## Cores\n${S.pal.map((c,i)=>`${ROLES[i]}: ${c}`).join('\n')}\nRegra 60-30-10: fundo 60%, secundária 30%, destaque 10% (botões).\n\n## Tipografia\nTítulos: ${f.t}\nTexto: ${f.b}\n\n## CSS\n${cssVars()}`,'Manual de marca copiado')};

/* ---------- eventos globais ---------- */
$('#baseColor').oninput=e=>setBase(e.target.value);
$('#harm').onchange=e=>{S.harm=e.target.value;S.palTouched=true;genPal();save();drawPal()};
$('#fromArq').onclick=()=>{const a=arq();if(!a){toast('Escolha um arquétipo em Posicionamento e marca');return}setBase(a.cor);toast('Paleta gerada a partir de '+a.n)};
$('#lpInv').onclick=()=>{S.lpInv=!S.lpInv;save();drawPal()};
$('#cFg').oninput=e=>{S.cFg=e.target.value;save();contrastUI()};$('#cBg').oninput=e=>{S.cBg=e.target.value;save();contrastUI()};
$('#cSwap').onclick=()=>{[S.cFg,S.cBg]=[S.cBg,S.cFg];$('#cFg').value=S.cFg;$('#cBg').value=S.cBg;save();contrastUI()};
$('#copyCss').onclick=()=>copy(cssVars(),'Variáveis CSS copiadas');$('#copyHex').onclick=()=>copy(S.pal.map((c,i)=>ROLES[i]+': '+c).join('\n'),'Cores copiadas');
$('#fArq').onchange=()=>R.tipografia();$('#fTxt').oninput=()=>R.tipografia();
$('#prev').onclick=()=>step(-1);$('#next').onclick=()=>step(1);
$('#menuBtn').onclick=()=>$('#side').classList.toggle('open');
$('#btnReset').onclick=()=>$('#mReset').classList.add('on');
$('#rYes').onclick=()=>{try{localStorage.removeItem(KEY)}catch(e){}location.hash='tipos';location.reload()};
$('#btnExport').onclick=()=>{$('#exTxt').value=JSON.stringify(S);$('#mExport').classList.add('on')};
$('#exCopy').onclick=async()=>{try{await navigator.clipboard.writeText($('#exTxt').value);toast('Projeto copiado')}catch(e){$('#exTxt').select();toast('Selecionado: copie com Ctrl+C')}};
$('#exImp').onclick=()=>{try{const d=JSON.parse($('#exTxt').value);if(typeof d!='object')throw 0;S=Object.assign(JSON.parse(JSON.stringify(DEF)),d);save();location.reload()}catch(e){toast('Código inválido')}};
$$('[data-close]').forEach(b=>b.onclick=()=>b.closest('.modal').classList.remove('on'));
window.addEventListener('hashchange',()=>go(location.hash.slice(1)));

/* ---------- init ---------- */
load();buildNav();bind();progress();
go(location.hash.slice(1)||S.cur||'tipos');
