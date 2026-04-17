"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CalendarDays,
  User,
  Stethoscope,
  MapPin,
  Clock,
  Check,
  ChevronRight,
  ChevronLeft,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { services, doctors, locations } from "@/lib/data";

const steps = [
  { id: 1, label: "Service", icon: Stethoscope },
  { id: 2, label: "Doctor & Location", icon: MapPin },
  { id: 3, label: "Date & Time", icon: Clock },
  { id: 4, label: "Your Info", icon: User },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedService;
      case 2: return !!selectedDoctor && !!selectedLocation;
      case 3: return !!selectedDate && !!selectedTime;
      case 4: return !!formData.name && !!formData.email && !!formData.phone;
      default: return false;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="relative py-24">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center bg-card rounded-3xl border border-border p-12 shadow-xl"
          >
            <div className="w-20 h-20 rounded-full gradient-teal flex items-center justify-center mx-auto mb-6">
              <PartyPopper className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Appointment Confirmed!
            </h3>
            <p className="text-muted-foreground mb-6">
              Thank you, {formData.name}! Your appointment has been booked.
              We&apos;ll send a confirmation to {formData.email}.
            </p>
            <div className="bg-muted/50 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium">{services.find(s => s.id === selectedService)?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor:</span>
                <span className="font-medium">{doctors.find(d => d.id === selectedDoctor)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{locations.find(l => l.id === selectedLocation)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
            </div>
            <Button
              onClick={() => { setSubmitted(false); setStep(1); setSelectedService(""); setSelectedDoctor(""); setSelectedLocation(""); setSelectedDate(undefined); setSelectedTime(""); setFormData({ name: "", email: "", phone: "", notes: "" }); }}
              variant="outline" className="rounded-xl"
            >
              Book Another Appointment
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative py-24">
      <div className="absolute inset-0 bg-[radial_gradient(ellipse_at_bottom,rgba(13,148,136,0.05),transparent_60%)]" />

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
            Book Appointment
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Schedule Your <span className="gradient-text">Visit Today</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book your appointment in just a few steps. Choose your service,
            preferred doctor, and a time that works for you.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step > s.id
                        ? "gradient-teal text-white"
                        : step === s.id
                        ? "bg-dental-teal text-white animate-glow-pulse"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                  </div>
                  <span className="text-xs mt-2 font-medium text-muted-foreground hidden sm:block">
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${
                      step > s.id ? "bg-dental-teal" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-lg min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Service */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Select a Service
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                          selectedService === s.id
                            ? "border-dental-teal bg-dental-teal/5 shadow-md"
                            : "border-border hover:border-dental-teal/30"
                        }`}
                      >
                        <p className="font-semibold text-sm">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {s.priceHint}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Doctor & Location */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Choose Your Doctor
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {doctors.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => setSelectedDoctor(d.id)}
                          className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                            selectedDoctor === d.id
                              ? "border-dental-teal bg-dental-teal/5 shadow-md"
                              : "border-border hover:border-dental-teal/30"
                          }`}
                        >
                          <p className="font-semibold text-sm">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.specialty}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Choose Location
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {locations.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => setSelectedLocation(l.id)}
                          className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                            selectedLocation === l.id
                              ? "border-dental-teal bg-dental-teal/5 shadow-md"
                              : "border-border hover:border-dental-teal/30"
                          }`}
                        >
                          <MapPin className="w-4 h-4 text-dental-teal mb-1" />
                          <p className="font-semibold text-sm">{l.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Pick Date & Time
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-xl border"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-3">Available Times</p>
                      <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                              selectedTime === time
                                ? "gradient-teal text-white shadow-md"
                                : "bg-muted hover:bg-dental-teal/10 text-foreground"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Patient Info */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Your Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email *</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                      <Input
                        type="tel"
                        placeholder="(416) 555-0123"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Notes (optional)</label>
                      <textarea
                        placeholder="Any special requests or concerns..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="rounded-xl gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              {step < 4 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="gradient-teal text-white border-0 rounded-xl btn-ripple hover:opacity-90 gap-1 px-6"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="gradient-teal text-white border-0 rounded-xl btn-ripple hover:opacity-90 gap-1 px-6"
                >
                  <CalendarDays className="w-4 h-4" />
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
