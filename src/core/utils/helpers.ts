/** Escape HTML cho mọi dữ liệu động trước khi đưa vào terminal */
const MAP: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };

export function escapeHtml(input: string): string {
  return input.replace(/[&<>]/g, (c) => MAP[c]);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}