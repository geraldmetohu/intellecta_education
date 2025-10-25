"use client";
import { Contact } from "./components/Contact";
import { FAQs } from "./components/FAQs";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { WhyUs } from "./components/WhyUs";

export default function Page() {
  return (
    <>
      <Navbar />
      {/* Full-bleed hero (no container) */}
      <Hero />

      {/* Container for the rest */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Services />
        <WhyUs />
        <Process />
        <FAQs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
