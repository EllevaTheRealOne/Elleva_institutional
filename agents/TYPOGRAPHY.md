Elleva Typography System

Design Direction

Elleva typography must communicate:

* Institutional credibility
* Financial sophistication
* Precision
* Intelligence
* Global positioning
* Premium restraint
* Technical clarity

The typography system should feel institutional, modern, editorial, and technically sophisticated.

Avoid typography that feels:

* Generic SaaS
* Playful
* Overly promotional
* Crypto-oriented
* Retail trading-oriented
* Visually aggressive
* Excessively bold without hierarchy

Elleva uses a multi-typeface system with clearly defined responsibilities.

⸻

Production Typefaces

The official production typefaces currently used by Elleva are:

* Poppins — Display and headline typography
* Inter — UI, navigation, metrics, controls, and primary interface typography
* Open Sans — Body copy and descriptive content
* Roboto — Metadata, microcopy, and compact technical information

Current font loading:

<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap"
  rel="stylesheet"
/>

Do not introduce additional typefaces unless explicitly required by the design system.

⸻

Font Roles

Poppins — Display Typeface

Poppins is the primary display typeface.

Use for:

* Hero headlines
* Major section headlines
* CTA headlines
* Feature titles
* Card titles
* High-impact editorial statements

CSS token:

--font-display: 'Poppins', sans-serif;

Utility:

.font-display

Poppins should provide strong hierarchy and visual identity.

Avoid using Poppins for long body paragraphs, metadata, or dense UI elements.

⸻

Inter — UI Typeface

Inter is the primary interface typeface.

Use for:

* Navigation
* Buttons
* Tabs
* Controls
* Labels
* Eyebrows
* Metrics
* Data values
* Interface text
* General UI
* Default sans-serif fallback

CSS tokens:

--font-ui: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

Utilities:

.font-ui

Inter is also the default body font at the root application level unless a more specific typography class overrides it.

⸻

Open Sans — Body Typeface

Open Sans is the primary body-copy typeface.

Use for:

* Paragraphs
* Descriptions
* Supporting content
* Card descriptions
* Longer institutional text
* Explanatory copy

CSS token:

--font-body: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;

Utility:

.font-body

Open Sans should prioritize readability and neutrality.

Do not use it for major display headlines.

⸻

Roboto — Metadata Typeface

Roboto is reserved for compact and technical supporting information.

Use for:

* Microcopy
* Metadata
* Timestamps
* Small functional labels
* Auxiliary technical information

CSS tokens:

--font-meta: 'Roboto', sans-serif;
--font-mono: 'Roboto', monospace;

Utilities:

.font-meta
.font-mono

Roboto should not become a general-purpose headline or body typeface.

⸻

Typography Hierarchy

The current Elleva typography system follows this hierarchy:

Role	Typeface	Weight	Responsive Size
Hero Title	Poppins	700	42–60px
CTA Title	Poppins	700	42–88px
Section Title	Poppins	700	32–56px
Card Title	Poppins	600	18–24px
Section Eyebrow	Inter	600	11–13px
Body	Open Sans	400	15–18px
Small Body	Open Sans	400	13–15px
UI	Inter	400–500	12–14px
Metric	Inter	700	24–48px
Microcopy	Roboto	400–500	10–12px

These values represent the current implementation and should be used as the baseline for future components.

⸻

Fluid Typography

Elleva uses CSS clamp() to create responsive typography that scales naturally across viewport sizes.

Use clamp() primarily for:

* Hero headlines
* CTA headlines
* Section titles
* Card titles
* Body text where appropriate
* Metrics

General format:

font-size: clamp(MIN, FLUID, MAX);

Avoid unnecessary abrupt breakpoint changes when fluid scaling provides a better result.

Do not force every typography style to be fluid.

Small UI text, metadata, and compact controls should remain visually stable when appropriate.

⸻

Hero Typography

Hero headlines use Poppins.

Current implementation:

.type-hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.625rem, 5vw + 1rem, 3.75rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  font-weight: 700;
}

Use for:

* Primary page headlines
* Hero statements
* High-priority institutional messaging

The hero should feel strong and intentional, but not overly aggressive.

⸻

CTA Typography

Major CTA headlines use Poppins with a larger maximum scale.

Current implementation:

.type-cta {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.625rem, 5vw + 1rem, 5.5rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  font-weight: 700;
}

Use this only for high-impact conversion or closing sections.

Do not use CTA sizing for ordinary section titles.

⸻

Section Titles

Major section titles use Poppins.

Current implementation:

.type-section-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 2.5vw + 1rem, 3.5rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
}

Use for:

* Major content sections
* Institutional storytelling
* Product capability sections
* Market and platform sections

⸻

Section Eyebrows

Eyebrows and category labels use Inter.

Current implementation:

.type-section-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.6875rem, 0.15vw + 0.65rem, 0.8125rem);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

Use for structural classification such as:

* PLATFORM
* MARKETS
* RESEARCH
* PORTFOLIO
* ARCHITECTURE
* GLOBAL MARKETS

Uppercase should be used selectively and only when it reinforces hierarchy.

⸻

Card Titles

Card and feature titles use Poppins.

Current implementation:

.type-card-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.125rem, 0.8vw + 0.95rem, 1.5rem);
  line-height: 1.25;
  letter-spacing: -0.015em;
  font-weight: 600;
}

Use for:

* Feature cards
* Product modules
* Research blocks
* Architecture nodes
* Capability cards

⸻

Body Typography

Primary body copy uses Open Sans.

Current implementation:

.type-body {
  font-family: 'Open Sans', sans-serif;
  font-size: clamp(0.9375rem, 0.25vw + 0.9rem, 1.125rem);
  line-height: 1.65;
}

Use for:

* Paragraphs
* Section descriptions
* Long-form content
* Institutional explanations

Body copy should remain highly readable and should not visually compete with display typography.

⸻

Small Body Typography

Secondary content uses the smaller Open Sans body style.

Current implementation:

.type-body-sm {
  font-family: 'Open Sans', sans-serif;
  font-size: clamp(0.8125rem, 0.2vw + 0.775rem, 0.9375rem);
  line-height: 1.6;
}

Use for:

* Card descriptions
* Secondary explanations
* Supporting content
* Dense informational sections

⸻

UI Typography

UI typography uses Inter.

Current implementation:

.type-ui {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.75rem, 0.2vw + 0.75rem, 0.875rem);
  line-height: 1.35;
}

Use for:

* Navigation
* Tabs
* Buttons
* Controls
* Badges
* Filters
* Interface labels

UI typography should remain compact and precise.

⸻

Metrics

Financial and quantitative metrics use Inter.

Current implementation:

.type-metric {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.5rem, 2.5vw + 0.75rem, 3rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 700;
}

Use for:

* Portfolio values
* Percentages
* Performance figures
* KPIs
* Market statistics
* Investment metrics

For financial values that need vertical alignment, prefer:

font-variant-numeric: tabular-nums;

Example:

.type-metric,
.financial-value,
.percentage {
  font-variant-numeric: tabular-nums;
}

⸻

Microcopy and Metadata

Compact metadata uses Roboto.

Current implementation:

.type-micro {
  font-family: 'Roboto', sans-serif;
  font-size: clamp(0.625rem, 0.15vw + 0.625rem, 0.75rem);
  line-height: 1.4;
  letter-spacing: 0.02em;
}

Use for:

* Metadata
* Dates
* Timestamps
* Secondary system information
* Technical details
* Small helper content

Do not use .type-micro for important body content.

⸻

Default Application Typography

The default application font is Inter.

Current base configuration:

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
}

Specific content roles should override the default through the defined typography classes.

For example:

* Display content → Poppins
* Body copy → Open Sans
* Metadata → Roboto
* UI → Inter

⸻

Typography Utilities

Current font utilities:

.font-display {
  font-family: 'Poppins', sans-serif;
}
.font-ui {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
.font-body {
  font-family: 'Open Sans', sans-serif;
}
.font-mono {
  font-family: 'Roboto', monospace;
}
.font-meta {
  font-family: 'Roboto', sans-serif;
}

These utilities should be preferred over redefining font families inside individual components when no special typography class is required.

⸻

Font Weight Strategy

Current available weights:

Poppins

* 400
* 500
* 600
* 700
* 800

Preferred usage:

* 600 — cards and secondary titles
* 700 — hero and section headlines
* 800 — only for deliberate emphasis

Inter

* 300
* 400
* 500
* 600
* 700

Preferred usage:

* 400 — general UI
* 500 — controls and navigation
* 600 — labels and eyebrows
* 700 — metrics and strong interface emphasis

Open Sans

* 300
* 400
* 500
* 600
* 700

Preferred usage:

* 400 — standard body
* 500 — controlled emphasis
* 600–700 — only when body hierarchy specifically requires it

Roboto

* 300
* 400
* 500
* 700

Preferred usage:

* 400 — metadata
* 500 — emphasized metadata
* 700 — rare functional emphasis

⸻

Letter Spacing

Typography tracking should vary by role.

Hero

letter-spacing: -0.025em;

Section Title

letter-spacing: -0.02em;

Card Title

letter-spacing: -0.015em;

Eyebrow

letter-spacing: 0.1em;

Metric

letter-spacing: -0.02em;

Microcopy

letter-spacing: 0.02em;

Do not apply one global letter-spacing value across all typography roles.

⸻

Line Height

Use line-height according to context.

Recommended values based on the current system:

Role	Line Height
Hero	1.08
CTA	1.08
Section Title	1.15
Card Title	1.25
Body	1.65
Small Body	1.6
UI	1.35
Metric	1.1
Microcopy	1.4

Large display typography should remain compact.

Body typography should prioritize readability.

⸻

Usage Rules

1. Use Poppins for display and headline typography.
2. Use Inter for UI, navigation, controls, labels, and metrics.
3. Use Open Sans for paragraphs and descriptive body content.
4. Use Roboto for metadata and microcopy.
5. Do not introduce additional font families.
6. Reuse the existing typography classes before creating new ones.
7. Avoid arbitrary font sizes when an existing type class is appropriate.
8. Preserve the existing fluid clamp() system.
9. Keep large Poppins headlines visually distinct from Open Sans body copy.
10. Use Inter for data-heavy and interface-heavy areas.
11. Use tabular numerals when financial values need alignment.
12. Avoid using Roboto as a primary body or display typeface.
13. Avoid using Open Sans for navigation or major headlines.
14. Avoid using Poppins for dense financial data.
15. Maintain the same typography roles across light and dark themes.

⸻

AI / Code Generation Rules

When an AI agent creates or modifies Elleva components, it must first inspect the existing typography implementation.

The agent must:

* preserve the current four-font system;
* use Poppins for display typography;
* use Inter for interface typography;
* use Open Sans for body copy;
* use Roboto for metadata;
* reuse .type-* classes whenever possible;
* reuse font-display, font-ui, font-body, font-meta, and font-mono where appropriate;
* avoid introducing new font families;
* avoid creating arbitrary typography values without checking the existing system;
* preserve the existing clamp() responsive behavior;
* avoid changing typography unrelated to the requested task;
* maintain consistency across new and existing sections.

If a new component needs typography, choose the closest existing role before creating a new typography class.

⸻

Elleva Typography Character

The typography system should feel:

Institutional.
Global.
Structured.
Financial.
Precise.
Modern.
Premium.

The visual identity should come from the contrast between:

* Poppins for impact,
* Inter for precision,
* Open Sans for readability,
* Roboto for technical detail.

Together, these typefaces form the current Elleva typography system and should remain consistent across the product.