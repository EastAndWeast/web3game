export type LevelStatus = 'locked' | 'active' | 'completed';

export interface Level {
    id: string;
    title: string;
    description: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    status: LevelStatus;
    requires?: string[];
}

export const initialLevels: Level[] = [
    {
        id: 'intro',
        title: 'Beginner Village',
        description: 'Welcome to Web3! Create your first wallet.',
        x: 10,
        y: 50,
        status: 'active',
    },
    {
        id: 'faucet',
        title: 'Magic Fountain',
        description: 'Get some test tokens (Faucet).',
        x: 30,
        y: 30,
        status: 'locked',
        requires: ['intro'],
    },
    {
        id: 'transfer',
        title: 'First Scroll',
        description: 'Send your first transaction.',
        x: 50,
        y: 50,
        status: 'locked',
        requires: ['faucet'],
    },
    {
        id: 'swap',
        title: 'Marketplace',
        description: 'Swap tokens on a DEX.',
        x: 70,
        y: 30,
        status: 'locked',
        requires: ['transfer'],
    },
    {
        id: 'nft',
        title: 'Art Gallery',
        description: 'Mint your first NFT.',
        x: 90,
        y: 50,
        status: 'locked',
        requires: ['swap'],
    },
];
