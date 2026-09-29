import type { Project } from "@/lib/types";

/** Repo thô từ GitHub REST API (chỉ lấy những field mình dùng) */
interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

export interface GitHubConfig {
  username: string;
  /** CHỈ hiển thị những repo này, đúng thứ tự liệt kê. Để [] = tự lấy theo priority + last push */
  onlyRepos: string[];
  maxRepos: number;
  includeForks: boolean;
  priorityRepos: string[];
  cacheTtlMs: number;
}

const DEFAULT_CONFIG: GitHubConfig = {
  username: "thong8888",
  // ===== SỬA DANH SÁCH REPO MUỐN HIỂN THỊ TẠI ĐÂY =====
  // muốn ẩn repo nào: xóa dòng đó đi. muốn thêm: thêm tên vào.
  // thứ tự liệt kê = thứ tự hiển thị trên trang
  onlyRepos: [
    "portfolio",
    "web-docker",
    "card-flip-game",
    "snake-game",
    "learn-DevOp",
    "Study-DevOps",
  ],
  // =====================================================
  maxRepos: 6,
  includeForks: false,
  priorityRepos: [],
  cacheTtlMs: 10 * 60 * 1000,
};

/**
 * Gọi GitHub public API, map sang domain Project.
 * Singleton + cache TTL: trang và terminal dùng chung một lần fetch.
 */
export class GitHubService {
  private static instance: GitHubService | null = null;
  private cache: { data: Project[]; at: number } | null = null;
  private inflight: Promise<Project[]> | null = null;

  static getInstance(): GitHubService {
    return (GitHubService.instance ??= new GitHubService());
  }

  private constructor(private readonly config: GitHubConfig = DEFAULT_CONFIG) {}

  private async fetchRepos(): Promise<GitHubRepo[]> {
    const res = await fetch(
      `https://api.github.com/users/${this.config.username}/repos?sort=pushed&per_page=100&direction=desc`,
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return res.json();
  }

  private toProject(r: GitHubRepo): Project {
    const stack = [r.language, ...(r.topics ?? []).slice(0, 2)].filter(Boolean);
    return {
      slug: r.name,
      desc: r.description ?? "Chưa có mô tả trên GitHub — bấm vào để xem repo.",
      stack: stack.length ? stack.join(" · ") : "—",
      status: r.archived ? "archived" : "running",
      url: r.html_url,
      stars: r.stargazers_count,
      pushedAt: new Date(r.pushed_at).toLocaleDateString("vi-VN"),
    };
  }

  async getProjects(): Promise<Project[]> {
    if (this.cache && Date.now() - this.cache.at < this.config.cacheTtlMs) {
      return this.cache.data;
    }
    if (this.inflight) return this.inflight;

    this.inflight = (async () => {
      const wanted = this.config.onlyRepos.map((n) => n.toLowerCase());
      const repos = await this.fetchRepos();
      const projects = repos
        .filter((r) => this.config.includeForks || !r.fork)
        .map((r) => this.toProject(r))
        .filter((p) => wanted.length === 0 || wanted.includes(p.slug.toLowerCase()))
        .sort((a, b) => {
          // có whitelist → sắp đúng thứ tự liệt kê
          if (wanted.length) {
            return wanted.indexOf(a.slug.toLowerCase()) - wanted.indexOf(b.slug.toLowerCase());
          }
          // không có → theo priority, rồi tự nhiên theo last push
          const ia = this.config.priorityRepos.indexOf(a.slug);
          const ib = this.config.priorityRepos.indexOf(b.slug);
          return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        })
        .slice(0, this.config.maxRepos);
      this.cache = { data: projects, at: Date.now() };
      return projects;
    })().finally(() => {
      this.inflight = null;
    });

    return this.inflight;
  }
}