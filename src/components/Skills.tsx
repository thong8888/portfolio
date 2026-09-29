"use client";

import { useEffect, useRef } from "react";
import SectionHead from "./SectionHead";
import { ProfileData } from "@/core/data/ProfileData";

const profile = ProfileData.getInstance();

export default function Skills() {
  const tableRef = useRef<HTMLDivElement>(null);

  // stagger: các dòng kỹ năng xuất hiện lần lượt khi cuộn tới
  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const rows = el.querySelectorAll(".sk-row");
        rows.forEach((r, i) => setTimeout(() => r.classList.add("in"), i * 65));
        setTimeout(
          () => el.querySelector(".sk-foot")?.classList.add("in"),
          rows.length * 65 + 150,
        );
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const prod = profile.skills.filter((s) => s.status === "production").length;
  const stg = profile.skills.length - prod;

  return (
    <section id="skills">
      <SectionHead num="02" path="skills" meta="kubectl get skills -n huythong" />
      <h2 className="reveal">
        Công cụ tôi dùng <span className="acc">mỗi ngày</span>
      </h2>
      <div className="sk-grid">
        <div>
          <div className="sk-cmd reveal">
            <b>$</b> kubectl get skills -n huythong --sort-by=.status
          </div>
          <div className="sk-table reveal" ref={tableRef}>
            <div className="sk-head">
              <span>name</span>
              <span className="h-cat">category</span>
              <span className="h-note">note</span>
              <span>status</span>
            </div>
            {profile.skills.map((s) => (
              <div className="sk-row pre" key={s.name}>
                <span className="sk-name">{s.name}</span>
                <span className="sk-cat">{s.category}</span>
                <span className="sk-note">{s.note}</span>
                <span className={`sk-st st-${s.status}`}>
                  <span className={`dot ${s.status === "production" ? "dot-live" : "dot-stage"}`} />
                  {s.status}
                </span>
              </div>
            ))}
            <div className="sk-foot pre">
              {profile.skills.length} tools · {prod} production · {stg} staging · cập nhật
              theo CV 2025
            </div>
          </div>
        </div>
        <div className="principles reveal">
          <h3>Nguyên tắc làm việc</h3>
          <div className="pr-item">
            <span className="mk">&gt;</span>
            <span><b>Phản hồi nhanh</b> — user chờ 1 phút là 1 phút mất niềm tin.</span>
          </div>
          <div className="pr-item">
            <span className="mk">&gt;</span>
            <span><b>Fix tận gốc</b> — không vá bằng cách restart rồi đi tiếp.</span>
          </div>
          <div className="pr-item">
            <span className="mk">&gt;</span>
            <span><b>Automation</b> — việc lặp lại lần thứ hai là việc của máy.</span>
          </div>
          <div className="pr-item">
            <span className="mk">&gt;</span>
            <span><b>Tài liệu hóa</b> — kiến thức không ghi lại là kiến thức bị mất.</span>
          </div>
          <p className="pr-note">
            // <i>status: staging</i> nghĩa là đang trong quá trình nâng lên production — tôi
            trung thực về mức độ của mình.
          </p>
        </div>
      </div>
    </section>
  );
}