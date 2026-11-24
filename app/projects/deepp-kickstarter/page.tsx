import type { Metadata } from "next";
import Deepp from "@/components/case/Deepp";

export const metadata: Metadata = {
  title: "Kickstarter DEEPP case study | Renaldy Bilal Setyawan",
  description: "An exploratory analysis of 375K+ Kickstarter campaigns by Renaldy Bilal Setyawan, with a Tableau dashboard and investor recommendations.",
};

export default function Page() {
  return <Deepp />;
}
