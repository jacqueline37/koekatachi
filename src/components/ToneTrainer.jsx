import React, { useState, useEffect } from "react";
import { Volume2, Check, X, Flame } from "lucide-react";
import ToneGlyph from "./ToneGlyph.jsx";
import { WORDS, TONE_COLORS, TONE_LABELS, speak, storage, wordLevel } from "../data.js";

const LEVEL1_WORDS = WORDS.filter((w) => wordLevel(w) === 1);

function pickRandom() {
  return LEVEL1_WORDS[Math.floor(Math.random() * LEVEL1_WORDS.length)];
}

export default function ToneTrainer() {
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
        <StatChip label="正解率" value={stats.total ? `${Math.round((stats.correct / stats.total) * 100)}%` : "—"} />
        <StatChip label="連続正解" value={stats.streak} icon={<Flame size={14} color="#E0A83E" />} />
        <StatChip label="ベスト" value={stats.best} />
      </div>

      <div className="card">
        <button className="play-btn" onClick={() => speak(word.h)} aria-label="発音を聞く">
          <Volume2 size={22} />
        </button>
        <div className="hanzi-big">{word.h}</div>
        <div className="muted">聞こえた声調を選んでください</div>
      </div>

      <div className="tone-grid">
        {[1, 2, 3, 4].map((t) => {
          const isAnswer = result && t === word.t;
          const isWrongPick = result === "wrong" && t === picked;
          const color = isAnswer ? TONE_COLORS[t] : isWrongPick ? "#E06B5A" : undefined;
          return (
            <button
              key={t}
              onClick={() => choose(t)}
              disabled={!!result}
              className="tone-option"
              style={{ borderColor: color, background: color ? `${color}22` : undefined }}
            >
              <ToneGlyph tone={t} size={34} />
              <span className="tone-option-label">{TONE_LABELS[t]}</span>
              {isWrongPick && <span className="tone-option-flag">あなたの回答</span>}
            </button>
          );
        })}
      </div>

      {result && (
        <div className="feedback-row">
          <div className="feedback-text" style={{ color: result === "correct" ? "#4FB897" : "#E06B5A" }}>
            {result === "correct" ? (
              <>
                <Check size={16} /> 正解！ {word.p}（{word.m}）
              </>
            ) : (
              <>
                <X size={16} /> 正解は 第{word.t}声 — {word.p}（{word.m}）
              </>
            )}
          </div>
          <button className="primary-btn" onClick={next}>
            次へ
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
