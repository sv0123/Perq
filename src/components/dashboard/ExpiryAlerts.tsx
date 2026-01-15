import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { ExpiryAlert } from '../../types';
import { formatCurrency, daysUntil, cn } from '../../lib/utils';
import { AlertTriangle, Clock } from 'lucide-react';

interface ExpiryAlertsProps {
    alerts: ExpiryAlert[];
    onAutoRedeem?: (alertId: string) => void;
}

/**
 * Expiry alerts component with auto-redeem functionality
 */
const ExpiryAlerts: React.FC<ExpiryAlertsProps> = ({ alerts, onAutoRedeem }) => {
    if (alerts.length === 0) {
        return null;
    }

    return (
        <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-ios-gray-700" />
                <h3 className="text-title-3 font-semibold text-ios-black">Expiring Soon</h3>
            </div>

            <div className="space-y-3">
                {alerts.map((alert) => {
                    const days = daysUntil(alert.expiryDate);
                    const isUrgent = days <= 7;

                    return (
                        <div
                            key={alert.id}
                            className={cn(
                                'p-4 rounded-ios border-2 transition-all duration-200',
                                isUrgent
                                    ? 'border-status-error-text bg-status-error'
                                    : 'border-status-warning-text bg-status-warning'
                            )}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-body font-semibold text-ios-black">
                                            {alert.cardName}
                                        </h4>
                                        {isUrgent && (
                                            <Badge variant="error">
                                                <Clock className="w-3 h-3 mr-1" />
                                                Urgent
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-footnote text-ios-gray-600 mb-2">{alert.bankName}</p>
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <p className="text-caption text-ios-gray-600">Points Expiring</p>
                                            <p className="text-subhead font-bold text-ios-black">
                                                {alert.pointsExpiring.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-caption text-ios-gray-600">Value</p>
                                            <p className="text-subhead font-bold text-ios-black">
                                                {formatCurrency(alert.pointsExpiring / 4)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-caption text-ios-gray-600">Days Left</p>
                                            <p className="text-subhead font-bold text-ios-black">{days}</p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => onAutoRedeem?.(alert.id)}
                                >
                                    Redeem Now
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default ExpiryAlerts;
