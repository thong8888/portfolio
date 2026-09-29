"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { ToastBus, type ToastType } from "@/core/ui/ToastBus";

interface ToastItem {
  id: number;
  msg: string;
  type: ToastType;
}

let nextId = 0;

export default function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(
    () =>
      ToastBus.subscribe((msg, type) => {
        const id = ++nextId;
        setItems((prev) => [...prev, { id, msg, type }]);
        setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3400);
      }),
    [],
  );

  return (
    <div id="toasts">
      {items.map((t) => (
        <div key={t.id} className={`toast${t.type === "err" ? " err" : ""}`}>
          {t.type === "err" ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}