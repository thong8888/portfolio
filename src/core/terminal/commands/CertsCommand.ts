import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class CertsCommand extends TerminalCommand {
  readonly name = "certs";
  readonly description = "chứng chỉ (docker images)";
  readonly aliases = ["certifications"];

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    e.print("REPOSITORY                  TAG           ISSUER            ISSUED     STATUS", "t-head");
    for (const c of ctx.profile.certifications) {
      const st =
        c.status === "valid"
          ? '<span class="t-ok">● valid</span>'
          : '<span class="t-warn">◌ pulling…</span>';
      e.print(
        `${escapeHtml(c.repo.padEnd(28))}<span class="t-dim">${escapeHtml(c.tag.padEnd(14))}` +
          `${escapeHtml(c.issuer.padEnd(18))}${escapeHtml(c.issued.padEnd(11))}</span>${st}`,
      );
    }
    e.print("");
  }
}