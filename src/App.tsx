import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Layout from "./layout";
import { Suspense } from "react";
import { allLangs } from "./i18n/langs";
import { useSyncHtmlLang } from "./hooks/use-sync-html-lang";
import { HomeView } from "./pages/Home";
import { BusinessPlanView } from "./pages/BusinessPlan";
import { PATH_PAGE } from "./constants/routes/routes.constants";
import NotFoundView from "./pages/NotFound";
import TermsOfUseView from "./pages/termsOfUse";
import ProgramRulesView from "./pages/ProgramRules";
import RiskDisclosureView from "./pages/RiskDisclosure";
import PrivacyPolicyView from "./pages/privacyPolicy";
import ContactView from "./pages/contact";

const Root = () => {
  useSyncHtmlLang();
  return <Outlet />;
};

const mainChildRoutes = [
  { index: true, element: <HomeView /> },
  { path: PATH_PAGE.businessPlan.slice(1), element: <BusinessPlanView /> },
  { path: PATH_PAGE.privacypolicy.slice(1), element: <PrivacyPolicyView /> },
  { path: PATH_PAGE.termsofuse.slice(1), element: <TermsOfUseView /> },
  { path: PATH_PAGE.programrules.slice(1), element: <ProgramRulesView /> },
  { path: PATH_PAGE.riskdisclosure.slice(1), element: <RiskDisclosureView /> },
  { path: PATH_PAGE.contact.slice(1), element: <ContactView /> },
];
const buildRoutesForPrefix = (prefix?: string) => {
  const layoutPath = prefix || "/";

  return [
    {
      path: layoutPath,
      element: <Layout />,
      children: mainChildRoutes,
    },
  ];
};

const allPrefixes = Array.from(
  new Set([
    ...allLangs.map((l) => l.value),
    ...allLangs.map((l) => l.value.toLowerCase()),
    ...allLangs.map((l) => l.valueWhithCurrrency),
    ...allLangs.map((l) => l.valueWhithCurrrency.toLowerCase()),
  ]),
);

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      ...buildRoutesForPrefix(),
      ...allPrefixes.flatMap((prefix) => buildRoutesForPrefix(prefix)),
      {
        element: <Layout />,
        children: [{ path: "*", element: <NotFoundView /> }],
      },
    ],
  },
]);

// Server state (ARCHITECTURE.md, "Mandatory Data Flow"). The site only reads
// public, slow-moving figures, so one retry and a long stale time are enough, and
// refocusing the tab never refetches them.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          }
        >
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <RouterProvider router={router} />
          </TooltipProvider>
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
