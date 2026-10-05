import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Palette,
  Share2,
  Camera,
  Film,
  Megaphone,
  Code,
  Search,
  Cpu,
  Users,
  Star,
  Music,
} from "lucide-react";

const SERVICES = [
  { id: "branding", label: "Branding", icon: Palette, color: "#E8E8E8" },
  { id: "social", label: "Social Media", icon: Share2, color: "#D4D4D4" },
  { id: "content", label: "Content Creation", icon: Camera, color: "#C0C0C0" },
  { id: "reels", label: "Reels & Video", icon: Film, color: "#B0B0B0" },
  { id: "ads", label: "Paid Ads", icon: Megaphone, color: "#A0A0A0" },
  { id: "website", label: "Website", icon: Code, color: "#909090" },
  { id: "seo", label: "SEO", icon: Search, color: "#808080" },
  { id: "ai", label: "AI Automation", icon: Cpu, color: "#707070" },
  { id: "leads", label: "Lead Generation", icon: Users, color: "#606060" },
  { id: "influencer", label: "Influencer Marketing", icon: Star, color: "#555555" },
  { id: "artist", label: "Artist Management", icon: Music, color: "#4A4A4A" },
];

export default function SystemConfigurator() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  const toggleService = (id: string) => {
    setShowDemoNotice(false);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Keep original order of SERVICES for the stack
  const selectedServices = SERVICES.filter((s) => selectedIds.has(s.id));

  return (
    <section className="py-24 relative overflow-hidden bg-background text-foreground">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            BUILD YOUR GROWTH SYSTEM
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl font-sans">
            Select the capabilities you need. Watch your custom system come to
            life.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Grid Selection */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {SERVICES.map((service) => {
                const isSelected = selectedIds.has(service.id);
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    aria-pressed={isSelected}
                    className={`
                      relative flex flex-col md:flex-row items-center gap-3 p-4 rounded-2xl border transition-all duration-300 min-h-[80px]
                      ${
                        isSelected
                          ? "border-white bg-surface-elevated shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                          : "border-border bg-surface hover:border-white/50"
                      }
                    `}
                  >
                    <div
                      className={`
                        p-2 rounded-xl flex-shrink-0 transition-colors
                        ${isSelected ? "bg-white/10 text-white" : "bg-white/5 text-white/70"}
                      `}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm md:text-base font-medium text-left leading-tight">
                      {service.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visualization Stack */}
          <div className="lg:w-[400px] flex-shrink-0 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-md bg-surface border border-border rounded-3xl p-6 lg:p-8 flex flex-col min-h-[400px]">
              <h3 className="text-sm font-semibold tracking-wider text-white/50 uppercase mb-8 text-center">
                Your Custom Growth System
              </h3>
              
              <div className="flex-1 flex flex-col-reverse justify-start gap-3">
                <AnimatePresence>
                  {selectedServices.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: 50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 50, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="h-14 rounded-xl flex items-center justify-between px-6 w-full shadow-lg"
                      style={{ backgroundColor: service.color }}
                    >
                      <span className="font-semibold text-black">{service.label}</span>
                      <service.icon className="w-5 h-5 text-black/50" />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {selectedServices.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-white/30 text-center text-sm font-medium">
                      Select capabilities to start building
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <AnimatePresence>
              {selectedServices.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="w-full mt-8 flex flex-col items-center lg:items-end"
                >
                  <p className="text-white/70 mb-4 font-medium">
                    {selectedServices.length} capabilities selected
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowDemoNotice(true)}
                    data-cursor="go"
                    className="inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105"
                  >
                    LET'S BUILD IT →
                  </button>
                  {showDemoNotice && (
                    <p role="status" aria-live="polite" className="mt-4 max-w-sm text-sm text-white/60 lg:text-right">
                      Demo only: this selection has not been sent.{" "}
                      <a href="/contact" className="underline underline-offset-4 hover:text-white">
                        Use the contact form
                      </a>{" "}
                      or{" "}
                      <a
                        href="https://cal.com/sole-trust-5klivz/demo-meet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-white"
                      >
                        book a call
                      </a>{" "}
                      to get in touch.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
