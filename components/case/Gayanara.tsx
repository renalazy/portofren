"use client";

import { useT } from "@/lib/i18n";
import { asset } from "@/lib/site";
import { Block, Briefs, Callout, CaseHero, CasePage, Checklist, Code, DataTable, Deck, Figure, Finding, Kpis, Recos, Resources, Stack, Steps, TwoUp } from "./kit";
import { Rise } from "../paper";

const img = (f: string) => asset(`/assets/img/gayanara/${f}`);
const PDF = asset("/pdf/Gayanara_Performance_Review.pdf");
const REPO = "https://github.com/renalazy/gayanara-ecommerce";
const TABLEAU = "https://public.tableau.com/shared/4BX3MHD2Z?:display_count=n&:origin=viz_share_link";
const DATA = "https://ngulikdata.com/";
const NB1 = asset("/projects/notebooks/01-data-quality-audit.html");
const NB2 = asset("/projects/notebooks/02-exploratory-data-analysis.html");

const SQL = {
  nulls: `-- One block per suspect column, UNION ALL'd into a single audit table.
-- The customers block is shown; products.material and reviews.review_text
-- follow the same shape. Full query in the notebook.
SELECT
  'customers' AS table_name,
  'phone'     AS column_name,
  COUNT(*)    AS total_rows,
  SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) AS null_count,
  ROUND(
    SUM(CASE WHEN phone IS NULL THEN 1 ELSE 0 END) * 100.0 / COUNT(*),
    2
  ) AS null_percentage
FROM customers
UNION ALL
-- ... products.material, reviews.review_text
;`,
  dupes: `SELECT
  email,
  COUNT(customer_id) AS account_count
FROM customers
GROUP BY email
HAVING COUNT(customer_id) > 1
ORDER BY account_count DESC;`,
  category: `-- 1. Add a column to hold the standardized category
ALTER TABLE products ADD COLUMN category_clean VARCHAR;

-- 2. Map every raw spelling (Indonesian or English, any casing) to one label
UPDATE products
SET category_clean = CASE
    WHEN LOWER(category) IN ('aksesoris', 'accessories')   THEN 'Accessories'
    WHEN LOWER(category) IN ('celana', 'pants')            THEN 'Pants'
    WHEN LOWER(category) IN ('jaket', 'jacket')            THEN 'Jacket'
    WHEN LOWER(category) IN ('kemeja', 'shirt')            THEN 'Shirt'
    WHEN LOWER(category) IN ('kaos', 't-shirt', 'tshirt')  THEN 'T-Shirt'
    WHEN LOWER(category) IN ('dress')                      THEN 'Dress'
    ELSE 'Other'
END;

-- 3. Verify: 'Other' must come back empty, or the mapping missed a spelling
SELECT category_clean, COUNT(*) AS count
FROM products
GROUP BY category_clean;`,
  orphans: `-- LEFT JOIN, not INNER: an INNER JOIN would hide the very rows being counted
SELECT
  COUNT(*) AS total_items_sold,
  SUM(CASE WHEN p.product_id IS NULL THEN 1 ELSE 0 END) AS orphaned_items,
  ROUND(
    SUM(CASE WHEN p.product_id IS NULL THEN 1 ELSE 0 END) * 100.0 / COUNT(*),
    2
  ) AS orphaned_percentage
FROM order_items oi
LEFT JOIN products p ON oi.product_id = p.product_id;`,
  revenue: `WITH order_gross AS (
    -- Aggregate to order level FIRST, so the order-level
    -- discount is not multiplied once per line item
    SELECT
        o.order_id,
        STRFTIME(o.order_date, '%Y-%m')          AS order_month,
        SUM(oi.quantity)                         AS units,
        SUM(oi.subtotal_idr)                     AS gross_revenue,
        MAX(COALESCE(o.discount_amount_idr, 0))  AS discount
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_status NOT IN ('cancelled', 'returned')
    GROUP BY o.order_id, order_month, o.discount_amount_idr
)
SELECT
    order_month,
    COUNT(DISTINCT order_id)                  AS total_orders,
    SUM(units)                                AS total_units_sold,
    SUM(gross_revenue) - SUM(discount)        AS net_revenue,
    CAST((SUM(gross_revenue) - SUM(discount))
         / COUNT(DISTINCT order_id) AS BIGINT) AS net_aov
FROM order_gross
GROUP BY order_month
ORDER BY order_month;`,
  categories: `-- category_clean, not category: the raw column would split Jacket across
-- 'Jaket' and 'jacket' and rank a fragment of it
SELECT
    p.category_clean,
    COUNT(DISTINCT oi.order_id) AS total_orders,
    SUM(oi.quantity)            AS total_units_sold,
    SUM(oi.subtotal_idr)        AS gross_revenue,
    CAST(SUM(oi.subtotal_idr) / SUM(oi.quantity) AS BIGINT) AS avg_price_per_unit
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
JOIN orders   o ON oi.order_id   = o.order_id
WHERE o.order_status NOT IN ('cancelled', 'returned')
GROUP BY p.category_clean
ORDER BY gross_revenue DESC;`,
  rfm: `-- Recency is measured against the dataset's own max order_date, not today.
-- Anchoring to CURRENT_DATE would make every customer look dormant purely
-- because the extract is historical.
WITH rfm_base AS (
    SELECT
        c.email,
        CAST((SELECT MAX(order_date) FROM orders) AS DATE)
            - CAST(MAX(o.order_date) AS DATE) AS recency_days,
        COUNT(DISTINCT o.order_id)            AS frequency,
        SUM(o.total_amount_idr)               AS monetary_value
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY o.customer_id, c.email
)
SELECT
    email,
    recency_days,
    frequency,
    monetary_value,
    CASE
        WHEN recency_days <= 60  AND frequency >= 5 AND monetary_value >= 4000000 THEN 'Champions'
        WHEN recency_days >  60  AND (frequency >= 5 OR monetary_value >= 4000000) THEN 'At Risk (VIPs)'
        WHEN recency_days <= 30  AND frequency < 3  THEN 'New / Promising'
        WHEN recency_days >= 120 THEN 'Lost / Inactive'
        ELSE 'Regulars'
    END AS customer_segment
FROM rfm_base
ORDER BY monetary_value DESC;`,
  geo: `-- AOV is computed per city here rather than averaged in the BI layer:
-- averaging order values across cities would weight small cities equally
SELECT
    shipping_province,
    shipping_city,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(total_amount_idr)    AS total_revenue,
    CAST(SUM(total_amount_idr) / COUNT(DISTINCT order_id) AS BIGINT) AS average_order_value
FROM orders
WHERE order_status NOT IN ('cancelled', 'returned')
GROUP BY shipping_province, shipping_city
ORDER BY total_revenue DESC
LIMIT 15;`,
  promo: `-- total_amount_idr is stored NET of discount. Comparing it across the two
-- groups measures the discount itself, not basket behaviour, so gross_aov
-- adds the discount back and puts both groups on the same footing.
SELECT
    CASE WHEN promo_code IS NULL THEN 'No Promo' ELSE 'Used Promo' END AS promo_status,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(total_amount_idr)    AS net_revenue,
    SUM(COALESCE(discount_amount_idr, 0)) AS total_discount_given,
    CAST(SUM(total_amount_idr + COALESCE(discount_amount_idr, 0))
         / COUNT(DISTINCT order_id) AS BIGINT) AS gross_aov,   -- like-for-like
    CAST(SUM(total_amount_idr)
         / COUNT(DISTINCT order_id) AS BIGINT) AS net_aov      -- the misleading one
FROM orders
WHERE order_status NOT IN ('cancelled', 'returned')
GROUP BY promo_status;`,
  courier: `-- No status filter on this one, deliberately: cancelled and returned orders
-- are the measurement here, so excluding them would zero out the metric
SELECT
    courier,
    COUNT(order_id) AS total_orders,
    SUM(CASE WHEN order_status = 'returned'  THEN 1 ELSE 0 END) AS returned_orders,
    SUM(CASE WHEN order_status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,
    ROUND(SUM(CASE WHEN order_status = 'returned'  THEN 1.0 ELSE 0 END)
          / COUNT(order_id) * 100, 2) AS return_rate_pct,
    ROUND(SUM(CASE WHEN order_status = 'cancelled' THEN 1.0 ELSE 0 END)
          / COUNT(order_id) * 100, 2) AS cancel_rate_pct
FROM orders
GROUP BY courier
ORDER BY return_rate_pct DESC;`,
  retention: `WITH first_purchases AS (
    -- Step 1: first month a customer made a COMPLETED purchase. The status
    -- filter matters twice over: without it a cancelled order can define the
    -- cohort month, and cancelled orders then count as "retention".
    SELECT customer_id, DATE_TRUNC('month', MIN(order_date)) AS cohort_month
    FROM orders
    WHERE order_status NOT IN ('cancelled', 'returned')
    GROUP BY customer_id
),
cohort_data AS (            -- Step 2: every later completed purchase month
    SELECT f.cohort_month, DATE_TRUNC('month', o.order_date) AS activity_month, o.customer_id
    FROM orders o
    JOIN first_purchases f ON o.customer_id = f.customer_id
    WHERE o.order_status NOT IN ('cancelled', 'returned')
),
cohort_sizes AS (           -- Step 3: original size of each cohort
    SELECT cohort_month, COUNT(DISTINCT customer_id) AS initial_customers
    FROM first_purchases
    GROUP BY cohort_month
),
retention_counts AS (       -- Step 4: months-since-first-order, and who was active
    SELECT c.cohort_month,
           DATE_DIFF('month', c.cohort_month, c.activity_month) AS month_index,
           COUNT(DISTINCT c.customer_id) AS active_customers
    FROM cohort_data c
    GROUP BY c.cohort_month, month_index
)
-- Pooled across cohorts and weighted by cohort size, so a single small
-- cohort with an odd month can't swing the curve
SELECT
    r.month_index,
    SUM(r.active_customers)   AS total_active,
    SUM(s.initial_customers)  AS total_cohort_base,
    ROUND(SUM(r.active_customers) * 100.0 / SUM(s.initial_customers), 2) AS avg_retention_pct
FROM retention_counts r
JOIN cohort_sizes s ON r.cohort_month = s.cohort_month
WHERE r.month_index <= 12
GROUP BY r.month_index
ORDER BY r.month_index;`,
};

export default function Gayanara() {
  const t = useT();
  return (
    <CasePage>
      <CaseHero
        color="var(--color-tomato)"
        kind={t({ en: "Learning path", id: "Jalur belajar" })}
        name="Gayanara"
        subtitle="an e-commerce performance review"
        lead={<>A full analyst loop on a five-table Indonesian fashion e-commerce dataset: audit the data before trusting it, model revenue in SQL, read the findings honestly, and hand a stakeholder something they can act on. The dataset is <b className="font-semibold text-ink">synthetically generated</b>, so this page shows workflow and judgment, not real business conclusions.</>}
        facts={[
          { k: "type", v: "Self-directed" },
          { k: "year", v: "2025" },
          { k: "rows", v: "10,586" },
          { k: "engine", v: "DuckDB + JupySQL" },
          { k: "output", v: "Dashboard + deck" },
        ]}
        actions={[
          { href: PDF, label: "Slide deck (PDF)", primary: true },
          { href: REPO, label: "GitHub repo" },
          { href: TABLEAU, label: "Tableau dashboard" },
          { href: DATA, label: "Dataset" },
        ]}
        tags={["Data", "SQL", "Python", "Tableau"]}
        image={{ src: img("gayanara-dashboard-preview.png"), alt: "Tableau dashboard for Gayanara e-commerce: revenue, completed orders and AOV KPI cards, monthly net revenue trend, top cities, promo impact, courier rates, customer segments and retention curve" }}
      />

      <Block label="overview" title="The headline numbers"
        intro="Every figure below comes from one revenue definition that reconciles to the rupiah against the source orders table. The three KPI cards on the dashboard tie to each other exactly: Rp 1,265,340,379 ÷ 2,521 orders = Rp 501,920.">
        <Kpis items={[
          { n: "Rp 1.27B", l: "net revenue, Jan 2022 to Feb 2025" },
          { n: "2,521", l: "completed orders (excl. cancelled & returned)" },
          { n: "Rp 501,920", l: "average order value" },
          { n: "5,442", l: "units sold across 6 clean categories" },
          { n: "10,586", l: "source rows across 5 relational tables" },
        ]} />
        <div className="mt-12">
          <Callout title="About this dataset">
            <p>Gayanara is a <b>synthetically generated</b> dataset published by NgulikData. It is used here to demonstrate the analytical workflow (auditing, SQL modeling, segmentation and BI delivery), not to produce real business conclusions. Two findings on this page, flat category revenue and flat retention, are artifacts of the data generator rather than business signal, and are labelled as such where they appear.</p>
          </Callout>
        </div>
      </Block>

      <Block tint label="problem & scope" title="What a fashion retailer would actually ask">
        <Briefs items={[
          { title: "Problem statement", body: <p>Where is revenue coming from, which customers are worth re-engaging, and are the levers the business already pulls (discounts and courier choice) doing what management thinks they do?</p> },
          { title: "Scope", body: <p>Five tables, 10,586 rows, orders from January 2022 to February 2025. All revenue work excludes cancelled and returned orders; shipping is excluded as a pass-through cost.</p> },
          { title: "Objectives", body: <ul>
            <li>Set a single revenue definition that reconciles to source before reporting anything.</li>
            <li>Quantify growth and say whether it is volume-led or price-led.</li>
            <li>Segment customers into tiers marketing can export and act on.</li>
            <li>Test whether promo codes lift basket size, and whether any courier underperforms.</li>
            <li>Deliver a dashboard and a deck that state their own limits.</li>
          </ul> },
        ]} />
      </Block>

      <Block label="the data" title="Five tables, deliberately messy"
        intro="The dataset ships with the problems a real extract has: duplicate email addresses, product categories written in a mix of Indonesian and English with inconsistent casing, and missing review text. That is the point. The audit is the first phase, not an afterthought.">
        <DataTable head={["Table", "Rows", "Grain"]} num={[1]} rows={[
          [<b key="a">customers</b>, "800", "one row per customer account"],
          [<b key="a">orders</b>, "3,000", "one row per order"],
          [<b key="a">order_items</b>, "4,986", "one row per product line"],
          [<b key="a">products</b>, "300", "one row per SKU"],
          [<b key="a">reviews</b>, "1,500", "one row per review"],
        ]} />
        <Rise className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed text-ink-soft">Raw CSVs are loaded into a local DuckDB database with <code className="font-mono text-[0.9em] text-ink">read_csv_auto</code> and queried through JupySQL&apos;s <code className="font-mono text-[0.9em] text-ink">%%sql</code> magic: full SQL against a real engine, no standalone server, and the notebook stays readable as SQL rather than as pandas chaining.</p>
        </Rise>
      </Block>

      <Block tint label="methodology" title="Audit → exploration → dashboard → stakeholder deck">
        <Steps items={[
          { title: "Data quality audit", body: "Nulls, duplicates, category standardization and referential integrity, before any metric is quoted." },
          { title: "Exploratory analysis", body: "Seven analytical tasks in SQL, from revenue trend to cohort retention." },
          { title: "Dashboard", body: "Seven views published to Tableau Public on pre-aggregated CSV extracts." },
          { title: "Stakeholder deck", body: "12 slides, including a dedicated slide on what the analysis cannot tell us." },
        ]} />
      </Block>

      <Block label="definitions" title="One revenue definition, reconciled to source"
        intro="The quickest way an analytics deliverable loses credibility is three KPIs computed three different ways. These five definitions are fixed once and used everywhere: in the notebooks, the dashboard and the deck.">
        <DataTable head={["Metric", "Definition", "Value"]} num={[2]} rows={[
          [<b key="a">Gross revenue</b>, <><code>SUM(order_items.subtotal_idr)</code>, excluding cancelled and returned orders</>, "Rp 1,296,768,000"],
          [<b key="a">Net revenue</b>, "Gross revenue less order-level discounts", "Rp 1,265,340,379"],
          [<b key="a">Completed orders</b>, "Orders not cancelled and not returned", "2,521"],
          [<b key="a">Average order value</b>, "Net revenue ÷ completed orders", "Rp 501,920"],
          [<b key="a">Units sold</b>, <code key="a">SUM(order_items.quantity)</code>, "5,442"],
        ]} />
        <div className="mt-10">
          <Callout title="Two decisions worth stating" color="var(--color-sky)">
            <ul>
              <li><b>Net revenue reconciles to the rupiah</b> against <code>orders.total_amount_idr</code>. If it didn&apos;t, the discount logic would be wrong somewhere.</li>
              <li><b>Shipping is excluded</b> as a pass-through cost, and <b>category revenue is reported gross</b>. Order-level discounts can&apos;t be attributed to individual line items, so category figures sum to Rp 1,296.8M rather than the Rp 1,265.3M headline. The two reconcile exactly; the gap is the Rp 31.4M of discounts.</li>
            </ul>
          </Callout>
        </div>
      </Block>

      <Block tint label="phase 1 · data quality audit" title="Four checks before any number is quoted"
        intro={<>Notebook <a href={NB1}><code>01_Data_Quality_Audit.ipynb</code></a> shows every query in full, with its output. Each check ends in a decision, and each decision is written down, including the one where the answer was &quot;leave it alone.&quot;</>}>
        <Stack>
          <Finding n={1} label="Null audit" statement="Missing values sit in three columns, and only one of them constrains anything." points={[
            <><b>customers.phone</b>: 5.0% missing (40 rows). The only material gap: it rules those customers out of any SMS campaign. Email-led campaigns are unaffected.</>,
            <><b>products.material</b>: 3.0% missing (9 rows). Low impact; needs a default label in product-mix breakdowns.</>,
            <><b>reviews.review_text</b>: 8.0% missing (120 rows). Normal behaviour, since people leave a star rating without writing anything. Not a data defect.</>,
          ]} />
          <Code>{SQL.nulls}</Code>
          <Finding n={2} label="Duplicate customers" statement={<>Three email addresses map to two <code>customer_id</code>s each, and I deliberately did <b>not</b> merge them.</>} points={[
            <><b>Scale:</b> 6 of 800 customer records, 0.75% of the base.</>,
            <><b>Decision:</b> <code>customer_id</code> stays the analytical grain, preserving the source system&apos;s own definition of a customer. Merging on email would silently invent a different entity than the one the business transacts with.</>,
            <><b>Follow-up:</b> flagged for upstream data engineering as an account-creation issue, and documented as an explicit decision rather than left to look like an oversight.</>,
          ]} />
          <Code>{SQL.dupes}</Code>
          <Finding n={3} label="Category standardization" statement="Fourteen distinct category values collapse to six real ones." points={[
            <><b>The mess:</b> mixed Indonesian and English terms (<em>Aksesoris</em> vs <em>Accessories</em>) plus inconsistent casing (<em>Dress</em> vs <em>dress</em>). Left alone, every category revenue figure would be split across duplicate buckets.</>,
            <><b>The fix:</b> a <code>CASE WHEN</code> mapping to six clean categories (Jacket, Pants, Accessories, Dress, Shirt, T-Shirt), saved as a new <code>products.category_clean</code> column so downstream queries never re-derive it.</>,
          ]} />
          <Code>{SQL.category}</Code>
          <Finding n={4} label="Referential integrity" statement="Zero orphaned rows, which is what makes the rest of the analysis safe." points={[
            <><b>0 of 4,986</b> <code>order_items</code> rows fail to match a <code>products</code> row.</>,
            <><b>Why it matters:</b> this check is what allows <code>INNER JOIN</code> for all revenue work. Without it, every product-level join could silently drop sales and no total would tie out.</>,
          ]} />
          <Code>{SQL.orphans}</Code>
        </Stack>
      </Block>

      <Block label="phase 2 · exploratory analysis" title="Seven questions, seven answers"
        intro={<>Notebook <a href={NB2}><code>02_Exploratory_Data_Analysis_EDA.ipynb</code></a> has every query with its result table. Each task below states the business question, the approach (including where the obvious approach would have been wrong) and the finding.</>}>
        <Stack>
          <Finding n={1} label="Revenue trends" statement={<>Revenue roughly tripled over three years, and the growth is <b>volume-led, not price-led</b>.</>} points={[
            <><b>Question:</b> what is total net revenue, and how are order volume and AOV trending?</>,
            <><b>Approach:</b> a CTE aggregates to <em>order level first</em>, then joins. <code>discount_amount_idr</code> lives on the order, so joining straight to <code>order_items</code> would count the discount once per line item and understate net revenue on every multi-item order.</>,
            <><b>Finding:</b> monthly net revenue grew from Rp 21.8M (Jan 2022) to Rp 66.3M (Feb 2025), roughly 3×. Orders rose from about 32 to 100+ per month. AOV showed no direction at all, moving between Rp 390K and Rp 610K throughout.</>,
            <><b>So what:</b> the business grows by getting more orders, not by getting more out of each one. Anything aimed at basket size is untested territory, which sets up Task 5.</>,
          ]} />
          <Code>{SQL.revenue}</Code>
          <Figure src={img("monthly-net-revenue.png")} alt="Line chart of monthly net revenue from January 2022 to February 2025, trending upward from roughly Rp 22M to Rp 66M per month" caption="Monthly net revenue, Jan 2022 to Feb 2025. The trend is up; the AOV line behind it is flat." />

          <Finding n={2} label="Category performance" statement={<>Jackets lead on both units and revenue despite having the <em>lowest</em> average unit price.</>} points={[
            <><b>Question:</b> which categories drive volume, and which drive revenue?</>,
            <><b>Finding:</b> Jackets top units sold (1,026) and gross revenue (Rp 224.0M) at the lowest average unit price of the six (Rp 218K), a purely volume-driven lead. Shirts carry the highest unit price (Rp 263K) but rank 5th in revenue.</>,
            <><b>Caveat, stated up front:</b> all six categories fall within 14% of each other in revenue. Real apparel catalogs are far more concentrated. This flatness is a generator artifact, so the ranking shouldn&apos;t be read as a merchandising signal.</>,
          ]} />
          <Code>{SQL.categories}</Code>
          <DataTable head={["Category", "Units sold", "Gross revenue", "Avg unit price"]} num={[1, 2, 3]} rows={[
            [<b key="a">Jacket</b>, "1,026", "Rp 223,984,000", "Rp 218,308"],
            ["Pants", "896", "Rp 221,044,000", "Rp 246,701"],
            ["Accessories", "971", "Rp 219,999,000", "Rp 226,570"],
            ["Dress", "874", "Rp 219,546,000", "Rp 251,197"],
            ["Shirt", "824", "Rp 216,616,000", "Rp 262,883"],
            ["T-Shirt", "851", "Rp 195,579,000", "Rp 229,823"],
          ]} />

          <Finding n={3} label="RFM segmentation" statement={<>The headline isn&apos;t the segment sizes. It&apos;s that the median customer hasn&apos;t bought in <b>145 days</b>.</>} points={[
            <><b>Approach:</b> fixed business-rule thresholds on recency, frequency and monetary value, checked against the observed distribution (median recency 145 days, median frequency 4 orders, median lifetime spend Rp 1.69M, p90 frequency 6, p90 spend Rp 3.66M). Rules, not clusters, chosen for interpretability, since marketing has to be able to explain the list they export.</>,
            <><b>Segments (787 customers):</b> Champions 26 · Regulars 269 · At Risk (VIPs) 135 · New/Promising 14 · Lost/Inactive 343.</>,
            <><b>Honest caveat:</b> the &quot;Lost&quot; cutoff of 120 days sits <em>below</em> the median recency of 145 days, so by construction more than half the base lands there. The segment is large partly because of where I drew the line; a 180-day cutoff would tell a calmer story about the same customers.</>,
            <><b>So what:</b> dormancy is the default state of this base, not an edge case. The actionable slice is the 135 At Risk (VIPs): high spenders who have gone quiet, including the single highest-spending customer at 129 days without a purchase.</>,
          ]} />
          <Code>{SQL.rfm}</Code>

          <Finding n={4} label="Geography" statement="Revenue is spread evenly across cities, but encoding AOV as colour surfaces one outlier." points={[
            <><b>Top five by revenue:</b> Semarang Rp 77M · Depok Rp 76M · Medan Rp 75M · Bekasi Rp 70M · Manado Rp 69M.</>,
            <><b>The design choice that earns its keep:</b> the dashboard colours each city by AOV rather than revenue. That immediately exposes <b>Bekasi</b>: 4th in total revenue, but the lowest AOV of the top five (Rp 461K vs Rp 543K in Semarang). Same revenue rank, very different order economics.</>,
            <><b>So what:</b> Bekasi&apos;s revenue is carried by order count, not basket size, which is a different ad-budget argument than the cities above it.</>,
          ]} />
          <Code>{SQL.geo}</Code>
          <TwoUp>
            <Figure rotate={-0.8} src={img("top-5-cities.png")} alt="Bar chart of top 5 cities by revenue, coloured by average order value, showing Bekasi with the lowest AOV of the group" caption="Top 5 cities by revenue, coloured by AOV. Bekasi stands out." />
            <Figure rotate={0.8} src={img("customer-segments.png")} alt="Bar chart of customer counts by RFM segment: Lost/Inactive 343, Regulars 269, At Risk VIPs 135, Champions 26, New/Promising 14" caption="RFM segment distribution across 787 customers." />
          </TwoUp>

          <Finding n={5} label="Promo impact" statement={<>The naive comparison said promos <em>shrink</em> baskets. The naive comparison was broken.</>} points={[
            <><b>The trap:</b> comparing <code>total_amount_idr</code> between promo and organic orders shows promo AOV at Rp 484K against Rp 514K organic, an apparent 6% penalty. But <code>total_amount_idr</code> is recorded <em>net of discount</em>. The discount is subtracted from promo orders and then read back as a smaller basket. The metric measures the discount, not behaviour.</>,
            <><b>The correction:</b> add the discount back so both groups are compared on a <b>gross</b> basis. Promo orders then average <b>Rp 515,199</b> against <b>Rp 513,830</b> organic, a 0.3% difference, which is effectively zero.</>,
            <><b>The real finding:</b> Rp 31.4M was spent on discounts across 1,025 promo orders and produced <b>no measurable basket lift</b>. Not a penalty but a null result, which is the more useful answer and the more expensive one.</>,
            <><b>Recommendation:</b> replace flat discounts with threshold promos (&quot;Save Rp 50K on orders over Rp 600K&quot;) that need a larger basket to unlock, instead of rewarding purchases that were happening anyway.</>,
          ]} />
          <Code>{SQL.promo}</Code>
          <DataTable head={["Group", "Orders", "Discount given", "Net AOV (naive)", "Gross AOV (correct)"]} num={[1, 2, 3, 4]} rows={[
            [<b key="a">Used promo</b>, "1,025", "Rp 31,427,621", "Rp 484,538", "Rp 515,199"],
            ["No promo", "1,496", "Rp 0", "Rp 513,830", "Rp 513,830"],
          ]} caption="The naive column reverses the conclusion of the correct one. Only the gross comparison is like-for-like." />
          <Figure src={img("promo-impact.png")} alt="Bar chart comparing gross average order value for promo versus non-promo orders, showing near-identical values around Rp 515,000" caption="Promo impact on gross AOV: two bars, effectively the same height. That's the finding." />

          <Finding n={6} label="Courier evaluation" statement={<>Anteraja has the worst cancellation rate <em>and</em> the best return rate, which points at a specific problem, not a bad partner.</>} points={[
            <><b>Finding:</b> Anteraja cancels 14.33% of orders (44 of 307), the highest of five couriers, against a fleet average near 10%. J&amp;T 12.39% · JNE 9.94% · SiCepat 9.73% · Pos Indonesia 7.45%.</>,
            <><b>The nuance:</b> Anteraja also has the <em>lowest</em> return rate of the five (2.61%). Damage in transit would raise returns, not cancellations. The pattern points to friction <b>before dispatch</b>, such as pickup delays or capacity rejections, rather than mishandling.</>,
            <><b>Recommendation, scoped to the evidence:</b> run a dispatch-time audit on Anteraja orders and shift volume in one region as a controlled test. Explicitly <em>not</em> a contract decision: 307 orders is too thin a sample to renegotiate on, and no significance testing was done.</>,
          ]} />
          <Code>{SQL.courier}</Code>
          <Figure src={img("courier-performance.png")} alt="Grouped bar chart of cancellation and return rates for five couriers, with Anteraja highest on cancellations and lowest on returns" caption="Cancellation and return rates by courier. Anteraja's two bars move in opposite directions." />

          <Finding n={7} label="Cohort retention" statement={<>The flat retention curve is the most interesting result on this page, and it&apos;s a finding about the <em>data</em>, not the business.</>} points={[
            <><b>Finding:</b> pooled across cohorts, repeat purchase rate holds between 8.1% and 12.6% from Month 1 through Month 12, with no downward slope. M1 9.15% · M6 10.32% · M12 10.40%.</>,
            <><b>Why that&apos;s wrong:</b> real e-commerce retention drops steeply in Month 1 and then flattens. A curve that is flat from the start means tenure carries no information about whether a customer buys next month, which is the signature of <b>independent random draws</b>, not customer lifecycle behaviour.</>,
            <><b>The honest read:</b> this is a sign of the synthetic generator. It would have been easy, and completely wrong, to present it as a churn crisis. Instead it sets a hard boundary: <b>this dataset cannot support churn analysis at all</b>, so churn drivers are out of scope rather than badly estimated.</>,
          ]} />
          <Code>{SQL.retention}</Code>
          <Figure src={img("retention-curve.png")} alt="Cohort retention curve showing repeat purchase rate flat between roughly 8% and 13% from month 1 to month 12, with no decay" caption="Pooled cohort retention, Month 1 to Month 12. A real curve decays. This one doesn't." />
        </Stack>
      </Block>

      <Block tint label="phase 3 · dashboard" title="Seven views on Tableau Public"
        intro="Built on the six pre-aggregated CSV extracts from Phase 2 rather than the raw transaction tables. The BI layer shouldn't re-compute thousands of rows on every filter interaction.">
        <Briefs cols={2} items={[
            { title: "What's on it", body: <ul>
              <li>Three KPI cards: Total Revenue, Completed Orders, AOV</li>
              <li>Monthly net revenue trend</li>
              <li>Top 5 cities by revenue, AOV encoded as colour</li>
              <li>Promo impact on gross AOV</li>
              <li>Courier cancellation and return rates</li>
              <li>Customer segments and the retention curve</li>
            </ul> },
            { title: "Two things it does honestly", body: <>
              <p>The KPI cards <b className="text-ink">reconcile</b>: Rp 1,265,340,379 ÷ 2,521 = Rp 501,920. A viewer can check the arithmetic on the card row itself.</p>
              <p className="mt-3">The date filter applies to the revenue and KPI views only. Because the CSVs are separate Tableau data sources, a global filter isn&apos;t available, so the filter&apos;s scope is <em>labelled</em> rather than left to look global and quietly mislead.</p>
            </> },
        ]} />
      </Block>

      <Block label="phase 4 · stakeholder deck" title="Twelve slides, one of them about what we don't know"
        intro={<>Executive summary, KPIs, revenue timeline, retention, geography, promo, courier, segments, recommendations, limitations and a closing slide, plus a dedicated <b className="text-ink">&quot;What this analysis can and can&apos;t tell us&quot;</b> slide placed before the recommendations rather than buried in an appendix.</>}>
        <Deck dir="/assets/img/gayanara/deck" total={12} label="Gayanara Performance Review stakeholder deck" pdf={PDF} />
      </Block>

      <Block tint label="recommendations" title="What I'd actually put in front of a stakeholder">
        <Recos items={[
          { title: "Restructure promos", body: "Rp 31.4M of discounts produced no measurable basket lift. Replace flat discounts with threshold offers (\"Save Rp 50K on orders over Rp 600K\") that need a larger basket to unlock, and run the next one as a holdout test so incrementality is measured rather than inferred." },
          { title: "Win back At Risk VIPs", body: "135 high-spending customers have gone dormant, including the single largest spender at 129 days. This is an exportable list, not an abstraction. Target it directly before spending more on acquisition." },
          { title: "Audit Anteraja dispatch", body: "The highest cancellation rate paired with the lowest return rate points to pre-dispatch friction. Audit dispatch timing and shift volume in one region as a controlled test, not a contract decision on 307 orders." },
          { title: "Protect volume-led growth", body: "Growth comes entirely from order count while AOV stays flat. That makes acquisition and repeat-purchase frequency the levers that matter, and makes flat AOV a target to work on rather than an accident to ignore." },
          { title: "Fix duplicate accounts upstream", body: "Three duplicate emails isn't a reporting problem today, but it is a sign-up flow problem that compounds. Route it to data engineering instead of patching it in every downstream query." },
        ]} />
      </Block>

      <Block label="limitations" title="What this analysis can't tell you"
        intro="The value of an analysis is bounded by what its data can support, and saying so is part of the deliverable, not a disclaimer bolted onto the end.">
        <Checklist items={[
          <><b>No margin data.</b> The promo analysis measures revenue impact, not true ROI. It is also observational rather than causal; proving incrementality would need a holdout test.</>,
          <><b>Courier samples are small.</b> Anteraja carries 307 orders and Pos Indonesia 161. No significance testing was done, so courier differences are signals to investigate, not conclusions.</>,
          <><b>No lifecycle dynamics in the data.</b> The flat retention curve shows purchases behave as independent draws, so churn drivers are out of scope entirely rather than weakly estimated.</>,
          <><b>Three duplicate emails were found and deliberately not merged.</b> <code>customer_id</code> stays the grain; segment counts are directional at the account level.</>,
          <><b>RFM boundaries are fixed business rules, not statistical clusters.</b> They were chosen for interpretability, and the &quot;Lost&quot; threshold in particular inflates that segment by construction.</>,
          <><b>Scope is January 2022 to February 2025</b>, and February 2025 may be a partial month, so read the last point on the revenue trend with that in mind.</>,
          <><b>The dataset is synthetic throughout.</b> Flat category revenue and flat retention are generator artifacts. Nothing here is a claim about a real market.</>,
        ]} />
      </Block>

      <Block tint label="disclosure" title="AI assistance, disclosed">
        <Callout color="var(--color-sage)">
          <p>All SQL, analysis and dashboard work is my own. After finishing the first version, I ran the whole project (notebooks, deck and dashboard) through a structured review with Claude (Anthropic), acting as a senior analyst, a hiring manager and an end user.</p>
          <p>That review surfaced four real errors, which I then corrected:</p>
          <ul>
            <li>My promo conclusion was reversed. I had compared post-discount AOV against pre-discount AOV, which made promos look like they shrank baskets. Corrected to a like-for-like gross comparison.</li>
            <li>My three headline KPIs used three different revenue definitions and didn&apos;t reconcile. Consolidated to one definition that ties exactly to source.</li>
            <li>Revenue was computed on catalog list price and ignored line-item quantity, understating units by 29%.</li>
            <li>I had read the flat retention curve as a churn crisis. It actually points to synthetic data, since real retention curves decay.</li>
          </ul>
          <p>Claude also helped tighten the wording of findings and recommendations. Every number on this page was re-run and verified by me against the source data.</p>
        </Callout>
      </Block>

      <Block label="appendix" title={t({ en: "Working files", id: "File kerja" })}>
        <Resources items={[
          { label: "Notebook · Phase 1", title: "01_Data_Quality_Audit.ipynb", desc: "DuckDB build from raw CSVs, plus the four audit checks and the decisions they led to.",
            actions: [{ href: NB1, label: "View notebook", external: false }, { href: asset("/downloads/gayanara/01_Data_Quality_Audit.ipynb"), label: "Download .ipynb", download: true, external: false }] },
          { label: "Notebook · Phase 2", title: "02_Exploratory_Data_Analysis_EDA.ipynb", desc: "All seven analytical tasks in SQL, from revenue trend through cohort retention.",
            actions: [{ href: NB2, label: "View notebook", external: false }, { href: asset("/downloads/gayanara/02_Exploratory_Data_Analysis_EDA.ipynb"), label: "Download .ipynb", download: true, external: false }] },
          { label: "Slide deck", title: "Full presentation (PDF)", desc: "12 slides, including the \"what this analysis can and can't tell us\" slide.", href: PDF },
          { label: "Dashboard", title: "Full dashboard image (PNG)", desc: "Static capture of all seven views, for when Tableau Public is slow to load.", href: img("gayanara-dashboard-preview.png") },
          { label: "Aggregated data", title: "Six dashboard CSVs", desc: "geospatial · promo_roi · courier_eval · rfm_segments · cohort_retention · monthly_revenue.", href: `${REPO}/tree/main/dashboard_exports` },
          { label: "Source", title: "GitHub repository", desc: "Notebooks, SQL and export scripts for the whole pipeline.", href: REPO },
          { label: "Dashboard", title: "Tableau Public", desc: "Interactive version. Filter the revenue and KPI views by date.", href: TABLEAU },
          { label: "Dataset", title: "NgulikData", desc: "The original synthetic Gayanara dataset, linked at source rather than rehosted here.", href: DATA },
        ]} />
      </Block>
    </CasePage>
  );
}
