import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

// Lazy load non-critical below-the-fold components
const Features = dynamic(() => import("@/components/Features").then(mod => ({ default: mod.Features })), {
  loading: () => <div className="py-16 md:py-24 bg-white" />,
});

const FAQ = dynamic(() => import("@/components/FAQ").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="py-16 md:py-24 bg-white" />,
});

const Doctors = dynamic(() => import("@/components/Doctors").then(mod => ({ default: mod.Doctors })), {
  loading: () => <div className="py-16 md:py-24 bg-white" />,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 overflow-hidden">
        <Header />
        <Hero />
      </div>
      <Features />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
