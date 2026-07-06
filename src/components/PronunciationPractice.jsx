import React, { useState, useRef } from "react";
import { Volume2, Mic, Square, RotateCcw } from "lucide-react";
import { WORDS, TONE_COLORS, TONE_PATHS, speak } from "../data.js";

export default function PronunciationPractice() {
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
      setMicError("マイクにアクセスできませんでした。ブラウザの権限設定を確認してください。");
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="panel">
      <div className="card">
        <div className="hanzi-big">{word.h}</div>
        <div className="pinyin-row">
          <span style={{ color: TONE_COLORS[word.t], fontWeight: 700, fontSize: 20 }}>{word.p}</span>
        </div>
        <div className="muted">{word.m}</div>
      </div>

      <div className="contour-reference">
        <span className="muted">お手本のかたち</span>
        <svg width="140" height="60" viewBox="0 0 140 60">
          <path
            d={TONE_PATHS[word.t]
              .replace(/M(\d+),(\d+)/, (m, x, y) => `M${x * 3},${y * 1.2}`)
              .replace(/C([\d.]+),([\d.]+) ([\d.]+),([\d.]+) ([\d.]+),([\d.]+)/, (m, a, b, c, d, e, f) => `C${a * 3},${b * 1.2} ${c * 3},${d * 1.2} ${e * 3},${f * 1.2}`)
              .replace(/L([\d.]+),([\d.]+)/, (m, x, y) => `L${x * 3},${y * 1.2}`)}
            fill="none"
            stroke={TONE_COLORS[word.t]}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="compare-panel">
        <div className="compare-row">
          <span className="compare-label">お手本</span>
          <button className="icon-ghost-btn" onClick={() => speak(word.h)}>
            <Volume2 size={18} /> 聞く
          </button>
        </div>

        <div className="compare-row">
          <span className="compare-label">あなたの録音</span>
          {!recording ? (
            <button className="record-btn" onClick={startRecording}>
              <Mic size={18} /> 録音する
            </button>
          ) : (
            <button className="record-btn" style={{ background: "#E06B5A" }} onClick={stopRecording}>
              <Square size={16} /> 停止
            </button>
          )}
        </div>

        {micError && <div className="error-text">{micError}</div>}

        {audioUrl && (
          <div className="compare-row">
            <span className="compare-label">聞き比べ</span>
            <audio controls src={audioUrl} style={{ height: 32 }} />
          </div>
        )}

        <div className="privacy-note">録音した声はこの端末内(ブラウザ)だけで再生され、どこにも送信・保存されません。次の単語に進む、またはタブを閉じると自動的に破棄されます。</div>
      </div>

      <button className="link-btn" onClick={nextWord}>
        <RotateCcw size={14} style={{ marginRight: 4 }} /> 次の単語へ
      </button>
    </div>
  );
}
