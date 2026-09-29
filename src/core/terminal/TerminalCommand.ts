import type { TerminalEngine } from "./TerminalEngine";
import type { CommandRegistry } from "./CommandRegistry";
import type { ProfileData } from "../data/ProfileData";

/** Ngữ cảnh được truyền vào mỗi lệnh khi thực thi */
export interface CommandContext {
  engine: TerminalEngine;
  profile: ProfileData;
  registry: CommandRegistry;
}

/**
 * Lớp cha trừu tượng cho mọi lệnh terminal.
 * Muốn thêm lệnh mới: tạo class extends TerminalCommand
 * rồi register trong commands/index.ts — không cần sửa engine.
 */
export abstract class TerminalCommand {
  abstract readonly name: string;
  abstract readonly description: string;
  readonly aliases: string[] = [];
  abstract execute(args: string[], ctx: CommandContext): void | Promise<void>;
}