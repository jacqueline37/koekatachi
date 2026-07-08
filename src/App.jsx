import React, { useState } from "react";
import ToneTrainer from "./components/ToneTrainer.jsx";
import Flashcards from "./components/Flashcards.jsx";
import PronunciationPractice from "./components/PronunciationPractice.jsx";
import { LanguageProvider, useLanguage } from "./i18n.jsx";

const TAB_IDS = ["tone", "cards", "speak"];

function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="lang-toggle" role="group" aria-label="Language / 言語">
      <button className={lang === "ja" ? "active" : ""} onClick={() => setLang("ja")}>
        日本語
      </button>
      <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
        EN
      </button>
    </div>
  );
}

function AppInner() {
  const [tab, setTab] = useState("tone");
  const { t } = useLanguage();
  const tabs = TAB_IDS.map((id) => ({ id, label: t(`tabs.${id}.label`), desc: t(`tabs.${id}.desc`) }));
  const activeMeta = tabs.find((tb) => tb.id === tab);

  return (
    <div className="app-shell">
      {/* PC: 左サイドバー */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-char">声形</span>
          <div>
            <div className="brand-title">Koe-Katachi</div>
            <div className="brand-sub">{t("brandSub")}</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {tabs.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)} className={`sidebar-item ${tab === tb.id ? "active" : ""}`}>
              <span className="sidebar-item-label">{tb.label}</span>
              <span className="sidebar-item-desc">{tb.desc}</span>
            </button>
          ))}
        </nav>
        <LanguageToggle />
      </aside>

      <div className="content-column">
        {/* モバイル: 上部ヘッダー+タブ */}
        <header className="mobile-header">
          <div className="row-between">
            <div className="brand">
              <span className="brand-char">声形</span>
              <div>
                <div className="brand-title">Koe-Katachi</div>
                <div className="brand-sub">{t("brandSub")}</div>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </header>

        <nav className="tabbar">
          {tabs.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)} className={`tab-btn ${tab === tb.id ? "active" : ""}`}>
              {tb.label}
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

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
