"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function EventsTeaser() {
  const { t } = useLocale();

  return (
    <section className="py-20 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-2">
              {t.events.eyebrow}
            </p>
            <h2 className="font-display font-extrabold text-5xl uppercase text-white">
              {t.events.title}
            </h2>
          </div>
          <Link
            href="/events"
            className="hidden md:block text-xs text-white/40 uppercase tracking-widest hover:text-white transition-colors"
          >
            {t.events.allEvents}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* KotH card */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden hover:border-gold-400/30 transition-colors">
            <div className="bg-gold-400/10 border-b border-gold-400/20 px-6 py-4 flex items-center justify-between gap-4">
              <h3 className="font-display font-extrabold text-xl uppercase text-white tracking-wide">
                {t.events.koth.name}
              </h3>
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest shrink-0">
                {t.events.koth.dateShort}
              </span>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                {t.events.koth.teaserDescription}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30 uppercase tracking-widest">
                  {t.events.koth.prize}
                </span>
                <Link
                  href="/events#signup"
                  className="text-xs font-semibold text-gold-400 uppercase tracking-widest hover:text-gold-300 transition-colors"
                >
                  {t.events.koth.signUp}
                </Link>
              </div>
            </div>
          </div>

          {/* Marathon card */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden hover:border-gold-400/30 transition-colors">
            <div className="bg-gold-400/10 border-b border-gold-400/20 px-6 py-4 flex items-center justify-between gap-4">
              <h3 className="font-display font-extrabold text-xl uppercase text-white tracking-wide">
                {t.events.marathon.name}
              </h3>
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest shrink-0">
                {t.events.marathon.dateShort}
              </span>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                {t.events.marathon.teaserDescription}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30 uppercase tracking-widest">
                  {t.events.marathon.announcedShort}
                </span>
                <Link
                  href="/events"
                  className="text-xs font-semibold text-gold-400 uppercase tracking-widest hover:text-gold-300 transition-colors"
                >
                  {t.events.details}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}