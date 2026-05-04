"use client";

import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";

const TwitchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

export function Socials() {
  const { t } = useLocale();

  const platforms = [
    {
      name: "Twitch",
      icon: TwitchIcon,
      color: "bg-[#9147ff]/10 border-[#9147ff]/20 text-[#9147ff]",
      hoverColor: "hover:bg-[#9147ff]/20",
      url: siteConfig.socials.twitch.url,
      handle: siteConfig.socials.twitch.handle,
      cta: t.socials.twitchCta,
    },
    {
      name: "YouTube",
      icon: YouTubeIcon,
      color: "bg-red-500/10 border-red-500/20 text-red-400",
      hoverColor: "hover:bg-red-500/20",
      url: siteConfig.socials.youtube.url,
      handle: siteConfig.socials.youtube.handle,
      cta: t.socials.youtubeCta,
    },
    {
      name: "Twitter / X",
      icon: TwitterIcon,
      color: "bg-sky-400/10 border-sky-400/20 text-sky-400",
      hoverColor: "hover:bg-sky-400/20",
      url: siteConfig.socials.twitter.url,
      handle: siteConfig.socials.twitter.handle,
      cta: t.socials.twitterCta,
    },
  ];

  return (
    <section className="py-20 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-2">
          {t.socials.eyebrow}
        </p>
        <h2 className="font-display font-extrabold text-5xl uppercase text-white mb-10">
          {t.socials.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map(({ name, icon: Icon, color, hoverColor, url, handle, cta }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col gap-4 p-6 rounded-xl border transition-colors ${color} ${hoverColor}`}
            >
              <div className="flex items-center justify-between">
                <Icon />
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="opacity-40 group-hover:opacity-80 transition-opacity"
                >
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-display font-bold text-xl text-white">{handle}</p>
                <p className="text-xs opacity-60 mt-0.5">{name}</p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                {cta} →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}