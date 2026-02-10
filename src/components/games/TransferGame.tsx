'use client';

import { useState, useEffect } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt, useAccount, useBalance } from 'wagmi';
import { parseEther } from 'viem';
import { useUserStore } from '@/store/useProgress';
import { motion } from 'framer-motion';
import { Send, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';

export function TransferGame({ onComplete }: { onComplete: () => void }) {
    const t = useTranslations('Game');
    const tSpecific = useTranslations('TransferGame');
    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    const completeLevel = useUserStore((state) => state.completeLevel);

    const [toAddress, setToAddress] = useState('0x1234567890123456789012345678901234567890'); // Dummy Master Address
    const [amount, setAmount] = useState('0.0001');
    const [isCompleted, setIsCompleted] = useState(false);

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
        completeLevel('transfer');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F0FF', '#7000FF']
        });
        setTimeout(onComplete, 4000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) return;

        sendTransaction({
            to: toAddress as `0x${string}`,
            value: parseEther(amount),
        });
    };

    // Mock function for development/demo without gas
    const mockTransfer = () => {
        // Simulate a "hash" and "success"
        setIsCompleted(true);
        completeLevel('transfer');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F0FF', '#7000FF']
        });
        setTimeout(onComplete, 3000);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-6 max-w-lg mx-auto w-full">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold font-display">{t('missionObjective')}</h3>
                <p className="text-slate-400">
                    {tSpecific('description')}
                </p>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="w-full card-glass p-8 rounded-xl flex flex-col gap-6"
            >
                <div className="space-y-2">
                    <label className="text-xs font-mono text-[#00F0FF] uppercase">{tSpecific('toLabel')}</label>
                    <div className="bg-black/30 p-3 rounded-lg border border-white/10 text-slate-300 font-mono text-sm break-all">
                        {toAddress}
                    </div>
                    <p className="text-xs text-slate-500">{tSpecific('masterAddressHint')}</p>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-mono text-[#00F0FF] uppercase">{tSpecific('amountLabel')}</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            step="0.0001"
                            min="0"
                            className="w-full bg-black/30 p-3 rounded-lg border border-white/10 text-white font-mono focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                        />
                        <span className="absolute right-3 top-3 text-slate-500 font-mono">ETH</span>
                    </div>
                    <p className="text-xs text-slate-500">
                        {tSpecific('balance')}: {balance ? parseFloat(balance.formatted).toFixed(4) : '0.0000'} {balance?.symbol}
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isPending || isConfirming || isCompleted || !balance || balance.value === 0n}
                    className="btn-neon w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {tSpecific('confirmingWallet')}
                        </>
                    ) : isConfirming ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {tSpecific('processing')}
                        </>
                    ) : (
                        <>
                            {tSpecific('sendButton')}
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>

                {error && (
                    <div className="text-red-500 text-xs bg-red-500/10 p-2 rounded flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error.message.split('.')[0]}</span>
                    </div>
                )}

            </motion.form>

            {/* Mock Button for demo/testing without funds */}
            <button
                onClick={mockTransfer}
                className="text-xs text-slate-500 hover:text-[#00F0FF] underline decoration-dashed"
            >
                {tSpecific('mockSend')}
            </button>

            {hash && (
                <div className="w-full text-center">
                    <div className="text-xs text-slate-500 mb-1">{tSpecific('txHash')}</div>
                    <a
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-[#00F0FF] hover:underline break-all"
                    >
                        {hash}
                    </a>
                </div>
            )}

            {isCompleted && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center text-[#00F0FF] gap-2 p-4 bg-[#00F0FF]/10 rounded-xl border border-[#00F0FF]/30 w-full"
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
