import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Alert } from '../types/database';
import { LogOut, User, Store, ShieldCheck, Search, ShoppingBag, Edit2, BookOpen, Bell, CheckCircle2, Clock, AlertTriangle, X } from 'lucide-react';
import { EditCustomerProfileModal } from './EditCustomerProfileModal';

export const Navbar: React.FC = () => {
  const { user, pharmacy, isCustomer, isPharmacy, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setAlerts([]);
      return;
    }

    const loadAlerts = async () => {
      try {
        let userAlerts: Alert[] = [];
        if (user.role === 'PHARMACY') {
          let pharmId = pharmacy?.id;
          if (!pharmId) {
            const pharms = await api.getPharmacies({ onlyApproved: false });
            pharmId = pharms.find(p => p.owner_user_id === user.id || (user.email && p.email?.toLowerCase() === user.email.toLowerCase()))?.id;
          }
          if (pharmId) {
            userAlerts = await api.getPharmacyAlerts(pharmId);
          } else {
            userAlerts = await api.getUserAlerts(user.id);
          }
        } else if (user.role === 'ADMIN') {
          userAlerts = await api.getAdminAlerts();
        } else {
          userAlerts = await api.getUserAlerts(user.id);
        }
        setAlerts(userAlerts);
      } catch (e) {
        console.warn('Could not load alerts:', e);
      }
    };

    loadAlerts();
    const timer = setInterval(loadAlerts, 10000);

    const handleUpdate = () => loadAlerts();
    window.addEventListener('medistock_alert_updated', handleUpdate);

    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(timer);
      window.removeEventListener('medistock_alert_updated', handleUpdate);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user, pharmacy]);

  const unreadAlerts = alerts.filter(a => !a.read_status);
  const unreadCount = unreadAlerts.length;

  const handleMarkAllRead = async () => {
    if (!user) return;
    try {
      await api.markAllUserAlertsAsRead(user.id);
      setAlerts(prev => prev.map(a => ({ ...a, read_status: true })));
    } catch (e) {
      console.warn('Error marking all read:', e);
    }
  };

  const handleNotificationClick = async (alertItem: Alert) => {
    try {
      await api.markAlertAsRead(alertItem.id);
      setAlerts(prev => prev.map(a => a.id === alertItem.id ? { ...a, read_status: true } : a));
    } catch (_) {}
    setIsNotificationOpen(false);
    if (isCustomer) {
      navigate('/customer/reservations');
    } else if (isPharmacy) {
      navigate('/pharmacy');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isSearchActive = location.pathname === '/search';
  const isCatalogActive = location.pathname.startsWith('/catalog');
  const isPharmacyDashboardActive = location.pathname.startsWith('/pharmacy');
  const isAdminDashboardActive = location.pathname.startsWith('/admin');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-sm group-hover:bg-emerald-700 transition-colors">
            +
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
            MediStock
          </span>
        </Link>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            to="/search"
            className={`flex items-center gap-1.5 transition-colors ${
              isSearchActive ? 'text-emerald-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            Find medicine
          </Link>

          <Link
            to="/catalog"
            className={`flex items-center gap-1.5 transition-colors ${
              isCatalogActive ? 'text-emerald-700 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Medicine Catalog
          </Link>

          {isCustomer && (
            <Link
              to="/customer/reservations"
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              My Reservations
            </Link>
          )}

          {isPharmacy && (
            <Link
              to="/pharmacy"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                isPharmacyDashboardActive 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              Pharmacy dashboard
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                isAdminDashboardActive 
                  ? 'bg-emerald-800 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Right Authentication Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notification Bell Icon */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className={`relative p-2 rounded-xl transition-all border ${
                    isNotificationOpen
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border-slate-200'
                  }`}
                  title="View Notifications & SMS Alerts"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse shadow-sm">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown Menu */}
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                          <Bell className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-extrabold text-slate-900">Notifications & Alerts</h4>
                        {unreadCount > 0 && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={handleMarkAllRead}
                          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 px-2 py-1">
                      {alerts.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 opacity-60" />
                          <p className="font-semibold text-slate-600">No notifications yet</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Your medicine reservation updates, collection deadlines, and 30-min reminders will appear here.
                          </p>
                        </div>
                      ) : (
                        alerts.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif)}
                            className={`p-3 rounded-xl transition-all cursor-pointer text-xs space-y-1.5 ${
                              notif.read_status
                                ? 'hover:bg-slate-50 text-slate-600'
                                : 'bg-emerald-50/70 hover:bg-emerald-50 text-slate-900 font-medium'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                notif.type === 'RESERVATION_CONFIRMED'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : notif.type === 'PICKUP_REMINDER_30M'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : notif.type === 'STOCK_AUTO_RESTORED' || notif.type === 'RESERVATION_EXPIRED'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : notif.type === 'NEW_RESERVATION'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                {notif.type === 'RESERVATION_CONFIRMED'
                                  ? '📱 SMS Dispatched'
                                  : notif.type === 'PICKUP_REMINDER_30M'
                                  ? '⏰ 30-Min Reminder'
                                  : notif.type === 'STOCK_AUTO_RESTORED'
                                  ? '⚠️ Stock Restored'
                                  : notif.type === 'RESERVATION_EXPIRED'
                                  ? '❌ Expired'
                                  : notif.type === 'NEW_RESERVATION'
                                  ? '🔔 New Reservation'
                                  : 'Notice'}
                              </span>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                {new Date(notif.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                              </span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-800">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="px-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400">
                        Mobile: +91 {user?.mobile_number || 'Registered'}
                      </span>
                      {isCustomer ? (
                        <button
                          type="button"
                          onClick={() => {
                            setIsNotificationOpen(false);
                            navigate('/customer/reservations');
                          }}
                          className="text-emerald-700 font-bold hover:underline text-xs"
                        >
                          My Reservations →
                        </button>
                      ) : isPharmacy ? (
                        <button
                          type="button"
                          onClick={() => {
                            setIsNotificationOpen(false);
                            navigate('/pharmacy');
                          }}
                          className="text-emerald-700 font-bold hover:underline text-xs"
                        >
                          Pharmacy Dashboard →
                        </button>
                      ) : isAdmin ? (
                        <button
                          type="button"
                          onClick={() => {
                            setIsNotificationOpen(false);
                            navigate('/admin');
                          }}
                          className="text-emerald-700 font-bold hover:underline text-xs"
                        >
                          Admin Dashboard →
                        </button>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              {/* Clickable Profile Pill */}
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/60 transition-all text-left group"
                title="Click to view and edit profile details"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white text-emerald-800 flex items-center justify-center font-bold text-xs transition-colors">
                  {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 transition-colors flex items-center gap-1">
                    {user.full_name}
                    <Edit2 className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 opacity-60 group-hover:opacity-100" />
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    {user.role}
                  </span>
                </div>
              </button>

              {isAdmin && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ADMIN
                </span>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-700 hover:text-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
              >
                Create account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>

      {/* Edit Customer / User Profile Modal */}
      <EditCustomerProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};
