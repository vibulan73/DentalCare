"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import {
  Award,
  Microscope,
  Users,
  Clock,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { stats } from "@/lib/data";

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  const formatted =
    target >= 1000
      ? `${(count / 1000).toFixed(count >= target ? 0 : 0)}k`
      : count.toString();

  return (
    <span>
      {target >= 1000 ? `${Math.floor(count / 1000)}k` : count}
      {suffix}
    </span>
  );
}

const whyChooseUs = [
  {
    icon: Award,
    title: "25+ Years Experience",
    description:
      "Decades of expertise in all procedures of dentistry, from orthodontics to complex oral surgery.",
  },
  {
    icon: Microscope,
    title: "Advanced Technology",
    description:
      "State-of-the-art equipment including digital X-rays, 3D imaging, and CAD/CAM restorations.",
  },
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description:
      "Personalized treatment plans that put your comfort, goals, and oral health first.",
  },
  {
    icon: Clock,
    title: "Convenient Hours",
    description:
      "Open 6 days a week with evening hours across all 3 locations to fit your schedule.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "6 skilled dental professionals covering every specialty under one roof.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Friendly",
    description:
      "We accept most major insurance plans with direct billing for your convenience.",
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-dental-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-dental-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-wider uppercase text-dental-teal mb-3">
            About Us
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Creating Beautiful Smiles
            <br />
            <span className="gradient-text">Since 1999</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dr. Illango and Associates are conveniently located in East
            Scarborough, Markham, and Brampton. With over 25 years of
            experience, we provide comprehensive dental care with a focus on
            enhancing your smile and optimizing oral health through personalized
            treatment plans.
          </p>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="glass-card rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="text-3xl sm:text-4xl font-extrabold gradient-text mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={statsInView}
                />
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Why Choose{" "}
            <span className="gradient-text">Illango Dentistry?</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-dental-teal/30 hover:shadow-lg hover:shadow-dental-teal/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
