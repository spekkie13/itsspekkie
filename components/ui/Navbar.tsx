"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale-context";

export function Navbar() {
    const [open, setOpen] = useState(false);
    const { locale, t, setLocale } = useLocale();

    const links = [
        { label: t.nav.about,    href: "/about" },
        { label: t.nav.schedule, href: "/schedule" },
        { label: "Events",       href: "/events" },
        { label: t.nav.merch,    href: siteConfig.merch.shop ?? siteConfig.merch.donation },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-sm border-b border-white/5">
            <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-display font-extrabold text-xl uppercase tracking-wide text-white">
                    its<span className="text-gold-400">spekkie</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors font-medium"
                        >
                            {l.label}
                        </Link>
                    ))}

                    {/* Language toggle */}
                    <button
                        onClick={() => setLocale(locale === "en" ? "nl" : "en")}
                        className="text-xs uppercase tracking-widest font-semibold text-white/30 hover:text-white transition-colors"
                        aria-label="Switch language"
                    >
                        {locale === "en" ? "NL" : "EN"}
                    </button>

                    <a
                        href={siteConfig.socials.twitch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gold-400/10 border border-gold-400/30 text-gold-400
                       text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full
                       hover:bg-gold-400/20 transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-blink" />
                        {t.nav.live}
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white/60 hover:text-white"
                    aria-label="Toggle menu"
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        {open ? (
                            <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        ) : (
                            <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-navy-900 border-t border-white/5 px-6 py-4 flex flex-col gap-4">
                    {links.map((l) => (
                        <Link
                            key={l.label}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors font-medium"
                        >
                            {l.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => setLocale(locale === "en" ? "nl" : "en")}
                        className="text-left text-sm uppercase tracking-widest text-white/30 hover:text-white transition-colors font-semibold"
                    >
                        {locale === "en" ? "NL" : "EN"}
                    </button>
                </div>
            )}
        </header>
    );
}
