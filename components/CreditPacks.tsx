'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2, Sparkles } from 'lucide-react';
import { CREDIT_PACKS, formatPrice } from '@/lib/stripe-config';

interface CreditPacksProps {
    onPurchase: (packId: string) => void;
    loadingPack: string | null;
}

export function CreditPacks({ onPurchase, loadingPack }: CreditPacksProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(CREDIT_PACKS).map((pack) => (
                <Card
                    key={pack.id}
                    className={`glass-card p-8 flex flex-col relative ${pack.popular ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' : 'border-cyan-500/30'
                        }`}
                >
                    {pack.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                MOST POPULAR
                            </div>
                        </div>
                    )}

                    <div className="mb-6">
                        <div className="text-sm text-slate-400 mb-2">{pack.name}</div>
                        <div className="text-4xl font-bold text-slate-50 mb-2">{pack.credits}</div>
                        <div className="text-slate-400 text-sm mb-4">Credits</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            {formatPrice(pack.price)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{pack.description}</div>
                    </div>

                    <div className="flex-1 space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">Full competitor analysis</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">AI-powered script generation</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">Video upload & auto-posting</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">Caption rendering & micro-clips</span>
                        </div>
                    </div>

                    <Button
                        onClick={() => onPurchase(pack.id)}
                        disabled={loadingPack !== null}
                        className={`w-full ${pack.popular
                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700'
                            : 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500'
                            } text-white`}
                    >
                        {loadingPack === pack.id ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Buy Credits'
                        )}
                    </Button>
                </Card>
            ))}
        </div>
    );
}
