"use client";

import { useState } from "react";
import { incomeRanges, occupations, states, matchSchemes, type MatchResult } from "@/lib/data";

const field = "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const label = "block text-sm font-semibold text-foreground";

const empty = { age: "", gender: "", state: "", income: "", occupation: "", familySize: "" };

export default function EligibilityChecker() {
  const [answers, setAnswers] = useState({ ...empty });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [openApply, setOpenApply] = useState<string | null>(null);

  const set = (k: string, v: string) => {
    setAnswers((a) => ({ ...a, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const age = Number(answers.age);
    const family = Number(answers.familySize);
    if (!answers.age || Number.isNaN(age) || age < 0 || age > 120) errs.age = "Please enter a valid age between 0 and 120.";
    if (!answers.gender) errs.gender = "Please select an option.";
    if (!answers.state) errs.state = "Please select your state.";
    if (!answers.income) errs.income = "Please select an income range.";
    if (!answers.occupation) errs.occupation = "Please select an option.";
    if (!answers.familySize || Number.isNaN(family) || family < 1 || family > 30) errs.familySize = "Please enter a family size between 1 and 30.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const { matches } = matchSchemes({
      age,
      gender: answers.gender,
      state: answers.state,
      income: answers.income,
      occupation: answers.occupation,
      familySize: family,
    });
    setResults(matches);
    setOpenApply(null);
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  if (results) {
    if (results.length === 0) {
      return (
        <div id="results">
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">We couldn't find a potential match based on the information provided.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              This doesn't mean you have no options — some schemes decide eligibility through official lists rather than these questions. Try exploring everything that's available.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={() => { setResults(null); setAnswers({ ...empty }); }} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Try again</button>
              <a href="/schemes" className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">Explore all schemes</a>
              <a href="/find-help" className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">Use Find Help</a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div id="results">
        <p className="mb-5 text-sm text-muted-foreground" role="status">
          {results.length} potential match{results.length > 1 ? "es" : ""} found. These are possibilities, not guarantees — final eligibility is decided by the scheme authority.
        </p>
        <div className="flex flex-col gap-4">
          {results.map(({ scheme, reasons }) => (
            <article key={scheme.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary" aria-label="Potential match">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  Potential Match
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{scheme.benefitType}</span>
              </div>
              <h2 className="mt-3 text-xl font-bold text-foreground">{scheme.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scheme.description}</p>
              <div className="mt-4 rounded-xl bg-muted p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Why you matched</p>
                <ul className="mt-2 space-y-1">
                  {reasons.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-0.5 text-primary" aria-hidden="true">✓</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Main benefits</p>
                <ul className="mt-2 space-y-1">
                  {scheme.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-0.5 text-primary" aria-hidden="true">•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Important conditions</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{scheme.eligibilityRules.otherCriteria ?? "See the scheme details page for full conditions."}</p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={`/schemes/${scheme.id}`} className="rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90">View Details</a>
                <button onClick={() => setOpenApply(openApply === scheme.id ? null : scheme.id)} aria-expanded={openApply === scheme.id} className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">How to Apply</button>
              </div>
              {openApply === scheme.id && (
                <ol className="mt-4 space-y-2 rounded-xl border border-border p-4">
                  {scheme.applicationSteps.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-primary">{i + 1}</span>
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ol>
              )}
            </article>
          ))}
        </div>
        <button onClick={() => setResults(null)} className="mt-6 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted">← Start a new check</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-border bg-card p-6 md:p-8" aria-label="Eligibility checker">
      <p className="rounded-xl border border-border bg-secondary p-4 text-sm leading-relaxed text-foreground">
        Your answers are used to identify potentially relevant schemes. Please do not enter sensitive information such as Aadhaar numbers, bank details or medical records.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="age" className={label}>Age</label>
          <input id="age" type="number" inputMode="numeric" min="0" max="120" value={answers.age} onChange={(e) => set("age", e.target.value)} className={"mt-1.5 " + field} aria-invalid={!!errors.age} />
          {errors.age && <p className="mt-1 text-sm font-medium text-destructive" role="alert">{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="gender" className={label}>Gender</label>
          <select id="gender" value={answers.gender} onChange={(e) => set("gender", e.target.value)} className={"mt-1.5 " + field} aria-invalid={!!errors.gender}>
            <option value="">Select…</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other / prefer not to say</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm font-medium text-destructive" role="alert">{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="state" className={label}>State</label>
          <select id="state" value={answers.state} onChange={(e) => set("state", e.target.value)} className={"mt-1.5 " + field} aria-invalid={!!errors.state}>
            <option value="">Select your state…</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p className="mt-1 text-sm font-medium text-destructive" role="alert">{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="income" className={label}>Annual household income range</label>
          <select id="income" value={answers.income} onChange={(e) => set("income", e.target.value)} className={"mt-1.5 " + field} aria-invalid={!!errors.income}>
            <option value="">Select a range…</option>
            {incomeRanges.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          {errors.income && <p className="mt-1 text-sm font-medium text-destructive" role="alert">{errors.income}</p>}
        </div>
        <div>
          <label htmlFor="occupation" className={label}>Occupation</label>
          <select id="occupation" value={answers.occupation} onChange={(e) => set("occupation", e.target.value)} className={"mt-1.5 " + field} aria-invalid={!!errors.occupation}>
            <option value="">Select…</option>
            {occupations.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {errors.occupation && <p className="mt-1 text-sm font-medium text-destructive" role="alert">{errors.occupation}</p>}
        </div>
        <div>
          <label htmlFor="familySize" className={label}>Family size (people in the household)</label>
          <input id="familySize" type="number" inputMode="numeric" min="1" max="30" value={answers.familySize} onChange={(e) => set("familySize", e.target.value)} className={"mt-1.5 " + field} aria-invalid={!!errors.familySize} />
          {errors.familySize && <p className="mt-1 text-sm font-medium text-destructive" role="alert">{errors.familySize}</p>}
        </div>
      </div>
      <button type="submit" className="mt-8 w-full rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:bg-primary/90 sm:w-auto">Check My Eligibility</button>
    </form>
  );
}
