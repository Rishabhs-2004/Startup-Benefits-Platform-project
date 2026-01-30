import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dealService } from '../services/api';
import Navbar from '../components/Navbar';
import { Loader, ArrowLeft, ExternalLink, Tag } from 'lucide-react';

const DealDetail = () => {
    const { id } = useParams();
    const [deal, setDeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeal = async () => {
            try {
                const data = await dealService.getDealById(id);
                setDeal(data);
            } catch (error) {
                console.error("Failed to fetch deal", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDeal();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-dark-bg flex items-center justify-center"><Loader className="animate-spin text-white" /></div>;

    if (!deal) return <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center text-white">Deal not found. <Link to="/deals" className="text-primary-400 mt-4">Go Back</Link></div>;

    return (
        <div className="min-h-screen bg-dark-bg">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 pt-32 pb-12">
                <Link to="/deals" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="mr-2" size={20} /> Back to Deals
                </Link>

                <div className="glass-card rounded-2xl p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-32 h-32 rounded-2xl bg-white/10 flex items-center justify-center p-4">
                            <img src={deal.logoUrl} alt={deal.partnerName} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <h1 className="text-4xl font-bold text-white">{deal.title}</h1>
                                <span className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium text-gray-300 border border-white/10">
                                    {deal.category}
                                </span>
                            </div>
                            <p className="text-xl text-primary-400 font-semibold mb-6">{deal.partnerName}</p>
                            <div className="prose prose-invert max-w-none text-gray-300 mb-8">
                                <p>{deal.description}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center p-6 bg-white/5 rounded-xl border border-white/5">
                                <div className="text-center sm:text-left flex-1">
                                    <span className="text-sm text-gray-400 uppercase tracking-wider">Exclusive Offer</span>
                                    <div className="text-3xl font-bold text-green-400">{deal.discount}</div>
                                </div>
                                <a
                                    href={deal.redemptionLink || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-500/20"
                                >
                                    Get Deal <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealDetail;
