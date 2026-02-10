'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, Shield, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ThreeHero from '@/components/ThreeHero';

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      <ThreeHero />

      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-pink-500/10 blur-[120px] rounded-full" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8"
          >
            <Zap size={14} />
            <span>Trusted by 5000+ Founders</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold font-outfit tracking-tight mb-8"
          >
            Launch Your Startup <br />
            <span className="text-gradient">Without Breaking the Bank</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-gray-400 mb-10 leading-relaxed"
          >
            Get exclusive access to $100k+ in perks, credits, and discounts on SaaS tools like AWS, HubSpot, Stripe, and Notion. Designed specifically for early-stage teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register" className="group relative px-8 py-4 bg-indigo-600 rounded-full font-bold text-lg overflow-hidden transition-all hover:bg-indigo-700 shadow-xl shadow-indigo-500/25">
              <span className="relative z-10 flex items-center gap-2">
                Claim My Benefits <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/deals" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Browse All Deals
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trusted Services Marquee placeholder / Grid */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-12">Partnerships with the best</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Use real logo URLs or placeholders */}
            <div className="flex justify-center text-xl font-bold">AWS</div>
            <div className="flex justify-center text-xl font-bold">HubSpot</div>
            <div className="flex justify-center text-xl font-bold">Stripe</div>
            <div className="flex justify-center text-xl font-bold">Notion</div>
            <div className="flex justify-center text-xl font-bold">Figma</div>
            <div className="flex justify-center text-xl font-bold">DigitalOcean</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-[#03081c]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Rocket className="w-8 h-8 text-indigo-400" />}
              title="Accelerated Growth"
              description="Access tools that usually cost thousands for pennies, allowing you to scale faster."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-emerald-400" />}
              title="Verified Eligibility"
              description="Some perks are exclusive. Get verified to unlock premium enterprise-grade benefits."
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-amber-400" />}
              title="Instant Redemption"
              description="No long waiting lists. Claim your deals and get started within minutes."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-indigo-500" />
            <span className="text-lg font-bold font-outfit">StartupBenefits</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 StartupBenefits Platform. For Early-stage Startups.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl glass-card relative overflow-hidden group"
    >
      <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-indigo-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">{description}</p>
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {icon}
      </div>
    </motion.div>
  );
}
