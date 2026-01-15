import React, { useState } from 'react';
import { CreditCard } from '../../types';
import { formatCardNumber, maskCardNumber, formatCurrency } from '../../lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CreditCardDisplayProps {
    card: CreditCard;
    compact?: boolean;
}

/**
 * Interactive credit card visualization with show/hide functionality
 */
const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({ card, compact = false }) => {
    const [showNumber, setShowNumber] = useState(false);

    return (
        <div
            className={cn(
                'relative rounded-ios-lg overflow-hidden tap-feedback transition-all duration-250',
                'bg-gradient-to-br from-ios-gray-800 to-ios-gray-950',
                compact ? 'p-4' : 'p-6',
                'hover:shadow-ios-md'
            )}
            style={{
                background: `linear-gradient(135deg, ${card.color} 0%, #000000 100%)`,
            }}
        >
            {/* Bank logo */}
            <div className="flex items-start justify-between mb-8">
                {card.logo ? (
                    <img
                        src={card.logo}
                        alt={`${card.bankName} logo`}
                        className="h-10 w-10 object-contain bg-white bg-opacity-90 p-1.5 rounded-md"
                    />
                ) : (
                    <div className="w-10 h-10 bg-ios-white bg-opacity-20 rounded-md" />
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowNumber(!showNumber);
                    }}
                    className="p-2 rounded-ios-sm hover:bg-white hover:bg-opacity-10 transition-colors tap-feedback"
                >
                    {showNumber ? (
                        <EyeOff className="w-4 h-4 text-ios-white" />
                    ) : (
                        <Eye className="w-4 h-4 text-ios-white" />
                    )}
                </button>
            </div>

            {/* Card number */}
            <div className="mb-6">
                <p className="text-body font-mono text-ios-white tracking-wider">
                    {showNumber ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                </p>
            </div>

            {/* Card details */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-caption text-ios-white opacity-60 mb-1">Cardholder</p>
                    <p className="text-subhead font-medium text-ios-white">{card.cardholderName}</p>
                </div>
                <div className="text-right">
                    <p className="text-caption text-ios-white opacity-60 mb-1">Expires</p>
                    <p className="text-subhead font-medium text-ios-white">{card.expiryDate}</p>
                </div>
            </div>

            {/* Bank and card type */}
            <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-subhead font-semibold text-ios-white">{card.bankName}</p>
                        <p className="text-footnote text-ios-white opacity-60">{card.cardType}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-caption text-ios-white opacity-60">Reward Points</p>
                        <p className="text-callout font-bold text-ios-white">
                            {card.rewardPoints.toLocaleString('en-IN')}
                        </p>
                        <p className="text-footnote text-ios-white opacity-60">
                            {formatCurrency(card.pointsValue)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCardDisplay;
