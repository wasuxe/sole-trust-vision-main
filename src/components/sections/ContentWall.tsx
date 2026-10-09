import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from '@tanstack/react-router';
import { Instagram, Globe, Youtube, PenTool, Layout, MonitorPlay, Camera, X } from 'lucide-react';

const CATEGORIES = ['ALL', 'BRANDING', 'SOCIAL', 'ADS', 'WEB', 'VIDEO', 'CREATIVE'] as const;
type Category = typeof CATEGORIES[number];

interface ContentItem {
  id: number;
  title: string;
  category: Category;
  gradient: string;
  icon: React.ElementType;
  colSpan?: number;
  rowSpan?: number;
  description: string;
}

const CONTENT_ITEMS: ContentItem[] = [
  { id: 1, title: 'Brand Identity System', category: 'BRANDING', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)', icon: PenTool, colSpan: 2, rowSpan: 2, description: 'Complete brand overhaul including logo, typography, and visual guidelines.' },
  { id: 2, title: 'Social Campaign', category: 'SOCIAL', gradient: 'linear-gradient(135deg, #0f0f23, #1a0a2e)', icon: Instagram, description: 'Viral social media campaign reaching 2M+ users.' },
  { id: 3, title: 'Performance Ad Creative', category: 'ADS', gradient: 'linear-gradient(135deg, #1a1a1a, #2d1b1b)', icon: Layout, rowSpan: 2, description: 'High-converting ad creatives for Meta and TikTok.' },
  { id: 4, title: 'Website Redesign', category: 'WEB', gradient: 'linear-gradient(135deg, #0a1628, #1a2a3a)', icon: Globe, colSpan: 2, description: 'Modern web experience built with React and Tailwind.' },
  { id: 5, title: 'Reel Production', category: 'VIDEO', gradient: 'linear-gradient(135deg, #1a0a1e, #2a1a2e)', icon: Youtube, rowSpan: 2, description: 'Short-form video content optimized for engagement.' },
  { id: 6, title: 'Product Photography', category: 'CREATIVE', gradient: 'linear-gradient(135deg, #1a1a0a, #2a2a1a)', icon: Camera, colSpan: 2, description: 'Studio product photography for e-commerce.' },
  { id: 7, title: 'Instagram Story Design', category: 'SOCIAL', gradient: 'linear-gradient(135deg, #0f1a2e, #1a2a3e)', icon: Instagram, description: 'Interactive story templates for daily brand updates.' },
  { id: 8, title: 'Logo Design', category: 'BRANDING', gradient: 'linear-gradient(135deg, #1a1a2e, #0a1a2e)', icon: PenTool, description: 'Minimalist logo design for a tech startup.' },
  { id: 9, title: 'Google Ads Campaign', category: 'ADS', gradient: 'linear-gradient(135deg, #1a0a0a, #2a1a1a)', icon: Layout, colSpan: 2, description: 'Search and display network ad creatives.' },
  { id: 10, title: 'E-commerce Store', category: 'WEB', gradient: 'linear-gradient(135deg, #0a1a1a, #1a2a2a)', icon: Globe, description: 'Full-stack e-commerce solution with custom CMS.' },
  { id: 11, title: 'Motion Graphics', category: 'VIDEO', gradient: 'linear-gradient(135deg, #1a0a2e, #2a1a3e)', icon: MonitorPlay, colSpan: 2, rowSpan: 2, description: 'Animated explainer videos for SaaS products.' },
  { id: 12, title: 'UGC Content', category: 'CREATIVE', gradient: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', icon: Camera, description: 'Authentic user-generated content for social proof.' },
];

export default function ContentWall() {
  const [activeTab, setActiveTab] = useState<Category>('ALL');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const filteredItems = CONTENT_ITEMS.filter(
    (item) => activeTab === 'ALL' || item.category === activeTab
  );

  return (
    <section id="work" className="py-24 px-4 md:px-8 bg-transparent min-h-screen relative overflow-hidden text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-center uppercase mb-4"
        >
          Our Content Universe
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl font-sans"
        >
          A glimpse into the creative work we produce across platforms.
        </motion.p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`text-xs tracking-widest uppercase font-medium px-4 py-2 relative transition-colors ${
              activeTab === cat ? 'text-gold' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat}
            {activeTab === cat && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute left-0 bottom-0 w-full h-[1px] bg-gold"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem(item)}
                data-cursor="explore"
                className="relative group rounded-2xl overflow-hidden cursor-pointer border border-white/5 shadow-lg"
                style={{
                  gridColumn: item.colSpan ? `span ${item.colSpan}` : 'span 1',
                  gridRow: item.rowSpan ? `span ${item.rowSpan}` : 'span 1',
                  background: item.gradient
                }}
              >
                {/* Default state */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 transition-opacity duration-300">
                  <div className="self-end bg-white/10 backdrop-blur-md p-2 rounded-full">
                    <item.icon className="w-5 h-5 text-white/80" />
                  </div>
                </div>

                {/* Hover overlay dims slightly */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Hover content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                  <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <span className="text-xs tracking-widest text-white/60 mb-2 block">{item.category}</span>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-colors duration-300 z-30 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground/80 backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
          >
            Explore selected projects
          </Link>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10"
              style={{ background: selectedItem.gradient }}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors backdrop-blur-md cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="aspect-video relative p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full w-fit mb-6 inline-flex">
                  <selectedItem.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm tracking-widest text-white/60 mb-2 block">{selectedItem.category}</span>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-lg text-white/80 max-w-xl font-sans">
                  {selectedItem.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
