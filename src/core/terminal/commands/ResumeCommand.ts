import { TerminalCommand } from "../TerminalCommand";
import { ResumeBuilder } from "@/core/data/ResumeBuilder";

export class ResumeCommand extends TerminalCommand {
  readonly name = "resume";
  readonly description = "tải CV (.txt)";
  readonly aliases = ["cv"];

  async execute(_args: string[], ctx: Parameters<TerminalCommand["execute"]>[1]): Promise<void> {
    const e = ctx.engine;
    e.printText("đang đóng gói CV từ dữ liệu hiện có...", "t-dim");
    new ResumeBuilder(ctx.profile).downloadPDF();
    e.print(`<span class="t-ok">[ OK ]</span> <span class="t-w">đã tải NguyenHuyThong_CV.txt</span>`);
    e.print("");
  }
}