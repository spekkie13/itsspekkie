export const siteConfig = {
  name: "itsspekkie",
  displayName: "Spekkie",
  tagline: "Dutch full-time streamer on Twitch & YouTube. Mostly Clash, sometimes chaos.",
  location: "Netherlands",

  // Social links — update these
  socials: {
    twitch: { handle: "itsSpekkie", url: "https://twitch.tv/itsspekkie" },
    youtube: { handle: "itsspekkie", url: "https://youtube.com/@itsspekkie" },
    twitter: { handle: "ItsSpekkie", url: "https://twitter.com/ItsSpekkie" },
  },

  // Stats — update or replace with API calls later (labels are in lib/translations.ts)
  stats: [
    { value: "2.46K" },
    { value: "338" },
    { value: "3×" },
    { value: "7+" },
  ],

  // Stream schedule — null = off
  schedule: [
    { day: "Mon", time: null },
    { day: "Tue", time: "20:00" },
    { day: "Wed", time: null },
    { day: "Thu", time: null },
    { day: "Fri", time: "20:00" },
    { day: "Sat", time: null },
    { day: "Sun", time: "20:00" },
  ],

  // Merch / donation links
  merch: {
    shop: null, // e.g. "https://spekkie.myshopify.com"
    donation: "https://streamelements.com/itsSpekkie/tip",
  },
};
