"use client";

import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";

export function StatsBar() {
  const { t } = useLocale();

  return (
    <section className="border-y border-white/[0.06] bg-navy-950/60">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
        {siteConfig.stats.map((stat, i) => (
          <div key={i} className="px-8 py-7">
            <p className="font-display font-extrabold text-3xl text-gold-400 leading-none tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs text-white/35 uppercase tracking-widest mt-1.5">
              {t.stats.labels[i]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}