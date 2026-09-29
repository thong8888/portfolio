"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Copy, ArrowUpRight, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import SectionHead from "./SectionHead";
import { ProfileData } from "@/core/data/ProfileData";
import { ToastBus } from "@/core/ui/ToastBus";

const profile = ProfileData.getInstance();

export default function Contact() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [resp, setResp] = useState<[string, string][] | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.contact.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    ToastBus.emit("Đã copy email vào clipboard");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const okEmail = /^\S+@\S+\.\S+$/.test(email);
    const okMsg = msg.trim().length > 0;
    setErrEmail(okEmail ? "" : "422 — email không hợp lệ");
    setErrMsg(okMsg ? "" : "422 — message không được để trống");
    if (!okEmail || !okMsg) {
      ToastBus.emit("422 — thiếu hoặc sai định dạng trường bắt buộc", "err");
      return;
    }

    // mô phỏng HTTP response — in ra typewriter
    const rows: [string, string][] = [
      ["HTTP/1.1 202 Accepted", "r-ok"],
      ["content-type: application/json", "r-dim"],
      [" ", "r-dim"],
      ["{", "r-txt"],
      ['  "status": "message_queued",', "r-txt"],
      [`  "recipient": "${profile.contact.email}",`, "r-txt"],
      [`  "from": "${email}",`, "r-acc"],
      ['  "eta_reply": "< 24h"', "r-txt"],
      ["}", "r-txt"],
    ];
    setResp([]);
    rows.forEach((_, i) => setTimeout(() => setResp(rows.slice(0, i + 1)), 55 * (i + 1)));

    window.location.href = `mailto:${profile.contact.email}?subject=${encodeURIComponent(
      "[Portfolio] Liên hệ từ " + email,
    )}&body=${encodeURIComponent(msg + "\n\n— " + email)}`;
    ToastBus.emit("202 Accepted — đang mở email client của bạn");
  };

  const endpoints = [
    {
      key: "email",
      icon: <Mail size={17} />,
      label: "email — bấm để copy",
      value: profile.contact.email,
      action: <Copy size={16} />,
      onClick: copyEmail,
    },
    {
      key: "phone",
      icon: <Phone size={17} />,
      label: "phone",
      value: profile.contact.phone,
      href: profile.contact.phoneHref,
      action: <ArrowUpRight size={16} />,
    },
    {
      key: "github",
      icon: <GithubIcon size={17} />,
      label: "github",
      value: profile.contact.github.replace("https://", ""),
      href: profile.contact.github,
      action: <ArrowUpRight size={16} />,
    },
    {
      key: "linkedin",
      icon: <LinkedinIcon size={17} />,
      label: "linkedin",
      value: profile.contact.linkedin.replace("https://", ""),
      href: profile.contact.linkedin,
      action: <ArrowUpRight size={16} />,
    },
    {
      key: "location",
      icon: <MapPin size={17} />,
      label: "location",
      value: profile.contact.location,
      action: null,
    },
  ];

  return (
    <section id="contact">
      <SectionHead num="06" path="contact" meta="POST /api/v1/contact" />
      <h2 className="reveal">
        Gửi request, tôi <span className="acc">respond</span> nhanh
      </h2>
      <div className="ct-grid">
        <div className="reveal">
          <p className="ct-copy">
            Bạn cần một người hiểu hạ tầng <strong>và cả người dùng</strong> của nó? Từ help
            desk tôi biết cách nói chuyện với user; từ Linux và Docker tôi đang học cách nói
            chuyện với server. Hộp thư luôn mở — uptime phản hồi{" "}
            <span className="mono">&lt; 24 giờ</span>, on-call thật sự.
          </p>
          <div className="eps">
            {endpoints.map((ep) =>
              ep.href ? (
                <a className="ep" key={ep.key} href={ep.href} target="_blank" rel="noopener">
                  <span className="ep-icon">{ep.icon}</span>
                  <span className="ep-body">
                    <span className="ep-label">{ep.label}</span>
                    <span className="ep-val">{ep.value}</span>
                  </span>
                  <span className="ep-act">{ep.action}</span>
                </a>
              ) : (
                <button
                  className="ep"
                  key={ep.key}
                  onClick={ep.onClick ?? undefined}
                  type={ep.onClick ? "button" : "submit"}
                  style={ep.onClick ? undefined : { cursor: "default" }}
                >
                  <span className="ep-icon">{ep.icon}</span>
                  <span className="ep-body">
                    <span className="ep-label">{ep.label}</span>
                    <span className="ep-val">{ep.value}</span>
                  </span>
                  {ep.action && <span className="ep-act">{ep.action}</span>}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="req reveal">
          <div className="req-head">
            <span className="mth">POST</span>
            <span>/api/v1/contact</span>
          </div>
          <form className="req-body" onSubmit={onSubmit} noValidate>
            <div className="fld">
              <label htmlFor="fEmail">your-email</label>
              <input
                id="fEmail"
                type="email"
                placeholder="hr@congty.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="f-err">{errEmail}</span>
            </div>
            <div className="fld">
              <label htmlFor="fMsg">message</label>
              <textarea
                id="fMsg"
                rows={5}
                placeholder="Chào Huy Thông, chúng tôi đang tìm Junior DevOps / SysAdmin cho..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <span className="f-err">{errMsg}</span>
            </div>
            <button type="submit" className="btn btn-acc btn-submit">
              <Send size={15} /> Gửi request
            </button>
          </form>
          {resp !== null && (
            <div className="req-resp on">
              {resp.map(([text, cls], i) => (
                <div className={`r-ln ${cls}`} key={i}>
                  {text === " " ? "\u00A0" : text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}