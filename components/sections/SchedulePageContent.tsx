"use client";

import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";
import type { Locale } from "@/lib/translations";

const DAY_TO_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

function getUpcomingStreams() {
  const scheduledDays = siteConfig.schedule
    .filter((s): s is { day: string; time: string } => s.time !== null)
    .map((s) => ({ dayIndex: DAY_TO_INDEX[s.day], day: s.day, time: s.time }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const streams: { date: Date; day: string; time: string }[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const scheduled = scheduledDays.find((s) => s.dayIndex === date.getDay());
    if (scheduled) {
      streams.push({ date, day: scheduled.day, time: scheduled.time });
    }
  }

  return streams;
}

function formatDate(date: Date, locale: Locale) {
  const formatted = date.toLocaleDateString(locale === "nl" ? "nl-NL" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function isToday(date: Date) {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function SchedulePageContent() {
  const { locale, t } = useLocale();
  const todayShort = new Date().toLocaleDateString("en-US", { weekday: "short" });
  const upcomingStreams = getUpcomingStreams();

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-3">
          {t.schedulePage.eyebrow}
        </p>
        <h1 className="font-display font-extrabold text-7xl uppercase text-white mb-10 leading-none">
          {t.schedulePage.title}<span className="text-outline-gold">.</span>
        </h1>

        {/* Weekly overview */}
        <div className="mb-16">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">
            {t.schedulePage.weeklyLabel}
          </p>
          <div className="grid grid-cols-7 gap-2">
            {siteConfig.schedule.map(({ day, time }) => {
              const isTodayCell = day === todayShort;
              return (
                <div
                  key={day}
                  className={[
                    "rounded-xl p-5 text-center border transition-colors",
                    time
                      ? isTodayCell
                        ? "bg-gold-400/15 border-gold-400/40"
                        : "bg-white/[0.04] border-white/[0.08]"
                      : "bg-transparent border-white/[0.04] opacity-40",
                  ].join(" ")}
                >
                  <p className={`text-[10px] uppercase tracking-widest mb-3 font-semibold ${time ? (isTodayCell ? "text-gold-400" : "text-white/50") : "text-white/20"}`}>
                    {day}
                  </p>
                  <p className={`font-display font-bold text-lg ${time ? "text-white" : "text-white/20"}`}>
                    {time ?? "—"}
                  </p>
                  {isTodayCell && time && (
                    <span className="inline-flex items-center gap-1 mt-2 text-[9px] text-gold-400 uppercase tracking-widest">
                      <span className="w-1 h-1 bg-gold-400 rounded-full animate-blink" />
                      {t.schedulePage.today}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-white/20 mt-3">{t.schedulePage.allTimesCet}</p>
        </div>

        {/* Upcoming streams */}
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-4">
            {t.schedulePage.upcomingLabel}
          </p>
          <div className="flex flex-col gap-3">
            {upcomingStreams.map((stream) => {
              const streamIsToday = isToday(stream.date);
              return (
                <div
                  key={stream.date.toISOString()}
                  className={[
                    "flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-xl border",
                    streamIsToday
                      ? "bg-gold-400/10 border-gold-400/30"
                      : "bg-white/[0.03] border-white/[0.06]",
                  ].join(" ")}
                >
                  {/* Time */}
                  <div className="min-w-[100px]">
                    <p className={`font-display font-extrabold text-3xl leading-none ${streamIsToday ? "text-gold-400" : "text-white"}`}>
                      {stream.time}
                    </p>
                    <p className="text-xs text-white/30 mt-1">CET</p>
                  </div>

                  {/* Date */}
                  <div className="flex-1 md:border-l md:border-white/[0.06] md:pl-6">
                    <p className="text-white font-medium text-base">
                      {formatDate(stream.date, locale)}
                    </p>
                  </div>

                  {/* CTA */}
                  {streamIsToday && (
                    <a
                      href={siteConfig.socials.twitch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gold-400 text-navy-900 font-display font-bold uppercase tracking-widest text-xs px-5 py-2.5 rounded-md hover:bg-gold-300 transition-colors whitespace-nowrap"
                    >
                      <span className="w-1.5 h-1.5 bg-navy-900 rounded-full animate-blink" />
                      {t.schedulePage.watchLive}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
