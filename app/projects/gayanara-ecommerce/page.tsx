import type { Metadata } from "next";
import Gayanara from "@/components/case/Gayanara";

export const metadata: Metadata = {
  title: "Gayanara e-commerce performance review | Renaldy Bilal Setyawan",
  description: "An end-to-end analytics case study by Renaldy Bilal Setyawan: data quality audit, SQL modeling in DuckDB, seven analyses, a Tableau dashboard and a stakeholder deck.",
};

export default function Page() {
  return <Gayanara />;
}
