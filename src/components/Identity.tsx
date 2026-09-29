import SectionHead from "./SectionHead";
import { ProfileData } from "@/core/data/ProfileData";

const profile = ProfileData.getInstance();

export default function Identity() {
  return (
    <section id="identity">
      <SectionHead num="01" path="identity" meta="cat profile.yaml" />
      <h2 className="reveal">
        Một người support, <span className="acc">tư duy hệ thống</span>
      </h2>
      <div className="id-grid">
        <div className="id-text reveal">
          <p>
            Tôi bắt đầu từ bàn help desk: máy tính không vào được hệ thống, máy in kẹt giấy,
            CCTV mất tín hiệu — và 361 chi nhánh đang chờ. Ở đó tôi học được nguyên tắc sống
            còn của vận hành: <strong>phản hồi nhanh, xử lý tận gốc</strong>, và không bao giờ
            để cùng một lỗi làm phiền người dùng lần thứ ba.
          </p>
          <p>
            Những ticket lặp đi lặp lại khiến tôi tự hỏi: <em>tại sao việc này vẫn do con người làm?</em>{" "}
            Câu trả lời dẫn tôi tới automation — <strong>n8n</strong> cho workflow,{" "}
            <strong>Docker</strong> cho ứng dụng, <strong>Linux</strong> cho tất cả. Hiện tôi đang
            học thêm CI/CD và Kubernetes, và tìm một đội ngũ để cùng lớn ở vị trí Junior DevOps / SysAdmin.
          </p>
          <div className="facts">
            <div className="fact">
              <span className="fk">hiện tại</span>
              <span className="fv">IT Support @ J&amp;T Express (06/2025 – nay)</span>
            </div>
            <div className="fact">
              <span className="fk">chứng chỉ</span>
              <span className="fv">CCNA · LPIC-1 · HackerRank React · Aptis B2</span>
            </div>
            <div className="fact">
              <span className="fk">học vấn</span>
              <span className="fv">{profile.education}</span>
            </div>
            <div className="fact">
              <span className="fk">định hướng</span>
              <span className="fv">{profile.targetRole}</span>
            </div>
          </div>
        </div>
        <div className="code-block reveal">
          <div className="code-head">
            <span>profile.yaml</span>
            <span className="ro">read-only</span>
          </div>
          <pre>
            <span className="y-c">{"# tôi, ở dạng hạ tầng"}</span>{"\n"}
            <span className="y-k">apiVersion:</span> v1{"\n"}
            <span className="y-k">kind:</span> <span className="y-h">AspiringDevOpsEngineer</span>{"\n"}
            <span className="y-k">metadata:</span>{"\n"}
            {"  "}<span className="y-k">name:</span> <span className="y-s">nguyen-huy-thong</span>{"\n"}
            {"  "}<span className="y-k">location:</span> <span className="y-s">ho-chi-minh-city</span>{"\n"}
            {"  "}<span className="y-k">timezone:</span> <span className="y-s">UTC+7</span>{"\n"}
            <span className="y-k">spec:</span>{"\n"}
            {"  "}<span className="y-k">currentRole:</span> <span className="y-s">"IT Support @ J&T Express"</span>{"\n"}
            {"  "}<span className="y-k">experience:</span> <span className="y-s">"1+ năm · 700+ workstation"</span>{"\n"}
            {"  "}<span className="y-k">certifications:</span> [<span className="y-s">CCNA, LPIC-1, React, Aptis-B2</span>]{"\n"}
            {"  "}<span className="y-k">stack:</span>{"\n"}
            {"    "}<span className="y-k">os:</span> [<span className="y-s">windows, linux</span>]{"\n"}
            {"    "}<span className="y-k">networking:</span> <span className="y-s">tcp/ip · routing · switching</span>{"\n"}
            {"    "}<span className="y-k">containers:</span> <span className="y-s">docker</span>{"\n"}
            {"    "}<span className="y-k">automation:</span> <span className="y-s">n8n · bash (in-progress)</span>{"\n"}
            {"    "}<span className="y-k">languages:</span> [<span className="y-s">javascript, typescript, php</span>]{"\n"}
            {"  "}<span className="y-k">learning:</span> [<span className="y-s">kubernetes, ci-cd, ansible</span>]{"\n"}
            {"  "}<span className="y-k">philosophy:</span> <span className="y-s">"mỗi ticket lặp lại là một automation đang chờ"</span>{"\n"}
            {"  "}<span className="y-k">helpdesk:</span> <span className="y-s">true</span>{"        "}<span className="y-c"># SLA &lt; 1 phút — từng giây đều đếm</span>{"\n"}
            <span className="y-k">status:</span> <span className="y-h">ready-to-level-up</span>
          </pre>
        </div>
      </div>
    </section>
  );
}