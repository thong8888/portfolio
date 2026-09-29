import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

const ART = [
  "       .--.      ",
  "      |o_o |     ",
  "      |:_/ |     ",
  "     //   \\ \\    ",
  "    (|     | )   ",
  "   /'\\_   _/`\\   ",
  "   \\___)=(___/   ",
];

export class NeofetchCommand extends TerminalCommand {
  readonly name = "neofetch";
  readonly description = "thông số hệ thống cá nhân";

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    const p = ctx.profile;
    const info = [
      `${p.firstName.toLowerCase()}@portfolio`,
      "-----------------",
      "OS:      Windows + Linux (dual boot)",
      `Host:    IT Support @ ${p.currentCompany}`,
      "Kernel:  LPIC-1 · CCNA · React · Aptis B2",
      `Uptime:  1+ năm giữ ${p.workstationCount}+ workstation ổn định`,
      "Shell:   bash — đang luyện thêm zsh",
      `Monitor: ${p.branchCount} chi nhánh qua CCTV`,
      `Tickets: ${p.ticketsPerMonth}+/tháng · response < 1 phút`,
      "Editor:  VS Code",
    ];
    const rows: string[] = [];
    for (let i = 0; i < Math.max(ART.length, info.length); i++) {
      rows.push(
        `<span class="t-acc">${escapeHtml((ART[i] ?? "").padEnd(21))}</span>` +
          `<span class="t-w">${escapeHtml(info[i] ?? "")}</span>`,
      );
    }
    e.print(`<pre class="t-pre">${rows.join("\n")}</pre>`);
    e.print("");
  }
}