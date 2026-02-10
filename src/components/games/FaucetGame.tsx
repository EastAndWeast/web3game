'use client';

import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useUserStore } from '@/store/useProgress';
import { motion } from 'framer-motion';
import { Droplets, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';

export function FaucetGame({ onComplete }: { onComplete: () => void }) {
    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    const [isClaiming, setIsClaiming] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const completeLevel = useUserStore((state) => state.completeLevel);
    const t = useTranslations('Game');
    const tSpecific = useTranslations('FaucetGame');

    useEffect(() => {
        if (balance && balance.value > 0n && !isCompleted) {
            handleCompletion();
        }
    }, [balance, isCompleted]);

    const handleCompletion = () => {
        setIsCompleted(true);
        completeLevel('faucet');
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F0FF', '#7000FF']
        });
        setTimeout(onComplete, 3000);
    };

    const handleClaim = () => {
        setIsClaiming(true);
        // Simulate faucet claim interaction
        setTimeout(() => {
            setIsClaiming(false);
            window.open('https://sepoliafaucet.com/', '_blank');
        }, 1500);
    };

    const mockClaim = () => {
        setIsClaiming(true);
        setTimeout(() => {
            setIsClaiming(false);
            handleCompletion();
        }, 2000);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-6 max-w-lg mx-auto">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <Droplets className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold font-display">{t('missionObjective')}</h3>
                <p className="text-slate-400">
                    {tSpecific('description')}
                </p>
            </div>

            <div className="w-full card-glass p-6 rounded-xl flex flex-col gap-4 items-center">
                <div className="text-sm text-slate-400 font-mono uppercase tracking-wider">{tSpecific('currentBalance')}</div>
                <div className="text-3xl font-bold font-display text-white">
                    {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <button
                    onClick={handleClaim}
                    disabled={isClaiming || isCompleted}
                    className="btn-neon w-full flex items-center justify-center gap-2"
                >
                    {isClaiming ? tSpecific('checking') : tSpecific('getTokens')}
                    <ArrowRight className="w-4 h-4" />
                </button>

                {(!balance || balance.value === 0n) && (
                    <button
                        onClick={mockClaim}
                        className="text-xs text-slate-500 hover:text-[#00F0FF] underline decoration-dashed"
                    >
                        {tSpecific('mockClaim')}
                    </button>
                )}
            </div>

            {isCompleted && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[#00F0FF] font-bold font-display"
                >
                    {t('missionCompleted')}
                </motion.div>
            )}
        </div>
    );
}
