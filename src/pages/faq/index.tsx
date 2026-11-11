import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  Search,
  ShieldCheck,
  Wallet,
  Cpu,
  Users,
} from "lucide-react";

const categoryIcons = {
  about: BookOpen,
  platform: Cpu,
  profitShare: Wallet,
  partners: Users,
  security: ShieldCheck,
  support: CircleHelp,
};

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  id: keyof typeof categoryIcons;
  title: string;
  description: string;
  items: FaqItem[];
};

export default function FaqView() {
  const { t } = useTranslation("faq");
  const [search, setSearch] = useState("");

  const categories = t("categories", {
    returnObjects: true,
  }) as FaqCategory[];

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");

    if (!query) return categories;

    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          `${item.question} ${item.answer}`
            .toLocaleLowerCase("pt-BR")
            .includes(query),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, search]);

  return (
    <main className="min-h-screen bg-background text-foreground pt-16">
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,220,255,0.12), transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-cyan-400">
            <CircleHelp className="h-4 w-4" />
            {t("eyebrow")}
          </div> */}

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {t("description")}
          </p>

          <div className="mt-9 max-w-xl">
            <div className="relative">
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchLabel")}
                className="h-12 border-border bg-background/80 pl-11"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("searchHint")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[240px_minmax(0,1fr)] md:px-8 md:py-20">
        <aside className="h-fit md:sticky md:top-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t("categoriesTitle")}
          </p>

          <nav aria-label={t("categoriesTitle")} className="space-y-1">
            {categories.map((category) => {
              const Icon = categoryIcons[category.id];

              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4 shrink-0 text-cyan-500" />
                  {category.title}
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="rounded-xl border border-border p-8 text-center">
              <Search className="mx-auto mb-4 h-6 w-6 text-muted-foreground" />
              <h2 className="font-medium">{t("emptyTitle")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("emptyDescription")}
              </p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => setSearch("")}
              >
                {t("clearSearch")}
              </Button>
            </div>
          ) : (
            filteredCategories.map((category) => {
              const Icon = categoryIcons[category.id];

              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-24"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
                      <Icon className="h-5 w-5 text-cyan-500" />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold tracking-tight">
                        {category.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <Accordion type="multiple" className="w-full">
                    {category.items.map((item, index) => (
                      <AccordionItem
                        key={`${category.id}-${index}`}
                        value={`${category.id}-${index}`}
                        className="border-border"
                      >
                        <AccordionTrigger className="gap-4 py-5 text-left text-sm font-medium hover:no-underline md:text-base">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })
          )}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8 md:py-16">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t("contactTitle")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t("contactDescription")}
            </p>
          </div>

          <Button asChild className="shrink-0">
            <a href="/pt-BR/contact">
              {t("contactButton")}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
