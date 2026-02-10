'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface GameLayoutProps {
    title: string;
    description: string;
    children: ReactNode;
    onComplete?: () => void;
}

export function GameLayout({ title, description, children }: GameLayoutProps) {
    const t = useTranslations('Game');
    const locale = useLocale();
    return (
        <div className="min-h-screen flex flex-col items-center p-8 font-sans">
            <header className="w-full max-w-4xl flex items-center mb-8">
                <Link href={`/${locale}`} className="flex items-center text-slate-400 hover:text-[#00F0FF] transition-colors group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono uppercase text-sm">{t('returnToMap')}</span>
                </Link>
            </header>

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl card-glass rounded-2xl p-8 sm:p-12 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F0FF] to-[#7000FF]"></div>

                <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                    {title}
                </h1>
                <p className="text-slate-300 mb-10 text-lg font-light border-l-2 border-[#00F0FF]/30 pl-4">
                    {description}
                </p>

                <div className="game-content relative z-10">
                    {children}
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-4 right-4 text-[10px] text-slate-700 font-mono">
                    SECURE_CONNECTION_ESTABLISHED
                </div>
            </motion.main>
        </div>
    );
}
