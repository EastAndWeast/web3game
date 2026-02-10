'use client';

import { motion } from 'framer-motion';
import { Level } from '@/constants/mapData';
import { cn } from '@/lib/utils';

interface LearningMapProps {
    levels: Level[];
    onLevelClick: (level: Level) => void;
}

export function LearningMap({ levels, onLevelClick }: LearningMapProps) {
    return (
        <div className="relative w-full h-[600px] bg-[#050510]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 shadow-2xl touch-none ring-1 ring-white/5">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

            {/* Paths */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full filter drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
                {levels.map((level, index) => {
                    if (index === 0) return null;
                    const prev = levels[index - 1];
                    return (
                        <motion.line
                            key={`path-${index}`}
                            x1={`${prev.x}%`}
                            y1={`${prev.y}%`}
                            x2={`${level.x}%`}
                            y2={`${level.y}%`}
                            stroke={level.status !== 'locked' ? '#00F0FF' : 'rgba(71, 85, 105, 0.4)'}
                            strokeWidth={level.status !== 'locked' ? "3" : "2"}
                            strokeDasharray={level.status === 'locked' ? "5,5" : "none"}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: index * 0.5 }}
                        />
                    );
                })}
            </svg>

            {/* Nodes */}
            {levels.map((level, index) => (
                <motion.div
                    key={level.id}
                    className={cn(
                        "absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center border-2 cursor-pointer transition-all duration-300 group z-10 font-display",
                        level.status === 'completed' && "bg-[#050510] border-[#00F0FF] shadow-[0_0_15px_#00F0FF] text-[#00F0FF]",
                        level.status === 'active' && "bg-[#050510] border-[#FF003C] shadow-[0_0_20px_#FF003C] animate-pulse text-[#FF003C]",
                        level.status === 'locked' && "bg-[#050510]/80 border-slate-700 text-slate-600 cursor-not-allowed grayscale"
                    )}
                    style={{ left: `${level.x}%`, top: `${level.y}%` }}
                    onClick={() => level.status !== 'locked' && onLevelClick(level)}
                    whileHover={level.status !== 'locked' ? { scale: 1.2 } : {}}
                >
                    <span className="text-sm font-bold">
                        {level.status === 'completed' ? '✓' : (index + 1)}
                    </span>

                    {/* Tooltip */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-56 card-glass text-white text-xs p-4 rounded-xl text-center pointer-events-none whitespace-normal z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 backdrop-blur-md">
                        <div className="font-bold mb-1 text-sm text-[#00F0FF] font-display uppercase tracking-wider">{level.title}</div>
                        <div className="text-slate-300 leading-relaxed font-sans">{level.description}</div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white/10"></div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
