"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Locations from "@/components/sections/Locations";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";

// Dynamic imports for smart features (client-only)
const ExitIntent = dynamic(() => import("@/components/smart/ExitIntent"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Team />
        <Locations />
        <Gallery />
        <Testimonials />
        <Blog />
      </main>
      <Footer />

      {/* Smart Features */}
      <ExitIntent />
    </>
  );
}
