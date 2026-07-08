import React, { useState, useRef } from "react";
import { Volume2, Mic, Square, RotateCcw } from "lucide-react";
import { WORDS, TONE_COLORS, TONE_PATHS, speak, toneList, pinyinSyllables, wordLevel, wordMeaning } from "../data.js";
import { useLanguage } from "../i18n.jsx";

function scaledTonePath(tone) {
  return TONE_PATHS[tone]
    .replace(/M(\d+),(\d+)/, (m, x, y) => `M${x * 3},${y * 1.2}`)
    .replace(
      /C([\d.]+),([\d.]+) ([\d.]+),([\d.]+) ([\d.]+),([\d.]+)/,
      (m, a, b, c, d, e, f) => `C${a * 3},${b * 1.2} ${c * 3},${d * 1.2} ${e * 3},${f * 1.2}`
    )
    .replace(/L([\d.]+),([\d.]+)/, (m, x, y) => `L${x * 3},${y * 1.2}`);
}

export default function PronunciationPractice() {
  const { t, lang } = useLanguage();
  const [word, setWord] = useState(WORDS[0]);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [micError, setMicError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  function nextWord() {
    const others = WORDS.filter((w) => w.h !== word.h);
    setWord(others[Math.floor(Math.random() * others.length)]);
    setAudioUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setMicError(null);
  }

  async function startRecording() {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
    } catch (e) {
      setMicError(t("micError"));
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="panel">
      <div className="card">
        <span className="level-badge">{t("level", wordLevel(word))}</span>
        <div className="hanzi-big">{word.h}</div>
        <div className="pinyin-row">
          {pinyinSyllables(word).map((syl, i) => (
            <span key={i} style={{ color: TONE_COLORS[toneList(word)[i]], fontWeight: 700, fontSize: 20 }}>
              {syl}
            </span>
          ))}
        </div>
        <div className="muted">{wordMeaning(word, lang)}</div>
      </div>

      <div className="contour-reference">
        <span className="muted">{t("referenceShape")}</span>
        <div style={{ display: "flex", gap: 12 }}>
          {toneList(word).map((tone, i) => (
            <svg key={i} width="140" height="60" viewBox="0 0 140 60">
              <path d={scaledTonePath(tone)} fill="none" stroke={TONE_COLORS[tone]} strokeWidth="4" strokeLinecap="round" />
            </svg>
          ))}
        </div>
      </div>

      <div className="compare-panel">
        <div className="compare-row">
          <span className="compare-label">{t("reference")}</span>
          <button className="icon-ghost-btn" onClick={() => speak(word.h)}>
            <Volume2 size={18} /> {t("listen")}
          </button>
        </div>

        <div className="compare-row">
          <span className="compare-label">{t("yourRecording")}</span>
          {!recording ? (
            <button className="record-btn" onClick={startRecording}>
              <Mic size={18} /> {t("record")}
            </button>
          ) : (
            <button className="record-btn" style={{ background: "#E06B5A" }} onClick={stopRecording}>
              <Square size={16} /> {t("stop")}
            </button>
          )}
        </div>

        {micError && <div className="error-text">{micError}</div>}

        {audioUrl && (
          <div className="compare-row">
            <span className="compare-label">{t("compare")}</span>
            <audio controls src={audioUrl} style={{ height: 32 }} />
          </div>
        )}

        <div className="privacy-note">{t("privacyNote")}</div>
      </div>

      <button className="link-btn" onClick={nextWord}>
        <RotateCcw size={14} style={{ marginRight: 4 }} /> {t("nextWord")}
      </button>
    </div>
  );
}
