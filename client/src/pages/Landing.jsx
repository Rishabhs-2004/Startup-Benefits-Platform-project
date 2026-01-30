import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Shield, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
    return (
        <div className="min-h-screen bg-dark-bg">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 transform -translate-x-1/2 left-1/2 w-full h-[500px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                    >
                        Supercharge Your <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                            Startup Journey
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 max-w-2xl mx-auto text-xl text-gray-400"
                    >
                        Access exclusive deals on the best tools, designed to help early-stage startups and indie hackers move fast and save money.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-8 flex justify-center gap-4"
                    >
                        <Link to="/signup" className="px-8 py-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all">
                            Get Exclusive Access
                        </Link>
                        <Link to="/deals" className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-lg transition-all">
                            Browse Deals
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-dark-card/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Rocket className="w-8 h-8 text-purple-400" />}
                            title="Growth Tools"
                            description="Scale faster with discounts on marketing, analytics, and sales tools."
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-yellow-400" />}
                            title="Developer First"
                            description="Cloud credits, hosting deals, and dev tools tailored for tech teams."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-green-400" />}
                            title="Verified Partners"
                            description="We partner directly with companies to bring you verified and valid codes."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
        <div className="mb-4 inline-block p-3 rounded-xl bg-white/5">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

export default Landing;
