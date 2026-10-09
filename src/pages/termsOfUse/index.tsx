import { useEffect } from "react";
import {
  AlertTriangle,
  Blocks,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "@/routes/paths";

const LAST_UPDATED = "October 9, 2026";

const sections = [
  {
    number: "01",
    title: "Acceptance of the Terms",
    content: (
      <>
        <p>
          These Terms of Use govern your access to and use of the Elleva
          website, platform, applications, dashboards, technology,
          infrastructure, tools, content, programs and related digital services.
        </p>

        <p>
          By creating an account, accessing the platform or using any Elleva
          functionality, you acknowledge that you have read, understood and
          agreed to these Terms.
        </p>

        <p>
          If you do not agree with these Terms, you should not access or use the
          applicable Elleva services.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "About Elleva",
    content: (
      <>
        <p>
          Elleva is an Autonomous Capital Infrastructure designed to connect
          capital, intelligence, data, financial infrastructure and execution
          through technology.
        </p>

        <p>
          Its architecture may combine research, market information, decision
          systems, automation, monitoring, blockchain infrastructure and
          connectivity with third-party financial and technology providers.
        </p>

        <p>Elleva operates around the continuous infrastructure model:</p>

        <p className="font-medium text-white/80">
          Research → Decide → Execute → Monitor.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Nature and Scope of the Infrastructure",
    content: (
      <>
        <p>
          Elleva provides technological infrastructure and related digital
          services. Depending on the service involved, the infrastructure may
          connect users or accounts with independent third-party providers.
        </p>

        <p>
          Unless expressly stated in a separate agreement, Elleva does not act
          as a bank, broker, exchange, traditional investment fund, custodian or
          financial adviser merely by providing access to its technology.
        </p>

        <p>
          Financial, payment, custody, liquidity, brokerage or other regulated
          services may be performed by independent third-party providers where
          applicable.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Research, Decision and Execution Infrastructure",
    content: (
      <>
        <p>
          Elleva's technology may include research systems, market data,
          automated processing, decision-support systems, execution
          infrastructure and continuous monitoring.
        </p>

        <p>
          Artificial intelligence, algorithms and automated systems may be used
          to process information, monitor conditions, identify operational
          opportunities or support decisions and execution.
        </p>

        <p>
          Automated technology cannot eliminate market risk, liquidity risk,
          execution risk, technology risk or unexpected market conditions.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "No Guarantee of Financial Results",
    content: (
      <>
        <p>
          Financial markets and digital assets involve risk. Historical
          performance, simulations, projections, examples, targets or previous
          results do not guarantee future performance.
        </p>

        <p>
          No information displayed by Elleva should be interpreted as a
          guarantee of profit, preservation of capital or a fixed financial
          result.
        </p>

        <p>
          Users remain responsible for determining whether the use of the
          platform and any applicable allocation of capital is appropriate for
          their own circumstances.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Eligibility and Restricted Access",
    content: (
      <>
        <p>
          You may only use Elleva if you have the legal capacity to enter into
          binding agreements and your use of the applicable service is permitted
          under the laws applicable to you.
        </p>

        <p>
          Elleva may restrict, suspend or refuse access to particular services,
          features, programs or jurisdictions where reasonably necessary for
          legal, compliance, security, operational or business reasons.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Account Registration and Security",
    content: (
      <>
        <p>
          You are responsible for providing accurate and current information
          during registration and for keeping your account information updated.
        </p>

        <p>
          You are responsible for maintaining the confidentiality of your
          credentials, authentication methods and devices used to access the
          platform.
        </p>

        <p>
          You should notify Elleva promptly if you believe your account has been
          compromised or accessed without authorization.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Verification and Compliance",
    content: (
      <>
        <p>
          Elleva or its applicable infrastructure partners may require identity,
          account, transaction or other information for security, fraud
          prevention, compliance, legal or operational purposes.
        </p>

        <p>
          Failure to provide information reasonably required for verification
          may result in restricted access to certain services or transactions.
        </p>

        <p>
          Elleva may delay, reject, restrict or suspend activity where
          reasonably necessary to address security, fraud, compliance or legal
          concerns.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Wallets and Blockchain Transactions",
    content: (
      <>
        <p>
          Certain Elleva services may interact with third-party digital wallets
          or blockchain networks.
        </p>

        <p>
          Blockchain transactions may be irreversible after confirmation. Elleva
          may not be able to cancel, recover or reverse assets sent to an
          incorrect address, unsupported network or incompatible asset.
        </p>

        <p>
          Users are responsible for validating wallet addresses, networks,
          supported assets and transaction information before confirming a
          transfer.
        </p>

        <p>
          Unless expressly stated otherwise, technological access to wallet or
          blockchain functionality does not by itself mean that Elleva assumes
          custody of the user's digital assets.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Third-Party Infrastructure",
    content: (
      <>
        <p>
          Elleva may integrate with or depend upon third-party providers,
          including financial institutions, brokers, banking infrastructure,
          liquidity providers, blockchain networks, wallet infrastructure,
          payment providers, cloud services and market-data providers.
        </p>

        <p>
          Third-party services may be governed by separate agreements,
          disclosures and privacy policies.
        </p>

        <p>
          Elleva is not responsible for failures, restrictions, delays or
          outages caused exclusively by independent third-party systems or
          events outside Elleva's reasonable control.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "ProfitShare",
    content: (
      <>
        <p>
          Where made available, ProfitShare is an Elleva ecosystem mechanism
          whose applicable distributions may depend on operational and economic
          performance and the rules of the applicable program.
        </p>

        <p>
          ProfitShare distributions are variable and are not guaranteed. They
          should not be interpreted as fixed interest, guaranteed returns or a
          promise of profit.
        </p>

        <p>
          Applicable ProfitShare conditions, limits, qualifications and
          operational rules are described separately in the applicable program
          documentation.
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "Elleva Direct and Ecosystem Programs",
    content: (
      <>
        <p>
          Elleva may provide ecosystem development, partner, referral or
          community programs, including Elleva Direct.
        </p>

        <p>
          Eligibility, qualification criteria, distributions, recognition levels
          and other conditions may be defined separately in the applicable
          program rules.
        </p>

        <p>
          Participation in any Elleva program does not guarantee income, profits
          or a specific financial result.
        </p>

        <p>
          Participants may not make false, misleading, unauthorized or
          guaranteed financial claims about Elleva.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "Fees and Operational Conditions",
    content: (
      <>
        <p>
          Certain transactions, withdrawals, services or platform activities may
          be subject to fees or operational limits.
        </p>

        <p>
          Applicable fees, minimums, maximums, processing periods and program
          conditions may be presented through the relevant interface,
          transaction confirmation or applicable program rules.
        </p>

        <p>
          Blockchain networks and third-party infrastructure may impose
          additional charges outside Elleva's control.
        </p>
      </>
    ),
  },
  {
    number: "14",
    title: "User Responsibilities",
    content: (
      <>
        <p>You agree to:</p>

        <ul className="mt-4 space-y-3 text-white/60">
          <li>• provide accurate and current information;</li>
          <li>• maintain appropriate account security;</li>
          <li>• comply with applicable laws and regulations;</li>
          <li>• verify transaction and wallet information;</li>
          <li>• use the platform only for lawful purposes;</li>
          <li>• follow applicable program rules;</li>
          <li>
            • avoid unauthorized or misleading representations about Elleva.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: "15",
    title: "Prohibited Conduct",
    content: (
      <>
        <p>You may not use Elleva to:</p>

        <ul className="mt-4 space-y-3 text-white/60">
          <li>• conduct fraudulent or unlawful activities;</li>
          <li>• provide false or misleading information;</li>
          <li>• attempt unauthorized access to systems or accounts;</li>
          <li>• interfere with platform security or infrastructure;</li>
          <li>• impersonate Elleva or another person;</li>
          <li>• misuse referral or ecosystem programs;</li>
          <li>• manipulate transactions or platform data;</li>
          <li>• violate intellectual-property rights;</li>
          <li>• bypass security or compliance procedures.</li>
        </ul>
      </>
    ),
  },
  {
    number: "16",
    title: "Suspension and Termination",
    content: (
      <>
        <p>
          Elleva may restrict, suspend or terminate access where reasonably
          necessary to protect users, investigate suspicious activity, comply
          with legal obligations, protect infrastructure or enforce these Terms.
        </p>

        <p>
          Where appropriate, Elleva may request additional information or
          verification before restoring access.
        </p>
      </>
    ),
  },
  {
    number: "17",
    title: "Availability of the Platform",
    content: (
      <>
        <p>
          Elleva seeks to maintain reliable infrastructure but does not
          guarantee uninterrupted or error-free availability.
        </p>

        <p>
          Access may be temporarily unavailable because of maintenance,
          upgrades, cybersecurity incidents, blockchain congestion, third-party
          outages, market conditions or events outside Elleva's reasonable
          control.
        </p>
      </>
    ),
  },
  {
    number: "18",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          The Elleva name, brand, interface, software, visual identity,
          documentation, content, technology and related intellectual property
          are protected by applicable intellectual-property laws.
        </p>

        <p>
          No ownership rights are transferred to users merely because they
          access or use the platform.
        </p>
      </>
    ),
  },
  {
    number: "19",
    title: "Risk Disclosure",
    content: (
      <>
        <p>
          Financial-market activity, digital assets, blockchain transactions,
          automated execution and technology infrastructure involve material
          risks.
        </p>

        <p>
          Risks may include market volatility, liquidity limitations, execution
          failures, technology failures, cybersecurity incidents, third-party
          outages, blockchain congestion, regulatory changes and loss of
          capital.
        </p>

        <p>
          A more detailed description of applicable program and operational
          risks is provided in the Elleva Program & Risk Disclosure.
        </p>
      </>
    ),
  },
  {
    number: "20",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, Elleva shall not be
          liable for indirect, incidental, consequential or special losses
          arising from circumstances outside its reasonable control.
        </p>

        <p>
          Nothing in these Terms excludes or limits liability that cannot
          lawfully be excluded or limited.
        </p>
      </>
    ),
  },
  {
    number: "21",
    title: "Indemnification",
    content: (
      <>
        <p>
          To the extent permitted by applicable law, you may be responsible for
          losses, claims, liabilities or reasonable costs arising from your
          unlawful use of the platform, violation of these Terms or infringement
          of the rights of Elleva or third parties.
        </p>
      </>
    ),
  },
  {
    number: "22",
    title: "Changes to the Platform or Terms",
    content: (
      <>
        <p>
          Elleva may update its platform, products, functionality, programs or
          these Terms as its technology, business model, operational
          requirements or legal obligations evolve.
        </p>

        <p>
          Material changes may be communicated through the platform, website or
          other appropriate channels.
        </p>
      </>
    ),
  },
  {
    number: "23",
    title: "Privacy",
    content: (
      <>
        <p>
          Personal information is processed in accordance with Elleva's Privacy
          Policy and applicable data-protection requirements.
        </p>

        <Link
          to={PATH_PAGE.privacypolicy}
          className="inline-block mt-2 text-[#21ead8] transition hover:text-white"
        >
          Read Privacy Policy →
        </Link>
      </>
    ),
  },
  {
    number: "24",
    title: "Governing Law and Dispute Resolution",
    content: (
      <>
        <p>
          The governing law, contracting entity and dispute-resolution mechanism
          applicable to a user's relationship with Elleva should be identified
          in the applicable contractual documentation and in accordance with
          mandatory law.
        </p>

        <p>
          Nothing in these Terms is intended to remove or restrict rights that
          cannot lawfully be excluded under the laws applicable to the user.
        </p>
      </>
    ),
  },
  {
    number: "25",
    title: "Contact",
    content: (
      <>
        <p>
          Questions regarding these Terms, the Privacy Policy or applicable
          Elleva programs may be submitted through the official Elleva contact
          channels.
        </p>

        <Link
          to={PATH_PAGE.contact}
          className="inline-block mt-2 text-[#21ead8] transition hover:text-white"
        >
          Contact Elleva →
        </Link>
      </>
    ),
  },
];

export default function TermsOfUseView() {
  useEffect(() => {
    document.title = "Terms of Use | Elleva";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-[#050909] text-white py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-260px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#00d9c5]/10 blur-[150px]" />
      </div>

      <section className="relative border-b border-white/10 pt-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className=" max-w-4xl">
            <h1 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Terms of Use
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
              The conditions governing access to Elleva's technology,
              infrastructure and digital ecosystem.
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
            <ShieldCheck className="mb-5 h-5 w-5 text-[#21ead8]" />
            <h2 className="font-medium">Clear framework</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Rules for accessing and using the Elleva ecosystem.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <Sparkles className="mb-5 h-5 w-5 text-[#21ead8]" />
            <h2 className="font-medium">Autonomous infrastructure</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              AI, automation, data and execution infrastructure.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <Scale className="mb-5 h-5 w-5 text-[#21ead8]" />
            <h2 className="font-medium">User responsibility</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Users remain responsible for their accounts and transactions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <Blocks className="mb-5 h-5 w-5 text-[#21ead8]" />
            <h2 className="font-medium">Third-party connectivity</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Elleva may connect with independent financial and technology
              infrastructure.
            </p>
          </div>
        </div>

        <div className="mb-14 rounded-3xl border border-amber-400/20 bg-amber-400/[0.04] p-6 sm:p-8">
          <div className="flex gap-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />

            <div>
              <h2 className="font-medium text-amber-100">
                Important risk notice
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/55">
                Financial markets, digital assets, blockchain transactions and
                automated systems involve risk. Elleva does not guarantee
                profits, performance or preservation of capital. Users should
                understand the applicable risks before using the platform or
                participating in an Elleva program.
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
