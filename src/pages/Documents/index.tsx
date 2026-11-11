import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { PATH_PAGE } from "@/constants/routes/routes.constants";

export default function Page() {
  const { t } = useTranslation("documents");

  usePageMeta({
    title: `Elleva | ${t(`title`)}`,
    description: t(`intro`),
    path: PATH_PAGE.documents,
  });

  return (
    <section className="mx-auto max-w-5xl text-white px-5 pb-24 pt-36 bg-background min-h-[65vh]">
      <h1 className="text-4xl font-semibold">{t(`title`)}</h1>
      <p className="mt-5 max-w-3xl text-white/60">{t(`intro`)}</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {["terms", "privacy", "risk", "rules"].map((key, i) => (
          <Link
            key={key}
            className="rounded-2xl border border-white/20 p-7 hover:border-cyan-300"
            to={
              [
                PATH_PAGE.termsofuse,
                PATH_PAGE.privacypolicy,
                PATH_PAGE.riskdisclosure,
                PATH_PAGE.programrules,
              ][i]
            }
          >
            <span className="text-cyan-300">{t(key)}</span>
            <p className="mt-3 text-sm text-white/50">{t("read")}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
