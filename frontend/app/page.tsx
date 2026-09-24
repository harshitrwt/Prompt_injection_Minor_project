import { AnnouncementBar } from "../components/AnnouncementBar";
import { Nav } from "../components/Nav";
import { Hero } from "../components/sections/Hero";
import { ResearchStrip } from "../components/sections/ResearchStrip";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Architecture } from "../components/sections/Architecture";
import { LivePlayground } from "../components/sections/LivePlayground";
import { Coverage } from "../components/sections/Coverage";
import { BenchmarkTable } from "../components/sections/BenchmarkTable";
import { Pricing } from "../components/sections/Pricing";
import { Faq } from "../components/sections/Faq";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main className="min-h-screen">
        <Hero />
        <ResearchStrip />
        <HowItWorks />
        <Architecture />
        <LivePlayground />
        <Coverage />
        <BenchmarkTable />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
