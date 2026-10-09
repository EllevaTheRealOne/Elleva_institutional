import { useEffect } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "@/routes/paths";

const LAST_UPDATED = "October 9, 2026";

const sections = [
  {
    number: "01",
    title: "Purpose of this document",
    content: (
      <>
        <p>
          This document describes the general framework applicable to certain
          Elleva ecosystem programs and operational mechanisms.
        </p>

        <p>
          These rules should be read together with the Elleva Terms of Use and
          Privacy Policy.
        </p>

        <p>
          Program conditions may vary according to the applicable product,
          account, jurisdiction, eligibility requirements and operational
          conditions.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "ProfitShare",
    content: (
      <>
        <p>
          ProfitShare is an Elleva ecosystem mechanism through which eligible
          users may participate in variable distributions associated with
          applicable operational and economic results.
        </p>

        <p>
          ProfitShare is variable. It is not a fixed interest payment and does
          not constitute a guarantee of profit, return or preservation of
          capital.
        </p>

        <p>
          Applicable distributions may depend on operational results,
          eligibility, account conditions, program rules and other factors
          applicable at the time.
        </p>

        <p>
          Historical distributions do not establish a promise, forecast or
          guarantee of future distributions.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Elleva Direct",
    content: (
      <>
        <p>
          Elleva Direct is an ecosystem development program through which
          eligible participants may receive benefits or distributions associated
          with qualifying activity within their eligible ecosystem structure.
        </p>

        <p>
          The current program structure may include level-based distributions
          according to the official Elleva Direct rules.
        </p>

        <p>
          Participation does not guarantee income, profits, financial results or
          advancement to any recognition level.
        </p>

        <p>
          Participants may not make unauthorized, misleading or guaranteed
          claims regarding Elleva, its programs or potential results.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Elleva Pool",
    content: (
      <>
        <p>
          Elleva Pool is an internal ecosystem mechanism connected to the
          economic performance of the company and applicable participant
          qualification criteria.
        </p>

        <p>
          Under the applicable program structure, the Pool may allocate a
          defined portion of company gross profit to qualified participants.
        </p>

        <p>
          Participation is subject to the applicable qualification rules and
          does not create a guarantee of any particular distribution.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Operational conditions",
    content: (
      <>
        <p>
          Applicable minimums, maximums, fees, withdrawal conditions, processing
          periods, qualification requirements and other operational parameters
          may be displayed in the Elleva platform or applicable program
          documentation.
        </p>

        <p>
          Current operational parameters may be updated as the infrastructure,
          programs, third-party providers or applicable requirements evolve.
        </p>

        <p>
          Where a specific transaction or program presents applicable conditions
          before completion, those conditions govern the relevant activity.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Risk",
    content: (
      <>
        <p>
          Participation in Elleva programs may involve financial, operational,
          technological and market risks.
        </p>

        <p>These may include:</p>

        <ul className="mt-4 space-y-3 text-white/60">
          <li>• market volatility;</li>
          <li>• liquidity risk;</li>
          <li>• execution risk;</li>
          <li>• blockchain and digital-asset risk;</li>
          <li>• technology and infrastructure failures;</li>
          <li>• cybersecurity incidents;</li>
          <li>• third-party service interruptions;</li>
          <li>• regulatory or legal changes;</li>
          <li>• operational delays;</li>
          <li>• potential loss of capital.</li>
        </ul>
      </>
    ),
  },
  {
    number: "07",
    title: "No guaranteed outcome",
    content: (
      <>
        <p>
          No Elleva program should be represented as a guaranteed income,
          guaranteed return or risk-free opportunity.
        </p>

        <p>
          Participants must not represent historical results, examples,
          percentages or distributions as promises of future performance.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Program changes",
    content: (
      <>
        <p>
          Elleva may modify, suspend or discontinue an ecosystem program or
          operational mechanism when reasonably necessary due to operational,
          technological, security, compliance, legal or business considerations.
        </p>

        <p>
          Changes may be communicated through the platform, official
          documentation or other appropriate channels.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Participant conduct",
    content: (
      <>
        <p>
          Participants are responsible for communicating accurate information
          about Elleva and its programs.
        </p>

        <p>
          Participants must not promise financial results, fabricate
          performance, impersonate Elleva, alter official program conditions or
          make representations inconsistent with official Elleva materials.
        </p>
      </>
    ),
  },
];

export default function ProgramRulesView() {
  useEffect(() => {
    document.title = "Program & Risk Disclosure | Elleva";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-[#050909] text-white py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-[-220px] top-[-180px] h-[620px] w-[620px] rounded-full bg-[#00d9c5]/10 blur-[180px]" />
      </div>

      <section className="relative border-b border-white/10 pt-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Program & Risk
              <br />
              Disclosure
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
              The framework governing selected Elleva ecosystem programs,
              operational conditions and associated risks.
            </p>

            <p className="mt-8 text-sm text-white/35">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="mb-14 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <CircleDollarSign className="mb-5 h-5 w-5 text-[#21ead8]" />
            <h2 className="font-medium">ProfitShare</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Variable ecosystem distributions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <Layers3 className="mb-5 h-5 w-5 text-[#21ead8]" />
            <h2 className="font-medium">Elleva Direct</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Ecosystem development program.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <BarChart3 className="mb-5 h-5 w-5 text-[#21ead8]" />
            <h2 className="font-medium">Elleva Pool</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Participation linked to applicable company results.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <ShieldCheck className="mb-5 h-5 w-5 text-[#21ead8]" />
            <h2 className="font-medium">Risk</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              No guaranteed outcome.
            </p>
          </div>
        </div>

        <div className="mb-14 rounded-3xl border border-amber-400/20 bg-amber-400/[0.04] p-6 sm:p-8">
          <div className="flex gap-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />

            <div>
              <h2 className="font-medium text-amber-100">
                Important disclosure
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/55">
                Elleva programs involve operational, market, technology and
                other risks. No program described here guarantees income,
                profits, returns or preservation of capital.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {sections.map((section) => (
            <article
              key={section.number}
              className="grid gap-6 py-10 md:grid-cols-[120px_1fr] md:py-14"
            >
              <span className="font-mono text-sm text-[#21ead8]/60">
                {section.number}
              </span>

              <div className="max-w-3xl">
                <h2 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">
                  {section.title}
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-7 text-white/55 sm:text-base">
                  {section.content}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-5">
          <Link
            to={PATH_PAGE.termsofuse}
            className="inline-flex items-center gap-2 text-sm text-[#21ead8] transition hover:text-white"
          >
            Terms of Use
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to={PATH_PAGE.privacypolicy}
            className="inline-flex items-center gap-2 text-sm text-[#21ead8] transition hover:text-white"
          >
            Privacy Policy
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 rounded-3xl border border-[#21ead8]/15 bg-[#21ead8]/[0.04] p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#21ead8]">
            ELLEVA
          </p>

          <h2 className="mt-4 text-2xl font-medium">
            Autonomous Capital Infrastructure
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
            Research → Decide → Execute → Monitor.
          </p>
        </div>
      </section>
    </main>
  );
}
