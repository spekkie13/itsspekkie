import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getSheetClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: SCOPES,
    });
    return google.sheets({ version: "v4", auth });
}

function updateOverviewFile(eventId: string) {
    const filePath = path.join(process.cwd(), "data", "signups-overview.ts");
    const content = fs.readFileSync(filePath, "utf-8");

    // Find the event entry and increment the total
    const updated = content.replace(
        new RegExp(`(${eventId}:\\s*{\\s*total:\\s*)(\\d+)`),
        (match, prefix, count) => `${prefix}${parseInt(count) + 1}`
    );

    fs.writeFileSync(filePath, updated);
}

function updateDetailFile(
    eventId: string,
    signup: {
        twitch: string;
        ign: string;
        tag: string;
        th: string;
        discord: string;
        submittedAt: string;
    }
) {
    const filePath = path.join(process.cwd(), "data", "signups-detail.ts");
    const content = fs.readFileSync(filePath, "utf-8");

    const newEntry = `    { twitch: "${signup.twitch}", ign: "${signup.ign}", tag: "${signup.tag}", th: "${signup.th}", discord: "${signup.discord}", submittedAt: "${signup.submittedAt}" },`;

    // Insert before the closing bracket of the event array
    const updated = content.replace(
        new RegExp(`(${eventId}:\\s*\\[)([^\\]]*)(\\])`),
        (match, open, entries, close) => `${open}${entries}${newEntry}\n  ${close}`
    );

    fs.writeFileSync(filePath, updated);
}

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

        // Write to Google Sheets
        const sheets = await getSheetClient();
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Blad1!A:G",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[eventId, twitch, ign, tag, th, discord || "", submittedAt]],
            },
        });

        // Update local data files
        updateOverviewFile(eventId);
        updateDetailFile(eventId, { twitch, ign, tag, th, discord: discord || "", submittedAt });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
