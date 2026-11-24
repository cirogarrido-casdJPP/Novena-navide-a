import React, { useEffect, useRef } from 'react';

interface CelebrationBurstProps {
  active: boolean;
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  vRot: number;
  isStar: boolean;
}

/**
 * Efecto visual festivo en Canvas al marcar un día de la Novena como realizado.
 * Respeta prefers-reduced-motion.
 */
export const CelebrationBurst: React.FC<CelebrationBurstProps> = ({ active, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const t = window.setTimeout(onComplete, 900);
      return () => window.clearTimeout(t);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#D97706', '#FDE68A', '#14532D', '#991B1B', '#F59E0B', '#FFFFFF'];
    const particles: Particle[] = [];

    const originX = canvas.width / 2;
    const originY = canvas.height * 0.42;

    for (let i = 0; i < 85; i++) {
      const angle = (Math.PI * 2 * i) / 85 + (Math.random() - 0.5) * 0.35;
      const speed = 3.5 + Math.random() * 8.5;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.2,
        size: 5 + Math.random() * 6,
        color: colors[i % colors.length],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.16,
        isStar: i % 3 === 0,
      });
    }

    let frameId = 0;
    let frame = 0;

    const drawStar = (cx: number, cy: number, spikes: number, outerR: number, innerR: number) => {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
        rot += step;
      }
      ctx.closePath();
      ctx.fill();
    };

    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.19;
        p.vx *= 0.99;
        p.rotation += p.vRot;
        p.alpha = Math.max(0, p.alpha - 0.011);

        if (p.alpha > 0.02) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;

          if (p.isStar) {
            drawStar(0, 0, 5, p.size, p.size * 0.45);
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
          }
          ctx.restore();
        }
      }

      if (alive && frame < 140) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete();
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
};
