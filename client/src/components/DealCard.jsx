import { motion } from 'framer-motion';
import { Tag, ExternalLink } from 'lucide-react';

const DealCard = ({ deal }) => {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-xl overflow-hidden flex flex-col h-full group"
        >
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden p-2">
                        <img src={deal.logoUrl} alt={deal.partnerName} className="w-full h-full object-contain" />
                    </div>
                    <span className="bg-primary-500/10 text-primary-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-primary-500/20">
                        {deal.category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {deal.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {deal.description}
                </p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Discount</span>
                        <span className="text-green-400 font-bold">{deal.discount}</span>
                    </div>
                    <a
                        href={deal.redemptionLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary-500/10 text-primary-400 hover:bg-primary-500 hover:text-white transition-all"
                    >
                        <ExternalLink size={18} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default DealCard;
