"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage =
  | "idle"
  | "confirm"
  | "generating"
  | "showing"
  | "gone"
  | "already-done";

interface Props {
  artistName: string;
  artistId: string;
  threeWords: [string, string, string];
  poem: string;
  day: string;
  alreadyCompletedToday: boolean;
  onComplete: () => void;
}

export default function EphemeralExperience({
  artistName,
  artistId,
  threeWords,
  poem,
  day,
  alreadyCompletedToday,
  onComplete,
}: Props) {
  const [stage, setStage] = useState<Stage>(
    alreadyCompletedToday ? "already-done" : "idle"
  );
  const [countdown, setCountdown] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (stage !== "showing") return;

    const handleVisibility = () => {
      if (document.hidden) setStage("gone");
    };

    const handleKey = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) ||
        (e.ctrlKey && e.key === "p")
      ) {
        e.preventDefault();
        setStage("gone");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("keydown", handleKey);
    };
  }, [stage]);

  useEffect(() => {
    if (stage !== "showing") return;
    setCountdown(5);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setStage("gone");
          onComplete();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage, onComplete]);

  const generateUniqueVisual = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const seed = day + artistId + threeWords.join("") + poem.slice(0, 40) + Date.now();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const rand = () => {
      hash = (hash * 16807 + 7) % 2147483647;
      return (hash & 0x7fffffff) / 0x7fffffff;
    };

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);

    const layers = 12 + Math.floor(rand() * 8);
    for (let i = 0; i < layers; i++) {
      const x = rand() * w;
      const y = rand() * h;
      const r = 40 + rand() * 280;
      const alpha = 0.08 + rand() * 0.35;
      const hue = (hash + i * 47) % 360;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 70%, ${35 + rand() * 30}%, ${alpha})`;
      ctx.fill();
    }

    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(rand() * w, rand() * h);
      ctx.bezierCurveTo(rand() * w, rand() * h, rand() * w, rand() * h, rand() * w, rand() * h);
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 + rand() * 0.4})`;
      ctx.lineWidth = 1 + rand() * 3;
      ctx.stroke();
    }

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const n = (rand() - 0.5) * 18;
      data[i] = Math.min(255, Math.max(0, data[i] + n));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + n));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + n));
    }
    ctx.putImageData(imageData, 0, 0);
  }, [artistId, day, threeWords, poem]);

  const confirmYes = () => {
    setStage("generating");
    setTimeout(() => {
      setStage("showing");
      requestAnimationFrame(() => generateUniqueVisual());
    }, 2200);
  };

  if (stage === "already-done") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <p className="artist-name text-[var(--text-muted)] mb-4">EXPERIÊNCIA DO DIA</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-3">
          Você já viveu a experiência de hoje.
        </h2>
        <p className="text-[var(--text-secondary)] max-w-md">
          Volte amanhã. Uma nova obra nascerá. Uma única vez. Cinco segundos.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[70vh] flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {stage === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8 px-6 text-center"
          >
            <p className="artist-name text-[var(--accent)]">OBRA EFÊMERA</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight max-w-lg">
              Em 5 segundos esta imagem
              <br />deixará de existir para sempre.
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md">
              Só você a verá. Não há print. Não há volta.
            </p>
            <button
              onClick={() => setStage("confirm")}
              className="interactive pulse-live px-10 py-4 rounded-full bg-[var(--accent)] text-white font-medium"
            >
              Estou pronta para ver
            </button>
          </motion.div>
        )}

        {stage === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6 px-6 text-center"
          >
            <p className="artist-name text-[var(--text-muted)]">CONFIRMAÇÃO</p>
            <h2 className="text-2xl font-light">Tem certeza?</h2>
            <p className="text-[var(--text-secondary)] max-w-sm">
              Depois destes 5 segundos a obra some. Nunca mais poderá ser vista por ninguém.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setStage("idle")}
                className="interactive px-6 py-3 rounded-full border border-[var(--border-strong)] text-[var(--text-secondary)]"
              >
                Ainda não
              </button>
              <button
                onClick={confirmYes}
                className="interactive px-6 py-3 rounded-full bg-[var(--accent)] text-white"
              >
                Sim. Mostrar agora.
              </button>
            </div>
          </motion.div>
        )}

        {stage === "generating" && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-12 h-12 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
            <p className="artist-name text-[var(--text-muted)]">GERANDO A OBRA ÚNICA</p>
          </motion.div>
        )}

        {stage === "showing" && (
          <motion.div
            key="showing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black ephemeral-stage"
          >
            <canvas
              ref={canvasRef}
              width={1200}
              height={800}
              className="max-w-[92vw] max-h-[75vh] object-contain"
              style={{ boxShadow: "0 0 80px rgba(59, 130, 246, 0.15)" }}
            />
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="artist-name text-[var(--accent)]">{countdown}s</p>
              <p className="text-xs text-[var(--text-muted)] tracking-widest uppercase">
                Esta imagem deixará de existir
              </p>
            </div>
          </motion.div>
        )}

        {stage === "gone" && (
          <motion.div
            key="gone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-6 px-6 text-center min-h-[60vh]"
          >
            <p className="artist-name text-[var(--text-muted)]">A OBRA NÃO EXISTE MAIS</p>
            <h2 className="text-2xl md:text-4xl font-light tracking-tight max-w-lg">
              Você foi a única pessoa no mundo que a viu.
            </h2>
            <p className="text-[var(--text-secondary)] max-w-md italic">
              A vida é sua, estrague-a como quiser.
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-4">
              Provocações provocam ações
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
