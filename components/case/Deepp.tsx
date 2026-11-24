"use client";

import { useT } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { Block, Briefs, CaseHero, CasePage, Checklist, Deck, Finding, Kpis, Recos, Resources, Stack, Steps } from "./kit";
import { Rise } from "../paper";
import { ArrowUpRight } from "../icons";

const PDF = asset("/pdf/DEEPP_Renaldy_Bilal_Setyawan.pdf");
const COLAB = "https://colab.research.google.com/drive/19pok5FP40O9-pOL8I0jdtC37jlY3ss1j?usp=sharing";
const DATASET = "https://mavenanalytics.io/data-playground/kickstarter-projects";
const TABLEAU = "https://public.tableau.com/app/profile/renaldy.bilal.setyawan/viz/DEEPP_Kickstarter_Project/Dashboard1?publish=yes";
const EMBED = "https://public.tableau.com/views/DEEPP_Kickstarter_Project/Dashboard1?:embed=y&:showVizHome=no&:display_count=no&:toolbar=yes";

export default function Deepp() {
  const t = useT();
  return (
    <CasePage>
      <CaseHero
        color="var(--color-grape)"
        kind={t({ en: "Learning path", id: "Jalur belajar" })}
        name="DEEPP"
        subtitle="what gets a Kickstarter campaign funded?"
        lead="An exploratory data analysis of 375K+ Kickstarter campaigns (2009 to 2017) to find the traits of successful projects, written for a prospective-investor audience."
        facts={[
          { k: "program", v: "RevoU FSDA" },
          { k: "year", v: "2024" },
          { k: "campaigns", v: "375K+" },
          { k: "tools", v: "Python · Tableau" },
          { k: "output", v: "Deck + dashboard" },
        ]}
        actions={[
          { href: PDF, label: "Slide deck (PDF)", primary: true },
          { href: COLAB, label: "Colab notebook" },
          { href: DATASET, label: "Dataset" },
          { href: TABLEAU, label: "Tableau Public" },
        ]}
        tags={["Data"]}
        image={{ src: asset("/assets/img/deepp-dashboard-preview.png"), alt: "Tableau dashboard summarizing Kickstarter project trends, backers, categories and top countries by success rate, 2009 to 2017" }}
      />

      <Block label="overview" title="Kickstarter, at a glance"
        intro="Kickstarter launched on 28 April 2009 and became a Public Benefit Corporation in 2015. It now spans 15+ project categories and subcategories. Figures below are as of 28 April 2024.">
        <Kpis items={[
          { n: "23,062,629", l: "total backers, platform-wide" },
          { n: "$7.97B", l: "total dollars pledged, platform-wide" },
          { n: "257,735", l: "successfully funded projects" },
        ]} />
      </Block>

      <Block tint label="problem & scope" title="What investors actually need to know">
        <Briefs items={[
          { title: "Problem statement", body: <p>What are the characteristics of successful projects that investors should look for in future investments?</p> },
          { title: "Scope", body: <p>Kickstarter projects from 2009 to 2017, as a basis for potential future investments.</p> },
          { title: "Objectives", body: <ul><li>Give investors insight into future successful projects and trends.</li><li>Identify the category with the highest success rate.</li><li>Measure how backers and goal completion affect project success.</li></ul> },
        ]} />
      </Block>

      <Block label="methodology" title="Objectives → gathering → cleaning → analysis → recommendation">
        <Steps items={[
          { title: "Objectives", body: "Define the problem and the project objectives." },
          { title: "Gathering", body: "Collect the campaign data." },
          { title: "Cleaning", body: "Clean the data with Python." },
          { title: "Analysis", body: "Exploratory data analysis (EDA) in Python." },
          { title: "Recommendation", body: "Turn the findings into actionable business recommendations." },
        ]} />
      </Block>

      <Block tint label="data analysis" title="Key findings"
        intro="Nine findings from the exploratory analysis, each traced back to its chart in the Tableau dashboard.">
        <Stack gap="gap-8">
          <Finding n={1} statement={<>Success rates held <b>stable from 2009 to 2013</b>, <b>declined in 2014 and 2015</b>, then <b>recovered and stabilized in 2016 and 2017</b>.</>} points={[
            <><b>Stable (2009 to 2013):</b> between 43% and 47%.</>,
            <><b>Declining (2014 to 2015):</b> down to 32% in 2014, then 28% in 2015.</>,
            <><b>Recovering (2016 to 2017):</b> back up to 33% and 37%.</>,
          ]} />
          <Finding n={2} statement={<>The 2014 to 2015 decline traces to a drop in both <b>number of backers</b> and <b>amount pledged</b>.</>} points={[
            <><b>Backers</b> fell to averages of 96 (2014) and 99 (2015).</>,
            <><b>Pledged</b> fell to averages of $7,935 (2014) and $9,059 (2015).</>,
          ]} />
          <Finding n={3} statement={<>The 2016 to 2017 recovery came with a rebound in <b>backer support</b> and <b>pledged amounts</b>.</>} points={[
            <><b>Backers</b> rose to averages of 124 (2016) and 129 (2017).</>,
            <><b>Pledged</b> rose to averages of $11,248 (2016) and $12,347 (2017).</>,
          ]} />
          <Finding n={4} statement={<>There is a <b>positive correlation</b> between success rate and average number of backers: more backers tends to mean a higher success rate.</>} points={[
            <><b>Up trends</b> (2009 to 2011 and 2015 to 2017) show backers rising alongside success rate.</>,
            <><b>Down trend</b> (2013 to 2014) shows both falling together, from 43 to 33 average backers.</>,
          ]} />
          <Finding n={5} statement={<>Projects with <b>more backers</b> are more likely to succeed.</>} points={[
            <><b>Successful</b> projects average 204.1 backers, well above every other project state.</>,
            <>Suspended 105.3 · Live 68.1 · Cancelled 26.0 · Failed 16.4 average backers.</>,
          ]} />
          <Finding n={6} statement={<><b>Music, Comic and Dance</b> subcategories post the highest success rates.</>} points={[
            <><b>Music (Chiptune):</b> 77.14%, the highest of any subcategory.</>,
            <><b>Comic (Anthologies):</b> 74.81%.</>,
            <><b>Dance (Residencies):</b> 72.46%.</>,
          ]} />
          <Finding n={7} statement={<><b>Faster goal completion</b> goes with higher success rates.</>} points={[
            <>Success rate peaks for campaigns that hit their goal within <b>6 to 29 days</b> (54% to 63%), well above the roughly 35% to 52% baseline for slower campaigns.</>,
          ]} />
          <Finding n={8} statement={<>Projects that <b>meet their funding goal</b> succeed at a dramatically higher rate: <b>a 35+ point difference</b> versus those that don't.</>} points={[
            <><b>Goal completed</b> (135,290 projects): 99.26% success rate.</>,
            <><b>Goal not completed</b> (239,563 projects): 0.74% success rate.</>,
          ]} />
          <Finding n={9} statement={<>The <b>United States, Hong Kong, United Kingdom, Denmark and Singapore</b> post the highest success rates by country.</>} points={[
            <><b>United States:</b> 37.59% success rate, 109,238 successful projects.</>,
            <><b>Hong Kong:</b> 37.43% success rate, 216 successful projects.</>,
            <><b>United Kingdom · Denmark · Singapore:</b> 36.16% / 34.03% / 32.90%, with 12,056 / 178 / 359 successful projects.</>,
          ]} />
        </Stack>
      </Block>

      <Block label="insights" title="Insight summary">
        <Checklist items={[
          <>Overall, Kickstarter success rates have stayed fairly stable over the years, with some fluctuation.</>,
          <>The 2014 to 2015 decline was likely driven by a <b>drop in both backers and pledged amounts</b>, while the 2016 to 2017 recovery <b>came with increased support</b>.</>,
          <>Projects with <b>more backers</b> tend to succeed more often, so building a strong backer community matters.</>,
          <>Categories like <b>Comic, Dance and Music</b> show consistently high success rates, reflecting their popularity among backers.</>,
          <><b>Faster goal completion</b> is a key success factor, which points to setting realistic, achievable funding goals.</>,
          <><b>Meeting the funding goal</b> sharply raises the odds of success, so careful planning and budgeting pay off.</>,
          <>The United States, United Kingdom, Hong Kong, Denmark and Singapore lead in project success.</>,
        ]} />
      </Block>

      <Block tint label="recommendations" title="Steps for choosing a project to invest in">
        <Recos items={[
          { title: "Goal completion", body: "Focus on goal completion in both time and money, with particular attention to the amount pledged by the crowd." },
          { title: "Number of backers", body: "Backers are the people supporting the project. The more backers, the more likely it succeeds, since interest is already proven." },
          { title: "Project category", body: "Based on prior-year data, pick one of the top 5 subcategories from the most successful category." },
          { title: "Country", body: "Pick from the top 5 countries that produce the most successful projects." },
        ]} />
      </Block>

      <Block label="dashboard" title="Explore the live Tableau dashboard"
        intro="The interactive version of the dashboard above. Filter by year, category or country to explore the data yourself.">
        <Rise>
          <div className="relative bg-white p-3 shadow-[0_14px_34px_rgb(29_26_22/0.2)]">
            <span className="tape -top-3 left-10 z-10 -rotate-6" />
            <iframe src={EMBED} title="Kickstarter DEEPP dashboard on Tableau Public" loading="lazy"
              className="block h-[min(85vh,1000px)] w-full border border-ink/10 bg-paper-2" />
          </div>
          <a href={TABLEAU} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-1.5 font-hand text-xl text-ink underline decoration-tomato decoration-2 underline-offset-4">
            Open it on Tableau Public <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Rise>
      </Block>

      <Block tint label="slide deck" title="The full presentation"
        intro="The 25-slide deck as presented to RevoU: overview, methodology, the nine findings and the investor recommendations, in the order they were delivered.">
        <Deck dir="/assets/img/deepp/deck" total={25} label="Kickstarter Projects DEEPP slide deck" pdf={PDF} />
      </Block>

      <Block label="appendix" title={t({ en: "Working files", id: "File kerja" })}>
        <Resources items={[
          { label: "Slide deck", title: "Full presentation (PDF)", desc: "Overview, methodology, analysis and recommendations as presented to RevoU.", href: PDF },
          { label: "Notebook", title: "Google Colab", desc: "Python data cleaning and EDA, end to end.", href: COLAB },
          { label: "Dataset", title: "Raw Kickstarter data", desc: "Kickstarter campaigns, 2009 to 2017.", href: DATASET },
          { label: "Dashboard", title: "Tableau Public", desc: "Standalone link to this dashboard on Tableau Public.", href: TABLEAU },
        ]} />
      </Block>
    </CasePage>
  );
}
