import React from 'react';
import Card from '../ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

/**
 * iOS-style statistics card for dashboard metrics
 */
const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, icon: Icon, trend }) => {
    return (
        <Card className="p-5 hover:shadow-ios-md transition-shadow duration-250">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-subhead text-ios-gray-600 mb-1">{title}</p>
                    <h3 className="text-title-1 font-bold text-ios-black mb-1">{value}</h3>
                    {subtitle && <p className="text-footnote text-ios-gray-500">{subtitle}</p>}
                </div>
                <div className="ml-3">
                    <div className="w-12 h-12 rounded-ios bg-ios-gray-50 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-ios-gray-700" />
                    </div>
                </div>
            </div>

            {trend && (
                <div className="mt-3 pt-3 border-t border-ios-gray-100">
                    <span
                        className={cn(
                            'text-footnote font-medium',
                            trend.isPositive ? 'text-status-success-text' : 'text-status-error-text'
                        )}
                    >
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                    </span>
                    <span className="text-footnote text-ios-gray-500 ml-1">vs last month</span>
                </div>
            )}
        </Card>
    );
};

export default StatsCard;
