import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class ExperienceCommand extends TerminalCommand {
  readonly name = "experience";
  readonly description = "lịch sử nghề nghiệp (git log)";
  readonly aliases = ["career", "log"];

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    for (const x of ctx.profile.experiences) {
      e.print(
        `<span class="t-dim">*</span> <span class="t-warn">${x.hash}</span> ` +
          `<span class="t-acc">${escapeHtml(x.refs)}</span>  ` +
          `<span class="t-w">${escapeHtml(x.role)} · ${escapeHtml(x.org)}</span>`,
      );
      e.printText(`    ${x.date} — ${x.desc}`, "t-dim");
      const parts = x.stats.map((s) => {
        if (s.add) return `<span class="t-ok">+ ${escapeHtml(s.add)}</span>`;
        if (s.del) return `<span class="t-err">− ${escapeHtml(s.del)}</span>`;
        return `<span class="t-dim">~ ${escapeHtml(s.upt ?? "")}</span>`;
      });
      e.print(`    ${parts.join('<span class="t-dim"> · </span>')}`);
    }
    e.print("");
  }
}