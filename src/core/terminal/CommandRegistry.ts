import type { TerminalCommand } from "./TerminalCommand";

/** Đăng ký / tra cứu lệnh theo tên hoặc alias */
export class CommandRegistry {
  private readonly commands = new Map<string, TerminalCommand>();
  private readonly aliasMap = new Map<string, string>();

  register(...cmds: TerminalCommand[]): this {
    for (const c of cmds) {
      this.commands.set(c.name, c);
      for (const a of c.aliases) this.aliasMap.set(a, c.name);
    }
    return this;
  }

  find(name: string): TerminalCommand | undefined {
    return this.commands.get(this.aliasMap.get(name) ?? name);
  }

  /** Danh sách lệnh chính (thứ tự đăng ký) */
get all(): TerminalCommand[] {
  return Array.from(this.commands.values());
}

get names(): string[] {
  return Array.from(this.commands.keys()).concat(Array.from(this.aliasMap.keys()));
}
}