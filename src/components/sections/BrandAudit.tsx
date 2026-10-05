import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    category: 'Brand',
    text: 'Do you have a consistent brand identity?',
    options: [
      { text: 'Yes', score: 10 },
      { text: 'Partially', score: 7 },
      { text: 'No', score: 4 },
    ],
  },
  {
    id: 2,
    category: 'Content',
    text: 'Are you posting content consistently?',
    options: [
      { text: 'Daily', score: 10 },
      { text: 'Weekly', score: 7 },
      { text: 'Rarely', score: 4 },
      { text: 'Never', score: 1 },
    ],
  },
  {
    id: 3,
    category: 'Content',
    text: 'Are your creatives converting?',
    options: [
      { text: 'Yes', score: 10 },
      { text: 'Sometimes', score: 7 },
      { text: 'Not sure', score: 4 },
      { text: 'No', score: 1 },
    ],
  },
  {
    id: 4,
    category: 'Marketing',
    text: 'Are you running paid campaigns?',
    options: [
      { text: 'Yes, optimized', score: 10 },
      { text: 'Yes, basic', score: 7 },
      { text: 'No', score: 4 },
    ],
  },
  {
    id: 5,
    category: 'Digital',
    text: 'Does your website convert visitors?',
    options: [
      { text: 'Yes', score: 10 },
      { text: 'Could be better', score: 7 },
      { text: 'No', score: 4 },
      { text: "Don't have one", score: 1 },
    ],
  },
  {
    id: 6,
    category: 'Operations',
    text: 'Are you tracking your leads?',
    options: [
      { text: 'Yes, with CRM', score: 10 },
      { text: 'Manually', score: 7 },
      { text: 'No', score: 4 },
    ],
  },
  {
    id: 7,
    category: 'Operations',
    text: 'Are you using automation or AI?',
    options: [
      { text: 'Yes, extensively', score: 10 },
      { text: 'Some', score: 7 },
      { text: 'No', score: 4 },
    ],
  },
  {
    id: 8,
    category: 'Operations',
    text: 'Do you know your best-performing content?',
    options: [
      { text: 'Yes', score: 10 },
      { text: 'Somewhat', score: 7 },
      { text: 'No', score: 4 },
    ],
  },
];

export default function BrandAudit() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  const handleSelect = (score: number) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: score }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    const categoryScores: Record<string, { earned: number; max: number }> = {
      Brand: { earned: 0, max: 0 },
      Content: { earned: 0, max: 0 },
      Marketing: { earned: 0, max: 0 },
      Digital: { earned: 0, max: 0 },
      Operations: { earned: 0, max: 0 },
    };

    QUESTIONS.forEach((q, index) => {
      const score = answers[index] || 0;
      totalScore += score;
      categoryScores[q.category].earned += score;
      categoryScores[q.category].max += 10;
    });

    const percentage = Math.round((totalScore / 80) * 100);
    
    let interpretation = { text: '', color: '' };
    if (percentage >= 80) interpretation = { text: "You're Growth-Ready", color: 'text-green-400 border-green-500/30 bg-green-500/10' };
    else if (percentage >= 60) interpretation = { text: 'Strong Foundation', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' };
    else if (percentage >= 40) interpretation = { text: 'Room to Grow', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' };
    else interpretation = { text: 'Time to Transform', color: 'text-red-400 border-red-500/30 bg-red-500/10' };

    return { percentage, categoryScores, interpretation };
  };

  const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current!.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-medium rounded-full hover:scale-105 transition-transform"
      >
        {children}
      </motion.a>
    );
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center relative overflow-hidden">
      
      {!showResults && (
        <div className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-semibold mb-4 tracking-tight uppercase"
          >
            HOW STRONG IS YOUR BRAND?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground/60 text-lg max-w-2xl mx-auto"
          >
            Take our quick interactive diagnostic to discover your growth readiness.
          </motion.p>
        </div>
      )}

      <div className="relative w-full max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-surface/50 border border-border backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl"
            >
              {/* Progress Bar */}
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-medium text-foreground/40 tracking-widest uppercase">
                    Question {currentStep + 1} of {QUESTIONS.length}
                  </span>
                  <span className="text-4xl md:text-5xl font-display font-bold text-foreground/10 leading-none">
                    0{currentStep + 1}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground"
                    initial={{ width: `${((currentStep) / QUESTIONS.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-2xl md:text-3xl font-medium mb-8 text-foreground font-display">
                {currentQuestion.text}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentStep] === option.score;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelect(option.score)}
                      className={`relative flex items-center justify-between p-6 rounded-2xl border text-left transition-all duration-300 ${
                        isSelected 
                          ? 'border-foreground bg-surface-elevated text-foreground' 
                          : 'border-border bg-surface hover:border-white/30 text-foreground/80 hover:text-foreground'
                      }`}
                    >
                      <span className="text-lg font-medium">{option.text}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-foreground text-background p-1 rounded-full"
                        >
                          <Check size={16} strokeWidth={3} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="flex justify-end h-12">
                <AnimatePresence>
                  {answers[currentStep] !== undefined && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-xl hover:bg-foreground/90 transition-colors"
                    >
                      {currentStep === QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}
                      {currentStep === QUESTIONS.length - 1 ? <ArrowRight size={18} /> : <ChevronRight size={18} />}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-surface/50 border border-border backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col items-center"
            >
              <h2 className="text-2xl font-display font-medium text-foreground/60 mb-8 uppercase tracking-widest">Your Growth Readiness</h2>
              
              {/* Circular Progress */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-border"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-foreground"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * calculateResults().percentage) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <NumberCounter value={calculateResults().percentage} />
                  <span className="text-foreground/40 text-sm mt-1 font-medium">OUT OF 100</span>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`px-6 py-2 rounded-full border mb-12 ${calculateResults().interpretation.color}`}
              >
                <span className="font-semibold">{calculateResults().interpretation.text}</span>
              </motion.div>

              {/* Category Breakdown */}
              <div className="w-full max-w-lg mb-12 space-y-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Diagnostic Breakdown</h3>
                {Object.entries(calculateResults().categoryScores).map(([category, scores], idx) => {
                  const percent = Math.round((scores.earned / scores.max) * 100);
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/80">{category}</span>
                        <span className="text-foreground/60">{percent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-foreground/80"
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <MagneticButton href="https://cal.com/sole-trust-5klivz/demo-meet">
                GET MY GROWTH PLAN <ArrowRight size={18} />
              </MagneticButton>

              <p className="mt-8 text-xs text-foreground/40 text-center max-w-sm">
                *This is an interactive diagnostic tool, not a scientifically validated assessment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Helper component for animated number
function NumberCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-5xl md:text-6xl font-display font-bold text-foreground">
      {displayValue}
    </span>
  );
}
