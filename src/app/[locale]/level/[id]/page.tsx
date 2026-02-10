'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { initialLevels } from '@/constants/mapData';
import { GameLayout } from '@/components/games/GameLayout';
import { WalletConnectGame } from '@/components/games/WalletConnectGame';
import { FaucetGame } from '@/components/games/FaucetGame';
import { TransferGame } from '@/components/games/TransferGame';
import { SwapGame } from '@/components/games/SwapGame';
import { NftGame } from '@/components/games/NftGame';
import { useTranslations, useLocale } from 'next-intl';

export default function LevelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const tMap = useTranslations('Map');
    const locale = useLocale();

    const level = initialLevels.find((l) => l.id === id);

    if (!level) return <div>Level not found</div>;

    // Translation Logic
    const keyMap: Record<string, string> = {
        'intro': 'Level1',
        'faucet': 'Level2',
        'transfer': 'Level3',
        'swap': 'Level4',
        'nft': 'Level5'
    };
    const transKey = keyMap[level.id];
    const title = transKey ? tMap(`${transKey}.title` as any) : level.title;
    const description = transKey ? tMap(`${transKey}.description` as any) : level.description;

    const handleComplete = () => {
        // Navigate back to map after completion
        // The individual games handle state updates (unlocking levels)
        setTimeout(() => {
            router.push(`/${locale}`);
        }, 3000);
    };

    const renderGame = () => {
        switch (id) {
            case 'intro':
                return <WalletConnectGame onComplete={handleComplete} />;
            case 'faucet':
                return <FaucetGame onComplete={handleComplete} />;
            case 'transfer':
                return <TransferGame onComplete={handleComplete} />;
            case 'swap':
                return <SwapGame onComplete={handleComplete} />;
            case 'nft':
                return <NftGame onComplete={handleComplete} />;
            default:
                return (
                    <div className="text-center py-20">
                        <h2 className="text-xl text-slate-400">Game Under Construction</h2>
                        <p className="text-slate-600 mt-4">Coming soon...</p>
                    </div>
                );
        }
    };

    return (
        <GameLayout title={title} description={description}>
            {renderGame()}
        </GameLayout>
    );
}
