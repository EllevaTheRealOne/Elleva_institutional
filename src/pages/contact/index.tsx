import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Globe2,
  Headphones,
  LoaderCircle,
  Mail,
  MessageCircle,
  MessageSquareText,
  Send,
  Users,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const WHATSAPP_NUMBER = "19402388149";
const CONTACT_EMAIL_API_URL = "https://elleva.me/api/contact/email";

const ALLOWED_TOPICS = [
  "general",
  "business",
  "institutional",
  "privacy",
  "support",
  "account",
] as const;

type ContactTopicValue = (typeof ALLOWED_TOPICS)[number];

type ContactTopic = {
  value: ContactTopicValue;
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
  topic: ContactTopicValue | "";
  message: string;
};

type FeedbackType = "success" | "error";

type FeedbackState = {
  open: boolean;
  type: FeedbackType;
  title: string;
  description: string;
};

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  company: "",
  topic: "",
  message: "",
};

const INITIAL_FEEDBACK: FeedbackState = {
  open: false,
  type: "error",
  title: "",
  description: "",
};

export default function ContactView() {
  const { t } = useTranslation("contact");

  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedback, setFeedback] = useState<FeedbackState>(INITIAL_FEEDBACK);

  const websiteRef = useRef<HTMLInputElement>(null);

  const topics = t("topics", {
    returnObjects: true,
  }) as ContactTopic[];

  const contactTypes = t("contactTypes", {
    returnObjects: true,
  }) as ContactCard[];

  const contactMethods = t("contactMethods", {
    returnObjects: true,
  }) as ContactCard[];

  useEffect(() => {
    document.title = `${t("pageTitle")} | Elleva`;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [t]);

  const selectedTopic =
    topics.find((topic) => topic.value === formData.topic)?.label ||
    formData.topic;

  const showFeedback = (
    type: FeedbackType,
    title: string,
    description: string,
  ) => {
    setFeedback({
      open: true,
      type,
      title,
      description,
    });
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    return (
      name.length >= 2 &&
      name.length <= 100 &&
      !/[\r\n]/.test(name) &&
      email.length > 0 &&
      email.length <= 254 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      ALLOWED_TOPICS.includes(formData.topic as ContactTopicValue) &&
      message.length >= 5 &&
      message.length <= 5000
    );
  };

  const buildMessage = (): string =>
    [
      t("emailBodyTitle"),
      "",
      `${t("emailBody.name")}: ${formData.name.trim()}`,
      `${t("emailBody.email")}: ${formData.email.trim()}`,
      `${t("emailBody.company")}: ${
        formData.company.trim() || t("emailBody.companyNotProvided")
      }`,
      `${t("emailBody.topic")}: ${selectedTopic}`,
      "",
      `${t("emailBody.message")}:`,
      formData.message.trim(),
    ].join("\n");

  const handleEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      showFeedback(
        "error",
        t("feedback.validationTitle"),
        t("feedback.validationEmail"),
      );
      return;
    }

    // Honeypot antispam.
    if (websiteRef.current?.value.trim()) {
      setFormData({ ...INITIAL_FORM });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_EMAIL_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          topic: formData.topic,
          message: formData.message.trim(),
          website: websiteRef.current?.value ?? "",
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true) {
        const validationErrors = result?.errors
          ? Object.values(result.errors as Record<string, string[]>)
              .flat()
              .join("\n")
          : "";

        throw new Error(
          validationErrors || result?.message || t("feedback.errorDescription"),
        );
      }

      setFormData({ ...INITIAL_FORM });

      if (websiteRef.current) {
        websiteRef.current.value = "";
      }

      showFeedback(
        "success",
        t("feedback.successTitle"),
        result.message || t("feedback.successDescription"),
      );
    } catch (error) {
      console.error("Contact form submission failed:", error);

      const isConnectionError = error instanceof TypeError;

      showFeedback(
        "error",
        isConnectionError
          ? t("feedback.connectionTitle")
          : t("feedback.errorTitle"),
        isConnectionError
          ? t("feedback.connectionDescription")
          : error instanceof Error
            ? error.message
            : t("feedback.unexpectedError"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (isSubmitting) return;

    if (!validateForm()) {
      showFeedback(
        "error",
        t("feedback.validationTitle"),
        t("feedback.validationWhatsapp"),
      );
      return;
    }

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
                const Icon =
                  [Headphones, Users, Building2][index] ?? Headphones;

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
                <div
                  aria-hidden="true"
                  className="absolute -left-[10000px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    ref={websiteRef}
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>

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
                      type="text"
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
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
                      autoComplete="email"
                      maxLength={254}
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
                    type="text"
                    autoComplete="organization"
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

                      {topics
                        .filter((topic) => ALLOWED_TOPICS.includes(topic.value))
                        .map((topic) => (
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
                    minLength={5}
                    maxLength={5000}
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
                    disabled={isSubmitting}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 text-sm font-semibold text-white transition hover:border-[#21ead8]/30 hover:bg-[#21ead8]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Mail className="h-4 w-4 text-[#21ead8]" />

                    {isSubmitting ? t("actions.sending") : t("actions.email")}

                    {isSubmitting ? (
                      <LoaderCircle className="h-4 w-4 animate-spin text-[#21ead8]" />
                    ) : (
                      <Send className="h-3.5 w-3.5 text-white/30 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    disabled={isSubmitting}
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#21ead8] px-6 text-sm font-semibold text-[#03100f] transition hover:bg-[#45f3e2] disabled:cursor-not-allowed disabled:opacity-50"
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

      <AlertDialog
        open={feedback.open}
        onOpenChange={(open) =>
          setFeedback((current) => ({
            ...current,
            open,
          }))
        }
      >
        <AlertDialogContent className="border border-white/10 bg-[#080d0d] text-white sm:max-w-md">
          <AlertDialogHeader>
            <div
              className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                feedback.type === "success"
                  ? "bg-[#21ead8]/10 text-[#21ead8]"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <CircleAlert className="h-6 w-6" />
              )}
            </div>

            <AlertDialogTitle className="text-lg font-medium text-white">
              {feedback.title}
            </AlertDialogTitle>

            <AlertDialogDescription className="whitespace-pre-line text-sm leading-6 text-white/60">
              {feedback.description}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction className="bg-[#21ead8] text-[#03100f] hover:bg-[#45f3e2] focus:ring-[#21ead8]">
              {t("actions.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
