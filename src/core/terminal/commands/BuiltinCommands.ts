import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class LsCommand extends TerminalCommand {
  readonly name = "ls";
  readonly description = "liệt kê file trong ~/portfolio";

  async execute(_a: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    ctx.engine.printText(
      "about.txt   skills.yaml   experience.log   projects/   certs/   contact.json   motd.txt",
      "t-dim",
    );
  }
}

export class CatCommand extends TerminalCommand {
  readonly name = "cat";
  readonly description = "đọc file (thử: cat about.txt)";

  async execute(args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const f = args.join(" ");
    if (f === "about.txt" || f === "motd.txt") {
      await ctx.registry.find("whoami")?.execute([], ctx);
    } else {
      ctx.engine.printText(`cat: ${f || "thiếu đối số"}: no such file or directory`, "t-warn");
    }
  }
}

export class EchoCommand extends TerminalCommand {
  readonly name = "echo";
  readonly description = "in ra văn bản";

  async execute(args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    ctx.engine.printText(args.join(" "));
  }
}

export class DateCommand extends TerminalCommand {
  readonly name = "date";
  readonly description = "ngày giờ hiện tại";

  async execute(_a: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    ctx.engine.printText(new Date().toLocaleString("vi-VN"));
  }
}

export class HistoryCommand extends TerminalCommand {
  readonly name = "history";
  readonly description = "lịch sử lệnh đã gõ";

  async execute(_a: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    ctx.engine.historyList.forEach((h, i) =>
      ctx.engine.print(
        `<span class="t-dim">${String(i + 1).padStart(4)}</span>  ${escapeHtml(h)}`,
      ),
    );
  }
}

export class ClearCommand extends TerminalCommand {
  readonly name = "clear";
  readonly description = "xóa màn hình";

  async execute(_a: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    ctx.engine.clear();
  }
}