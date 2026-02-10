'use client';

import { useState, useEffect } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt, useAccount, useBalance } from 'wagmi';
import { parseEther } from 'viem';
import { useUserStore } from '@/store/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, Package, Hexagon, Sparkles, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';

export function NftGame({ onComplete }: { onComplete: () => void }) {
    const t = useTranslations('Game');
    const tSpecific = useTranslations('NftGame');
    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    const completeLevel = useUserStore((state) => state.completeLevel);

    const [isMinting, setIsMinting] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Mock NFT Contract
    const NFT_CONTRACT = '0x000000000000000000000000000000000000bEEF';
    const MINT_PRICE = '0.0001';

    const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isConfirmed && !isRevealed) {
            handleReveal();
        }
    }, [isConfirmed, isRevealed]);

    const handleReveal = () => {
        setIsRevealed(true);
        completeLevel('nft');
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#00F0FF']
        });
        setTimeout(() => {
            setIsCompleted(true);
            setTimeout(onComplete, 5000); // Longer wait to enjoy the badge
        }, 2000);
    };

    const handleMint = () => {
        if (!address) return;

        sendTransaction({
            to: NFT_CONTRACT,
            value: parseEther(MINT_PRICE),
        });
    };

    const mockMint = () => {
        setIsMinting(true);
        setTimeout(() => {
            setIsMinting(false);
            handleReveal();
        }, 2000);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-6 max-w-lg mx-auto w-full">
            <div className="text-center space-y-2 mb-4">
                <h3 className="text-xl font-semibold font-display">{t('missionObjective')}</h3>
                <p className="text-slate-400 text-sm">
                    {tSpecific('description')}
                </p>
            </div>

            <div className="relative w-64 h-80 perspective-1000">
                <AnimatePresence mode="wait">
                    {!isRevealed ? (
                        <motion.div
                            key="box"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2, rotateY: 180 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full card-glass rounded-2xl flex flex-col items-center justify-center gap-4 border-2 border-[#00F0FF]/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] group cursor-pointer"
                        >
                            <div className="relative">
                                <Package className="w-32 h-32 text-[#00F0FF] group-hover:scale-105 transition-transform duration-500" />
                                <Lock className="w-10 h-10 text-white absolute -bottom-2 -right-2 bg-black rounded-full p-2 border border-white/20" />
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold text-white text-lg">Mystery Box</h4>
                                <p className="text-[#00F0FF] font-mono text-xs">Series I</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="nft"
                            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ type: "spring", damping: 12 }}
                            className="w-full h-full bg-gradient-to-br from-[#050510] to-[#1a1a2e] rounded-2xl flex flex-col items-center justify-between p-6 border-2 border-[#FFD700]/50 shadow-[0_0_50px_rgba(255,215,0,0.3)] relative overflow-hidden"
                        >
                            {/* Shine Effect */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] animate-shimmer"></div>

                            <div className="w-full flex justify-between items-center z-10">
                                <span className="text-[10px] font-mono text-[#FFD700] border border-[#FFD700]/30 px-2 py-1 rounded">LEGENDARY</span>
                                <Hexagon className="w-6 h-6 text-[#FFD700]" />
                            </div>

                            <div className="relative z-10 w-32 h-32 flex items-center justify-center">
                                <div className="absolute w-full h-full bg-[#FFD700]/20 blur-3xl rounded-full"></div>
                                <Sparkles className="w-24 h-24 text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]" />
                            </div>

                            <div className="text-center z-10">
                                <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-xl font-display">
                                    Explorer Badge
                                </h4>
                                <p className="text-slate-400 text-xs mt-1">Founding Member #001</p>
                            </div>

                            <div className="w-full bg-black/40 rounded-lg p-2 flex justify-between items-center text-[10px] font-mono text-slate-500 z-10">
                                <span>MINTED</span>
                                <span>2026.02.10</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="w-full max-w-xs space-y-4">
                {!isRevealed && (
                    <div className="flex justify-between items-center px-4 py-2 bg-black/30 rounded-lg border border-white/5">
                        <span className="text-sm text-slate-400">Mint Price</span>
                        <span className="text-sm font-mono text-white">{MINT_PRICE} ETH</span>
                    </div>
                )}

                {!isRevealed ? (
                    <button
                        onClick={handleMint}
                        disabled={isPending || isConfirming || !balance || balance.value === 0n}
                        className="btn-neon w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {tSpecific('confirming')}
                            </>
                        ) : isConfirming ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {tSpecific('minting')}
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                {tSpecific('mintButton')}
                            </>
                        )}
                    </button>
                ) : (
                    <div className="w-full text-center text-[#FFD700] font-bold font-display animate-pulse">
                        {tSpecific('collectionAdded')}
                    </div>
                )}

                {/* Mock for Dev */}
                {!isRevealed && (
                    <button
                        onClick={mockMint}
                        className="w-full text-center text-xs text-slate-500 hover:text-[#00F0FF] underline decoration-dashed mt-2"
                    >
                        {tSpecific('mockMint')}
                    </button>
                )}
            </div>

            {isCompleted && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-xs font-mono text-[#00F0FF]/70">{t('redirecting')}</span>
                </motion.div>
            )}

        </div>
    );
}
