import { CommandRegistry } from "./CommandRegistry";
import { createDefaultRegistry } from "./commands";
import { ProfileData } from "../data/ProfileData";
import { escapeHtml, sleep } from "../utils/helpers";

export interface TerminalLine {
  id: number;
  html: string;
}

export interface TerminalSnapshot {
  lines: TerminalLine[];
  ready: boolean;
  busy: boolean;
}

/**
 * Engine quản lý toàn bộ trạng thái terminal:
 * dòng output, lịch sử lệnh, boot sequence, uptime phiên.
 * React component chỉ subscribe — không chứa logic.
 */
export class TerminalEngine {
  private readonly registry: CommandRegistry;
  private readonly profile: ProfileData;
  private readonly listeners = new Set<(s: TerminalSnapshot) => void>();
  private lines: TerminalLine[] = [];
  private history: string[] = [];
  private historyIndex = 0;
  private nextId = 1;
  private booted = false;
  private booting = false;
  private readonly sessionStart = Date.now();
  ready = false;
  busy = false;

  constructor(registry: CommandRegistry, profile: ProfileData) {
    this.registry = registry;
    this.profile = profile;
  }

  // ===== Observer =====
  subscribe(fn: (s: TerminalSnapshot) => void): () => void {
    this.listeners.add(fn);
    fn(this.getSnapshot());
    return () => {
      this.listeners.delete(fn);
    };
  }

  getSnapshot(): TerminalSnapshot {
    return { lines: [...this.lines], ready: this.ready, busy: this.busy };
  }

  private notify(): void {
    const s = this.getSnapshot();
    this.listeners.forEach((f) => f(s));
  }

  // ===== Output =====
  print(html: string, cls = ""): number {
    const id = this.nextId++;
    const body = html === "" ? "&nbsp;" : cls ? `<span class="${cls}">${html}</span>` : html;
    this.lines.push({ id, html: body });
    this.notify();
    return id;
  }

  printText(text: string, cls = ""): number {
    return this.print(escapeHtml(text), cls);
  }

  setLine(id: number, html: string): void {
    const line = this.lines.find((l) => l.id === id);
    if (line) {
      line.html = html;
      this.notify();
    }
  }

  clear(): void {
    this.lines = [];
    this.notify();
  }

  // ===== Gõ lệnh như người thật (boot sequence) =====
  private async typeCommand(cmd: string): Promise<void> {
    const id = this.print("");
    let typed = "";
    for (const ch of cmd) {
      typed += ch;
      this.setLine(
        id,
        `<span class="t-p">~/portfolio $</span> <span class="t-txt">${escapeHtml(typed)}</span><span class="t-caret"></span>`,
      );
      await sleep(16 + Math.random() * 40);
    }
    await sleep(180);
    this.setLine(id, `<span class="t-p">~/portfolio $</span> <span class="t-cmd">${escapeHtml(cmd)}</span>`);
  }

  // ===== Thực thi lệnh =====
  async submit(input: string): Promise<boolean> {
    if (this.busy) return false;
    const cmd = input.trim();
    this.print(`<span class="t-p">~/portfolio $</span> <span class="t-cmd">${escapeHtml(cmd)}</span>`);
    if (!cmd) return true;

    this.history.push(cmd);
    this.historyIndex = this.history.length;

    const [name, ...args] = cmd.split(/\s+/);
    const command = this.registry.find(name.toLowerCase());
    if (!command) {
      this.printText(`zsh: command not found: ${name}`, "t-warn");
      this.printText("gõ 'help' để xem lệnh khả dụng", "t-dim");
      return true;
    }

    this.busy = true;
    this.notify();
    try {
      await command.execute(args, {
        engine: this,
        profile: this.profile,
        registry: this.registry,
      });
    } catch (err) {
      this.printText(`lỗi thực thi lệnh: ${String(err)}`, "t-err");
    } finally {
      this.busy = false;
      this.notify();
    }
    return true;
  }

  // ===== History & gợi ý =====
  get historyList(): readonly string[] {
    return this.history;
  }

  navigateHistory(dir: "up" | "down"): string {
    if (dir === "up" && this.historyIndex > 0) this.historyIndex--;
    if (dir === "down" && this.historyIndex < this.history.length) this.historyIndex++;
    return this.history[this.historyIndex] ?? "";
  }

  suggest(input: string): string[] {
    if (!input) return [];
    const extra = ["sudo hire-me", "cat about.txt"];
    return [...this.registry.names, ...extra].filter((c) => c.startsWith(input));
  }

  sessionUptime(): string {
    const s = Math.floor((Date.now() - this.sessionStart) / 1000);
    const p = (n: number) => String(n).padStart(2, "0");
    return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
  }

  // ===== Boot sequence =====
  async boot(): Promise<void> {
    if (this.booted || this.booting) return;
    this.booting = true;

    await sleep(450);
    await this.typeCommand("ssh visitor@huythong.dev");
    this.printText("Welcome to Portfolio 1.0.0 LTS (GNU/Linux x86_64)", "t-dim");
    this.printText(`Last login: ${new Date().toLocaleString("vi-VN")} from your browser`, "t-dim");
    await sleep(300);
    await this.typeCommand("./init --profile");
    this.printText("[ OK ] nạp profile huy-thong ............... done", "t-ok");
    this.printText("[ OK ] kết nối helpdesk queue (100+/tháng) .. done", "t-ok");
    await sleep(260);
    await this.typeCommand("cat motd.txt");
    this.print("");
    this.print(
      `Chào mừng đến portfolio của <span class="t-acc">${escapeHtml(this.profile.name)}</span> ` +
        `— <span class="t-w">${escapeHtml(this.profile.role)}</span>.`,
    );
    this.printText("Terminal này là thật: gõ lệnh được, có history, có tab-complete.", "t-dim");
    this.print(
      `Gõ <span class="t-acc">help</span> để xem lệnh — thử <span class="t-acc">neofetch</span> hoặc <span class="t-acc">sudo hire-me</span>.`,
    );
    this.print("");

    this.booted = true;
    this.booting = false;
    this.ready = true;
    this.notify();
  }
}

// ===== Singleton cho toàn app =====
let engineInstance: TerminalEngine | null = null;

export function getTerminalEngine(): TerminalEngine {
  return (engineInstance ??= new TerminalEngine(
    createDefaultRegistry(),
    ProfileData.getInstance(),
  ));
}