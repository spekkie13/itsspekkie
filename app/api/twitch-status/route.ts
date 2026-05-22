import { NextResponse } from "next/server";

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getTwitchToken(): Promise<string> {
    if (tokenCache && Date.now() < tokenCache.expiresAt) {
        return tokenCache.token;
    }
    const res = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.TWITCH_CLIENT_ID!,
            client_secret: process.env.TWITCH_CLIENT_SECRET!,
            grant_type: "client_credentials",
        }),
    });
    const data = await res.json();
    // Cache with a 5-minute buffer before actual expiry
    tokenCache = {
        token: data.access_token,
        expiresAt: Date.now() + (data.expires_in - 300) * 1000,
    };
    return tokenCache.token;
}

export async function GET() {
    if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
        return NextResponse.json({ isLive: false });
    }
    try {
        const token = await getTwitchToken();
        const channel = process.env.TWITCH_CHANNEL ?? "itsSpekkie";
        const res = await fetch(
            `https://api.twitch.tv/helix/streams?user_login=${channel}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Client-Id": process.env.TWITCH_CLIENT_ID,
                },
                next: { revalidate: 60 },
            }
        );
        const data = await res.json();
        return NextResponse.json({ isLive: (data.data?.length ?? 0) > 0 });
    } catch {
        return NextResponse.json({ isLive: false });
    }
}