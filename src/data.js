export const TONE_COLORS = {
  1: "#5EA8D9",
  2: "#4FB897",
  3: "#E0A83E",
  4: "#E06B5A",
};

export const TONE_LABELS = {
  1: "第1声・平ら",
  2: "第2声・上昇",
  3: "第3声・下がって上昇",
  4: "第4声・下降",
};

export const TONE_PATHS = {
  1: "M5,20 L35,20",
  2: "M6,32 L34,8",
  3: "M5,14 C16,34 24,34 35,6",
  4: "M5,7 L35,33",
};

export const WORDS = [
  { h: "妈", p: "mā", t: 1, m: "お母さん" },
  { h: "麻", p: "má", t: 2, m: "麻" },
  { h: "马", p: "mǎ", t: 3, m: "馬" },
  { h: "骂", p: "mà", t: 4, m: "罵る" },
  { h: "八", p: "bā", t: 1, m: "8、はち" },
  { h: "拔", p: "bá", t: 2, m: "抜く" },
  { h: "把", p: "bǎ", t: 3, m: "〜を(前置詞)" },
  { h: "爸", p: "bà", t: 4, m: "お父さん" },
  { h: "医", p: "yī", t: 1, m: "医" },
  { h: "姨", p: "yí", t: 2, m: "おばさん(母方)" },
  { h: "以", p: "yǐ", t: 3, m: "〜によって" },
  { h: "意", p: "yì", t: 4, m: "意味" },
  { h: "书", p: "shū", t: 1, m: "本" },
  { h: "熟", p: "shú", t: 2, m: "熟れた" },
  { h: "鼠", p: "shǔ", t: 3, m: "ねずみ" },
  { h: "树", p: "shù", t: 4, m: "木" },
  { h: "猫", p: "māo", t: 1, m: "猫" },
  { h: "明", p: "míng", t: 2, m: "明るい" },
  { h: "米", p: "mǐ", t: 3, m: "米" },
  { h: "妹", p: "mèi", t: 4, m: "妹" },
  { h: "喝", p: "hē", t: 1, m: "飲む" },
  { h: "学", p: "xué", t: 2, m: "学ぶ" },
  { h: "好", p: "hǎo", t: 3, m: "良い" },
  { h: "汉", p: "hàn", t: 4, m: "漢(中国の)" },
  { h: "天", p: "tiān", t: 1, m: "空" },
  { h: "甜", p: "tián", t: 2, m: "甘い" },
  { h: "两", p: "liǎng", t: 3, m: "2つの" },
  { h: "练", p: "liàn", t: 4, m: "練習する" },
  { h: "中", p: "zhōng", t: 1, m: "中" },
  { h: "虫", p: "chóng", t: 2, m: "虫" },
  { h: "懂", p: "dǒng", t: 3, m: "わかる" },
  { h: "重", p: "zhòng", t: 4, m: "重い" },

  { h: "你好", p: "nǐ hǎo", t: [3, 3], m: "こんにちは", level: 2 },
  { h: "谢谢", p: "xiè xie", t: [4, 4], m: "ありがとう", level: 2 },
  { h: "再见", p: "zài jiàn", t: [4, 4], m: "さようなら", level: 2 },
  { h: "中国", p: "zhōng guó", t: [1, 2], m: "中国", level: 2 },
  { h: "日本", p: "rì běn", t: [4, 3], m: "日本", level: 2 },
  { h: "学校", p: "xué xiào", t: [2, 4], m: "学校", level: 2 },
  { h: "老师", p: "lǎo shī", t: [3, 1], m: "先生", level: 2 },
  { h: "天气", p: "tiān qì", t: [1, 4], m: "天気", level: 2 },
  { h: "电影", p: "diàn yǐng", t: [4, 3], m: "映画", level: 2 },
  { h: "火车", p: "huǒ chē", t: [3, 1], m: "電車・列車", level: 2 },
  { h: "飞机", p: "fēi jī", t: [1, 1], m: "飛行機", level: 2 },
  { h: "汉语", p: "hàn yǔ", t: [4, 3], m: "中国語", level: 2 },
  { h: "英语", p: "yīng yǔ", t: [1, 3], m: "英語", level: 2 },
  { h: "银行", p: "yín háng", t: [2, 2], m: "銀行", level: 2 },
  { h: "咖啡", p: "kā fēi", t: [1, 1], m: "コーヒー", level: 2 },
  { h: "苹果", p: "píng guǒ", t: [2, 3], m: "りんご", level: 2 },
  { h: "手机", p: "shǒu jī", t: [3, 1], m: "携帯電話", level: 2 },
];

export function wordLevel(word) {
  return word.level ?? 1;
}

export function toneList(word) {
  return Array.isArray(word.t) ? word.t : [word.t];
}

export function pinyinSyllables(word) {
  return word.p.split(" ");
}

export const BOX_INTERVALS = [0, 1, 3, 7]; // ボックス番号 -> 次回復習までの日数

export function speak(hanzi) {
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(hanzi);
    u.lang = "zh-CN";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } catch (e) {
    /* このブラウザでは音声合成が利用できません */
  }
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// ブラウザの localStorage をラップした簡易ストレージ
// (Claudeアーティファクト専用の window.storage の代わり)
export const storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* 保存に失敗した場合は無視 */
    }
  },
};
