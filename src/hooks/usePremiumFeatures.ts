import { useState } from 'react';

/**
 * Custom hook for managing points staking
 */
export function useStaking() {
    const [stakedPoints, setStakedPoints] = useState<{
        amount: number;
        plan: string;
        startDate: Date;
        endDate: Date;
        apy: number;
    } | null>(null);

    const [stakingHistory, setStakingHistory] = useState<Array<{
        id: string;
        amount: number;
        plan: string;
        apy: number;
        startDate: Date;
        endDate: Date;
        status: 'active' | 'completed';
        earnings: number;
    }>>([]);

    const stakePoints = (amount: number, plan: string, duration: number, apy: number) => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + duration);

        const newStaking = {
            amount,
            plan,
            startDate,
            endDate,
            apy,
        };

        setStakedPoints(newStaking);

        // Add to history
        const historyEntry = {
            id: Date.now().toString(),
            ...newStaking,
            status: 'active' as const,
            earnings: Math.floor(amount * (apy / 100)),
        };

        setStakingHistory([historyEntry, ...stakingHistory]);

        return historyEntry;
    };

    const unstakePoints = () => {
        if (stakedPoints) {
            const earnings = Math.floor(stakedPoints.amount * (stakedPoints.apy / 100));
            setStakedPoints(null);
            return { amount: stakedPoints.amount, earnings };
        }
        return null;
    };

    return {
        stakedPoints,
        stakingHistory,
        stakePoints,
        unstakePoints,
    };
}

/**
 * Custom hook for managing achievements
 */
export function useAchievements() {
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [totalRewardsEarned, setTotalRewardsEarned] = useState(0);

    const unlockAchievement = (achievementId: string, rewardPoints: number) => {
        if (!unlockedAchievements.includes(achievementId)) {
            setUnlockedAchievements([...unlockedAchievements, achievementId]);
            setTotalRewardsEarned(totalRewardsEarned + rewardPoints);
            return true;
        }
        return false;
    };

    const claimReward = (_achievementId: string, rewardPoints: number) => {
        // Simulate claiming the reward
        return {
            success: true,
            points: rewardPoints,
            message: `Successfully claimed ${rewardPoints} bonus points!`,
        };
    };

    return {
        unlockedAchievements,
        totalRewardsEarned,
        unlockAchievement,
        claimReward,
    };
}

/**
 * Custom hook for insurance management
 */
export function useInsurance() {
    const [activePlan, setActivePlan] = useState<{
        id: string;
        name: string;
        coverage: number;
        monthlyFee: number;
    } | null>(null);

    const [protectedPoints, setProtectedPoints] = useState(0);

    const subscribeToPlan = (plan: { id: string; name: string; coverage: number; monthlyFee: number; maxCoverage: number }) => {
        setActivePlan(plan);
        setProtectedPoints(plan.maxCoverage);
        return {
            success: true,
            message: `Successfully subscribed to ${plan.name}! Your points are now protected.`,
        };
    };

    const cancelPlan = () => {
        setActivePlan(null);
        setProtectedPoints(0);
        return {
            success: true,
            message: 'Insurance plan cancelled successfully.',
        };
    };

    return {
        activePlan,
        protectedPoints,
        subscribeToPlan,
        cancelPlan,
    };
}
