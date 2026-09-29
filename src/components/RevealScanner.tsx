"use client";

import { useEffect } from "react";

/** Quét mọi phần tử .reveal trên trang và bật hiệu ứng khi cuộn tới */
export default function RevealScanner() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}