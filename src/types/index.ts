// Core data types for Perq platform

export interface CreditCard {
    id: string;
    bankName: string;
    cardType: string;
    cardholderName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    rewardPoints: number;
    pointsValue: number; // in INR
    color: string;
    logo?: string; // Bank logo path
    expiryAlert?: Date;
}

export interface MarketplaceListing {
    id: string;
    userId: string;
    userName: string;
    userVerified: boolean;
    userRating: number;
    listingType: 'buy' | 'sell';
    pointsType: string;
    pointsAmount: number;
    pricePerPoint: number;
    totalPrice: number;
    description: string;
    createdAt: Date;
}

export interface CryptoAsset {
    id: string;
    symbol: string;
    name: string;
    icon: string;
    currentPrice: number; // in INR
    pointsPerCrypto: number;
    minimumPoints: number;
    change24h: number;
    history?: ChartDataPoint[];
}

export interface PointsTransaction {
    id: string;
    date: Date;
    type: 'earned' | 'redeemed' | 'expired' | 'transferred';
    cardId?: string;
    cardName?: string;
    points: number;
    value: number;
    description: string;
}

export interface AnalyticsData {
    totalPoints: number;
    totalValue: number;
    pointsEarned30d: number;
    pointsRedeemed30d: number;
    pointsExpiringSoon: number;
    pointsSaved: number;
    categoryBreakdown: {
        category: string;
        points: number;
        value: number;
        percentage: number;
    }[];
    monthlyTrend: {
        month: string;
        earned: number;
        redeemed: number;
        net: number;
    }[];
}

export interface ExpiryAlert {
    id: string;
    cardId: string;
    cardName: string;
    bankName: string;
    pointsExpiring: number;
    expiryDate: Date;
    daysRemaining: number;
    urgent: boolean;
}

export type ChartDataPoint = {
    date: string;
    points?: number;
    value: number;
};

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    isPerqPlusMember: boolean;
    memberSince?: Date;
}
