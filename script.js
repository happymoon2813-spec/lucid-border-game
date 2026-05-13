const state = {
  hp: 100,
  memory: 0,
  enemyHp: 60,
};

const scenes = {
  start: {
    visual: "moon",
    text: "你在夢裡醒來。眼前是一條發光的邊界線，遠處有人在呼喚你的名字。這裡是明晰夢與惡夢交界的地方。",
    choices: [
      ["靠近邊界線", "border"],
      ["先觀察四周", "look"]
    ]
  },
  look: {
    visual: "forest",
    text: "你發現地上有一枚紫色碎片。它像是某段被遺忘的記憶，握住它時，心臟微微發熱。",
    action: () => gainMemory("第一枚記憶碎片：『我不是只能逃跑。』"),
    choices: [["帶著碎片前進", "border"]]
  },
  border: {
    visual: "forest",
    text: "邊界線後方浮現一隻夢魘。它沒有臉，只用你的聲音低語：『你真的能做到嗎？』",
    choices: [
      ["正面迎戰", "battle"],
      ["用記憶碎片抵抗", "memoryGuard"]
    ]
  },
  memoryGuard: {
    visual: "enemy",
    text: "你握緊記憶碎片，夢魘的聲音變小了。它的形體出現裂痕。",
    action: () => damageEnemy(25, "記憶讓夢魘動搖了。"),
    choices: [["繼續戰鬥", "battle"]]
  },
  battle: {
    visual: "enemy",
    text: "夢魘向你撲來。你必須在夢境崩壞前擊敗它。",
    choices: [
      ["光之攻擊", "attack"],
      ["防禦並冷靜呼吸", "defend"],
      ["尋找第二枚記憶", "searchMemory"]
    ]
  },
  attack: {
    visual: "enemy",
    text: "你把意識凝成一道光，刺向夢魘。它後退了，但你的精神也被反噬。",
    action: () => { damageEnemy(20, "攻擊命中。夢魘變得不穩定。"); hurt(12); },
    choices: () => nextBattleChoices()
  },
  defend: {
    visual: "enemy",
    text: "你閉上眼睛，提醒自己：這只是夢。夢魘的攻擊穿過你的身體，傷害變小了。",
    action: () => hurt(5),
    choices: () => nextBattleChoices()
  },
  searchMemory: {
    visual: "forest",
    text: "你在破碎的夢境裡找到第二枚記憶碎片。上面寫著：『害怕也沒關係，我還是可以往前。』",
    action: () => gainMemory("第二枚記憶碎片：『害怕也沒關係。』"),
    choices: [["回到戰鬥", "battle"]]
  },
  victory: {
    visual: "end",
    text: "夢魘碎裂，變成最後一枚記憶碎片。你聽見自己的聲音說：『醒來之前，我想把真正的自己帶回去。』Demo Clear！",
    action: () => gainMemory("第三枚記憶碎片：『我會把自己帶回去。』"),
    choices: [["重新開始", "restart"]]
  },
  gameover: {
    visual: "enemy",
    text: "夢境被黑暗吞沒。你暫時醒不過來了……但是沒關係，夢可以重來。",
    choices: [["重新開始", "restart"]]
  }
};

function gainMemory(message) {
  if (!document.querySelector(`[data-log="${message}"]`)) {
    state.memory = Math.min(3, state.memory + 1);
    addLog(message, message);
  }
}

function hurt(amount) {
  state.hp = Math.max(0, state.hp - amount);
  addLog(`HP -${amount}`);
}

function damageEnemy(amount, message) {
  state.enemyHp = Math.max(0, state.enemyHp - amount);
  addLog(`${message}（夢魘HP：${state.enemyHp}）`);
}

function addLog(text, key = null) {
  const li = document.createElement("li");
  li.textContent = text;
  if (key) li.dataset.log = key;
  document.getElementById("log").prepend(li);
}

function nextBattleChoices() {
  if (state.enemyHp <= 0) return [["觸碰最後的光", "victory"]];
  if (state.hp <= 0) return [["墜入夢底", "gameover"]];
  return [["繼續戰鬥", "battle"]];
}

function render(sceneName) {
  if (sceneName === "restart") {
    state.hp = 100;
    state.memory = 0;
    state.enemyHp = 60;
    document.getElementById("log").innerHTML = "";
    sceneName = "start";
  }

  const scene = scenes[sceneName];
  if (scene.action) scene.action();

  document.getElementById("hp").textContent = state.hp;
  document.getElementById("memory").textContent = state.memory;
  document.getElementById("sceneText").textContent = scene.text;

  const visual = document.getElementById("sceneVisual");
  visual.className = `scene-visual ${scene.visual}`;

  const choices = typeof scene.choices === "function" ? scene.choices() : scene.choices;
  const choiceBox = document.getElementById("choices");
  choiceBox.innerHTML = "";
  choices.forEach(([label, target]) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.onclick = () => render(target);
    choiceBox.appendChild(btn);
  });
}

render("start");
