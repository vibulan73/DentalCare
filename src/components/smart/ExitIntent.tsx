"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ExitIntent() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let shown = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        const dismissed = sessionStorage.getItem("exit-intent-dismissed");
        if (!dismissed) {
          setShow(true);
          shown = true;
        }
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("exit-intent-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-card rounded-3xl border border-border p-8 sm:p-10 max-w-md w-full shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl gradient-teal flex items-center justify-center mx-auto mb-5">
              <Gift className="w-8 h-8 text-white" />
            </div>

            {/* Content */}
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Wait! Don&apos;t Miss Out 🎉
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Book your appointment today and get a{" "}
              <span className="font-bold text-dental-teal">
                FREE consultation
              </span>{" "}
              and dental checkup worth $150!
            </p>

            {/* Offer Badge */}
            <div className="bg-dental-teal/10 rounded-xl p-4 mb-6">
              <p className="text-dental-teal font-bold text-lg">
                Save $150
              </p>
              <p className="text-xs text-muted-foreground">
                On your first visit — Limited time offer
              </p>
            </div>

            {/* CTA */}
            <Button
              onClick={() => {
                dismiss();
                router.push("/book");
              }}
              className="w-full gradient-teal text-white border-0 rounded-xl py-6 text-base btn-ripple hover:opacity-90 gap-2 shadow-lg"
            >
              <CalendarDays className="w-5 h-5" />
              Claim Free Consultation
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              No commitment required. Cancel anytime.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
