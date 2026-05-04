export type Locale = "en" | "nl";

export const translations = {
  en: {
    nav: {
      about: "About",
      schedule: "Schedule",
      clips: "Clips",
      merch: "Merch",
      live: "Live",
    },
    hero: {
      eyebrow: "Streamer · Content creator · NL",
      watchLive: "Watch live",
      aboutMe: "About me",
    },
    stats: {
      labels: ["Twitch followers", "YouTube subs", "Streams per week", "Years creating"],
    },
    scheduleSection: {
      eyebrow: "When to catch me",
      title: "Schedule",
      fullSchedule: "Full schedule →",
      allTimesCet: "All times CET",
      live: "live",
    },
    socials: {
      eyebrow: "Find me on",
      title: "Socials",
      twitchCta: "Follow on Twitch",
      youtubeCta: "Subscribe",
      twitterCta: "Follow",
    },
    about: {
      eyebrow: "Who is",
      bio1: "Hey! I'm Spekkie — a Dutch full-time content creator based in the Netherlands. I've been streaming on Twitch and uploading to YouTube for over two years now, mostly playing Clash of Clans and Clash Royale, but you'll occasionally catch me doing something completely random.",
      bio2: "I started streaming as a hobby and it grew into something I genuinely love doing every day. My community is everything — come hang out!",
      watchTwitch: "Watch on Twitch",
      youtube: "YouTube channel",
    },
    clips: {
      eyebrow: "Best moments",
      title: "Clips",
      subtitle: "Highlights from Twitch & YouTube",
      views: "views",
    },
    schedulePage: {
      eyebrow: "When I'm live",
      title: "Schedule",
      weeklyLabel: "Weekly schedule",
      upcomingLabel: "Upcoming streams",
      allTimesCet: "All times are CET",
      today: "today",
      watchLive: "Watch live",
    },
  },
  nl: {
    nav: {
      about: "Over mij",
      schedule: "Schema",
      clips: "Clips",
      merch: "Merch",
      live: "Live",
    },
    hero: {
      eyebrow: "Streamer · Content creator · NL",
      watchLive: "Kijk live",
      aboutMe: "Over mij",
    },
    stats: {
      labels: ["Twitch volgers", "YouTube abonnees", "Streams per week", "Jaar bezig"],
    },
    scheduleSection: {
      eyebrow: "Wanneer ben ik live",
      title: "Schema",
      fullSchedule: "Volledig schema →",
      allTimesCet: "Alle tijden zijn CET",
      live: "live",
    },
    socials: {
      eyebrow: "Vind me op",
      title: "Socials",
      twitchCta: "Volg op Twitch",
      youtubeCta: "Abonneer",
      twitterCta: "Volg",
    },
    about: {
      eyebrow: "Wie is",
      bio1: "Hey! Ik ben Spekkie — een Nederlandse fulltime content creator. Al meer dan twee jaar stream ik op Twitch en upload ik video's op YouTube, voornamelijk Clash of Clans en Clash Royale, maar je kan me zo tegenkomen met iets heel anders.",
      bio2: "Ik begon met streamen als hobby en het is uitgegroeid tot iets wat ik iedere dag met veel plezier doe. Mijn community is alles — kom gezellig langs!",
      watchTwitch: "Kijk op Twitch",
      youtube: "YouTube kanaal",
    },
    clips: {
      eyebrow: "Beste momenten",
      title: "Clips",
      subtitle: "Highlights van Twitch & YouTube",
      views: "weergaven",
    },
    schedulePage: {
      eyebrow: "Wanneer ben ik live",
      title: "Schema",
      weeklyLabel: "Wekelijks schema",
      upcomingLabel: "Aankomende streams",
      allTimesCet: "Alle tijden zijn CET",
      today: "vandaag",
      watchLive: "Kijk live",
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];