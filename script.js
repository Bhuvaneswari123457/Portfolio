const $=s=>document.querySelector(s);
let xp=0,seen=new Set();
function addXp(n){xp+=n;$('#xp').textContent=xp+' XP';$('#lvl').textContent='Level '+(Math.floor(xp/120)+1)}
let tt;function toast(m){snd('ui');const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)}
function prog(){const h=document.documentElement,p=scrollY/Math.max(1,h.scrollHeight-innerHeight);$('#bar').style.width=p*100+'%';$('#plane').style.left=p*100+'%'}
addEventListener('scroll',prog,{passive:true});prog();
/* unlock sections */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!seen.has(e.target)){seen.add(e.target);if(seen.size>1){addXp(40);toast('Unlocked: '+e.target.dataset.q+' +40 XP')}else addXp(0)}}),{threshold:.35});
document.querySelectorAll('section').forEach(s=>io.observe(s));
/* count up */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,n=+el.dataset.n,sfx=n>=400?'+':'';let i=0;const f=()=>{i+=1/40;const v=Math.round(n*Math.min(i,1));el.textContent=v.toLocaleString()+(i>=1?sfx:'');if(i<1)requestAnimationFrame(f)};f()}));
document.querySelectorAll('[data-n]').forEach(e=>co.observe(e));
/* skills */
const SK={'Languages':['Java','Python','C++','SQL','JavaScript','Bash'],'Backend':['Spring Boot','Kafka','Hibernate/JPA','REST APIs','Microservices','Flask'],'Frontend':['Angular','HTML/CSS','Bootstrap','Streamlit'],'Cloud and DevOps':['GCP','Docker','Kubernetes','ArgoCD','Jenkins'],'AI and ML':['PyTorch','TensorFlow','Scikit-Learn','LLM fine-tuning','RAG','LangChain','MCP'],'Tools':['JUnit','SonarQube','Postman','Git','Jira']};
let total=0,got=0;const tree=$('#tree');
for(const c in SK){const h=document.createElement('div');h.className='cat';h.textContent=c;const w=document.createElement('div');w.className='chips';SK[c].forEach(s=>{total++;const b=document.createElement('button');b.className='chip';b.textContent=s;b.onclick=()=>{if(b.classList.contains('got'))return;b.classList.add('got');got++;addXp(10);cnt();snd('ok');if(got===total)toast('Skill tree complete! Bonus +100 XP'),addXp(100)};w.appendChild(b)});tree.append(h,w)}
function cnt(){$('#skcount').textContent='Collected '+got+' of '+total}cnt();
/* theme */
$('#theme').onclick=()=>{const r=document.documentElement,d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark';$('#theme').textContent=d?'🌙':'☀️'};
document.querySelectorAll('.subj').forEach(d=>{let t=0;d.addEventListener('toggle',()=>{if(d.open&&!t){t=1;addXp(20);snd('ok');toast('Subject unlocked +20 XP')}})});
let AC,mute=false;
function snd(k){if(mute)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),f={ok:[660,880],bad:[220,110],star:[880,1320],end:[420,140],ui:[520,700]}[k],t=AC.currentTime;o.type=k==='bad'?'sawtooth':'sine';o.frequency.setValueAtTime(f[0],t);o.frequency.linearRampToValueAtTime(f[1],t+.12);g.gain.setValueAtTime(.1,t);g.gain.exponentialRampToValueAtTime(.001,t+.18);o.connect(g);g.connect(AC.destination);o.start();o.stop(t+.2)}catch(e){}}
$('#snd').onclick=()=>{mute=!mute;$('#snd').textContent=mute?'🔇':'🔊'};
const P={ftp:{t:'FTP logistics bots',d:'A conversational logistics platform where five decoupled bots handle Driver, Shipper and Receiver workflows. I was lead developer and architect, and sole technical owner of the MVP.',s:['5-bot architecture','Real-time state','State-gated routing','Concurrency-safe schemas','Interactive simulation UI'],l:'https://bhuvaneswari123457.github.io/FTP-REPO/',lt:'Open live demo'},sra:{t:'Smart Research Assistant',d:'A Chromium extension with a Java Spring Boot backend. Clip web content, categorize it and get a short summary of any highlighted text within seconds.',s:['Java Spring Boot','JavaScript ES6','HTML5/CSS3','REST APIs','NLP summarization'],l:'https://github.com/Bhuvaneswari123457/Smart-Research-Agent',lt:'Open source code'},ecg:{t:'ECG Signal Classification',d:'Binary and 5-class classification of ECG signals on PTB-XL (21,000+ records), evaluated lead by lead across all 12 leads. 68.8% binary accuracy and 71.22% multiclass accuracy after tuning.',s:['TensorFlow/Keras','Scikit-learn','1D/2D CNN','Random Forest','CWT and TQWT wavelets'],l:'https://github.com/Bhuvaneswari123457/Ecg-5-class-classification',lt:'Open source code'}};
document.querySelectorAll('.pj').forEach(b=>b.onclick=()=>{const p=P[b.dataset.p];snd('ui');$('#dt').textContent=p.t;$('#dd').textContent=p.d;$('#ds').innerHTML=p.s.map(x=>'<span class="chip got">'+x+'</span>').join('');const a=$('#dl');a.style.display=p.l?'':'none';a.href=p.l||'#';a.textContent=p.lt||'Open';$('#dlg').showModal()});
$('#dx').onclick=()=>$('#dlg').close();$('#dlg').addEventListener('click',e=>{if(e.target.id==='dlg')e.target.close()});

document.querySelectorAll('#cv,#cv2').forEach(a=>a.addEventListener('click',()=>{addXp(20);toast('Resume downloaded +20 XP')}));
