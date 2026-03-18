import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Package, Users, BadgeDollarSign, LayoutDashboard, Menu, X } from "lucide-react";

interface SidebarItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    isOpen: boolean;
}

const SidebarItem = ({ to, icon, label, isOpen }: SidebarItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
            }`}
        >
            <span className={`${isActive ? "text-black" : "text-zinc-400 group-hover:text-white"}`}>
                {icon}
            </span>
            {isOpen && (
                <span className="text-sm font-medium whitespace-nowrap overflow-hidden transition-all">
                    {label}
                </span>
            )}
            {!isOpen && isActive && (
                <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
            )}
        </Link>
    );
};

const AppLayout: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-[#09090b] text-zinc-100">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#0c0c0e] border-r border-zinc-800/50 transition-all duration-300 ease-in-out ${
                    isOpen ? "w-64" : "w-20"
                }`}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between h-20 px-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1.5 rounded-lg shrink-0">
                            <Package className="text-black size-5" />
                        </div>
                        {isOpen && (
                            <span className="font-bold tracking-tight text-xl">StockFlow</span>
                        )}
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-3 space-y-2 mt-4">
                    <SidebarItem
                        to="/dashboard"
                        icon={<LayoutDashboard size={22} />}
                        label="Dashboard"
                        isOpen={isOpen}
                    />
                    <SidebarItem
                        to="/items"
                        icon={<Package size={22} />}
                        label="Items"
                        isOpen={isOpen}
                    />
                    <SidebarItem
                        to="/customers"
                        icon={<Users size={22} />}
                        label="Customers"
                        isOpen={isOpen}
                    />
                    <SidebarItem
                        to="/sales"
                        icon={<BadgeDollarSign size={22} />}
                        label="Sales"
                        isOpen={isOpen}
                    />
                </nav>

                {/* Toggle Button */}
                <div className="p-4 border-t border-zinc-800/50">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-center w-full py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
                    >
                        {isOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    isOpen ? "ml-64" : "ml-20"
                }`}
            >
                {/* Top Header */}
                <header className="h-20 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
                    <h1 className="text-sm font-medium text-zinc-400 uppercase tracking-widest">
                        Management System
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border border-zinc-600" />
                    </div>
                </header>

                {/* The Outlet - Content renders here */}
                <section className="p-8 max-w-7xl w-full mx-auto">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default AppLayout;
