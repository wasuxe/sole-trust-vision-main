import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Mail } from 'lucide-react';
import stmLogo from '@/assets/soletrust-media-logo.png';

const NAV_LINKS = [
  { name: 'WORK', href: '#work' },
  { name: 'SERVICES', href: '#services' },
  { name: 'PROCESS', href: '#process' },
  { name: 'ABOUT', href: '#about' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogoClick = useCallback(() => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 1000); // Effect duration
        return 0; // Reset
      }
      return newCount;
    });

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 3000);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-6'
        }`}
      >
        <div 
          className={`mx-auto flex items-center justify-between px-6 transition-all duration-500 ${
            isScrolled 
              ? 'max-w-7xl glass rounded-full py-3 shadow-lg border border-white/10' 
              : 'max-w-screen-2xl py-0'
          }`}
        >
          {/* Logo */}
          <a href="#top" onClick={handleLogoClick} className="relative z-50 flex items-center outline-none">
            <motion.img 
              src={stmLogo} 
              alt="Sole Trust Media"
              className="h-16 w-16 rounded-full object-cover"
              animate={showEasterEgg ? { 
                scale: [1, 1.2, 0.9, 1.1, 1],
                filter: [
                  'drop-shadow(0 0 0px rgba(212,175,55,0))', 
                  'drop-shadow(0 0 20px rgba(212,175,55,0.8))', 
                  'drop-shadow(0 0 0px rgba(212,175,55,0))'
                ]
              } : {}}
              transition={{ duration: 0.6 }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-50">
            <a 
              href="https://cal.com/sole-trust-5klivz/demo-meet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center h-10 px-6 text-sm font-medium rounded-full bg-gradient-gold text-primary-foreground hover:opacity-90 transition-opacity uppercase tracking-wider"
            >
              START A PROJECT
            </a>
            <button 
              className="md:hidden p-2 text-foreground outline-none cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col pt-32 px-6 pb-12"
          >
            <nav className="flex flex-col gap-8 items-center flex-1 justify-center">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="text-4xl font-medium tracking-wide text-foreground hover:text-muted-foreground transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-col items-center gap-8 mt-12"
            >
              <a 
                href="https://cal.com/sole-trust-5klivz/demo-meet" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center justify-center h-14 px-8 text-lg font-medium rounded-full bg-gradient-gold text-primary-foreground w-full max-w-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                START A PROJECT
              </a>
              <div className="flex gap-6">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2" aria-label="Email">
                  <Mail size={24} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
