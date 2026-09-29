import { TerminalCommand } from "../TerminalCommand";
import { escapeHtml } from "@/core/utils/helpers";

export class WhoamiCommand extends TerminalCommand {
  readonly name = "whoami";
  readonly description = "tôi là ai, trong vài dòng";
  readonly aliases = ["about"];

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const { engine: e, profile: p } = ctx;
    e.print(
      `<span class="t-w">${escapeHtml(p.name)} — ${escapeHtml(p.role)} @ ${escapeHtml(p.currentCompany)}.</span>`,
    );
    e.printText(
      `Mỗi ngày giữ ~${p.workstationCount}+ workstation tại ${p.branchCount} chi nhánh ổn định,`,
      "t-dim",
    );
    e.printText("tối học Docker, Linux và automation để trở thành DevOps Engineer.", "t-dim");
    e.printText('Motto: "Mỗi ticket lặp lại là một automation đang chờ được sinh ra."', "t-dim");
    e.print("");
  }
}