"use client";

import { useState, useRef } from "react";
import { signupOverview } from "@/data/signups-overview";

const marathonDetails = [
    "Timer starts at 7 hours — a nod to 7 years of streaming",
    "Community keeps it alive: subs, bits & donations add time",
    "Channel Point Redemptions: challenge me as attacker or defender",
    "2v2 Legend mode tournament integrated mid-marathon",
    "On-the-fly challenges for non-TH18 players throughout",
    "~7 hours of streaming per day across 2 weeks",
];

const timerTable = [
    { action: "1 Sub (Tier 1)",  time: "+7 min" },
    { action: "1 Sub (Tier 2)",  time: "+14 min" },
    { action: "1 Sub (Tier 3)",  time: "+21 min" },
    { action: "5 Gift Subs",     time: "+42 min" },
    { action: "10 Gift Subs",    time: "+84 min" },
    { action: "20 Gift Subs",    time: "+175 min" },
    { action: "50 Gift Subs",    time: "+420 min" },
    { action: "100 Bits",        time: "+77 sec" },
    { action: "500 Bits",        time: "+7 min" },
    { action: "1,000 Bits",      time: "+13 min" },
    { action: "2,500 Bits",      time: "+49 min" },
    { action: "5,000 Bits",      time: "+77 min" },
    { action: "10,000 Bits",     time: "+140 min" },
    { action: "€5 Donation",     time: "+7 min" },
    { action: "€10 Donation",    time: "+14 min" },
    { action: "€20 Donation",    time: "+28 min" },
    { action: "€50 Donation",    time: "+77 min" },
    { action: "€100 Donation",   time: "+140 min" },
];

interface FormState {
    twitch: string;
    ign: string;
    tag: string;
    th: string;
    discord: string;
    agreed: boolean;
}

export function EventsContent() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const signupRef = useRef<HTMLDivElement>(null);

    const [form, setForm] = useState<FormState>({
        twitch: "",
        ign: "",
        tag: "",
        th: "",
        discord: "",
        agreed: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId: "marathon_2v2",
                    twitch: form.twitch,
                    ign: form.ign,
                    tag: form.tag,
                    th: form.th,
                    discord: form.discord,
                }),
            });

            if (!res.ok) throw new Error("Submission failed");
            setSubmitted(true);
        } catch {
            setError("Something went wrong — please try again or contact me on Discord.");
        } finally {
            setLoading(false);
        }
    };

    const isSignupOpen = signupOverview["marathon_2v2"]?.open ?? false;
    const signupCount = signupOverview["marathon_2v2"]?.total ?? 0;

    return (
        <div className="pt-28 pb-20 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <p className="text-xs font-semibold text-gold-400 uppercase tracking-[3px] mb-3">
                    What&apos;s coming
                </p>
                <h1 className="font-display font-extrabold text-7xl uppercase text-white mb-12 leading-none">
                    Events<span className="text-outline-gold">.</span>
                </h1>

                {/* ── Marathon ── */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="font-display font-extrabold text-4xl uppercase text-white">
                            ⏱️ 7-Year Marathon
                        </h2>
                        <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
              Jun 28 – Jul 12, 2025
            </span>
                    </div>
                    <p className="text-white/30 text-sm mb-6">Announced May 18th · Marathon starts June 28th</p>

                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                        A 2-week community-powered marathon stream. The timer starts at 7 hours as a nod to
                        7 years of streaming. It ticks down in real time — the only way to keep it alive is
                        for the community to support through subs, bits, donations and in-game challenges.
                        If the timer hits zero, the stream ends.
                    </p>

                    <ul className="space-y-2 mb-10">
                        {marathonDetails.map((d) => (
                            <li key={d} className="flex items-center gap-3 text-sm text-white/50">
                                <span className="w-1.5 h-1.5 bg-gold-400 rotate-45 shrink-0 inline-block" />
                                {d}
                            </li>
                        ))}
                    </ul>

                    {/* Timer table */}
                    <h3 className="font-display font-bold text-xl uppercase text-white mb-4 tracking-wide">
                        How to add time
                    </h3>
                    <p className="text-white/40 text-sm mb-5">
                        Same rates apply on the announcement stream (May 18th) and during the full marathon.
                    </p>
                    <div className="overflow-x-auto mb-16">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                            <tr className="bg-gold-400/10 border border-gold-400/20">
                                <th className="text-left px-4 py-2 font-display font-bold uppercase tracking-wide text-gold-400">Action</th>
                                <th className="text-left px-4 py-2 font-display font-bold uppercase tracking-wide text-gold-400">Time Added</th>
                            </tr>
                            </thead>
                            <tbody>
                            {timerTable.map(({ action, time }, i) => (
                                <tr key={action}
                                    className={`border border-white/[0.06] ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                                    <td className="px-4 py-2 text-white/70">{action}</td>
                                    <td className="px-4 py-2 text-gold-400 font-semibold">{time}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 2v2 Signup */}
                    <div
                        id="signup"
                        ref={signupRef}
                        className="bg-white/[0.03] border border-gold-400/20 rounded-xl p-8"
                    >
                        <h3 className="font-display font-extrabold text-3xl uppercase text-white mb-1">
                            🆚 2v2 Tournament Signup
                        </h3>
                        <p className="text-white/40 text-sm mb-2">
                            Legend mode · Part of the marathon stream
                        </p>
                        {isSignupOpen && (
                            <p className="text-gold-400 text-sm font-semibold mb-8">
                                {signupCount} {signupCount === 1 ? "player" : "players"} signed up so far
                            </p>
                        )}

                        {!isSignupOpen ? (
                            <div className="bg-white/[0.03] border border-white/10 rounded-lg px-6 py-4 inline-block">
                                <p className="font-display font-bold text-xl uppercase text-white/40 tracking-wide">
                                    Signups not open yet — check back soon
                                </p>
                            </div>
                        ) : submitted ? (
                            <div className="bg-gold-400/10 border border-gold-400/30 rounded-lg px-6 py-4 inline-block">
                                <p className="font-display font-bold text-xl uppercase text-gold-400 tracking-wide">
                                    ✓ You&apos;re signed up! See you on June 28th.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                                            Twitch / Display Name
                                        </label>
                                        <input
                                            name="twitch"
                                            value={form.twitch}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="e.g. itsSpekkie"
                                            required
                                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm
                                 px-4 py-3 outline-none focus:border-gold-400/50 focus:bg-gold-400/[0.03]
                                 transition-colors placeholder:text-white/20"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                                            In-Game Name (IGN)
                                        </label>
                                        <input
                                            name="ign"
                                            value={form.ign}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Your CoC player name"
                                            required
                                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm
                                 px-4 py-3 outline-none focus:border-gold-400/50 focus:bg-gold-400/[0.03]
                                 transition-colors placeholder:text-white/20"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                                            Player Tag
                                        </label>
                                        <input
                                            name="tag"
                                            value={form.tag}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="#ABC123"
                                            required
                                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm
                                 px-4 py-3 outline-none focus:border-gold-400/50 focus:bg-gold-400/[0.03]
                                 transition-colors placeholder:text-white/20"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                                            Town Hall Level
                                        </label>
                                        <select
                                            name="th"
                                            value={form.th}
                                            onChange={handleChange}
                                            required
                                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm
                                 px-4 py-3 outline-none focus:border-gold-400/50 transition-colors
                                 appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select TH level</option>
                                            {Array.from({ length: 9 }, (_, i) => i + 10).map(th => (
                                                <option key={th} value={`TH${th}`}>Town Hall {th}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-2 sm:col-span-2">
                                        <label className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                                            Discord Username{" "}
                                            <span className="normal-case tracking-normal font-normal text-white/25">
                        (optional)
                      </span>
                                        </label>
                                        <input
                                            name="discord"
                                            value={form.discord}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="e.g. spekkie"
                                            className="bg-white/[0.04] border border-white/10 rounded-md text-white text-sm
                                 px-4 py-3 outline-none focus:border-gold-400/50 focus:bg-gold-400/[0.03]
                                 transition-colors placeholder:text-white/20"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreed"
                                        checked={form.agreed}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 w-4 h-4 accent-yellow-400 cursor-pointer shrink-0"
                                    />
                                    <span className="text-sm text-white/40 leading-relaxed">
                    I confirm I will be available during the{" "}
                                        <strong className="text-white">marathon stream (June 28th – July 12th)</strong>{" "}
                                        for the 2v2 tournament.
                  </span>
                                </label>

                                {error && (
                                    <p className="text-red-400 text-sm">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gold-400 text-navy-900 font-display font-bold uppercase
                             tracking-widest text-sm px-8 py-3 rounded-md
                             hover:bg-gold-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Submitting..." : "Submit Signup"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
