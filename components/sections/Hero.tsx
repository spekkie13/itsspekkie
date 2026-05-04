"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gold-400/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full bg-gold-400/[0.05] blur-2xl pointer-events-none" />

      {/* Diagonal accent line */}
      <div className="absolute bottom-0 right-0 w-px h-[60%] bg-gradient-to-t from-transparent via-gold-400/20 to-transparent rotate-[15deg] origin-bottom-right pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="opacity-0 animate-[fadeUp_0.6s_ease_forwards]">
          <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-5">
            {t.hero.eyebrow}
          </p>
        </div>

        <h1 className="font-display font-extrabold uppercase leading-[0.9] mb-6">
          <span className="block text-[clamp(64px,12vw,120px)] text-white opacity-0 animate-[fadeUp_0.6s_100ms_ease_forwards]">
            Hi, I&apos;m
          </span>
          <span className="block text-[clamp(72px,14vw,140px)] text-gold-400 opacity-0 animate-[fadeUp_0.6s_200ms_ease_forwards]">
            Spekkie
          </span>
          <span className="block text-[clamp(64px,12vw,120px)] text-outline-gold opacity-0 animate-[fadeUp_0.6s_300ms_ease_forwards]">
            .
          </span>
        </h1>

        <p className="max-w-md text-white/55 text-base leading-relaxed mb-10 opacity-0 animate-[fadeUp_0.6s_350ms_ease_forwards]">
          {siteConfig.tagline}
        </p>

        <div className="flex flex-wrap gap-3 opacity-0 animate-[fadeUp_0.6s_400ms_ease_forwards]">
          <a
            href={siteConfig.socials.twitch.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-400 text-navy-900 font-display font-bold uppercase tracking-widest text-sm px-7 py-3 rounded-md hover:bg-gold-300 transition-colors"
          >
            {t.hero.watchLive}
          </a>
          <Link
            href="/about"
            className="bg-transparent text-white/70 font-display font-semibold uppercase tracking-widest text-sm px-7 py-3 rounded-md border border-white/15 hover:border-white/30 hover:text-white transition-colors"
          >
            {t.hero.aboutMe}
          </Link>
        </div>
      </div>
    </section>
  );
}