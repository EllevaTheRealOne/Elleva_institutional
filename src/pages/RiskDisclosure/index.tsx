import { useTranslation } from "react-i18next";
import { ShieldAlert, TrendingDown, Wallet, BrainCircuit, FileWarning, Globe, LockKeyhole, Scale } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { PATH_PAGE } from "@/constants/routes/routes.constants";
const icons=[TrendingDown,Wallet,BrainCircuit,FileWarning,Globe,LockKeyhole,Scale,ShieldAlert,ShieldAlert,FileWarning];
export default function RiskDisclosureView(){
 const {t}=useTranslation("riskdisclosure");
 usePageMeta({title:`Elleva | ${t("heading")}`,description:t("intro"),path:PATH_PAGE.riskdisclosure});
 return <main className="min-h-screen bg-[#050709] py-10 text-white"><div className="mx-auto max-w-5xl px-5 pt-20 pb-24 sm:px-8 md:pt-40">
 <header className="mb-12 border-b border-white/10 pb-10"><h1 className="text-4xl font-semibold sm:text-5xl">{t("heading")}<span className="block text-cyan-300">{t("subheading")}</span></h1><p className="mt-6 max-w-3xl leading-7 text-white/60">{t("intro")}</p><p className="mt-5 text-sm text-white/40">{t("updated")}</p></header>
 <div className="mb-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6"><h2 className="font-semibold">{t("noticeTitle")}</h2><p className="mt-2 leading-7 text-white/70">{t("notice")}</p></div>
 <div className="space-y-5">{icons.map((Icon,index)=><section key={index} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"><h2 className="flex items-center gap-3 text-lg font-semibold"><Icon className="h-5 w-5 text-cyan-300"/>{index+1}. {t(`sections.${index}.title`)}</h2><p className="mt-4 leading-7 text-white/60">{t(`sections.${index}.content`)}</p></section>)}</div>
 <footer className="mt-12 border-t border-white/10 pt-8 text-sm text-white/50">{t("footer")}</footer></div></main>;
}
