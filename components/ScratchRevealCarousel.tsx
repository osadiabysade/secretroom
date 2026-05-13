'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ScratchRevealCarouselProps {
  photos: string[];
  modelName: string;
  platformUrl: string;
}

export default function ScratchRevealCarousel({ photos, modelName, platformUrl }: ScratchRevealCarouselProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const rafRef = useRef<number>(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealPct, setRevealPct] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [started, setStarted] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    const grad = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width
    );
    grad.addColorStop(0, 'rgba(10,6,18,0.99)');
    grad.addColorStop(1, 'rgba(5,3,10,1)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(200,180,220,0.2)';
    ctx.font = `bold ${Math.max(13, canvas.width * 0.035)}px Raleway, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✦  toca y descubre  ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  // Reset everything when photo index changes
  useEffect(() => {
    setRevealPct(0);
    setShowCTA(false);
    setStarted(false);
    isDrawing.current = false;
    // Small delay so the new Image renders first
    const t = setTimeout(initCanvas, 50);
    return () => clearTimeout(t);
  }, [currentIdx, initCanvas]);

  useEffect(() => {
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas]);

  const getPos = (e: { clientX: number; clientY: number }, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    const radius = Math.max(40, canvas.width * 0.1);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.6);
    grad.addColorStop(0, 'rgba(0,0,0,0.85)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] < 128) transparent++;
    }
    const pct = Math.round((transparent / (data.length / 16)) * 100);
    setRevealPct(pct);
    if (pct >= 45) setShowCTA(true);
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    setStarted(true);
    scratch(getPos(e.nativeEvent, canvasRef.current!).x, getPos(e.nativeEvent, canvasRef.current!).y);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const pos = getPos(e.nativeEvent, canvasRef.current!);
    scratch(pos.x, pos.y);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(checkReveal);
  };
  const onMouseUp = () => { isDrawing.current = false; checkReveal(); };

  const onTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawing.current = true;
    setStarted(true);
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const t = e.touches[0];
    scratch((t.clientX - rect.left) * (canvas.width / rect.width), (t.clientY - rect.top) * (canvas.height / rect.height));
  };
  const onTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const t = e.touches[0];
    scratch((t.clientX - rect.left) * (canvas.width / rect.width), (t.clientY - rect.top) * (canvas.height / rect.height));
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(checkReveal);
  };
  const onTouchEnd = () => { isDrawing.current = false; checkReveal(); };

  const goNext = () => {
    if (currentIdx < photos.length - 1) setCurrentIdx(i => i + 1);
  };

  return (
    <div className="w-full max-w-md mx-auto select-none">
      {/* Photo counter */}
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="font-body text-[9px] tracking-[0.35em] uppercase" style={{ color: 'var(--model-muted)' }}>
          Foto {currentIdx + 1} de {photos.length}
        </p>
        {started && !showCTA && (
          <p className="font-body text-[9px] tracking-widest" style={{ color: 'var(--model-accent2)' }}>
            {revealPct}% revelado
          </p>
        )}
      </div>

      {/* Dot navigation */}
      <div className="flex gap-1.5 justify-center mb-4">
        {photos.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-400"
            style={{
              width: i === currentIdx ? '20px' : '6px',
              height: '6px',
              background: i === currentIdx ? 'var(--model-accent)' : 'var(--model-border)',
            }}
          />
        ))}
      </div>

      {/* Canvas container */}
      <div className="relative w-full aspect-[3/5] overflow-hidden rounded-sm" ref={containerRef}
        style={{ border: '1px solid var(--model-border)' }}>
        {/* Base image */}
        <Image
          key={currentIdx}
          src={photos[currentIdx]}
          alt={`${modelName} — foto ${currentIdx + 1}`}
          fill
          className="object-cover object-top"
          priority={currentIdx === 0}
        />

        {/* Scratch canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none"
          style={{ cursor: 'crosshair' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />

        {/* Progress bar */}
        {started && !showCTA && (
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-black/50">
            <motion.div
              className="h-full"
              style={{ background: 'var(--model-accent)' }}
              animate={{ width: `${revealPct}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {/* CTA overlay */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-5"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)' }}
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-heading italic text-center mb-4 text-base"
                style={{ color: 'var(--model-text)', fontWeight: 300 }}
              >
                Hay mucho más esperándote...
              </motion.p>
              <motion.a
                href={platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                className="btn-model px-6 py-3 text-[11px] tracking-[0.2em] font-body font-semibold rounded-sm w-full text-center mb-3"
              >
                <span>VER TODO EL CONTENIDO →</span>
              </motion.a>
              {currentIdx < photos.length - 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={goNext}
                  className="font-body text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-100"
                  style={{ color: 'var(--model-muted)', opacity: 0.7 }}
                >
                  siguiente foto ↓
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint pulse */}
        {!started && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl border"
              style={{ borderColor: 'var(--model-accent)', background: 'rgba(0,0,0,0.6)', boxShadow: '0 0 28px var(--model-glow)' }}
            >
              👆
            </div>
            <p className="font-body text-[9px] tracking-[0.35em] mt-2.5 uppercase" style={{ color: 'var(--model-muted)' }}>
              Descúbreme
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
