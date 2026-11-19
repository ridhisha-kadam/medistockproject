import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, Pill, CalendarClock, User, Store, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MobileBottomNav: React.FC = () => {
  const { user, isPharmacy, isAdmin } = useAuth();
  const location = useLocation();

  // Determine user account / dashboard path
  let dashboardPath = '/login';
  let dashboardLabel = 'Login';
  let DashboardIcon = User;

  if (user) {
    if (isAdmin) {
      dashboardPath = '/admin';
      dashboardLabel = 'Admin';
      DashboardIcon = ShieldCheck;
    } else if (isPharmacy) {
      dashboardPath = '/pharmacy';
      dashboardLabel = 'Pharmacy';
      DashboardIcon = Store;
    } else {
      dashboardPath = '/customer/reservations';
      dashboardLabel = 'Account';
      DashboardIcon = User;
    }
  }

  const navItems = [
    {
      to: '/',
      label: 'Find',
      icon: Search,
      isActive: location.pathname === '/' || location.pathname === '/search'
    },
    {
      to: '/catalog',
      label: 'Catalog',
      icon: Pill,
      isActive: location.pathname === '/catalog'
    },
    {
      to: '/customer/reservations',
      label: 'Orders',
      icon: CalendarClock,
      isActive: location.pathname === '/customer/reservations'
    },
    {
      to: dashboardPath,
      label: dashboardLabel,
      icon: DashboardIcon,
      isActive: location.pathname.startsWith(dashboardPath)
    }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 ${
                active
                  ? 'text-teal-600 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  active ? 'bg-teal-50 text-teal-600 scale-105' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
