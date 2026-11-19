import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Reservation, Bill, Alert } from '../types/database';
import { StatusBadge } from '../components/StatusBadge';
import { InvoiceModal } from '../components/InvoiceModal';
import { EditCustomerProfileModal } from '../components/EditCustomerProfileModal';
import { ReservationDetailsModal } from '../components/ReservationDetailsModal';
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  FileText, 
  Ban, 
  Printer, 
  Loader2, 
  ArrowLeft,
  Edit3,
  User,
  AlertCircle,
  Timer,
  CheckCircle2,
  Info,
  Store,
  Phone,
  Bell,
  Check
} from 'lucide-react';

export const CustomerReservationsPage: React.FC = () => {
  const { user, isCustomer } = useAuth();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeTab, setActiveTab] = useState<'reservations' | 'notifications' | 'bills'>('reservations');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [selectedResForDetails, setSelectedResForDetails] = useState<Reservation | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadReservations();

    // Live timer update every 30 seconds for accurate countdown
    const timerInterval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);

    const handleUpdate = () => loadReservations();
    window.addEventListener('medistock_alert_updated', handleUpdate);

    return () => {
      clearInterval(timerInterval);
      window.removeEventListener('medistock_alert_updated', handleUpdate);
    };
  }, [user]);

  const loadReservations = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      // First ensure expired reservations are processed and stock restored
      await api.checkAndExpireReservations();

      const [userBills, userRes, userAlerts] = await Promise.all([
        api.getUserBills(user.id),
        api.getUserReservations(user.id),
        api.getUserAlerts(user.id)
      ]);
      setBills(userBills);
      setReservations(userRes);
      setAlerts(userAlerts);
    } catch (e) {
      console.warn('Could not load reservations:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    if (!confirm('Are you sure you want to cancel this medicine reservation? The reserved stock will be returned to the pharmacy.')) return;
    try {
      await api.cancelReservation(reservationId, user?.id);
      await loadReservations();
    } catch (e: any) {
      alert(e.message || 'Failed to cancel reservation.');
    }
  };

  const handleViewReceipt = async (reservationId: string) => {
    try {
      // Check if bill exists
      const bill = bills.find(b => b.reservation_id === reservationId);
      if (bill) {
        setSelectedBill(bill);
      } else {
        // Generate on demand if completed
        const newBill = await api.generateBill(reservationId, user?.id);
        const fullBill = await api.getBillById(newBill.id);
        setSelectedBill(fullBill);
      }
    } catch (e: any) {
      alert(e.message || 'Could not retrieve receipt.');
    }
  };

  // 48-Hour countdown helper
  const getRemainingTime = (res: Reservation) => {
    const expiresAt = res.expires_at 
      ? new Date(res.expires_at).getTime() 
      : new Date(res.created_at).getTime() + 48 * 60 * 60 * 1000;
    const diffMs = expiresAt - currentTime;

    if (res.status === 'EXPIRED' || diffMs <= 0) {
      return {
        isExpired: true,
        isApproaching: false,
        text: 'Expired',
        hours: 0,
        minutes: 0,
      };
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const isApproaching = hours < 12;

    return {
      isExpired: false,
      isApproaching,
      text: `${hours}h ${minutes}m left`,
      hours,
      minutes,
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
        <p className="text-sm font-medium">Loading your medicine reservations...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 30-Minute Urgent Expiry Alert Banner */}
      {reservations.some(res => {
        const isActive = res.status === 'PENDING' || res.status === 'RESERVED' || res.status === 'ACCEPTED' || res.status === 'READY_FOR_COLLECTION';
        if (!isActive) return false;
        const exp = res.expires_at ? new Date(res.expires_at).getTime() : new Date(res.created_at).getTime() + 48*60*60*1000;
        const diff = exp - currentTime;
        return diff > 0 && diff <= 30 * 60 * 1000;
      }) && (
        <div className="bg-rose-50 border-2 border-rose-400 rounded-2xl p-4 mb-6 shadow-md flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold text-lg">
            ⏰
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-rose-950 mb-0.5">
              URGENT PICKUP REMINDER: Less Than 30 Minutes Remaining!
            </h4>
            <p className="text-xs text-rose-900 leading-relaxed font-medium">
              You have a medicine reservation expiring within 30 minutes! Please visit the pharmacy immediately to collect your medicine. If not collected by the deadline, reserved stock will be automatically returned to the pharmacy inventory.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            My Medicine Reservations
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track status of medicines reserved for counter pickup at verified local pharmacies.
          </p>
        </div>

        <Link
          to="/search"
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
        >
          Find More Medicines
        </Link>
      </div>

      {/* Customer Account Details Card with 1-Click Edit */}
      {user && (
        <div className="bg-gradient-to-r from-emerald-50/60 via-white to-slate-50 border border-emerald-200/80 rounded-2xl p-5 mb-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl shadow-sm shrink-0">
              {user.full_name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">{user.full_name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.email} • +91 {user.mobile_number}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {user.city}, {user.state} {user.pin_code && `— ${user.pin_code}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
            Edit Profile Details
          </button>
        </div>
      )}

      {/* 48-Hour Pickup Expiry Policy Alert Banner (Section 7 & 8) */}
      <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 mb-6 shadow-sm flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-emerald-900 mb-0.5">
            48-Hour Counter Pickup Policy
          </h4>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Please collect your medicine within <strong>48 hours</strong> of reservation. Once the 48-hour window elapses, reservations expire automatically and reserved stock is safely returned to pharmacy inventory for other patients.
          </p>
        </div>
      </div>

      {/* Navigation Tabs (Reservations / Notifications / Bills) */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'reservations'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          My Reservations ({reservations.length})
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          Notifications & SMS ({alerts.length})
          {alerts.some(a => !a.read_status) && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('bills')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'bills'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Billing Receipts ({bills.length})
        </button>
      </div>

      {/* TAB CONTENT: MY RESERVATIONS */}
      {activeTab === 'reservations' && (
        <>
          {reservations.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No reservations found</h3>
              <p className="text-xs text-slate-500 mb-6">
                You haven't reserved any medicine for counter pickup yet.
              </p>
              <Link
                to="/search"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Search Available Medicines
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((res) => {
                const remaining = getRemainingTime(res);
                const isActive = res.status === 'PENDING' || res.status === 'RESERVED' || res.status === 'ACCEPTED' || res.status === 'READY_FOR_COLLECTION';

                return (
                  <div
                    key={res.id}
                    className={`bg-white p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                      res.status === 'EXPIRED' 
                        ? 'border-rose-200/80 bg-rose-50/20' 
                        : remaining.isApproaching && isActive
                        ? 'border-amber-300 bg-amber-50/20'
                        : 'border-slate-200 hover:border-emerald-200 shadow-sm'
                    }`}
                  >
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">
                          {res.medicine?.display_name || 'Prescription Medicine'}
                        </span>
                        {res.variant_details && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {res.variant_details.strength} • {res.variant_details.dosage_form}
                          </span>
                        )}
                        <StatusBadge type="reservation" status={res.status} />
                      </div>

                      {/* Pharmacy Details Card */}
                      <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                          <Store className="w-4 h-4 text-emerald-700" />
                          <span>Pharmacy: {res.pharmacy?.name || 'Local Verified Pharmacy'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{res.pharmacy?.address}, {res.pharmacy?.city} {res.pharmacy?.pin_code && `- ${res.pharmacy.pin_code}`}</span>
                        </div>
                        {res.pharmacy?.mobile_number && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Contact: </span>
                            <a href={`tel:${res.pharmacy.mobile_number}`} className="font-semibold text-emerald-700 hover:underline">
                              +91 {res.pharmacy.mobile_number}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="text-xs text-slate-600 flex flex-wrap items-center gap-4 pt-1">
                        <span>Quantity: <strong>{res.quantity}</strong></span>
                        <span>Unit Price: <strong>₹{res.unit_price}</strong></span>
                        <span>Total Price: <strong className="text-emerald-700">₹{res.total_price}</strong></span>
                      </div>

                      {/* Customer Phone Notification & Collection End Date Info */}
                      <div className="mt-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-[11px] text-slate-500 font-medium block">📱 Registered Customer Phone:</span>
                          <span className="font-bold text-slate-900">+91 {user?.mobile_number || 'Registered'}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-500 font-medium block">📅 End Date & Time to Collect:</span>
                          <span className="font-bold text-emerald-800">
                            {new Date(res.expires_at || new Date(res.created_at).getTime() + 48*60*60*1000).toLocaleString('en-IN', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </span>
                        </div>
                      </div>

                      {/* 48-Hour Live Countdown / Expiry Status Display */}
                      {isActive && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                            remaining.isApproaching
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            <Timer className="w-3.5 h-3.5" />
                            {remaining.isApproaching ? `Approaching Deadline: ${remaining.text}` : `Collect within: ${remaining.text}`}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            (Deadline: {new Date(res.expires_at || new Date(res.created_at).getTime() + 48*60*60*1000).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })})
                          </span>
                        </div>
                      )}

                      {res.status === 'EXPIRED' && (
                        <div className="mt-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block text-rose-950 font-bold">Uncollected Reservation Expired — Stock Restored</strong>
                            <span>This medicine was not collected by the deadline. As per MediStock automated policy, reserved stock (+{res.quantity} units) has been automatically restored to {res.pharmacy?.name || 'pharmacy'} inventory.</span>
                          </div>
                        </div>
                      )}

                      {res.status === 'COMPLETED' && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Collected on {new Date(res.collected_at || res.created_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 self-stretch sm:self-center">
                      <button
                        type="button"
                        onClick={() => setSelectedResForDetails(res)}
                        className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300 transition-colors shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                        View Reservation Details
                      </button>

                      {res.status === 'COMPLETED' ? (
                        <button
                          onClick={() => handleViewReceipt(res.id)}
                          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          View Receipt
                        </button>
                      ) : isActive ? (
                        <button
                          onClick={() => handleCancelReservation(res.id)}
                          className="flex items-center justify-center gap-1 px-3 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          Cancel
                        </button>
                      ) : res.status === 'EXPIRED' ? (
                        <span className="text-[11px] text-slate-400 font-medium italic text-center py-1">
                          Expired
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* TAB CONTENT: NOTIFICATIONS & SMS ALERTS */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-700" />
                Customer Notifications & SMS Dispatches ({alerts.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Notifications dispatched to your registered phone number +91 {user?.mobile_number}.
              </p>
            </div>

            {alerts.some(a => !a.read_status) && (
              <button
                type="button"
                onClick={handleMarkAllAlertsRead}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline self-start sm:self-auto"
              >
                Mark all as read
              </button>
            )}
          </div>

          {alerts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-200">
              <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-600">No notifications yet</p>
              <p className="text-slate-400 mt-1">When you reserve a medicine, confirmation SMS and pickup deadline reminders will be listed here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  onClick={() => handleMarkAlertRead(a.id)}
                  className={`p-4 rounded-xl border text-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    a.read_status
                      ? 'bg-white border-slate-200 text-slate-600'
                      : 'bg-emerald-50/70 border-emerald-300 text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 mt-0.5 ${
                      a.type === 'RESERVATION_CONFIRMED'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : a.type === 'PICKUP_REMINDER_30M'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {a.type === 'RESERVATION_CONFIRMED'
                        ? '📱 SMS Confirmed'
                        : a.type === 'PICKUP_REMINDER_30M'
                        ? '⏰ 30-Min Reminder'
                        : '⚠️ Stock Restored'}
                    </span>
                    <p className="text-xs leading-relaxed">{a.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap self-end sm:self-auto">
                    {new Date(a.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: BILLING INVOICES */}
      {activeTab === 'bills' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              Counter Pickup Billing Receipts ({bills.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Official GST invoices generated upon collecting medicines at the pharmacy.
            </p>
          </div>

          {bills.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-200">
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-600">No invoices generated yet</p>
              <p className="text-slate-400 mt-1">Invoices appear here once you collect your medicine and settle payment at the pharmacy counter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Invoice No</th>
                    <th className="px-4 py-3">Pharmacy</th>
                    <th className="px-4 py-3">Medicine</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Total Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">{bill.bill_number}</td>
                      <td className="px-4 py-3 font-semibold text-emerald-800">{bill.pharmacy?.name || 'Pharmacy'}</td>
                      <td className="px-4 py-3 text-slate-700">{bill.medicine_name}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">{bill.quantity}</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">₹{bill.total_amount}</td>
                      <td className="px-4 py-3 text-slate-400 text-[11px]">{new Date(bill.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedBill(bill)}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-[11px] shadow-xs"
                        >
                          Print / PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Invoice Receipt Modal */}
      <InvoiceModal
        isOpen={Boolean(selectedBill)}
        onClose={() => setSelectedBill(null)}
        bill={selectedBill}
      />

      {/* Reservation Details Modal (Requirement 3) */}
      <ReservationDetailsModal
        isOpen={Boolean(selectedResForDetails)}
        onClose={() => setSelectedResForDetails(null)}
        reservation={selectedResForDetails}
        currentUser={user}
      />

      {/* Edit Customer Profile Modal */}
      <EditCustomerProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </div>
  );
};
