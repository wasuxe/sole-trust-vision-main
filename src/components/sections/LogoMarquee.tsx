import React from 'react';
import { motion } from 'motion/react';

const CLIENTS = [
  "Nina's Beauty Hub",
  "Farmlytics",
  "ChainMind AI",
  "Asha Tiffin",
  "Psychology with Mitali",
  "Lumora Beauty"
];

// Duplicate multiple times for a seamless infinite loop
const MARQUEE_ITEMS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

export default function LogoMarquee() {
  return (
    <section className="py-24 bg-background overflow-hidden border-t border-b border-border/30">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-center text-sm font-medium tracking-widest text-muted-foreground uppercase">
          Brands We've Worked With
        </h2>
      </div>

      <div 
        className="relative w-full overflow-hidden flex" 
        style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
      >
        <div className="flex items-center space-x-16 md:space-x-24 animate-marquee whitespace-nowrap py-4">
          {MARQUEE_ITEMS.map((client, idx) => (
            <div
              key={idx}
              className="text-muted-foreground hover:text-white transition-colors duration-500 cursor-default"
            >
              <span className="font-display text-3xl md:text-4xl font-medium tracking-tight">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
