import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { ResourceService } from "@/services/resource/resource.service";

export function usePdfResource() {
  const { language } = useI18n();

  const [pdfUrl, setPdfUrl] = useState("");
  const [slideUrl, setSlideUrl] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadPdf = async () => {
      const currentLanguage = language ?? "en";
      const langFormatted = currentLanguage.toUpperCase().replace("-", "_");

      const currentPdf = `/pdf/ELLEVA_${langFormatted}.pdf`;
      const currentSlide = `slides/${currentLanguage}`;

      const fallbackPdf = `/pdf/ELLEVA_EN.pdf`;
      const fallbackSlide = `slides/en`;

      const exists = await ResourceService.checkResourceExists(currentPdf);

      if (!isMounted) return;

      if (exists) {
        setPdfUrl(currentPdf);
        setSlideUrl(currentSlide);
      } else {
        setPdfUrl(fallbackPdf);
        setSlideUrl(fallbackSlide);
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [language]);

  return {
    pdfUrl,
    slideUrl,
  };
}
