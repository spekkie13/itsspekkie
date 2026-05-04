"use client";

import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";

const upcomingStreams = [
  {
    id: "1",
    title: "Ranked grind — wie stopt me?",
    game: "Clash Royale",
    day: "Mon",
    date: "Maandag 24 maart",
    time: "20:00",
    duration: "~3 uur",
  },
  {
    id: "2",
    title: "Clan war live",
    game: "Clash of Clans",
    day: "Tue",
    date: "Dinsdag 25 maart",
    time: "20:00",
    duration: "~2.5 uur",
  },
  {
    id: "3",
    title: "Zaterdag sessie",
    game: "TBD",
    day: "Sat",
    date: "Zaterdag 29 maart",
    time: "15:00",
    duration: "~4 uur",
  },
];

export function SchedulePageContent() {
  const { t } = useLocale();
  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

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
              const isToday = day === today;
              return (
                <div
                  key={day}
                  className={[
                    "rounded-xl p-5 text-center border transition-colors",
                    time
                      ? isToday
                        ? "bg-gold-400/15 border-gold-400/40"
                        : "bg-white/[0.04] border-white/[0.08]"
                      : "bg-transparent border-white/[0.04] opacity-40",
                  ].join(" ")}
                >
                  <p className={`text-[10px] uppercase tracking-widest mb-3 font-semibold ${time ? (isToday ? "text-gold-400" : "text-white/50") : "text-white/20"}`}>
                    {day}
                  </p>
                  <p className={`font-display font-bold text-lg ${time ? "text-white" : "text-white/20"}`}>
                    {time ?? "—"}
                  </p>
                  {isToday && time && (
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
              const isToday = stream.day === today;
              return (
                <div
                  key={stream.id}
                  className={[
                    "flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-xl border",
                    isToday
                      ? "bg-gold-400/10 border-gold-400/30"
                      : "bg-white/[0.03] border-white/[0.06]",
                  ].join(" ")}
                >
                  {/* Time */}
                  <div className="min-w-[100px]">
                    <p className={`font-display font-extrabold text-3xl leading-none ${isToday ? "text-gold-400" : "text-white"}`}>
                      {stream.time}
                    </p>
                    <p className="text-xs text-white/30 mt-1">{stream.duration}</p>
                  </div>

                  {/* Info */}
                  <div className="flex-1 md:border-l md:border-white/[0.06] md:pl-6">
                    <p className="text-white font-medium text-base">{stream.title}</p>
                    <p className="text-xs text-white/40 mt-1">{stream.date} · {stream.game}</p>
                  </div>

                  {/* CTA */}
                  {isToday && (
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