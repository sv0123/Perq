import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    CreditCard,
    ShoppingBag,
    Bitcoin,
    BarChart3,
    Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
    name: string;
    path: string;
    icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My Cards', path: '/cards', icon: CreditCard },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Crypto Gateway', path: '/crypto', icon: Bitcoin },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Perq Plus', path: '/plus', icon: Sparkles },
];

/**
 * iOS-style Sidebar navigation with smooth transitions
 */
const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-ios-white border-r border-ios-gray-200 flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-ios-gray-100">
                <h1 className="text-title-1 font-bold text-ios-black">Perq</h1>
                <p className="text-footnote text-ios-gray-600 mt-1">
                    Rewards Platform
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 overflow-y-auto">
                <ul className="space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-3 mx-3 rounded-ios transition-all duration-200 tap-feedback',
                                        isActive
                                            ? 'bg-ios-black text-ios-white font-semibold'
                                            : 'text-ios-gray-700 hover:bg-ios-gray-50'
                                    )}
                                >
                                    <Icon className={cn('w-5 h-5', isActive ? 'text-ios-white' : 'text-ios-gray-600')} />
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-ios-gray-100">
                <div className="text-center">
                    <p className="text-caption text-ios-gray-500">Version 0.1.0</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
