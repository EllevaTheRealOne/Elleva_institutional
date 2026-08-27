# ELLEVA — AI Agent Instructions

## Purpose

This file defines the mandatory operating rules for AI agents working on the ELLEVA project.

The project contains specialized instruction files inside:

```text
./agents/
├── ANIMATIONS.md
├── ARCHITECTURE.md
├── COLOR_SYSTEM.md
├── INTERNATIONALIZATION.md
├── LIBRARIES.md
├── SEO.md
└── TYPOGRAPHY.md
```

These files are part of the project's development standards.

AI agents MUST consult the relevant files before implementing, modifying, refactoring, reviewing, or generating code.

---

# 1. Core Rule

Before modifying the project:

1. Understand the requested task.
2. Inspect the existing implementation.
3. Determine which agent instruction files apply.
4. Read those files.
5. Inspect the related existing code.
6. Implement the smallest coherent solution.
7. Validate the result.

Do not modify code before understanding the existing project conventions and the applicable agent rules.

---

# 2. Specialized Agent Files

## Architecture

Read:

```text
./agents/ARCHITECTURE.md
```

Mandatory when working with:

- project structure;
- pages;
- sections;
- components;
- hooks;
- services;
- API;
- state management;
- contexts;
- types;
- constants;
- file creation;
- file movement;
- refactoring;
- imports;
- dependencies between layers.

Architecture rules determine **where code belongs and how responsibilities are separated**.

---

## Libraries

Read:

```text
./agents/LIBRARIES.md
```

Mandatory when:

- installing packages;
- removing packages;
- selecting libraries;
- importing a new library;
- replacing dependencies;
- implementing functionality already covered by an approved library;
- reviewing duplicate dependencies.

Library rules determine **which dependency should solve a problem**.

Do not install a new dependency before checking this file and the existing `package.json`.

---

## Internationalization

Read:

```text
./agents/INTERNATIONALIZATION.md
```

Mandatory whenever the task touches user-facing text.

This includes:

- headings;
- paragraphs;
- buttons;
- navigation;
- labels;
- forms;
- errors;
- validation;
- accessibility text;
- metadata;
- notifications;
- placeholders;
- tooltips;
- SEO content.

User-facing text must follow the existing i18n architecture.

Do not introduce hardcoded user-facing strings when they should be translated.

---

## SEO

Read:

```text
./agents/SEO.md
```

Mandatory when working with:

- public routes;
- metadata;
- `<title>`;
- meta descriptions;
- canonical URLs;
- robots directives;
- `robots.txt`;
- sitemap;
- Open Graph;
- Twitter/X metadata;
- JSON-LD;
- structured data;
- hreflang;
- semantic headings;
- indexability;
- public/private route visibility;
- search-engine optimization.

SEO changes must preserve factual accuracy and Elleva's institutional positioning.

---

## Color System

Read:

```text
./agents/COLOR_SYSTEM.md
```

Mandatory when working with:

- colors;
- backgrounds;
- text colors;
- borders;
- surfaces;
- states;
- accents;
- dark theme;
- light theme;
- charts;
- diagrams;
- visual components.

Use existing semantic color tokens before introducing new colors.

Do not introduce arbitrary colors when an existing project token satisfies the same role.

---

## Typography

Read:

```text
./agents/TYPOGRAPHY.md
```

Mandatory when working with:

- fonts;
- font families;
- font sizes;
- font weights;
- line heights;
- letter spacing;
- headings;
- body text;
- UI text;
- metrics;
- microcopy;
- responsive typography.

Typography must follow the established Elleva type system.

---

## Animations

Read:

```text
./agents/ANIMATIONS.md
```

Mandatory when implementing or modifying:

- transitions;
- reveals;
- hover motion;
- enter/exit animations;
- page transitions;
- scroll animations;
- diagram animations;
- gestures;
- layout animations;
- loading animations;
- micro-interactions.

Do not introduce custom animation systems when an approved project library already solves the requirement.

---

# 3. Multiple Agents May Apply

A task may require multiple instruction files.

Example:

> Create a new Platform page with animated sections.

Required:

```text
ARCHITECTURE
INTERNATIONALIZATION
TYPOGRAPHY
COLOR_SYSTEM
ANIMATIONS
SEO
```

Example:

> Add a chart.

Potentially required:

```text
LIBRARIES
ARCHITECTURE
COLOR_SYSTEM
TYPOGRAPHY
ANIMATIONS
```

Example:

> Add a new public translated page.

Required:

```text
ARCHITECTURE
INTERNATIONALIZATION
SEO
COLOR_SYSTEM
TYPOGRAPHY
```

Do not assume that only one specialized agent applies to a task.

---

# 4. Rule Priority

When multiple rules apply, use this priority:

```text
Security
↓
Explicit user/task requirement
↓
Architecture
↓
Libraries
↓
Internationalization
↓
SEO
↓
Design System
↓
Animation
↓
Local implementation preference
```

The design system includes:

```text
COLOR_SYSTEM
TYPOGRAPHY
```

This priority exists to resolve actual conflicts.

Rules should normally complement rather than override each other.

---

# 5. Existing Project First

Before creating something new, inspect the existing implementation.

Always check for:

- existing component;
- existing section;
- existing hook;
- existing service;
- existing translation key;
- existing utility;
- existing design token;
- existing animation pattern;
- existing dependency;
- existing SEO implementation.

Prefer extending or reusing existing patterns when they are correct.

Do not create duplicate systems.

---

# 6. Do Not Rewrite Without Need

Do not perform broad refactoring unless required by the task.

When modifying an existing feature:

```text
Understand
→ Inspect
→ Reuse
→ Modify
→ Validate
```

Do not:

```text
Assume
→ Rewrite
→ Break
→ Patch
```

Preserve working behavior unless the requested task intentionally changes it.

---

# 7. File Ownership

Code should live as close as possible to its actual owner.

Page-specific code stays inside the page.

Section-specific code stays inside the section.

Shared code should become global only when there is real reuse.

Follow `ARCHITECTURE.md` for the complete ownership rules.

---

# 8. Sections

Page sections belong inside:

```text
src/pages/(Page)/sections/
```

Example:

```text
src/
└── pages/
    └── Home/
        ├── view.tsx
        └── sections/
            ├── Hero/
            ├── Platform/
            ├── Architecture/
            └── GlobalMarkets/
```

Components exclusive to a section should remain close to that section.

Do not move page-specific sections into global components.

---

# 9. Dependency Discipline

Before installing a dependency:

1. Inspect `package.json`.
2. Check `LIBRARIES.md`.
3. Determine whether an existing library already solves the requirement.
4. Avoid overlapping dependencies.
5. Avoid unnecessary bundle growth.
6. Do not pin versions unless required.

Approved does not mean mandatory.

Do not install unused libraries.

---

# 10. UI Component Strategy

Before creating a generic UI primitive, check whether the project already contains an appropriate shadcn component.

Prefer the established shadcn implementation where appropriate.

Do not introduce another UI framework simply to solve a component problem already handled by the existing stack.

---

# 11. Design System

Do not invent local visual systems inside components.

Use the established:

```text
COLOR_SYSTEM
TYPOGRAPHY
ANIMATIONS
```

Avoid arbitrary:

- colors;
- font families;
- typography scales;
- shadows;
- glow;
- animation patterns.

Elleva must maintain one coherent visual language.

---

# 12. Elleva Visual Direction

The interface should feel:

- institutional;
- premium;
- precise;
- modern;
- financial;
- technically sophisticated;
- restrained;
- trustworthy.

Avoid:

- generic SaaS aesthetics;
- crypto aesthetics;
- excessive neon;
- excessive gradients;
- excessive glow;
- card-heavy layouts;
- unnecessary glassmorphism;
- random visual effects;
- dashboard clutter;
- AI-startup clichés.

Prefer:

```text
Less decoration.
More hierarchy.

Less noise.
More precision.

Less generic SaaS.
More institutional technology.
```

---

# 13. Elleva Positioning

Elleva is positioned as:

```text
Autonomous Capital Infrastructure
```

Core description:

```text
Autonomous AI infrastructure for investment operations.
```

Architectural concept:

```text
Intelligence
↓
Research
↓
Decision
↓
Execution
↓
Monitoring
```

The core operating cycle is:

```text
RESEARCH → DECIDE → EXECUTE → MONITOR
```

Do not position Elleva as:

- day trading software;
- retail broker;
- trading terminal;
- crypto exchange;
- signal platform;
- speculative trading product.

---

# 14. Do Not Invent Business Claims

Never invent:

- clients;
- partners;
- integrations;
- licenses;
- regulatory approvals;
- AUM;
- investment performance;
- returns;
- awards;
- offices;
- certifications;
- testimonials;
- financial statistics;
- operational capabilities that do not exist.

If information is unknown, do not fabricate it for visual, marketing, or SEO purposes.

---

# 15. User-Facing Content

All user-facing content must respect:

```text
INTERNATIONALIZATION.md
```

This includes content introduced indirectly through:

- components;
- schemas;
- configuration;
- navigation arrays;
- validation;
- notifications;
- accessibility;
- SEO.

Do not assume that text inside a TypeScript object is exempt from i18n rules.

---

# 16. Financial Values

When localized content contains financial values, currency must remain in:

```text
USD
```

unless an explicit project requirement says otherwise.

Do not automatically convert currency based on language.

---

# 17. Public Pages

Any new public route must trigger an SEO review.

At minimum verify:

- title;
- description;
- canonical;
- robots;
- sitemap eligibility;
- semantic H1;
- heading hierarchy;
- Open Graph;
- localization;
- indexability.

Follow `SEO.md`.

---

# 18. Accessibility

Accessibility is mandatory.

Consider:

- semantic HTML;
- keyboard navigation;
- focus states;
- aria labels;
- color contrast;
- reduced motion;
- meaningful alt text;
- accessible interactive controls.

Accessibility text is user-facing content and therefore also follows i18n rules.

---

# 19. Responsive Behavior

All UI changes must be evaluated for:

```text
Desktop
Tablet
Mobile
```

Do not consider a feature complete if it only works at one viewport size.

Avoid:

- accidental horizontal overflow;
- clipped content;
- unreadable typography;
- unusable diagrams;
- overflowing charts;
- inaccessible navigation.

---

# 20. Code Quality

Prefer:

- small responsibilities;
- explicit behavior;
- composition;
- readable naming;
- predictable data flow;
- reusable patterns when reuse is real;
- TypeScript-safe implementations.

Avoid:

- giant components;
- duplicated logic;
- premature abstraction;
- magic values;
- unnecessary state;
- unnecessary effects;
- deeply coupled components.

---

# 21. No Placeholder Production Content

Do not leave production-facing placeholders such as:

```text
Lorem ipsum
TODO
Coming soon
Example text
Test
Placeholder
```

unless intentionally requested.

Do not invent content simply to fill space.

---

# 22. No Silent Failures

Do not silently ignore:

- build failures;
- TypeScript errors;
- missing translation keys;
- invalid imports;
- broken routes;
- missing assets;
- dependency conflicts;
- SEO conflicts.

If a problem cannot be safely fixed within the requested scope, report it clearly.

---

# 23. Validation

After implementation, validate the relevant parts of the project.

When available, run:

```text
TypeScript
Lint
Build
Tests
```

Also validate task-specific concerns.

Examples:

### UI change

Check:

```text
responsive
theme
typography
colors
i18n
accessibility
```

### Public page

Check:

```text
SEO
metadata
canonical
sitemap
i18n
semantic HTML
```

### Dependency change

Check:

```text
package compatibility
duplicates
build
imports
bundle implications
```

---

# 24. Mandatory Final Review

Before completing any task, verify:

- [ ] I inspected the existing implementation.
- [ ] I identified the relevant specialized agent files.
- [ ] I followed `ARCHITECTURE.md` where structure was affected.
- [ ] I followed `LIBRARIES.md` where dependencies were affected.
- [ ] I followed `INTERNATIONALIZATION.md` for user-facing text.
- [ ] I followed `SEO.md` for public/search-facing changes.
- [ ] I followed `COLOR_SYSTEM.md` for visual colors.
- [ ] I followed `TYPOGRAPHY.md` for typography.
- [ ] I followed `ANIMATIONS.md` for motion.
- [ ] I reused existing implementations where appropriate.
- [ ] I did not introduce unnecessary dependencies.
- [ ] I did not introduce duplicate systems.
- [ ] I did not invent business information.
- [ ] I preserved responsive behavior.
- [ ] I considered accessibility.
- [ ] I did not expose secrets or sensitive information.
- [ ] I validated the project after the change.

---

# 25. Final Operating Principle

Before writing code, determine:

```text
What is being changed?
        ↓
Who owns this responsibility?
        ↓
Which agent rules apply?
        ↓
Does an implementation already exist?
        ↓
What is the smallest correct change?
        ↓
How will it be validated?
```

Do not optimize for generating the most code.

Optimize for:

```text
Correctness
↓
Consistency
↓
Security
↓
Maintainability
↓
Reuse
↓
Performance
↓
Visual quality
```

The objective is not simply to make the requested feature work.

The objective is to make it work **correctly within the Elleva system**.