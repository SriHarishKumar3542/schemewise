"use client";

import { useMemo, useState } from "react";
import { schemes, states } from "@/lib/data";

export default function SchemeDirectory() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [benefitType, setBenefitType] = useState("");
  const [target, setTarget] = useState("");

  const benefitTypes = useMemo(() => [...new Set(schemes.map((s) => s.benefitType))], []);
  const targetGroups = useMemo(
    () => [...new Set(schemes.flatMap((s) => s.targetGroups))].sort(),
    []
  );

  const filtered = schemes.filter((s) => {
    const q = query.trim().toLowerCase();
    if (q && !`${s.name} ${s.description} ${s.benefitType}`.toLowerCase().includes(q)) return false;
    if (state && s.stateCoverage !== "All India" && !s.stateCoverage.toLowerCase().includes(state.toLowerCase())) return false;
    if (state && s.stateCoverage === "All India") return true;
    if (benefitType && s.benefitType !== benefitType) return false;
    if (target && !s.targetGroups.some((t) => t.toLowerCase().includes(target.toLowerCase()))) return false;
    return true;
  });

  const field = "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div>
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <label htmlFor="search" className="sr-only">Search schemes</label>
            <input id="search" type="search" placeholder="Search by name or keyword…" value={query} onChange={(e) => setQuery(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor="f-state" className="sr-only">State coverage</label>
            <select id="f-state" value={state} onChange={(e) => setState(e.target.value)} className={field}>
              <option value="">All states</option>
              {states.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-type" className="sr-only">Benefit type</label>
            <select id="f-type" value={benefitType} onChange={(e) => setBenefitType(e.target.value)} className={field}>
              <option value="">All benefit types</option>
              {benefitTypes.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-target" className="sr-only">Target group</label>
            <select id="f-target" value={target} onChange={(e) => setTarget(e.target.value)} className={field}>
              <option value="">All target groups</option>
              {targetGroups.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        {(query || state || benefitType || target) && (
          <button onClick={() => { setQuery(""); setState(""); setBenefitType(""); setTarget(""); }} className="mt-3 text-sm font-semibold text-primary hover:underline">
            Clear all filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-lg font-bold text-foreground">No schemes match your search</h2>
          <p className="mt-2 text-sm text-muted-foreground">Try a different keyword, or clear the filters to see all {schemes.length} schemes.</p>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted-foreground" role="status">Showing {filtered.length} of {schemes.length} schemes</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {filtered.map((s) => (
              <article key={s.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">{s.benefitType}</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{s.stateCoverage}</span>
                </div>
                <h2 className="mt-3 text-lg font-bold text-foreground">{s.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <p className="mt-3 text-sm text-foreground"><span className="font-semibold">Main benefit:</span> {s.benefits[0]}</p>
                <p className="mt-1 text-sm text-muted-foreground"><span className="font-semibold">For:</span> {s.targetGroups.join(" · ")}</p>
                <a href={`/schemes/${s.id}`} className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  View Details
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
