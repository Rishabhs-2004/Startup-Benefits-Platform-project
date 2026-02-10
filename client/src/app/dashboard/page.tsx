'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Claim } from '@/types';
import { claimService } from '@/lib/services';
import {
    User as UserIcon,
    Shield,
    ShieldCheck,
    Zap,
    Clock,
    CheckCircle,
    XCircle,
    Loader2,
    ArrowUpRight,
    ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const [claims, setClaims] = useState<Claim[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClaims = async () => {
            if (!user) return;
            try {
                const data = await claimService.getMyClaims();
                setClaims(data);
            } catch (err) {
                console.error('Failed to fetch claims', err);
            } finally {
                setLoading(false);
            }
        };
        fetchClaims();
    }, [user]);

    if (authLoading || (user && loading)) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-500" size={48} />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
                <Link href="/login" className="px-8 py-3 bg-indigo-600 rounded-full font-bold">Login</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] pb-20">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Profile Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card rounded-3xl p-8 sticky top-32"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-indigo-500/10 border-4 border-indigo-500/20 flex items-center justify-center mb-6 relative">
                                    <UserIcon size={48} className="text-indigo-400" />
                                    {user.isVerified && (
                                        <div className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full border-4 border-[#020617] text-white">
                                            <ShieldCheck size={16} />
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-2xl font-bold font-outfit mb-1">{user.name}</h2>
                                <p className="text-gray-500 text-sm mb-6">{user.email}</p>

                                <div className="w-full space-y-3">
                                    <div className={`p-4 rounded-2xl border text-left flex items-center gap-4 ${user.isVerified ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                                        <div className={`p-2 rounded-lg ${user.isVerified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {user.isVerified ? <ShieldCheck size={20} /> : <Shield size={20} />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account Status</p>
                                            <p className={`text-sm font-bold ${user.isVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                {user.isVerified ? 'Verified Startup' : 'Verification Pending'}
                                            </p>
                                        </div>
                                    </div>

                                    {!user.isVerified && (
                                        <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/10 transition-all text-gray-300">
                                            Apply for Verification
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Claims Section */}
                    <div className="lg:col-span-3 space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold font-outfit mb-2">Benefit Dashboard</h1>
                            <p className="text-gray-400">Track and manage your claimed perks and exclusive deals.</p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-indigo-500" size={32} />
                            </div>
                        ) : claims.length > 0 ? (
                            <div className="space-y-4">
                                {claims.map((claim, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={claim._id}
                                        className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6"
                                    >
                                        {/* @ts-ignore */}
                                        <div className="w-16 h-16 rounded-xl bg-white p-3 shrink-0 flex items-center justify-center">
                                            <img src={(claim.deal as any).logoUrl} alt="Logo" className="w-full h-full object-contain" />
                                        </div>

                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="font-bold text-lg mb-1">{(claim.deal as any).title}</h3>
                                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1.5"><Clock size={14} /> Claimed {new Date(claim.claimedAt).toLocaleDateString()}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                                                <span className="font-semibold text-indigo-400">{(claim.deal as any).discount}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status</p>
                                                <div className={`flex items-center gap-1.5 font-bold text-sm ${claim.status === 'approved' ? 'text-emerald-400' :
                                                        claim.status === 'rejected' ? 'text-red-400' : 'text-amber-400'
                                                    }`}>
                                                    {claim.status === 'approved' ? <CheckCircle size={14} /> :
                                                        claim.status === 'rejected' ? <XCircle size={14} /> : <Clock size={14} />}
                                                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                                                </div>
                                            </div>

                                            {claim.status === 'approved' ? (
                                                <a
                                                    href={(claim.deal as any).redemptionLink}
                                                    target="_blank"
                                                    className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-500/20"
                                                >
                                                    <ExternalLink size={20} />
                                                </a>
                                            ) : (
                                                <Link
                                                    href={`/deals/${(claim.deal as any)._id}`}
                                                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-white"
                                                >
                                                    <ArrowUpRight size={20} />
                                                </Link>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 glass-card rounded-3xl border-dashed">
                                <div className="p-6 rounded-full bg-white/5 inline-block mb-6">
                                    <Zap className="text-gray-600" size={48} />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">No perks claimed yet</h2>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start exploring our marketplace and boost your startup with exclusive benefits.</p>
                                <Link href="/deals" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all shadow-xl shadow-indigo-500/20">
                                    Browse Benefits
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
