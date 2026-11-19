import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  CornerDownRight, 
  Loader2, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { api, isListingStale, calculateDistanceKm } from '../services/api';
import { Pharmacy, InventoryItem } from '../types/database';
import { StatusBadge } from '../components/StatusBadge';
import { MapWidget } from '../components/MapWidget';
import { Modal } from '../components/Modal';
import { CallPharmacyModal } from '../components/CallPharmacyModal';
import { EditPharmacyModal } from '../components/EditPharmacyModal';
import { useAuth } from '../context/AuthContext';
import { Edit3, Navigation } from 'lucide-react';

export const PharmacyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCallModalOpen, setIsCallModalOpen] = useState<boolean>(false);
  const [isEditPharmModalOpen, setIsEditPharmModalOpen] = useState<boolean>(false);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserCoords({ lat: 15.4520, lng: 75.0110 }),
        { timeout: 5000 }
      );
    } else {
      setUserCoords({ lat: 15.4520, lng: 75.0110 });
    }
  }, []);

  // Reservation dialog
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [isReserving, setIsReserving] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [reserveError, setReserveError] = useState<string | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadPharmacyDetails(id);
    }
  }, [id]);

  const loadPharmacyDetails = async (pharmacyId: string) => {
    setIsLoading(true);
    try {
      const p = await api.getPharmacyById(pharmacyId);
      setPharmacy(p);
      if (p) {
        const inv = await api.getInventory({ pharmacyId });
        setInventory(inv);
      }
    } catch (e) {
      console.error('Failed loading pharmacy details:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenReservation = (item: InventoryItem) => {
    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    setSelectedItem(item);
    setQuantity(1);
    setNotes('');
    setSuccessMessage(null);
    setReserveError(null);
  };

  const handleConfirmReservation = async () => {
    if (!selectedItem || !user || !pharmacy) return;

    if (quantity < 1) {
      setReserveError('Quantity must be at least 1.');
      return;
    }
    if (quantity > selectedItem.quantity) {
      setReserveError(`Only ${selectedItem.quantity} units currently available.`);
      return;
    }

    setIsReserving(true);
    setReserveError(null);

    try {
      const res = await api.createReservation({
        userId: user.id,
        pharmacyId: pharmacy.id,
        medicineId: selectedItem.medicine_id,
        quantity: quantity,
        notes: notes,
      });

      setSuccessMessage(
        `Reservation placed successfully! Ref ID: ${res.reservation.id.slice(0, 8)}...`
      );
      if (id) await loadPharmacyDetails(id);
    } catch (e: any) {
      setReserveError(e.message || 'Failed to place reservation.');
    } finally {
      setIsReserving(false);
    }
  };

  const formatLastUpdated = (isoString: string) => {
    const diffHours = Math.floor((Date.now() - new Date(isoString).getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Updated just now';
    if (diffHours === 1) return 'Updated 1 h ago';
    if (diffHours < 24) return `Updated ${diffHours} h ago`;
    if (diffHours < 48) return 'Updated yesterday';
    return `Updated ${Math.floor(diffHours / 24)} days ago`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
        <p className="text-sm font-medium">Loading pharmacy profile & stock data...</p>
      </div>
    );
  }

  if (!pharmacy) {
    return (
      <div className="max-w-xl mx-auto my-16 bg-white p-8 rounded-2xl border border-slate-200 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Pharmacy Not Found</h3>
        <p className="text-sm text-slate-600 mb-6">
          The requested pharmacy could not be found or has not yet been approved.
        </p>
        <Link
          to="/search"
          className="px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
        >
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Top Pharmacy Info Card + Mini Map (Exact Fig 9.4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-black text-slate-900">{pharmacy.name}</h1>
              {pharmacy.verification_status === 'APPROVED' && (
                <span className="inline-flex items-center text-emerald-600" title="Verified Pharmacy">
                  <ShieldCheck className="w-6 h-6" />
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 font-semibold mb-2">
              Licence No: {pharmacy.licence_number}
            </p>

            {userCoords && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                  <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  ~ {calculateDistanceKm(userCoords.lat, userCoords.lng, pharmacy.latitude, pharmacy.longitude)} km (road route from your location)
                </span>
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pharmacy.address}, {pharmacy.city}, {pharmacy.state} - {pharmacy.pin_code}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pharmacy.mobile_number} ({pharmacy.contact_person})</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pharmacy.opening_hours || '9:00 AM - 9:00 PM'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCallModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Call pharmacy
            </button>
            <a
              href={`https://www.google.com/maps/dir/?api=1${
                userCoords ? `&origin=${userCoords.lat},${userCoords.lng}` : ''
              }&destination=${encodeURIComponent(
                `${pharmacy.name}, ${pharmacy.address}, ${pharmacy.city}, ${pharmacy.state} ${pharmacy.pin_code}`
              )}&travelmode=driving`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors"
            >
              <CornerDownRight className="w-3.5 h-3.5 text-emerald-600" />
              Directions
            </a>

            {(user && (user.id === pharmacy.owner_user_id || user.role === 'ADMIN')) && (
              <button
                type="button"
                onClick={() => setIsEditPharmModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                Edit Details
              </button>
            )}
          </div>
        </div>

        {/* Map Widget Pin */}
        <div className="lg:col-span-5 h-56 rounded-xl overflow-hidden border border-slate-200">
          <MapWidget
            markers={[{
              id: pharmacy.id,
              name: pharmacy.name,
              address: pharmacy.address,
              latitude: pharmacy.latitude,
              longitude: pharmacy.longitude,
              status: 'AVAILABLE',
            }]}
            center={[pharmacy.latitude, pharmacy.longitude]}
            zoom={15}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* "Medicines reported by this pharmacy" Table (Exact Fig 9.4) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h2 className="text-base font-bold text-slate-900">
            Medicines reported by this pharmacy
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time stock reported directly by store management
          </p>
        </div>

        {inventory.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No medicines listed yet by this pharmacy.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-emerald-50/40 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Medicine</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Price</th>
                  <th className="px-6 py-3.5">Last updated</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">
                        {item.medicine?.display_name || 'Medicine'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.medicine?.category} • {item.medicine?.strength_form}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        type="stock"
                        status={item.status}
                        isStale={isListingStale(item.last_updated)}
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatLastUpdated(item.last_updated)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenReservation(item)}
                        disabled={item.quantity <= 0}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Reserve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Standing Disclaimer (Fig 9.4) */}
      <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <span>
          Availability is reported by pharmacies and may have changed since the last update. For essential medicines, call the pharmacy before travelling.
        </span>
      </div>

      {/* Reservation Modal */}
      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        title="Reserve Medicine"
      >
        {selectedItem && (
          <div className="space-y-4">
            {successMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-base">Reserved Successfully!</h4>
                <p className="text-xs text-emerald-800">{successMessage}</p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => navigate('/customer/reservations')}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
                  >
                    View My Reservations
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    {selectedItem.medicine?.display_name}
                  </div>
                  <div className="text-emerald-700 font-bold mt-1">
                    Listed Price: ₹{selectedItem.price} per unit
                  </div>
                  <div className="text-slate-500">
                    Stock available: {selectedItem.quantity} units
                  </div>
                </div>

                {reserveError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{reserveError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Required Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={selectedItem.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Total Estimated Amount: ₹{(selectedItem.price * quantity).toFixed(2)}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pickup Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Will pick up by 6 PM today"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReservation}
                    disabled={isReserving || selectedItem.quantity <= 0}
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {isReserving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Reserving...
                      </>
                    ) : (
                      'Confirm Reservation'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Call Pharmacy Modal for PC and Mobile Dialing */}
      {pharmacy && (
        <CallPharmacyModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
          pharmacyName={pharmacy.name}
          phoneNumber={pharmacy.mobile_number}
        />
      )}

      {/* Edit Pharmacy Details Modal */}
      {pharmacy && (
        <EditPharmacyModal
          isOpen={isEditPharmModalOpen}
          onClose={() => setIsEditPharmModalOpen(false)}
          pharmacy={pharmacy}
          onSuccess={(updated) => {
            setPharmacy(updated);
            if (id) loadPharmacyDetails(id);
          }}
        />
      )}
    </div>
  );
};
