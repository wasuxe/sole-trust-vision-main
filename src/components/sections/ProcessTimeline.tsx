import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const STAGES = [
  {
    id: '01',
    name: 'DISCOVER',
    animation: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.svg 
          width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </motion.svg>
      </div>
    )
  },
  {
    id: '02',
    name: 'RESEARCH',
    animation: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <motion.line x1="30" y1="15" x2="15" y2="40" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" className="text-foreground" />
          <motion.line x1="30" y1="15" x2="45" y2="40" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" className="text-foreground" />
          <motion.line x1="15" y1="40" x2="45" y2="40" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" className="text-foreground" />
          <motion.circle cx="30" cy="15" r="4" fill="currentColor" className="text-foreground" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="15" cy="40" r="4" fill="currentColor" className="text-foreground" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
          <motion.circle cx="45" cy="40" r="4" fill="currentColor" className="text-foreground" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
        </svg>
      </div>
    )
  },
  {
    id: '03',
    name: 'STRATEGY',
    animation: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <line x1="30" y1="15" x2="45" y2="30" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" className="text-foreground" />
          <line x1="45" y1="30" x2="30" y2="45" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" className="text-foreground" />
          <line x1="30" y1="45" x2="15" y2="30" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" className="text-foreground" />
          <line x1="15" y1="30" x2="30" y2="15" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" className="text-foreground" />
          <motion.circle cx="30" cy="15" r="3" fill="currentColor" className="text-foreground" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.circle cx="45" cy="30" r="3" fill="currentColor" className="text-foreground" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
          <motion.circle cx="30" cy="45" r="3" fill="currentColor" className="text-foreground" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
          <motion.circle cx="15" cy="30" r="3" fill="currentColor" className="text-foreground" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }} />
        </svg>
      </div>
    )
  },
  {
    id: '04',
    name: 'CREATE',
    animation: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div 
          className="absolute w-12 h-14 border-2 border-foreground rounded bg-surface-elevated z-20"
          animate={{ rotate: [-4, 4, -4], x: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-12 h-14 border-2 border-foreground/60 rounded bg-surface z-10"
          animate={{ rotate: [-8, 8, -8], x: [-8, 8, -8], y: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        />
        <motion.div 
          className="absolute w-12 h-14 border-2 border-foreground/30 rounded bg-background z-0"
          animate={{ rotate: [-12, 12, -12], x: [-14, 14, -14], y: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </div>
    )
  },
  {
    id: '05',
    name: 'LAUNCH',
    animation: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <motion.svg 
          width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground absolute"
          animate={{ y: [30, -30], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        >
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </motion.svg>
        <motion.div 
          className="w-[2px] bg-foreground/30 absolute left-1/2 -translate-x-1/2"
          style={{ height: '40px' }}
          animate={{ y: [50, -10], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    )
  },
  {
    id: '06',
    name: 'OPTIMIZE',
    animation: (
      <div className="relative w-full h-full flex items-end justify-center gap-1.5 pb-8">
        <motion.div className="w-2.5 bg-foreground rounded-t-sm" animate={{ height: ['15px', '35px', '15px'] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="w-2.5 bg-foreground/70 rounded-t-sm" animate={{ height: ['35px', '15px', '35px'] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
        <motion.div className="w-2.5 bg-foreground/40 rounded-t-sm" animate={{ height: ['10px', '45px', '10px'] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
        <motion.div className="w-2.5 bg-foreground/90 rounded-t-sm" animate={{ height: ['25px', '20px', '25px'] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
      </div>
    )
  },
  {
    id: '07',
    name: 'SCALE',
    animation: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div 
          className="absolute w-3 h-3 rounded-full bg-foreground"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-3 h-3 rounded-full border border-foreground"
          animate={{ scale: [1, 4], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-3 h-3 rounded-full border border-foreground"
          animate={{ scale: [1, 6], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        />
      </div>
    )
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="process" className="py-24 md:py-32 px-6 overflow-hidden relative bg-background" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 md:mb-32">
          <span className="text-sm font-medium text-foreground/50 tracking-widest uppercase mb-4 block">PROCESS</span>
          <h2 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-tight text-foreground">HOW WE WORK</h2>
        </div>

        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden md:block absolute left-8 top-4 bottom-4 w-[2px] bg-border transform -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 right-0 bottom-0 bg-foreground origin-top"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <div className="space-y-24 md:space-y-32 relative">
            {STAGES.map((stage, index) => {
              return (
                <motion.div 
                  key={stage.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16"
                >
                  {/* Desktop Number & Dot */}
                  <div className="hidden md:flex relative w-16 h-16 items-center justify-center shrink-0">
                    <div className="absolute w-3 h-3 rounded-full bg-background border-2 border-foreground z-10" />
                    <div className="absolute -left-8 text-2xl font-display font-bold text-foreground/20">
                      {stage.id}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 bg-surface/30 md:bg-transparent p-6 rounded-3xl border border-border/50 md:border-transparent md:p-0">
                    {/* Mobile Number */}
                    <div className="md:hidden text-lg font-display font-bold text-foreground/40 mb-[-10px]">
                      {stage.id}
                    </div>

                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-foreground">
                      {stage.name}
                    </h3>

                    <div className="w-[120px] h-[120px] shrink-0 rounded-2xl bg-surface border border-border flex items-center justify-center overflow-hidden shadow-xl relative z-10">
                      {stage.animation}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
