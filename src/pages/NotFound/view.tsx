import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PATH_PAGE } from "@/routes/paths";
import notFoundSvg from "@/assets/notfound/FneKUXvbyX.svg";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { animateVar } from "@/components/animate/variants";

export function NotFoundView() {
  const { t } = useTranslation("notfound");

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#050505] text-white p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Ambient background aura */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,178,182,0.06),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        variants={animateVar.fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center justify-center text-center max-w-md sm:max-w-lg w-full mx-auto relative z-10 space-y-8"
      >
        {/* Animated 404 Illustration */}
        <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md mx-auto flex items-center justify-center">
          <img
            src={notFoundSvg}
            alt="404 Page Not Found"
            className="w-full h-auto max-h-[340px] object-contain select-none pointer-events-none drop-shadow-2xl"
          />
        </div>

        {/* Return to homepage action */}
        <div>
          <Link
            to={PATH_PAGE.home}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#050505] bg-gradient-to-r from-[#00B2B6] to-[#89EAE6] hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#00B2B6]/20 focus:outline-none focus:ring-2 focus:ring-[#00B2B6] focus:ring-offset-2 focus:ring-offset-[#050505] min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("returnHome")}</span>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default NotFoundView;
