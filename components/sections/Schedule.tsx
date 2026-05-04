"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";

export function Schedule() {
  const { t } = useLocale();
  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-2">
              {t.scheduleSection.eyebrow}
            </p>
            <h2 className="font-display font-extrabold text-5xl uppercase text-white">
              {t.scheduleSection.title}
            </h2>
          </div>
          <Link
            href="/schedule"
            className="hidden md:block text-xs text-white/40 uppercase tracking-widest hover:text-white transition-colors"
          >
            {t.scheduleSection.fullSchedule}
          </Link>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {siteConfig.schedule.map(({ day, time }) => {
            const isToday = day === today;
            const isLive = isToday && time !== null;

            return (
              <div
                key={day}
                className={[
                  "rounded-lg p-4 text-center border transition-colors",
                  time
                    ? isLive
                      ? "bg-gold-400/15 border-gold-400/40"
                      : "bg-white/[0.04] border-white/[0.08]"
                    : "bg-transparent border-white/[0.04] opacity-50",
                ].join(" ")}
              >
                <p className={`text-[10px] uppercase tracking-widest mb-2 font-semibold ${time ? (isLive ? "text-gold-400" : "text-white/50") : "text-white/20"}`}>
                  {day}
                </p>
                <p className={`font-display font-bold text-base ${time ? "text-white" : "text-white/20"}`}>
                  {time ?? "—"}
                </p>
                {isLive && (
                  <span className="inline-flex items-center gap-1 mt-2 text-[9px] text-gold-400 uppercase tracking-widest">
                    <span className="w-1 h-1 bg-gold-400 rounded-full animate-blink" />
                    {t.scheduleSection.live}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-xs text-white/25 mt-4">{t.scheduleSection.allTimesCet}</p>
      </div>
    </section>
  );
}