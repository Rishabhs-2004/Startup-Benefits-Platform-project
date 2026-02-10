'use client';

import React from 'react';
import Link from 'next/link';
import { Deal } from '@/types';
import { motion } from 'framer-motion';
import { Shield, Lock, ExternalLink, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface DealCardProps {
    deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
    const { user } = useAuth();
    const isLocked = deal.accessLevel === 'restricted' && !user?.isVerified;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col glass-card rounded-3xl p-6 h-full transition-all hover:bg-white/[0.07] hover:border-white/20"
        >
            {/* Category Tag */}
            <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {deal.category}
                </span>
                {deal.accessLevel === 'restricted' && (
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isLocked ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'}`}>
                        {isLocked ? <Lock size={10} /> : <Shield size={10} />}
                        {isLocked ? 'Locked' : 'Unlocked'}
                    </span>
                )}
            </div>

            {/* Logo and Title */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-lg group-hover:scale-110 transition-transform bg-gray-50 overflow-hidden">
                    {deal.logoUrl ? (
                        <img src={deal.logoUrl} alt={deal.partnerName} className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-xl font-bold text-gray-900">{deal.partnerName[0]}</div>
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-400 transition-colors line-clamp-1">{deal.title}</h3>
                    <p className="text-gray-500 text-sm font-medium">{deal.partnerName}</p>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2 leading-relaxed">
                {deal.description}
            </p>

            {/* Price/Deal */}
            <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Exclusive Value</div>
                <div className="text-2xl font-black text-indigo-400 font-outfit">{deal.discount}</div>
            </div>

            {/* Action */}
            <Link
                href={`/deals/${deal._id}`}
                className="w-full py-3 px-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-500 font-bold transition-all text-center flex items-center justify-center gap-2"
            >
                View Details <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Locked Overlay Hint */}
            {isLocked && (
                <div className="absolute inset-0 rounded-3xl bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center pointer-events-none">
                    <p className="text-sm font-semibold text-white bg-amber-600 px-4 py-2 rounded-full shadow-xl">Verification Required</p>
                </div>
            )}
        </motion.div>
    );
};

export default DealCard;
