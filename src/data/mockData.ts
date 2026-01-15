import { CreditCard, MarketplaceListing, CryptoAsset, ChartDataPoint, ExpiryAlert, UserProfile } from '../types';

/**
 * Mock user profile
 */
export const mockUserProfile: UserProfile = {
    id: 'u1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    isPerqPlusMember: false, // Default to false for upgrade flow
};

/**
 * Mock credit cards data
 */
export const mockCreditCards: CreditCard[] = [
    {
        id: '1',
        bankName: 'HDFC Bank',
        cardType: 'Regalia',
        cardholderName: 'RAHUL SHARMA',
        cardNumber: '4532123456789012',
        expiryDate: '12/26',
        cvv: '123',
        rewardPoints: 45680,
        pointsValue: 11420,
        color: '#1a237e',
        logo: '/logos/hdfc.png',
        expiryAlert: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    },
    {
        id: '2',
        bankName: 'ICICI Bank',
        cardType: 'Sapphiro',
        cardholderName: 'PRIYA PATEL',
        cardNumber: '5425234567890123',
        expiryDate: '08/27',
        cvv: '456',
        rewardPoints: 32450,
        pointsValue: 8112.5,
        color: '#004d40',
        logo: '/logos/icici.png',
    },
    {
        id: '3',
        bankName: 'SBI Card',
        cardType: 'Elite',
        cardholderName: 'AMIT KUMAR',
        cardNumber: '6011234567890123',
        expiryDate: '03/25',
        cvv: '789',
        rewardPoints: 18900,
        pointsValue: 4725,
        color: '#b71c1c',
        logo: '/logos/sbi.png',
        expiryAlert: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days - urgent!
    },
    {
        id: '4',
        bankName: 'Axis Bank',
        cardType: 'Magnus',
        cardholderName: 'NEHA SINGH',
        cardNumber: '3782822463100051',
        expiryDate: '11/28',
        cvv: '321',
        rewardPoints: 67890,
        pointsValue: 16972.5,
        color: '#4a148c',
        logo: '/logos/axis.png',
    },
    {
        id: '5',
        bankName: 'Citi Bank',
        cardType: 'Prestige',
        cardholderName: 'VIKRAM RAO',
        cardNumber: '5412753456789012',
        expiryDate: '06/26',
        cvv: '654',
        rewardPoints: 28340,
        pointsValue: 7085,
        color: '#004d40',
        logo: '/logos/citi.png',
    },
];

/**
 * Mock marketplace listings
 */
export const mockMarketplaceListings: MarketplaceListing[] = [
    {
        id: 'm1',
        userId: 'u1',
        userName: 'Rajesh M.',
        userVerified: true,
        userRating: 4.8,
        listingType: 'sell',
        pointsType: 'HDFC Rewards',
        pointsAmount: 25000,
        pricePerPoint: 0.22,
        totalPrice: 5500,
        description: 'Selling HDFC reward points. Quick transfer. Verified seller.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'm2',
        userId: 'u2',
        userName: 'Sanjay K.',
        userVerified: true,
        userRating: 4.9,
        listingType: 'buy',
        pointsType: 'ICICI Rewards',
        pointsAmount: 50000,
        pricePerPoint: 0.20,
        totalPrice: 10000,
        description: 'Looking to buy ICICI reward points. Instant payment.',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
        id: 'm3',
        userId: 'u3',
        userName: 'Priya S.',
        userVerified: false,
        userRating: 4.2,
        listingType: 'sell',
        pointsType: 'SBI Rewards',
        pointsAmount: 15000,
        pricePerPoint: 0.18,
        totalPrice: 2700,
        description: 'SBI reward points available. New seller.',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
        id: 'm4',
        userId: 'u4',
        userName: 'Amit D.',
        userVerified: true,
        userRating: 5.0,
        listingType: 'sell',
        pointsType: 'Axis Rewards',
        pointsAmount: 40000,
        pricePerPoint: 0.25,
        totalPrice: 10000,
        description: 'Premium Axis Magnus points. Fast transfer guaranteed.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
];

/**
 * Mock cryptocurrency assets
 */
export const mockCryptoAssets: CryptoAsset[] = [
    {
        id: 'btc',
        symbol: 'BTC',
        name: 'Bitcoin',
        icon: '₿',
        currentPrice: 3845672,
        pointsPerCrypto: 96142,
        minimumPoints: 5000,
        change24h: 2.34,
        history: [
            { date: '10 AM', value: 3750000 },
            { date: '11 AM', value: 3780000 },
            { date: '12 PM', value: 3820000 },
            { date: '1 PM', value: 3810000 },
            { date: '2 PM', value: 3845672 },
            { date: '3 PM', value: 3860000 },
        ]
    },
    {
        id: 'eth',
        symbol: 'ETH',
        name: 'Ethereum',
        icon: 'Ξ',
        currentPrice: 234590,
        pointsPerCrypto: 5865,
        minimumPoints: 2000,
        change24h: -1.23,
        history: [
            { date: '10 AM', value: 238000 },
            { date: '11 AM', value: 236000 },
            { date: '12 PM', value: 235000 },
            { date: '1 PM', value: 234590 },
            { date: '2 PM', value: 233000 },
            { date: '3 PM', value: 232000 },
        ]
    },
    {
        id: 'usdt',
        symbol: 'USDT',
        name: 'Tether',
        icon: '₮',
        currentPrice: 83,
        pointsPerCrypto: 2,
        minimumPoints: 1000,
        change24h: 0.01,
        history: [
            { date: '10 AM', value: 83 },
            { date: '11 AM', value: 83 },
            { date: '12 PM', value: 83 },
            { date: '1 PM', value: 83 },
            { date: '2 PM', value: 83 },
            { date: '3 PM', value: 83 },
        ]
    },
    {
        id: 'bnb',
        symbol: 'BNB',
        name: 'Binance Coin',
        icon: 'BNB',
        currentPrice: 45320,
        pointsPerCrypto: 1133,
        minimumPoints: 2500,
        change24h: 1.87,
        history: [
            { date: '10 AM', value: 44000 },
            { date: '11 AM', value: 44500 },
            { date: '12 PM', value: 45000 },
            { date: '1 PM', value: 45320 },
            { date: '2 PM', value: 45600 },
            { date: '3 PM', value: 45800 },
        ]
    },
    {
        id: 'xrp',
        symbol: 'XRP',
        name: 'Ripple',
        icon: 'XRP',
        currentPrice: 189,
        pointsPerCrypto: 5,
        minimumPoints: 1500,
        change24h: -0.45,
        history: [
            { date: '10 AM', value: 192 },
            { date: '11 AM', value: 190 },
            { date: '12 PM', value: 189 },
            { date: '1 PM', value: 188 },
            { date: '2 PM', value: 189 },
            { date: '3 PM', value: 187 },
        ]
    },
];

/**
 * Mock points trend data for charts (last 6 months)
 */
export const mockPointsTrend: ChartDataPoint[] = [
    { date: 'Aug 2025', points: 125000, value: 31250 },
    { date: 'Sep 2025', points: 142000, value: 35500 },
    { date: 'Oct 2025', points: 158000, value: 39500 },
    { date: 'Nov 2025', points: 171000, value: 42750 },
    { date: 'Dec 2025', points: 183000, value: 45750 },
    { date: 'Jan 2026', points: 193260, value: 48315 },
];

/**
 * Mock expiry alerts
 */
export const mockExpiryAlerts: ExpiryAlert[] = [
    {
        id: 'e1',
        cardId: '3',
        cardName: 'SBI Elite',
        bankName: 'SBI Card',
        pointsExpiring: 8500,
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        daysRemaining: 7,
        urgent: true,
    },
    {
        id: 'e2',
        cardId: '1',
        cardName: 'HDFC Regalia',
        bankName: 'HDFC Bank',
        pointsExpiring: 12000,
        expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        daysRemaining: 15,
        urgent: false,
    },
];

/**
 * Calculate total statistics from cards
 */
export function calculateTotalStats(cards: CreditCard[]) {
    const totalPoints = cards.reduce((sum, card) => sum + card.rewardPoints, 0);
    const totalValue = cards.reduce((sum, card) => sum + card.pointsValue, 0);

    const pointsExpiringSoon = mockExpiryAlerts.reduce(
        (sum, alert) => sum + alert.pointsExpiring,
        0
    );

    const pointsSaved = 45890; // Mock value - points saved through optimization

    return {
        totalPoints,
        totalValue,
        pointsExpiringSoon,
        pointsSaved,
    };
}
