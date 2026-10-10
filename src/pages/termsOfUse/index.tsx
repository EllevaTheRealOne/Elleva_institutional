import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  Blocks,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PATH_PAGE } from "@/routes/paths";

type FeatureCard = {
  title: string;
  description: string;
};

type TermsSection = {
  number: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  link?: {
    label: string;
    target: "privacy" | "contact";
  };
};

export default function TermsOfUseView() {
  const { t } = useTranslation(["termsofuse"]);

  const featureCards = t("featureCards", {
    returnObjects: true,
  }) as FeatureCard[];

  const sections = t("sections", {
    returnObjects: true,
  }) as TermsSection[];

  const featureIcons = [ShieldCheck, Sparkles, Scale, Blocks];

  useEffect(() => {
    document.title = `${t("heroTitle")} | Elleva`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [t]);

  return (
    <main className="min-h-screen bg-[#050909] py-10 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-260px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#00d9c5]/10 blur-[150px]" />
      </div>

      <section className="relative border-b border-white/10 pt-20 md:pt-40">
        <div className="mx-auto max-w-6xl px-6 pb-16 lg:px-8 lg:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
              {t("heroDescription")}
            </p>

            <p className="mt-8 text-sm text-white/35">
              {t("lastUpdatedLabel", { date: t("lastUpdated") })}
            </p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="mb-14 grid gap-4 md:grid-cols-4">
          {featureCards.map((card, index) => {
            const Icon = featureIcons[index] ?? Blocks;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
              >
                <Icon className="mb-5 h-5 w-5 text-[#21ead8]" />
                <h2 className="font-medium">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/45">
                  {card.description}
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
                {t("riskNotice.title")}
              </h2>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/55">
                {t("riskNotice.description")}
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
                    <p
                      key={`${section.number}-paragraph-${index}`}
                      className={
                        section.number === "02" && index === 3
                          ? "font-medium text-white/80"
                          : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.items && (
                    <ul className="mt-4 space-y-3 text-white/60">
                      {section.items.map((item, index) => (
                        <li key={item}>
                          • {item}{index === section.items!.length - 1 ? "." : ";"}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.link?.target === "privacy" && (
                    <Link
                      to={PATH_PAGE.privacypolicy}
                      className="mt-2 inline-block text-[#21ead8] transition hover:text-white"
                    >
                      {section.link.label}
                    </Link>
                  )}

                  {section.link?.target === "contact" && (
                    <Link
                      to={PATH_PAGE.contact}
                      className="mt-2 inline-block text-[#21ead8] transition hover:text-white"
                    >
                      {section.link.label}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
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
