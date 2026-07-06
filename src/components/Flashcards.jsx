import React, { useState, useEffect, useCallback } from "react";
import { Volume2, Check, X } from "lucide-react";
import { ToneGlyphRow } from "./ToneGlyph.jsx";
import { WORDS, TONE_COLORS, BOX_INTERVALS, speak, storage, todayStr, addDays, toneList, pinyinSyllables, wordLevel } from "../data.js";

export default function Flashcards() {
  const [srs, setSrs] = useState(() => storage.get("srs-state") || {});
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showAllMode, setShowAllMode] = useState(false);

  const buildQueue = useCallback((state, all) => {
    const today = todayStr();
    const due = WORDS.filter((w) => {
      const rec = state[w.h];
      if (!rec) return true;
      return all || rec.due <= today;
    });
    setQueue(due);
    setIdx(0);
    setFlipped(false);
  }, []);

  useEffect(() => {
    buildQueue(srs, showAllMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAllMode]);

  function persist(next) {
    setSrs(next);
    storage.set("srs-state", next);
  }

  function grade(known) {
    const w = queue[idx];
    const rec = srs[w.h] || { box: 0, due: todayStr() };
    const box = known ? Math.min(rec.box + 1, BOX_INTERVALS.length - 1) : 0;
    const due = addDays(todayStr(), BOX_INTERVALS[box]);
    const next = { ...srs, [w.h]: { box, due } };
    persist(next);
    if (idx + 1 < queue.length) {
      setIdx(idx + 1);
      setFlipped(false);
    } else {
      setQueue([]);
    }
  }

  const current = queue[idx];

  return (
    <div className="panel">
      <div className="row-between">
        <div className="muted">{showAllMode ? `全 ${WORDS.length} 枚を復習中` : `今日の復習: 残り ${queue.length} 枚`}</div>
        <button className="link-btn" onClick={() => setShowAllMode((v) => !v)}>
          {showAllMode ? "今日の分だけ表示" : "全カードを復習"}
        </button>
      </div>

      {!current ? (
        <div className="empty-state">
          <div style={{ fontSize: 15, marginBottom: 8 }}>今日の復習分は終わりました 🎉</div>
          <button className="primary-btn" onClick={() => setShowAllMode(true)}>
            もっと復習する
          </button>
        </div>
      ) : (
        <>
          <div className="flashcard" onClick={() => setFlipped((f) => !f)}>
            {!flipped ? (
              <>
                <span className="level-badge">レベル{wordLevel(current)}</span>
                <div className="hanzi-big">{current.h}</div>
                <div className="pinyin-row">
                  {pinyinSyllables(current).map((syl, i) => (
                    <span key={i} style={{ color: TONE_COLORS[toneList(current)[i]], fontWeight: 700 }}>
                      {syl}
                    </span>
                  ))}
                  <ToneGlyphRow tones={toneList(current)} size={26} active />
                </div>
                <div className="tap-hint">タップして意味を表示</div>
              </>
            ) : (
              <>
                <div className="meaning-big">{current.m}</div>
                <div className="muted">
                  {current.h} · {current.p}
                </div>
              </>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <button
              className="icon-ghost-btn"
              onClick={(e) => {
                e.stopPropagation();
                speak(current.h);
              }}
            >
              <Volume2 size={18} /> 発音
            </button>
          </div>

          {flipped && (
            <div className="grade-row">
              <button className="grade-btn" style={{ borderColor: "#E06B5A" }} onClick={() => grade(false)}>
                <X size={16} color="#E06B5A" /> わからない
              </button>
              <button className="grade-btn" style={{ borderColor: "#4FB897" }} onClick={() => grade(true)}>
                <Check size={16} color="#4FB897" /> わかる
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
