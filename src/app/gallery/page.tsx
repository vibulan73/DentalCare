"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const galleryImages = [
  { id: 1, src: "/images/hero-bg.png", alt: "Modern Clinic Reception", category: "clinic" },
  { id: 2, src: "/images/clinic-treatment.png", alt: "Treatment Room", category: "clinic" },
  { id: 3, src: "/images/happy-patient.png", alt: "Happy Patient", category: "patients" },
  { id: 4, src: "/images/doctor-illango.png", alt: "Dr. Illango", category: "team" },
  { id: 5, src: "/images/doctor-janaki.png", alt: "Dr. Janaki", category: "team" },
  { id: 6, src: "/images/clinic-treatment.png", alt: "Dental Equipment", category: "clinic" },
  { id: 7, src: "/images/hero-bg.png", alt: "Waiting Room", category: "clinic" },
  { id: 8, src: "/images/before-after.png", alt: "Treatment Results", category: "results" },
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [beforeAfterPos, setBeforeAfterPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSliderMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setBeforeAfterPos((x / rect.width) * 100);
    },
    []
  );

  const handleMouseMove = (e: React.MouseEvent) => handleSliderMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    handleSliderMove(e.touches[0].clientX);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 sm:pt-24">
        <section className="relative py-24">
          <div className="section-padding">
            {/* Header */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-dental-teal mb-3">
                Gallery
              </span>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                See Our <span className="gradient-text">Clinic & Results</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take a virtual tour of our modern facilities and see the amazing
                smile transformations we&apos;ve achieved.
              </p>
            </motion.div>

            {/* Before/After Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h3
                className="text-xl font-bold text-center mb-6"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Before & After <span className="gradient-text">Transformation</span>
              </h3>
              <div
                ref={sliderRef}
                className="relative w-full max-w-2xl mx-auto h-[300px] sm:h-[400px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-border shadow-xl"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* After (full) */}
                <Image
                  src="/images/before-after.png"
                  alt="After treatment"
                  fill
                  className="object-cover"
                />

                {/* Before (clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${beforeAfterPos}%` }}
                >
                  <Image
                    src="/images/before-after.png"
                    alt="Before treatment"
                    fill
                    className="object-cover"
                    style={{ filter: "grayscale(60%) brightness(0.85)" }}
                  />
                  <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    BEFORE
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="absolute top-0 h-full"
                  style={{ left: `${beforeAfterPos}%`, transform: "translateX(-50%)" }}
                >
                  <div className="w-1 h-full bg-white shadow-lg" />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <ChevronLeft className="w-4 h-4 text-slate-600 -mr-1" />
                    <ChevronRight className="w-4 h-4 text-slate-600 -ml-1" />
                  </div>
                </div>

                {/* After Label */}
                <div className="absolute top-4 right-4 bg-dental-teal/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  AFTER
                </div>
              </div>
            </motion.div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-dental-teal/30 transition-all"
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className={`relative ${i % 3 === 0 ? "h-72" : i % 3 === 1 ? "h-56" : "h-64"}`}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.alt}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                onClick={() => setLightboxIndex(null)}
              >
                <button
                  className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
                  onClick={() => setLightboxIndex(null)}
                >
                  <X className="w-8 h-8" />
                </button>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex - 1 + galleryImages.length) %
                        galleryImages.length
                    );
                  }}
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (lightboxIndex + 1) % galleryImages.length
                    );
                  }}
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full max-w-4xl h-[70vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={galleryImages[lightboxIndex].src}
                    alt={galleryImages[lightboxIndex].alt}
                    fill
                    className="object-contain rounded-xl"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </>
  );
}
