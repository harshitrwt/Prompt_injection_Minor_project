import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Hero } from "../components/sections/Hero";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Coverage } from "../components/sections/Coverage";
import { Pricing } from "../components/sections/Pricing";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Coverage />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
