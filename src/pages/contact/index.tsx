import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Globe2,
  Headphones,
  Mail,
  MessageCircle,
  MessageSquareText,
  Send,
  Users,
} from "lucide-react";

const WHATSAPP_NUMBER = "19402388149";
const CONTACT_EMAIL = "contact@elleva.me";

type ContactTopic = {
  value: string;
  label: string;
};

type ContactCard = {
  title: string;
  description: string;
};

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
};

export default function ContactView() {
  const { t } = useTranslation(["contact"]);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    topic: "",
    message: "",
  });

  const topics = t("topics", { returnObjects: true }) as ContactTopic[];
  const contactTypes = t("contactTypes", {
    returnObjects: true,
  }) as ContactCard[];
  const contactMethods = t("contactMethods", {
    returnObjects: true,
  }) as ContactCard[];

  useEffect(() => {
    document.title = `${t("pageTitle")} | Elleva`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [t]);

  const selectedTopic =
    topics.find((topic) => topic.value === formData.topic)?.label ||
    formData.topic;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () =>
    Boolean(
      formData.name.trim() &&
        formData.email.trim() &&
        formData.topic &&
        formData.message.trim(),
    );

  const buildMessage = () =>
    [
      t("emailBodyTitle"),
      "",
      `${t("emailBody.name")}: ${formData.name}`,
      `${t("emailBody.email")}: ${formData.email}`,
      `${t("emailBody.company")}: ${formData.company || t("emailBody.companyNotProvided")}`,
      `${t("emailBody.topic")}: ${selectedTopic}`,
      "",
      `${t("emailBody.message")}:`,
      formData.message,
    ].join("\n");

  const handleEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    const subject = `${t("emailSubject")} — ${selectedTopic}`;
    const body = buildMessage();
    const emailUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = emailUrl;
  };

  const handleWhatsApp = () => {
    if (!validateForm()) return;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildMessage(),
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-[#050909] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-[400px] w-[400px] rounded-full bg-[#00d9c5]/10 blur-[150px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-[#00d9c5]/5 blur-[170px]" />
      </div>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8">
        <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <h1 className="mt-5 max-w-xl text-5xl font-medium tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {t("heroTitle")}
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-white/50">
              {t("heroDescription")}
            </p>

            <div className="mt-12 space-y-3">
              {contactTypes.map((item, index) => {
                const Icon = [Headphones, Users, Building2][index] ?? Headphones;
                return (
                  <div
                    key={item.title}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#21ead8]/10">
                        <Icon className="h-5 w-5 text-[#21ead8]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="mt-1 text-xs text-white/35">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:text-[#21ead8]" />
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-white/35">
              <Globe2 className="h-4 w-4 text-[#21ead8]" />
              {t("globalStatement")}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#21ead8]/30 via-white/5 to-transparent" />
            <div className="relative rounded-[27px] bg-[#080d0d] p-6 sm:p-8 lg:p-10">
              <div>
                <MessageSquareText className="h-6 w-6 text-[#21ead8]" />
                <h2 className="mt-5 text-2xl font-medium tracking-[-0.03em]">
                  {t("formTitle")}
                </h2>
                <p className="mt-2 text-sm text-white/40">
                  {t("formDescription")}
                </p>
              </div>

              <form onSubmit={handleEmail} className="mt-9 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-medium text-white/50"
                    >
                      {t("fields.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("fields.namePlaceholder")}
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#21ead8]/50 focus:ring-2 focus:ring-[#21ead8]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium text-white/50"
                    >
                      {t("fields.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("fields.emailPlaceholder")}
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#21ead8]/50 focus:ring-2 focus:ring-[#21ead8]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-xs font-medium text-white/50"
                  >
                    {t("fields.company")}
                    <span className="ml-1 text-white/25">
                      {t("fields.optional")}
                    </span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t("fields.companyPlaceholder")}
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#21ead8]/50 focus:ring-2 focus:ring-[#21ead8]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="mb-2 block text-xs font-medium text-white/50"
                  >
                    {t("fields.topic")}
                  </label>
                  <div className="relative">
                    <select
                      id="topic"
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={handleChange}
                      className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.035] px-4 pr-12 text-sm text-white outline-none transition focus:border-[#21ead8]/50 focus:ring-2 focus:ring-[#21ead8]/10"
                    >
                      <option value="" disabled className="bg-[#080d0d]">
                        {t("fields.topicPlaceholder")}
                      </option>
                      {topics.map((topic) => (
                        <option
                          key={topic.value}
                          value={topic.value}
                          className="bg-[#080d0d]"
                        >
                          {topic.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium text-white/50"
                  >
                    {t("fields.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("fields.messagePlaceholder")}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-[#21ead8]/50 focus:ring-2 focus:ring-[#21ead8]/10"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="submit"
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 text-sm font-semibold text-white transition hover:border-[#21ead8]/30 hover:bg-[#21ead8]/10"
                  >
                    <Mail className="h-4 w-4 text-[#21ead8]" />
                    {t("actions.email")}
                    <Send className="h-3.5 w-3.5 text-white/30 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#21ead8] px-6 text-sm font-semibold text-[#03100f] transition hover:bg-[#45f3e2]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("actions.whatsapp")}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

                <p className="text-center text-xs leading-5 text-white/25">
                  {t("consent")}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3 lg:px-8">
          {contactMethods.map((item, index) => {
            const Icon = [Mail, MessageCircle, Globe2][index] ?? Globe2;
            return (
              <div key={item.title} className="flex gap-4">
                <Icon className="mt-0.5 h-5 w-5 text-[#21ead8]" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/35">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
