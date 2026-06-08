"use client";
import { useEffect } from "react";

export default function HomeEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Glass specular highlight + background parallax
    const glassTiles = document.querySelectorAll<HTMLElement>(".glass");
    const handlePointer = (e: PointerEvent) => {
      for (const el of glassTiles) {
        const r = el.getBoundingClientRect();
        if (
          e.clientX < r.left - 60 || e.clientX > r.right + 60 ||
          e.clientY < r.top - 60 || e.clientY > r.bottom + 60
        ) continue;
        el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
      }
      if (!reduce) {
        const dx = (e.clientX / window.innerWidth - 0.5) * 26;
        const dy = (e.clientY / window.innerHeight - 0.5) * 26;
        document.body.style.setProperty("--px", dx.toFixed(1) + "px");
        document.body.style.setProperty("--py", dy.toFixed(1) + "px");
      }
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });

    // Scroll reveals
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      }
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Hero entrance
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll(".anim-up").forEach((el) => el.classList.add("is-in"));
      });
    });

    // Safety net for stuck animations
    const safetyTimer = setTimeout(() => {
      document.documentElement.classList.add("force-show");
    }, 1500);

    // Redline positioning
    function layoutRedline() {
      const layer = document.querySelector<HTMLElement>(".redline-layer");
      const hero = document.querySelector<HTMLElement>(".hero");
      if (!layer || !hero) return;
      const rect = hero.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      layer.style.top = top + "px";
      layer.style.left = (rect.left + window.scrollX) + "px";
      layer.style.width = rect.width + "px";
      layer.style.height = rect.height + "px";
    }
    layoutRedline();
    window.addEventListener("resize", layoutRedline, { passive: true });
    const redlineTimers = [300, 1000, 1700].map((ms) => setTimeout(layoutRedline, ms));

    // Drifting ember canvas
    if (!reduce) {
      const canvas = document.querySelector<HTMLCanvasElement>("canvas.embers");
      if (canvas) {
        const c = canvas;
        const ctx = c.getContext("2d")!;
        let w = 0, h = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        type Spark = {
          x: number; y: number; r: number; vy: number;
          drift: number; phase: number; tw: number; warm: boolean; base: number;
        };
        let sparks: Spark[] = [];

        function makeSpark(initial: boolean): Spark {
          const r = 0.7 + Math.random() * 2.1;
          return {
            x: Math.random() * w,
            y: initial ? Math.random() * h : h + 20,
            r,
            vy: 0.12 + Math.random() * 0.42,
            drift: (Math.random() - 0.5) * 0.35,
            phase: Math.random() * Math.PI * 2,
            tw: 0.6 + Math.random() * 1.6,
            warm: Math.random() < 0.32,
            base: 0.18 + Math.random() * 0.5,
          };
        }

        function resize() {
          w = c.clientWidth;
          h = c.clientHeight;
          c.width = w * dpr;
          c.height = h * dpr;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          const count = Math.round(Math.min(46, Math.max(20, w / 36)));
          sparks = Array.from({ length: count }, () => makeSpark(true));
        }

        let t = 0;
        let rafId: number;
        function frame() {
          t += 0.016;
          ctx.clearRect(0, 0, w, h);
          ctx.globalCompositeOperation = "lighter";
          for (const s of sparks) {
            s.y -= s.vy;
            s.x += s.drift + Math.sin(t * 0.5 + s.phase) * 0.18;
            if (s.y < -20) Object.assign(s, makeSpark(false));
            const a = s.base * (0.55 + 0.45 * Math.sin(t * s.tw + s.phase));
            const col = s.warm ? "232,160,69" : "226,56,56";
            const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
            g.addColorStop(0, `rgba(${col},${a.toFixed(3)})`);
            g.addColorStop(1, `rgba(${col},0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalCompositeOperation = "source-over";
          rafId = requestAnimationFrame(frame);
        }

        resize();
        window.addEventListener("resize", resize, { passive: true });
        rafId = requestAnimationFrame(frame);

        return () => {
          window.removeEventListener("pointermove", handlePointer);
          window.removeEventListener("resize", layoutRedline);
          window.removeEventListener("resize", resize);
          io.disconnect();
          clearTimeout(safetyTimer);
          redlineTimers.forEach(clearTimeout);
          cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("resize", layoutRedline);
      io.disconnect();
      clearTimeout(safetyTimer);
      redlineTimers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
