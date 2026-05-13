const characters=[
 {id:1,name:'露希亞',rarity:'R',emoji:'🗡️',power:10,desc:'能在夢中保持清醒的少女。'},
 {id:2,name:'月白巫女',rarity:'SR',emoji:'🌙',power:24,desc:'以月光淨化夢魘的守護者。'},
 {id:3,name:'黑羽使者',rarity:'SR',emoji:'🪽',power:26,desc:'來自邊界的沉默引路人。'},
 {id:4,name:'緋色夢姬',rarity:'SSR',emoji:'💗',power:55,desc:'能讓惡夢反轉成力量的夢境公主。'},
 {id:5,name:'星塵貓',rarity:'R',emoji:'🐈‍⬛',power:12,desc:'會在夢裡偷走恐懼的小貓。'},
 {id:6,name:'終夜女王',rarity:'SSR',emoji:'👑',power:62,desc:'掌管深夜與記憶深海的存在。'}
];
const enemies=[
 {name:'影之獸',emoji:'🌑',hp:100},{name:'焦慮蟲群',emoji:'🕷️',hp:160},{name:'遺忘的自己',emoji:'🪞',hp:240},{name:'邊界夢魘',emoji:'🩸',hp:360}
];
let state={gems:300,memories:0,owned:[1],enemyIndex:0,enemyHp:100};
const $=id=>document.getElementById(id);
function save(){localStorage.setItem('lucid-border-v2',JSON.stringify(state));}
function load(){const s=localStorage.getItem('lucid-border-v2'); if(s) state=JSON.parse(s);}
function power(){return state.owned.reduce((sum,id)=>sum+characters.find(c=>c.id===id).power,0)}
function enemy(){return enemies[state.enemyIndex%enemies.length]}
function update(){
 $('gemText').textContent=state.gems; $('memoryText').textContent=state.memories; $('powerText').textContent=power();
 const e=enemy(); $('enemyName').textContent=e.name; $('enemyEmoji').textContent=e.emoji; $('enemyHpText').textContent=`HP ${Math.max(0,Math.ceil(state.enemyHp))} / ${e.hp}`; $('enemyHpFill').style.width=`${Math.max(0,state.enemyHp/e.hp*100)}%`;
 renderTeam(); renderCodex(); save();
}
function attack(mult=1){
 state.enemyHp-=power()*mult;
 if(state.enemyHp<=0){const reward=20+state.enemyIndex*5;state.memories+=1;state.gems+=reward;state.enemyIndex++;state.enemyHp=enemy().hp;$('battleLog').textContent=`夢魘被擊破！獲得記憶碎片 +1、夢晶 +${reward}。新的夢魘出現了。`;}
 else {$('battleLog').textContent=`隊伍造成 ${power()*mult} 傷害。夢魘正在削弱……`;}
 update();
}
function renderTeam(){
 $('teamList').innerHTML=state.owned.map(id=>{const c=characters.find(x=>x.id===id);return `<div class="unit"><div><strong>${c.emoji} ${c.name}</strong><br><span class="rarity-${c.rarity}">${c.rarity}</span>｜戰力 ${c.power}</div><small>${c.desc}</small></div>`}).join('');
}
function renderCodex(){
 $('codexGrid').innerHTML=characters.map(c=>{const own=state.owned.includes(c.id);return `<div class="codex-item ${own?'':'locked'}"><div class="codex-emoji">${own?c.emoji:'❔'}</div><strong>${own?c.name:'未解鎖'}</strong><p class="rarity-${c.rarity}">${c.rarity}</p><small>${own?c.desc:'被夢霧遮住的角色。'}</small></div>`}).join('');
}
function gacha(){
 if(state.gems<100){$('gachaResult').textContent='夢晶不足。去戰鬥累積夢晶吧。';return;}
 state.gems-=100;
 const roll=Math.random(); let pool=roll<.08?characters.filter(c=>c.rarity==='SSR'):roll<.38?characters.filter(c=>c.rarity==='SR'):characters.filter(c=>c.rarity==='R');
 const c=pool[Math.floor(Math.random()*pool.length)];
 if(!state.owned.includes(c.id)){state.owned.push(c.id);$('gachaResult').innerHTML=`召喚成功！<br><span class="rarity-${c.rarity}">${c.rarity}</span> ${c.emoji} <b>${c.name}</b><br>${c.desc}`;}
 else {state.memories+=2;$('gachaResult').innerHTML=`抽到重複角色：${c.emoji} <b>${c.name}</b><br>轉換為記憶碎片 +2。`;}
 update();
}
load(); state.enemyHp=state.enemyHp||enemy().hp; update();
$('startBtn').onclick=()=>{$('startScreen').classList.remove('active');$('gameScreen').classList.add('active')};
$('manualAttack').onclick=()=>attack(2);
$('gachaBtn').onclick=gacha;
document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.tab,.page').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$(btn.dataset.page).classList.add('active')});
setInterval(()=>{if($('gameScreen').classList.contains('active'))attack(1)},1000);
