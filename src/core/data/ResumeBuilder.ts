import { escapeHtml } from "@/core/utils/helpers";
import type { ProfileData } from "./ProfileData";

/** Hiển thị tên chứng chỉ đẹp trên CV in ra */
const CERT_TITLES: Record<string, string> = {
  "cisco/ccna": "CCNA — Cisco Certified Network Associate",
  "lpi/lpic-1": "LPIC-1 — Linux Professional Institute Certification",
  "hackerrank/react": "Frontend Developer (React) Certificate",
  "britishcouncil/aptis": "Aptis English Certificate — B2",
};

export class ResumeBuilder {
  constructor(private readonly profile: ProfileData) {}

  downloadPDF(): void {
    if (typeof window === "undefined") return;
    const w = window.open("", "_blank", "width=900,height=1100");
    if (!w) return;
    w.document.write(this.buildHTML());
    w.document.close();
    w.onafterprint = () => w.close();
    setTimeout(() => {
      w.focus();
      w.print();
    }, 400);
  }

  private buildHTML(): string {
    const p = this.profile;
    const c = p.contact;
    const e = escapeHtml;

    const certRows = p.certifications
      .map(
        (ct) =>
          `<li><b>${e(CERT_TITLES[ct.repo] ?? ct.repo)}</b> — ${e(ct.issuer)} — ${e(ct.issued)}${ct.status === "valid" ? "" : " (dự kiến)"}</li>`,
      )
      .join("");

    const skillRows = p.skills
      .map(
        (s) =>
          `<tr><td><b>${e(s.name)}</b></td><td>${e(s.note)}</td><td>${s.status === "production" ? "Dùng hằng ngày" : "Đang nâng cao"}</td></tr>`,
      )
      .join("");

    const expBlocks = p.experiences
      .filter((x) => x.kind !== "init")
      .map(
        (x) => `
        <div class="job">
          <div class="job-head">
            <span><b>${e(x.role)}</b> — ${e(x.org)}</span>
            <span class="date">${e(x.date)}</span>
          </div>
          <p>${e(x.desc)}</p>
          <ul>${x.stats.map((s) => `<li>${e(s.add ?? s.del ?? s.upt ?? "")}</li>`).join("")}</ul>
        </div>`,
      )
      .join("");

    const projRows = p.projects
      .map((pr) => `<li><b>${e(pr.slug)}</b>: ${e(pr.desc)} <i>(${e(pr.stack)})</i></li>`)
      .join("");

    return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<title>CV — ${e(p.name)}</title>
<style>
  @page { size: A4; margin: 13mm 15mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, "Segoe UI", sans-serif; color: #1a1a1a; font-size: 12.5px; line-height: 1.55; }
  header { border-bottom: 2.5px solid #1a1a1a; padding-bottom: 10px; margin-bottom: 12px; }
  h1 { font-size: 22px; }
  .role { font-size: 13px; color: #444; margin-top: 2px; }
  .contact { margin-top: 6px; font-size: 11.5px; color: #333; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #999; padding-bottom: 3px; margin: 13px 0 7px; }
  p { margin-bottom: 5px; }
  ul { margin: 3px 0 7px 17px; }
  li { margin-bottom: 2px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { text-align: left; border-bottom: 1px solid #ccc; padding: 3px 8px 3px 0; font-size: 10.5px; text-transform: uppercase; color: #555; }
  td { padding: 3px 8px 3px 0; border-bottom: 1px solid #eee; vertical-align: top; }
  .job { margin-bottom: 9px; }
  .job-head { display: flex; justify-content: space-between; gap: 10px; }
  .date { font-size: 11.5px; color: #555; white-space: nowrap; }
</style>
</head>
<body>
  <header>
    <h1>${e(p.name)}</h1>
    <div class="role">${e(p.role)}</div>
    <div class="contact">
      ${e(c.email)} · ${e(c.phone)} · ${e(c.location)}<br>
      GitHub: ${e(c.github)} · LinkedIn: ${e(c.linkedin)}
    </div>
  </header>

  <h2>Career Objective</h2>
  <p>IT professional với kinh nghiệm Help Desk thực tế (first-response dưới 1 phút theo SLA), nền tảng networking (CCNA) và Linux (LPIC-1), đang củng cố kỹ năng containerization (Docker) và automation (n8n). Mục tiêu: ${e(p.targetRole)}.</p>

  <h2>Certifications</h2>
  <ul>${certRows}</ul>

  <h2>Skills</h2>
  <table>
    <tr><th style="width:32%">Skill</th><th>Chi tiết</th><th style="width:22%">Mức độ</th></tr>
    ${skillRows}
  </table>

  <h2>Work Experience</h2>
  ${expBlocks}

  <h2>Projects</h2>
  <ul>${projRows}</ul>

  <h2>Education</h2>
  <p>${e(p.education)}</p>
</body>
</html>`;
  }
}