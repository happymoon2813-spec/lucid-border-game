const characters=[
 {id:1,name:'ルシア',rarity:'R',emoji:'🗡️',power:10,desc:'夢の中で意識を保つ少女。'},
 {id:2,name:'月白の巫女',rarity:'SR',emoji:'🌙',power:24,desc:'月の光で悪夢を浄化する守護者。'},
 {id:3,name:'黒羽の使者',rarity:'SR',emoji:'🪽',power:26,desc:'境界から現れる無口な案内人。'},
 {id:4,name:'緋色の夢姫',rarity:'SSR',emoji:'💗',power:55,desc:'悪夢を力に変える夢の姫。'},
 {id:5,name:'星屑の黒猫',rarity:'R',emoji:'🐈‍⬛',power:12,desc:'夢の中で恐怖を盗む小さな猫。'},
 {id:6,name:'終夜の女王',rarity:'SSR',emoji:'👑',power:62,desc:'深夜と記憶の海を支配する存在。'}
];
const enemies=[
 {name:'影の獣',emoji:'🌑',hp:100},
 {name:'不安の虫群',emoji:'🕷️',hp:160},
 {name:'忘れられた自分',emoji:'🪞',hp:240},
 {name:'境界の悪夢',emoji:'🩸',hp:360}
];
let state={gems:300,memories:0,owned:[1],enemyIndex:0,enemyHp:100};
const $=id=>document.getElementById(id);
function save(){localStorage.setItem('lucid-border-v2-jp',JSON.stringify(state));}
function load(){const s=localStorage.getItem('lucid-border-v2-jp'); if(s) state=JSON.parse(s);}
function power(){return state.owned.reduce((sum,id)=>sum+characters.find(c=>c.id===id).power,0)}
function enemy(){return enemies[state.enemyIndex%enemies.length]}
function update(){
 $('gemText').textContent=state.gems; 
 $('memoryText').textContent=state.memories; 
 $('powerText').textContent=power();
 const e=enemy(); 
 $('enemyName').textContent=e.name; 
 $('enemyEmoji').textContent=e.emoji; 
 $('enemyHpText').textContent=`HP ${Math.max(0,Math.ceil(state.enemyHp))} / ${e.hp}`; 
 $('enemyHpFill').style.width=`${Math.max(0,state.enemyHp/e.hp*100)}%`;
 renderTeam(); 
 renderCodex(); 
 save();
}
function attack(mult=1){
 state.enemyHp-=power()*mult;
 if(state.enemyHp<=0){
   const reward=20+state.enemyIndex*5;
   state.memories+=1;
   state.gems+=reward;
   state.enemyIndex++;
   state.enemyHp=enemy().hp;
   $('battleLog').textContent=`悪夢を撃破！記憶 +1、夢晶 +${reward} を獲得しました。新しい悪夢が現れました。`;
 } else {
   $('battleLog').textContent=`チームは ${power()*mult} ダメージを与えました。悪夢が弱っていきます……`;
 }
 update();
}
function renderTeam(){
 $('teamList').innerHTML=state.owned.map(id=>{
   const c=characters.find(x=>x.id===id);
   return `<div class="unit"><div><strong>${c.emoji} ${c.name}</strong><br><span class="rarity-${c.rarity}">${c.rarity}</span>｜戦力 ${c.power}</div><small>${c.desc}</small></div>`;
 }).join('');
}
function renderCodex(){
 $('codexGrid').innerHTML=characters.map(c=>{
   const own=state.owned.includes(c.id);
   return `<div class="codex-item ${own?'':'locked'}"><div class="codex-emoji">${own?c.emoji:'❔'}</div><strong>${own?c.name:'未解放'}</strong><p class="rarity-${c.rarity}">${c.rarity}</p><small>${own?c.desc:'夢の霧に隠されています。'}</small></div>`;
 }).join('');
}
function gacha(){
 if(state.gems<100){
   $('gachaResult').textContent='夢晶が足りません。戦闘で夢晶を集めましょう。';
   return;
 }
 state.gems-=100;
 const roll=Math.random(); 
 let pool=roll<.08?characters.filter(c=>c.rarity==='SSR'):roll<.38?characters.filter(c=>c.rarity==='SR'):characters.filter(c=>c.rarity==='R');
 const c=pool[Math.floor(Math.random()*pool.length)];
 if(!state.owned.includes(c.id)){
   state.owned.push(c.id);
   $('gachaResult').innerHTML=`召喚成功！<br><span class="rarity-${c.rarity}">${c.rarity}</span> ${c.emoji} <b>${c.name}</b><br>${c.desc}`;
 } else {
   state.memories+=2;
   $('gachaResult').innerHTML=`重複キャラクター：${c.emoji} <b>${c.name}</b><br>記憶 +2 に変換されました。`;
 }
 update();
}
load(); 
state.enemyHp=state.enemyHp||enemy().hp; 
update();
$('startBtn').onclick=()=>{
 $('startScreen').classList.remove('active');
 $('gameScreen').classList.add('active')
};
$('manualAttack').onclick=()=>attack(2);
$('gachaBtn').onclick=gacha;
document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll('.tab,.page').forEach(x=>x.classList.remove('active'));
 btn.classList.add('active');
 $(btn.dataset.page).classList.add('active')
});
setInterval(()=>{
 if($('gameScreen').classList.contains('active'))attack(1)
},1000);
