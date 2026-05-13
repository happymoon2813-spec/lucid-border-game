const text = {
zh:{
subtitle:"明晰夢戰鬥",
desc:"在現實與夢的邊界，少女帶著記憶碎片，對抗自己的夢魘。",
start:"進入夢境",
battleTitle:"放置戰鬥",
battleText:"角色會自動戰鬥並獲得夢晶。",
characterTitle:"角色",
characterText:"查看已獲得的角色與能力。",
gachaTitle:"抽卡",
gachaText:"消耗夢晶召喚新的角色。",
bookTitle:"圖鑑",
bookText:"收集夢境中的角色與怪物。"
},

jp:{
subtitle:"明晰夢バトル",
desc:"現実と夢の境界で、少女は記憶の欠片を武器に悪夢と戦う。",
start:"夢の世界へ",
battleTitle:"放置バトル",
battleText:"キャラクターが自動で戦い、夢晶を集める。",
characterTitle:"キャラクター",
characterText:"仲間や能力を確認できる。",
gachaTitle:"ガチャ",
gachaText:"夢晶を使って新しいキャラクターを召喚する。",
bookTitle:"図鑑",
bookText:"夢の中のキャラクターやモンスターを収集する。"
}
}

function setLang(lang){
document.getElementById("subtitle").innerText=text[lang].subtitle;
document.getElementById("desc").innerText=text[lang].desc;
document.getElementById("startBtn").innerText=text[lang].start;

document.getElementById("battleTitle").innerText=text[lang].battleTitle;
document.getElementById("battleText").innerText=text[lang].battleText;

document.getElementById("characterTitle").innerText=text[lang].characterTitle;
document.getElementById("characterText").innerText=text[lang].characterText;

document.getElementById("gachaTitle").innerText=text[lang].gachaTitle;
document.getElementById("gachaText").innerText=text[lang].gachaText;

document.getElementById("bookTitle").innerText=text[lang].bookTitle;
document.getElementById("bookText").innerText=text[lang].bookText;
}
