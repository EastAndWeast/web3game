'use client';
export const runtime = "edge";


import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { LearningMap } from '@/components/LearningMap';
import { initialLevels } from '@/constants/mapData';
import { useUserStore } from '@/store/useProgress';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const router = useRouter();
  const completedLevels = useUserStore((state) => state.completedLevels);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Home');
  const tMap = useTranslations('Map');
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  const levelsWithStatus = initialLevels.map(level => {
    const isCompleted = mounted && completedLevels.includes(level.id);
    const isUnlocked = level.requires
      ? level.requires.every(req => mounted && completedLevels.includes(req))
      : true;

    let status = level.status;
    if (isCompleted) status = 'completed';
    else if (isUnlocked) status = 'active';
    else status = 'locked';

    if (level.id === 'intro' && !isCompleted) status = 'active';

    // Map IDs to Translation Keys (Assuming ID matches key or with Capitalization)
    const keyMap: Record<string, string> = {
      'intro': 'Level1',
      'faucet': 'Level2',
      'transfer': 'Level3',
      'swap': 'Level4',
      'nft': 'Level5'
    };
    const transKey = keyMap[level.id];

    return {
      ...level,
      status,
      title: transKey ? tMap(`${transKey}.title` as any) : level.title,
      description: transKey ? tMap(`${transKey}.description` as any) : level.description
    };
  });

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 gap-8 font-sans overflow-hidden relative">
      <header className="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl gap-6 z-10">
        <div className="flex flex-col items-center sm:items-start">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl sm:text-5xl font-display font-bold bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm tracking-widest uppercase mt-1"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;
              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} className="btn-neon">
                          {t('connectWallet')}
                        </button>
                      );
                    }
                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} className="bg-red-500 text-white px-4 py-2 rounded font-bold">
                          {t('wrongNetwork')}
                        </button>
                      );
                    }
                    return (
                      <button onClick={openAccountModal} className="card-glass px-4 py-2 rounded-lg text-[#00F0FF] font-mono border border-[#00F0FF]/30 hover:bg-[#00F0FF]/10 transition-colors">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </header>

      <main className="flex flex-col w-full max-w-6xl items-center flex-grow z-10 mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full relative"
        >
          <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-[#00F0FF]/30 rounded-tl-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-[#7000FF]/30 rounded-br-3xl"></div>

          <LearningMap
            levels={levelsWithStatus as any}
            onLevelClick={(level) => router.push(`/${locale}/level/${level.id}`)}
          />
        </motion.div>
      </main>

      <footer className="text-xs text-slate-600 mt-12 mb-4 font-mono z-10">
        {t('statusOnline')}
      </footer>
    </div>
  );
}
