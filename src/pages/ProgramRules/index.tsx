import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

type ProgramCard = {
  title: string;
  description: string;
};

type ProgramSection = {
  number: string;
  title: string;
  paragraphs: string[];
  riskItems?: string[];
};

export default function ProgramRulesView() {
  const { t } = useTranslation(["programrules"]);

  const programs = t("programs", {
    returnObjects: true,
  }) as ProgramCard[];

  const sections = t("sections", {
    returnObjects: true,
  }) as ProgramSection[];

  const programIcons = [CircleDollarSign, Layers3, BarChart3, ShieldCheck];

  useEffect(() => {
    document.title = `${t("heroTitleLine1")} ${t("heroTitleLine2")} | Elleva`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [t]);

  return (
    <main className="min-h-screen bg-[#050909] py-10 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-[-220px] top-[-180px] h-[620px] w-[620px] rounded-full bg-[#00d9c5]/10 blur-[180px]" />
      </div>

      <section className="relative border-b border-white/10 pt-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="max-w-4xl">
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
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="mb-14 grid gap-4 md:grid-cols-4">
          {programs.map((program, index) => {
            const Icon = programIcons[index] ?? ShieldCheck;

            return (
              <div
                key={program.title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
              >
                <Icon className="mb-5 h-5 w-5 text-[#21ead8]" />

                <h2 className="font-medium">{program.title}</h2>

                <p className="mt-2 text-sm leading-6 text-white/45">
                  {program.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mb-14 rounded-3xl border border-amber-400/20 bg-amber-400/[0.04] p-6 sm:p-8">
          <div className="flex gap-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />

            <div>
              <h2 className="font-medium text-amber-100">
                {t("importantDisclosure.title")}
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/55">
                {t("importantDisclosure.description")}
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
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.number}-${index}`}>{paragraph}</p>
                  ))}

                  {section.riskItems && (
                    <ul className="mt-4 space-y-3 text-white/60">
                      {section.riskItems.map((item) => (
                        <li key={item}>• {item};</li>
                      ))}
                    </ul>
                  )}
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
            {t("links.terms")}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to={PATH_PAGE.privacypolicy}
            className="inline-flex items-center gap-2 text-sm text-[#21ead8] transition hover:text-white"
          >
            {t("links.privacy")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-16 rounded-3xl border border-[#21ead8]/15 bg-[#21ead8]/[0.04] p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#21ead8]">
            ELLEVA
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
