export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = "left",
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
      data-reveal-blur
    >
      {overline && <p className="overline mb-3">{overline}</p>}
      <h2 className="h2">{title}</h2>
      <span
        className={`mt-4 block h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 ${
          align === "center" ? "mx-auto" : ""
        }`}
        data-reveal-line
        aria-hidden
      />
      {subtitle && (
        <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
