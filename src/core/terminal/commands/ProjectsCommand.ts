import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class ProjectsCommand extends TerminalCommand {
  readonly name = "projects";
  readonly description = "dự án đã làm";
  readonly aliases = ["services"];

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    const gh = ctx.profile.contact.github.replace("https://", "");
    for (const p of ctx.profile.projects) {
      e.print(`<span class="t-ok">▶</span> <span class="t-w">${p.slug}</span>`);
      e.printText(`    ${p.desc}`, "t-dim");
      e.print(
        `    <span class="t-dim">stack:</span> <span class="t-w">${escapeHtml(p.stack)}</span>  ` +
          `<span class="t-dim">·</span> <a href="${ctx.profile.contact.github}/${p.slug}" target="_blank" rel="noopener">${gh}/${p.slug}</a>`,
      );
    }
    e.print("");
  }
}