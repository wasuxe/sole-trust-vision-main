import { motion } from "motion/react";
import React from "react";

const nodes = [
  { label: "CONTENT", angle: 0 },
  { label: "AUDIENCE", angle: 60 },
  { label: "ENGAGEMENT", angle: 120 },
  { label: "DATA", angle: 180 },
  { label: "INSIGHT", angle: 240 },
  { label: "OPTIMIZATION", angle: 300 },
];

export default function InfiniteLoop() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            THE INTERNET NEVER STOPS
          </h2>
        </motion.div>

        {/* Ring Visualization */}
        <div className="relative w-full max-w-[320px] md:max-w-[500px] aspect-square flex items-center justify-center mb-16 md:mb-24">
          <svg viewBox="-300 -300 600 600" className="w-full h-full overflow-visible">
            <defs>
              <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            
            <circle cx="0" cy="0" r="250" fill="url(#ringGlow)" />

            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="0" cy="0" r="180" fill="none" strokeWidth="2" strokeDasharray="8 8" className="stroke-white/10" />
            </motion.g>

            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="0" cy="-180" r="6" fill="white" style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))" }} />
            </motion.g>

            {nodes.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.sin(rad) * 180;
              const y = -Math.cos(rad) * 180;
              
              const txtX = Math.sin(rad) * 240;
              const txtY = -Math.cos(rad) * 240;
              
              return (
                <g key={i}>
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="20" 
                    className="stroke-white/20 transition-all duration-300 hover:stroke-white/60 cursor-pointer" 
                    style={{ fill: 'var(--background, #09090b)' }}
                    strokeWidth="2" 
                  />
                  <circle cx={x} cy={y} r="4" className="fill-white/50 pointer-events-none" />
                  <text 
                    x={txtX} 
                    y={txtY} 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="text-xs md:text-sm fill-white/60 font-sans tracking-widest pointer-events-none font-medium"
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl"
        >
          <p className="text-2xl md:text-4xl font-display font-medium text-white/90 leading-tight">
            Marketing isn't a campaign anymore.<br className="hidden md:block" /> It's a system.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
