import React from "react";
import {
  ShieldAlert,
  TrendingDown,
  BrainCircuit,
  Wallet,
  Globe,
  LockKeyhole,
  FileWarning,
  Scale,
} from "lucide-react";

const LAST_UPDATED = "October 9, 2026";

const sections = [
  {
    icon: TrendingDown,
    title: "1. Financial Market Risks",
    content: [
      "Financial markets are inherently uncertain and may experience significant volatility. The value of financial instruments and digital assets can fluctuate rapidly, and adverse market conditions may result in partial or total loss of capital.",
      "Past performance, historical data, simulations, projections, and illustrative examples are not reliable indicators of future results.",
    ],
  },
  {
    icon: Wallet,
    title: "2. Digital Assets and Blockchain Risks",
    content: [
      "Digital asset transactions may be irreversible once confirmed on a blockchain. Incorrect wallet addresses, network selection errors, lost private keys, compromised credentials, and transaction delays may result in permanent loss of access to assets.",
      "Blockchain networks may experience congestion, technical failures, protocol changes, or security incidents. Elleva cannot guarantee the availability, performance, or security of any external blockchain network.",
    ],
  },
  {
    icon: BrainCircuit,
    title: "3. Artificial Intelligence and Automated Systems",
    content: [
      "Elleva provides infrastructure designed to support research, decision-making, execution, and monitoring through technology that may include artificial intelligence, algorithms, and automated processes.",
      "Automated systems may produce inaccurate outputs, operate with incomplete or delayed data, fail to identify changing market conditions, or execute actions that do not produce the intended result. AI-generated analysis and algorithmic outputs are not infallible.",
      "No automated process can eliminate market risk or guarantee profitable outcomes. System performance may vary according to market conditions, data quality, configuration, and third-party dependencies.",
    ],
  },
  {
    icon: FileWarning,
    title: "4. No Guarantee of Results",
    content: [
      "Elleva does not guarantee profits, a specific rate of return, the preservation of capital, uninterrupted performance, or any particular financial outcome.",
      "Any targets, projections, examples, performance figures, or descriptions of potential outcomes must not be interpreted as promises or guarantees of future results.",
      "Users should not rely on hypothetical, historical, or projected results as evidence that similar results will occur in the future.",
    ],
  },
  {
    icon: Globe,
    title: "5. Third-Party Services and Infrastructure",
    content: [
      "Certain functions may depend on external service providers, including blockchain networks, wallet providers, data sources, cloud infrastructure, exchanges, or other technology partners.",
      "These services may be unavailable, delayed, interrupted, modified, or discontinued. Third-party actions, outages, errors, or security incidents may affect the availability or performance of Elleva-related services.",
      "Elleva cannot guarantee the uninterrupted operation or continued availability of services controlled by third parties.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "6. Cybersecurity and Operational Risks",
    content: [
      "Technology-based services may be exposed to cyberattacks, unauthorized access, software vulnerabilities, infrastructure failures, human error, and other operational incidents.",
      "Users are responsible for protecting their devices, passwords, authentication methods, wallet credentials, and other access information. Users should never share private keys or recovery phrases with unauthorized parties.",
      "Although reasonable security measures may be implemented, no digital system can be guaranteed to be completely secure.",
    ],
  },
  {
    icon: Scale,
    title: "7. Regulatory and Tax Considerations",
    content: [
      "The legal and regulatory treatment of financial markets, digital assets, automated systems, and related services varies by jurisdiction and may change over time.",
      "Users are responsible for determining whether their use of the services is lawful in their jurisdiction and for complying with applicable reporting, tax, and other legal obligations.",
      "Elleva does not provide legal or tax advice. Users should seek advice from qualified professionals when necessary.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "8. User Responsibility and Suitability",
    content: [
      "Users should understand the nature of the services, the risks involved, and their own financial circumstances before participating in any activity involving financial markets or digital assets.",
      "Users should not commit funds they cannot afford to lose, rely on projected outcomes to meet essential financial obligations, or make decisions based solely on promotional materials or automated outputs.",
      "Each user is responsible for their own decisions, actions, and assessment of the risks associated with using the services.",
    ],
  },
];

export default function RiskDisclosureView() {
  return (
    <main className="min-h-screen bg-[#050709] text-white py-10">
      <div className="mx-auto w-full max-w-5xl px-5  sm:px-8 pt-20 md:pt-40">
        <header className="mb-12 border-b border-white/10 pb-10">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Understand the risks.
            <span className="block text-cyan-300">
              Make informed decisions.
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-7 text-white/60 sm:text-lg">
            This Risk Disclosure explains important risks associated with
            financial markets, digital assets, automated systems, and the use of
            Elleva's technology infrastructure. Please read it carefully before
            using the services.
          </p>

          <p className="mt-5 text-sm text-white/40">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="mb-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-cyan-300" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Important notice
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/65">
                Participation in activities involving financial markets and
                digital assets carries risk, including the possibility of losing
                some or all of the capital involved. Technology, automation, and
                artificial intelligence do not eliminate these risks. No
                financial result is guaranteed.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-cyan-400/20 sm:p-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.07]">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h2 className="text-lg font-semibold text-white sm:text-xl">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-3 pl-0 text-sm leading-7 text-white/60 sm:pl-[52px] sm:text-base">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-white">
            9. No Professional Advice
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-7 text-white/60 sm:text-base">
            <p>
              Information provided through Elleva's infrastructure is intended
              to support technology-enabled research, decision-making,
              execution, and monitoring. It should not be treated as a
              substitute for independent professional advice or the user's own
              assessment.
            </p>
            <p>
              Users should independently evaluate information and consult
              appropriately qualified financial, legal, or tax professionals
              when necessary.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-white">
            10. Updates to This Disclosure
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
            Elleva may update this Risk Disclosure to reflect changes in its
            services, technology, operations, or applicable requirements. The
            latest version will be published on the relevant official Elleva
            website or application. Users should review this page periodically.
          </p>
        </section>

        <footer className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm leading-6 text-white/50">
            This disclosure should be read together with Elleva's Terms of Use,
            Privacy Policy, and any applicable Program Rules.
          </p>

          <div className="mt-8">
            <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">
              ELLEVA
            </p>
            <p className="mt-2 text-sm text-white/60">
              Autonomous Capital Infrastructure
            </p>
            <p className="mt-1 text-xs text-white/35">
              Research → Decide → Execute → Monitor
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
