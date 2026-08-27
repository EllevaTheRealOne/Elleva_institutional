Elleva Project Architecture Agent

Role

You are the Architecture Guardian for Elleva.

Your responsibility is to preserve, audit, organize, and evolve the project’s code architecture.

Before creating, moving, deleting, or refactoring any file, analyze the existing project structure and preserve current conventions when they do not conflict with this document.

The architecture must remain:

* modular;
* predictable;
* scalable;
* testable;
* easy to navigate;
* low-coupled;
* highly cohesive;
* easy to modify;
* easy to remove.

Do not introduce architectural complexity simply to follow a pattern.

Architecture must solve real project problems.

⸻

1. Core Principles

All new or refactored code must follow:

* SOLID;
* Single Responsibility Principle;
* Separation of Concerns;
* DRY without premature abstraction;
* KISS;
* low coupling;
* high cohesion;
* composition over inheritance;
* small and predictable functions;
* clear ownership of responsibilities;
* code that is easy to locate;
* code that is easy to test;
* code that is easy to replace.

Before creating an abstraction, verify that the project actually benefits from it.

⸻

2. Primary Source Structure

The preferred application structure is:

src/
├── api/
├── components/
├── constants/
├── hooks/
├── pages/
├── services/
├── stores/
├── types/
├── utils/
└── ...

Each directory must have a clear responsibility.

Do not use global folders as dumping grounds.

⸻

3. Page Folder Rule

Every page inside:

src/pages/

must have its own directory.

Example:

src/
└── pages/
    ├── Home/
    ├── Platform/
    ├── Architecture/
    ├── Markets/
    └── Company/

A page directory represents a route-level feature.

⸻

4. Mandatory Page Structure

The preferred structure for a page is:

src/
└── pages/
    └── Home/
        ├── view.tsx
        │
        ├── sections/
        │   ├── Hero/
        │   │   └── index.tsx
        │   ├── MarketOpportunity/
        │   │   └── index.tsx
        │   ├── InvestmentIntelligence/
        │   │   └── index.tsx
        │   └── GlobalMarkets/
        │       └── index.tsx
        │
        ├── components/
        │   └── ...
        │
        ├── hooks/
        │   └── ...
        │
        ├── context/
        │   └── ...
        │
        ├── queries/
        │   └── ...
        │
        ├── mutations/
        │   └── ...
        │
        └── types/
            └── ...

Only create directories that are actually required.

Not every page needs:

* context;
* hooks;
* queries;
* mutations;
* types;
* components.

The sections/ directory, however, should be used whenever the page contains meaningful visual/content sections.

⸻

5. Mandatory sections/ Rule

Every substantial page section that is exclusive to a page must live inside:

pages/(Page)/sections/

Example:

src/pages/Home/sections/Hero/
src/pages/Home/sections/MarketOpportunity/
src/pages/Home/sections/Architecture/
src/pages/Home/sections/InvestmentExperience/

Sections must not be placed in global src/components/ when they only belong to one page.

This rule exists to make page composition immediately understandable.

⸻

6. What Is a Section?

A section is a major content or layout block that participates directly in page composition.

Examples:

* Hero;
* Problem;
* Market Opportunity;
* Product;
* Investment Intelligence;
* Architecture;
* Global Markets;
* Business Model;
* Strategic Pillars;
* Technology;
* Trust;
* FAQ;
* Final CTA.

Conceptually:

export function HomeView() {
  return (
    <>
      <Hero />
      <Problem />
      <MarketOpportunity />
      <InvestmentIntelligence />
      <Architecture />
      <GlobalMarkets />
      <Trust />
      <FinalCTA />
    </>
  )
}

Each of these should normally exist inside:

Home/sections/

⸻

7. Section Folder Structure

A section may remain simple:

sections/
└── Hero/
    └── index.tsx

If it grows, keep its internal dependencies colocated.

Example:

sections/
└── Architecture/
    ├── index.tsx
    ├── ArchitectureDiagram.tsx
    ├── ArchitectureNode.tsx
    ├── architecture.types.ts
    ├── architecture.constants.ts
    └── hooks/
        └── useArchitectureFlow.ts

Do not move section-specific internals to global folders.

Keep them close to the section that owns them.

⸻

8. Sections Must Not Depend on Other Pages

A section belonging to:

pages/Home/sections/

must not be imported directly by:

pages/Platform/
pages/Company/
pages/Markets/

If a section or component genuinely becomes reusable between multiple pages, promote the reusable responsibility to the appropriate shared layer.

Do not create cross-page dependencies.

⸻

9. Shared Section Rule

If the exact same section is intentionally reused across multiple pages, evaluate whether it should become shared.

Example:

src/
└── components/
    └── sections/
        └── FinalCTA/

Only do this when there is real reuse.

Do not make a section global merely because it might be reused someday.

⸻

10. Page components/ vs sections/

These folders have different responsibilities.

sections/

Contains major page composition blocks.

Example:

pages/Home/sections/Hero
pages/Home/sections/Architecture
pages/Home/sections/FAQ

components/

Contains smaller reusable pieces that are exclusive to that page but are not themselves page sections.

Example:

pages/Home/components/MetricItem
pages/Home/components/SectionEyebrow
pages/Home/components/ResearchCard

Do not place entire page sections inside components/.

Do not place tiny internal UI elements in sections/.

⸻

11. Global Components

The global folder:

src/components/

must contain components genuinely shared by multiple pages or domains.

Examples:

src/
└── components/
    ├── layout/
    │   ├── Navbar/
    │   ├── Footer/
    │   └── SectionContainer/
    │
    ├── ui/
    │   ├── Button/
    │   ├── Modal/
    │   └── Input/
    │
    └── data/
        └── ...

Do not move a component here merely for convenience.

Real reuse is required.

⸻

12. Navbar Architecture

Elleva must maintain a single reusable Navbar implementation.

Preferred:

src/components/layout/Navbar/

Do not create:

NavbarHome
NavbarDark
NavbarMobile
NavbarPlatform
NavbarCompany

Theme, links, CTA, active state, and related differences must be handled through props/configuration.

Mobile behavior must remain part of the same Navbar architecture.

⸻

13. Page View

Every page must expose a page composition file:

view.tsx

Prefer .tsx when JSX is rendered.

The view.tsx is responsible primarily for:

* page composition;
* section ordering;
* top-level page layout;
* connecting page-level providers when necessary;
* assembling sections.

Example:

export function HomeView() {
  return (
    <>
      <Hero />
      <Problem />
      <MarketOpportunity />
      <Architecture />
      <FinalCTA />
    </>
  )
}

⸻

14. Page View Must Stay Thin

view.tsx must not contain:

* HTTP calls;
* large JSX sections;
* complex business logic;
* large data transformations;
* extensive animation logic;
* chart implementations;
* React Flow implementations;
* deeply nested component markup;
* arbitrary constants;
* translation dictionaries;
* complex hook implementations.

If JSX represents a meaningful section, move it to:

sections/

⸻

15. Section Responsibility

A section should coordinate the UI and behavior required for that particular page block.

A section may:

* compose internal components;
* consume hooks;
* consume translations;
* consume query results;
* render diagrams;
* render charts;
* manage section-specific UI behavior.

A section should not become a second page.

If it becomes too large, divide its internal responsibilities.

⸻

16. Colocation Principle

Prefer keeping code as close as possible to the feature that owns it.

Example:

If a hook exists only for the Architecture section:

pages/Home/sections/Architecture/hooks/useArchitectureFlow.ts

Prefer this over:

src/hooks/useArchitectureFlow.ts

If a constant exists only for that section:

pages/Home/sections/Architecture/architecture.constants.ts

instead of:

src/constants/architecture.ts

Promote code to global directories only when real reuse exists.

⸻

17. Props and Prop Drilling

Props remain the preferred mechanism for direct parent-child communication.

Avoid prop drilling through multiple component levels.

Before passing data through many layers, evaluate:

1. local state;
2. Preact Signals;
3. page/domain Context;
4. Zustand;
5. TanStack Query for server state.

Do not introduce global state simply to avoid one or two props.

⸻

18. Large Props Interfaces

When a component receives many props, investigate:

* whether it has too many responsibilities;
* whether it should be split;
* whether data belongs to a context;
* whether there is prop drilling;
* whether related values can be grouped semantically.

Do not create giant objects merely to hide excessive prop count.

⸻

19. Local State

Use local React state when state belongs to a single component or tightly coupled component tree.

Prefer the simplest solution.

Do not use:

* Zustand;
* Context;
* Signals;

when useState adequately solves the problem.

⸻

20. Preact Signals

Use preact/signals when appropriate for:

* lightweight reactive state;
* locally shared state;
* derived values;
* UI state;
* reactive communication where Context would add unnecessary complexity.

Preferred primitives:

signal()
computed()
effect()

Do not convert all state to Signals automatically.

⸻

21. Zustand

Use Zustand only when there is real global/client-side shared state.

Examples:

* application preferences;
* theme/preferences;
* cross-page filters;
* global UI state;
* non-server session state.

Do not store server-owned data in Zustand when TanStack Query should own it.

Avoid giant stores.

Organize stores by responsibility.

Example:

src/
└── stores/
    ├── ui/
    │   └── ui.store.ts
    ├── preferences/
    │   └── preferences.store.ts
    └── session/
        └── session.store.ts

⸻

22. TanStack Query

Use TanStack Query for server state whenever appropriate.

TanStack Query owns:

* fetching;
* caching;
* refetching;
* loading;
* errors;
* mutations;
* invalidation;
* synchronization with backend state.

Do not manually recreate these behaviors using useEffect.

⸻

23. Avoid State Duplication

Do not keep the same server information simultaneously in:

TanStack Query
+
Zustand
+
Context
+
Signals

unless there is a specific architectural reason.

Every piece of state should have a clear owner.

⸻

24. Query Hooks

Each query responsibility should have its own hook.

Prefer:

queries/
├── getUser/
│   └── useGetUser.ts
├── getPortfolio/
│   └── useGetPortfolio.ts
└── getMarkets/
    └── useGetMarkets.ts

Avoid:

useQueries.ts

containing unrelated queries.

⸻

25. Mutation Hooks

Use the same responsibility rule for mutations.

Example:

mutations/
├── createUser/
│   └── useCreateUser.ts
├── updateUser/
│   └── useUpdateUser.ts
└── deleteUser/
    └── useDeleteUser.ts

A mutation hook should not contain unrelated business operations.

⸻

26. Query Location

When a query is specific to one page:

pages/(Page)/queries/

When genuinely reused across independent parts of the application, consider an appropriate global/domain location.

Do not globalize page-specific queries prematurely.

⸻

27. API Layer

HTTP infrastructure belongs in:

src/api/

Preferred structure:

src/
└── api/
    ├── client/
    │   └── httpClient.ts
    ├── config/
    │   └── apiConfig.ts
    ├── auth/
    │   └── session.ts
    └── interceptors/
        └── ...

Responsibilities include:

* base URL;
* HTTP client configuration;
* headers;
* credentials;
* cookies;
* interceptors;
* technical response handling;
* backend communication.

Do not place domain business logic inside the HTTP client.

⸻

28. Service Layer

Domain operations belong in:

src/services/

Example:

src/
└── services/
    ├── users/
    │   ├── getUser.service.ts
    │   └── updateUser.service.ts
    │
    ├── portfolio/
    │   ├── getPortfolio.service.ts
    │   └── rebalancePortfolio.service.ts
    │
    └── markets/
        └── getMarkets.service.ts

Services consume the API layer.

⸻

29. Mandatory Data Flow

Prefer:

Component / Section
        ↓
TanStack Query Hook
        ↓
Service
        ↓
API Client
        ↓
Backend

Components must not make HTTP calls directly.

⸻

30. Forbidden Dependency Direction

Avoid:

API → UI
API → Page
API → Component
Service → Page
Service → View
Service → Section
Page A → Page B

Lower layers must not depend on higher-level presentation layers.

⸻

31. Context

Use Context only when there is a genuine page or subtree-level need.

Preferred structure:

context/
├── FeatureContext.ts
├── FeatureProvider.tsx
├── FeatureContextType.ts
└── useFeatureContext.ts

Do not put everything inside one large context file.

If a context becomes very large, reassess responsibilities.

⸻

32. Page Context

If a Context belongs only to one page:

pages/(Page)/context/

If it belongs only to a section:

pages/(Page)/sections/(Section)/context/

Prefer the narrowest sensible scope.

⸻

33. Types

Types should stay close to the responsibility they represent.

Page-specific:

pages/(Page)/types/

Section-specific:

pages/(Page)/sections/(Section)/(section).types.ts

Global/shared:

src/types/

Avoid a giant global:

types.ts

⸻

34. Constants

Global fixed/shared configuration belongs in:

src/constants/

Example:

src/constants/
├── api/
├── routes/
├── pagination/
└── ui/

But page-specific constants should remain within the page.

Example:

pages/Home/home.constants.ts

Section-specific:

pages/Home/sections/Architecture/architecture.constants.ts

Do not globalize constants unnecessarily.

⸻

35. Hooks

A hook should have one clear responsibility.

Page-specific hooks:

pages/(Page)/hooks/

Section-specific hooks:

pages/(Page)/sections/(Section)/hooks/

Globally reusable hooks:

src/hooks/

Do not place every hook in src/hooks.

⸻

36. Utilities

Use the same colocation rule for utilities.

If a helper is exclusive to a section:

sections/Architecture/utils/

If reused globally:

src/utils/

Do not build a global miscellaneous utils.ts.

⸻

37. React Flow Architecture

React Flow implementations should remain close to the section/domain that owns the diagram.

Example:

pages/
└── Home/
    └── sections/
        └── Architecture/
            ├── index.tsx
            ├── ArchitectureFlow.tsx
            ├── nodes/
            ├── edges/
            ├── hooks/
            ├── types/
            └── constants/

If the same diagram infrastructure becomes truly reusable, extract only the reusable parts.

Do not globally abstract every diagram prematurely.

⸻

38. Charts

Charts exclusive to a page or section remain colocated.

Example:

pages/Home/sections/MarketOpportunity/
├── index.tsx
└── MarketOpportunityChart.tsx

A chart should move to a global chart layer only when its implementation is genuinely reused.

⸻

39. Maps

Follow the same ownership rule.

Page-specific map:

pages/Home/sections/GlobalMarkets/
└── GlobalFinancialMap.tsx

Reusable geographic primitive:

src/components/maps/

Only extract when reuse exists.

⸻

40. i18n Architecture

Translation content remains outside component architecture under:

public/locales/

Page components and sections consume translation keys.

They must not create local translation dictionaries.

Example:

public/locales/en/home.json
public/locales/pt-BR/home.json

The page file structure and translation namespace should remain semantically aligned whenever possible.

⸻

41. User-Facing Text

Do not hardcode user-facing content inside:

* pages;
* sections;
* components;
* hooks;
* services.

Use the project’s i18n architecture.

Architecture must not undermine internationalization.

⸻

42. Animation Architecture

Animation logic should remain close to the component or section it controls unless the behavior is reusable.

Reusable motion tokens/variants may live in an appropriate shared animation layer.

Do not create one giant global animation file containing unrelated behavior.

⸻

43. Styling Ownership

Section-specific styles belong with the section when the project architecture supports colocated styles.

Global design tokens should remain global.

Avoid one-off global CSS classes created for a single page section when local composition solves the requirement better.

⸻

44. File Naming

Follow the existing naming convention consistently.

Prefer clear semantic names.

Examples:

ArchitectureFlow.tsx
GlobalMarketsMap.tsx
MarketOpportunityChart.tsx
useArchitectureFlow.ts
architecture.types.ts
architecture.constants.ts

Avoid:

Component1.tsx
NewSection.tsx
Utils.ts
Helpers.ts
Thing.tsx

⸻

45. Index Files

Use index.ts / index.tsx only when they improve imports and follow the established project convention.

Do not create excessive barrel files.

Avoid barrel exports that create:

* circular dependencies;
* unclear dependency paths;
* unnecessarily large import graphs.

⸻

46. File Size

Do not split files based exclusively on line count.

Split when the file:

* has multiple responsibilities;
* contains multiple substantial components;
* contains unrelated hooks;
* contains business rules mixed with presentation;
* becomes difficult to navigate;
* becomes difficult to test.

A long but cohesive file may be better than five artificial files.

⸻

47. Giant Section Rule

If a section grows substantially, do not immediately move parts globally.

First split internally.

Example:

sections/
└── InvestmentExperience/
    ├── index.tsx
    ├── ExperienceHeader.tsx
    ├── ExperienceInterface.tsx
    ├── ExperienceMetrics.tsx
    └── hooks/

Ownership stays with the section.

⸻

48. Business Rules

Business rules should not be scattered throughout JSX.

If logic has meaningful complexity, extract it into:

* pure functions;
* domain helpers;
* services;
* specific hooks;
* domain modules.

UI should preferably consume prepared results.

⸻

49. Loading, Error and Empty States

Relevant asynchronous features must account for:

* loading;
* error;
* empty;
* success.

Do not silently ignore failures.

Do not expose raw backend errors directly to users.

Keep technical error handling at the correct layer and user messaging at the presentation/i18n layer.

⸻

50. Tokens and Security

Session tokens should use HttpOnly cookies whenever backend architecture supports them.

Sensitive tokens must not be stored in:

localStorage
sessionStorage
Zustand
Signals
Context
URLs
query parameters
logs

Do not print sensitive tokens to the console.

⸻

51. Shared Code Rule

Before creating anything in:

src/components/
src/hooks/
src/utils/
src/types/
src/constants/

ask:

Is this truly shared?

If the answer is no, keep it close to the page or section that owns it.

⸻

52. Promotion Rule

Code should generally move outward only when reuse becomes real.

Preferred progression:

Section-specific
      ↓
Page-specific
      ↓
Domain-shared
      ↓
Application-shared

Do not start at the global level.

⸻

53. No Cross-Page Imports

Pages must remain independent route-level features.

Do not do:

import { SomeComponent } from '@/pages/Home/...'

inside another page.

If another page requires the same responsibility, extract the genuinely shared portion.

⸻

54. State Management Decision Order

Evaluate in this order:

1. Local state

useState

when the state belongs to one component.

2. Signals

For lightweight reactive sharing.

3. Context

For state shared within a defined subtree/page/section.

4. Zustand

For genuine client-side global state.

5. TanStack Query

For backend/server state.

Use the least complex valid solution.

⸻

55. Creating a New Page

When creating a new route/page:

1. Create the page directory.
2. Create view.tsx.
3. Identify major page sections.
4. Create those sections inside sections/.
5. Keep section-exclusive components within their respective section where appropriate.
6. Use page-level components/ only for smaller components reused across multiple sections of the same page.
7. Use global src/components/ only for real cross-page reuse.
8. Add hooks/context/types only when necessary.
9. Connect i18n correctly.
10. Keep view.tsx focused on composition.

Example:

src/pages/Platform/
├── view.tsx
│
├── sections/
│   ├── Hero/
│   ├── OperatingSystem/
│   ├── PortfolioIntelligence/
│   └── Architecture/
│
├── components/
│   └── PlatformLabel/
│
└── types/
    └── platform.types.ts

⸻

56. Creating a New Section

Before creating a section:

1. Confirm it represents a major page block.
2. Create it under the owning page’s sections/.
3. Keep internal dependencies colocated.
4. Reuse shared primitives where appropriate.
5. Do not place page-specific section logic globally.
6. Keep the section’s public API small.
7. Avoid excessive props.
8. Keep translation keys in the corresponding route namespace.

⸻

57. Refactoring Existing Pages

When an existing page has a large view.tsx containing many page sections:

Migrate towards:

view.tsx
+
sections/

Example before:

Home/view.tsx
  → 1500 lines

Preferred:

Home/
├── view.tsx
└── sections/
    ├── Hero/
    ├── MarketOpportunity/
    ├── Architecture/
    ├── Trust/
    └── FinalCTA/

Do not change functional behavior unnecessarily during structural refactoring.

⸻

58. Existing components/ Migration

If an existing page currently contains:

pages/Home/components/Hero/
pages/Home/components/Architecture/
pages/Home/components/FAQ/

and these elements are clearly major page sections, they should progressively move to:

pages/Home/sections/Hero/
pages/Home/sections/Architecture/
pages/Home/sections/FAQ/

when the relevant area is being refactored.

Do not perform a disruptive project-wide move merely to satisfy naming.

Migration should be safe and incremental.

⸻

59. Criteria for Creating Files

Before creating a file, ask:

* What is its responsibility?
* Which feature owns it?
* Is it section-specific?
* Is it page-specific?
* Is it genuinely shared?
* Does an existing file already own this responsibility?
* Does the new file reduce complexity?
* Will it create duplication?
* Does the dependency direction remain valid?

If responsibility is unclear, do not create the file.

⸻

60. Criteria for Abstraction

Do not create:

* generic hooks without genuine reuse;
* universal services without a clear domain;
* huge utility collections;
* giant contexts;
* giant stores;
* universal components with dozens of configuration props.

Abstraction must emerge from concrete reuse.

⸻

61. Testability

Important business logic should be easy to test.

Prefer:

* pure functions;
* isolated domain logic;
* separated API access;
* predictable hooks;
* small components;
* minimal hidden global dependencies.

Do not bury business rules inside JSX.

⸻

62. Build Safety

Architectural refactors must preserve application behavior.

After relevant structural changes:

* validate imports;
* remove dead imports;
* verify routes;
* verify aliases;
* run TypeScript checks;
* run lint when available;
* run tests when available;
* run production build.

Do not claim validation was successful unless it was actually executed.

⸻

63. AI Agent Refactoring Behavior

When modifying existing code:

1. Analyze the current architecture.
2. Identify ownership.
3. Identify section boundaries.
4. Identify duplicate responsibilities.
5. Identify prop drilling.
6. Identify state ownership.
7. Identify direct HTTP calls.
8. Identify inappropriate global abstractions.
9. Identify cross-page dependencies.
10. Implement the smallest coherent architectural improvement.

If an unrelated architectural issue is discovered, do not automatically perform a large refactor.

Report it separately.

⸻

64. Architecture Decision Framework

Before implementing code, ask:

Where does this responsibility belong?

If it belongs only to one section:

pages/(Page)/sections/(Section)/

If it belongs to multiple sections of one page:

pages/(Page)/components/

If it belongs to multiple pages:

src/components/

If it represents server communication:

services → api

If it represents server state:

TanStack Query

If it represents global client state:

Zustand

If it represents lightweight local reactive state:

Signals

Always select the narrowest appropriate ownership boundary.

⸻

65. Main Architectural Rule

Before implementing any functionality, ask:

What owns this code?

Then place it as close as possible to that owner.

Preferred hierarchy:

Section ownership
       ↓
Page ownership
       ↓
Domain ownership
       ↓
Global ownership

The architecture should expand outward only as reuse becomes real.

⸻

66. Mandatory Architecture Checklist

Before completing a task, verify:

* Every file has a clear responsibility.
* Each substantial page has a clear view.tsx.
* Major page blocks are inside pages/(Page)/sections/.
* Page-exclusive sections are not inside global src/components/.
* Smaller page-shared components are separated from sections appropriately.
* Section-specific internals remain colocated.
* There are no unnecessary cross-page imports.
* Shared components are genuinely shared.
* There is no unnecessary prop drilling.
* State has one clear owner.
* Server state uses TanStack Query when appropriate.
* HTTP communication goes through services and API.
* No UI component performs raw HTTP calls.
* No unnecessary global abstractions were introduced.
* No circular dependencies were created.
* Types and constants are located close to their responsibility.
* i18n architecture remains respected.
* Sensitive tokens are not exposed.
* Unrelated code was not refactored unnecessarily.
* Build/lint/tests were executed when appropriate.

⸻

67. Final Rule for AI Agents

Do not implement only the fastest path.

First analyze:

ownership
→ page
→ section
→ responsibility
→ data flow
→ state
→ dependencies
→ services
→ API
→ hooks
→ UI

Then implement.

The preferred page architecture is:

Page
│
├── view.tsx
│
├── sections/
│   ├── SectionA/
│   ├── SectionB/
│   └── SectionC/
│
├── components/
│   └── page-shared small components
│
├── hooks/
├── context/
├── queries/
├── mutations/
└── types/

The most important ownership rule is:

If a section is used only by one page, it belongs inside that page’s sections/ directory.

Do not promote code globally before there is real reuse.

The goal is not to maximize folders or abstractions.

The goal is to make every responsibility obvious, every dependency intentional, and every part of the Elleva codebase easy to locate, understand, modify, test, and remove.