"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage = "/images/hero-bg.png",
}: PageHeroProps) {
  return (
    <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-teal-900/70 to-blue-900/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.2),transparent_50%)]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
      >
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
    </section>
  );
}
