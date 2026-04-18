"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChevronLeft,
  ChevronRight,
  Link,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/data";
import Image from "next/image";

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisible(3);
      else if (window.innerWidth >= 640) setVisible(2);
      else setVisible(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, doctors.length - visible);

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  return (
    <section id="team" className="relative py-24">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.04),transparent_50%)]" />

      <div className="section-padding relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-dental-teal mb-3">
            Our Team
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Meet Our <span className="gradient-text">Specialists</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team of experienced dental professionals is dedicated to
            providing you with the highest quality care.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation */}
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-6">
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * (100 / visible)}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {doctors.map((doctor, i) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="shrink-0"
                  style={{ width: `calc(${100 / visible}% - ${((visible - 1) * 24) / visible}px)` }}
                  onMouseEnter={() => setHoveredId(doctor.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-dental-teal/30 hover:shadow-xl transition-all duration-400">
                    {/* Image */}
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Hover Bio Overlay */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: hoveredId === doctor.id ? 1 : 0,
                          y: hoveredId === doctor.id ? 0 : 20,
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-dental-teal/90 via-dental-teal/70 to-dental-teal/40 flex items-end p-6 pointer-events-none"
                      >
                        <p className="text-white text-sm leading-relaxed">
                          {doctor.bio}
                        </p>
                      </motion.div>

                      {/* Experience Badge */}
                      <div className="absolute top-4 right-4 glass rounded-full px-3 py-1">
                        <span className="text-xs font-semibold text-slate-800">
                          {doctor.experience}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6">
                      <h3
                        className="text-lg font-bold mb-1"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {doctor.name}
                      </h3>
                      <p className="text-dental-teal text-sm font-medium mb-1">
                        {doctor.title}
                      </p>
                      <p className="text-muted-foreground text-sm mb-4">
                        {doctor.specialty}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          onClick={() =>
                            document
                              .getElementById("booking")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="flex-1 gradient-teal text-white border-0 rounded-xl btn-ripple hover:opacity-90 transition-opacity text-xs"
                        >
                          <CalendarDays className="w-3.5 h-3.5 mr-1" />
                          Book with Dr.
                        </Button>
                        <a
                          href={doctor.social.linkedin || "#"}
                          className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-dental-teal hover:text-white hover:border-dental-teal transition-all"
                        >
                          <Link className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-8 bg-dental-teal"
                    : "w-2 bg-border hover:bg-dental-teal/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
