
let IMG=[],ENG=[],order=[0,1,2,3,4];
/* Game languages: [code, native name, English name]. The code doubles as the Wikipedia subdomain. */
const LANGS=[['en','English','English'],['zh','中文','Mandarin Chinese'],['hi','हिन्दी','Hindi'],['es','Español','Spanish'],['ar','العربية','Modern Standard Arabic'],['fr','Français','French'],['bn','বাংলা','Bengali'],['pt','Português','Portuguese'],['id','Bahasa Indonesia','Indonesian'],['ur','اردو','Urdu']];
const LK='haze:lang';let LANG='en';
try{const v=localStorage.getItem(LK);if(LANGS.some(l=>l[0]===v))LANG=v}catch(e){}
document.documentElement.lang=LANG==='zh'?'zh-Hans':LANG;
const TITLES=["Giraffe", "Elephant", "Penguin", "Flamingo", "Octopus", "Zebra", "Kangaroo", "Giant panda", "Tiger", "Owl", "Monarch butterfly", "Jellyfish", "Peacock", "Camel", "Hedgehog", "Lion", "Polar bear", "Koala", "Seahorse", "Red panda", "Chameleon", "Sloth", "Toucan", "Walrus", "Eiffel Tower", "Statue of Liberty", "Big Ben", "Colosseum", "Taj Mahal", "Great Pyramid of Giza", "Golden Gate Bridge", "Sydney Opera House", "Leaning Tower of Pisa", "Mount Fuji", "Niagara Falls", "Pizza", "Sushi", "Croissant", "Pretzel", "Pineapple", "Banana", "Strawberry", "Pumpkin", "Sunflower", "Cactus", "Mushroom", "Tulip", "Windmill", "Lighthouse", "Bicycle", "Steam locomotive", "Hot air balloon", "Submarine", "Helicopter", "Tractor", "Skateboard", "Piano", "Acoustic guitar", "Violin", "Accordion", "Saxophone", "Telescope", "Microscope", "Compass", "Hourglass", "Anchor", "Umbrella", "Teapot", "Rubik's Cube", "Volcano", "Glacier", "Rainbow", "Waterfall", "Dolphin", "Whale shark", "Gorilla", "Cheetah", "Leopard", "Hippopotamus", "Rhinoceros", "Raccoon", "Red fox", "Gray wolf", "Moose", "American bison", "Llama", "Alpaca", "Parrot", "Bald eagle", "Swan", "Pelican", "Hummingbird", "Sea turtle", "Crocodile", "Frog", "Snail", "Honey bee", "Spider", "Crab", "Starfish", "Great white shark", "Clownfish", "Manta ray", "Squirrel", "Rabbit", "Horse", "Duck", "Ostrich", "Meerkat", "Sea otter", "Orangutan", "Chimpanzee", "Dragonfly", "Scorpion", "Lobster", "Puffin", "Pangolin", "Capybara", "Platypus", "Axolotl", "Machu Picchu", "Stonehenge", "Great Wall of China", "Petra", "Angkor Wat", "Burj Khalifa", "Brooklyn Bridge", "Tower Bridge", "Sagrada Família", "Christ the Redeemer (statue)", "Space Needle", "CN Tower", "Empire State Building", "Mount Everest", "Matterhorn", "Grand Canyon", "Uluru", "Hagia Sophia", "Neuschwanstein Castle", "Notre-Dame de Paris", "Acropolis of Athens", "Moai", "Hamburger", "Taco", "Doughnut", "Ice cream", "Watermelon", "Avocado", "Coconut", "Lemon", "Broccoli", "Cupcake", "Waffle", "Pancake", "Baguette", "Ramen", "Burrito", "Popcorn", "Carrot", "Cherry", "Kiwifruit", "Typewriter", "Dice", "Trumpet", "Harp", "Cello", "Flute", "Globe", "Kite", "Chess", "Sailboat", "Gondola", "Ferris wheel", "Roller coaster", "Motorcycle", "Canoe", "Igloo", "Pagoda", "Totem pole", "Lantern", "Candle", "Padlock", "Scissors", "Binoculars", "Sundial", "Kayak", "Snowman", "Trampoline", "Carousel", "Aurora", "Coral reef", "Geyser", "Iceberg", "Cave", "Lightning", "Bamboo", "Fern", "Lavender", "Rose", "Orchid", "Dandelion", "Cherry blossom", "Venus flytrap"];
const EXTRA={"Giant panda": ["panda"], "Monarch butterfly": ["butterfly"], "Acoustic guitar": ["guitar"], "Steam locomotive": ["train", "locomotive"], "Great Pyramid of Giza": ["pyramid", "pyramids"], "Hot air balloon": ["balloon"], "Polar bear": ["bear"], "Sydney Opera House": ["opera house"], "Leaning Tower of Pisa": ["tower of pisa", "leaning tower"], "Statue of Liberty": ["lady liberty"], "Big Ben": ["clock tower"], "Rubik's Cube": ["rubiks cube", "cube"], "Golden Gate Bridge": ["golden gate"], "Mount Fuji": ["fuji"], "Niagara Falls": ["niagara"], "Colosseum": ["coliseum"], "Taj Mahal": ["taj"]};
Object.assign(EXTRA,{"Hamburger":["burger","cheeseburger"],"Doughnut":["donut"],"Ferris wheel":["big wheel"],"Roller coaster":["rollercoaster","coaster"],"Great white shark":["shark"],"Whale shark":["shark"],"Sea turtle":["turtle"],"Bald eagle":["eagle"],"Red fox":["fox"],"Gray wolf":["wolf"],"American bison":["bison","buffalo"],"Sea otter":["otter"],"Honey bee":["bee"],"Mount Everest":["everest"],"Great Wall of China":["great wall","wall of china"],"Neuschwanstein Castle":["castle","neuschwanstein"],"Empire State Building":["empire state"],"Cherry blossom":["sakura"],"Venus flytrap":["flytrap"],"Totem pole":["totem"],"Hagia Sophia":["aya sofia"],"Notre-Dame de Paris":["notre dame"],"Acropolis of Athens":["acropolis"],"Coral reef":["reef"],"Christ the Redeemer (statue)":["christ the redeemer","redeemer"]});
const $=id=>document.getElementById(id);
const UP=/(^|\.)wikimedia\.org$/,WP=/\.wikipedia\.org$/;
const okU=(u,h)=>{try{const x=new URL(u);return x.protocol==='https:'&&h.test(x.hostname)}catch(e){return false}};
const validCard=c=>c&&typeof c.n==='string'&&Array.isArray(c.a)&&okU(c.d,UP)&&okU(c.f,UP)&&okU(c.u,WP);
const wf=u=>{const c=new AbortController(),t=setTimeout(()=>c.abort(),9000);return fetch(u,{credentials:'omit',signal:c.signal}).finally(()=>clearTimeout(t))};
let lastF=null;
const abs=u=>typeof u==='string'&&u.startsWith('//')?'https:'+u:u;
const hostOf=u=>{try{return new URL(u,'https://x.invalid').hostname}catch(e){return'?'}};
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const N=6,S=480,C=S/N,B=20,COST=[0,1,2],ROUNDS=5,TRIES=3;
const DEV=['localhost','127.0.0.1','[::1]'].includes(location.hostname);
let OFF=0;if(DEV)try{OFF=Math.max(-1,Math.min(1,+sessionStorage.getItem('haze:dev:off')||0))}catch(e){}
const t0=new Date(),DN=Math.floor((Date.UTC(t0.getFullYear(),t0.getMonth(),t0.getDate())-Date.UTC(2026,0,1))/864e5)+OFF;

/* Daily selection: a seeded shuffle gives everyone the same five distinct photos each day. */
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
/* Guess recognition: normalise, tolerate typos, match aliases, then compare categories. */
const STOP={en:'a an the of some my its it is this that',es:'el la los las un una unos unas de del',fr:'le la les un une des du de l d',pt:'o a os as um uma uns umas de do da dos das'};
const STOPS=Object.fromEntries(Object.entries(STOP).map(([k,v])=>[k,new Set(v.split(' '))]));
const norm=s=>{
  let o=s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f\u200c\u200d\u0640]/g,'');
  if(LANG==='ar'||LANG==='ur')o=o.replace(/[\u064b-\u065f\u0670]/g,'').replace(/[\u0622\u0623\u0625\u0671]/g,'\u0627').replace(/[\u064a\u0649\u06cc]/g,'\u06cc').replace(/[\u0643\u06a9]/g,'\u06a9').replace(/[\u0629\u06c1\u06c2\u06c3]/g,'\u0647');
  const st=STOPS[LANG];
  return o.replace(/[^\p{L}\p{M}\p{N}\s]/gu,' ').split(/\s+/).filter(w=>w&&!(st&&st.has(w))).map(w=>LANG==='ar'&&w.length>4&&w.startsWith('\u0627\u0644')?w.slice(2):w).join(' ');
};
const sing=w=>{if(!/^(en|es|fr|pt)$/.test(LANG)||w.length<=3||!/s$/.test(w)||/ss$/.test(w))return w;return LANG==='en'?w.replace(/ies$/,'y').replace(/s$/,''):w.replace(/s$/,'')};
const key=s=>norm(s).split(' ').filter(Boolean).map(sing).join(' ');
function lev(a,b){const m=a.length,n=b.length;let p=Array.from({length:n+1},(_,j)=>j);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
const tol=l=>l<5?0:l<8?1:2;
function judge(g,it){
  const k=key(g);if(!k)return'miss';
  const ws=k.split(' ');
  for(const a of it.a){const ak=key(a);
    if(lev(k,ak)<=tol(ak.length))return'hit';
    if(!ak.includes(' ')&&ak.length>=3&&ws.some(w=>lev(w,ak)<=tol(ak.length)))return'hit'}
  return'miss';
}


/* Live photos: titles come from a date-seeded shuffle, images and aliases are pulled from Wikipedia at load time. */
const clean=s=>s.replace(/\s*[(（].*?[)）]\s*/g,' ').trim();
async function card(t){try{return await cardRest(t)}catch(e){try{return await cardApi(t)}catch(e2){throw new Error('REST: '+e.message+' | API: '+e2.message)}}}
async function cardApi(t){
  const r=await wf('https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages%7Cdescription%7Cextracts%7Cinfo&inprop=url&piprop=thumbnail&pithumbsize=500&exintro=1&explaintext=1&exsentences=2&titles='+encodeURIComponent(t));
  if(!r.ok)throw new Error('API HTTP '+r.status);
  const p=Object.values((await r.json()).query.pages)[0],th=abs(p&&p.thumbnail&&p.thumbnail.source);
  if(!p||p.missing!==undefined)throw new Error('missing page '+t);if(!th)throw new Error('no thumbnail '+t);if(!okU(th,UP))throw new Error('thumb host '+hostOf(th));if(!okU(p.fullurl,WP))throw new Error('page host '+hostOf(p.fullurl));
  return{n:clean(p.title),q:p.title,a:[clean(p.title),...(EXTRA[p.title]||[])],d:th,f:th,u:p.fullurl,ds:p.description||'',ex:((p.extract||'').replace(/\s*\([^)]*\)/g,'').split(/(?<=[.!?])\s/)[0]||'').slice(0,220)};
}
async function cardRest(t){
  const r=await wf('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(t.replace(/ /g,'_')));
  if(!r.ok)throw new Error('HTTP '+r.status);const j=await r.json();
  const th=abs(j.thumbnail&&j.thumbnail.source),pg=abs(j.content_urls&&j.content_urls.desktop&&j.content_urls.desktop.page);
  if(j.type==='disambiguation')throw new Error('disambiguation '+t);if(!th)throw new Error('no thumbnail '+t);if(!okU(th,UP))throw new Error('thumb host '+hostOf(th));if(!okU(pg,WP))throw new Error('page host '+hostOf(pg));
  return{n:clean(j.title),q:j.title,a:[clean(j.title),...(EXTRA[j.title]||[])],d:th.replace(/\/\d+px-/,'/500px-'),f:th,u:j.content_urls.desktop.page,ds:j.description||'',ex:((j.extract||'').replace(/\s*\([^)]*\)/g,'').split(/(?<=[.!?])\s/)[0]||'').slice(0,220)};
}
async function aliases(c){
  try{const r=await wf('https://en.wikipedia.org/w/api.php?action=query&prop=redirects&rllimit=40&format=json&origin=*&titles='+encodeURIComponent(c.q));
    const p=Object.values((await r.json()).query.pages)[0];
    (p.redirects||[]).forEach(x=>{const a=clean(x.title);if(a&&!/[:\d]/.test(a))c.a.push(a)})}catch(e){}
  return c;
}
/* Titles rotate through the whole pool, five a day. Each cycle keeps the previous cycle's order with a random shuffle of up to a few days, so a title only comes back after roughly (pool size / 5) days, about 6 weeks with this pool. Titles that fail to load are replaced from the unused tail. */
const _ord=new Map();
function titleOrder(ep){
  if(_ord.has(ep))return _ord.get(ep);
  const per=ROUNDS,used=Math.floor(TITLES.length/per)*per,r=rng(ep*2654435761+97);let o;
  if(ep<=0){o=TITLES.slice();for(let i=o.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[o[i],o[j]]=[o[j],o[i]]}}
  else{const W=20;o=titleOrder(ep-1).map((t,i)=>[(i<used?i:r()*W)+(r()*2-1)*W,t]).sort((x,y)=>x[0]-y[0]).map(x=>x[1])}
  _ord.set(ep,o);return o;
}
function dailyTitles(dn=DN){
  const per=ROUNDS,cyc=Math.floor(TITLES.length/per),ep=Math.floor(dn/cyc),di=((dn%cyc)+cyc)%cyc,a=titleOrder(ep);
  return[...a.slice(di*per,di*per+per),...a.slice(cyc*per),...a.slice(di*per+per,cyc*per)];
}
async function pick(){
  const ck='haze:v5:pick:'+DN;
  try{const s=JSON.parse(localStorage.getItem(ck));if(Array.isArray(s)&&s.length===ROUNDS&&s.every(validCard))return s}catch(e){}
  const list=dailyTitles(),ok=[],errs=[];let i=0;
  while(ok.length<ROUNDS&&i<Math.min(list.length,ROUNDS+8)){
    const batch=list.slice(i,i+ROUNDS-ok.length);i+=batch.length;
    (await Promise.allSettled(batch.map(card))).forEach(x=>{if(x.status==='fulfilled'){if(!ok.some(o=>o.q===x.value.q))ok.push(x.value)}else errs.push(x.reason&&x.reason.message||String(x.reason))});
  }
  if(errs.length)console.warn('Blurred: photo fetch failed',errs[0]);
  if(ok.length<ROUNDS)throw new Error(ok.length+' of '+ROUNDS+' loaded; '+[...new Set(errs)].slice(0,2).join(' // '));
  await Promise.all(ok.map(aliases));
  try{localStorage.setItem(ck,JSON.stringify(ok))}catch(e){}
  return ok;
}

/* Localised cards: photos stay the same; the name, aliases, description and article link come from the chosen language's Wikipedia. */
const wfj=async u=>{const r=await wf(u);if(!r.ok)throw new Error('HTTP '+r.status);return r.json()};
const firstSent=t=>(t||'').replace(/\s*[(（][^)）]*[)）]/g,'').split(/(?<=[。！？])|(?<=[.!?।۔؟])\s+/)[0].trim().slice(0,220);
async function loc(c,L){
  const j1=await wfj('https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&redirects=1&prop=langlinks&lllang='+L+'&titles='+encodeURIComponent(c.q));
  const p1=j1.query.pages[0],ll=p1&&p1.langlinks&&p1.langlinks[0];
  if(!ll||!ll.title)return{...c,l:L};
  const j2=await wfj('https://'+L+'.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&origin=*&redirects=1&prop=description%7Cextracts%7Cinfo%7Credirects&inprop=url&exintro=1&explaintext=1&exsentences=2&rdlimit=40&titles='+encodeURIComponent(ll.title));
  const p=j2.query.pages[0];
  if(!p||p.missing||!okU(p.fullurl,WP))return{...c,l:L};
  const a=[clean(p.title),clean(ll.title)];
  (p.redirects||[]).forEach(x=>{const t=clean(x.title);if(t&&!/[:\d]/.test(t))a.push(t)});
  return{...c,n:clean(p.title),a:[...new Set(a)],u:p.fullurl,ds:p.description||'',ex:firstSent(p.extract),l:L};
}
async function forLang(list,L){
  if(L==='en')return list;
  const ck='haze:loc:'+L+':'+DN;
  try{const s=JSON.parse(localStorage.getItem(ck));if(Array.isArray(s)&&s.length===list.length&&s.every((c,i)=>validCard(c)&&c.q===list[i].q&&c.l===L))return s}catch(e){}
  const out=await Promise.all(list.map(c=>loc(c,L).catch(e=>{console.warn('Blurred: no '+L+' text for '+c.q,e);return c})));
  if(out.every(c=>c.l===L))try{localStorage.setItem(ck,JSON.stringify(out))}catch(e){}
  return out;
}

/* State */
const SK=(OFF?'haze:dev:':'haze:v3:')+DN;
let st;
try{st=JSON.parse(localStorage.getItem(SK))}catch(e){}
if(!st||!Array.isArray(st.r)||st.r.length!==ROUNDS||!Number.isInteger(st.i)||st.i<0||st.i>ROUNDS||!st.r.every(r=>r&&Array.isArray(r.lv)&&r.lv.length===N*N&&r.lv.every(l=>l===0||l===1||l===2)&&Number.isInteger(r.wr)&&r.wr>=0))st={i:0,r:Array.from({length:ROUNDS},()=>({lv:Array(N*N).fill(0),wr:0,done:false,win:false}))};
const save=()=>{try{localStorage.setItem(SK,JSON.stringify(st))}catch(e){}};
const R=()=>st.r[st.i];
const spent=r=>r.lv.reduce((a,l)=>a+COST[l],0);
const pts=r=>Math.max(0,B-spent(r)-3*r.wr);
const won=r=>r.win?pts(r):0;

/* UI bits */
$('ticks').innerHTML='<i></i>'.repeat(B);
$('chips').innerHTML='<i></i>'.repeat(ROUNDS);
function tween(el,a,b,ms,fmt=v=>Math.round(v)){if(RM||a===b){el.textContent=fmt(b);return}const s=performance.now();(function f(t){const p=Math.min(1,(t-s)/ms),e=1-Math.pow(1-p,3);el.textContent=fmt(a+(b-a)*e);if(p<1)requestAnimationFrame(f)})(s)}
function say(m,bad){const e=$('msg');e.classList.add('swap');setTimeout(()=>{e.textContent=m;e.classList.toggle('bad',!!bad);e.classList.remove('swap')},RM?0:180)}
let shownPts=B;
function ui(){
  const r=R(),p=pts(r);
  [...$('ticks').children].forEach((e,k)=>{e.style.transitionDelay=(Math.abs(k-p)*6)+'ms';e.classList.toggle('on',k<p)});
  tween($('pts'),shownPts,p,500);shownPts=p;
  [...$('chips').children].forEach((e,k)=>{const q=st.r[k];e.className=k===st.i&&!q.done?'cur':q.done?(q.win?'win':'lose'):''});
  $('gf').classList.toggle('on',!r.done);$('np').classList.toggle('on',r.done);
  $('next').textContent=st.i>=ROUNDS-1?'See results':'Next photo';
  renderSet();renderHint();
}

/* Canvas renderer: every tile eases between blur levels; hover and taps get small tweens. */
const cv=$('c'),x=cv.getContext('2d');
let src=null,cur=new Float32Array(N*N),hv=new Float32Array(N*N),pl=new Float32Array(N*N),hov=-1,gridA=1,revT=0,raf=0,last=0;
const mk=n=>{const c=document.createElement('canvas');c.width=c.height=n;return c};
function soft(img,r){let c=mk(r);c.getContext('2d').drawImage(img,0,0,r,r);for(const s of [r*3,r*8,S]){const n=mk(Math.min(s,S)),q=n.getContext('2d');q.imageSmoothingQuality='high';q.drawImage(c,0,0,n.width,n.height);c=n}return c}
function kick(){if(!raf){last=performance.now();raf=requestAnimationFrame(frame)}}
function frame(t){
  raf=0;const r=R();if(!r)return;const dt=Math.min(.05,(t-last)/1000);last=t;let busy=false;
  if(r.done)revT+=dt;
  for(let k=0;k<N*N;k++){
    const tg=r.done?2:r.lv[k],dl=r.done?((k%N)+Math.floor(k/N))*.05:0;
    if(!r.done||revT>dl){const d=tg-cur[k];if(Math.abs(d)>.004){cur[k]+=RM?d:d*(1-Math.exp(-dt*(r.done?4:11)));busy=true}else cur[k]=tg}else busy=true;
    const ht=k===hov&&!r.done?1:0;hv[k]+=RM?ht-hv[k]:(ht-hv[k])*(1-Math.exp(-dt*14));if(Math.abs(ht-hv[k])>.01)busy=true;
    if(pl[k]>0){pl[k]=Math.max(0,pl[k]-dt*3.2);busy=true}
  }
  const gt=r.done?0:1;gridA+=RM?gt-gridA:(gt-gridA)*(1-Math.exp(-dt*5));if(Math.abs(gt-gridA)>.01)busy=true;
  draw();if(busy)raf=requestAnimationFrame(frame);
}
function draw(){
  if(!src)return;
  x.drawImage(src[0],0,0);
  for(let k=0;k<N*N;k++){
    const c=cur[k];if(c<.004)continue;
    const lo=Math.floor(c),hi=Math.min(2,lo+1),a=c-lo,cx=(k%N)*C,cy=Math.floor(k/N)*C;
    if(lo>0)x.drawImage(src[lo],cx,cy,C,C,cx,cy,C,C);
    if(a>.004){x.globalAlpha=a;x.drawImage(src[hi],cx,cy,C,C,cx,cy,C,C);x.globalAlpha=1}
  }
  if(gridA>.01){x.strokeStyle='rgba(255,255,255,'+(.38*gridA)+')';x.lineWidth=1;x.beginPath();for(let k=1;k<N;k++){x.moveTo(k*C,0);x.lineTo(k*C,S);x.moveTo(0,k*C);x.lineTo(S,k*C)}x.stroke()}
  for(let k=0;k<N*N;k++){const cx=(k%N)*C,cy=Math.floor(k/N)*C;
    if(hv[k]>.01){x.strokeStyle='rgba(255,255,255,'+(.8*hv[k])+')';x.lineWidth=2;x.strokeRect(cx+2,cy+2,C-4,C-4)}
    if(pl[k]>0){x.fillStyle='rgba(255,255,255,'+(.35*pl[k])+')';x.fillRect(cx,cy,C,C)}}
}
function cellAt(e){const b=cv.getBoundingClientRect(),gx=Math.floor((e.clientX-b.left)/b.width*N),gy=Math.floor((e.clientY-b.top)/b.height*N);return gx<0||gy<0||gx>=N||gy>=N?-1:gy*N+gx}
function tap(k){
  const r=R();if(!r||!src||r.done||k<0)return;const l=r.lv[k];
  if(l>=2){SFX.deny();say('That tile is already sharp.');return}
  if(COST[l+1]-COST[l]>pts(r)){SFX.deny();say('Not enough points for that.',true);return}
  r.lv[k]=l+1;pl[k]=1;l?SFX.sharp():SFX.soft();save();ui();kick();
}
cv.addEventListener('pointerdown',e=>tap(cellAt(e)));
cv.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){hov=cellAt(e);kick()}});
cv.addEventListener('pointerleave',()=>{hov=-1;kick()});
cv.addEventListener('keydown',e=>{
  const m={ArrowLeft:-1,ArrowRight:1,ArrowUp:-N,ArrowDown:N}[e.key];
  if(m){e.preventDefault();hov=hov<0?0:Math.max(0,Math.min(N*N-1,hov+m));kick()}
  else if((e.key==='Enter'||e.key===' ')&&hov>=0){e.preventDefault();tap(hov)}
  else if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const r=R();if(r&&!r.done)$('in').focus()}
});
cv.addEventListener('focus',()=>{if(hov<0)hov=0;kick()});
cv.addEventListener('blur',()=>{hov=-1;kick()});

/* Rounds */
function load(){
  const r=R(),it=IMG[order[st.i]];cv.classList.remove('in');src=null;shownPts=shownPts;$('sk').classList.remove('off');$('credit').classList.remove('on');
  $('in').value='';
  const im=new Image();
  im.onload=()=>{const f=mk(S);const m=Math.min(im.naturalWidth,im.naturalHeight);f.getContext('2d').drawImage(im,(im.naturalWidth-m)/2,(im.naturalHeight-m)/2,m,m,0,0,S,S);src=[soft(f,5),soft(f,18),f];
    cur.fill(0);hv.fill(0);pl.fill(0);gridA=1;revT=0;
    if(r.done){r.lv.forEach((_,k)=>cur[k]=2);revT=9;gridA=0}else r.lv.forEach((l,k)=>cur[k]=l);
    draw();requestAnimationFrame(()=>{cv.classList.add('in');$('sk').classList.add('off')});kick()};
  im.onerror=()=>{if(it.f&&im.src!==it.f){im.src=it.f}else say('This photo didn’t load. Refresh to try again.',true)};
  im.src=it.d;
  ui();if(r.done)showCredit();
  if(!r.done&&FINE)setTimeout(()=>$('in').focus({preventScroll:true}),400);
  say(r.done?(r.win?`${it.n}. ${pts(r)} points.`:`It was ${it.n}.`):`Photo ${st.i+1} of ${ROUNDS}. Tap a tile to begin.`);
}
$('gf').addEventListener('submit',e=>{
  e.preventDefault();const r=R(),it=IMG[order[st.i]],g=$('in').value;
  if(!IMG.length||r.done||!g.trim())return;
  const j=judge(g,it);
  if(j==='hit'){r.win=r.done=true;SFX.win(pts(r));say(`Yes, ${it.n}. ${pts(r)} points.`)}
  else{
    r.wr++;$('in').value='';
    const f=$('gf');f.classList.remove('shake');void f.offsetWidth;f.classList.add('shake');
    if(r.wr>=TRIES){r.done=true;SFX.lose();say(`Out of guesses. It was ${it.n}.`,true)}
    else{SFX.wrong();say('No match. −3 points.',true)}
  }
  save();ui();kick();if(r.done){showCredit();focusNext()}
});
let skT=0;
$('skip').onclick=()=>{
  const r=R(),it=IMG[order[st.i]],b=$('skip');if(!r||!it||r.done)return;
  if(!skT){b.textContent='Sure?';skT=setTimeout(()=>{b.textContent='Skip';skT=0},3000);return}
  clearTimeout(skT);skT=0;b.textContent='Skip';
  r.done=true;r.win=false;SFX.lose();say(`Skipped. It was ${it.n}.`,true);save();ui();kick();showCredit();focusNext();
};
$('next').onclick=()=>{
  SFX.next();st.i++;save();
  if(st.i>=ROUNDS){summary(true)}
  else{const gm=$('game');gm.classList.add('gone');setTimeout(()=>{load();gm.classList.remove('gone')},RM?0:350)}
};

/* Summary */
function summary(anim){
  const gm=$('game'),sm=$('sum');
  const total=st.r.reduce((a,r)=>a+won(r),0);recordDay(total);renderStats();renderSet();
  $('rows').innerHTML=st.r.map((r,k)=>{const it=IMG[order[k]];return `<li><img alt="" src="${esc(it.d)}"><div><a href="${esc(it.u)}" target="_blank" rel="noopener noreferrer">${esc(it.n)}</a><div class="bar"><b data-w="${won(r)/B*100}"></b></div></div><em>${won(r)}</em></li>`}).join('');
  const bar=r=>{const n=Math.round(won(r)/2);return n?'🟦'.repeat(n)+'⬛'.repeat(10-n):'🟥'.repeat(10)};
  $('share').textContent=`Blurred No. ${DN+1}  ${total}/100\n`+st.r.map(r=>bar(r)+' '+won(r)).join('\n')+(/^https?:$/.test(location.protocol)?'\n'+location.origin+location.pathname:'');
  [...$('chips').children].forEach((e,k)=>{const q=st.r[k];e.className=q.win?'win':'lose'});
  const show=()=>{gm.hidden=true;sm.hidden=false;void sm.offsetWidth;sm.classList.remove('gone');
    tween($('tn'),0,total,1100);$('cmp').innerHTML=cmpHTML(total,'s',1);animCmp(total);SFX.total(total);liveSync(total);
    [...document.querySelectorAll('#rows li')].forEach((li,k)=>setTimeout(()=>{SFX.row(won(st.r[k]));li.classList.add('show');li.querySelector('b').style.width=li.querySelector('b').dataset.w+'%'},RM?0:250+k*120));
    clock()};
  if(anim){gm.classList.add('gone');setTimeout(show,RM?0:350)}else show();
}
$('cp').onclick=async()=>{const b=$('cp');try{await navigator.clipboard.writeText($('share').textContent);b.textContent='Copied'}catch(e){const r=document.createRange();r.selectNodeContents($('share'));const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected, copy it'}setTimeout(()=>b.textContent='Copy result',2000)};
function clock(){if(!OFF&&dayNow()!==DN){location.reload();return}const d=new Date(),nx=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1),s=Math.max(0,Math.floor((nx-d)/1000)),p=v=>String(v).padStart(2,'0');$('cd').textContent=`${p(Math.floor(s/3600))}:${p(Math.floor(s%3600/60))}:${p(s%60)}`;setTimeout(clock,1000)}


/* Side panels: today's set, focus costs, and a personal record that is kept in this browser. */
const FLAME='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>';
const STK='haze:stats';
let days={};try{days=JSON.parse(localStorage.getItem(STK))||{}}catch(e){}
if(!days||typeof days!=='object'||Array.isArray(days))days={};
for(const k of Object.keys(days)){const v=days[k];if(!/^\d+$/.test(k)||!Number.isFinite(v)||v<0||v>100)delete days[k];else days[k]=Math.round(v)}
function recordDay(total){if(OFF)return;days[DN]=total;try{localStorage.setItem(STK,JSON.stringify(days))}catch(e){}}
function statsHTML(){
  const ks=Object.keys(days).map(Number).sort((a,b)=>a-b);
  let run=0,best=0,prev=null,sum=0,top=0;const bk=[0,0,0,0,0];
  for(const k of ks){run=prev!==null&&k===prev+1?run+1:1;best=Math.max(best,run);prev=k;const v=days[k];sum+=v;top=Math.max(top,v);bk[Math.min(4,Math.floor(v/20))]++}
  const cur=ks.length&&prev>=DN-1?run:0,mx=Math.max(1,...bk),tb=days[DN]!==undefined?Math.min(4,Math.floor(days[DN]/20)):-1;
  const lab=['0–19','20–39','40–59','60–79','80–100'];
  return `<div class="streak">${FLAME}<b>${cur}</b><span>day streak</span></div>
  <p class="sub2">${ks.length?`Best streak ${best}. Played ${ks.length} ${ks.length===1?'day':'days'}. Average ${Math.round(sum/ks.length)} of 100, top ${top}.`:'Finish today’s five photos to start your record.'}</p>
  ${ks.length?`<h2>How you compare</h2>${cmpHTML(Math.round(sum/ks.length),'r',0)}`:''}
  <h2>Daily scores</h2>
  <div class="dist">${bk.map((n,i)=>`<div class="${i===tb?'me':''}"><span>${lab[i]}</span><div class="bar"><b data-w="${n/mx*100}"></b></div><i>${n}</i></div>`).join('')}</div>`;
}
const legHTML=()=>`<ul class="leg"><li><i class="sw s0"></i><span>Blurred</span><b>free</b></li><li><i class="sw s1"></i><span>Soft</span><b>1</b></li><li><i class="sw s2"></i><span>Sharp</span><b>2</b></li><li><i class="sw x"></i><span>Wrong guess</span><b>−3</b></li></ul>`;
const helpHTML=()=>`<p>Tap tiles to bring the photo into focus. You have 20 points a round and three guesses. Name it with as many points left as you can. At 10 points or fewer you get a hint, and at 3 or fewer you get more.</p>${legHTML()}`;
function bars(root){requestAnimationFrame(()=>requestAnimationFrame(()=>root.querySelectorAll('.bar b[data-w]').forEach(b=>b.style.width=b.dataset.w+'%')))}
function renderStats(){document.querySelectorAll('.statbox').forEach(e=>{e.innerHTML=statsHTML();bars(e)})}
$('leg').innerHTML=legHTML();
$('set').innerHTML=Array.from({length:ROUNDS},(_,k)=>`<li><span class="th"><span class="n">${k+1}</span><img alt=""></span><span>Photo ${k+1}</span><b></b></li>`).join('');
function renderSet(){
  [...$('set').children].forEach((li,k)=>{
    const q=st.r[k],it=IMG[order[k]],im=li.querySelector('img');
    li.className=q.done?(q.win?'win':'lose'):(k===st.i?'cur':'');
    li.querySelector('b').textContent=q.done?(q.win?won(q):'✗'):'';
    if(q.done&&it&&im.getAttribute('src')!==it.d)im.src=it.d;
    im.classList.toggle('on',!!q.done);
  });
}
$('date').textContent=new Date(Date.now()+OFF*864e5).toLocaleDateString(undefined,{weekday:'long',day:'numeric',month:'long'})+', No. '+(DN+1)+(OFF?(OFF<0?' (preview: yesterday)':' (preview: tomorrow)'):'');

/* Theme: system follows the OS, light and dark are pinned and remembered. */
const TK='haze:theme',root=document.documentElement;
function theme(m,keep){
  if(m!=='light'&&m!=='dark')m='system';
  if(m==='system')delete root.dataset.theme;else root.dataset.theme=m;
  document.querySelectorAll('.seg button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.t===m)));
  if(keep)try{localStorage.setItem(TK,m)}catch(e){}
}
document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>theme(b.dataset.t,1));
try{theme(localStorage.getItem(TK))}catch(e){theme()}

/* Shape art. Solid shapes get a gradient mask plus a speckle layer, so they dissolve into grain. */
const SH={
 arch:'<path d="M0 90a45 45 0 0 1 90 0v90H0z"/>',
 half:'<path d="M0 70a70 70 0 0 1 140 0z"/>',
 quarter:'<path d="M120 0A120 120 0 0 0 0 120h120z"/>',
 dot:'<circle cx="45" cy="45" r="45"/>',
 pill:'<rect width="64" height="150" rx="32"/>',
 spark:'<path d="M60 0Q68 52 120 60Q68 68 60 120Q52 68 0 60Q52 52 60 0z"/>',
 wave:'<path class="o" stroke-width="18" d="M0 24q24-40 48 0t48 0 48 0"/>',
 sun:'<g class="o" stroke-width="30" stroke-dasharray="7 11.85"><circle cx="75" cy="75" r="60"/></g><circle cx="75" cy="75" r="46"/>',
 rings:'<g class="o" stroke-width="2.4">'+[66,50,34,18].map(r=>`<circle cx="70" cy="70" r="${r}"/>`).join('')+'</g>',
 ovl:'<g class="o" stroke-width="2.2">'+[0,32,64].map(d=>`<circle cx="${50+d}" cy="${50+d*.6}" r="50"/>`).join('')+'</g>',
 grid:[0,1,2].flatMap(i=>[0,1,2].map(j=>`<circle cx="${22+i*48}" cy="${22+j*48}" r="22"/>`)).join(''),
 flower:[0,60,120,180,240,300].map(a=>`<ellipse cx="60" cy="26" rx="21" ry="28" transform="rotate(${a} 60 60)"/>`).join('')
};
const SZ={arch:[90,180],half:[140,70],quarter:[120,120],dot:[90,90],pill:[64,150],spark:[120,120],wave:[144,48],sun:[150,150],rings:[140,140],ovl:[164,128],grid:[142,142],flower:[120,120]};
const LITE=matchMedia('(max-width:979px),(pointer:coarse)').matches;
const place=(L,W,H)=>L.map(([k,x,y,s,c,g,m,d,w])=>{const[a,b]=SZ[k];return `<svg class="sh ${m}" viewBox="0 0 ${a} ${b}" aria-hidden="true" data-s="left:${x/W*100}%;top:${y/H*100}%;width:${a*s/W*100}%;--d:${d}s;--w:${w}s;--c:var(--${c});fill:var(--c)">${g?(LITE?`<g mask="url(#mk)">${SH[k]}</g>`:`<g mask="url(#mk)">${SH[k]}</g><g filter="url(#gr)">${SH[k]}</g>`):SH[k]}</svg>`}).join('');
const ART_A=[['arch',250,0,1.1,'t1',1,'d',16,0],['rings',40,60,1,'t4',0,'d',20,-6],['spark',120,250,1,'t2',1,'p',11,-3]];
const ART_B=[['sun',30,40,1,'t3',1,'r',140,0],['ovl',200,230,1,'t4',0,'d',18,-4],['dot',60,300,1,'t1',1,'d',14,-8]];
document.body.insertAdjacentHTML('afterbegin',`<svg class="defs" width="0" height="0" aria-hidden="true"><defs><filter id="gr" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -11 5.9" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter><linearGradient id="fd" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="1"><stop offset=".1" stop-color="#fff"/><stop offset=".9" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="mk" maskUnits="objectBoundingBox" x="-1" y="-1" width="3" height="3" maskContentUnits="objectBoundingBox"><rect x="-1" y="-1" width="3" height="3" fill="url(#fd)"/></mask></defs></svg><div class="art a" aria-hidden="true">${place(ART_A,380,470)}</div><div class="art b" aria-hidden="true">${place(ART_B,380,440)}</div>`);
document.querySelectorAll('[data-s]').forEach(e=>{e.style.cssText=e.dataset.s});

/* Hints: 10 points or fewer shows a description and letter count; 3 or fewer adds the first letter and a sentence. The answer is masked out of the text. */
const esc=t=>t.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function mask(t,al){
  const ws=new Set();al.forEach(a=>{ws.add(a);a.split(/\s+/).forEach(w=>{if(w.length>=3)ws.add(w)})});
  let o=t;[...ws].sort((x,y)=>y.length-x.length).forEach(w=>{const e=w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');o=o.replace(LANG==='zh'?new RegExp(e,'gi'):new RegExp('(?<![\\p{L}\\p{M}\\p{N}])'+e+'(?:s|es)?(?![\\p{L}\\p{M}\\p{N}])','giu'),'____')});
  return o;
}
const seg=w=>typeof Intl!=='undefined'&&Intl.Segmenter?[...new Intl.Segmenter(LANG,{granularity:'grapheme'}).segment(w)].map(g=>g.segment):[...w];
const isL=g=>/\p{L}/u.test(g);
const hintTier=r=>{if(r.done)return 0;const p=pts(r);return p<=3?2:p<=10?1:0};
let hkey='';
function renderHint(){
  const r=R(),it=IMG[order[st.i]],t=r&&it?hintTier(r):0,k=st.i+':'+t,e=$('hint');
  if(k===hkey)return;hkey=k;
  if(!t){e.className='hint';e.innerHTML='';return}
  const al=[it.n,...(LANG==='en'?EXTRA[it.q]||[]:[])],ws=it.n.split(/\s+/),ln=ws.map(w=>seg(w).filter(isL).length),h=[];
  if(it.ds)h.push(`<p>${esc(mask(it.ds,al))}</p>`);
  h.push(`<p>${ws.length>1?ws.length+' words: '+ln.join(' + '):ln[0]} letters</p>`);
  if(t>=2){
    h.push(`<p class="lt">${esc(ws.map(w=>seg(w).map((c,i)=>i===0?c.toUpperCase():isL(c)?'_':c).join(' ')).join('   '))}</p>`);
    if(it.ex)h.push(`<p>${esc(mask(it.ex,al))}</p>`);
  }
  e.className='hint t'+t;e.innerHTML=h.join('');SFX.hint();
}

/* Copyright and credits */
const OWNER='Blurred';
const creditHTML=()=>`<div class="cr"><p>Copyright © ${new Date().getFullYear()} ${OWNER}.</p><p>Photos and answers: Wikipedia and Wikimedia Commons. Each photo keeps its own license, shown under the picture after a round.</p><p>Icons: Lucide, ISC license. Type: Fraunces and Instrument Sans, SIL Open Font License.</p></div>`;

/* Developer module: self-tests, environment readout and reset tools. */
function tests(){
  const g=(a,b,x=[])=>judge(a,{a:[b,...x]}),rs=n=>{const f=rng(n);return[f(),f(),f()].join()};
  const T=[
    ['exact match',()=>g('giraffe','Giraffe')==='hit'],
    ['plural and article',()=>g('the giraffes','Giraffe')==='hit'],
    ['one typo is forgiven',()=>g('girafe','Giraffe')==='hit'],
    ['alias match',()=>g('panda','Giant panda',['panda'])==='hit'],
    ['wrong answer misses',()=>g('zebra','Giraffe')==='miss'],
    ['empty guess misses',()=>g('  ','Giraffe')==='miss'],
    ['short words get no typo slack',()=>g('cat','Cap')==='miss'],
    ['hint hides the answer',()=>!/giraffe/i.test(mask('A tall giraffe, the Giraffes of Africa',['Giraffe']))],
    ['hints: none at 11, one at 10, two at 3',()=>{const t=n=>hintTier({lv:Array.from({length:N*N},(_,i)=>i<n?1:0),wr:0,done:false});return t(9)===0&&t(10)===1&&t(16)===1&&t(17)===2}],
    ['daily shuffle is stable',()=>rs(7)===rs(7)&&rs(7)!==rs(8)],
    ['fresh round is worth 20',()=>pts({lv:Array(N*N).fill(0),wr:0})===20],
    ['wrong guess costs 3',()=>pts({lv:Array(N*N).fill(0),wr:2})===14],
    ['points stop at 0',()=>pts({lv:Array(N*N).fill(2),wr:3})===0],
    ['today’s five are distinct',()=>!IMG.length||(IMG.length===ROUNDS&&new Set(IMG.map(i=>i.n)).size===ROUNDS)],
    ['Indonesian, Hindi, Chinese and Arabic guesses match',()=>{const k=LANG;try{LANG='id';const a=g('gajah','Gajah')==='hit';LANG='hi';const b=g('हाथी','हाथी')==='hit';LANG='zh';const c=g('长颈鹿','长颈鹿')==='hit';LANG='ar';const d=g('الزَرافة','زرافة')==='hit';return a&&b&&c&&d}finally{LANG=k}}],
    ['score curve is sane',()=>pct(0)<5&&pct(100)>95&&pct(55)===50]
  ];
  return T.map(([n,f])=>{let ok=false;try{ok=!!f()}catch(e){}return[n,ok]});
}
const store=()=>{try{localStorage.setItem('haze:t','1');localStorage.removeItem('haze:t');return true}catch(e){return false}};
function devHTML(){
  const rs=tests(),ok=rs.filter(r=>r[1]).length,th=root.dataset.theme||'system';
  const env=[['Day no.',(DN+1)+(OFF?' (preview)':'')],['Set',esc(IMG.map(i=>i.n).join(', '))||'loading'],['Theme',th+(th==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?' (dark)':' (light)'):'')],['Photos loaded',IMG.length+'/'+ROUNDS],['Round',Math.min(st.i+1,ROUNDS)],['Reduced motion',RM?'on':'off'],['Storage',store()?'available':'blocked']];
  return `<dl class="env">${env.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
  <p class="pv"><span>Preview day</span><span class="seg days" role="group" aria-label="Preview day">${[[-1,'Yesterday'],[0,'Today'],[1,'Tomorrow']].map(([o,l])=>`<button type="button" data-a="day" data-o="${o}" aria-pressed="${o===OFF}">${l}</button>`).join('')}</span></p>
  <b>${ok}/${rs.length} tests passing</b>
  <ul class="dev">${rs.map(([n,p])=>`<li class="${p?'ok':'no'}"><span>${p?'✓':'✗'}</span><span>${n}</span></li>`).join('')}</ul>
  <div class="acts"><button class="quiet" data-a="rerun" type="button">Run again</button><button class="quiet" data-a="peek" type="button">Peek answer</button><button class="quiet" data-a="reset" type="button">Reset today</button><button class="quiet" data-a="wipe" type="button">Clear all data</button><button class="quiet" data-a="lock" type="button">Lock</button></div><output id="pk"></output>`;
}
$('db').addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
  if(a==='rerun')$('db').innerHTML=devHTML();
  else if(a==='day'){try{+b.dataset.o?sessionStorage.setItem('haze:dev:off',b.dataset.o):sessionStorage.removeItem('haze:dev:off')}catch(x){}location.reload()}
  else if(a==='lock'){devOK=false;try{sessionStorage.removeItem('haze:dev:ok')}catch(x){}$('db').innerHTML=gateHTML()}
  else if(a==='peek'){const it=IMG[order[st.i]];$('pk').textContent=it?it.n:'No photo in play.'}
  else{try{
    if(a==='reset'){localStorage.removeItem(SK);if(!OFF){delete days[DN];localStorage.setItem(STK,JSON.stringify(days))}}
    else Object.keys(localStorage).filter(k=>k.startsWith('haze:')&&k!==TK&&k!==SNK&&k!==LK&&k!=='haze:cid').forEach(k=>localStorage.removeItem(k));
  }catch(x){}location.reload()}
});
let devOK=false;try{devOK=sessionStorage.getItem('haze:dev:ok')==='1'}catch(e){}
const PW={s:'c4814c5082508a69a7b718bb94ce1655',i:150000,h:'8044a95bd58b505771453c5533d47e84bb46ae45842c4d53c59ecc828a74cc43'};let fails=0,lockUntil=0;
const gateHTML=()=>`<form id="dg" autocomplete="off"><div class="field"><input id="pw" type="password" placeholder="Password" aria-label="Developer password" autocomplete="off"></div><button type="submit">Unlock</button></form><p class="gerr" id="pe" aria-live="polite"></p>`;
const devGate=()=>devOK?devHTML():gateHTML();
async function sha(t){const hx=PW.s.match(/../g).map(h=>parseInt(h,16)),k=await crypto.subtle.importKey('raw',new TextEncoder().encode(t),'PBKDF2',false,['deriveBits']),b=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new Uint8Array(hx),iterations:PW.i,hash:'SHA-256'},k,256);return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
$('db').addEventListener('submit',async e=>{
  if(e.target.id!=='dg')return;e.preventDefault();
  const v=$('pw').value;if(!v)return;
  if(Date.now()<lockUntil){$('pe').textContent='Too many tries. Wait 30 seconds.';return}
  let ok=false;
  try{ok=(await sha(v))===PW.h}catch(x){$('pe').textContent='Needs a secure page (https or localhost).';return}
  if(ok){devOK=true;try{sessionStorage.setItem('haze:dev:ok','1')}catch(x){}$('db').innerHTML=devHTML()}
  else{fails++;if(fails>=5){lockUntil=Date.now()+30000;fails=0}$('pe').textContent='Wrong password.';$('pw').value='';const f=$('dg');f.classList.remove('shake');void f.offsetWidth;f.classList.add('shake')}
});
const langHTML=()=>`<ul class="lang">${LANGS.map(([c,n,e])=>`<li><button type="button" data-lang="${c}" lang="${c}" aria-pressed="${c===LANG}"><span>${n}</span><small>${e}</small></button></li>`).join('')}</ul>`;
let lseq=0;
async function setLang(c){
  if(!LANGS.some(l=>l[0]===c))return;
  if(c===LANG){closeDlg();return}
  LANG=c;try{localStorage.setItem(LK,c)}catch(e){}
  document.documentElement.lang=c==='zh'?'zh-Hans':c;closeDlg();
  if(!ENG.length)return;
  const my=++lseq,nm=LANGS.find(l=>l[0]===c)[1];say('…');
  const l=await forLang(ENG,c);if(my!==lseq)return;
  IMG=l;hkey='';
  if(!$('sum').hidden){$('rows').querySelectorAll('li').forEach((li,k)=>{const a=li.querySelector('a'),it=IMG[order[k]];a.textContent=it.n;a.href=it.u})}
  else{ui();const r=R(),it=IMG[order[st.i]];say(r.done?(r.win?`${it.n}. ${pts(r)} points.`:`It was ${it.n}.`):`${nm}. Photo ${st.i+1} of ${ROUNDS}.`)}
}
$('db').addEventListener('click',e=>{const b=e.target.closest('[data-lang]');if(b)setLang(b.dataset.lang)});
const DL={l:['Language',langHTML],s:['Your record',statsHTML],h:['How Blurred works',helpHTML],c:['Copyright and credits',creditHTML],d:['Developer tests',devGate]};

/* Dialogs for narrow screens, with a fade and lift. */
const dlg=$('dlg');
function openDlg(k){lastF=document.activeElement;const[t,f]=DL[k];$('dt').textContent=t;$('db').innerHTML=f();dlg.showModal();requestAnimationFrame(()=>{dlg.classList.add('open');bars($('db'))})}
function closeDlg(){dlg.classList.remove('open');setTimeout(()=>{dlg.close();if(lastF&&lastF.focus)lastF.focus()},RM?0:250)}
$('bl').onclick=()=>openDlg('l');$('bs').onclick=()=>openDlg('s');$('bh').onclick=()=>openDlg('h');$('dx').onclick=closeDlg;$('bc').onclick=()=>openDlg('c');
{let n=0,t=0,buf='';
 document.querySelector('h1').addEventListener('click',()=>{const w=Date.now();n=w-t<1500?n+1:1;t=w;if(n>=5){n=0;if(DEV&&!dlg.open)openDlg('d')}});
 addEventListener('keydown',e=>{if(/^(INPUT|TEXTAREA)$/.test(e.target.tagName)||e.key.length!==1)return;buf=(buf+e.key.toLowerCase()).slice(-7);if(DEV&&buf==='devmode'&&!dlg.open){buf='';openDlg('d')}});}
dlg.addEventListener('cancel',e=>{e.preventDefault();closeDlg()});
dlg.addEventListener('click',e=>{if(e.target===dlg)closeDlg()});

/* Photo credit, fetched from Wikimedia's image metadata once a round is over. */
async function credit(it){
  if(it.cr)return it.cr;
  try{
    const m=it.f.match(/\/wikipedia\/([a-z-]+)\/thumb\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)\//);if(!m)throw 0;
    const host=m[1]==='commons'?'commons.wikimedia.org':m[1]+'.wikipedia.org';
    const r=await wf('https://'+host+'/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&iiextmetadatafilter=Artist|LicenseShortName&format=json&formatversion=2&origin=*&titles='+encodeURIComponent('File:'+decodeURIComponent(m[2])));
    const x=(await r.json()).query.pages[0].imageinfo[0].extmetadata;
    let a=x.Artist?new DOMParser().parseFromString(x.Artist.value,'text/html').body.textContent.replace(/\s+/g,' ').trim():'';
    if(a.length>48)a=a.slice(0,45)+'…';
    it.cr='Photo by '+(a||'a Wikipedia contributor')+(x.LicenseShortName?', '+x.LicenseShortName.value:'');
  }catch(e){it.cr='Photo from Wikipedia'}
  return it.cr;
}
async function showCredit(){
  const it=IMG[order[st.i]],t=await credit(it);
  if(R().done&&IMG[order[st.i]]===it){$('credit').textContent=t;$('credit').classList.add('on')}
}

const dayNow=()=>{const d=new Date();return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(2026,0,1))/864e5)};
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!OFF&&dayNow()!==DN)location.reload()});
/* Sound: every effect is synthesized with WebAudio, so there are no audio files. Starts after the first tap or key press. */
const SNK='haze:sfx';let sfxOn=true,gest=false,ac=null,mg=null;try{sfxOn=localStorage.getItem(SNK)!=='0'}catch(e){}
function actx(){if(!sfxOn||!gest)return null;try{if(!ac){const A=window.AudioContext||window.webkitAudioContext;if(!A)return null;ac=new A();mg=ac.createGain();mg.gain.value=.5;const cp=ac.createDynamicsCompressor();mg.connect(cp);cp.connect(ac.destination)}if(ac.state==='suspended')ac.resume()}catch(e){return null}return ac}
['pointerdown','pointerup','keydown','click'].forEach(ev=>addEventListener(ev,()=>{gest=true;actx()},{capture:true}));
const nt=n=>261.63*Math.pow(2,n/12);
function tone(f,t,d,o={}){const a=actx();if(!a)return;const{type='sine',v=.2,to=0}=o,s=a.currentTime+t,os=a.createOscillator(),g=a.createGain();os.type=type;os.frequency.setValueAtTime(f,s);if(to)os.frequency.exponentialRampToValueAtTime(to,s+d);g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(v,s+.008);g.gain.exponentialRampToValueAtTime(.0001,s+d);os.connect(g);g.connect(mg);os.start(s);os.stop(s+d+.03)}
function noise(t,d,o={}){const a=actx();if(!a)return;const{f=1800,to=0,v=.1,q=.8}=o,s=a.currentTime+t,n=Math.floor(a.sampleRate*d),b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);for(let i=0;i<n;i++)c[i]=Math.random()*2-1;const sr=a.createBufferSource(),fl=a.createBiquadFilter(),g=a.createGain();sr.buffer=b;fl.type='bandpass';fl.Q.value=q;fl.frequency.setValueAtTime(f,s);if(to)fl.frequency.exponentialRampToValueAtTime(to,s+d);g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(v,s+d*.3);g.gain.exponentialRampToValueAtTime(.0001,s+d);sr.connect(fl);fl.connect(g);g.connect(mg);sr.start(s)}
const SFX={
  soft(){tone(nt(7),0,.12,{type:'triangle',v:.16});noise(0,.08,{f:2500,v:.05})},
  sharp(){tone(nt(12),0,.14,{type:'triangle',v:.16});tone(nt(19),.04,.2,{v:.09})},
  deny(){tone(120,0,.14,{type:'square',v:.06,to:80})},
  wrong(){tone(180,0,.24,{type:'sawtooth',v:.08,to:90});tone(171,0,.24,{type:'sawtooth',v:.06,to:85})},
  win(p){[0,4,7,12,16].slice(0,3+(p>=10)+(p>=16)).forEach((n,i)=>tone(nt(n),i*.075,.38,{type:'triangle',v:.15}))},
  lose(){tone(nt(4),0,.3,{type:'triangle',v:.14});tone(nt(-1),.18,.5,{type:'triangle',v:.14})},
  next(){noise(0,.25,{f:400,to:3000,v:.07})},
  hint(){tone(nt(14),.1,.09,{v:.08});tone(nt(19),.17,.12,{v:.08})},
  row(w){tone(nt(5+w/2),0,.09,{type:'triangle',v:.09})},
  total(s){noise(.35,1.1,{f:300,to:2400,v:.05,q:2});[0,4,7,12,16].slice(0,2+Math.ceil(s/25)).forEach((n,i)=>tone(nt(n),1.2+i*.09,.5,{type:'triangle',v:.14}))}
};
const SPK='<path d="M11 4.7a.7.7 0 0 0-1.2-.5L6.4 7.6A1.4 1.4 0 0 1 5.4 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.4a1.4 1.4 0 0 1 1 .4l3.4 3.4a.7.7 0 0 0 1.2-.5z"/>';
function sndUI(){const b=$('snd');b.setAttribute('aria-pressed',String(sfxOn));b.setAttribute('aria-label',sfxOn?'Sound effects on':'Sound effects off');b.querySelector('svg').innerHTML=SPK+(sfxOn?'<path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.4 18.4a9 9 0 0 0 0-12.8"/>':'<path d="m22 9-6 6"/><path d="m16 9 6 6"/>')}
$('snd').onclick=()=>{sfxOn=!sfxOn;try{localStorage.setItem(SNK,sfxOn?'1':'0')}catch(e){}sndUI();if(sfxOn){gest=true;SFX.soft()}};
sndUI();

/* Score comparison. Talks to the same-origin /api functions (see api/) to compare with real players, live. When the API is missing or has too few players, it falls back to a modeled curve. The dashed line and dots are your own past plays. */
const API=/^https?:$/.test(location.protocol)?'/api':'';
const MU=55,SD=18;
let LIVE=null,liveErr=false,liveTm=0,CID;
try{CID=localStorage.getItem('haze:cid')||(crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)+Date.now());localStorage.setItem('haze:cid',CID)}catch(e){CID='x'+Math.random()}
const erf=z=>{const t=1/(1+.3275911*Math.abs(z)),y=1-((((1.061405429*t-1.453152027)*t+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-z*z);return z<0?-y:y};
const isLive=()=>!!LIVE&&LIVE.n>=5;
function pct(v){
  let p;
  if(isLive()){const b=Math.min(20,Math.floor(v/5));let lo=0;for(let i=0;i<b;i++)lo+=LIVE.bins[i];p=Math.round(100*(lo+LIVE.bins[b]/2)/LIVE.n)}
  else p=Math.round(50*(1+erf((v-MU)/(SD*Math.SQRT2))));
  return Math.max(1,Math.min(99,p));
}
function dens(){
  const f=[];
  if(isLive()){for(let s=0;s<=100;s+=2){let a=0;for(let i=0;i<21;i++){const z=(s-Math.min(100,i*5+2.5))/6;a+=LIVE.bins[i]*Math.exp(-z*z/2)}f.push(a)}const m=Math.max(...f)||1;return f.map(a=>a/m)}
  for(let s=0;s<=100;s+=2)f.push(Math.exp(-((s-MU)**2)/(2*SD*SD)));return f;
}
const pastV=()=>Object.keys(days).map(Number).filter(k=>k!==DN).map(k=>days[k]);
function cmpHTML(v,u,anim,still){
  const X=s=>20+s*4,df=dens(),Y=s=>{const i=s/2,a=Math.floor(i),b=Math.min(50,Math.ceil(i));return 118-92*(df[a]+(df[b]-df[a])*(i-a))};
  let d='';df.forEach((h,i)=>d+=(i?'L':'M')+X(i*2)+' '+(118-92*h).toFixed(1));
  const area=d+'L420 118L20 118Z',p=pct(v),mx=X(v),my=Y(v),lv=isLive();
  const pv=anim?pastV():Object.keys(days).map(k=>days[k]);
  const dots=pv.map(q=>`<circle class="pd" cx="${X(Math.max(0,Math.min(100,q)))}" cy="118" r="3"/>`).join('');
  const tk=[0,25,50,75,100].map(s=>`<text x="${X(s)}" y="140" text-anchor="middle">${s}</text>`).join('');
  const an=v>85?'end':v<15?'start':'middle',lx=v>85?mx+6:v<15?mx-6:mx;
  const avg=pv.length?pv.reduce((a,b)=>a+b,0)/pv.length:0;
  const av=anim&&pv.length?`<g class="av"><line x1="${X(avg)}" x2="${X(avg)}" y1="14" y2="118"/><text x="${X(avg)}" y="9" text-anchor="middle">PAST AVG</text></g>`:'';
  const who=lv?'today’s players':'typical scores',cap=(anim?'Better than ':'Your average beats ')+p+'% of '+who;
  const note=lv?`<span class="lv"></span>Live · ${LIVE.n} players today`:'Modeled curve, not live players.'+(API?(liveErr?' Live data unavailable.':LIVE?` Only ${LIVE.n} so far.`:' Connecting…'):'');
  const q=anim&&pv.length?Math.round(100*(pv.filter(a=>a<v).length+pv.filter(a=>a===v).length/2)/pv.length):0;
  const past=anim&&pv.length?`<small>Past plays: ${pv.length} ${pv.length===1?'day':'days'}, average ${Math.round(avg)}. Today beats ${q}% of them.</small>`:pv.length?'<small>Dots are your past days.</small>':'';
  return `<div class="cmp${anim&&!still?'':' go'}"><svg viewBox="0 0 440 148" role="img" aria-label="${cap}"><defs><clipPath id="cy${u}"><rect class="cyr" x="0" y="0" width="${anim&&!still?0:mx}" height="148"/></clipPath></defs><path class="fl" d="${area}"/><path class="you" d="${area}" clip-path="url(#cy${u})"/><path class="ln" d="${d}"/><line class="ax" x1="20" x2="420" y1="118" y2="118"/>${dots}${av}${tk}<g class="mk"><line x1="${mx}" x2="${mx}" y1="${my}" y2="118"/><circle cx="${mx}" cy="${my}" r="4.5"/><text x="${lx}" y="${my-10}" text-anchor="${an}">${anim?'YOU':'AVG'}</text></g></svg><p>${cap}</p><small>${note}</small>${past}</div>`;
}
function animCmp(v){
  const c=document.querySelector('#cmp .cmp'),r=c&&c.querySelector('.cyr'),X=20+v*4;if(!r)return;
  if(RM){r.setAttribute('width',X);c.classList.add('go');return}
  const s=performance.now()+350;(function f(t){const q=Math.max(0,Math.min(1,(t-s)/1100)),e=1-Math.pow(1-q,3);r.setAttribute('width',X*e);if(q<1)requestAnimationFrame(f);else c.classList.add('go')})(performance.now());
}
async function getDist(){
  try{const r=await fetch(API+'/dist?day='+DN,{credentials:'omit',signal:AbortSignal.timeout(9000)});if(!r.ok)throw 0;const j=await r.json();
    if(!Array.isArray(j.bins)||j.bins.length!==21||!j.bins.every(n=>Number.isInteger(n)&&n>=0))throw 0;
    LIVE={bins:j.bins,n:j.bins.reduce((a,b)=>a+b,0)};liveErr=false}catch(e){liveErr=true}
}
function redraw(total){if($('sum').hidden)return;$('cmp').innerHTML=cmpHTML(total,'s',1,1);renderStats()}
async function liveSync(total){
  if(!API||OFF)return;
  const t0=performance.now(),pk='haze:posted:'+DN;
  try{if(!localStorage.getItem(pk)){const r=await fetch(API+'/score',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({day:DN,cid:CID,score:total}),credentials:'omit',signal:AbortSignal.timeout(9000)});if(r.ok)localStorage.setItem(pk,'1')}}catch(e){}
  await getDist();
  setTimeout(()=>redraw(total),Math.max(0,1700-(performance.now()-t0)));
  clearInterval(liveTm);liveTm=setInterval(async()=>{if(document.hidden)return;await getDist();redraw(total)},15000);
}

/* Housekeeping: drop per-day keys older than a week so storage doesn't grow forever. */
function prune(){try{Object.keys(localStorage).forEach(k=>{const m=k.match(/^haze:(?:v5:pick|v3|dev|posted|loc:[a-z]+):(\d+)$/);if(m&&+m[1]<DN-7)localStorage.removeItem(k)})}catch(e){}}
/* Focus: the answer box on devices with a mouse, the Next button once a round ends (also closes the phone keyboard). */
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const focusNext=()=>setTimeout(()=>{const b=$('next');if(b.offsetParent)b.focus({preventScroll:true})},60);

/* Start */
prune();renderSet();renderStats();
async function boot(){
  $('retry').hidden=true;say('Finding today’s photos…');
  try{ENG=await pick();IMG=await forLang(ENG,LANG)}catch(e){console.warn('Blurred: load failed',e);const d=e instanceof Error?e.name+': '+e.message:'photo data incomplete';say('Couldn’t load photos ('+d+'). If you’re viewing this in a preview, open it in a regular browser.',true);$('retry').hidden=false;return}
  if(st.i>=ROUNDS)summary(false);else load();
}
$('retry').onclick=boot;boot();
