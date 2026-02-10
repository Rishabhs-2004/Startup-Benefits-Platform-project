'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Deal } from '@/types';
import { dealService, claimService } from '@/lib/services';
import { useAuth } from '@/context/AuthContext';
import {
    ChevronLeft,
    ShieldCheck,
    Lock,
    CheckCircle2,
    Loader2,
    ExternalLink,
    AlertCircle,
    Copy,
    Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DealDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const [deal, setDeal] = useState<Deal | null>(null);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [claimed, setClaimed] = useState(false);

    useEffect(() => {
        const fetchDeal = async () => {
            try {
                const data = await dealService.getDealById(id as string);
                setDeal(data);
            } catch (err) {
                console.error(err);
                setError('Could not load deal details.');
            } finally {
                setLoading(false);
            }
        };
        fetchDeal();
    }, [id]);

    const handleClaim = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (deal?.accessLevel === 'restricted' && !user.isVerified) {
            setError('Your account must be verified to claim restricted deals.');
            return;
        }

        setClaiming(true);
        setError(null);
        try {
            await claimService.claimDeal(id as string);
            setClaimed(true);
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to claim deal.');
        } finally {
            setClaiming(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-500" size={48} />
        </div>
    );

    if (!deal) return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-center p-4">
            <div className="p-4 rounded-full bg-red-500/10 mb-6">
                <AlertCircle className="text-red-500" size={48} />
            </div>
            <h1 className="text-2xl font-bold mb-4">Deal Not Found</h1>
            <Link href="/deals" className="text-indigo-400 font-bold hover:underline group flex items-center gap-2">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to all deals
            </Link>
        </div>
    );

    const isLocked = deal.accessLevel === 'restricted' && !user?.isVerified;

    return (
        <div className="min-h-screen bg-[#020617] pb-20">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4 pt-32">
                <Link href="/deals" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to marketplace
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-[2.5rem] p-8 md:p-12"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                                <div className="w-32 h-32 rounded-3xl bg-white border border-white/10 flex items-center justify-center p-6 shadow-2xl">
                                    <img src={deal.logoUrl} alt={deal.partnerName} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                                            {deal.category}
                                        </span>
                                        {deal.accessLevel === 'restricted' && (
                                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                                                <Lock size={12} /> Restricted
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-black font-outfit mb-3">{deal.title}</h1>
                                    <p className="text-xl text-indigo-400 font-semibold">{deal.partnerName}</p>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <h3 className="text-xl font-bold mb-4 text-white">About this offer</h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    {deal.description}
                                </p>

                                <h3 className="text-xl font-bold mb-4 text-white">Eligibility Conditions</h3>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                    <ul className="space-y-3">
                                        {deal.eligibilityConditions.split('.').filter(c => c.trim()).map((condition, idx) => (
                                            <li key={idx} className="flex gap-3 text-gray-300">
                                                <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                                                <span>{condition.trim()}.</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Action */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-32 glass-card rounded-[2rem] p-8 border-indigo-500/10 shadow-2xl shadow-indigo-500/5 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ShieldCheck size={120} className="text-indigo-500" />
                            </div>

                            <div className="text-center mb-8">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Deal Value</p>
                                <div className="text-4xl font-black text-white font-outfit mb-1">{deal.discount}</div>
                                <div className="text-xs text-indigo-400 font-bold uppercase">Verified Partner Offer</div>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                                    <AlertCircle size={18} className="shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {claimed ? (
                                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center animate-in fade-in zoom-in duration-500">
                                    <CheckCircle2 className="text-emerald-500 mx-auto mb-3" size={48} />
                                    <h4 className="text-lg font-bold text-emerald-400 mb-1">Deal Claimed!</h4>
                                    <p className="text-sm text-gray-400">Redirecting to your dashboard...</p>
                                </div>
                            ) : (
                                <button
                                    onClick={handleClaim}
                                    disabled={claiming}
                                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${isLocked
                                            ? 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/30'
                                        }`}
                                >
                                    {claiming ? <Loader2 className="animate-spin" /> : isLocked ? <Lock size={20} /> : 'Claim This Deal'}
                                </button>
                            )}

                            {isLocked && (
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-500 mb-3">This deal is restricted to verified early-stage founders.</p>
                                    <Link href="/dashboard" className="text-indigo-400 text-sm font-bold hover:underline">
                                        Verify your account
                                    </Link>
                                </div>
                            )}

                            <div className="mt-10 pt-10 border-t border-white/5 flex flex-col gap-4">
                                <button className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                                    <Share2 size={16} /> Share with your founder network
                                </button>
                                <button className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                                    <Copy size={16} /> Copy shareable link
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
