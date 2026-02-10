'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUserStore } from '@/store/useProgress';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';

export function WalletConnectGame({ onComplete }: { onComplete: () => void }) {
    const { isConnected } = useAccount();
    const [isCompleted, setIsCompleted] = useState(false);
    const completeLevel = useUserStore((state) => state.completeLevel);
    const t = useTranslations('Game');
    const tSpecific = useTranslations('WalletConnectGame');

    useEffect(() => {
        if (isConnected && !isCompleted) {
            setIsCompleted(true);
            completeLevel('intro');

            const count = 200;
            const defaults = {
                origin: { y: 0.7 }
            };

            function fire(particleRatio: number, opts: any) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            }

            fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00F0FF', '#7000FF'] });
            fire(0.2, { spread: 60, colors: ['#00F0FF', '#FFFFFF'] });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FF003C', '#7000FF'] });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });

            setTimeout(onComplete, 3000);
        }
    }, [isConnected, isCompleted, completeLevel, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center gap-10 py-6">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold font-display">{t('missionObjective')}</h3>
                <p className="text-slate-400">
                    {tSpecific('description')}
                </p>
            </div>

            <div className="p-10 bg-black/20 rounded-2xl border border-white/5 shadow-inner">
                <ConnectButton showBalance={false} />
            </div>

            {isCompleted && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center text-[#00F0FF] gap-2 p-4 bg-[#00F0FF]/10 rounded-xl border border-[#00F0FF]/30"
                >
                    <div className="flex items-center gap-2 text-xl font-bold font-display">
                        <CheckCircle className="w-6 h-6" />
                        <span>{t('missionCompleted')}</span>
                    </div>
                    <span className="text-xs font-mono text-[#00F0FF]/70">{t('redirecting')}</span>
                </motion.div>
            )}
        </div>
    );
}
