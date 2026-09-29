import { ArrowUpRight } from "lucide-react";
import SectionHead from "./SectionHead";
import { ProfileData } from "@/core/data/ProfileData";

const profile = ProfileData.getInstance();

export default function Projects() {
  return (
    <section id="projects">
      <SectionHead num="05" path="projects" meta="kubectl get services -n portfolio" />
      <h2 className="reveal">
        Dự án <span className="acc">đã deploy</span>
      </h2>
      <div className="sv-table reveal">
        <div className="sv-head">
          <span>service</span>
          <span>mô tả</span>
          <span>stack</span>
          <span>status</span>
          <span />
        </div>
        {profile.projects.map((p) => (
          <a
            className="sv-row"
            key={p.slug}
            href={`${profile.contact.github}/${p.slug}`}
            target="_blank"
            rel="noopener"
          >
            <span className="sv-name">{p.slug}</span>
            <span className="sv-desc">{p.desc}</span>
            <span className="sv-stack">{p.stack}</span>
            <span className={`sv-st ${p.status === "running" ? "sv-run" : "sv-stage"}`}>
              <span className={`dot ${p.status === "running" ? "dot-live" : "dot-stage"}`} />
              {p.status === "running" ? "running" : "staging"}
            </span>
            <span className="sv-go">
              <ArrowUpRight size={18} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}