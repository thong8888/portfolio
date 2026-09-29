"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

function formatUptime(seconds: number): string {
  return `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;
}

export default function StatusBar() {
  const [time, setTime] = useState<{ clock: string; up: string } | null>(null);

  useEffect(() => {
    const t0 = Date.now();
    const tick = () => {
      const s = Math.floor((Date.now() - t0) / 1000);
      setTime({
        clock: new Date().toLocaleTimeString("vi-VN", { hour12: false }),
        up: formatUptime(s),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="statusbar">
      <div className="sb-left">
        <span className="dot dot-live" />
        <span className="mono sb-user">huythong@portfolio</span>
        <span className="mono hide-sm sb-sess">— session: hr-viewer</span>
      </div>
      <nav className="sb-nav">
        <a href="#identity">identity</a>
        <a href="#skills">skills</a>
        <a href="#certifications">certs</a>
        <a href="#career">career</a>
        <a href="#projects">projects</a>
        <a href="#contact">contact</a>
      </nav>
      <div className="sb-right">
        <span className="hide-sm">
          <b>{time ? time.clock : "--:--:--"}</b>
        </span>
        <span className="hide-sm sep">·</span>
        <span>
          up <b>{time ? time.up : "00:00:00"}</b>
        </span>
      </div>
    </div>
  );
}