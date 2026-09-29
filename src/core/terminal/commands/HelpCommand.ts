import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class HelpCommand extends TerminalCommand {
  readonly name = "help";
  readonly description = "danh sách lệnh khả dụng";

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    e.printText("Các lệnh khả dụng:", "t-w");
    for (const c of ctx.registry.all) {
      const label = c.aliases.length ? `${c.name} | ${c.aliases.join("|")}` : c.name;
      e.print(
        `  <span class="t-acc">${label.padEnd(18)}</span><span class="t-dim">${escapeHtml(c.description)}</span>`,
      );
    }
    e.print(`  <span class="t-dim">và: ls · cat about.txt · echo · date · history · clear (Ctrl+L)</span>`);
    e.print("");
  }
}