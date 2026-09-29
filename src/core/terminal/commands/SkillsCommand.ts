import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class SkillsCommand extends TerminalCommand {
  readonly name = "skills";
  readonly description = "tech stack & mức độ thành thạo";

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    e.print("NAME                         CATEGORY            NOTE                           STATUS", "t-head");
    for (const s of ctx.profile.skills) {
      const ok = s.status === "production";
      e.print(
        `${escapeHtml(s.name.padEnd(29))}<span class="t-dim">${escapeHtml(s.category.padEnd(20))}${escapeHtml(s.note.padEnd(31))}</span>` +
          `<span class="${ok ? "t-ok" : "t-warn"}">${ok ? "●" : "◌"} ${s.status}</span>`,
      );
    }
    e.print("");
  }
}