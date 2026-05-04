import { Resend } from "resend";
import { NextResponse } from "next/server";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const { twitchName, ign, playerTag, townHall, discord } = await req.json();

  if (!twitchName || !ign || !playerTag || !townHall) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "KotH Signup <onboarding@resend.dev>",
      to: "contact.itsspekkie@gmail.com",
      subject: `KotH Signup — ${twitchName}`,
      html: `
        <h2>New King of the Hill Signup</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Twitch name</strong></td><td>${escapeHtml(twitchName)}</td></tr>
          <tr><td><strong>IGN</strong></td><td>${escapeHtml(ign)}</td></tr>
          <tr><td><strong>Player tag</strong></td><td>${escapeHtml(playerTag)}</td></tr>
          <tr><td><strong>Town Hall</strong></td><td>${escapeHtml(townHall)}</td></tr>
          <tr><td><strong>Discord</strong></td><td>${discord ? escapeHtml(discord) : "—"}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}