import SectionHead from "./SectionHead";
import Pipeline from "./Pipeline";
import { ProfileData } from "@/core/data/ProfileData";

const profile = ProfileData.getInstance();

export default function Career() {
  return (
    <section id="career">
      <SectionHead num="04" path="career" meta="git log --oneline --career" />
      <h2 className="reveal">
        Lộ trình <span className="acc">commit</span>
      </h2>
      <div className="reveal">
        <div className="pl-cap">
          <span className="dot dot-live" />
          CI/CD pipeline — ticket vào, giải pháp ra
        </div>
        <Pipeline />
      </div>
      <div className="log reveal">
        {profile.experiences.map((x) => (
          <div className={`log-entry ${x.kind}`} key={x.hash}>
            <div className="log-meta">
              <span className="st">*</span>
              <span className="hash">{x.hash}</span>
              <span className="ref">{x.refs}</span>
              <span className="date">{x.date}</span>
            </div>
            <h3>
              {x.role} <span className="org">· {x.org}</span>
            </h3>
            <p>{x.desc}</p>
            <div className="log-stats">
              {x.stats.map((s, i) => {
                if (s.add) return <span className="s-add" key={i}>+ {s.add}</span>;
                if (s.del) return <span className="s-del" key={i}>− {s.del}</span>;
                return <span className="s-upt" key={i}>~ {s.upt}</span>;
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}