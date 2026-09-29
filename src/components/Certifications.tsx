import SectionHead from "./SectionHead";
import { ProfileData } from "@/core/data/ProfileData";

const profile = ProfileData.getInstance();

export default function Certifications() {
  return (
    <section id="certifications">
      <SectionHead
        num="03"
        path="certifications"
        meta="docker images --filter owner=huythong"
      />
      <h2 className="reveal">
        Chứng chỉ — <span className="acc">image đã &amp; đang pull</span>
      </h2>
      <div className="cert-table reveal">
        <div className="cert-head">
          <span>repository</span>
          <span>tag</span>
          <span>issuer</span>
          <span>issued</span>
          <span>status</span>
        </div>
        {profile.certifications.map((c) => (
          <div className="cert-row" key={c.repo}>
            <span className="cert-name">{c.repo}</span>
            <span className="cert-meta">
              <span className="cert-tag">{c.tag}</span>
              <span className="cert-issuer">{c.issuer}</span>
              <span className="cert-date">{c.issued}</span>
            </span>
            <span className={`cert-st is-${c.status}`}>
              <span className={`dot ${c.status === "valid" ? "dot-live" : "dot-stage"}`} />
              {c.status === "valid" ? "valid" : "pulling…"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}