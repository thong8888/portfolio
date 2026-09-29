"use client";

import { Terminal as TerminalIcon, Download } from "lucide-react";
import TerminalView from "./Terminal";
import { ProfileData } from "@/core/data/ProfileData";
import { ResumeBuilder } from "@/core/data/ResumeBuilder";

const profile = ProfileData.getInstance();

export default function Hero() {
  const openTerminal = () => {
    document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const downloadCV = () => new ResumeBuilder(profile).downloadPDF();

  return (
    <header className="hero container">
      <div className="hero-copy">
        <div className="eyebrow">
          ~/portfolio <span className="dim">·</span> NGUYỄN HUY THÔNG{" "}
          <span className="dim">·</span> IT SUPPORT → DEVOPS
        </div>
        <h1>
          Từ Help Desk đến <span className="acc">DevOps Engineer</span>.
        </h1>
        <p className="hero-p">
          Xin chào, tôi là <strong>Huy Thông</strong> — mỗi ngày giữ{" "}
          <strong>700+ workstation</strong> tại <strong>361 chi nhánh</strong> J&amp;T Express
          chạy ổn định với SLA phản hồi dưới 1 phút. Tối tôi học{" "}
          <strong>Docker, Linux và automation</strong> — vì tôi tin mỗi ticket lặp lại đều là
          một automation đang chờ ra đời.
        </p>
        <div className="hero-stats">
          <span><b>100+</b> tickets/tháng</span>
          <span><b>361</b> chi nhánh</span>
          <span><b>700+</b> workstation</span>
        </div>
        <div className="hero-btns">
          <button className="btn btn-acc" onClick={openTerminal}>
            <TerminalIcon size={15} /> Mở terminal
          </button>
          <button className="btn" onClick={downloadCV}>
            <Download size={15} /> Tải CV
          </button>
        </div>
      </div>
      <div className="hero-term">
        <TerminalView />
        <p className="term-hint">
          terminal này là thật — gõ <code>help</code> để bắt đầu, thử{" "}
          <code>neofetch</code> hoặc <code>sudo hire-me</code>
        </p>
      </div>
    </header>
  );
}