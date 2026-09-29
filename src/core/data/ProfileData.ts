import type { CertBadge, Contact, Experience, Project, Skill } from "@/lib/types";

/**
 * Nguồn dữ liệu duy nhất của toàn bộ trang.
 * Sửa nội dung CV tại đây — mọi section, lệnh terminal và file CV tải về
 * đều tự động cập nhật theo.
 */
export class ProfileData {
  private static instance: ProfileData | null = null;

  static getInstance(): ProfileData {
    return (ProfileData.instance ??= new ProfileData());
  }

  private constructor() {
    /* Singleton — dùng ProfileData.getInstance() */
  }

  // ===== Thông tin cá nhân =====
  readonly name = "Nguyễn Huy Thông";
  readonly firstName = "Huy Thông";
  readonly role = "IT Support | Aspiring DevOps Engineer";
  readonly targetRole = "Junior DevOps / System Administrator";
  readonly birthDate = "20/11/2002";
  readonly currentCompany = "J&T Express";
  readonly branchCount = 361;
  readonly workstationCount = 700;
  readonly ticketsPerMonth = 100;
  readonly education =
    "Cử nhân CNTT — Software Engineering, Đại học Văn Lang (2021–2024)";

  readonly contact: Contact = {
    email: "huythong8888@gmail.com",
    phone: "0911 795 637",
    phoneHref: "tel:+84911795637",
    github: "https://github.com/thong8888",
    linkedin: "https://linkedin.com/in/thong-huy-628996260",
    location: "TP. Hồ Chí Minh, Việt Nam",
  };

  // ===== Kỹ năng (kubectl get skills) =====
  private readonly _skills: Skill[] = [
    { name: "Windows OS",                category: "systems",    note: "install · config · troubleshoot",   status: "production" },
    { name: "Linux",                     category: "systems",    note: "LPIC-1 certified",                  status: "production" },
    { name: "Networking TCP/IP",         category: "networking", note: "CCNA · routing & switching",        status: "production" },
    { name: "Help Desk / IT Support",    category: "support",    note: "100+ tickets/tháng · SLA < 1 phút", status: "production" },
    { name: "Hardware / Printer / CCTV", category: "support",    note: "361 chi nhánh",                     status: "production" },
    { name: "Docker",                    category: "containers", note: "deploy ERPNext trên Docker",        status: "staging" },
    { name: "n8n",                       category: "automation", note: "workflow automation",               status: "staging" },
    { name: "Git / GitHub",              category: "tooling",    note: "version control",                   status: "production" },
    { name: "Postman",                   category: "tooling",    note: "API testing & debugging",           status: "production" },
    { name: "JavaScript / TypeScript",   category: "languages",  note: "TripU frontend",                    status: "production" },
    { name: "PHP",                       category: "languages",  note: "website bán game",                  status: "production" },
    { name: "MongoDB",                   category: "database",   note: "NoSQL cơ bản",                      status: "staging" },
  ];

  get skills(): readonly Skill[] {
    return this._skills;
  }

  // ===== Chứng chỉ (docker images) =====
  private readonly _certifications: CertBadge[] = [
    { repo: "cisco/ccna",           tag: "latest",   issuer: "VNPRO",          issued: "09/2026", status: "pulling" },
    { repo: "lpi/lpic-1",           tag: "v1",       issuer: "TEL4VN",         issued: "07/2026", status: "pulling" },
    { repo: "hackerrank/react",     tag: "frontend", issuer: "HackerRank",     issued: "05/2025", status: "valid" },
    { repo: "britishcouncil/aptis", tag: "b2",       issuer: "British Council",issued: "09/2024", status: "valid" },
  ];

  get certifications(): readonly CertBadge[] {
    return this._certifications;
  }

  // ===== Kinh nghiệm (git log — mới nhất trên đầu) =====
  private readonly _experiences: Experience[] = [
    {
      hash: "a3f7c91",
      refs: "(HEAD → main, tag: helpdesk)",
      date: "06/2025 — nay",
      kind: "current",
      role: "IT Help Desk / IT Support",
      org: "J&T Express",
      desc:
        "Hỗ trợ IT nội bộ cho toàn hệ thống: Windows, máy in, CCTV và các ứng dụng nghiệp vụ. " +
        "Xử lý 100+ ticket/tháng với first-response dưới 1 phút, phối hợp các phòng xử lý lỗi lặp lại " +
        "và duy trì ổn định chung cho 361 chi nhánh.",
      stats: [
        { add: "100+ tickets mỗi tháng" },
        { del: "SLA response < 1 phút" },
        { upt: "361 chi nhánh · 700+ máy" },
      ],
    },
    {
      hash: "8e2b4d0",
      refs: "(tag: frontend)",
      date: "02/2025 — 03/2025",
      kind: "past",
      role: "Front-End Developer",
      org: "Vietravel — TripU",
      desc:
        "Xây dựng giao diện nền tảng du lịch nội bộ TripU bằng Next.js + TypeScript, " +
        "tích hợp REST API, test và debug response để đảm bảo ứng dụng chạy ổn định.",
      stats: [
        { add: "UI Next.js + TypeScript" },
        { add: "REST API integration" },
        { upt: "team 2 người" },
      ],
    },
    {
      hash: "c47d1a8",
      refs: "(tag: docker)",
      date: "10/2024 — 01/2025",
      kind: "past",
      role: "Developer (ERPNext / Docker)",
      org: "Kyanon",
      desc:
        "Nghiên cứu ERPNext và các module nghiệp vụ; hỗ trợ triển khai lên môi trường Docker: " +
        "cấu hình container, xây dựng vai trò & phân quyền, viết tài liệu triển khai cho team.",
      stats: [
        { add: "ERPNext on Docker" },
        { add: "roles & permissions" },
        { upt: "docs chuẩn hóa" },
      ],
    },
    {
      hash: "0a1c3b8",
      refs: "(tag: init)",
      date: "2021 — 2024",
      kind: "init",
      role: "Khởi đầu",
      org: "hello, world",
      desc:
        "Cử nhân CNTT — Software Engineering, Đại học Văn Lang. Những đêm đầu cài Linux và cấu hình " +
        "router ảo khiến tôi nhận ra: mình muốn làm việc với hạ tầng.",
      stats: [{ add: "1 bằng cử nhân" }, { add: "1 hướng đi: DevOps" }],
    },
  ];

  get experiences(): readonly Experience[] {
    return this._experiences;
  }

  // ===== Dự án (kubectl get services) =====
  private readonly _projects: Project[] = [
    {
      slug: "tripu-frontend",
      desc: "Nền tảng du lịch nội bộ: xây UI, tích hợp REST API, debug dữ liệu.",
      stack: "Next.js · TypeScript · REST",
      status: "running",
    },
    {
      slug: "erpnext-docker",
      desc: "Triển khai ERPNext trên Docker: cấu hình, phân quyền, tài liệu hóa quy trình.",
      stack: "Docker · ERPNext · Linux",
      status: "running",
    },
    {
      slug: "online-shopping",
      desc: "Website bán hàng online: thiết kế giao diện + logic front-end / back-end.",
      stack: "HTML · CSS · JavaScript",
      status: "running",
    },
    {
      slug: "game-selling",
      desc: "Website bán game — team lead: chia task, review code cho teammates.",
      stack: "JavaScript · PHP · CSS",
      status: "running",
    },
  ];

get projects(): Project[] {
  return [
    { slug: "learn-DevOp",    desc: "Hành trình học DevOps: Terraform (HCL), hạ tầng as code.",  stack: "HCL · Terraform",      status: "running" },
    { slug: "Study-DevOps",   desc: "Lab & script DevOps — Shell, Linux, tự động hóa.",            stack: "Shell · Linux",        status: "running" },
    { slug: "web-docker",     desc: "Website đóng gói & deploy bằng Docker.",                      stack: "JavaScript · Docker",  status: "running" },
    { slug: "card-flip-game", desc: "Game lật bài xây bằng Next.js + TypeScript.",                 stack: "Next.js · TypeScript", status: "running" },
    { slug: "snake-game",     desc: "Game rắn cổ điển viết lại bằng TypeScript.",                  stack: "TypeScript",           status: "running" },
  ];
}
}