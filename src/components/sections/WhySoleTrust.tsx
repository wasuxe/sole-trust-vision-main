import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const statements = [
  {
    num: "01",
    keyword: "STRATEGY",
    desc: "Every decision begins with the business behind it — not the deliverable in front of it."
  },
  {
    num: "02",
    keyword: "CREATIVE",
    desc: "A bar set by the world’s best studios. Held to it on every single frame."
  },
  {
    num: "03",
    keyword: "TECHNOLOGY",
    desc: "Modern stacks, automation, and AI baked into how we build and ship."
  },
  {
    num: "04",
    keyword: "DATA",
    desc: "Instinct refined by measurement. We move fast — and we move smart."
  },
  {
    num: "05",
    keyword: "EXECUTION",
    desc: "We don’t just plan. We ship. Every week. Every sprint. Every time."
  }
];

const StatementItem = ({ item, index }: { item: typeof statements[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });
  
  // Alternate between left-aligned and centered (on desktop)
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative min-h-[60vh] flex flex-col justify-center py-24 border-b border-white/5 last:border-0 hairline">
      <div className={`container mx-auto px-6 flex w-full ${isEven ? 'justify-start' : 'md:justify-center justify-start'}`}>
        <div className={`relative max-w-4xl flex flex-col ${isEven ? 'items-start text-left' : 'md:items-center items-start md:text-center text-left'}`}>
          <div className="relative">
            {/* Number */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-display font-medium text-[clamp(6rem,20vw,18rem)] leading-[0.8] text-surface-elevated opacity-20 select-none"
            >
              {item.num}
            </motion.div>
            
            {/* Keyword overlaid */}
            <div className={`absolute inset-0 flex flex-col justify-center ${isEven ? 'items-start' : 'md:items-center items-start'}`}>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-display font-medium tracking-tight text-foreground uppercase drop-shadow-2xl"
              >
                {item.keyword}
              </motion.h3>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground max-w-xl font-sans mt-6 md:mt-8 z-10 relative"
          >
            {item.desc}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const WhySoleTrust = () => {
  return (
    <section id="about" className="relative w-full bg-inherit text-foreground overflow-hidden py-24">
      {/* Section Label */}
      <div className="container mx-auto px-6 mb-12">
        <p className="text-sm font-semibold tracking-[0.2em] text-foreground/50 uppercase">
          WHY US
        </p>
      </div>
      
      <div className="flex flex-col w-full">
        {statements.map((item, i) => (
          <StatementItem key={item.num} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default WhySoleTrust;
