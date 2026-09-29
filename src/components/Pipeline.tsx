"use client";

import { useEffect, useRef } from "react";

const STAGES = ["git push", "build", "test", "scan", "deploy", "monitor"];

/** Chấm sáng chạy qua các stage CI/CD — dừng khi rời viewport để tiết kiệm CPU */
export default function Pipeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    if (!wrap || !dot) return;

    let visible = false;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0.3 },
    );
    io.observe(wrap);

    const LOOP = 5200;
    const t0 = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      if (visible) {
        const w = wrap.clientWidth;
        const d = dot.offsetWidth;
        const x = (((now - t0) % LOOP) / LOOP) * (w - d);
        dot.style.transform = `translateX(${x}px)`;
        const cx = x + d / 2;
        wrap.querySelectorAll<HTMLElement>(".pl-stage").forEach((st) => {
          const l = st.offsetLeft;
          st.classList.toggle("on", cx >= l && cx <= l + st.offsetWidth);
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div className="pipeline" ref={wrapRef}>
      {STAGES.map((s, i) => (
        <span key={s} style={{ display: "contents" }}>
          {i > 0 && <span className="pl-link" />}
          <div className="pl-stage" style={{ ["--i" as string]: i }}>
            {s}
          </div>
        </span>
      ))}
      <div className="pl-dot" ref={dotRef} />
    </div>
  );
}