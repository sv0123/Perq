import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import { formatCurrency } from '../../lib/utils';

interface SuccessAnimationProps {
    message: string;
    subMessage?: string;
    amount?: number;
    onComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ message, subMessage, amount, onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Sequence of animations
        const t1 = setTimeout(() => setStep(1), 100); // Circle expands
        const t2 = setTimeout(() => setStep(2), 600); // Checkmark appears
        const t3 = setTimeout(() => setStep(3), 1200); // Text slides up
        const t4 = setTimeout(() => {
            if (onComplete) onComplete();
        }, 3000); // Auto close after 3s

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white animate-fade-in">
            <div className="text-center">
                {/* Animated Circle & Checkmark */}
                <div className="relative flex items-center justify-center mb-8">
                    <div
                        className={cn(
                            "w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            step >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        )}
                    >
                        <Check
                            className={cn(
                                "w-12 h-12 text-white transition-all duration-500 delay-300",
                                step >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
                            )}
                            strokeWidth={4}
                        />
                    </div>
                    {/* Ripple effects */}
                    <div className={cn(
                        "absolute w-24 h-24 rounded-full border-4 border-blue-200 transition-all duration-1000",
                        step >= 2 ? "scale-150 opacity-0" : "scale-100 opacity-100"
                    )} />
                </div>

                {/* Text Content */}
                <div className={cn(
                    "transition-all duration-500 transform",
                    step >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}>
                    <h2 className="text-title-1 font-bold text-ios-black mb-2">{message}</h2>

                    {amount !== undefined && (
                        <p className="text-large-title font-bold text-ios-black mb-2">
                            {formatCurrency(amount)}
                        </p>
                    )}

                    {subMessage && (
                        <p className="text-body text-ios-gray-600">{subMessage}</p>
                    )}
                </div>

                {/* Brand/Logo at bottom (optional flair) */}
                <div className="absolute bottom-10 left-0 right-0 text-center">
                    <p className="text-caption font-semibold text-ios-gray-400 tracking-widest uppercase">
                        Secured by Perq
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SuccessAnimation;
