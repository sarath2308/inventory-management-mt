import React from "react";
import { Package, BarChart3, ShieldCheck, Zap, ArrowRight } from "lucide-react"; // Using Lucide for clean icons
import { useNavigate } from "react-router-dom";

const InventoryLanding: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-zinc-800">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-800/50">
                <div className="flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded-lg">
                        <Package className="text-black size-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">StockFlow</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
                    <a href="#" className="hover:text-white transition-colors">
                        Features
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Analytics
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        Enterprise
                    </a>
                </div>
                <button
                    onClick={() => navigate("/login")}
                    className="px-5 py-2 bg-zinc-100 text-black text-sm font-semibold rounded-full hover:bg-zinc-300 transition-all"
                >
                    Get Started
                </button>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-24 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    v2.0 is now live
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                    Inventory control, <br />
                    redefined for speed.
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-zinc-400 mb-10 leading-relaxed">
                    Stop wrestling with spreadsheets. Real-time tracking, automated low-stock
                    alerts, and enterprise-grade analytics in one brutalist interface.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        Start Free Trial <ArrowRight size={18} />
                    </button>
                    <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all">
                        Book Demo
                    </button>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<Zap className="text-yellow-500" />}
                        title="Real-time Sync"
                        description="Every scan and sale updates your global inventory instantly. No lag, no double-entry."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="text-blue-500" />}
                        title="Predictive Analytics"
                        description="Forecasting tools that tell you what to order before you actually run out."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="text-emerald-500" />}
                        title="Audit Ready"
                        description="Full version history for every SKU. Know exactly who moved what and when."
                    />
                </div>
            </section>

            {/* Mock Dashboard Preview */}
            <section className="max-w-5xl mx-auto px-6 py-12">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-2 mb-4 px-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                    </div>
                    <div className="h-64 rounded-lg bg-[#0a0a0a] border border-zinc-800 flex items-center justify-center text-zinc-600 italic">
                        [ Interactive Dashboard Preview Placeholder ]
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) => (
    <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all group">
        <div className="mb-4 inline-block p-3 rounded-xl bg-zinc-800/50 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
    </div>
);

export default InventoryLanding;
