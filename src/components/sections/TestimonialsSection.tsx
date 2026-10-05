import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "They don't operate like an agency. They operate like a growth partner embedded in our team.",
    name: "Client Testimonial",
    role: "Brand Partner",
    company: "PARTNER"
  },
  {
    quote: "We've worked with agencies before. None delivered this combination of strategy, design, and execution.",
    name: "Client Testimonial",
    role: "Brand Partner",
    company: "PARTNER"
  },
  {
    quote: "The level of creative quality and strategic thinking exceeded everything we expected.",
    name: "Client Testimonial",
    role: "Brand Partner",
    company: "PARTNER"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-32 relative bg-background overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface border border-border/50 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs font-medium tracking-widest text-gold uppercase">What They Say</span>
          </div>
        </div>

        <div className="flex flex-col">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="py-24 flex flex-col items-center text-center relative max-w-5xl mx-auto w-full"
            >
              <div className="absolute top-12 left-0 md:-left-8 text-8xl text-surface-elevated font-display opacity-50 select-none">
                &ldquo;
              </div>
              <div className="absolute bottom-24 right-0 md:-right-8 text-8xl text-surface-elevated font-display opacity-50 select-none leading-none">
                &rdquo;
              </div>
              <h3 className="text-3xl md:text-5xl font-medium leading-tight tracking-tight text-foreground relative z-10 font-display mb-8">
                {testimonial.quote}
              </h3>
              <div className="flex flex-col items-center space-y-1 relative z-10">
                <span className="text-foreground font-medium uppercase tracking-wide text-sm">{testimonial.name}</span>
                <span className="text-muted-foreground text-xs md:text-sm">
                  {testimonial.role} &bull; <span className="text-gold">{testimonial.company}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xs text-muted-foreground/50 uppercase tracking-widest">
            Note: Testimonials will be updated with verified client feedback.
          </p>
        </div>
      </div>
    </section>
  );
}
