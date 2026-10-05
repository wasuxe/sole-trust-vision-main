import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useCursor } from './CursorContext';

const CustomCursor = () => {
  const { cursorType, setCursorType } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfigDot = { damping: 25, stiffness: 400, mass: 0.2 };
  const springConfigRing = { damping: 30, stiffness: 200, mass: 0.5 };

  const dotX = useSpring(cursorX, springConfigDot);
  const dotY = useSpring(cursorY, springConfigDot);

  const ringX = useSpring(cursorX, springConfigRing);
  const ringY = useSpring(cursorY, springConfigRing);

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia('(pointer: coarse)').matches;
      
    setIsTouch(isTouchDevice);

    if (isTouchDevice) return;

    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const cursorElement = target.closest('[data-cursor]');
      const clickableElement = target.closest('a, button, input, select, textarea');

      if (cursorElement) {
        const type = cursorElement.getAttribute('data-cursor');
        if (type) {
          setCursorType(type);
        } else {
          setCursorType('hover');
        }
      } else if (clickableElement) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initial visibility
    setIsVisible(true);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, setCursorType]);

  if (isTouch) return null;

  const isHovering = cursorType !== 'default';
  
  // Custom text for data-cursor attributes
  let cursorText = '';
  if (cursorType === 'view') cursorText = 'VIEW';
  else if (cursorType === 'explore') cursorText = 'EXPLORE';
  else if (cursorType === 'go') cursorText = "LET'S GO";

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ mixBlendMode: 'difference' }}
    >
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Outer Ring */}
            <motion.div
              className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white bg-transparent"
              style={{
                x: ringX,
                y: ringY,
                translateX: '-50%',
                translateY: '-50%',
              }}
              animate={{
                width: isHovering ? (cursorText ? 72 : 60) : 40,
                height: isHovering ? (cursorText ? 72 : 60) : 40,
                backgroundColor: cursorText ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <AnimatePresence mode="wait">
                {cursorText && (
                  <motion.span
                    key={cursorText}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-[9px] font-bold tracking-[0.2em] text-black"
                  >
                    {cursorText}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Inner Dot */}
            <motion.div
              className="absolute left-0 top-0 rounded-full bg-white"
              style={{
                x: dotX,
                y: dotY,
                translateX: '-50%',
                translateY: '-50%',
              }}
              animate={{
                width: isHovering ? 4 : 8,
                height: isHovering ? 4 : 8,
                opacity: cursorText ? 0 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
