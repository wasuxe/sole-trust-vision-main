import React, { useEffect, useRef, useState, type ComponentType } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const numParticles = isMobile ? 80 : 200;
    
    const mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist2 / 100)})`;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60 pointer-events-none" />;
};

const MagneticButton = ({ children, className, href, dataCursor }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const hx = e.clientX - rect.left - rect.width / 2;
    const hy = e.clientY - rect.top - rect.height / 2;
    x.set(hx * 0.3);
    y.set(hy * 0.3);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      data-cursor={dataCursor}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-flex items-center justify-center transition-all ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

const stages = ['ATTENTION', 'ENGAGEMENT', 'CONVERSION', 'GROWTH'];

const PipelineSteps = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm font-semibold tracking-wider">
      {stages.map((stage, i) => (
        <React.Fragment key={stage}>
          <motion.span
            initial={{ opacity: 0.4, color: 'var(--muted-foreground)' }}
            animate={{ opacity: 1, color: '#ffffff' }}
            transition={{ delay: i * 0.5 + 1, duration: 0.8 }}
          >
            {stage}
          </motion.span>
          {i < stages.length - 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: i * 0.5 + 1.2 }}
            >
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const [HeroSphereCanvas, setHeroSphereCanvas] = useState<ComponentType | null>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let active = true;
    void import('./HeroSphere')
      .then(({ default: Sphere }) => {
        if (active) setHeroSphereCanvas(() => Sphere);
      })
      .catch((error: unknown) => {
        console.error('Unable to load the interactive hero visual.', error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="top" className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#27231e] text-white">
      {/* 3D Canvas Network Background */}
      <ParticleNetwork />
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-35 md:opacity-55" aria-hidden="true">
        {HeroSphereCanvas ? (
          <HeroSphereCanvas />
        ) : (
          <div className="hero-orb-fallback absolute left-1/2 top-1/2 h-[min(80vw,46rem)] w-[min(80vw,46rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        )}
      </div>
      
      {/* Noise overlay */}
      <div className="noise absolute inset-0 z-[1] opacity-30 pointer-events-none" />

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs sm:text-sm font-medium tracking-wide uppercase"
        >
          Building Brands • Empowering Creators • Driving Growth
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-[clamp(3.5rem,12vw,11rem)] font-medium leading-[0.9] tracking-[-0.04em] uppercase mb-6 flex flex-col items-center"
        >
          <span>WE ENGINEER</span>
          <span className="text-gradient-gold italic font-light">ATTENTION.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-[var(--muted-foreground)] mb-12 max-w-3xl"
        >
          Branding. Content. Marketing. Technology. Growth.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <PipelineSteps />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton 
            href="https://cal.com/sole-trust-5klivz/demo-meet" 
            dataCursor="go"
            className="bg-gradient-gold text-[var(--primary-foreground)] rounded-full px-8 py-4 font-semibold uppercase tracking-wide shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
          >
            START A PROJECT
          </MagneticButton>
          
          <MagneticButton 
            href="#work" 
            dataCursor="explore"
            className="rounded-full px-8 py-4 font-semibold uppercase tracking-wide border border-white/20 hover:bg-white/5 backdrop-blur-sm"
          >
            EXPLORE OUR WORK
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/50">
          SCROLL TO EXPERIENCE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
