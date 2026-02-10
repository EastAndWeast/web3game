import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LevelStatus } from '@/constants/mapData';

interface UserState {
    xp: number;
    level: number;
    completedLevels: string[];
    addXP: (amount: number) => void;
    completeLevel: (levelId: string) => void;
    isLevelCompleted: (levelId: string) => boolean;
    isLevelUnlocked: (levelId: string, requirements?: string[]) => boolean;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            xp: 0,
            level: 1,
            completedLevels: [],
            addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
            completeLevel: (levelId) => {
                const state = get();
                if (!state.completedLevels.includes(levelId)) {
                    set({ completedLevels: [...state.completedLevels, levelId] });
                }
            },
            isLevelCompleted: (levelId) => get().completedLevels.includes(levelId),
            isLevelUnlocked: (levelId, requirements) => {
                if (!requirements || requirements.length === 0) return true;
                const state = get();
                return requirements.every((req) => state.completedLevels.includes(req));
            },
        }),
        {
            name: 'web3-game-storage',
        }
    )
);
