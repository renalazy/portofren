import type { Metadata } from "next";
import Tumbuu from "@/components/case/Tumbuu";

export const metadata: Metadata = {
  title: "Tumbuu case study | Renaldy Bilal Setyawan",
  description: "Tumbuu is a parenting tracker web app Renaldy Bilal Setyawan built and launched solo for a client: Next.js, PostgreSQL, Better Auth, Cloudflare R2, Backblaze B2 backups and Midtrans payments.",
};

export default function Page() {
  return <Tumbuu />;
}
