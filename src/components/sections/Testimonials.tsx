"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import Image from "next/image";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 bg-muted/30 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-dental-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-dental-blue/5 rounded-full blur-3xl" />

      <div className="section-padding relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-dental-teal mb-3">
            Testimonials
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from the thousands of
            patients who trust us with their smiles.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-3xl mx-auto">
          {/* Nav Buttons */}
          <button
            onClick={prev}
            className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center hover:shadow-lg transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-3xl border border-border p-8 sm:p-12 text-center shadow-lg relative"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-dental-teal/10 flex items-center justify-center">
              <Quote className="w-6 h-6 text-dental-teal" />
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < t.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-8 italic">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-dental-teal/20">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-dental-teal font-medium">
                  {t.treatment}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-dental-teal"
                    : "w-2 bg-border hover:bg-dental-teal/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mini Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid sm:grid-cols-3 gap-4 mt-16"
        >
          {testimonials.slice(0, 3).map((review, i) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl border border-border p-5 hover:border-dental-teal/30 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setCurrent(i)}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, si) => (
                  <Star
                    key={si}
                    className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-xs font-semibold">{review.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
