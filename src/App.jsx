import React, { useState } from "react";
import ToneTrainer from "./components/ToneTrainer.jsx";
import Flashcards from "./components/Flashcards.jsx";
import PronunciationPractice from "./components/PronunciationPractice.jsx";

const TABS = [
  { id: "tone", label: "声調トレーナー", desc: "耳で聞いて声調のかたちを当てる" },
  { id: "cards", label: "単語カード", desc: "間隔反復で語彙を復習する" },
  { id: "speak", label: "発音練習", desc: "お手本を聞いて自分の声を録音する" },
];

export default function App() {
  const [tab, setTab] = useState("tone");
  const activeMeta = TABS.find((t) => t.id === tab);

  return (
    <div className="app-shell">
      {/* PC: 左サイドバー */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-char">声形</span>
          <div>
            <div className="brand-title">Koe-Katachi</div>
            <div className="brand-sub">声のかたちで覚えるピンイン</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`sidebar-item ${tab === t.id ? "active" : ""}`}>
              <span className="sidebar-item-label">{t.label}</span>
              <span className="sidebar-item-desc">{t.desc}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="content-column">
        {/* モバイル: 上部ヘッダー+タブ */}
        <header className="mobile-header">
          <div className="brand">
            <span className="brand-char">声形</span>
            <div>
              <div className="brand-title">Koe-Katachi</div>
              <div className="brand-sub">声のかたちで覚えるピンイン</div>
            </div>
          </div>
        </header>

        <nav className="tabbar">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`tab-btn ${tab === t.id ? "active" : ""}`}>
              {t.label}
            </button>
          ))}
        </nav>

        <main className="main">
          <h1 className="section-title desktop-only">{activeMeta.label}</h1>
          {tab === "tone" && <ToneTrainer />}
          {tab === "cards" && <Flashcards />}
          {tab === "speak" && <PronunciationPractice />}
        </main>
      </div>
    </div>
  );
}
