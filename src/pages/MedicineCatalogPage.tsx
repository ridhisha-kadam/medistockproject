import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Medicine, MedicineVariant, TherapeuticCategory, SearchResultItem, Reservation } from '../types/database';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/Modal';
import { ReservationDetailsModal } from '../components/ReservationDetailsModal';
import { 
  Search, 
  ArrowLeft, 
  Pill, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Phone, 
  FileText, 
  ExternalLink, 
  Activity, 
  Sparkles, 
  Layers, 
  Check, 
  Info,
  Calendar,
  Lock,
  Loader2,
  ChevronRight
} from 'lucide-react';

export const MedicineCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isCustomer } = useAuth();

  const [categories, setCategories] = useState<(TherapeuticCategory & { count: number })[]>([]);
  const [allMedicines, setAllMedicines] = useState<Medicine[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('category'));
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [categorySearch, setCategorySearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Medicine Detail & Real Stock Lookup Modal
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<MedicineVariant | null>(null);
  const [pharmacyStock, setPharmacyStock] = useState<SearchResultItem[]>([]);
  const [stockSortBy, setStockSortBy] = useState<'price' | 'stock' | 'distance'>('price');
  const [isLoadingStock, setIsLoadingStock] = useState<boolean>(false);
  const [reserveSuccess, setReserveSuccess] = useState<string | null>(null);
  const [reserveError, setReserveError] = useState<string | null>(null);
  const [isReserving, setIsReserving] = useState<boolean>(false);
  const [confirmedReservationObject, setConfirmedReservationObject] = useState<Reservation | null>(null);
  const [selectedResForDetails, setSelectedResForDetails] = useState<Reservation | null>(null);
  const [reservationConfirmedData, setReservationConfirmedData] = useState<{
    reservationId: string;
    customerPhone: string;
    collectionDeadline: string;
    pharmacyName: string;
    pharmacyAddress: string;
    pharmacyPhone: string;
    medicineName: string;
    quantity: number;
    price: number;
  } | null>(null);

  useEffect(() => {
    loadCatalogData();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const loadCatalogData = async () => {
    setIsLoading(true);
    try {
      const [cats, meds] = await Promise.all([
        api.getTherapeuticCategories(),
        api.getMedicines()
      ]);
      setCategories(cats);
      setAllMedicines(meds);
    } catch (err) {
      console.error('Failed to load medicine catalog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCategorySearch('');
    setSearchParams({ category: categoryName });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setCategorySearch('');
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Open Medicine Detail & Load Real Registered Pharmacy Stock
  const handleOpenMedicine = async (med: Medicine, sortByOverride?: 'price' | 'stock' | 'distance') => {
    setSelectedMedicine(med);
    const primaryVar = med.variants && med.variants.length > 0 ? med.variants[0] : null;
    setSelectedVariant(primaryVar);
    setReserveSuccess(null);
    setReserveError(null);
    setReservationConfirmedData(null);
    setIsLoadingStock(true);

    const sortToUse = sortByOverride || stockSortBy;

    try {
      // Feature 3: Query real verified pharmacies stocking this medicine with quantity > 0
      const stockResults = await api.searchMedicine({
        medicineId: med.id,
        query: med.generic_name,
        inStockOnly: true,
        sortBy: sortToUse,
      });
      // Ensure strictly quantity > 0
      setPharmacyStock(stockResults.filter(s => s.quantity > 0));
    } catch (err) {
      console.warn('Error fetching pharmacy stock:', err);
      setPharmacyStock([]);
    } finally {
      setIsLoadingStock(false);
    }
  };

  const handleStockSortChange = async (newSort: 'price' | 'stock' | 'distance') => {
    setStockSortBy(newSort);
    if (!selectedMedicine) return;
    setIsLoadingStock(true);
    try {
      const stockResults = await api.searchMedicine({
        medicineId: selectedMedicine.id,
        query: selectedMedicine.generic_name,
        inStockOnly: true,
        sortBy: newSort,
      });
      setPharmacyStock(stockResults.filter(s => s.quantity > 0));
    } catch (err) {
      console.warn('Error fetching pharmacy stock on sort:', err);
    } finally {
      setIsLoadingStock(false);
    }
  };

  // Customer Reserve Action
  const handleReserve = async (item: SearchResultItem) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!isCustomer) {
      setReserveError('Only verified customer accounts can reserve medicines.');
      return;
    }

    setIsReserving(true);
    setReserveError(null);
    setReserveSuccess(null);

    try {
      const res = await api.createReservation({
        userId: user.id,
        pharmacyId: item.pharmacy_id,
        medicineId: item.medicine_id,
        variantId: selectedVariant?.id,
        variantDetails: selectedVariant ? `${selectedVariant.strength} ${selectedVariant.dosage_form}` : undefined,
        quantity: 1,
        notes: `Reserved from catalog (${selectedVariant ? selectedVariant.strength : item.strength_form})`
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
        pharmacyName: item.pharmacy_name,
        pharmacyAddress: `${item.pharmacy_address}, ${item.city}`,
        pharmacyPhone: item.mobile_number || '',
        medicineName: selectedMedicine!.display_name,
        quantity: 1,
        price: item.price,
      });

      setReserveSuccess(`Reservation Confirmed! SMS confirmation notification sent to +91 ${customerPhone}. Pickup end date: ${deadline}.`);
      
      // Refresh stock
      const updatedStock = await api.searchMedicine({
        medicineId: selectedMedicine!.id,
        query: selectedMedicine!.generic_name,
        inStockOnly: true
      });
      setPharmacyStock(updatedStock.filter(s => s.quantity > 0));
    } catch (err: any) {
      setReserveError(err.message || 'Failed to place reservation.');
    } finally {
      setIsReserving(false);
    }
  };

  // Matches category taking into account full names, abbreviations (BP), and therapeutic aliases
  const matchesCategory = (medCategory: string, catQuery: string): boolean => {
    if (!medCategory || !catQuery) return false;
    const mCat = medCategory.trim().toLowerCase();
    const qCat = catQuery.trim().toLowerCase();
    if (mCat === qCat) return true;

    // Disease / therapeutic abbreviations and aliases
    if (qCat === 'bp' || qCat === 'blood pressure' || qCat === 'hypertension') {
      return mCat.includes('blood pressure') || mCat.includes('hypertension') || mCat.includes('bp');
    }
    if (qCat === 'sugar' || qCat === 'diabetes' || qCat === 'blood sugar') {
      return mCat.includes('diabetes') || mCat.includes('blood sugar');
    }
    if (qCat === 'heart' || qCat === 'cardiac' || qCat === 'heart attack') {
      return mCat.includes('heart');
    }
    if (qCat === 'fever' || qCat === 'temperature') return mCat.includes('fever');
    if (qCat === 'pain' || qCat === 'pain relief' || qCat === 'body pain' || qCat === 'headache') return mCat.includes('pain');
    if (qCat === 'cold' || qCat === 'cough' || qCat === 'cold and cough') return mCat.includes('cold') || mCat.includes('cough');
    if (qCat === 'asthma' || qCat === 'copd' || qCat === 'breathing') return mCat.includes('asthma') || mCat.includes('copd');
    if (qCat === 'thyroid') return mCat.includes('thyroid');
    if (qCat === 'acidity' || qCat === 'gastric' || qCat === 'gas') return mCat.includes('gastric') || mCat.includes('acidity');
    if (qCat === 'kidney') return mCat.includes('kidney');
    if (qCat === 'liver') return mCat.includes('liver');
    if (qCat === 'skin') return mCat.includes('skin');
    if (qCat === 'eye') return mCat.includes('eye');
    if (qCat === 'ent' || qCat === 'ear' || qCat === 'nose' || qCat === 'throat') return mCat.includes('ear, nose') || mCat.includes('throat');
    if (qCat === 'antibiotic' || qCat === 'antibiotics' || qCat === 'bacterial') return mCat.includes('bacterial') || mCat.includes('antibiotic');
    if (qCat === 'antifungal' || qCat === 'fungal') return mCat.includes('antifungal');
    if (qCat === 'antiviral' || qCat === 'viral') return mCat.includes('antiviral');
    if (qCat === 'vitamin' || qCat === 'vitamins') return mCat.includes('vitamin');
    if (qCat === 'supplement' || qCat === 'supplements') return mCat.includes('supplement');

    return mCat.includes(qCat) || qCat.includes(mCat);
  };

  // Medicine search by Name, Generic Name, Composition, and Strength (Requirement 2)
  const filterMedicinesComprehensive = (medicines: Medicine[], query: string) => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return medicines;

    return medicines.filter(m => {
      const normGen = (m.generic_name || '').trim().toLowerCase();
      const normDisp = (m.display_name || '').trim().toLowerCase();
      const normAct = (m.active_ingredient || '').trim().toLowerCase();
      const normComp = (m.composition || '').trim().toLowerCase();
      const normCat = (m.category || '').trim().toLowerCase();
      const normComb = (m.combination_ingredients || '').trim().toLowerCase();
      const normStrength = (m.strength_form || '').trim().toLowerCase();

      // Check name, generic name, active ingredient, composition, strength
      if (
        normDisp.includes(trimmed) ||
        normGen.includes(trimmed) ||
        normAct.includes(trimmed) ||
        normComp.includes(trimmed) ||
        normComb.includes(trimmed) ||
        normStrength.includes(trimmed) ||
        matchesCategory(normCat, trimmed)
      ) {
        return true;
      }

      // Check variants
      if (m.variants && m.variants.length > 0) {
        return m.variants.some(v => {
          const vStr = `${v.strength} ${v.dosage_form} ${v.composition || ''}`.toLowerCase();
          return vStr.includes(trimmed);
        });
      }

      return false;
    });
  };

  // Active list of medicines based on Category or Global Search (Requirement 2)
  let displayedMedicines = allMedicines;
  if (selectedCategory) {
    displayedMedicines = displayedMedicines.filter(m => matchesCategory(m.category, selectedCategory));
    if (categorySearch.trim()) {
      displayedMedicines = filterMedicinesComprehensive(displayedMedicines, categorySearch);
    }
  } else if (searchQuery.trim()) {
    // If the query matches a known disease category (e.g. "BP", "Sugar", "Heart")
    const matchingCat = categories.find(c => matchesCategory(c.name, searchQuery.trim()));
    if (matchingCat) {
      displayedMedicines = displayedMedicines.filter(m => matchesCategory(m.category, matchingCat.name));
    } else {
      displayedMedicines = filterMedicinesComprehensive(displayedMedicines, searchQuery);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30 mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              NLEM 2022 & WHO ATC Standard Reference Catalog
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Predefined Medicine Catalog
            </h1>
            <p className="mt-2 text-emerald-100 text-sm sm:text-base leading-relaxed">
              Explore 240+ verified generic medicines across 40 specialized therapeutic categories with certified compositions, strength variants, and live pharmacy availability.
            </p>

            {/* Feature 3: Exact Spelling Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-2xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exact generic name (e.g. Paracetamol, Metformin, Amlodipine)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-sm text-white rounded-xl shadow-md transition-colors whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                Exact Search
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchParams({});
                  }}
                  className="px-3 py-2.5 bg-emerald-700/60 hover:bg-emerald-700 text-xs font-semibold rounded-xl text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </form>
            <p className="text-[11px] text-emerald-200/80 mt-2">
              * Exact spelling matching applied (case-insensitive, trims whitespace). Try searching <span className="font-mono underline">Paracetamol</span> or <span className="font-mono underline">Metformin</span>.
            </p>
          </div>
          
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <Pill className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* View Mode: Selected Category View vs All Categories Grid */}
        {selectedCategory ? (
          /* ==================================================================== */
          /* 1.2 CATEGORY VIEW: Displays all medicines in selected category       */
          /* ==================================================================== */
          <div className="space-y-6">
            {/* Category Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBackToCategories}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Back to All Categories"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Categories
                </button>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    {selectedCategory}
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {displayedMedicines.length} medicines
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified pharmaceutical catalog records in accordance with Indian NLEM standards.
                  </p>
                </div>
              </div>

              {/* Exact Search within this category */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Filter within category..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
            </div>

            {/* Medicine Cards List */}
            {isLoading ? (
              <div className="py-20 text-center">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500">Loading catalog medicines...</p>
              </div>
            ) : displayedMedicines.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No Medicines Found</h3>
                <p className="text-xs text-slate-500">
                  No exact match found for <span className="font-bold text-slate-700">"{categorySearch || searchQuery}"</span>. Exact spelling is required (e.g. check for typos).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCategorySearch('');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedMedicines.map((med) => (
                  <div
                    key={med.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mb-1.5">
                            {med.category}
                          </span>
                          <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {med.display_name}
                          </h3>
                        </div>
                        {med.is_prescription_required ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Rx
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            OTC
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                        <div>
                          <span className="font-bold text-slate-700">Generic Name: </span>
                          <span className="font-bold text-slate-900">{med.generic_name}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700">Composition: </span>
                          <span className="font-medium text-slate-800">{med.composition || med.active_ingredient || `${med.generic_name} ${med.strength_form}`}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="font-bold text-slate-700">Strength: </span>
                            <span className="font-medium text-emerald-800 font-semibold">{med.strength_form.split(' ')[0] || med.strength_form}</span>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700">Dosage Form: </span>
                            <span className="font-medium text-slate-800">{med.dosage_form || 'Tablet'} ({med.route || 'Oral'})</span>
                          </div>
                        </div>
                        {med.combination_ingredients && (
                          <div>
                            <span className="font-bold text-slate-700">Combination: </span>
                            <span className="font-semibold text-emerald-800">{med.combination_ingredients}</span>
                          </div>
                        )}
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                          {med.description}
                        </p>
                      </div>

                      {/* Verified Strength Variants Pill Selection */}
                      {med.variants && med.variants.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                            Verified Strength Variants ({med.variants.length}):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {med.variants.map((v) => (
                              <span
                                key={v.id}
                                className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {v.strength} {v.dosage_form}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">
                        Ref: {med.reference_source?.split(',')[0] || 'NLEM 2022'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleOpenMedicine(med)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        View & Check Stock
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ==================================================================== */
          /* 1.1 ALL 40 THERAPEUTIC CATEGORIES GRID                              */
          /* ==================================================================== */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Therapeutic & Disease Categories
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Click on any category to browse its complete catalog of verified generic medicines and strength variants.
                </p>
              </div>
              <div className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
                40 Categories • 240+ Generic Medicines
              </div>
            </div>

            {searchQuery.trim() ? (
              /* Global Search Results List */
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">
                    Exact matches for: <span className="text-emerald-700 font-mono">"{searchQuery}"</span> ({displayedMedicines.length} found)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchParams({});
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                  >
                    View all 40 categories
                  </button>
                </div>

                {displayedMedicines.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
                    <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mx-auto">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">No Medicines Found</h3>
                    <p className="text-xs text-slate-500">
                      No exact generic name matched <span className="font-bold text-slate-700">"{searchQuery}"</span>. MediStock enforces exact spelling without fuzzy guessing (e.g. "paracetmol" will return no results, while "Paracetamol" matches).
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {displayedMedicines.map((med) => (
                      <div
                        key={med.id}
                        onClick={() => handleOpenMedicine(med)}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mb-1.5">
                            {med.category}
                          </span>
                          <h3 className="text-base font-black text-slate-900">{med.display_name}</h3>
                          <p className="text-xs text-slate-700 mt-1 font-semibold">
                            Generic: <span className="text-slate-900">{med.generic_name}</span>
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Composition: <span className="text-slate-700">{med.composition || med.active_ingredient || `${med.generic_name} ${med.strength_form}`}</span>
                          </p>
                          <p className="text-xs text-emerald-800 font-semibold mt-1">
                            {med.strength_form} • {med.dosage_form || 'Tablet'}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-2">{med.description}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                          <span>Check stock & variants</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* 40 Categories Cards Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat, idx) => (
                  <button
                    key={cat.id || idx}
                    type="button"
                    onClick={() => handleSelectCategory(cat.name)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 p-5 shadow-2xs hover:shadow-md transition-all text-left group flex flex-col justify-between h-44"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
                          <Activity className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-800 transition-colors">
                          {cat.count} meds
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                        {cat.description || 'Verified pharmaceutical catalog entries.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-emerald-700 transition-colors pt-2 border-t border-slate-100">
                      <span>Browse category</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ==================================================================== */}
      {/* FEATURE 4 & 6: MEDICINE DETAILS & REAL PHARMACY STOCK MODAL          */}
      {/* ==================================================================== */}
      {selectedMedicine && (
        <Modal
          isOpen={Boolean(selectedMedicine)}
          onClose={() => setSelectedMedicine(null)}
          title={selectedMedicine.display_name}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            
            {/* Top Medicine Metadata Card */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded-full">
                    {selectedMedicine.category}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-1">
                    {selectedMedicine.generic_name}
                  </h2>
                </div>
                {selectedMedicine.is_prescription_required ? (
                  <span className="px-3 py-1 rounded-xl text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5 shadow-2xs">
                    <Lock className="w-3.5 h-3.5" /> Prescription Required (Schedule H/H1)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                    Over-The-Counter (OTC)
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-bold text-slate-700">Generic Name: </span>
                  <span className="font-bold text-slate-900">{selectedMedicine.generic_name}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Therapeutic Category: </span>
                  <span className="font-semibold text-emerald-800">{selectedMedicine.category}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="font-bold text-slate-700">Complete Composition: </span>
                  <span className="font-semibold text-slate-900">{selectedMedicine.composition || selectedMedicine.active_ingredient || `${selectedMedicine.generic_name} ${selectedMedicine.strength_form}`}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Strength & Formulation: </span>
                  <span className="font-semibold text-slate-900">{selectedMedicine.strength_form}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Route of Administration: </span>
                  <span className="font-semibold text-slate-900">{selectedMedicine.route || 'Oral'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Dosage Form: </span>
                  <span className="font-semibold text-slate-900">{selectedMedicine.dosage_form || 'Tablet'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">Reference Source: </span>
                  <span className="font-mono text-slate-800">{selectedMedicine.reference_source || 'NLEM 2022 / IP'}</span>
                </div>
              </div>

              {selectedMedicine.combination_ingredients && (
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-900">Complete Combination Active Ingredients: </span>
                  <span className="font-semibold text-emerald-800">{selectedMedicine.combination_ingredients}</span>
                </div>
              )}

              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {selectedMedicine.description}
              </p>
            </div>

            {/* Feature 2.3: Verified Variants Selection */}
            {selectedMedicine.variants && selectedMedicine.variants.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Form & Strength Variant:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedMedicine.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900">
                              {variant.strength}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                              {variant.dosage_form}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block mt-1 leading-snug">
                            {variant.composition}
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notification Messages with Customer Number & End Date */}
            {reservationConfirmedData && (
              <div className="p-4 bg-emerald-50/95 border-2 border-emerald-400 rounded-2xl space-y-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">Medicine Reservation Confirmed!</h4>
                    <p className="text-[11px] text-emerald-700 font-medium">Reservation Ref ID: #{reservationConfirmedData.reservationId.slice(-6).toUpperCase()}</p>
                  </div>
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

                <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
                  ⏰ <strong>Pickup & Auto-Restoration Policy:</strong> Please collect your medicine before <strong>{reservationConfirmedData.collectionDeadline}</strong>. A reminder notification will be sent 30 minutes before this deadline. If not collected by the end date, reserved stock will automatically return to the pharmacy inventory.
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                  {confirmedReservationObject && (
                    <button
                      type="button"
                      onClick={() => setSelectedResForDetails(confirmedReservationObject)}
                      className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      View Reservation Details
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => navigate('/customer/reservations')}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    View in My Reservations →
                  </button>
                </div>
              </div>
            )}

            {reserveError && (
              <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{reserveError}</span>
              </div>
            )}

            {/* Feature 3: Pharmacies Having This Medicine (Live Registered Stock) */}
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Pharmacies Having This Medicine
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Verified registered pharmacies with active stock (&gt; 0 units). Compare prices and availability.
                  </p>
                </div>

                {/* Compare / Sort Controls */}
                {pharmacyStock.length > 1 && (
                  <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                    <span className="text-[10px] text-slate-400 uppercase px-1">Sort:</span>
                    <button
                      type="button"
                      onClick={() => handleStockSortChange('price')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        stockSortBy === 'price' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
                      }`}
                    >
                      Lowest Price
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStockSortChange('stock')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        stockSortBy === 'stock' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
                      }`}
                    >
                      Highest Stock
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStockSortChange('distance')}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        stockSortBy === 'distance' ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'
                      }`}
                    >
                      Nearest
                    </button>
                  </div>
                )}
              </div>

              {/* 48-Hour Reservation Expiry Notice */}
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center gap-2.5 text-xs text-blue-900">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div>
                  <span className="font-bold">48-Hour Reservation Policy: </span>
                  <span>Please collect your medicine within 48 hours. Uncollected reservations automatically expire and return to inventory.</span>
                </div>
              </div>

              {isLoadingStock ? (
                <div className="py-10 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  Checking registered pharmacies in database...
                </div>
              ) : pharmacyStock.length === 0 ? (
                <div className="p-8 bg-amber-50/80 rounded-2xl border border-amber-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-slate-800">
                    No pharmacies currently have this medicine in stock.
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    This medicine is registered in the MediStock master catalog, but currently no registered pharmacy has active stock (&gt; 0 units). Registered pharmacies can add this medicine to their stock from their Pharmacy Dashboard.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pharmacyStock.map((item) => (
                    <div
                      key={item.inventory_id}
                      className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-extrabold text-slate-900">{item.pharmacy_name}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Verified Store
                          </span>
                          {item.distance_km !== null && item.distance_km !== undefined && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                              ~ {item.distance_km} km (by road)
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.pharmacy_address}, {item.city} - {item.pin_code}</span>
                        </p>

                        {item.mobile_number && (
                          <p className="text-xs text-slate-600 flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <a href={`tel:${item.mobile_number}`} className="text-emerald-700 font-semibold hover:underline">
                              +91 {item.mobile_number}
                            </a>
                          </p>
                        )}

                        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                          <div>
                            <span className="font-semibold text-slate-500">Medicine: </span>
                            <span className="font-bold text-slate-800">{selectedMedicine.display_name}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-500">Composition: </span>
                            <span className="font-medium text-slate-700">
                              {selectedVariant ? selectedVariant.composition : (selectedMedicine.composition || selectedMedicine.generic_name)}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-500">Strength: </span>
                            <span className="font-medium text-slate-700">
                              {selectedVariant ? `${selectedVariant.strength} ${selectedVariant.dosage_form}` : selectedMedicine.strength_form}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                        <div className="text-left md:text-right">
                          <div className="text-lg font-black text-slate-900">₹{item.price}</div>
                          <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 md:justify-end">
                            <CheckCircle2 className="w-3 h-3" />
                            {item.quantity} units in stock
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={isReserving}
                          onClick={() => handleReserve(item)}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-colors whitespace-nowrap"
                        >
                          {isReserving ? 'Reserving...' : 'Reserve Medicine (48h)'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </Modal>
      )}

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
