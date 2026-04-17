"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { locations } from "@/lib/data";

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formState, setFormState] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = "Name is required";
    if (!formState.email.trim() || !/\S+@\S+\.\S+/.test(formState.email))
      errs.email = "Valid email is required";
    if (!formState.phone.trim()) errs.phone = "Phone is required";
    if (!formState.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <section id="contact" className="relative py-24">
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
            Contact Us
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out and our
            team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <div className="w-16 h-16 rounded-full gradient-teal flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Message Sent!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for reaching out. We&apos;ll get back to you shortly.
                </p>
                <Button variant="outline" onClick={() => { setSent(false); setFormState({ name: "", email: "", phone: "", message: "" }); }} className="rounded-xl">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 shadow-lg space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                    <Input
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={`rounded-xl ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={`rounded-xl ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                  <Input
                    type="tel"
                    placeholder="(416) 555-0123"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className={`rounded-xl ${errors.phone ? "border-red-500" : ""}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message *</label>
                  <textarea
                    placeholder="How can we help you?"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={4}
                    className={`w-full rounded-xl border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring ${errors.message ? "border-red-500" : "border-input"}`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full gradient-teal text-white border-0 rounded-xl py-6 btn-ripple hover:opacity-90 gap-2 text-base">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Phone Cards */}
            {locations.map((loc) => (
              <div key={loc.id} className="bg-card rounded-2xl border border-border p-5 hover:border-dental-teal/30 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-4 h-4 text-dental-teal" />
                  <span className="font-semibold text-sm">{loc.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{loc.address}</p>
                <a
                  href={`tel:${loc.phone}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-dental-teal hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  {loc.phone}
                </a>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/14162927004?text=Hello%20I%20would%20like%20to%20book%20an%20appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 text-white rounded-2xl p-5 hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <div>
                <p className="font-bold text-sm">Chat on WhatsApp</p>
                <p className="text-xs text-white/80">Quick response guaranteed</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@illangodentistry.com"
              className="flex items-center gap-3 bg-card rounded-2xl border border-border p-5 hover:border-dental-teal/30 hover:shadow-md transition-all"
            >
              <Mail className="w-5 h-5 text-dental-teal" />
              <div>
                <p className="font-semibold text-sm">Email Us</p>
                <p className="text-xs text-muted-foreground">info@illangodentistry.com</p>
              </div>
            </a>

            {/* Newsletter */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h4 className="font-bold text-sm mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                📬 Newsletter
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Get dental tips and special offers delivered to your inbox.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed!</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    className="rounded-xl text-sm"
                  />
                  <Button
                    onClick={() => newsletter && setSubscribed(true)}
                    size="sm"
                    className="gradient-teal text-white border-0 rounded-xl shrink-0 hover:opacity-90"
                  >
                    Subscribe
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
