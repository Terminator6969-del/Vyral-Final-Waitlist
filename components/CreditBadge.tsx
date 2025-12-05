'use client';

import { useCredits } from '@/hooks/useCredits';
import { Coins, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function CreditBadge() {
    const { credits, loading } = useCredits();

    if (loading) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700">
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                <span className="text-sm text-slate-400">Loading...</span>
            </div>
        );
    }

    const isLow = credits < 10;

    return (
        <Link href="/pricing">
            <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${isLow
                        ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                        : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50'
                    }`}
            >
                <Coins className={`w-4 h-4 ${isLow ? 'text-red-400' : 'text-cyan-400'}`} />
                <span className={`text-sm font-medium ${isLow ? 'text-red-400' : 'text-slate-200'}`}>
                    {credits} {credits === 1 ? 'credit' : 'credits'}
                </span>
            </div>
        </Link>
    );
}
