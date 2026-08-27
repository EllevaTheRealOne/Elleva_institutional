import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/theme";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Layout from "./layout";
import { Suspense } from "react";
import { allLangs } from "./i18n/langs";
import { useSyncHtmlLang } from "./hooks/use-sync-html-lang";
import { HomeView } from "./pages/Home";
import NotFoundView from "./pages/NotFound";

const Root = () => {
  useSyncHtmlLang();
  return <Outlet />;
};

const mainChildRoutes = [{ index: true, element: <HomeView /> }];

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

export function App() {
  return (
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
  );
}

export default App;
