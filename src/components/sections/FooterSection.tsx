import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Link } from '@tanstack/react-router';
import { Instagram, Mail } from 'lucide-react';
import stmLogo from '@/assets/soletrust-media-logo.png.asset.json';

// --- Particle Background ---
const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = 30; // Lightweight
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      
      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />;
};

// --- Magnetic Button ---
const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Attract towards cursor
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="go"
      className="inline-block bg-gradient-gold text-primary-foreground font-medium rounded-full px-10 py-5 text-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-shadow duration-300 relative z-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

// --- Footer Section ---
const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const title = "READY TO BUILD SOMETHING PEOPLE REMEMBER?".split(" ");

  return (
    <footer id="contact" className="relative border-t border-border bg-surface/20 pt-32 pb-8 overflow-hidden">
      <Particles />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top CTA Area */}
        <div className="flex flex-col items-center text-center mb-32">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-12 max-w-5xl flex flex-wrap justify-center gap-x-4 gap-y-2 font-display">
            {title.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <MagneticButton href="https://cal.com/sole-trust-5klivz/demo-meet">
              START A PROJECT &rarr;
            </MagneticButton>
          </motion.div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Left Column */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link to="/" className="mb-6 inline-block">
              <img src={stmLogo.url} alt="Sole Trust Media" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-xl text-foreground/90 font-medium mb-8 max-w-sm">
              Building Brands. Empowering Creators. Driving Growth.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/soletrustmedia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground/80 hover:text-white hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:soletrustmedia@gmail.com" 
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground/80 hover:text-white hover:border-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Right Columns */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8">
            {/* Company */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-semibold">Company</h3>
              <ul className="flex flex-col gap-4">
                <li><Link to="/services" className="text-foreground/90 hover:text-white transition">Services</Link></li>
                <li><Link to="/projects" className="text-foreground/90 hover:text-white transition">Projects</Link></li>
                <li><Link to="/stm-music-group" className="text-foreground/90 hover:text-white transition">STM Music Group</Link></li>
                <li><Link to="/careers" className="text-foreground/90 hover:text-white transition">Careers</Link></li>
                <li><Link to="/contact" className="text-foreground/90 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-semibold">Connect</h3>
              <ul className="flex flex-col gap-4">
                <li><a href="https://instagram.com/soletrustmedia" target="_blank" rel="noopener noreferrer" className="text-foreground/90 hover:text-white transition">Instagram</a></li>
                <li><a href="mailto:soletrustmedia@gmail.com" className="text-foreground/90 hover:text-white transition">Email</a></li>
                <li><Link to="/privacy" className="text-foreground/90 hover:text-white transition">Privacy</Link></li>
                <li><Link to="/terms" className="text-foreground/90 hover:text-white transition">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border hairline flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Sole Trust Media. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-foreground transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
