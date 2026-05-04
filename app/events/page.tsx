import type { Metadata } from "next";
import { EventsContent } from "@/components/sections/EventsContent";

export const metadata: Metadata = {
    title: "Events — itsspekkie",
    description: "Community tournaments, the 7-Year Marathon stream and more events from itsSpekkie.",
};

export default function EventsPage() {
    return <EventsContent />;
}
