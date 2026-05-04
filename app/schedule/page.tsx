import type { Metadata } from "next";
import { SchedulePageContent } from "@/components/sections/SchedulePageContent";

export const metadata: Metadata = {
  title: "Schedule — itsspekkie",
};

export default function SchedulePage() {
  return <SchedulePageContent />;
}