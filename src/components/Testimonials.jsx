import { Star } from "lucide-react";

const items = [
  {
    name: "Priya R.",
    loc: "Bergenfield, NJ",
    quote:
      "Truly the best laundry service in Bergen County. Picked up and back in a day — neatly folded, smelling fresh.",
  },
  {
    name: "Marcus T.",
    loc: "Teaneck, NJ",
    quote:
      "I run a small restaurant and Singh handles all our linens. Reliable, never a missed pickup. Highly recommend.",
  },
  {
    name: "Anna K.",
    loc: "Dumont, NJ",
    quote:
      "The laundromat is spotless and the staff is so kind. My kids even like coming along now.",
  },
];

export default function Testimonials() {
  return (
    <section className="section container-pad" data-testid="home-testimonials">
      <p className="overline mb-3">Loved locally</p>
      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-end mb-8">
        <h2 className="h2 max-w-2xl">
          Hear what our customers love about us.
        </h2>
        <div className="flex items-center gap-2 text-slate-700">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-blue-700 text-blue-700"
              />
            ))}
          </div>
          <span className="font-semibold">4.9 / 5</span>
          <span className="text-slate-500 text-sm">· 400+ reviews</span>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((t, i) => (
          <figure
            key={i}
            className="rounded-3xl border border-slate-200 p-7 bg-white"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className="h-4 w-4 fill-blue-700 text-blue-700"
                />
              ))}
            </div>
            <blockquote className="font-display text-lg leading-snug text-slate-900">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{t.name}</span> ·{" "}
              {t.loc}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
