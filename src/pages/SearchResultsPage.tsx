import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Phone, 
  CornerDownRight, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  Loader2, 
  SlidersHorizontal,
  Layers,
  ArrowUpDown,
  Pill,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { api, isListingStale, getCoordinatesForLocation } from '../services/api';
import { SearchResultItem, Medicine, Reservation } from '../types/database';
import { THERAPEUTIC_CATEGORIES, getMedicinesForDiseaseOrCategory } from '../data/medicineCatalogData';
import { StatusBadge } from '../components/StatusBadge';
import { MapWidget, MapMarkerItem } from '../components/MapWidget';
import { Modal } from '../components/Modal';
import { CallPharmacyModal } from '../components/CallPharmacyModal';
import { ReservationDetailsModal } from '../components/ReservationDetailsModal';
import { useAuth } from '../context/AuthContext';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const locParam = searchParams.get('loc') || '';
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');

  const [query, setQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [location, setLocation] = useState(locParam);
  const [userLat, setUserLat] = useState<number | undefined>(latParam ? parseFloat(latParam) : undefined);
  const [userLng, setUserLng] = useState<number | undefined>(lngParam ? parseFloat(lngParam) : undefined);

  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'stock' | 'price' | 'distance'>('stock');
  const [isCompareView, setIsCompareView] = useState<boolean>(false);
  const [callModalData, setCallModalData] = useState<{ name: string; phone: string } | null>(null);

  // Reservation Dialog State
  const [selectedItemForReservation, setSelectedItemForReservation] = useState<SearchResultItem | null>(null);
  const [reserveQuantity, setReserveQuantity] = useState<number>(1);
  const [reserveNotes, setReserveNotes] = useState<string>('');
  const [isSubmittingReservation, setIsSubmittingReservation] = useState<boolean>(false);
  const [confirmedReservationObject, setConfirmedReservationObject] = useState<Reservation | null>(null);
  const [selectedResForDetails, setSelectedResForDetails] = useState<Reservation | null>(null);
  const [reservationSuccessMessage, setReservationSuccessMessage] = useState<string | null>(null);
  const [reservationError, setReservationError] = useState<string | null>(null);
  const [reservationConfirmedData, setReservationConfirmedData] = useState<{
    reservationId: string;
    customerPhone: string;
    collectionDeadline: string;
    pharmacyName: string;
    pharmacyAddress: string;
    pharmacyPhone: string;
    medicineName: string;
    quantity: number;
    totalAmount: number;
  } | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Disease medicines resolver (e.g. searching "BP" or choosing "Blood Pressure (BP)")
  const diseaseInfo = getMedicinesForDiseaseOrCategory(selectedCategory || queryParam);

  // Auto-detect customer's live geolocation on mount if not already in URL
  useEffect(() => {
    if (!latParam || !lngParam) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLat(pos.coords.latitude);
            setUserLng(pos.coords.longitude);
          },
          (err) => {
            console.warn('Geolocation fallback to Dharwad reference:', err);
            setUserLat(15.4520);
            setUserLng(75.0110);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        setUserLat(15.4520);
        setUserLng(75.0110);
      }
    }
  }, []);

  // Sync state with search params changes
  useEffect(() => {
    setQuery(queryParam);
    setSelectedCategory(categoryParam);
    setLocation(locParam);
  }, [queryParam, categoryParam, locParam]);

  // Load results whenever search params, filters, or user location change
  useEffect(() => {
    loadResults();

    // Supabase Real-Time Stock Updates across devices
    const handleRealtimeStockUpdate = () => {
      loadResults();
    };
    window.addEventListener('medistock_stock_updated', handleRealtimeStockUpdate);
    return () => {
      window.removeEventListener('medistock_stock_updated', handleRealtimeStockUpdate);
    };
  }, [searchParams, inStockOnly, sortBy, userLat, userLng]);

  const loadResults = async () => {
    setIsLoading(true);
    try {
      const data = await api.searchMedicine({
        query: queryParam,
        category: categoryParam || selectedCategory,
        location: locParam === 'Current Location' ? '' : locParam,
        userLat: userLat,
        userLng: userLng,
        inStockOnly: inStockOnly,
        sortBy: sortBy,
      });
      setResults(data);
    } catch (err) {
      console.error('Error fetching search results:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextParams = new URLSearchParams();
    if (selectedCategory.trim()) nextParams.append('category', selectedCategory.trim());
    if (query.trim()) {
      nextParams.append('q', query.trim());
    }
    if (location.trim()) {
      nextParams.append('loc', location.trim());
      const coords = getCoordinatesForLocation(location.trim(), location.trim());
      setUserLat(coords.lat);
      setUserLng(coords.lng);
      nextParams.append('lat', coords.lat.toString());
      nextParams.append('lng', coords.lng.toString());
    } else if (userLat && userLng) {
      nextParams.append('lat', userLat.toString());
      nextParams.append('lng', userLng.toString());
    }
    setSearchParams(nextParams);
  };

  const handleCategoryChange = (newCat: string) => {
    setSelectedCategory(newCat);
    const nextParams = new URLSearchParams(searchParams);
    if (newCat) {
      nextParams.set('category', newCat);
      nextParams.delete('q'); // Clear search text so user sees all medicines for this category first
      setQuery('');
    } else {
      nextParams.delete('category');
    }
    setSearchParams(nextParams);
  };

  // Clicking a specific medicine under the disease (e.g. Amlodipine or Telmisartan for BP)
  const handleSelectMedicineFromDisease = (med: Medicine) => {
    setQuery(med.generic_name);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('q', med.generic_name);
    if (selectedCategory) nextParams.set('category', selectedCategory);
    setSearchParams(nextParams);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setLocation('Current Location');
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('lat', pos.coords.latitude.toString());
        nextParams.set('lng', pos.coords.longitude.toString());
        nextParams.set('loc', 'Current Location');
        setSearchParams(nextParams);
      },
      (err) => console.warn('Geolocation error:', err)
    );
  };

  // Format last updated date human-readable
  const formatLastUpdated = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Updated just now';
    if (diffHours === 1) return 'Updated 1 h ago';
    if (diffHours < 24) return `Updated ${diffHours} h ago`;
    if (diffHours < 48) return 'Updated yesterday';
    return `Updated ${Math.floor(diffHours / 24)} days ago`;
  };

  // Handle open reservation modal
  const handleOpenReservation = (item: SearchResultItem) => {
    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search));
      return;
    }
    setSelectedItemForReservation(item);
    setReserveQuantity(1);
    setReserveNotes('');
    setReservationSuccessMessage(null);
    setReservationError(null);
  };

  // Submit reservation
  const handleConfirmReservation = async () => {
    if (!selectedItemForReservation || !user) return;
    if (reserveQuantity < 1) {
      setReservationError('Please select a valid quantity of at least 1.');
      return;
    }
    if (reserveQuantity > selectedItemForReservation.quantity) {
      setReservationError(`Only ${selectedItemForReservation.quantity} units are available in stock.`);
      return;
    }

    setIsSubmittingReservation(true);
    setReservationError(null);

    try {
      const res = await api.createReservation({
        userId: user.id,
        pharmacyId: selectedItemForReservation.pharmacy_id,
        medicineId: selectedItemForReservation.medicine_id,
        quantity: reserveQuantity,
        notes: reserveNotes,
      });

      const deadline = new Intl.DateTimeFormat('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date(res.reservation.expires_at));

      const customerPhone = user.mobile_number || 'Registered Mobile';

      setConfirmedReservationObject(res.reservation);
      setReservationConfirmedData({
        reservationId: res.reservation.id,
        customerPhone: customerPhone,
        collectionDeadline: deadline,
        pharmacyName: selectedItemForReservation.pharmacy_name,
        pharmacyAddress: `${selectedItemForReservation.pharmacy_address}, ${selectedItemForReservation.city}`,
        pharmacyPhone: selectedItemForReservation.mobile_number || '',
        medicineName: selectedItemForReservation.medicine_name,
        quantity: reserveQuantity,
        totalAmount: selectedItemForReservation.price * reserveQuantity,
      });

      setReservationSuccessMessage(
        `Reservation Confirmed! SMS confirmation notification sent to +91 ${customerPhone}. Pickup end date: ${deadline}.`
      );
      // Reload results to reflect updated stock count
      await loadResults();
    } catch (err: any) {
      setReservationError(err.message || 'Failed to complete reservation.');
    } finally {
      setIsSubmittingReservation(false);
    }
  };

  // Markers for the map
  const mapMarkers: MapMarkerItem[] = results.map(r => ({
    id: r.pharmacy_id,
    name: r.pharmacy_name,
    address: r.pharmacy_address,
    latitude: r.latitude,
    longitude: r.longitude,
    price: r.price,
    status: r.status,
    isOutdated: false,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Search Controls Bar (Fig 9.2) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          {/* Disease / Therapeutic Category Dropdown */}
          <div className="w-full md:w-60 relative flex items-center">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all cursor-pointer"
            >
              <option value="">All Diseases & Categories</option>
              <option value="Blood Pressure (BP) and Hypertension">Blood Pressure (BP)</option>
              <option value="Diabetes and Blood Sugar">Diabetes / Sugar</option>
              <option value="Heart Diseases">Heart Diseases</option>
              <option value="Fever">Fever</option>
              <option value="Pain Relief">Pain Relief</option>
              <option value="Cold and Cough">Cold & Cough</option>
              <option value="Asthma and COPD">Asthma & COPD</option>
              <option value="Thyroid Disorders">Thyroid Disorders</option>
              <option value="Gastric Problems and Acidity">Gastric & Acidity</option>
              <option value="Bacterial Infections">Antibiotics & Infections</option>
              {THERAPEUTIC_CATEGORIES.filter(c => 
                !['Blood Pressure (BP) and Hypertension', 'Diabetes and Blood Sugar', 'Heart Diseases', 'Fever', 'Pain Relief', 'Cold and Cough', 'Asthma and COPD', 'Thyroid Disorders', 'Gastric Problems and Acidity', 'Bacterial Infections'].includes(c.name)
              ).map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search medicine (e.g. Amlodipine, Paracetamol) or disease (e.g. BP)"
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="w-full md:w-56 relative flex items-center">
            <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Area or pincode (e.g. Dharwad)"
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-sm transition-all text-sm whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </form>

        <div className="mt-2.5 flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={handleUseLocation}
            className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold"
          >
            <Navigation className="w-3.5 h-3.5" />
            Use my current location
          </button>
        </div>
      </div>

      {/* Disease Medicines Selection Bar (When BP or any disease is searched / selected) */}
      {diseaseInfo && diseaseInfo.medicines.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50/90 via-white to-emerald-50/50 p-6 rounded-2xl border-2 border-emerald-400 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                💊
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Medicines for {diseaseInfo.categoryName}
                </h3>
                <p className="text-xs text-emerald-800 font-medium">
                  {diseaseInfo.medicines.length} verified medicines. Click any medicine below to see nearby pharmacies with current stock & distance.
                </p>
              </div>
            </div>
            <Link
              to={`/catalog?category=${encodeURIComponent(diseaseInfo.categoryName)}`}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 shrink-0"
            >
              View all in catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {diseaseInfo.medicines.map((med) => {
              const isSelected = query.trim().toLowerCase() === med.generic_name.toLowerCase() || 
                                 query.trim().toLowerCase() === med.display_name.toLowerCase();
              return (
                <button
                  key={med.id}
                  onClick={() => handleSelectMedicineFromDisease(med)}
                  className={`p-3.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-950 shadow-md ring-2 ring-emerald-500 scale-[1.02]'
                      : 'bg-white hover:bg-emerald-50/80 text-slate-900 border-slate-200 hover:border-emerald-400 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="font-extrabold text-sm mb-1 line-clamp-1">{med.generic_name}</div>
                    <div className={`text-[11px] font-semibold ${isSelected ? 'text-emerald-200' : 'text-emerald-700'}`}>
                      {med.strength_form}
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100/30 flex items-center justify-between text-[10px] font-bold">
                    <span className={isSelected ? 'text-emerald-300' : 'text-slate-500'}>
                      {isSelected ? '✓ Showing Pharmacies' : 'View Pharmacies →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {isLoading ? (
              'Searching nearby pharmacies...'
            ) : queryParam ? (
              `${results.length} pharmacy listing${results.length === 1 ? '' : 's'} with stock for '${queryParam}'`
            ) : diseaseInfo ? (
              `Available pharmacy stock for ${diseaseInfo.categoryName} (${results.length} listings)`
            ) : results.length > 0 ? (
              `${results.length} pharmacy listings available`
            ) : (
              `0 pharmacy listings found`
            )}
          </h2>
          {locParam && (
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Showing results near <span className="font-semibold text-slate-700">{locParam}</span>
            </p>
          )}
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer font-medium text-slate-700 select-none bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            In stock only
          </label>

          <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="stock">Most stock</option>
              <option value="price">Lowest price</option>
              <option value="distance">Nearest distance</option>
            </select>
          </div>

          <button
            onClick={() => setIsCompareView(!isCompareView)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
              isCompareView 
                ? 'bg-emerald-700 text-white border-emerald-700' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {isCompareView ? 'Standard View' : 'Compare View'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
          <p className="text-sm font-medium">Checking live pharmacy inventories...</p>
        </div>
      ) : results.length === 0 ? (
        /* EXACT FIG 9.3: NO RESULTS SCREEN */
        <div className="max-w-2xl mx-auto my-12 bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mx-auto mb-6 text-emerald-700">
            <Search className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            No pharmacy reports '{queryParam || 'this item'}'
          </h3>

          <div className="text-left max-w-md mx-auto text-sm text-slate-600 space-y-2 mb-8">
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>Check the spelling of the medicine.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>Try the generic composition name instead of a brand.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>Widen the search area or call pharmacies directly.</span>
            </div>
          </div>

          <button
            onClick={() => {
              setQuery('');
              setLocation('');
              navigate('/search');
            }}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
          >
            Try another search
          </button>
        </div>
      ) : isCompareView ? (
        /* Compare Table View (SRS FR-05) */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Pharmacy</th>
                  <th className="p-4">Medicine & Form</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4">Listed Price</th>
                  <th className="p-4">Distance</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {results.map((item) => (
                  <tr key={item.inventory_id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{item.pharmacy_name}</div>
                      <div className="text-xs text-slate-500">{item.pharmacy_address}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{item.medicine_name}</div>
                      <div className="text-xs text-slate-500">{item.strength_form} • {item.generic_name}</div>
                    </td>
                    <td className="p-4">
                      <StatusBadge 
                        type="stock" 
                        status={item.status} 
                      />
                      <div className="text-[11px] text-slate-500 mt-1">{item.quantity} units</div>
                    </td>
                    <td className="p-4">
                      <span className="text-base font-bold text-slate-900">₹{item.price}</span>
                    </td>
                    <td className="p-4 text-xs font-bold text-blue-700 whitespace-nowrap">
                      {item.distance_km !== null && item.distance_km !== undefined ? (
                        <span className="inline-flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-blue-600" />
                          {item.distance_km} km
                        </span>
                      ) : '—'}
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {formatLastUpdated(item.last_updated)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenReservation(item)}
                        disabled={item.quantity <= 0}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Reserve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Split View: Pharmacy Cards on Left, Leaflet Map on Right (Fig 9.2) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Pharmacy Listing Cards */}
          <div className="lg:col-span-7 space-y-4">
            {results.map((item) => {
              const isStale = isListingStale(item.last_updated);
              return (
                <div
                  key={item.inventory_id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-900">{item.medicine_name}</h3>
                        {item.distance_km !== null && item.distance_km !== undefined && (
                          <span 
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs"
                            title="Turn-by-turn road driving distance"
                          >
                            <Navigation className="w-3 h-3 text-blue-600" />
                            ~ {item.distance_km} km (by road)
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-emerald-800">{item.pharmacy_name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {item.pharmacy_address}, {item.city} - {item.pin_code}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-2xl font-black text-slate-900">₹{item.price}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {formatLastUpdated(item.last_updated)}
                      </div>
                      <div className="mt-2">
                        <StatusBadge type="stock" status={item.status} />
                      </div>
                    </div>
                  </div>

                  {/* Actions Button Strip */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCallModalData({ name: item.pharmacy_name, phone: item.mobile_number })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        Call
                      </button>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1${
                          userLat && userLng ? `&origin=${userLat},${userLng}` : ''
                        }&destination=${encodeURIComponent(
                          `${item.pharmacy_name}, ${item.pharmacy_address}, ${item.city}, ${item.pin_code}`
                        )}&travelmode=driving`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                      >
                        <CornerDownRight className="w-3.5 h-3.5 text-emerald-600" />
                        Directions
                      </a>
                      <Link
                        to={`/pharmacy/${item.pharmacy_id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
                      >
                        View details
                      </Link>
                    </div>

                    <button
                      onClick={() => handleOpenReservation(item)}
                      disabled={item.quantity <= 0}
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Map */}
          <div className="lg:col-span-5 sticky top-20 h-[550px]">
            <MapWidget
              markers={mapMarkers}
              userLocation={userLat && userLng ? { lat: userLat, lng: userLng } : null}
              className="h-full w-full rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            />
          </div>
        </div>
      )}

      {/* Reservation Confirmation Modal */}
      <Modal
        isOpen={Boolean(selectedItemForReservation)}
        onClose={() => setSelectedItemForReservation(null)}
        title="Reserve Medicine for Counter Pickup"
      >
        {selectedItemForReservation && (
          <div className="space-y-4">
            {reservationConfirmedData ? (
              <div className="p-4 bg-emerald-50/95 border-2 border-emerald-400 rounded-2xl space-y-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <h4 className="font-extrabold text-emerald-950 text-base">Medicine Reservation Confirmed!</h4>
                  <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Reservation Ref ID: #{reservationConfirmedData.reservationId.slice(-6).toUpperCase()}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-white p-3.5 rounded-xl border border-emerald-200">
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block">📱 SMS Notification Sent To:</span>
                    <span className="font-bold text-slate-900">+91 {reservationConfirmedData.customerPhone}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block">📅 End Date & Time to Collect:</span>
                    <span className="font-bold text-emerald-800">{reservationConfirmedData.collectionDeadline}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block">📍 Pharmacy Pickup Counter:</span>
                    <span className="font-semibold text-slate-800">{reservationConfirmedData.pharmacyName}</span>
                    <span className="text-[11px] text-slate-500 block">{reservationConfirmedData.pharmacyAddress}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block">📞 Pharmacy Contact Number:</span>
                    <span className="font-semibold text-slate-800">{reservationConfirmedData.pharmacyPhone || 'Available at counter'}</span>
                  </div>
                </div>

                <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
                  ⏰ <strong>Pickup & Auto-Restoration Policy:</strong> Please collect your medicine before <strong>{reservationConfirmedData.collectionDeadline}</strong>. A reminder notification will be sent 30 minutes before this deadline. If not collected by the end date, reserved stock will automatically return to the pharmacy inventory.
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  {confirmedReservationObject && (
                    <button
                      type="button"
                      onClick={() => setSelectedResForDetails(confirmedReservationObject)}
                      className="px-4 py-2 bg-white border border-slate-300 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs"
                    >
                      View Reservation Details
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/customer/reservations')}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs"
                  >
                    View My Reservations
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItemForReservation(null);
                      setReservationConfirmedData(null);
                      setReservationSuccessMessage(null);
                    }}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : reservationSuccessMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-base">Reservation Confirmed!</h4>
                <p className="text-xs text-emerald-800">{reservationSuccessMessage}</p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => navigate('/customer/reservations')}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
                  >
                    View My Reservations
                  </button>
                  <button
                    onClick={() => setSelectedItemForReservation(null)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{selectedItemForReservation.medicine_name}</div>
                  <div className="text-slate-600">{selectedItemForReservation.pharmacy_name}</div>
                  <div className="text-slate-500">{selectedItemForReservation.pharmacy_address}</div>
                  <div className="text-emerald-700 font-bold mt-1">
                    Listed Price: ₹{selectedItemForReservation.price} per unit
                  </div>
                  <div className="text-slate-500">
                    Currently available in stock: {selectedItemForReservation.quantity} units
                  </div>
                </div>

                {reservationError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{reservationError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quantity to Reserve *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={selectedItemForReservation.quantity}
                    value={reserveQuantity}
                    onChange={(e) => setReserveQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Total Estimated Amount: ₹{(selectedItemForReservation.price * reserveQuantity).toFixed(2)}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pickup Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={reserveNotes}
                    onChange={(e) => setReserveNotes(e.target.value)}
                    placeholder="e.g. Arriving between 5 PM and 6 PM"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
                  <strong>Pickup Policy:</strong> Medicine reservations are held at the pharmacy counter for pickup. Valid prescription must be presented if required by pharmaceutical regulations. Payment is settled upon physical collection.
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedItemForReservation(null)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReservation}
                    disabled={isSubmittingReservation || selectedItemForReservation.quantity <= 0}
                    className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    {isSubmittingReservation ? (
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
      <CallPharmacyModal
        isOpen={Boolean(callModalData)}
        onClose={() => setCallModalData(null)}
        pharmacyName={callModalData?.name || ''}
        phoneNumber={callModalData?.phone || ''}
      />

      {/* Reservation Details Modal (Requirement 3) */}
      <ReservationDetailsModal
        isOpen={Boolean(selectedResForDetails)}
        onClose={() => setSelectedResForDetails(null)}
        reservation={selectedResForDetails}
        currentUser={user}
      />
    </div>
  );
};
