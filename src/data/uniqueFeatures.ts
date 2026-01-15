import { CreditCard } from '../types';

/**
 * AI-powered points optimization recommendations
 */
export interface OptimizationTip {
    id: string;
    priority: 'high' | 'medium' | 'low';
    category: 'savings' | 'earning' | 'redemption' | 'protection';
    title: string;
    description: string;
    potentialSavings?: number;
    action: string;
    actionLink?: string;
}

/**
 * Points staking feature - earn interest on unused points
 */
export interface StakingOption {
    id: string;
    name: string;
    duration: number; // days
    interestRate: number; // percentage
    minimumPoints: number;
    badge: string;
}

/**
 * Family pooling feature
 */
export interface FamilyPool {
    id: string;
    name: string;
    members: PoolMember[];
    totalPoints: number;
    bonusMultiplier: number; // Added
    monthlyContribution?: number;
    createdAt: Date | string; // Support both
}

export interface PoolMember {
    id: string;
    name: string;
    email?: string; // Added
    avatar?: string;
    contribution: number;
    role: 'admin' | 'member';
    joinedAt?: Date | string;
}

/**
 * Achievement system for gamification
 */
export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    progress: number;
    maxProgress: number;
    reward: number;
    unlocked: boolean;
    unlockedAt?: Date;
}

/**
 * Points insurance
 */
export interface InsurancePlan {
    id: string;
    name: string;
    coverage: number; // percentage of points covered
    monthlyFee: number; // in INR
    maxCoverage: number; // maximum points
    active: boolean;
}

/**
 * Instant liquidity - points to cash
 */
export interface LiquidityOffer {
    pointsAmount: number;
    cashAmount: number;
    exchangeRate: number;
    processingFee: number;
    netAmount: number;
}

// Mock AI Optimization Tips
export const mockOptimizationTips: OptimizationTip[] = [
    {
        id: '1',
        priority: 'high',
        category: 'savings',
        title: 'Redeem 8,500 points before expiry',
        description: 'Your SBI Elite points expire in 7 days. Redeem now to save ₹2,125.',
        potentialSavings: 2125,
        action: 'Redeem Now',
        actionLink: '/marketplace'
    },
    {
        id: '2',
        priority: 'high',
        category: 'earning',
        title: 'Stake points to earn 12% APY',
        description: 'Lock 45,000 points for 90 days and earn 4,500 bonus points.',
        potentialSavings: 1125,
        action: 'Start Staking',
    },
    {
        id: '3',
        priority: 'medium',
        category: 'protection',
        title: 'Protect 18,900 expiring points',
        description: 'Get insurance for just ₹49/month and never lose points again.',
        potentialSavings: 4725,
        action: 'Get Insurance',
    },
    {
        id: '4',
        priority: 'medium',
        category: 'redemption',
        title: 'Pool family points for better value',
        description: 'Combine 95,000 family points for premium redemptions at 25% higher value.',
        potentialSavings: 5937,
        action: 'Create Pool',
    },
];

// Staking options
export const stakingOptions: StakingOption[] = [
    {
        id: '1',
        name: 'Flexible Staking',
        duration: 30,
        interestRate: 5,
        minimumPoints: 10000,
        badge: '🌱'
    },
    {
        id: '2',
        name: 'Standard Lock',
        duration: 90,
        interestRate: 12,
        minimumPoints: 25000,
        badge: '⭐'
    },
    {
        id: '3',
        name: 'Premium Lock',
        duration: 180,
        interestRate: 20,
        minimumPoints: 50000,
        badge: '💎'
    },
];

// Mock family pool
export const mockFamilyPool: FamilyPool = {
    id: '1',
    name: 'Sharma Family Pool',
    members: [
        { id: '1', name: 'Rahul Sharma', email: 'rahul@example.com', avatar: '👨‍💼', contribution: 45680, role: 'admin' },
        { id: '2', name: 'Priya Sharma', email: 'priya@example.com', avatar: '👩‍💼', contribution: 32450, role: 'member' },
        { id: '3', name: 'Amit Sharma', email: 'amit@example.com', avatar: '👨', contribution: 18900, role: 'member' },
    ],
    totalPoints: 97030,
    bonusMultiplier: 1.25,
    monthlyContribution: 15000,
    createdAt: new Date('2024-01-15'),
};

// Mock achievements
export const mockAchievements: Achievement[] = [
    {
        id: '1',
        title: 'First Stake',
        description: 'Stake points for the first time',
        icon: '🌟',
        progress: 1,
        maxProgress: 1,
        reward: 500,
        unlocked: true,
        unlockedAt: new Date('2024-12-20'),
    },
    {
        id: '2',
        title: 'Points Master',
        description: 'Earn 100,000 total points',
        icon: '👑',
        progress: 73240,
        maxProgress: 100000,
        reward: 2000,
        unlocked: false,
    },
    {
        id: '3',
        title: 'Saver Supreme',
        description: 'Save 50,000 points from expiring',
        icon: '🛡️',
        progress: 18900,
        maxProgress: 50000,
        reward: 1500,
        unlocked: false,
    },
    {
        id: '4',
        title: 'Family First',
        description: 'Create a family pool',
        icon: '👨‍👩‍👧‍👦',
        progress: 1,
        maxProgress: 1,
        reward: 1000,
        unlocked: true,
        unlockedAt: new Date('2024-11-15'),
    },
];

// Insurance plans
export const insurancePlans: InsurancePlan[] = [
    {
        id: '1',
        name: 'Basic Protection',
        coverage: 50,
        monthlyFee: 49,
        maxCoverage: 25000,
        active: false,
    },
    {
        id: '2',
        name: 'Premium Shield',
        coverage: 80,
        monthlyFee: 99,
        maxCoverage: 100000,
        active: false,
    },
    {
        id: '3',
        name: 'Ultimate Guard',
        coverage: 100,
        monthlyFee: 199,
        maxCoverage: 500000,
        active: true,
    },
];

// Calculate liquidity offer
export function calculateLiquidityOffer(points: number): LiquidityOffer {
    const exchangeRate = 0.23; // ₹0.23 per point
    const processingFee = 50; // ₹50 flat fee
    const cashAmount = points * exchangeRate;
    const netAmount = cashAmount - processingFee;

    return {
        pointsAmount: points,
        cashAmount,
        exchangeRate,
        processingFee,
        netAmount: Math.max(0, netAmount),
    };
}

// AI-powered card recommendation
export function getOptimalCard(cards: CreditCard[], _category: string): CreditCard | null {
    if (cards.length === 0) return null;

    // Simple logic: recommend card with most points
    return cards.reduce((best, current) =>
        current.rewardPoints > best.rewardPoints ? current : best
    );
}
