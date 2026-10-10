import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

type InformationSection = {
  title: string;
  text: string;
  items: string[];
};

type Pillar = {
  title: string;
  subtitle: string;
};

export default function PrivacyPolicyView() {
  const { t } = useTranslation(["privacypolicy"]);

  useEffect(() => {
    document.title = `${t("heroTitleLine1")} ${t("heroTitleLine2")} | Elleva`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [t]);

  const informationSections = t("informationSections", {
    returnObjects: true,
  }) as InformationSection[];

  const purposes = t("purposes", {
    returnObjects: true,
  }) as string[];

  const pillars = t("pillars", {
    returnObjects: true,
  }) as Pillar[];

  const pillarIcons = [Database, LockKeyhole, Blocks, Eye];
  const informationIcons = [Database, LockKeyhole, Globe2];

  const sections = [
    { key: "dataController", icon: Scale },
    { key: "legalBases", icon: KeyRound },
    { key: "internationalProcessing", icon: Globe2 },
    { key: "thirdPartyInfrastructure", icon: Blocks },
    { key: "blockchainInformation", icon: Blocks },
    { key: "security", icon: Shield },
    { key: "dataRetention", icon: Database },
    { key: "yourRights", icon: UserRoundCheck },
    { key: "automatedProcessing", icon: Eye },
    { key: "cookiesAnalytics", icon: LockKeyhole },
    { key: "children", icon: null },
    { key: "policyUpdates", icon: null },
  ];

  return (
    <main className="min-h-screen bg-[#050909] py-10 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-[-220px] top-[80px] h-[620px] w-[620px] rounded-full bg-[#00cdb9]/10 blur-[180px]" />
        <div className="absolute bottom-[10%] left-[-260px] h-[500px] w-[500px] rounded-full bg-[#00d9c5]/[0.04] blur-[160px]" />
      </div>

      <section className="relative border-b border-white/10 pt-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <h1 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {t("heroTitleLine1")}
                <br />
                {t("heroTitleLine2")}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
                {t("heroDescription")}
              </p>

              <p className="mt-8 text-sm text-white/35">
                {t("lastUpdatedLabel", {
                  date: t("lastUpdated"),
                })}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7">
              <Shield className="h-6 w-6 text-[#21ead8]" />

              <p className="mt-5 text-lg font-medium">{t("designTitle")}</p>

              <p className="mt-3 text-sm leading-7 text-white/45">
                {t("designDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl md:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? Database;

            return (
              <div
                key={pillar.title}
                className="border-b border-white/10 p-7 md:border-b-0 md:border-r last:border-r-0"
              >
                <Icon className="h-5 w-5 text-[#21ead8]" />

                <p className="mt-5 font-medium">{pillar.title}</p>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  {pillar.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#21ead8]">
            {t("informationEyebrow")}
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">
            {t("informationTitle")}
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/45">
            {t("informationDescription")}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {informationSections.map((section, index) => {
            const Icon = informationIcons[index] ?? Database;

            return (
              <article
                key={section.title}
                className="rounded-3xl border border-white/10 bg-white/[0.025] p-7"
              >
                <Icon className="mb-4 h-5 w-5 text-[#21ead8]" />

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
            );
          })}
        </div>

        <div className="mt-24 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#21ead8]">
              {t("purposeEyebrow")}
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-[-0.03em]">
              {t("purposeTitle")}
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/45">
              {t("purposeDescription")}
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
          {sections.map(({ key, icon: Icon }) => {
            const title = t(`sections.${key}.title`);

            const paragraphs = t(`sections.${key}.paragraphs`, {
              returnObjects: true,
            }) as string[];

            const isLast = key === "policyUpdates";

            return (
              <div
                key={key}
                className={
                  isLast
                    ? "grid gap-8 border-y border-white/10 py-12 md:grid-cols-[220px_1fr]"
                    : "grid gap-8 border-t border-white/10 pt-12 md:grid-cols-[220px_1fr]"
                }
              >
                <div className="flex items-start gap-3">
                  {Icon && <Icon className="h-5 w-5 shrink-0 text-[#21ead8]" />}

                  <h2 className="font-medium">{title}</h2>
                </div>

                <div className="max-w-3xl space-y-4 text-sm leading-7 text-white/50">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {key === "policyUpdates" && (
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Link
                        to={PATH_PAGE.termsofuse}
                        className="text-sm text-[#21ead8] transition hover:text-white"
                      >
                        {t("links.terms")}
                      </Link>

                      <Link
                        to={PATH_PAGE.programrules}
                        className="text-sm text-[#21ead8] transition hover:text-white"
                      >
                        {t("links.programRules")}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-[#21ead8]/15 bg-[#21ead8]/[0.04] p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#21ead8]">
            Elleva
          </p>

          <h2 className="mt-4 text-2xl font-medium">{t("brandTitle")}</h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
            {t("brandDescription")}
          </p>
        </div>
      </section>
    </main>
  );
}
