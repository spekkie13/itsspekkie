import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-display font-extrabold text-lg uppercase tracking-wide text-white/80">
          its<span className="text-gold-400">spekkie</span>
        </Link>

        <div className="flex gap-5">
          <a href={siteConfig.socials.twitch.url} target="_blank" rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            Twitch
          </a>
          <a href={siteConfig.socials.youtube.url} target="_blank" rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            YouTube
          </a>
          <a href={siteConfig.socials.twitter.url} target="_blank" rel="noopener noreferrer"
            className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            Twitter
          </a>
        </div>

        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} itsspekkie
        </p>
      </div>
    </footer>
  );
}
