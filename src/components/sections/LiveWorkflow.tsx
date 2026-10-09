import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { 
  FileText, Users, Target, Image, Palette, 
  Share2, Megaphone, BarChart3, Settings, TrendingUp 
} from 'lucide-react';

const STAGES = [
  {
    id: 1,
    title: 'BRAND BRIEF',
    icon: FileText,
    description: 'We start by understanding your brand, audience, goals, and competitive landscape.',
    visual: 'typing'
  },
  {
    id: 2,
    title: 'AUDIENCE RESEARCH',
    icon: Users,
    description: 'Deep dive into audience demographics, behaviors, and platform preferences.',
    visual: 'clusters'
  },
  {
    id: 3,
    title: 'STRATEGY',
    icon: Target,
    description: 'Build a data-driven strategy with clear KPIs, timelines, and content pillars.',
    visual: 'nodes'
  },
  {
    id: 4,
    title: 'CONTENT',
    icon: Image,
    description: 'Create high-quality content tailored to each platform and audience segment.',
    visual: 'cards'
  },
  {
    id: 5,
    title: 'CREATIVE',
    icon: Palette,
    description: 'Design visuals, motion graphics, and brand assets that stand out.',
    visual: 'swatches'
  },
  {
    id: 6,
    title: 'DISTRIBUTION',
    icon: Share2,
    description: 'Deploy content across channels with optimal timing and targeting.',
    visual: 'branches'
  },
  {
    id: 7,
    title: 'ADS',
    icon: Megaphone,
    description: 'Launch and manage paid campaigns with continuous testing and optimization.',
    visual: 'bars'
  },
  {
    id: 8,
    title: 'ANALYTICS',
    icon: BarChart3,
    description: 'Track performance metrics, engagement patterns, and conversion data.',
    visual: 'line'
  },
  {
    id: 9,
    title: 'OPTIMIZATION',
    icon: Settings,
    description: 'Refine strategies based on real data to maximize ROI.',
    visual: 'gear'
  },
  {
    id: 10,
    title: 'GROWTH',
    icon: TrendingUp,
    description: 'Scale what works. Build systems that compound results over time.',
    visual: 'arrow'
  }
];

const MiniVisual = ({ type }: { type: string }) => {
  switch (type) {
    case 'typing':
      return (
        <div className="flex flex-col gap-2 w-full h-full justify-center p-3">
          <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ duration: 1.5, repeat: Infinity }} className="h-1 bg-white/50 rounded" />
          <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} className="h-1 bg-white/30 rounded" />
          <motion.div initial={{ width: 0 }} animate={{ width: "90%" }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} className="h-1 bg-white/40 rounded" />
        </div>
      );
    case 'clusters':
      return (
        <div className="flex items-center justify-center gap-2 w-full h-full relative">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 rounded-full bg-white/60 absolute top-4 left-6" />
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2.2, delay: 0.3, repeat: Infinity }} className="w-5 h-5 rounded-full bg-white/40 absolute top-8 right-6" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.8, delay: 0.6, repeat: Infinity }} className="w-3 h-3 rounded-full bg-white/50 absolute bottom-4 left-10" />
        </div>
      );
    case 'nodes':
      return (
        <div className="w-full h-full relative p-2">
          <svg className="w-full h-full absolute inset-0">
            <motion.line x1="30" y1="20" x2="80" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.line x1="80" y1="40" x2="50" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
          </svg>
          <div className="w-2 h-2 rounded-full bg-white absolute top-4 left-6" />
          <div className="w-2 h-2 rounded-full bg-white absolute top-9 left-[76px]" />
          <div className="w-2 h-2 rounded-full bg-white absolute top-[56px] left-[46px]" />
        </div>
      );
    case 'cards':
      return (
        <div className="flex items-center justify-center w-full h-full relative" style={{ perspective: '1000px' }}>
          <motion.div animate={{ y: [0, -5, 0], rotateZ: [-5, -2, -5] }} transition={{ duration: 3, repeat: Infinity }} className="w-16 h-10 border border-white/20 bg-black/40 rounded absolute" />
          <motion.div animate={{ y: [0, 5, 0], rotateZ: [5, 2, 5] }} transition={{ duration: 3, delay: 0.2, repeat: Infinity }} className="w-16 h-10 border border-white/40 bg-black/60 rounded absolute" />
        </div>
      );
    case 'swatches':
      return (
        <div className="flex gap-2 items-center justify-center w-full h-full">
          <motion.div animate={{ height: [20, 30, 20] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 bg-white/20 rounded" />
          <motion.div animate={{ height: [30, 40, 30] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} className="w-4 bg-white/40 rounded" />
          <motion.div animate={{ height: [25, 35, 25] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} className="w-4 bg-white/60 rounded" />
        </div>
      );
    case 'branches':
      return (
        <div className="flex items-center justify-center w-full h-full p-2 relative">
          <svg className="w-full h-full">
            <motion.path d="M20,40 Q50,40 50,20 T80,20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            <motion.path d="M20,40 Q50,40 50,60 T80,60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="5,5" animate={{ strokeDashoffset: [20, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
          </svg>
        </div>
      );
    case 'bars':
      return (
        <div className="flex gap-2 items-end justify-center w-full h-full pb-3">
          <motion.div animate={{ height: ["20%", "60%", "20%"] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-3 bg-white/30 rounded-t" />
          <motion.div animate={{ height: ["40%", "80%", "40%"] }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} className="w-3 bg-white/50 rounded-t" />
          <motion.div animate={{ height: ["60%", "100%", "60%"] }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} className="w-3 bg-white/80 rounded-t" />
        </div>
      );
    case 'line':
      return (
        <div className="flex items-center justify-center w-full h-full relative">
          <svg className="w-full h-full" viewBox="0 0 100 80">
            <motion.path d="M10,60 L30,40 L50,50 L70,20 L90,30" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>
      );
    case 'gear':
      return (
        <div className="flex items-center justify-center w-full h-full">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <Settings className="w-8 h-8 text-white/50" />
          </motion.div>
        </div>
      );
    case 'arrow':
      return (
        <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
          <motion.div animate={{ x: [-15, 15], y: [15, -15], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <TrendingUp className="w-8 h-8 text-white/80" />
          </motion.div>
        </div>
      );
    default:
      return null;
  }
};

const StageItem = ({ stage, index, expandedId, setExpandedId }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const isExpanded = expandedId === stage.id;
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`relative flex w-full my-8 md:my-16 flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="hidden md:block md:w-1/2" />
      
      <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:pl-16' : 'md:pr-16 md:items-end'} pl-16`}>
        <motion.div 
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`flex flex-col gap-4 w-full max-w-md cursor-pointer group`}
          onClick={() => setExpandedId(isExpanded ? null : stage.id)}
        >
          <div className={`flex items-center gap-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shrink-0">
              <stage.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display text-xl md:text-2xl tracking-wide font-bold">{stage.title}</h3>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
            <div className="w-[120px] h-[80px] bg-black/40 border border-white/10 rounded-lg overflow-hidden shrink-0">
              <MiniVisual type={stage.visual} />
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <p className={`text-muted-foreground text-sm font-sans mt-2 ${!isEven ? 'md:text-right' : ''}`}>
                    {stage.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute left-[29px] md:left-1/2 top-4 md:top-1/2 w-4 h-4 rounded-full border-[3px] border-white/40 bg-black -translate-x-1/2 -translate-y-1/2 z-10 transition-colors duration-500"
        animate={isInView ? { backgroundColor: "#fff", borderColor: "#fff" } : {}}
      />
    </div>
  );
};

export default function LiveWorkflow() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-background py-32 overflow-hidden" ref={containerRef}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-balance"
          >
            WATCH A CAMPAIGN COME TO LIFE.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-6 max-w-2xl font-sans text-lg text-balance"
          >
            A visual walkthrough of how we take brands from brief to growth.
          </motion.p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto">
          {/* Vertical Line Background */}
          <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
          
          {/* Animated Vertical Line */}
          <motion.div 
            className="absolute left-[29px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-white via-white/50 to-transparent -translate-x-1/2 origin-top z-0"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col w-full relative z-10">
            {STAGES.map((stage, i) => (
              <StageItem 
                key={stage.id}
                stage={stage}
                index={i}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
              />
            ))}
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground/70 text-sm mt-32 uppercase tracking-widest font-sans"
        >
          This visualization demonstrates our agency process workflow.
        </motion.p>
      </div>
    </section>
  );
}
