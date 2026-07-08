import React, { useState, useEffect } from "react";
import { Volume2, Check, X, Flame } from "lucide-react";
import ToneGlyph from "./ToneGlyph.jsx";
import { WORDS, TONE_COLORS, speak, storage, wordLevel, wordMeaning } from "../data.js";
import { useLanguage } from "../i18n.jsx";

const LEVEL1_WORDS = WORDS.filter((w) => wordLevel(w) === 1);

function pickRandom() {
  return LEVEL1_WORDS[Math.floor(Math.random() * LEVEL1_WORDS.length)];
}

export default function ToneTrainer() {
  const { t, lang } = useLanguage();
  const [word, setWord] = useState(pickRandom);
  const [result, setResult] = useState(null);
  const [picked, setPicked] = useState(null);
  const [stats, setStats] = useState(() => storage.get("tone-trainer-stats") || { correct: 0, total: 0, streak: 0, best: 0 });

  useEffect(() => {
    storage.set("tone-trainer-stats", stats);
  }, [stats]);

  function next() {
    setWord(pickRandom());
    setResult(null);
    setPicked(null);
  }

  function choose(tone) {
    if (result) return;
    const isCorrect = tone === word.t;
    setPicked(tone);
    setResult(isCorrect ? "correct" : "wrong");
    setStats((s) => {
      const streak = isCorrect ? s.streak + 1 : 0;
      return { correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1, streak, best: Math.max(s.best, streak) };
    });
  }

  return (
    <div className="panel">
      <div className="stat-row">
        <StatChip label={t("accuracy")} value={stats.total ? `${Math.round((stats.correct / stats.total) * 100)}%` : "—"} />
        <StatChip label={t("streak")} value={stats.streak} icon={<Flame size={14} color="#E0A83E" />} />
        <StatChip label={t("best")} value={stats.best} />
      </div>

      <div className="card">
        <button className="play-btn" onClick={() => speak(word.h)} aria-label={t("listenAria")}>
          <Volume2 size={22} />
        </button>
        <div className="hanzi-big">{word.h}</div>
        <div className="muted">{t("selectTonePrompt")}</div>
      </div>

      <div className="tone-grid">
        {[1, 2, 3, 4].map((tone) => {
          const isAnswer = result && tone === word.t;
          const isWrongPick = result === "wrong" && tone === picked;
          const color = isAnswer ? TONE_COLORS[tone] : isWrongPick ? "#E06B5A" : undefined;
          return (
            <button
              key={tone}
              onClick={() => choose(tone)}
              disabled={!!result}
              className="tone-option"
              style={{ borderColor: color, background: color ? `${color}22` : undefined }}
            >
              <ToneGlyph tone={tone} size={34} />
              <span className="tone-option-label">{t(`toneLabels.${tone}`)}</span>
              {isWrongPick && <span className="tone-option-flag">{t("yourAnswer")}</span>}
            </button>
          );
        })}
      </div>

      {result && (
        <div className="feedback-row">
          <div className="feedback-text" style={{ color: result === "correct" ? "#4FB897" : "#E06B5A" }}>
            {result === "correct" ? (
              <>
                <Check size={16} /> {t("correct")} {word.p}（{wordMeaning(word, lang)}）
              </>
            ) : (
              <>
                <X size={16} /> {t("wrongAnswer", word.t)} {word.p}（{wordMeaning(word, lang)}）
              </>
            )}
          </div>
          <button className="primary-btn" onClick={next}>
            {t("next")}
          </button>
        </div>
      )}
    </div>
  );
}

function StatChip({ label, value, icon }) {
  return (
    <div className="stat-chip">
      <span className="stat-chip-label">{label}</span>
      <span className="stat-chip-value">
        {icon}
        {value}
      </span>
    </div>
  );
}
