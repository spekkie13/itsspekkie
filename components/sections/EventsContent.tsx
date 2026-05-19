"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

const timerTable = [
  { action: "1 Sub (Tier 1)",   time: "+7 min" },
  { action: "1 Sub (Tier 2)",   time: "+14 min" },
  { action: "1 Sub (Tier 3)",   time: "+21 min" },
  { action: "5 Gift Subs",      time: "+42 min" },
  { action: "10 Gift Subs",     time: "+84 min" },
  { action: "20 Gift Subs",     time: "+175 min" },
  { action: "50 Gift Subs",     time: "+420 min" },
  { action: "100 Bits",         time: "+77 sec" },
  { action: "500 Bits",         time: "+7 min" },
  { action: "1,000 Bits",       time: "+13 min" },
  { action: "2,500 Bits",       time: "+49 min" },
  { action: "5,000 Bits",       time: "+77 min" },
  { action: "10,000 Bits",      time: "+140 min" },
  { action: "€5 Donation",      time: "+7 min" },
  { action: "€10 Donation",     time: "+14 min" },
  { action: "€20 Donation",     time: "+28 min" },
  { action: "€50 Donation",     time: "+77 min" },
  { action: "€100 Donation",    time: "+140 min" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      className={`text-white/30 transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
    >
      <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EventsContent() {
  const { t } = useLocale();
  const [marathonOpen, setMarathonOpen] = useState(false);

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">

        <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-3">
          {t.events.eyebrow}
        </p>
        <h1 className="font-display font-extrabold text-7xl uppercase text-white mb-12 leading-none">
          {t.events.title}<span className="text-outline-gold">.</span>
        </h1>

        <div className="flex flex-col gap-3">
          {/* ── Marathon ── */}
          <div className={`border rounded-2xl overflow-hidden transition-colors ${marathonOpen ? "border-gold-400/30" : "border-white/[0.07]"}`}>
            <button
              onClick={() => setMarathonOpen(!marathonOpen)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 min-w-0">
                <h2 className="font-display font-extrabold text-3xl uppercase text-white leading-none">
                  {t.events.marathon.name}
                </h2>
                <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
                  {t.events.marathon.dateRange}
                </span>
              </div>
              <Chevron open={marathonOpen} />
            </button>

            <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${marathonOpen ? "max-h-[4000px]" : "max-h-0"}`}>
              <div className="px-6 pb-8 border-t border-white/[0.06]">
                <p className="text-white/30 text-sm mt-5 mb-6">{t.events.marathon.subtitle}</p>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {t.events.marathon.description}
                </p>

                <ul className="space-y-2 mb-10">
                  {t.events.marathon.details.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 bg-gold-400 rotate-45 shrink-0 inline-block" />
                      {d}
                    </li>
                  ))}
                </ul>

                <h3 className="font-display font-bold text-xl uppercase text-white mb-4 tracking-wide">
                  {t.events.marathon.timer.title}
                </h3>
                <p className="text-white/40 text-sm mb-5">{t.events.marathon.timer.note}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gold-400/10 border border-gold-400/20">
                        <th className="text-left px-4 py-2 font-display font-bold uppercase tracking-wide text-gold-400">{t.events.marathon.timer.actionHeader}</th>
                        <th className="text-left px-4 py-2 font-display font-bold uppercase tracking-wide text-gold-400">{t.events.marathon.timer.timeHeader}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timerTable.map(({ action, time }, i) => (
                        <tr key={action} className={`border border-white/[0.06] ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-4 py-2 text-white/70">{action}</td>
                          <td className="px-4 py-2 text-gold-400 font-semibold">{time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
