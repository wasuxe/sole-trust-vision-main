import { motion } from "motion/react";
import React from "react";
import { Sparkles, Users, BarChart3, GitBranch, Search, Cpu, Plus, Equal } from "lucide-react";

const capabilities = [
  { 
    title: "AI-Assisted Content Ideation", 
    description: "Scale your content strategy with data-driven concepts.", 
    icon: Sparkles 
  },
  { 
    title: "Lead Qualification", 
    description: "Intelligently score and segment prospects automatically.", 
    icon: Users 
  },
  { 
    title: "Automated Reporting", 
    description: "Real-time insights and performance metrics without manual effort.", 
    icon: BarChart3 
  },
  { 
    title: "Customer Workflows", 
    description: "Dynamic nurture sequences that adapt to user behavior.", 
    icon: GitBranch 
  },
  { 
    title: "Content Analysis", 
    description: "Extract winning patterns from top-performing market assets.", 
    icon: Search 
  },
  { 
    title: "Marketing Automation", 
    description: "Connect systems to reduce friction and accelerate growth.", 
    icon: Cpu 
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const equationVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const termVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
};

export default function AiSection() {
  return (
    <section className="py-24 md:py-32 relative border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight uppercase">
            We don't just use AI. <br className="hidden md:block"/> We build systems with it.
          </h2>
        </motion.div>

        {/* Visual Equation */}
        <div className="flex flex-col items-center justify-center mb-24 w-full">
          <motion.div 
            variants={equationVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 flex-wrap w-full max-w-5xl"
          >
            {["AI", "DATA", "AUTOMATION", "CREATIVE"].map((term, index, arr) => (
              <React.Fragment key={term}>
                <motion.div variants={termVariants} className="rounded-2xl border border-border bg-surface p-6 md:p-8 flex items-center justify-center min-w-[140px] shadow-lg">
                  <span className="font-display font-bold text-xl md:text-2xl text-foreground">{term}</span>
                </motion.div>
                {index < arr.length - 1 && (
                  <motion.div variants={termVariants}>
                    <Plus className="text-gold/60 w-6 h-6 md:w-8 md:h-8" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
            
            <motion.div variants={termVariants} className="my-4 md:my-0 md:ml-4 md:mr-2">
              <Equal className="text-gold w-8 h-8 md:w-10 md:h-10" />
            </motion.div>

            <motion.div 
              variants={termVariants} 
              className="rounded-2xl border border-gold/30 bg-gradient-gold p-6 md:p-10 flex items-center justify-center relative overflow-hidden group shadow-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="font-display font-bold text-3xl md:text-4xl text-primary-foreground">
                GROWTH
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Capabilities Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {capabilities.map((cap, i) => (
            <motion.div key={i} variants={itemVariants} className="group p-6 rounded-2xl border border-border/70 bg-surface/70 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-gold/40">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <cap.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">{cap.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground/80 uppercase tracking-widest font-medium">
            We implement AI solutions based on actual client needs and verified capabilities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
