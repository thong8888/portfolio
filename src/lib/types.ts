/** Trạng thái kỹ năng: production = dùng hằng ngày / staging = đang xây dựng */
export type SkillStatus = "production" | "staging";

export interface Skill {
  name: string;
  category: string;
  note: string;
  status: SkillStatus;
}

/** Chứng chỉ hiển thị theo kiểu `docker images` */
export type CertStatus = "valid" | "pulling";

export interface CertBadge {
  repo: string;
  tag: string;
  issuer: string;
  issued: string;
  status: CertStatus;
}

/** Loại commit trong git log nghề nghiệp */
export type CommitKind = "current" | "past" | "init";

export interface StatEntry {
  add?: string; // dòng xanh kiểu git diff
  del?: string; // dòng đỏ
  upt?: string; // dòng trung tính
}

export interface Experience {
  hash: string;
  refs: string;
  date: string;
  role: string;
  org: string;
  desc: string;
  stats: StatEntry[];
  kind: CommitKind;
}

export interface Project {
  slug: string;
  desc: string;
  stack: string;
  status: "running" | "staging" | "archived";
  url?: string;       // link repo (từ GitHub API)
  stars?: number;     // ★ count
  pushedAt?: string;  // lần push cuối
}

export interface Contact {
  email: string;
  phone: string;
  phoneHref: string;
  github: string;
  linkedin: string;
  location: string;
}