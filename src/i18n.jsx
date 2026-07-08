import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "./data.js";

const STRINGS = {
  ja: {
    brandSub: "声のかたちで覚えるピンイン",
    tabs: {
      tone: { label: "声調トレーナー", desc: "耳で聞いて声調のかたちを当てる" },
      cards: { label: "単語カード", desc: "間隔反復で語彙を復習する" },
      speak: { label: "発音練習", desc: "お手本を聞いて自分の声を録音する" },
    },
    toneLabels: {
      1: "第1声・平ら",
      2: "第2声・上昇",
      3: "第3声・下がって上昇",
      4: "第4声・下降",
    },
    accuracy: "正解率",
    streak: "連続正解",
    best: "ベスト",
    listenAria: "発音を聞く",
    selectTonePrompt: "聞こえた声調を選んでください",
    yourAnswer: "あなたの回答",
    correct: "正解！",
    wrongAnswer: (tone) => `正解は 第${tone}声 —`,
    next: "次へ",
    reviewingAll: (n) => `全 ${n} 枚を復習中`,
    reviewToday: (n) => `今日の復習: 残り ${n} 枚`,
    showTodayOnly: "今日の分だけ表示",
    reviewAllCards: "全カードを復習",
    doneToday: "今日の復習分は終わりました 🎉",
    reviewMore: "もっと復習する",
    level: (n) => `レベル${n}`,
    tapToShow: "タップして意味を表示",
    pronunciationBtn: "発音",
    dontKnow: "わからない",
    know: "わかる",
    referenceShape: "お手本のかたち",
    reference: "お手本",
    listen: "聞く",
    yourRecording: "あなたの録音",
    record: "録音する",
    stop: "停止",
    compare: "聞き比べ",
    micError: "マイクにアクセスできませんでした。ブラウザの権限設定を確認してください。",
    nextWord: "次の単語へ",
    privacyNote:
      "録音した声はこの端末内(ブラウザ)だけで再生され、どこにも送信・保存されません。次の単語に進む、またはタブを閉じると自動的に破棄されます。",
  },
  en: {
    brandSub: "Learn pinyin through the shape of your voice",
    tabs: {
      tone: { label: "Tone Trainer", desc: "Listen and guess the tone's shape" },
      cards: { label: "Flashcards", desc: "Review vocabulary with spaced repetition" },
      speak: { label: "Pronunciation", desc: "Listen to a model, then record your own voice" },
    },
    toneLabels: {
      1: "Tone 1 · Flat",
      2: "Tone 2 · Rising",
      3: "Tone 3 · Dip then rise",
      4: "Tone 4 · Falling",
    },
    accuracy: "Accuracy",
    streak: "Streak",
    best: "Best",
    listenAria: "Listen to pronunciation",
    selectTonePrompt: "Select the tone you heard",
    yourAnswer: "Your answer",
    correct: "Correct!",
    wrongAnswer: (tone) => `Correct answer: Tone ${tone} —`,
    next: "Next",
    reviewingAll: (n) => `Reviewing all ${n} cards`,
    reviewToday: (n) => `Today's review: ${n} left`,
    showTodayOnly: "Show today's only",
    reviewAllCards: "Review all cards",
    doneToday: "You've finished today's review 🎉",
    reviewMore: "Review more",
    level: (n) => `Level ${n}`,
    tapToShow: "Tap to reveal meaning",
    pronunciationBtn: "Sound",
    dontKnow: "Don't know",
    know: "Know",
    referenceShape: "Reference shape",
    reference: "Model",
    listen: "Listen",
    yourRecording: "Your recording",
    record: "Record",
    stop: "Stop",
    compare: "Compare",
    micError: "Couldn't access the microphone. Please check your browser's permission settings.",
    nextWord: "Next word",
    privacyNote:
      "Your recording plays back only on this device (in the browser) and is never uploaded or stored anywhere. It's discarded automatically when you move to the next word or close the tab.",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => storage.get("lang") || "ja");

  useEffect(() => {
    storage.set("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  function t(key, ...args) {
    let entry = STRINGS[lang];
    for (const part of key.split(".")) entry = entry?.[part];
    return typeof entry === "function" ? entry(...args) : entry;
  }

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
