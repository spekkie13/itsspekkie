import type { Metadata } from "next";
import { ClipsContent } from "@/components/sections/ClipsContent";

export const metadata: Metadata = {
  title: "Clips — itsspekkie",
};

export default function ClipsPage() {
  return <ClipsContent />;
}