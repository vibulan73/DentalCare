"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Phone, CalendarDays, ChevronDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { locations } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Office Hours", href: "#locations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === "/") {
      // Home link - always scroll to top
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else if (href.startsWith("#")) {
      // Hash link - scroll to section
      const id = href.replace("#", "");
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/" + href);
      }
    } else {
      // Page route
      router.push(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg"
          : pathname === "/" ? "bg-transparent" : "glass shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("/")} 
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-lg gradient-teal flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white text-lg">🦷</span>
            </div>
            <div className="hidden sm:block">
              <p
                className={`text-sm font-bold leading-tight transition-colors ${
                  scrolled || pathname !== "/" ? "text-foreground" : "text-white"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Illango Dentistry
              </p>
              <p
                className={`text-[10px] transition-colors ${
                  scrolled || pathname !== "/" ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                Orthodontics & General
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeSection === link.href.replace("#", "")
                    ? scrolled || pathname !== "/"
                      ? "text-dental-teal"
                      : "text-white"
                    : scrolled || pathname !== "/"
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-dental-teal rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Phone Dropdown */}
            <div className="relative hidden sm:inline-flex">
              <button
                onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  `gap-1.5 rounded-xl ${
                    scrolled || pathname !== "/"
                      ? "text-foreground hover:bg-muted"
                      : "text-white hover:bg-white/10"
                  }`
                )}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">Call Us</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Dropdown Menu */}
              {phoneDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-50"
                  onMouseLeave={() => setPhoneDropdownOpen(false)}
                >
                  {locations.map((location) => (
                    <a
                      key={location.id}
                      href={`tel:${location.phone}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl"
                    >
                      <div>
                        <p className="text-sm font-semibold">{location.name}</p>
                        <p className="text-xs text-muted-foreground">{location.phone}</p>
                      </div>
                      <Phone className="w-4 h-4 text-dental-teal" />
                    </a>
                  ))}
                </motion.div>
              )}
            </div>

            <Link href="/book">
              <Button
                size="sm"
                className="gradient-teal text-white border-0 rounded-xl btn-ripple hover:opacity-90 gap-1.5 shadow-lg shadow-teal-500/20"
              >
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Book Now</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger
                render={
                  <button
                    className={cn(
                      "lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                      scrolled || pathname !== "/" ? "hover:bg-muted" : "hover:bg-white/10"
                    )}
                  >
                    <Menu
                      className={cn("w-5 h-5", scrolled || pathname !== "/" ? "text-foreground" : "text-white")}
                    />
                  </button>
                }
              />
              <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg gradient-teal flex items-center justify-center">
                        <span className="text-white text-lg">🦷</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Illango Dentistry
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Orthodontics & General
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <nav className="flex-1 p-4 space-y-1">
                    {navLinks.map((link) => (
                      <SheetClose
                        key={link.label}
                        render={
                          <a
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(link.href);
                            }}
                            className={cn(
                              "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                              activeSection === link.href.replace("#", "")
                                ? "bg-dental-teal/10 text-dental-teal"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {link.label}
                          </a>
                        }
                      />
                    ))}
                  </nav>

                  {/* Bottom CTA */}
                  <div className="p-4 border-t border-border space-y-3">
                    <SheetClose
                      render={
                        <Link href="/book" className="w-full">
                          <Button
                            className="w-full gradient-teal text-white border-0 rounded-xl btn-ripple"
                          >
                            <CalendarDays className="w-4 h-4 mr-2" />
                            Book Appointment
                          </Button>
                        </Link>
                      }
                    />
                    {/* Phone Options */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground px-4">Phone</p>
                      {locations.map((location) => (
                        <a
                          key={location.id}
                          href={`tel:${location.phone}`}
                          className={cn(buttonVariants({ variant: "outline" }), "w-full rounded-xl text-xs justify-start")}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          {location.name}: {location.phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
