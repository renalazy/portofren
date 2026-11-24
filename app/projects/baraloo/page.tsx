import type { Metadata } from "next";
import Baraloo from "@/components/case/Baraloo";

export const metadata: Metadata = {
  title: "Baraloo case study | Renaldy Bilal Setyawan",
  description: "Baraloo is an online baby-food store in Surabaya built solo by Renaldy Bilal Setyawan: a Next.js storefront, Supabase database and auth, and a PWA admin panel on a private Tailscale network.",
};

export default function Page() {
  return <Baraloo />;
}
