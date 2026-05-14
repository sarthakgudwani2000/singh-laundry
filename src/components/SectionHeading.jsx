export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = "left",
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {overline && <p className="overline mb-3">{overline}</p>}
      <h2 className="h2">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
