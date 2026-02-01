import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dealService } from '../services/api';
import DealCard from '../components/DealCard';
import Navbar from '../components/Navbar';
import { Search, Filter, Loader } from 'lucide-react';

const Dashboard = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        document.title = "Browse Deals | Startup Benefits";
        const fetchDeals = async () => {
            try {
                const data = await dealService.getAllDeals();
                setDeals(data);
            } catch (error) {
                console.error("Failed to fetch deals", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    const categories = ['All', 'Design', 'Development', 'Marketing', 'Productivity', 'Finance', 'Other'];

    const filteredDeals = deals.filter(deal => {
        const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deal.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || deal.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-dark-bg">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Startup Deals</h1>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search deals..."
                                className="pl-10 pr-4 py-2 bg-dark-card border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            {/* Simple select for mobile/desktop, or custom dropdown */}
                            <select
                                className="pl-4 pr-8 py-2 bg-dark-card border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 appearance-none w-full md:w-48 cursor-pointer"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-primary-500" size={48} />
                    </div>
                ) : (
                    <>
                        {filteredDeals.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredDeals.map(deal => (
                                    <DealCard key={deal._id} deal={deal} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-lg">No deals found matching your criteria.</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
