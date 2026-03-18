import {
    Users,
    Package,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    History,
    ShoppingCart,
    AlertCircle,
} from "lucide-react";

const DashboardPage = () => {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                        Dashboard
                    </h1>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
                        Real-time system telemetry
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-[#0c0c0e] border border-zinc-800 p-2 rounded-xl">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse ml-2" />
                    <span className="text-[10px] font-black text-white uppercase pr-2">
                        System Online
                    </span>
                </div>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Revenue",
                        value: "₹4,20,500",
                        icon: <DollarSign />,
                        trend: "+12.5%",
                        positive: true,
                    },
                    {
                        label: "Active Customers",
                        value: "1,240",
                        icon: <Users />,
                        trend: "+4.2%",
                        positive: true,
                    },
                    {
                        label: "Inventory Units",
                        value: "856",
                        icon: <Package />,
                        trend: "-2.1%",
                        positive: false,
                    },
                    {
                        label: "Conversion",
                        value: "18.2%",
                        icon: <Activity />,
                        trend: "+0.8%",
                        positive: true,
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-[#0c0c0e] border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                                {stat.icon}
                            </div>
                            <div
                                className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded ${stat.positive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}
                            >
                                {stat.positive ? (
                                    <ArrowUpRight size={10} />
                                ) : (
                                    <ArrowDownRight size={10} />
                                )}
                                {stat.trend}
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            {stat.label}
                        </p>
                        <h2 className="text-2xl font-black text-white mt-1">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Transactions Table Mock */}
                <div className="lg:col-span-2 bg-[#0c0c0e] border border-zinc-800 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/20">
                        <div className="flex items-center gap-2">
                            <History size={18} className="text-zinc-500" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">
                                Recent Sales Activity
                            </h3>
                        </div>
                        <button className="text-[10px] font-black uppercase text-zinc-500 hover:text-white transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 font-black">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">
                                                Customer Transaction #{1024 + i}
                                            </p>
                                            <p className="text-[10px] font-mono text-zinc-600">
                                                UPI • 12:4{i} PM
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right text-sm font-black text-white">
                                        +₹300
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Quick Actions & Alerts */}
                <div className="space-y-6">
                    <div className="bg-[#0c0c0e] border border-zinc-800 rounded-3xl p-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6">
                            Stock Alerts
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: "Wireless Headphones", stock: 2 },
                                { name: "USB-C Hubs", stock: 4 },
                                { name: "Gaming Mouse", stock: 1 },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-red-500/5 border border-red-900/30 p-3 rounded-xl flex items-center gap-3"
                                >
                                    <AlertCircle size={14} className="text-red-600" />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-zinc-300">
                                            {item.name}
                                        </p>
                                        <p className="text-[10px] text-red-600 font-black uppercase">
                                            Low stock: {item.stock} left
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 overflow-hidden relative group cursor-pointer">
                        <div className="relative z-10">
                            <ShoppingCart className="text-black mb-4" size={24} />
                            <h3 className="text-lg font-black text-black leading-tight uppercase italic">
                                Inventory
                                <br />
                                Management
                            </h3>
                            <p className="text-black/60 text-xs font-bold mt-2 uppercase tracking-tighter">
                                Click to update stock level
                            </p>
                        </div>
                        <ArrowUpRight
                            className="absolute top-4 right-4 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                            size={20}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
