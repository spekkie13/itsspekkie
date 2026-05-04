import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Schedule } from "@/components/sections/Schedule";
import { Socials } from "@/components/sections/Socials";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Schedule />
      <Socials />
    </>
  );
}
