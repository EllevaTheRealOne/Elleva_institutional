import { useEffect } from "react";
import {
  Blocks,
  Database,
  Eye,
  Globe2,
  KeyRound,
  LockKeyhole,
  Scale,
  Shield,
  UserRoundCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "@/routes/paths";

const LAST_UPDATED = "October 9, 2026";

const informationSections = [
  {
    title: "Information You Provide",
    text: "We may collect information you provide when creating, verifying, using or managing an Elleva account.",
    items: [
      "Name and account information",
      "Contact information",
      "Country or region",
      "Account and profile preferences",
      "Identity or verification information when required",
      "Information submitted to customer support",
      "Information provided in connection with applicable programs",
    ],
  },
  {
    title: "Technical and Security Information",
    text: "Information may be generated automatically when you access or interact with Elleva infrastructure.",
    items: [
      "IP address",
      "Browser and device information",
      "Operating system",
      "Login and authentication timestamps",
      "Session information",
      "Application and platform activity",
      "Security and diagnostic logs",
      "Fraud and abuse indicators",
    ],
  },
  {
    title: "Financial, Wallet and Transaction Information",
    text: "Where applicable, Elleva may process information necessary to display, monitor or facilitate platform activity.",
    items: [
      "Deposit and withdrawal information when required",
      "Transaction identifiers when required",
      "Wallet addresses",
      "Blockchain network information",
      "Account balances and account activity",
      "Operational and performance records",
      "Program-related activity",
    ],
  },
];

const purposes = [
  "Create and administer user accounts",
  "Authenticate users and protect account access",
  "Provide dashboards, interfaces and platform functionality",
  "Process and monitor applicable transactions",
  "Connect Elleva with third-party financial and technology infrastructure",
  "Support security, fraud prevention and abuse detection",
  "Provide technical and customer support",
  "Maintain operational, security and audit records",
  "Improve infrastructure, functionality and user experience",
  "Operate applicable Elleva programs and services",
  "Meet applicable legal, contractual, compliance or regulatory obligations",
];

export default function PrivacyPolicyView() {
  useEffect(() => {
    document.title = "Privacy Policy | Elleva";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="min-h-screen bg-[#050909] text-white py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-[-220px] top-[80px] h-[620px] w-[620px] rounded-full bg-[#00cdb9]/10 blur-[180px]" />
        <div className="absolute left-[-260px] bottom-[10%] h-[500px] w-[500px] rounded-full bg-[#00d9c5]/[0.04] blur-[160px]" />
      </div>

      <section className="relative border-b border-white/10 pt-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <h1 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Your data.
                <br />
                Your privacy.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
                This Privacy Policy explains how Elleva may collect, use,
                protect, retain and otherwise process information across its
                technology ecosystem.
              </p>

              <p className="mt-8 text-sm text-white/35">
                Last updated: {LAST_UPDATED}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
              <Shield className="h-6 w-6 text-[#21ead8]" />

              <p className="mt-5 text-lg font-medium">
                Privacy by responsible design
              </p>

              <p className="mt-3 text-sm leading-7 text-white/45">
                Elleva seeks to process information only where reasonably
                necessary to operate, secure, maintain and improve its
                infrastructure and provide applicable services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl md:grid-cols-4">
          {[
            [Database, "Collect", "Information necessary to operate"],
            [LockKeyhole, "Protect", "Security and access controls"],
            [Blocks, "Process", "Platform and infrastructure operations"],
            [Eye, "Control", "Transparency and applicable user rights"],
          ].map(([Icon, title, subtitle]) => {
            const Component = Icon as typeof Database;

            return (
              <div
                key={String(title)}
                className="border-b border-white/10 p-7 md:border-b-0 md:border-r last:border-r-0"
              >
                <Component className="h-5 w-5 text-[#21ead8]" />

                <p className="mt-5 font-medium">{String(title)}</p>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  {String(subtitle)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#21ead8]">
            01 / Information
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">
            Information we may process
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/45">
            The information processed by Elleva depends on how you interact with
            the platform, which features you use and which services or
            third-party infrastructure are involved.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {informationSections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-7"
            >
              <h3 className="text-lg font-medium">{section.title}</h3>

              <p className="mt-3 text-sm leading-6 text-white/45">
                {section.text}
              </p>

              <ul className="mt-6 space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-white/55"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#21ead8]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#21ead8]">
              02 / Purpose
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">
              Why Elleva processes information
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
              Information may be processed for legitimate operational,
              contractual, security, technological and legal purposes connected
              with the Elleva ecosystem.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {purposes.map((purpose, index) => (
              <div key={purpose} className="flex gap-5 py-5">
                <span className="font-mono text-xs text-[#21ead8]/60">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm text-white/65">{purpose}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 space-y-14">
          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Data Controller</h2>
            </div>

            <div className="max-w-3xl space-y-4 text-sm leading-7 text-white/50">
              <p>
                Elleva acts through the legal entity or entities responsible for
                the applicable service. The identity and contact details of the
                relevant contracting or data-controlling entity should be
                provided in the applicable account, agreement or official
                contact information.
              </p>

              <p>
                This Policy applies to personal information processed in
                connection with Elleva services, subject to applicable
                data-protection law.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <KeyRound className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Legal Bases</h2>
            </div>

            <div className="max-w-3xl space-y-4 text-sm leading-7 text-white/50">
              <p>
                Depending on the jurisdiction and circumstances, Elleva may
                process information based on contractual necessity, legitimate
                interests, consent, legal obligations, security requirements or
                other lawful bases available under applicable law.
              </p>

              <p>
                Where consent is required, Elleva will seek it in the manner
                required by applicable law and will provide available mechanisms
                for withdrawal.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <Globe2 className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">International Processing</h2>
            </div>

            <div className="max-w-3xl space-y-4 text-sm leading-7 text-white/50">
              <p>
                Elleva operates through digital infrastructure and may use
                service providers located in different countries.
              </p>

              <p>
                Information may therefore be processed or stored outside the
                country where a user resides, subject to applicable legal
                requirements and contractual or technical safeguards.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <Blocks className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Third-Party Infrastructure</h2>
            </div>

            <div className="max-w-3xl space-y-4 text-sm leading-7 text-white/50">
              <p>
                Elleva may share information with service providers where
                reasonably necessary to provide hosting, authentication,
                security, analytics, communication, transaction processing,
                support or other infrastructure.
              </p>

              <p>
                Depending on the service used, third-party infrastructure may
                include financial institutions, brokers, payment providers,
                liquidity providers, wallet infrastructure, blockchain networks,
                cloud providers and technology partners.
              </p>

              <p>
                Third parties may process information under their own terms and
                privacy policies where applicable.
              </p>

              <p>Elleva does not sell personal information to advertisers.</p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <Blocks className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Blockchain Information</h2>
            </div>

            <div className="max-w-3xl space-y-4 text-sm leading-7 text-white/50">
              <p>
                Where blockchain infrastructure is used, wallet addresses,
                transaction identifiers and related network information may be
                processed by Elleva or visible on the applicable public
                blockchain.
              </p>

              <p>
                Blockchain records may be public, immutable or difficult to
                modify. Elleva cannot guarantee that information recorded on a
                public blockchain can subsequently be deleted or altered.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Security</h2>
            </div>

            <div className="max-w-3xl text-sm leading-7 text-white/50">
              <p>
                Elleva may use technical and organizational security measures
                such as authentication controls, encrypted communications,
                access restrictions, audit logs, monitoring and infrastructure
                security practices.
              </p>

              <p className="mt-4">
                No digital system can be guaranteed to be completely immune from
                cyberattacks, technical failures, unauthorized access or other
                security incidents.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <Database className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Data Retention</h2>
            </div>

            <div className="max-w-3xl text-sm leading-7 text-white/50">
              <p>
                Information may be retained for as long as reasonably necessary
                to provide services, maintain account and transaction records,
                protect security, prevent fraud, resolve disputes and satisfy
                contractual or legal requirements.
              </p>

              <p className="mt-4">
                Retention periods may therefore vary according to the type of
                information and the purpose for which it is processed.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <UserRoundCheck className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Your Rights</h2>
            </div>

            <div className="max-w-3xl text-sm leading-7 text-white/50">
              <p>
                Depending on applicable data-protection law, users may have
                rights to request access, correction, deletion, restriction,
                objection, portability or other forms of control over certain
                personal information.
              </p>

              <p className="mt-4">
                These rights may be subject to legal limitations, including
                obligations to retain information for security, fraud
                prevention, transaction records, contractual obligations or
                legal compliance.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Automated Processing and AI</h2>
            </div>

            <div className="max-w-3xl space-y-4 text-sm leading-7 text-white/50">
              <p>
                Elleva may use automated systems, algorithms and artificial
                intelligence to process information, monitor infrastructure,
                identify operational conditions, improve security, support
                analysis or provide platform functionality.
              </p>

              <p>
                Automated processing does not necessarily mean that decisions
                are made exclusively by automated means. Where applicable law
                provides rights concerning solely automated decision-making,
                those rights will apply as required by law.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div className="flex items-start gap-3">
              <LockKeyhole className="h-5 w-5 text-[#21ead8]" />
              <h2 className="font-medium">Cookies & Analytics</h2>
            </div>

            <div className="max-w-3xl text-sm leading-7 text-white/50">
              <p>
                Elleva may use cookies, local storage and similar technologies
                for authentication, preferences, security, analytics and
                platform performance.
              </p>

              <p className="mt-4">
                The technologies actually used may vary as Elleva's website and
                infrastructure evolve.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]">
            <div>
              <h2 className="font-medium">Children</h2>
            </div>

            <div className="max-w-3xl text-sm leading-7 text-white/50">
              <p>
                Elleva services are not intended for individuals who cannot
                legally enter into the applicable agreements. Elleva does not
                knowingly seek to collect personal information from children in
                violation of applicable law.
              </p>
            </div>
          </div>

          <div className="grid gap-8 border-y border-white/10 py-12 md:grid-cols-[220px_1fr]">
            <div>
              <h2 className="font-medium">Policy Updates</h2>
            </div>

            <div className="max-w-3xl text-sm leading-7 text-white/50">
              <p>
                This Privacy Policy may be updated as Elleva's infrastructure,
                services, technology or legal obligations evolve. Material
                changes may be communicated through the website, platform or
                other appropriate channels.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to={PATH_PAGE.termsofuse}
                  className="text-sm text-[#21ead8] transition hover:text-white"
                >
                  Read Terms of Use →
                </Link>

                <Link
                  to={PATH_PAGE.programrules}
                  className="text-sm text-[#21ead8] transition hover:text-white"
                >
                  Program & Risk Disclosure →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-[#21ead8]/15 bg-[#21ead8]/[0.04] p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#21ead8]">
            Elleva
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
