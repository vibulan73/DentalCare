"use client";

import { Phone, MapPin, Mail, ArrowUp } from "lucide-react";
import { locations, services } from "@/lib/data";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book Appointment", href: "#booking" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-900 text-white">
      {/* Top Gradient */}
      <div className="h-1 w-full gradient-teal" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center">
                <span className="text-white font-bold text-lg">🦷</span>
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Illango Dentistry
                </h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Over 25 years of trusted dental care. Creating beautiful smiles
              across Scarborough, Markham, and Brampton.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {["facebook", "instagram", "twitter", "youtube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-dental-teal transition-colors text-slate-400 hover:text-white"
                >
                  <span className="text-sm capitalize">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-base font-bold mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-dental-teal-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-base font-bold mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-slate-400 text-sm hover:text-dental-teal-light transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4
              className="text-base font-bold mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Locations
            </h4>
            <div className="space-y-4">
              {locations.map((loc) => (
                <div key={loc.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-dental-teal-light shrink-0" />
                    <span className="font-semibold text-white">{loc.name}</span>
                  </div>
                  <p className="text-slate-400 text-xs ml-5 mb-1">
                    {loc.address}
                  </p>
                  <a
                    href={`tel:${loc.phone}`}
                    className="flex items-center gap-1.5 ml-5 text-dental-teal-light hover:underline text-xs"
                  >
                    <Phone className="w-3 h-3" />
                    {loc.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Dr. Illango Orthodontics & General
            Dentistry. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 w-10 h-10 rounded-full gradient-teal text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
