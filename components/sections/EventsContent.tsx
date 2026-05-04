"use client";

import { useState, useEffect } from "react";
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

const roundTable = [
  ["1", "80% + 2 Stars",         "Normal"],
  ["2", "90% + 2 Stars",         "Normal"],
  ["3", "Triple (100% 3 Stars)",  "Normal"],
  ["4", "80% + 2 Stars",         "Legend"],
  ["5", "90% + 2 Stars",         "Legend"],
  ["6", "Triple (100% 3 Stars)",  "Legend"],
  ["7", "Triple (100% 3 Stars)",  "Esport"],
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
  const [kothOpen, setKothOpen] = useState(false);
  const [marathonOpen, setMarathonOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#signup") {
      setKothOpen(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/koth-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twitchName: data.get("twitchName"),
          ign: data.get("ign"),
          playerTag: data.get("playerTag"),
          townHall: data.get("townHall"),
          discord: data.get("discord"),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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

          {/* ── KotH ── */}
          <div className={`border rounded-2xl overflow-hidden transition-colors ${kothOpen ? "border-gold-400/30" : "border-white/[0.07]"}`}>
            <button
              onClick={() => setKothOpen(!kothOpen)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 min-w-0">
                <h2 className="font-display font-extrabold text-3xl uppercase text-white leading-none">
                  {t.events.koth.name}
                </h2>
                <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
                  {t.events.koth.date}
                </span>
              </div>
              <Chevron open={kothOpen} />
            </button>

            <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${kothOpen ? "max-h-[4000px]" : "max-h-0"}`}>
              <div className="px-6 pb-8 border-t border-white/[0.06]">
                <p className="text-white/30 text-sm mt-5 mb-6">{t.events.koth.subtitle}</p>

                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {t.events.koth.description}
                </p>

                <ul className="space-y-2 mb-8">
                  {t.events.koth.details.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 bg-gold-400 rotate-45 shrink-0 inline-block" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gold-400/10 border border-gold-400/20">
                        <th className="text-left px-4 py-2 font-display font-bold uppercase tracking-wide text-gold-400">{t.events.koth.table.round}</th>
                        <th className="text-left px-4 py-2 font-display font-bold uppercase tracking-wide text-gold-400">{t.events.koth.table.benchmark}</th>
                        <th className="text-left px-4 py-2 font-display font-bold uppercase tracking-wide text-gold-400">{t.events.koth.table.mode}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roundTable.map(([num, bench, mode], i) => (
                        <tr key={num} className={`border border-white/[0.06] ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                          <td className="px-4 py-2 text-white font-semibold">{t.events.koth.table.round} {num}</td>
                          <td className="px-4 py-2 text-white/60">{bench}</td>
                          <td className="px-4 py-2 text-gold-400 font-semibold">{mode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div id="signup" className="bg-white/[0.03] border border-gold-400/20 rounded-xl p-8">
                  <h3 className="font-display font-extrabold text-3xl uppercase text-white mb-1">
                    {t.events.koth.form.title}
                  </h3>
                  <p className="text-white/40 text-sm mb-8">{t.events.koth.form.subtitle}</p>

                  {submitted ? (
                    <div className="bg-gold-400/10 border border-gold-400/30 rounded-lg px-6 py-4 inline-block">
                      <p className="font-display font-bold text-xl uppercase text-gold-400 tracking-wide">
                        {t.events.koth.form.success}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                            {t.events.koth.form.twitchLabel}
                          </label>
                          <input
                            type="text"
                            name="twitchName"
                            placeholder="e.g. itsSpekkie"
                            required
                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm px-4 py-3 outline-none focus:border-gold-400/50 focus:bg-gold-400/[0.03] transition-colors placeholder:text-white/20"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                            {t.events.koth.form.ignLabel}
                          </label>
                          <input
                            type="text"
                            name="ign"
                            placeholder={t.events.koth.form.ignPlaceholder}
                            required
                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm px-4 py-3 outline-none focus:border-gold-400/50 focus:bg-gold-400/[0.03] transition-colors placeholder:text-white/20"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                            {t.events.koth.form.tagLabel}
                          </label>
                          <input
                            type="text"
                            name="playerTag"
                            placeholder="#ABC123"
                            required
                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm px-4 py-3 outline-none focus:border-gold-400/50 focus:bg-gold-400/[0.03] transition-colors placeholder:text-white/20"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                            {t.events.koth.form.townHallLabel}
                          </label>
                          <select
                            name="townHall"
                            required
                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm px-4 py-3 outline-none focus:border-gold-400/50 transition-colors appearance-none cursor-pointer"
                          >
                            <option value="" disabled>{t.events.koth.form.townHallPlaceholder}</option>
                            <option value="th18">{t.events.koth.form.townHall18}</option>
                            <option value="other">{t.events.koth.form.townHallOther}</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-2 sm:col-span-2">
                          <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                            {t.events.koth.form.discordLabel}{" "}
                            <span className="normal-case tracking-normal font-normal text-white/25">
                              {t.events.koth.form.optional}
                            </span>
                          </label>
                          <input
                            type="text"
                            name="discord"
                            placeholder="e.g. spekkie"
                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm px-4 py-3 outline-none focus:border-gold-400/50 focus:bg-gold-400/[0.03] transition-colors placeholder:text-white/20"
                          />
                        </div>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" required className="mt-1 w-4 h-4 accent-yellow-400 cursor-pointer shrink-0" />
                        <span className="text-sm text-white/40 leading-relaxed">
                          {t.events.koth.form.confirm}
                        </span>
                      </label>

                      {error && (
                        <p className="text-red-400 text-sm">
                          Something went wrong — please try again.
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-gold-400 text-navy-900 font-display font-bold uppercase tracking-widest text-sm px-8 py-3 rounded-md hover:bg-gold-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Sending…" : t.events.koth.form.submit}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

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