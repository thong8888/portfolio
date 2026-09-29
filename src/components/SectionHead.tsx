export default function SectionHead({
  num,
  path,
  meta,
}: {
  num: string;
  path: string;
  meta: string;
}) {
  return (
    <div className="sec-head reveal">
      <span className="sec-num">## {num}</span>
      <span className="sec-path">/{path}</span>
      <span className="sec-line" />
      <span className="sec-meta">{meta}</span>
    </div>
  );
}