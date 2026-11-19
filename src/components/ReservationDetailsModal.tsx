import React from 'react';
import { Reservation, Profile } from '../types/database';
import { StatusBadge } from './StatusBadge';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Store, 
  Pill, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Printer, 
  FileText, 
  Tag,
  Building2,
  FileCheck
} from 'lucide-react';

interface ReservationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation | null;
  currentUser?: Profile | null;
}

export const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  isOpen,
  onClose,
  reservation,
  currentUser,
}) => {
  if (!isOpen || !reservation) return null;

  // Resolve Customer Details (prioritize registered profile, fallback to snapshot)
  const customerName = 
    reservation.user?.full_name || 
    reservation.customer_name || 
    (currentUser?.role === 'CUSTOMER' ? currentUser.full_name : null) || 
    'Registered Customer';

  const customerPhone = 
    reservation.user?.mobile_number || 
    reservation.customer_phone || 
    (currentUser?.role === 'CUSTOMER' ? currentUser.mobile_number : null) || 
    'Registered Contact';

  const customerEmail = 
    reservation.user?.email || 
    reservation.customer_email || 
    (currentUser?.role === 'CUSTOMER' ? currentUser.email : null) || 
    '';

  const customerCity = 
    reservation.user?.city || 
    (currentUser?.role === 'CUSTOMER' ? currentUser.city : '') || 
    '';

  // Resolve Pharmacy Details
  const pharmacyName = 
    reservation.pharmacy?.name || 
    reservation.pharmacy_name || 
    'Verified Pharmacy';

  const pharmacyAddress = 
    reservation.pharmacy?.address || 
    reservation.pharmacy_address || 
    'Counter Address on file';

  const pharmacyCity = reservation.pharmacy?.city || '';
  const pharmacyState = reservation.pharmacy?.state || '';
  const pharmacyPin = reservation.pharmacy?.pin_code || '';
  const pharmacyFullAddress = [pharmacyAddress, pharmacyCity, pharmacyState, pharmacyPin]
    .filter(Boolean)
    .join(', ');

  const pharmacyPhone = 
    reservation.pharmacy?.mobile_number || 
    reservation.pharmacy_phone || 
    'Available at counter';

  const pharmacyLicence = reservation.pharmacy?.licence_number || 'Verified DL';

  // Resolve Medicine Details
  const medicineName = 
    reservation.medicine?.display_name || 
    reservation.medicine_name || 
    'Prescription Medicine';

  const medicineCategory = 
    reservation.medicine?.category || 
    reservation.medicine_category || 
    'General Medicine';

  const medicineStrength = 
    reservation.variant_details || 
    reservation.medicine?.strength_form || 
    reservation.medicine_strength || 
    'Standard Dosage';

  const medicineComposition = 
    reservation.medicine?.composition || 
    reservation.medicine?.active_ingredient || 
    reservation.medicine_composition || 
    'Standard active pharmaceutical ingredient';

  const formattedOrderDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(reservation.created_at));

  const pickupDeadlineDate = reservation.expires_at 
    ? new Date(reservation.expires_at) 
    : new Date(new Date(reservation.created_at).getTime() + 48 * 60 * 60 * 1000);

  const formattedPickupDeadline = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(pickupDeadlineDate);

  const isExpired = reservation.status === 'EXPIRED' || (Date.now() > pickupDeadlineDate.getTime() && reservation.status === 'PENDING');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center font-black text-xl border border-white/20">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">Reservation Details</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs border border-white/20">
                  ID: #{reservation.id.slice(-8).toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Official MediStock counter pickup order record
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Status & Deadline Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Reservation Status</span>
                <div className="mt-1">
                  <StatusBadge type="reservation" status={reservation.status} />
                </div>
              </div>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Last Date & Time to Pick Up
              </span>
              <span className={`text-xs font-black flex items-center gap-1.5 mt-0.5 ${isExpired ? 'text-rose-700' : 'text-emerald-800'}`}>
                <Clock className="w-3.5 h-3.5" />
                {formattedPickupDeadline}
              </span>
            </div>
          </div>

          {/* TWO DEDICATED SECTIONS: A. CUSTOMER DETAILS & B. PHARMACY DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* SECTION A: CUSTOMER DETAILS */}
            <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-200/60">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                    A. Customer Details
                  </h3>
                  <span className="text-[10px] text-emerald-700">Registered account details</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Customer Full Name:</span>
                  <span className="font-extrabold text-slate-900 text-sm block">
                    {customerName}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Registered Phone Number:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    +91 {customerPhone}
                  </span>
                </div>

                {customerEmail && (
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Email Address:</span>
                    <span className="text-slate-700 font-medium flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {customerEmail}
                    </span>
                  </div>
                )}

                {customerCity && (
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Customer City:</span>
                    <span className="text-slate-700 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {customerCity}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION B: PHARMACY DETAILS */}
            <div className="bg-blue-50/40 rounded-2xl p-4 border border-blue-200/80 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-blue-200/60">
                <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-950">
                    B. Pharmacy Details
                  </h3>
                  <span className="text-[10px] text-blue-700">Selected pickup counter</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Pharmacy Name:</span>
                  <span className="font-extrabold text-slate-900 text-sm block">
                    {pharmacyName}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Complete Physical Address:</span>
                  <span className="text-slate-800 font-medium flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{pharmacyFullAddress || pharmacyAddress}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Pharmacy Phone Number:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-700" />
                    <a href={`tel:${pharmacyPhone}`} className="text-blue-800 hover:underline">
                      +91 {pharmacyPhone}
                    </a>
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block font-medium">Drug Licence Number:</span>
                  <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {pharmacyLicence}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION C: RESERVATION & MEDICINE INFORMATION */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Pill className="w-4 h-4 text-emerald-700" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Reservation Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Reserved Medicine Name</span>
                <span className="font-black text-slate-900 text-sm block mt-0.5">
                  {medicineName}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Medicine Category</span>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md font-bold text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {medicineCategory}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Strength / Formulation</span>
                <span className="font-bold text-slate-800 block mt-0.5">
                  {medicineStrength}
                </span>
              </div>

              <div className="sm:col-span-2 md:col-span-3">
                <span className="text-[11px] text-slate-500 font-semibold block">Composition / Active Ingredients</span>
                <span className="font-medium text-slate-700 block mt-0.5 bg-white p-2.5 rounded-xl border border-slate-200">
                  {medicineComposition}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Reserved Quantity</span>
                <span className="font-extrabold text-slate-900 text-sm block mt-0.5">
                  {reservation.quantity} unit(s)
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Unit Price / Total Price</span>
                <span className="font-extrabold text-emerald-700 text-sm block mt-0.5">
                  ₹{reservation.unit_price} each (Total: ₹{reservation.total_price})
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Order Date & Time</span>
                <span className="font-medium text-slate-700 block mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {formattedOrderDate}
                </span>
              </div>
            </div>

            {reservation.notes && (
              <div className="pt-2 border-t border-slate-200 text-xs">
                <span className="text-[11px] text-slate-500 font-semibold block">Customer Notes:</span>
                <p className="text-slate-700 italic mt-0.5">"{reservation.notes}"</p>
              </div>
            )}
          </div>

          {/* Collection & Counter Protocol Notice */}
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Counter Pickup Instructions:</span>
              <span>
                Please present this Reservation Ref ID <strong>#{reservation.id.slice(-8).toUpperCase()}</strong> or your registered phone number (+91 {customerPhone}) at the pharmacy counter. Reserved stock is held until <strong>{formattedPickupDeadline}</strong>.
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            Print Details
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
