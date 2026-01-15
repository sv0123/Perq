import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
// Button and Input replaced by custom UI
import CryptoChart from '../components/crypto/CryptoChart';
import SuccessAnimation from '../components/ui/SuccessAnimation';
import { mockCryptoAssets } from '../data/mockData';
import { CryptoAsset } from '../types';
import { formatCurrency } from '../lib/utils';
import { TrendingUp, TrendingDown, ArrowRight, Sparkles, Activity, Zap, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Crypto Gateway page for converting points to cryptocurrency
 * Enhanced for maximum user engagement
 */
const Crypto: React.FC = () => {
    const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(mockCryptoAssets);
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset | null>(null);
    const [pointsAmount, setPointsAmount] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [successData, setSuccessData] = useState<{ show: boolean, message: string, amount: number, cryptoAmount: string } | null>(null);

    // Live market simulation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCryptoAssets(prev => prev.map(asset => {
                const change = (Math.random() - 0.5) * 0.2; // Small random flux
                return {
                    ...asset,
                    currentPrice: asset.currentPrice * (1 + change / 100),
                    change24h: asset.change24h + (Math.random() - 0.5) * 0.05
                };
            }));
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const calculateConversion = (crypto: CryptoAsset, points: number) => {
        const cryptoAmount = points / crypto.pointsPerCrypto;
        const inrValue = cryptoAmount * crypto.currentPrice;
        return { cryptoAmount, inrValue };
    };

    const handleConfirmConversion = () => {
        const points = parseInt(pointsAmount) || 0;
        if (!selectedCrypto || !points) return;

        const conversion = calculateConversion(selectedCrypto, points);

        setSuccessData({
            show: true,
            message: `Swapped for ${selectedCrypto.symbol}`,
            amount: conversion.inrValue,
            cryptoAmount: `${conversion.cryptoAmount.toFixed(6)} ${selectedCrypto.symbol}`
        });

        setShowConfirmModal(false);
        setPointsAmount('');
        setSelectedCrypto(null);
    };

    const points = parseInt(pointsAmount) || 0;
    const conversion = selectedCrypto ? calculateConversion(selectedCrypto, points) : null;

    // Engagement helper: Find top mover
    const topMover = [...cryptoAssets].sort((a, b) => b.change24h - a.change24h)[0];

    return (
        <div className="min-h-screen bg-ios-gray-50 page-transition pb-20">
            {successData && (
                <SuccessAnimation
                    message={successData.message}
                    amount={successData.amount}
                    subMessage={`You received ${successData.cryptoAmount}`}
                    onComplete={() => setSuccessData(null)}
                />
            )}

            {/* LIVE TICKER - Fixed Bottom Breaking News Style */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-ios-black/95 backdrop-blur-md text-white border-t border-white/10 h-10 flex items-center shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
                <div className="bg-red-600 h-full px-4 flex items-center text-xs font-bold tracking-wider z-20 shadow-xl">
                    LIVE MARKET
                </div>
                <div className="flex overflow-hidden relative w-full h-full items-center mask-gradient-sides">
                    {/* Track 1 */}
                    <div className="flex animate-marquee whitespace-nowrap items-center min-w-full shrink-0 hover:[animation-play-state:paused]">
                        {[...cryptoAssets, ...cryptoAssets, ...cryptoAssets].map((asset, i) => (
                            <div key={`${asset.id}-1-${i}`} className="flex items-center gap-2 text-sm font-medium mr-12">
                                <span className="font-bold text-gray-300">{asset.symbol}</span>
                                <span className="text-white">{formatCurrency(asset.currentPrice)}</span>
                                <span className={asset.change24h >= 0 ? "text-green-400" : "text-red-400"}>
                                    {asset.change24h > 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                                </span>
                            </div>
                        ))}
                    </div>
                    {/* Track 2 (Clone) */}
                    <div className="flex animate-marquee whitespace-nowrap items-center min-w-full shrink-0 hover:[animation-play-state:paused]">
                        {[...cryptoAssets, ...cryptoAssets, ...cryptoAssets].map((asset, i) => (
                            <div key={`${asset.id}-2-${i}`} className="flex items-center gap-2 text-sm font-medium mr-12">
                                <span className="font-bold text-gray-300">{asset.symbol}</span>
                                <span className="text-white">{formatCurrency(asset.currentPrice)}</span>
                                <span className={asset.change24h >= 0 ? "text-green-400" : "text-red-400"}>
                                    {asset.change24h > 0 ? "+" : ""}{asset.change24h.toFixed(2)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="ios-container py-8">
                {/* Header with Pulse */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-large-title font-bold text-ios-black mb-1 flex items-center gap-3">
                            Crypto Gateway
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        </h1>
                        <p className="text-body text-ios-gray-600">
                            Live market rates. Instant liquidity.
                        </p>
                    </div>
                </div>

                {/* Crypto Assets Grid */}
                <h2 className="text-title-2 font-bold text-ios-black mb-5 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-blue-500" /> Market Watch
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                    {cryptoAssets.map((crypto) => (
                        <Card
                            key={crypto.id}
                            interactive
                            padding="md"
                            className={cn(
                                'transition-all duration-300 transform',
                                selectedCrypto?.id === crypto.id ? 'ring-2 ring-blue-500 shadow-xl scale-[1.02]' : 'hover:scale-[1.01]',
                                'relative overflow-hidden'
                            )}
                            onClick={() => setSelectedCrypto(crypto)}
                        >
                            {/* Hot Badge */}
                            {crypto.id === topMover.id && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                                    <Flame className="w-3 h-3 fill-white" /> Hot
                                </div>
                            )}

                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-ios-gray-100 flex items-center justify-center text-2xl shadow-sm">
                                        {crypto.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-title-3 font-bold text-ios-black">{crypto.name}</h3>
                                        <span className="text-caption font-bold text-ios-gray-500 tracking-wider">
                                            {crypto.symbol}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-body font-bold text-ios-black">
                                        {formatCurrency(crypto.currentPrice)}
                                    </p>
                                    <div
                                        className={cn(
                                            'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-caption font-bold',
                                            crypto.change24h >= 0
                                                ? 'text-green-600 bg-green-50'
                                                : 'text-red-600 bg-red-50'
                                        )}
                                    >
                                        {crypto.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {Math.abs(crypto.change24h).toFixed(2)}%
                                    </div>
                                </div>
                            </div>

                            {/* Mini Chart Preview (Visual only for now if needed, or keeping it clean) */}
                            {/* We will show full chart when selected */}

                            <div className="mt-4 pt-4 border-t border-ios-gray-100 flex justify-between items-center text-footnote text-ios-gray-500">
                                <span>Rate: {crypto.pointsPerCrypto.toLocaleString()} pts/unit</span>
                                <span className="font-semibold text-blue-600">Trade <ArrowRight className="w-3 h-3 inline ml-1" /></span>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Conversion Workstation */}
                {selectedCrypto && (
                    <div id="conversion-section" className="animate-slide-up">
                        <div className="bg-ios-black/95 backdrop-blur-xl text-white rounded-3xl p-1 shadow-2xl overflow-hidden border border-white/10 ring-4 ring-black/5">
                            <div className="grid grid-cols-1 lg:grid-cols-3">

                                {/* Chart Section */}
                                <div className="lg:col-span-2 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-title-1 font-bold flex items-center gap-3">
                                                {selectedCrypto.name}
                                                <span className="text-subhead text-gray-400 font-medium bg-white/10 px-2 py-1 rounded-lg">{selectedCrypto.symbol}</span>
                                            </h2>
                                            <p className="text-title-2 font-bold mt-2 text-white">
                                                {formatCurrency(selectedCrypto.currentPrice)}
                                                <span className={cn("text-lg ml-3 font-medium", selectedCrypto.change24h >= 0 ? "text-green-400" : "text-red-400")}>
                                                    {selectedCrypto.change24h > 0 ? "+" : ""}{selectedCrypto.change24h.toFixed(2)}%
                                                </span>
                                            </p>
                                        </div>
                                        <div className="bg-white/10 p-2 rounded-xl">
                                            <div className="text-2xl">{selectedCrypto.icon}</div>
                                        </div>
                                    </div>

                                    {/* Interactive Chart */}
                                    <div className="h-[250px] w-full bg-white/5 rounded-2xl mb-4 overflow-hidden relative group">
                                        {selectedCrypto.history ? (
                                            <CryptoChart data={selectedCrypto.history} color={selectedCrypto.change24h >= 0 ? '#10B981' : '#EF4444'} />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-500">Loading Chart Data...</div>
                                        )}
                                    </div>
                                    <div className="flex justify-between text-caption text-gray-500 px-2">
                                        <span>10:00 AM</span>
                                        <span>Live</span>
                                    </div>
                                </div>

                                {/* Action Section */}
                                <div className="p-6 lg:p-8 flex flex-col justify-center bg-gray-900/50">
                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                                            <span>Pay with Points</span>
                                            <span>Min: {selectedCrypto.minimumPoints}</span>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={pointsAmount}
                                                onChange={(e) => setPointsAmount(e.target.value)}
                                                placeholder="0"
                                                className="w-full bg-white/10 border-none rounded-2xl py-4 px-5 text-2xl font-bold text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">PTS</span>
                                        </div>

                                        {/* Quick Chips */}
                                        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                                            {[1000, 5000, 10000, selectedCrypto.minimumPoints * 2].map(amt => (
                                                <button
                                                    key={amt}
                                                    onClick={() => setPointsAmount(amt.toString())}
                                                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 whitespace-nowrap transition-colors"
                                                >
                                                    {amt >= 1000 ? `${amt / 1000}k` : amt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {conversion && (
                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">You Get</span>
                                                <span className="text-xl font-bold text-white">{conversion.cryptoAmount.toFixed(6)} {selectedCrypto.symbol}</span>
                                            </div>
                                            <div className="w-full h-px bg-white/10"></div>
                                            <div className="flex justify-between items-center text-xs text-gray-400">
                                                <span>Tx Fee</span>
                                                <span className="text-green-400 font-bold">FREE</span>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setShowConfirmModal(true)}
                                        disabled={!points || points < selectedCrypto.minimumPoints}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Zap className="w-5 h-5 fill-white" />
                                        {points < selectedCrypto.minimumPoints ? 'Insuff. Points' : 'Convert Now'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirmation Modal */}
                {showConfirmModal && selectedCrypto && conversion && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowConfirmModal(false)}>
                        <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                            <div className="p-6 text-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 mx-auto flex items-center justify-center mb-4 text-4xl shadow-inner">
                                    {selectedCrypto.icon}
                                </div>

                                <h2 className="text-title-2 font-bold text-ios-black mb-2">
                                    Confirm Swap
                                </h2>
                                <p className="text-body text-ios-gray-600 mb-6">
                                    Swap <span className="font-bold text-ios-black">{points.toLocaleString()} pts</span> for <span className="font-bold text-ios-black">{conversion.cryptoAmount.toFixed(6)} {selectedCrypto.symbol}</span>
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleConfirmConversion}
                                        className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Sparkles className="w-5 h-5 text-white" />
                                        Complete Swap
                                    </button>
                                    <button
                                        onClick={() => setShowConfirmModal(false)}
                                        className="w-full py-3.5 text-ios-gray-600 font-semibold rounded-xl hover:bg-ios-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Crypto;
