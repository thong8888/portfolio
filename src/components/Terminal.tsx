"use client";

import { useEffect, useRef, useState } from "react";
import {
  getTerminalEngine,
  type TerminalSnapshot,
} from "@/core/terminal/TerminalEngine";
import { ToastBus } from "@/core/ui/ToastBus";

export default function Terminal() {
  const engine = getTerminalEngine();
  const [snap, setSnap] = useState<TerminalSnapshot>(() => engine.getSnapshot());
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsub = engine.subscribe(setSnap);
    engine.boot();
    return unsub;
  }, [engine]);

  // tự cuộn xuống mỗi khi có output mới
  useEffect(() => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  }, [snap]);

  // focus input sau khi boot xong (chỉ trên desktop)
  useEffect(() => {
    if (snap.ready && window.matchMedia("(pointer:fine)").matches) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [snap.ready]);

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    if (e.key === "Enter") {
      const value = el.value;
      el.value = "";
      const ok = await engine.submit(value);
      if (!ok) ToastBus.emit("Terminal đang bận — chờ lệnh hiện tại chạy xong", "err");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      el.value = engine.navigateHistory("up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      el.value = engine.navigateHistory("down");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const s = engine.suggest(el.value.trim());
      if (s.length === 1) el.value = s[0];
      else if (s.length > 1) engine.printText(s.join("   "), "t-dim");
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      engine.clear();
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      engine.printText("^C");
      el.value = "";
    }
  };

  const onRootClick = () => {
    if (window.getSelection()?.toString() === "" && snap.ready) {
      inputRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <div className="terminal" id="terminal" onClick={onRootClick}>
      <div className="term-bar">
        <span className="tb-dot" />
        <span className="tb-dot" />
        <span className="tb-dot" />
        <span className="tb-title">visitor@huythong: ~/portfolio — ssh</span>
      </div>
      <div className="term-body" ref={bodyRef}>
        {snap.lines.map((l) => (
          <div key={l.id} className="t-line" dangerouslySetInnerHTML={{ __html: l.html }} />
        ))}
      </div>
      {snap.ready && (
        <div className="term-input-row on">
          <span className="t-p">~/portfolio $</span>
          <input
            ref={inputRef}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
            onKeyDown={onKeyDown}
          />
        </div>
      )}
    </div>
  );
}