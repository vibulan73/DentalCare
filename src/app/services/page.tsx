"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  SmilePlus,
  Syringe,
  Puzzle,
  Activity,
  Crown,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { services, serviceCategories, type Service } from "@/lib/data";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SmilePlus,
  Syringe,
  Puzzle,
  Activity,
  Crown,
  Sparkles,
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 sm:pt-24">
        <section className="relative py-24 bg-muted/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.04),transparent_70%)]" />

          <div className="section-padding relative">
            {/* Section Header */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-dental-teal mb-3">
                Our Services
              </span>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Comprehensive <span className="gradient-text">Dental Care</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From routine check-ups to complex oral surgery, we offer a full
                range of dental services to keep your smile healthy and beautiful.
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "gradient-teal text-white shadow-lg shadow-teal-500/25"
                      : "bg-card border border-border text-muted-foreground hover:border-dental-teal/30 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>

            {/* Service Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((service, i) => {
                  const IconComp = iconMap[service.icon] || Sparkles;
                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-dental-teal/30 hover:shadow-xl hover:shadow-dental-teal/5 hover:-translate-y-2 transition-all duration-400 cursor-pointer"
                      onClick={() => setSelectedService(service)}
                    >
                      {/* Top Gradient Bar */}
                      <div className="h-1 w-full gradient-teal" />

                      <div className="p-6">
                        {/* Icon & Category */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 rounded-2xl gradient-teal flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <IconComp className="w-7 h-7 text-white" />
                          </div>
                          <Badge
                            variant="secondary"
                            className="capitalize text-xs"
                          >
                            {service.category}
                          </Badge>
                        </div>

                        {/* Content */}
                        <h3
                          className="text-xl font-bold mb-2 group-hover:text-dental-teal transition-colors"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {service.shortDescription}
                        </p>

                        {/* CTA */}
                        <div className="flex justify-end pt-4 border-t border-border">
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-dental-teal flex items-center gap-1 transition-colors">
                            Learn More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Service Detail Modal */}
          <Dialog
            open={!!selectedService}
            onOpenChange={() => setSelectedService(null)}
          >
            <DialogContent className="sm:max-w-lg rounded-2xl">
              {selectedService && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl gradient-teal flex items-center justify-center">
                        {(() => {
                          const IC = iconMap[selectedService.icon] || Sparkles;
                          return <IC className="w-6 h-6 text-white" />;
                        })()}
                      </div>
                      <div>
                        <DialogTitle
                          className="text-xl"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {selectedService.title}
                        </DialogTitle>
                      </div>
                    </div>
                  </DialogHeader>

                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedService.fullDescription}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {selectedService.benefits.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-dental-teal shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedService(null);
                        router.push("/book");
                      }}
                      className="w-full gradient-teal text-white border-0 rounded-xl py-6 text-base btn-ripple hover:opacity-90 transition-opacity"
                    >
                      Book This Service
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </section>
      </main>
      <Footer />
    </>
  );
}
