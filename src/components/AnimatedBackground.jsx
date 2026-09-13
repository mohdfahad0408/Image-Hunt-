import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const circuitCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  const circuitLinesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const circuitCanvas = circuitCanvasRef.current;
    if (!canvas || !circuitCanvas) return;

    const ctx = canvas.getContext('2d');
    const circuitCtx = circuitCanvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      circuitCanvas.width = window.innerWidth;
      circuitCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Determine particle count based on viewport
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const particleCount = isMobile ? 30 : isTablet ? 60 : 100;

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.4 + 0.1,
      alpha: 0,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    // Initialize circuit lines
    const spawnCircuitLine = () => {
      if (circuitLinesRef.current.length >= 5) return;
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height;
      const endX = startX + (Math.random() - 0.5) * 400;
      const endY = startY + (Math.random() - 0.5) * 400;
      circuitLinesRef.current.push({
        x1: startX, y1: startY,
        x2: endX, y2: endY,
        alpha: 0,
        phase: 'in', // in, hold, out
        life: 0,
        maxLife: 180 + Math.random() * 120,
      });
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let time = 0;
    let lastCircuitSpawn = 0;

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circuitCtx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw particles and constellation connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulse
        const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.5 + 0.5;
        p.alpha = p.baseAlpha * (0.5 + pulse * 0.5);

        // Cursor proximity interactions
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let targetAlpha = p.alpha;

        if (dist < 200) {
          const boost = 1 - dist / 200;
          targetAlpha = Math.min(1, p.alpha * (1 + boost * 2.5));
          
          // Connect particle to cursor
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(0, 217, 255, ${boost * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Gentle magnetic pull toward cursor
          p.x -= dx * 0.005;
          p.y -= dy * 0.005;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${targetAlpha})`;
        ctx.fill();

        // Glow for larger particles
        if (p.radius > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 217, 255, ${targetAlpha * 0.15})`;
          ctx.fill();
        }

        // Connect to nearby particles (Constellation effect)
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < 120) {
            const connectAlpha = (1 - dist2 / 120) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${connectAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw interactive soft glow around cursor
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.06)');
        gradient.addColorStop(0.5, 'rgba(108, 99, 255, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        ctx.beginPath();
        ctx.arc(mx, my, 300, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Spawn circuit lines occasionally
      if (time - lastCircuitSpawn > 120 + Math.random() * 180) {
        spawnCircuitLine();
        lastCircuitSpawn = time;
      }

      // Draw circuit lines
      circuitLinesRef.current = circuitLinesRef.current.filter((line) => {
        line.life++;
        const progress = line.life / line.maxLife;

        if (progress < 0.2) {
          line.alpha = progress / 0.2;
        } else if (progress > 0.8) {
          line.alpha = (1 - progress) / 0.2;
        } else {
          line.alpha = 1;
        }

        const finalAlpha = line.alpha * 0.06;
        circuitCtx.beginPath();
        circuitCtx.moveTo(line.x1, line.y1);
        circuitCtx.lineTo(line.x2, line.y2);
        circuitCtx.strokeStyle = `rgba(0, 217, 255, ${finalAlpha})`;
        circuitCtx.lineWidth = 0.5;
        circuitCtx.stroke();

        // Node dots at endpoints
        circuitCtx.beginPath();
        circuitCtx.arc(line.x1, line.y1, 2, 0, Math.PI * 2);
        circuitCtx.fillStyle = `rgba(0, 217, 255, ${finalAlpha * 2})`;
        circuitCtx.fill();

        circuitCtx.beginPath();
        circuitCtx.arc(line.x2, line.y2, 2, 0, Math.PI * 2);
        circuitCtx.fillStyle = `rgba(0, 217, 255, ${finalAlpha * 2})`;
        circuitCtx.fill();

        return line.life < line.maxLife;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <>
      {/* Layer A: Animated gradient */}
      <div className="bg-gradient-layer" />
      {/* Layer B: Engineering grid */}
      <div className="bg-grid-layer" />
      {/* Layer C: Particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      {/* Layer D: Circuit lines */}
      <canvas
        ref={circuitCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
    </>
  );
}
