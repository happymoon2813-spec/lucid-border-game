const texts = {
    jp: {
        title: "ルシッド・ボーダー",
        subtitle: "夢と現実の境界線",
        startBtn: "ゲームスタート",
        gachaBtn: "ガチャ",
        charBtn: "キャラクター",
        bookBtn: "図鑑",
        battleTitle: "自動戦闘中…",
        enemy: "ナイトメア",
        bossBtn: "ボスに挑戦",
        gachaTitle: "ガチャ",
        singleBtn: "1回ガチャ",
        tenBtn: "10連ガチャ",
        storyText: "これは「明晰夢」に囚われた少女たちの物語。"
    },

    zh: {
        title: "Lucid Border",
        subtitle: "夢與現實的邊界",
        startBtn: "開始遊戲",
        gachaBtn: "抽卡",
        charBtn: "角色",
        bookBtn: "圖鑑",
        battleTitle: "自動戰鬥中…",
        enemy: "夢魘",
        bossBtn: "挑戰Boss",
        gachaTitle: "抽卡",
        singleBtn: "單抽",
        tenBtn: "十連抽",
        storyText: "這是被困在清醒夢中的少女們的故事。"
    }
};

function setLanguage(lang){
    const data = texts[lang];

    for(let key in data){
        document.getElementById(key).innerText = data[key];
    }
}
