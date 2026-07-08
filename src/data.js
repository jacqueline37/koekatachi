export const TONE_COLORS = {
  1: "#5EA8D9",
  2: "#4FB897",
  3: "#E0A83E",
  4: "#E06B5A",
};

export const TONE_PATHS = {
  1: "M5,20 L35,20",
  2: "M6,32 L34,8",
  3: "M5,14 C16,34 24,34 35,6",
  4: "M5,7 L35,33",
};

export const WORDS = [
  { h: "妈", p: "mā", t: 1, m: "お母さん", m_en: "mom" },
  { h: "麻", p: "má", t: 2, m: "麻", m_en: "hemp" },
  { h: "马", p: "mǎ", t: 3, m: "馬", m_en: "horse" },
  { h: "骂", p: "mà", t: 4, m: "罵る", m_en: "to scold" },
  { h: "八", p: "bā", t: 1, m: "8、はち", m_en: "eight" },
  { h: "拔", p: "bá", t: 2, m: "抜く", m_en: "to pull out" },
  { h: "把", p: "bǎ", t: 3, m: "〜を(前置詞)", m_en: "(object-marking preposition)" },
  { h: "爸", p: "bà", t: 4, m: "お父さん", m_en: "dad" },
  { h: "医", p: "yī", t: 1, m: "医", m_en: "medicine/doctor" },
  { h: "姨", p: "yí", t: 2, m: "おばさん(母方)", m_en: "aunt (mother's side)" },
  { h: "以", p: "yǐ", t: 3, m: "〜によって", m_en: "by means of" },
  { h: "意", p: "yì", t: 4, m: "意味", m_en: "meaning" },
  { h: "书", p: "shū", t: 1, m: "本", m_en: "book" },
  { h: "熟", p: "shú", t: 2, m: "熟れた", m_en: "ripe" },
  { h: "鼠", p: "shǔ", t: 3, m: "ねずみ", m_en: "mouse/rat" },
  { h: "树", p: "shù", t: 4, m: "木", m_en: "tree" },
  { h: "猫", p: "māo", t: 1, m: "猫", m_en: "cat" },
  { h: "明", p: "míng", t: 2, m: "明るい", m_en: "bright" },
  { h: "米", p: "mǐ", t: 3, m: "米", m_en: "rice" },
  { h: "妹", p: "mèi", t: 4, m: "妹", m_en: "younger sister" },
  { h: "喝", p: "hē", t: 1, m: "飲む", m_en: "to drink" },
  { h: "学", p: "xué", t: 2, m: "学ぶ", m_en: "to learn" },
  { h: "好", p: "hǎo", t: 3, m: "良い", m_en: "good" },
  { h: "汉", p: "hàn", t: 4, m: "漢(中国の)", m_en: "Han (Chinese)" },
  { h: "天", p: "tiān", t: 1, m: "空", m_en: "sky" },
  { h: "甜", p: "tián", t: 2, m: "甘い", m_en: "sweet" },
  { h: "两", p: "liǎng", t: 3, m: "2つの", m_en: "two (of something)" },
  { h: "练", p: "liàn", t: 4, m: "練習する", m_en: "to practice" },
  { h: "中", p: "zhōng", t: 1, m: "中", m_en: "middle" },
  { h: "虫", p: "chóng", t: 2, m: "虫", m_en: "insect" },
  { h: "懂", p: "dǒng", t: 3, m: "わかる", m_en: "to understand" },
  { h: "重", p: "zhòng", t: 4, m: "重い", m_en: "heavy" },

  { h: "你好", p: "nǐ hǎo", t: [3, 3], m: "こんにちは", m_en: "hello", level: 2 },
  { h: "谢谢", p: "xiè xie", t: [4, 4], m: "ありがとう", m_en: "thank you", level: 2 },
  { h: "再见", p: "zài jiàn", t: [4, 4], m: "さようなら", m_en: "goodbye", level: 2 },
  { h: "中国", p: "zhōng guó", t: [1, 2], m: "中国", m_en: "China", level: 2 },
  { h: "日本", p: "rì běn", t: [4, 3], m: "日本", m_en: "Japan", level: 2 },
  { h: "学校", p: "xué xiào", t: [2, 4], m: "学校", m_en: "school", level: 2 },
  { h: "老师", p: "lǎo shī", t: [3, 1], m: "先生", m_en: "teacher", level: 2 },
  { h: "天气", p: "tiān qì", t: [1, 4], m: "天気", m_en: "weather", level: 2 },
  { h: "电影", p: "diàn yǐng", t: [4, 3], m: "映画", m_en: "movie", level: 2 },
  { h: "火车", p: "huǒ chē", t: [3, 1], m: "電車・列車", m_en: "train", level: 2 },
  { h: "飞机", p: "fēi jī", t: [1, 1], m: "飛行機", m_en: "airplane", level: 2 },
  { h: "汉语", p: "hàn yǔ", t: [4, 3], m: "中国語", m_en: "Chinese (language)", level: 2 },
  { h: "英语", p: "yīng yǔ", t: [1, 3], m: "英語", m_en: "English (language)", level: 2 },
  { h: "银行", p: "yín háng", t: [2, 2], m: "銀行", m_en: "bank", level: 2 },
  { h: "咖啡", p: "kā fēi", t: [1, 1], m: "コーヒー", m_en: "coffee", level: 2 },
  { h: "苹果", p: "píng guǒ", t: [2, 3], m: "りんご", m_en: "apple", level: 2 },
  { h: "手机", p: "shǒu jī", t: [3, 1], m: "携帯電話", m_en: "mobile phone", level: 2 },
];

export function wordLevel(word) {
  return word.level ?? 1;
}

export function wordMeaning(word, lang) {
  return lang === "en" ? word.m_en : word.m;
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
