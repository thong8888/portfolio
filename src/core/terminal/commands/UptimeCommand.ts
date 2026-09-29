import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class UptimeCommand extends TerminalCommand {
  readonly name = "uptime";
  readonly description = "thời gian phiên & nghề nghiệp";

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    const p = ctx.profile;
    e.print(`<span class="t-dim">session :</span> <span class="t-w">${e.sessionUptime()}</span>`);
    e.print(
      `<span class="t-dim">career  :</span> <span class="t-w">1+ năm IT support — ${p.workstationCount}+ workstation, ${p.branchCount} chi nhánh</span> ` +
        `<span class="t-dim">(và chưa bỏ lỡ SLA nào)</span>`,
    );
    e.print("");
  }
}