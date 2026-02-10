'use client';

import { useState, useEffect } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt, useAccount, useBalance } from 'wagmi';
import { parseEther } from 'viem';
import { useUserStore } from '@/store/useProgress';
import { motion } from 'framer-motion';
import { ArrowDown, Loader2, CheckCircle, RefreshCw, Settings2, Wallet } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';

export function SwapGame({ onComplete }: { onComplete: () => void }) {
    const t = useTranslations('Game');
    const tSpecific = useTranslations('SwapGame');
    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    const completeLevel = useUserStore((state) => state.completeLevel);

    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const EXCHANGE_RATE = 1000; // 1 ETH = 1000 W3A

    // Mock DEX Pool Address
    const DEX_ADDRESS = '0x000000000000000000000000000000000000dEaD';

    const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isConfirmed && !isCompleted) {
            handleCompletion();
        }
    }, [isConfirmed, isCompleted]);

    const handleCompletion = () => {
        setIsCompleted(true);
        completeLevel('swap');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F0FF', '#7000FF']
        });
        setTimeout(onComplete, 4000);
    };

    const handleFromChange = (val: string) => {
        setFromAmount(val);
        if (!val) {
            setToAmount('');
            return;
        }
        const num = parseFloat(val);
        if (!isNaN(num)) {
            setToAmount((num * EXCHANGE_RATE).toFixed(2));
        }
    };

    const handleSwap = () => {
        if (!address || !fromAmount) return;

        sendTransaction({
            to: DEX_ADDRESS,
            value: parseEther(fromAmount),
        });
    };

    // Mock function for development
    const mockSwap = () => {
        setIsCompleted(true);
        completeLevel('swap');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F0FF', '#7000FF']
        });
        setTimeout(onComplete, 3000);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-6 max-w-lg mx-auto w-full">
            <div className="text-center space-y-2 mb-4">
                <h3 className="text-xl font-semibold font-display">{t('missionObjective')}</h3>
                <p className="text-slate-400 text-sm">
                    {tSpecific('description')}
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full card-glass p-6 rounded-2xl flex flex-col gap-2 relative border border-white/5 shadow-xl"
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-white">{tSpecific('swapTitle')}</span>
                    <Settings2 className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white" />
                </div>

                {/* FROM INPUT */}
                <div className="bg-[#050510]/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-400 font-mono">From</span>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                            <Wallet className="w-3 h-3" />
                            {balance ? parseFloat(balance.formatted).toFixed(4) : '0.00'} ETH
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            value={fromAmount}
                            onChange={(e) => handleFromChange(e.target.value)}
                            placeholder="0.0"
                            className="bg-transparent text-3xl font-bold text-white placeholder-slate-600 w-full focus:outline-none"
                        />
                        <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
                            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">Ξ</div>
                            <span className="font-bold text-lg">ETH</span>
                        </div>
                    </div>
                </div>

                {/* ARROW */}
                <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-[#0f0f1a] p-2 rounded-xl border border-white/10 text-[#00F0FF] shadow-lg">
                        <ArrowDown className="w-4 h-4" />
                    </div>
                </div>

                {/* TO INPUT */}
                <div className="bg-[#050510]/50 p-4 rounded-xl border border-white/5 mt-1">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-slate-400 font-mono">To (Estimate)</span>
                        <span className="text-xs text-slate-400 font-mono">Balance: 0.00</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            value={toAmount}
                            readOnly
                            placeholder="0.0"
                            className="bg-transparent text-3xl font-bold text-white placeholder-slate-600 w-full focus:outline-none cursor-default"
                        />
                        <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
                            <div className="w-6 h-6 rounded-full bg-[#00F0FF]/20 flex items-center justify-center text-[#00F0FF] text-xs font-bold">W</div>
                            <span className="font-bold text-lg">W3A</span>
                        </div>
                    </div>
                </div>

                {/* Rate Info */}
                {fromAmount && (
                    <div className="flex justify-between items-center px-2 text-xs font-mono text-slate-500">
                        <span>Rate</span>
                        <span>1 ETH = {EXCHANGE_RATE} W3A</span>
                    </div>
                )}


                <button
                    onClick={handleSwap}
                    disabled={!fromAmount || isPending || isConfirming || isCompleted || !balance || balance.value === 0n}
                    className="btn-neon w-full flex items-center justify-center gap-2 mt-2 py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {tSpecific('confirmingWallet')}
                        </>
                    ) : isConfirming ? (
                        <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            {tSpecific('swapping')}
                        </>
                    ) : (
                        <>
                            {tSpecific('swapButton')}
                        </>
                    )}
                </button>
            </motion.div>

            {/* Mock Button */}
            <button
                onClick={mockSwap}
                className="text-xs text-slate-500 hover:text-[#00F0FF] underline decoration-dashed"
            >
                {tSpecific('mockSwap')}
            </button>

            {isCompleted && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center text-[#00F0FF] gap-2 p-4 bg-[#00F0FF]/10 rounded-xl border border-[#00F0FF]/30 w-full"
                >
                    <div className="flex items-center gap-2 text-xl font-bold font-display">
                        <CheckCircle className="w-6 h-6" />
                        <span>{tSpecific('swapSuccess')}</span>
                    </div>
                    <span className="text-xs font-mono text-[#00F0FF]/70">{t('redirecting')}</span>
                </motion.div>
            )}
        </div>
    );
}
