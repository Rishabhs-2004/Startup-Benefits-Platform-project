import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dealService } from '../services/api';
import Navbar from '../components/Navbar';
import { Plus, Edit, Trash2, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDeal, setCurrentDeal] = useState(null); // If null, adding new. If object, editing.

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Design',
        discount: '',
        partnerName: '',
        logoUrl: '',
        redemptionLink: ''
    });

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        try {
            const data = await dealService.getAllDeals();
            setDeals(data);
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this deal?')) {
            try {
                await dealService.deleteDeal(id);
                setDeals(deals.filter(d => d._id !== id));
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };

    const handleEdit = (deal) => {
        setCurrentDeal(deal);
        setFormData({
            title: deal.title,
            description: deal.description,
            category: deal.category,
            discount: deal.discount,
            partnerName: deal.partnerName,
            logoUrl: deal.logoUrl,
            redemptionLink: deal.redemptionLink
        });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setCurrentDeal(null);
        setFormData({
            title: '',
            description: '',
            category: 'Design',
            discount: '',
            partnerName: '',
            logoUrl: '',
            redemptionLink: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentDeal) {
                const updated = await dealService.updateDeal(currentDeal._id, formData);
                setDeals(deals.map(d => d._id === updated._id ? updated : d));
            } else {
                const created = await dealService.createDeal(formData);
                setDeals([...deals, created]);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Save failed", error);
            alert("Failed to save deal");
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                    <button
                        onClick={handleAddNew}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} /> Add New Deal
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center"><Loader className="animate-spin text-primary-500" /></div>
                ) : (
                    <div className="bg-dark-card border border-white/5 rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 border-b border-white/5">
                                <tr>
                                    <th className="p-4">Deal</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Discount</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {deals.map(deal => (
                                    <tr key={deal._id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white">{deal.title}</div>
                                            <div className="text-sm text-gray-500">{deal.partnerName}</div>
                                        </td>
                                        <td className="p-4 text-gray-300">{deal.category}</td>
                                        <td className="p-4 text-primary-400 font-medium">{deal.discount}</td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(deal)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(deal._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-dark-card border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {currentDeal ? 'Edit Deal' : 'Add New Deal'}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Title</label>
                                    <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-dark-bg p-2 rounded border border-gray-700 text-white" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-dark-bg p-2 rounded border border-gray-700 text-white" rows="3" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Category</label>
                                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-dark-bg p-2 rounded border border-gray-700 text-white">
                                            {['Design', 'Development', 'Marketing', 'Productivity', 'Finance', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Discount</label>
                                        <input value={formData.discount} onChange={e => setFormData({ ...formData, discount: e.target.value })} className="w-full bg-dark-bg p-2 rounded border border-gray-700 text-white" required placeholder="e.g. 50% OFF" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Partner Name</label>
                                    <input value={formData.partnerName} onChange={e => setFormData({ ...formData, partnerName: e.target.value })} className="w-full bg-dark-bg p-2 rounded border border-gray-700 text-white" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Logo URL</label>
                                    <input value={formData.logoUrl} onChange={e => setFormData({ ...formData, logoUrl: e.target.value })} className="w-full bg-dark-bg p-2 rounded border border-gray-700 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Redemption Link</label>
                                    <input value={formData.redemptionLink} onChange={e => setFormData({ ...formData, redemptionLink: e.target.value })} className="w-full bg-dark-bg p-2 rounded border border-gray-700 text-white" />
                                </div>

                                <button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 rounded-lg mt-4">
                                    {currentDeal ? 'Update Deal' : 'Create Deal'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
