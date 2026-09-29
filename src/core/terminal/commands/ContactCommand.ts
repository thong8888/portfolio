import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class ContactCommand extends TerminalCommand {
  readonly name = "contact";
  readonly description = "cách liên hệ nhanh";

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    const c = ctx.profile.contact;
    const gh = c.github.replace("https://", "");
    const li = c.linkedin.replace("https://", "");
    e.print(`<span class="t-dim">email    :</span> <span class="t-w">${escapeHtml(c.email)}</span>`);
    e.print(`<span class="t-dim">phone    :</span> <span class="t-w">${escapeHtml(c.phone)}</span>`);
    e.print(`<span class="t-dim">github   :</span> <a href="${c.github}" target="_blank" rel="noopener">${gh}</a>`);
    e.print(`<span class="t-dim">linkedin :</span> <a href="${c.linkedin}" target="_blank" rel="noopener">${li}</a>`);
    e.print(`<span class="t-dim">location :</span> <span class="t-w">${escapeHtml(c.location)}</span>`);
    e.printText("response : thường trong 24 giờ — SLA helpdesk đã ăn vào máu", "t-dim");
    e.print("");
  }
}