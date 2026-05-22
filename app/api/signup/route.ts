import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getSheetClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        },
        scopes: SCOPES,
    });
    return google.sheets({ version: "v4", auth });
}

// POST — submit a signup
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { eventId, twitch, ign, tag, th, discord } = body;

        if (!eventId || !twitch || !ign || !tag || !th) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const submittedAt = new Date().toISOString();

        const sheets = await getSheetClient();
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Blad1!A:G",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[eventId, twitch, ign, tag, th, discord || "", submittedAt]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

// GET — read signup count and entries for an event
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get("eventId");

        if (!eventId) {
            return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
        }

        const sheets = await getSheetClient();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Blad1!A:G",
        });

        const rows = response.data.values || [];

        // Filter rows matching this eventId (skip header row if present)
        const signups = rows
            .filter((row) => row[0] === eventId)
            .map((row) => ({
                twitch: row[1] || "",
                ign: row[2] || "",
                tag: row[3] || "",
                th: row[4] || "",
                discord: row[5] || "",
                submittedAt: row[6] || "",
            }));

        return NextResponse.json({
            eventId,
            total: signups.length,
            signups,
        });
    } catch (error) {
        console.error("Signup read error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
