import { TerminalCommand } from "../TerminalCommand";
import { sleep } from "@/core/utils/helpers";

export class SudoCommand extends TerminalCommand {
  readonly name = "sudo";
  readonly description = "dành cho HR: sudo hire-me";

  async execute(args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    if (args[0] !== "hire-me") {
      e.printText("visitor không có quyền sudo. gợi ý: sudo hire-me", "t-warn");
      return;
    }

    const pwId = e.print("");
    let line = "[sudo] password for visitor: ";
    e.setLine(pwId, `<span class="t-w">${line}</span>`);
    for (let i = 0; i < 8; i++) {
      await sleep(70);
      line += "*";
      e.setLine(pwId, `<span class="t-w">${line}</span>`);
    }
    await sleep(420);
    e.printText("[ OK ] xác thực quyền hạn — được phê duyệt bởi dept-HR", "t-ok");
    await sleep(320);
    e.printText("chuẩn bị deploy offer-letter lên production...", "t-dim");

    const barId = e.print("");
    for (let i = 0; i <= 20; i++) {
      e.setLine(
        barId,
        `<span class="t-ok">${"█".repeat(i)}${"░".repeat(20 - i)}  ${i * 5}%</span>`,
      );
      await sleep(48);
    }
    await sleep(280);
    e.printText("[ OK ] offer-letter deployed thành công", "t-ok");
    e.print(
      `bước tiếp theo: gửi email tới <span class="t-acc">${ctx.profile.contact.email}</span> ` +
        `— hoặc gõ <span class="t-acc">contact</span>`,
    );
    e.print("");
  }
}