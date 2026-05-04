"use client";

import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";

export function AboutContent() {
  const { t } = useLocale();

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-3">
          {t.about.eyebrow}
        </p>
        <h1 className="font-display font-extrabold text-7xl uppercase text-white mb-10 leading-none">
          Spekkie<span className="text-outline-gold">.</span>
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-5 text-white/60 leading-relaxed">
          <p>{t.about.bio1}</p>
          <p>{t.about.bio2}</p>
        </div>

        <div className="mt-12 flex gap-4 flex-wrap">
          <a
            href={siteConfig.socials.twitch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-400 text-navy-900 font-display font-bold uppercase tracking-widest text-sm px-7 py-3 rounded-md hover:bg-gold-300 transition-colors"
          >
            {t.about.watchTwitch}
          </a>
          <a
            href={siteConfig.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-white/70 font-display font-semibold uppercase tracking-widest text-sm px-7 py-3 rounded-md border border-white/15 hover:border-white/30 hover:text-white transition-colors"
          >
            {t.about.youtube}
          </a>
        </div>
      </div>
    </div>
  );
}