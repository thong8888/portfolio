"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import SectionHead from "./SectionHead";
import { ProfileData } from "@/core/data/ProfileData";
import { GitHubService } from "@/core/github/GitHubService";
import type { Project } from "@/lib/types";

const profile = ProfileData.getInstance();

type LoadState =
  | { phase: "loading" }
  | { phase: "ready"; source: "live" | "fallback"; projects: Project[] };

export default function Projects() {
  const [state, setState] = useState<LoadState>({ phase: "loading" });

  useEffect(() => {
    GitHubService.getInstance()
      .getProjects()
      .then((projects) =>
        projects.length
          ? setState({ phase: "ready", source: "live", projects })
          : setState({ phase: "ready", source: "fallback", projects: profile.projects }),
      )
      .catch(() =>
        setState({ phase: "ready", source: "fallback", projects: profile.projects }),
      );
  }, []);

  return (
    <section id="projects">
      <SectionHead num="05" path="projects" meta="kubectl get services -n github" />
      <h2 className="reveal">
        Dự án <span className="acc">đang chạy</span>
      </h2>

      <div className="sv-table reveal">
        <div className="sv-head">
          <span>service</span>
          <span>mô tả</span>
          <span>stack</span>
          <span className="h-push">last push</span>
          <span>status</span>
          <span />
        </div>

        {state.phase === "loading" && (
          <div className="sv-loading">
            <span className="dot dot-live" />
            đang fetch api.github.com/users/thong8888/repos ...
          </div>
        )}

        {state.phase === "ready" && (
          <>
            {state.projects.map((p) => (
              <a
                className="sv-row"
                key={p.slug}
                href={p.url ?? `${profile.contact.github}/${p.slug}`}
                target="_blank"
                rel="noopener"
              >
                <span className="sv-name">
                  {p.slug}
                  {!!p.stars && (
                    <span className="sv-stars">
                      <Star size={11} /> {p.stars}
                    </span>
                  )}
                </span>
                <span className="sv-desc">{p.desc}</span>
                <span className="sv-stack">{p.stack}</span>
                <span className="sv-push">{p.pushedAt ?? "—"}</span>
                <span className={`sv-st ${p.status === "running" ? "sv-run" : "sv-stage"}`}>
                  <span className={`dot ${p.status === "running" ? "dot-live" : "dot-stage"}`} />
                  {p.status}
                </span>
                <span className="sv-go">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            ))}
            <div className="sv-note">
              {state.source === "live"
                ? "// live data — đồng bộ trực tiếp từ github.com/thong8888, tự cập nhật mỗi lần push"
                : "// ECONNREFUSED api.github.com — hiển thị bản cache từ CV"}
            </div>
          </>
        )}
      </div>
    </section>
  );
}