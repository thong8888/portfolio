import type { ProfileData } from "./ProfileData";

/** Đóng gói CV dạng text từ ProfileData và cho phép tải về */
export class ResumeBuilder {
  constructor(private readonly profile: ProfileData) {}

  build(): string {
    const p = this.profile;
    const c = p.contact;
    const L: string[] = [];

    L.push(p.name.toUpperCase());
    L.push("IT SUPPORT | ASPIRING DEVOPS ENGINEER");
    L.push("=".repeat(52));
    L.push(`Email: ${c.email} | Phone: ${c.phone}`);
    L.push(`GitHub: ${c.github} | LinkedIn: ${c.linkedin}`);
    L.push(`Location: ${c.location} | Birth: ${p.birthDate}`);
    L.push("");
    L.push("CAREER OBJECTIVE");
    L.push(
      "IT professional voi kinh nghiem Help Desk thuc te (SLA first-response < 1 phut),",
    );
    L.push(
      "nen tang networking (CCNA) va Linux (LPIC-1), dang cau thuc hanh Docker va n8n.",
    );
    L.push(`Muc tieu: ${p.targetRole}.`);
    L.push("");
    L.push("CERTIFICATIONS");
    p.certifications.forEach((ct) =>
      L.push(`- ${ct.repo} [${ct.tag}] — ${ct.issuer} — ${ct.issued} — ${ct.status}`),
    );
    L.push("");
    L.push("SKILLS");
    p.skills.forEach((s) => L.push(`- ${s.name} (${s.category}) — ${s.note} [${s.status}]`));
    L.push("");
    L.push("WORK EXPERIENCE");
    p.experiences.forEach((x) => {
      L.push(`[${x.date}] ${x.role} · ${x.org}`);
      L.push(`  ${x.desc}`);
      L.push(
        "  " +
          x.stats
            .map((s) => s.add ?? s.del ?? s.upt ?? "")
            .join(" | "),
      );
      L.push("");
    });
    L.push("PROJECTS");
    p.projects.forEach((pr) => L.push(`- ${pr.slug}: ${pr.desc} (${pr.stack})`));
    L.push("");
    L.push("EDUCATION");
    L.push(`- ${p.education}`);
    L.push("");
    L.push(`— Tao tu portfolio terminal · ${new Date().getFullYear()}`);
    return L.join("\n");
  }

  download(filename = "NguyenHuyThong_CV.txt"): void {
    if (typeof document === "undefined") return; // chỉ chạy ở client
    const blob = new Blob([this.build()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}