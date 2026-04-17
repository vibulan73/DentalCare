"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { locations } from "@/lib/data";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function isCurrentlyOpen(
  hours: { day: string; time: string }[]
): { open: boolean; message: string } {
  const now = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = dayNames[now.getDay()];
  const todayHours = hours.find((h) => h.day === today);

  if (!todayHours || todayHours.time === "Closed") {
    return { open: false, message: "Closed Today" };
  }

  const timeParts = todayHours.time.match(/(\d+):(\d+)\s*(AM|PM)\s*[–-]\s*(\d+):(\d+)\s*(AM|PM)/i);
  if (!timeParts) return { open: false, message: "Closed" };

  let openHour = parseInt(timeParts[1]);
  const openMin = parseInt(timeParts[2]);
  const openPeriod = timeParts[3].toUpperCase();
  let closeHour = parseInt(timeParts[4]);
  const closeMin = parseInt(timeParts[5]);
  const closePeriod = timeParts[6].toUpperCase();

  if (openPeriod === "PM" && openHour !== 12) openHour += 12;
  if (openPeriod === "AM" && openHour === 12) openHour = 0;
  if (closePeriod === "PM" && closeHour !== 12) closeHour += 12;
  if (closePeriod === "AM" && closeHour === 12) closeHour = 0;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return { open: true, message: "Open Now" };
  }

  return { open: false, message: "Closed Now" };
}

export default function Locations() {
  const [activeTab, setActiveTab] = useState(locations[0].id);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statuses, setStatuses] = useState<Record<string, { open: boolean; message: string }>>({});

  useEffect(() => {
    const s: Record<string, { open: boolean; message: string }> = {};
    locations.forEach((loc) => {
      s[loc.id] = isCurrentlyOpen(loc.hours);
    });
    setStatuses(s);
  }, []);

  const activeLoc = locations.find((l) => l.id === activeTab) || locations[0];
  const status = statuses[activeLoc.id] || { open: false, message: "Loading..." };

  return (
    <section id="locations" className="relative py-24 bg-muted/30">
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
            Our Locations
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Visit Us at <span className="gradient-text">3 Locations</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conveniently located across the Greater Toronto Area with evening
            hours to serve you better.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-3 mb-10"
        >
          {locations.map((loc) => {
            const locStatus = statuses[loc.id];
            return (
              <button
                key={loc.id}
                onClick={() => setActiveTab(loc.id)}
                className={`relative px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === loc.id
                    ? "gradient-teal text-white shadow-lg shadow-teal-500/25"
                    : "bg-card border border-border text-muted-foreground hover:border-dental-teal/30"
                }`}
              >
                <MapPin className="w-4 h-4" />
                {loc.name}
                {locStatus && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      locStatus.open ? "bg-green-400" : "bg-red-400"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Active Location Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-[400px]">
            <iframe
              src={activeLoc.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${activeLoc.name} Map`}
            />
          </div>

          {/* Info Card */}
          <div className="bg-card rounded-2xl border border-border p-8">
            {/* Status */}
            <div className="flex items-center gap-2 mb-6">
              {status.open ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span
                className={`text-sm font-semibold ${
                  status.open ? "text-green-600" : "text-red-500"
                }`}
              >
                {status.message}
              </span>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-5 h-5 text-dental-teal shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Address</p>
                <p className="text-muted-foreground text-sm">
                  {activeLoc.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 mb-6">
              <Phone className="w-5 h-5 text-dental-teal shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Phone</p>
                <a
                  href={`tel:${activeLoc.phone}`}
                  className="text-dental-teal hover:underline font-medium"
                >
                  {activeLoc.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 mb-8">
              <Clock className="w-5 h-5 text-dental-teal shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold mb-3">Office Hours</p>
                <div className="space-y-2">
                  {activeLoc.hours.map((h) => (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between text-sm py-1.5 px-3 rounded-lg ${
                        h.time === "Closed"
                          ? "bg-red-50 text-red-600"
                          : "bg-muted/50"
                      }`}
                    >
                      <span className="font-medium">{h.day}</span>
                      <span
                        className={
                          h.time === "Closed" ? "text-red-500" : "text-muted-foreground"
                        }
                      >
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <a
                href={`tel:${activeLoc.phone}`}
                className={cn(buttonVariants({ variant: "default" }), "flex-1 gradient-teal text-white border-0 rounded-xl btn-ripple hover:opacity-90")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeLoc.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "flex-1 rounded-xl")}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
