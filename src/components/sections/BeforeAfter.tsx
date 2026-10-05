import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight } from 'lucide-react';

const BeforeAfter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold tracking-tight"
          >
            FROM INVISIBLE TO <span className="text-transparent bg-clip-text bg-gradient-gold shimmer-text">UNMISSABLE.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/70"
          >
            See the transformation when strategy meets execution.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl border border-border overflow-hidden cursor-ew-resize select-none"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* After (Bottom Layer) */}
            <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,transparent_60%)]" />
              
              <div className="absolute top-6 right-6 text-gold/80 font-display font-semibold tracking-widest text-sm z-10">
                AFTER
              </div>
              
              <div className="relative w-full max-w-lg bg-surface/50 border border-gold/30 rounded-2xl p-8 backdrop-blur-md shadow-[0_0_40px_rgba(255,215,0,0.1)]">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-gold shadow-[0_0_20px_rgba(255,215,0,0.3)] flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Premium Brand</h3>
                    <p className="text-gold text-sm mt-1">Industry Leader</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "Consistent identity system",
                    "Strategic content calendar",
                    "Data-driven growth"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-[0_0_10px_rgba(255,215,0,0.1)]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-foreground/90 font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Before (Top Layer) */}
            <div 
              className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-8"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="absolute top-6 left-6 text-foreground/40 font-display font-semibold tracking-widest text-sm z-10">
                BEFORE
              </div>
              
              <div className="w-full max-w-lg bg-surface/20 border border-border/30 rounded-2xl p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-surface-elevated border border-border/30 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-display font-medium text-foreground/40">Generic Brand</h3>
                    <p className="text-foreground/30 text-sm mt-1">Unknown Entity</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "No consistent identity",
                    "Sporadic posting",
                    "No strategy"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-surface-elevated/50 border border-border/20 flex items-center justify-center text-foreground/30">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </div>
                      <span className="text-foreground/40">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] text-background transition-transform hover:scale-110">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
