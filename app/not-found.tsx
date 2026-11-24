import type { Metadata } from "next";
import NotFound from "@/components/NotFound";

export const metadata: Metadata = { title: "Page not found | Renaldy Bilal Setyawan" };

export default function Page() {
  return <NotFound />;
}
