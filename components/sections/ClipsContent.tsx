"use client";

import { useLocale } from "@/lib/locale-context";

const clips = [
  {
    id: "1",
    title: "Clip titel hier",
    game: "Clash Royale",
    views: "12.4K",
    date: "2 days ago",
    thumbnail: null,
    url: "https://twitch.tv",
  },
  {
    id: "2",
    title: "Nog een clip",
    game: "Clash of Clans",
    views: "8.1K",
    date: "5 days ago",
    thumbnail: null,
    url: "https://twitch.tv",
  },
  {
    id: "3",
    title: "Highlight moment",
    game: "Clash Royale",
    views: "3.2K",
    date: "1 week ago",
    thumbnail: null,
    url: "https://twitch.tv",
  },
];

export function ClipsContent() {
  const { t } = useLocale();

  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-3">
          {t.clips.eyebrow}
        </p>
        <h1 className="font-display font-extrabold text-7xl uppercase text-white mb-2 leading-none">
          {t.clips.title}<span className="text-outline-gold">.</span>
        </h1>
        <p className="text-white/40 text-sm mb-12">
          {t.clips.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clips.map((clip) => (
            <a
              key={clip.id}
              href={clip.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden hover:border-gold-400/30 transition-colors"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-navy-800 relative overflow-hidden">
                {clip.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-white/10">
                      <path d="M5 3l14 9-14 9V3z" fill="currentColor" />
                    </svg>
                  </div>
                )}
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 3l14 9-14 9V3z" fill="#071038" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="p-4">
                <p className="text-white font-medium text-sm leading-snug mb-2 group-hover:text-gold-400 transition-colors">
                  {clip.title}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30 uppercase tracking-wide">{clip.game}</span>
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <span>{clip.views} {t.clips.views}</span>
                    <span>{clip.date}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}