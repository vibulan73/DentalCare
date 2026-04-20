"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/sections/Footer";

// Dynamic imports for smart features (client-only)
const StickyCTA = dynamic(() => import("@/components/smart/StickyCTA"), {
  ssr: false,
});

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">
        <Booking />
      </main>
      <Footer />

      {/* Smart Features */}
      <StickyCTA />
    </>
  );
}
