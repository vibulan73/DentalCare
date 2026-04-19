"use client";

import { CalendarDays, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="glass border-t border-border px-4 py-3 flex gap-3">
        <Link href="/book" className="flex-1">
          <Button
            className="w-full gradient-teal text-white border-0 rounded-xl btn-ripple hover:opacity-90 gap-2 shadow-lg"
          >
            <CalendarDays className="w-4 h-4" />
            Book Appointment
          </Button>
        </Link>
        <a
          href="tel:416-292-7004"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-xl gap-2")}
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
      </div>
    </div>
  );
}
