"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";

export function LiveButton() {
    const { t } = useLocale();
    const [isLive, setIsLive] = useState<boolean | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function check() {
            try {
                const res = await fetch("/api/twitch-status");
                const data = await res.json();
                if (!cancelled) setIsLive(data.isLive);
            } catch {
                if (!cancelled) setIsLive(false);
            }
        }

        check();
        const id = setInterval(check, 60_000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    // Don't render until we know the status to avoid layout shift
    if (isLive === null) return null;

    return (
        <a
            href={siteConfig.socials.twitch.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 border text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors ${
                isLive
                    ? "bg-gold-400/10 border-gold-400/30 text-gold-400 hover:bg-gold-400/20"
                    : "bg-white/5 border-white/10 text-white/20 hover:bg-white/10"
            }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${
                    isLive ? "bg-gold-400 animate-blink" : "bg-white/30"
                }`}
            />
            {isLive ? t.nav.live : t.nav.offline}
        </a>
    );
}
