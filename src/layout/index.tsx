import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";

export default function Layout() {
  useScrollToHash();

  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
