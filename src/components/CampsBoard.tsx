"use client";

import { useMemo, useState } from "react";
import { camps, campServices, isUpcoming, formatDate } from "@/lib/data";

export default function CampsBoard() {
  const districts = useMemo(() => [...new Set(camps.map((c) => c.district))], []);
  const [district, setDistrict] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const filtered = camps.filter((c) => {
    if (!showCompleted && !isUpcoming(c)) return false;
    if (district && c.district !== district) return false;
    if (service && !c.services.includes(service)) return false;
    if (date && c.date < date) return false;
    return true;
  });

  const field = "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div>
      <div className="rounded-2xl border border-border bg-card p-4 md:p-6">
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label htmlFor="c-district" className="sr-only">District</label>
            <select id="c-district" value={district} onChange={(e) => setDistrict(e.target.value)} className={field}>
              <option value="">All districts</option>
              {districts.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="c-service" className="sr-only">Service</label>
            <select id="c-service" value={service} onChange={(e) => setService(e.target.value)} className={field}>
              <option value="">All services</option>
              {campServices.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="c-date" className="sr-only">From date</label>
            <input id="c-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} />
          </div>
        </div>
        <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
          <input type="checkbox" checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} className="h-4 w-4 rounded border-border accent-[var(--primary)]" />
          Also show completed camps
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="text-lg font-bold text-foreground">No upcoming camps match your filters</h2>
          <p className="mt-2 text-sm text-muted-foreground">Try clearing the district, service or date filter{showCompleted ? "" : ", or tick 'Also show completed camps' to review past camps"}.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((c) => {
            const upcoming = isUpcoming(c);
            return (
              <article key={c.id} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${upcoming ? "bg-secondary text-primary" : "bg-muted text-muted-foreground"}`}>
                    {upcoming ? (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
                        Upcoming
                      </>
                    ) : (
                      "Completed"
                    )}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{c.district}</span>
                </div>
                <h2 className="mt-3 text-lg font-bold text-foreground">{c.name}</h2>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex gap-2"><dt className="w-20 shrink-0 font-semibold text-foreground">Date</dt><dd className="text-muted-foreground">{formatDate(c.date)}</dd></div>
                  <div className="flex gap-2"><dt className="w-20 shrink-0 font-semibold text-foreground">Time</dt><dd className="text-muted-foreground">{c.time}</dd></div>
                  <div className="flex gap-2"><dt className="w-20 shrink-0 font-semibold text-foreground">Location</dt><dd className="text-muted-foreground">{c.location}</dd></div>
                  <div className="flex gap-2"><dt className="w-20 shrink-0 font-semibold text-foreground">Organiser</dt><dd className="text-muted-foreground">{c.organiser}</dd></div>
                </dl>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.services.map((s) => <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground">{s}</span>)}
                </div>
                <button onClick={() => setOpen(open === c.id ? null : c.id)} aria-expanded={open === c.id} className="mt-4 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted">
                  {open === c.id ? "Hide details" : "View details"}
                </button>
                {open === c.id && (
                  <div className="mt-3 rounded-xl border border-border p-4 text-sm">
                    <p className="text-muted-foreground"><strong className="text-foreground">Contact:</strong> {c.contact}</p>
                    {upcoming && (
                      <p className="mt-2 text-muted-foreground"><strong className="text-foreground">Registration:</strong> Walk-in registration at the venue — check with the organiser before travelling.</p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      <p className="mt-8 rounded-xl bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
        Note: the camps listed here are demonstration/sample data for this project, not real events. In a live deployment this section would be filled by district health authorities.
      </p>
    </div>
  );
}
