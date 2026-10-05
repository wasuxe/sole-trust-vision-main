import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Lightbulb, 
  Palette, 
  Share2, 
  Camera, 
  TrendingUp, 
  Code, 
  Cpu, 
  Search, 
  Mic 
} from "lucide-react";

interface ServiceNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: ServiceNode[] = [
  {
    id: "strategy",
    title: "Strategy",
    description: "Market research, positioning, and go-to-market planning",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: "branding",
    title: "Branding",
    description: "Visual identity, brand guidelines, and brand architecture",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    id: "social",
    title: "Social Media",
    description: "Content strategy, community management, and growth",
    icon: <Share2 className="w-5 h-5" />,
  },
  {
    id: "content",
    title: "Content",
    description: "Photography, videography, reels, and creative production",
    icon: <Camera className="w-5 h-5" />,
  },
  {
    id: "performance",
    title: "Performance Marketing",
    description: "Paid ads, lead generation, and conversion funnels",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: "web",
    title: "Web Development",
    description: "Websites, apps, e-commerce, and digital products",
    icon: <Code className="w-5 h-5" />,
  },
  {
    id: "ai",
    title: "AI & Automation",
    description: "AI-powered workflows, automation, and data systems",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: "seo",
    title: "SEO",
    description: "Search optimization, content strategy, and organic growth",
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: "creator",
    title: "Creator / Artist Management",
    description: "Talent management, distribution, and brand deals",
    icon: <Mic className="w-5 h-5" />,
  },
];

const GrowthEcosystem = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate positions for nodes in a circle
  const radius = 220;
  const getPosition = (index: number, total: number) => {
    // Start from top (-90 degrees) and go clockwise
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <section id="services" className="relative w-full py-24 bg-background overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none noise opacity-5" />
      
      <div className="container px-6 mx-auto flex flex-col items-center max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-foreground uppercase"
          >
            ONE PARTNER. <span className="text-transparent bg-clip-text bg-gradient-gold">THE ENTIRE GROWTH SYSTEM.</span>
          </motion.h2>
        </div>

        {/* Desktop Radial Layout */}
        <div 
          ref={containerRef}
          className="relative hidden md:flex items-center justify-center w-full min-h-[600px] max-w-[800px]"
        >
          {/* SVG Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <g transform="translate(400, 300)">
              {services.map((service, index) => {
                const pos = getPosition(index, services.length);
                const isHovered = hoveredNode === service.id;
                
                return (
                  <motion.line
                    key={`line-${service.id}`}
                    x1="0"
                    y1="0"
                    x2={pos.x}
                    y2={pos.y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    animate={{
                      stroke: isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
                      strokeWidth: isHovered ? 2 : 1.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}
            </g>
          </svg>

          {/* Central Node */}
          <div className="absolute z-10 flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute w-32 h-32 rounded-full border border-white/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
            <div className="absolute w-40 h-40 rounded-full border border-white/10 animate-ping opacity-10" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
            
            <motion.div 
              className="relative w-32 h-32 rounded-full bg-surface border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] backdrop-blur-md"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.2)" }}
            >
              <div className="text-center font-display font-bold text-white tracking-wider text-sm">
                YOUR<br/>BRAND
              </div>
            </motion.div>
          </div>

          {/* Surrounding Nodes */}
          {services.map((service, index) => {
            const pos = getPosition(index, services.length);
            const isHovered = hoveredNode === service.id;
            
            return (
              <motion.div
                key={service.id}
                className="absolute z-20 flex flex-col items-center"
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                  x: "-50%",
                  y: "-50%",
                }}
                onHoverStart={() => setHoveredNode(service.id)}
                onHoverEnd={() => setHoveredNode(null)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div 
                  className="relative flex items-center justify-center w-14 h-14 rounded-full bg-surface border border-border cursor-pointer backdrop-blur-sm"
                  animate={{
                    borderColor: isHovered ? "rgba(255,255,255,0.8)" : "var(--border)",
                    boxShadow: isHovered ? "0 0 20px rgba(255,255,255,0.2)" : "none",
                    scale: isHovered ? 1.1 : 1,
                  }}
                >
                  <div className={`text-foreground/70 transition-colors ${isHovered ? 'text-white' : ''}`}>
                    {service.icon}
                  </div>
                </motion.div>
                
                <div className="mt-3 text-center whitespace-nowrap">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80">{service.title}</span>
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-48 p-3 rounded-lg bg-surface border border-white/10 shadow-xl backdrop-blur-md z-30 pointer-events-none"
                    >
                      <p className="text-xs text-foreground/70 text-center leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Vertical List Layout */}
        <div className="w-full flex flex-col gap-3 md:hidden mt-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-28 h-28 rounded-full bg-surface border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="absolute w-full h-full rounded-full border border-white/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
              <div className="text-center font-display font-bold text-white tracking-wider text-xs">
                YOUR<br/>BRAND
              </div>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent mx-auto mb-4" />

          {services.map((service, index) => {
            const isExpanded = expandedMobile === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="w-full rounded-xl bg-surface border border-border overflow-hidden cursor-pointer"
                onClick={() => setExpandedMobile(isExpanded ? null : service.id)}
              >
                <div className="p-4 flex items-center gap-4">
                  <div className={`p-2 rounded-full bg-white/5 border border-white/10 transition-colors ${isExpanded ? 'border-white/40 text-white' : 'text-foreground/70'}`}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-sm uppercase tracking-wide flex-1">{service.title}</h3>
                  <div className="w-5 h-5 flex items-center justify-center text-white/30">
                    <motion.div 
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      className="w-3 h-px bg-current absolute"
                    />
                    <motion.div 
                      animate={{ rotate: isExpanded ? 45 : 90 }}
                      className="w-3 h-px bg-current absolute"
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 text-sm text-foreground/70 pl-14">
                        {service.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GrowthEcosystem;
