import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import { 
  TrendingUp, MousePointerClick, Zap, Users, Filter, BarChart3, 
  Instagram, Facebook, Linkedin, Youtube, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

const TABS = ['OVERVIEW', 'SOCIAL', 'CONTENT', 'ADS', 'AUDIENCE', 'CONVERSIONS'];

// Demo Data
const campaignData = Array.from({ length: 30 }).map((_, i) => ({
  day: i + 1,
  reach: Math.floor(50000 + Math.random() * 15000 + i * 2000),
  engagement: Math.floor(8000 + Math.random() * 2000 + i * 400),
}));

const audienceData = Array.from({ length: 7 }).map((_, i) => ({
  name: `W${i + 1}`,
  growth: 1000 + i * 300 + Math.random() * 200,
}));

const contentData = [
  { name: 'Video A', value: 85 },
  { name: 'Carousel B', value: 65 },
  { name: 'Post C', value: 45 },
  { name: 'Reel D', value: 95 },
];

export default function ControlRoom() {
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  // helper for tab content rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case 'OVERVIEW':
        return <OverviewTab />;
      case 'SOCIAL':
        return <SocialTab />;
      case 'CONTENT':
        return <SimpleDashboard tab="CONTENT" metric1="Top Content Reach" val1="1.2M" metric2="Save Rate" val2="8.4%" />;
      case 'ADS':
        return <SimpleDashboard tab="ADS" metric1="Total Spend" val1="$45,200" metric2="Cost per Lead" val2="$12.40" />;
      case 'AUDIENCE':
        return <SimpleDashboard tab="AUDIENCE" metric1="Total Audience" val1="2.4M" metric2="Active Engagers" val2="340K" />;
      case 'CONVERSIONS':
        return <SimpleDashboard tab="CONVERSIONS" metric1="Total Sales" val1="$1.4M" metric2="Conversion Rate" val2="4.2%" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4 text-foreground">
              THIS IS WHAT WE SEE <br/>
              <span className="text-foreground/50">BEHIND THE SCENES.</span>
            </h2>
            <p className="text-foreground/70 text-lg md:text-xl font-sans">
              A demo visualization of a modern marketing command center.
            </p>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-mono text-foreground">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE DEMO DATA
          </div>
        </div>

        {/* Dashboard Container */}
        <div className="rounded-3xl border border-border bg-surface/60 backdrop-blur-xl overflow-hidden shadow-2xl">
          
          {/* Tab Bar */}
          <div className="flex overflow-x-auto border-b border-border no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-4 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeTab === tab ? 'text-foreground' : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Reach" value="847K" trend="+12%" icon={Users} sparkline />
        <MetricCard title="Engagement" value="12.4%" trend="+2.1%" icon={Zap} />
        <MetricCard title="CTR" value="3.2%" trend="-0.4%" icon={MousePointerClick} trendDown />
        <MetricCard title="ROAS" value="4.8x" trend="+1.2x" icon={TrendingUp} highlight />
      </div>

      {/* Middle Row */}
      <div className="rounded-2xl border border-border bg-surface/40 p-6 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all">
        <h3 className="text-sm font-mono text-foreground/50 mb-6">CAMPAIGN PERFORMANCE (30 DAYS)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(255,252,245,0.96)', border: '1px solid rgba(145,111,70,0.25)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--foreground)' }}
              />
              <Line yAxisId="left" type="monotone" dataKey="reach" name="Reach" stroke="var(--gold)" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="engagement" name="Engagement" stroke="var(--foreground)" strokeOpacity={0.45} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-surface/40 p-6 flex flex-col hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all">
          <h3 className="text-sm font-mono text-foreground/50 mb-4">CONTENT PERFORMANCE</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={contentData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
                <Bar dataKey="value" fill="var(--gold)" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/40 p-6 flex flex-col hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all">
          <h3 className="text-sm font-mono text-foreground/50 mb-4">AUDIENCE GROWTH</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={audienceData}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="growth" stroke="var(--gold)" fillOpacity={1} fill="url(#colorGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/40 p-6 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all">
          <h3 className="text-sm font-mono text-foreground/50 mb-4">CONVERSION FUNNEL</h3>
          <div className="space-y-4 mt-6">
            <FunnelStep label="Impressions" value="847K" percentage="100%" />
            <FunnelStep label="Clicks" value="27.1K" percentage="35%" />
            <FunnelStep label="Leads" value="4.2K" percentage="15%" />
            <FunnelStep label="Conversions" value="850" percentage="5%" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialTab() {
  const platforms = [
    { name: 'Instagram', icon: Instagram, followers: '124.5K', er: '4.2%', top: 'Reels' },
    { name: 'LinkedIn', icon: Linkedin, followers: '45.2K', er: '2.8%', top: 'Carousels' },
    { name: 'YouTube', icon: Youtube, followers: '89.1K', er: '5.1%', top: 'Long-form' },
    { name: 'Facebook', icon: Facebook, followers: '210.8K', er: '1.4%', top: 'Video' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {platforms.map((p) => (
        <div key={p.name} className="rounded-2xl border border-border bg-surface/40 p-6 flex flex-col justify-between hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface rounded-lg border border-border">
                <p.icon className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-mono uppercase tracking-wider text-sm">{p.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono tabular-nums font-medium">{p.followers}</div>
              <div className="text-xs text-foreground/50 font-mono">Followers</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-6 mt-2">
            <div>
              <div className="text-xs font-mono text-foreground/50 mb-1">Engagement Rate</div>
              <div className="text-xl font-mono tabular-nums">{p.er}</div>
            </div>
            <div>
              <div className="text-xs font-mono text-foreground/50 mb-1">Top Format</div>
              <div className="text-xl font-mono">{p.top}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SimpleDashboard({ tab, metric1, val1, metric2, val2 }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard title={metric1} value={val1} trend="+5%" icon={BarChart3} />
        <MetricCard title={metric2} value={val2} trend="+12%" icon={Filter} />
      </div>
      
      <div className="rounded-2xl border border-border bg-surface/40 p-6 h-[300px] flex flex-col items-center justify-center relative overflow-hidden hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all">
        <h3 className="text-sm font-mono text-foreground/50 mb-6 absolute top-6 left-6">{tab} TRENDS</h3>
        <div className="w-full h-full opacity-30 mt-10">
           <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={campaignData}>
              <Area type="monotone" dataKey="engagement" stroke="var(--gold)" strokeWidth={2} fillOpacity={0.1} fill="var(--gold)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, sparkline, trendDown, highlight }: any) {
  return (
    <div className={`rounded-2xl border ${highlight ? 'border-foreground/30 bg-foreground/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'border-border bg-surface/40'} p-6 group hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-foreground/50 text-xs font-mono uppercase tracking-wider">{title}</span>
        <Icon className={`w-5 h-5 ${highlight ? 'text-foreground' : 'text-foreground/40'}`} />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-mono tabular-nums font-medium tracking-tight mb-2">{value}</div>
          <div className={`text-xs font-mono flex items-center gap-1 ${trendDown ? 'text-red-400' : 'text-green-400'}`}>
            {trendDown ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
            {trend} vs prev
          </div>
        </div>
        {sparkline && (
          <svg className="w-16 h-8 text-foreground/20" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25C10 25 15 15 25 20C35 25 40 5 50 10C60 15 70 25 80 15C90 5 95 10 100 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

function FunnelStep({ label, value, percentage }: any) {
  return (
    <div className="flex items-center text-sm font-mono">
      <div className="w-28 text-foreground/60">{label}</div>
      <div className="flex-grow px-3">
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-foreground/60 rounded-full" style={{ width: percentage }} />
        </div>
      </div>
      <div className="w-16 text-right tabular-nums text-foreground/80">{value}</div>
    </div>
  );
}
