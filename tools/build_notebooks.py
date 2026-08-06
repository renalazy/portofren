#!/usr/bin/env python3
"""Render the Gayanara notebooks to static HTML pages styled like the rest of the site.

Standard library only — no nbconvert, no Jinja. The notebooks use a small,
predictable slice of Markdown (headings, rules, blockquotes, lists, bold,
italic, inline code) and their outputs are already HTML tables, so a purpose-
built converter is smaller and more predictable here than a general one.

    python3 tools/build_notebooks.py

Writes projects/notebooks/*.html. Re-run after re-executing a notebook.
"""

import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "downloads", "gayanara")
OUT = os.path.join(ROOT, "projects", "notebooks")

NOTEBOOKS = [
    {
        "src": "01_Data_Quality_Audit.ipynb",
        "out": "01-data-quality-audit.html",
        "phase": "Phase 1 · Data Quality Audit",
        "title": "01. Data Quality Audit & Cleaning",
        "desc": "Executed notebook: four data quality checks in SQL on the Gayanara "
                "e-commerce dataset — null audit, duplicate customers, category "
                "standardization, and referential integrity.",
    },
    {
        "src": "02_Exploratory_Data_Analysis_EDA.ipynb",
        "out": "02-exploratory-data-analysis.html",
        "phase": "Phase 2 · Exploratory Analysis",
        "title": "02. Exploratory Data Analysis & Business Insights",
        "desc": "Executed notebook: seven analytical tasks in SQL on the Gayanara "
                "e-commerce dataset, from revenue trend through cohort retention.",
    },
]

# ----------------------------------------------------------------- markdown

INLINE = [
    (re.compile(r"`([^`]+)`"), lambda m: "<code>%s</code>" % html.escape(m.group(1))),
    (re.compile(r"\[([^\]]+)\]\(([^)]+)\)"),
     lambda m: '<a href="%s">%s</a>' % (html.escape(m.group(2)), m.group(1))),
    (re.compile(r"\*\*([^*]+)\*\*"), lambda m: "<strong>%s</strong>" % m.group(1)),
    (re.compile(r"(?<!\*)\*([^*\n]+)\*(?!\*)"), lambda m: "<em>%s</em>" % m.group(1)),
]


def inline(text):
    """Escape, then apply inline Markdown. Code spans are protected first so
    their contents are never re-parsed as emphasis."""
    text = html.escape(text)
    spans = []

    def stash(m):
        spans.append("<code>%s</code>" % m.group(1))
        return "\x00%d\x00" % (len(spans) - 1)

    text = re.sub(r"`([^`]+)`", stash, text)
    for pattern, repl in INLINE[1:]:
        text = pattern.sub(repl, text)
    return re.sub(r"\x00(\d+)\x00", lambda m: spans[int(m.group(1))], text)


def render_markdown(src):
    """Convert the Markdown subset the notebooks actually use."""
    lines = src.split("\n")
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        if re.match(r"^-{3,}$", stripped):
            out.append("<hr>")
            i += 1
            continue

        m = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if m:
            level = min(len(m.group(1)) + 1, 6)  # demote: page <h1> is the title
            out.append("<h%d>%s</h%d>" % (level, inline(m.group(2)), level))
            i += 1
            continue

        # Blockquote — the notebooks use these for the "Key Insights" callouts,
        # and they may contain their own bullet list.
        if stripped.startswith(">"):
            body = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                body.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            out.append('<blockquote class="nb-callout">%s</blockquote>'
                       % render_markdown("\n".join(body)))
            continue

        m = re.match(r"^([-*]|\d+\.)\s+", stripped)
        if m:
            ordered = not m.group(1) in ("-", "*")
            tag = "ol" if ordered else "ul"
            items = []
            while i < len(lines):
                cur = lines[i].strip()
                m2 = re.match(r"^(?:[-*]|\d+\.)\s+(.*)$", cur)
                if m2:
                    items.append(m2.group(1))
                elif cur and not re.match(r"^(#{1,6}\s|>|-{3,}$)", cur):
                    if not items:
                        break
                    items[-1] += " " + cur  # continuation of a wrapped item
                else:
                    break
                i += 1
            out.append("<%s>%s</%s>" % (
                tag, "".join("<li>%s</li>" % inline(x) for x in items), tag))
            continue

        para = []
        while i < len(lines):
            cur = lines[i].strip()
            if not cur or re.match(r"^(#{1,6}\s|>|[-*]\s|\d+\.\s|-{3,}$)", cur):
                break
            para.append(cur)
            i += 1
        out.append("<p>%s</p>" % inline(" ".join(para)))

    return "\n".join(out)


# --------------------------------------------------------------- code cells

SQL_KEYWORDS = r"""SELECT|FROM|WHERE|GROUP\s+BY|ORDER\s+BY|HAVING|JOIN|LEFT\s+JOIN|
RIGHT\s+JOIN|INNER\s+JOIN|ON|AS|AND|OR|NOT|IN|IS|NULL|CASE|WHEN|THEN|ELSE|END|WITH|
UNION\s+ALL|UNION|DISTINCT|COUNT|SUM|MAX|MIN|AVG|ROUND|CAST|COALESCE|MEDIAN|LIMIT|
CREATE|REPLACE|TABLE|ALTER|ADD|COLUMN|UPDATE|SET|COPY|TO|SHOW|TABLES|ASC|DESC|
DATE_TRUNC|DATE_DIFF|STRFTIME|QUANTILE_CONT|READ_CSV_AUTO|HEADER|DELIMITER|VARCHAR|
BIGINT|DATE|INT"""

# The setup cells are Python, so its keywords are matched too. Both languages
# share the same token colour — the point is legibility, not a language badge.
PY_KEYWORDS = r"""import|from|if|elif|else|for|while|raise|return|def|class|try|
except|finally|with|as|and|or|not|in|is|None|True|False|print|lambda|pass"""

KEYWORDS = (SQL_KEYWORDS + "|" + PY_KEYWORDS).replace("\n", "")

TOKENIZER = re.compile(
    r"(?P<comment>--[^\n]*|\#[^\n]*)"
    r"|(?P<string>'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\")"
    r"|(?P<magic>^\s*%{1,2}\w+)"
    r"|(?P<kw>\b(?:" + KEYWORDS + r")\b)"
    r"|(?P<num>\b\d+(?:\.\d+)?\b)",
    re.IGNORECASE | re.MULTILINE,
)


def highlight(code):
    """Light syntax highlighting. Comments and strings are matched before
    keywords, so a keyword inside a comment stays a comment."""
    out, pos = [], 0
    for m in TOKENIZER.finditer(code):
        out.append(html.escape(code[pos:m.start()]))
        kind = m.lastgroup
        text = html.escape(m.group())
        out.append('<span class="tok-%s">%s</span>' % (kind, text))
        pos = m.end()
    out.append(html.escape(code[pos:]))
    return "".join(out)


def render_outputs(cell):
    parts = []
    for o in cell.get("outputs", []):
        kind = o.get("output_type")
        if kind == "stream":
            parts.append('<pre class="nb-stream">%s</pre>'
                         % html.escape("".join(o.get("text", []))))
        elif kind == "error":
            parts.append('<pre class="nb-stream nb-error">%s</pre>'
                         % html.escape("\n".join(o.get("traceback", []))))
        else:
            data = o.get("data", {})
            if "text/html" in data:
                markup = "".join(data["text/html"])
                # JupySQL prints a connection status line before every result;
                # it is noise on a rendered page.
                if "Running query in" in markup:
                    continue
                parts.append('<div class="nb-table-wrap">%s</div>' % markup)
            elif "text/plain" in data:
                parts.append('<pre class="nb-stream">%s</pre>'
                             % html.escape("".join(data["text/plain"])))
    if not parts:
        return ""
    return '<div class="nb-out"><span class="nb-gutter">Out</span><div class="nb-out-body">%s</div></div>' % "".join(parts)


# ------------------------------------------------------------------- page

PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} | Renaldy Bilal Setyawan</title>
<meta name="description" content="{desc}">
<meta name="author" content="Renaldy Bilal Setyawan">
<meta name="robots" content="index, follow">

<link rel="icon" type="image/png" href="../../assets/img/r.png">
<link rel="apple-touch-icon" href="../../assets/img/r.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<link rel="stylesheet" href="../../assets/css/style.css?v=2">
<link rel="stylesheet" href="../../assets/css/notebook.css?v=1">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<svg class="icon-sprite" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
  <symbol id="icon-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </symbol>
</svg>

<header class="site-header case-header">
  <nav class="nav" aria-label="Primary">
    <a class="brand" href="../../index.html" aria-label="Renaldy Bilal Setyawan — home">
      <img src="../../assets/img/r.png" alt="" width="26" height="26">
      <span aria-hidden="true">RBS</span>
    </a>
    <a class="case-back" href="../gayanara-ecommerce.html">
      <svg class="icon" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
      Back to case study
    </a>
  </nav>
</header>

<main id="main">
  <section class="nb-hero graph-paper">
    <div class="wrap">
      <span class="eyebrow">{phase}</span>
      <h1>{title}</h1>
      <p class="nb-hero-sub">{desc}</p>
      <p class="nb-source">Source notebook: <code>{srcname}</code> · rendered with saved cell outputs, exactly as executed.</p>
      <div class="case-resource-links">
        <a class="btn btn-secondary" href="../gayanara-ecommerce.html">Read the case study</a>
        <a class="btn btn-secondary" href="../../downloads/gayanara/{srcname}" download>Download .ipynb</a>
        <a class="btn btn-secondary" href="https://github.com/renalazy/gayanara-ecommerce" target="_blank" rel="noopener">GitHub repo</a>
      </div>
    </div>
  </section>

  <section class="nb-body">
    <div class="wrap">
{cells}
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="wrap">
    <p>Renaldy Bilal Setyawan · <a href="../gayanara-ecommerce.html">Gayanara case study</a> · <a href="../../index.html">All projects</a></p>
  </div>
</footer>

</body>
</html>
"""


def build(spec):
    with open(os.path.join(SRC, spec["src"]), encoding="utf-8") as fh:
        nb = json.load(fh)

    chunks = []
    for idx, cell in enumerate(nb["cells"]):
        source = "".join(cell["source"]).strip()
        if not source:
            continue
        if cell["cell_type"] == "markdown":
            # The notebook's own H1 title cell is already the page <h1>.
            if idx == 0 and source.startswith("# "):
                continue
            chunks.append('<div class="nb-md">%s</div>' % render_markdown(source))
        else:
            chunks.append(
                '<div class="nb-cell">'
                '<div class="nb-in"><span class="nb-gutter">In</span>'
                '<pre class="nb-code"><code>%s</code></pre></div>%s</div>'
                % (highlight(source), render_outputs(cell))
            )

    page = PAGE.format(
        title=html.escape(spec["title"]),
        desc=html.escape(spec["desc"]),
        phase=html.escape(spec["phase"]),
        srcname=spec["src"],
        cells="\n".join("      " + c for c in chunks),
    )

    os.makedirs(OUT, exist_ok=True)
    dest = os.path.join(OUT, spec["out"])
    with open(dest, "w", encoding="utf-8") as fh:
        fh.write(page)
    print("wrote %s (%d cells)" % (os.path.relpath(dest, ROOT), len(chunks)))


if __name__ == "__main__":
    for spec in NOTEBOOKS:
        build(spec)
