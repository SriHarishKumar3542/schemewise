import { useState } from "react";
import { schemes, camps, isUpcoming, formatDate } from "@/lib/data";

interface Option {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  pick: () => { schemeIds: string[]; camps: typeof camps };
}

const options: Option[] = [
  {
    id: "financial", emoji: "💰", title: "Financial Assistance",
    desc: "Find relevant financial assistance schemes.",
    pick: () => ({ schemeIds: ["pmjay", "jsy", "pmmvy", "pmdialysis"], camps: [] }),
  },
  {
    id: "insurance", emoji: "🛡️", title: "Health Insurance",
    desc: "Find relevant health insurance and support schemes.",
    pick: () => ({ schemeIds: schemes.filter((s) => s.benefitType === "Health Insurance").map((s) => s.id), camps: [] }),
  },
  {
    id: "screening", emoji: "🩺", title: "Free Health Screening",
    desc: "Find upcoming screening camps.",
    pick: () => ({
      schemeIds: schemes.filter((s) => s.benefitType === "Free Screening").map((s) => s.id),
      camps: camps.filter((c) => isUpcoming(c) && c.services.some((s) => s.toLowerCase().includes("screening"))),
    }),
  },
  {
    id: "medicine", emoji: "💊", title: "Medicine Assistance",
    desc: "Show available medicine and treatment support.",
    pick: () => ({ schemeIds: schemes.filter((s) => s.benefitType === "Medicine Assistance").map((s) => s.id), camps: [] }),
  },
  {
    id: "vaccination", emoji: "💉", title: "Vaccination",
    desc: "Show vaccination-related camps and services.",
    pick: () => ({
      schemeIds: schemes.filter((s) => s.benefitType === "Free Screening" || s.benefitType === "Nutrition").map((s) => s.id),
      camps: camps.filter((c) => isUpcoming(c) && c.services.includes("Vaccination")),
    }),
  },
  {
    id: "govt", emoji: "📋", title: "Government Health Scheme",
    desc: "Browse all relevant government schemes.",
    pick: () => ({ schemeIds: schemes.map((s) => s.id), camps: [] }),
  },
];

export default function FindHelp() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? options.find((o) => o.id === selected)!.pick() : null;
  const matchedSchemes = result ? schemes.filter((s) => result.schemeIds.includes(s.id)) : [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground">What kind of health support are you looking for?</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setSelected(o.id)}
            aria-pressed={selected === o.id}
            className={`rounded-2xl border p-6 text-start transition ${selected === o.id ? "border-primary bg-secondary ring-2 ring-ring" : "border-border bg-card hover:border-primary/40 hover:shadow"}`}
          >
            <span className="text-2xl" aria-hidden="true">{o.emoji}</span>
            <span className="mt-3 block font-bold text-foreground">{o.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{o.desc}</span>
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-10">
          {matchedSchemes.length === 0 && result.camps.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <h3 className="text-lg font-bold text-foreground">No recommendations available right now</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try another support category, or explore the full directory.</p>
            </div>
          ) : (
            <div>
              {matchedSchemes.length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-foreground">Relevant schemes for you</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {matchedSchemes.map((s) => (
                      <article key={s.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                        <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{s.benefitType}</span>
                        <h4 className="mt-3 font-bold text-foreground">{s.name}</h4>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                        <a href={`/schemes/${s.id}`} className="mt-4 w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">View Details</a>
                      </article>
                    ))}
                  </div>
                </>
              )}
              {result.camps.length > 0 && (
                <>
                  <h3 className="mt-8 text-lg font-bold text-foreground">Upcoming camps you can attend</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {result.camps.map((c) => (
                      <article key={c.id} className="rounded-2xl border border-border bg-card p-6">
                        <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{c.district}</span>
                        <h4 className="mt-3 font-bold text-foreground">{c.name}</h4>
                        <p className="mt-2 text-sm text-muted-foreground">{formatDate(c.date)} · {c.time}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{c.location}</p>
                      </article>
                    ))}
                  </div>
                </>
              )}
              <a href="/camps" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">See all upcoming health camps →</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
