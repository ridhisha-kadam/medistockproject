import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api, isListingStale } from '../services/api';
import { 
  Pharmacy, 
  InventoryItem, 
  Medicine, 
  MedicineVariant,
  TherapeuticCategory,
  Reservation, 
  Bill, 
  Alert, 
  ReservationStatus 
} from '../types/database';
import { THERAPEUTIC_CATEGORIES } from '../data/medicineCatalogData';
import { StatusBadge } from '../components/StatusBadge';
import { InvoiceModal } from '../components/InvoiceModal';
import { Modal } from '../components/Modal';
import { EditPharmacyModal } from '../components/EditPharmacyModal';
import { ReservationDetailsModal } from '../components/ReservationDetailsModal';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  ShoppingBag, 
  Receipt, 
  Bell, 
  Store, 
  AlertTriangle, 
  Check, 
  X, 
  Clock, 
  Loader2,
  FileText,
  MapPin,
  Mail,
  Phone,
  FileBadge,
  Search,
  CheckCircle2,
  Pill,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const PharmacyDashboardPage: React.FC = () => {
  const { user, pharmacy, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'stock' | 'reservations' | 'billing' | 'profile' | 'alerts'>('stock');
  const [currentPharm, setCurrentPharm] = useState<Pharmacy | null>(pharmacy);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [medicinesCatalogue, setMedicinesCatalogue] = useState<Medicine[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditPharmModalOpen, setIsEditPharmModalOpen] = useState<boolean>(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);

  // Dynamic Categories & Selection (Requirement 1.A & 1.B)
  const [categories, setCategories] = useState<TherapeuticCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [batchNumber, setBatchNumber] = useState<string>('');

  // Add/Edit Stock Form state
  const [isEditingListing, setIsEditingListing] = useState<string | null>(null);
  const [selectedMedId, setSelectedMedId] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<string>('');
  const [stockPrice, setStockPrice] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSavingStock, setIsSavingStock] = useState<boolean>(false);

  // Add New Medicine Modal State (Requirement 1.C)
  const [isAddingNewMedicineModal, setIsAddingNewMedicineModal] = useState<boolean>(false);
  const [newMedDisplayName, setNewMedDisplayName] = useState('');
  const [newMedCategory, setNewMedCategory] = useState('');
  const [newMedGenericName, setNewMedGenericName] = useState('');
  const [newMedComposition, setNewMedComposition] = useState('');
  const [newMedStrength, setNewMedStrength] = useState('');
  const [newMedDosageForm, setNewMedDosageForm] = useState('Tablet');
  const [newMedManufacturer, setNewMedManufacturer] = useState('');
  const [newMedQuantity, setNewMedQuantity] = useState('');
  const [newMedPrice, setNewMedPrice] = useState('');
  const [newMedBatchNumber, setNewMedBatchNumber] = useState('');
  const [newMedExpiryDate, setNewMedExpiryDate] = useState('');
  const [duplicateMedicineFound, setDuplicateMedicineFound] = useState<Medicine | null>(null);
  const [newMedError, setNewMedError] = useState<string | null>(null);
  const [isSavingNewMed, setIsSavingNewMed] = useState<boolean>(false);

  // Invoice Modal
  const [selectedBillForPrint, setSelectedBillForPrint] = useState<Bill | null>(null);

  // Reservation Details Modal (Requirement 3)
  const [selectedResForDetails, setSelectedResForDetails] = useState<Reservation | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'PHARMACY') {
      navigate('/login');
      return;
    }
    loadAllPharmacyData();

    const handleUpdate = () => loadAllPharmacyData();
    window.addEventListener('medistock_alert_updated', handleUpdate);
    window.addEventListener('medistock_stock_updated', handleUpdate);

    return () => {
      window.removeEventListener('medistock_alert_updated', handleUpdate);
      window.removeEventListener('medistock_stock_updated', handleUpdate);
    };
  }, [user]);

  const loadAllPharmacyData = async () => {
    setIsLoading(true);
    try {
      const pharms = await api.getPharmacies({ onlyApproved: false });
      let myPharm = pharms.find(p => 
        p.owner_user_id === user!.id || 
        (user!.email && p.email?.toLowerCase().trim() === user!.email.toLowerCase().trim()) ||
        (user!.mobile_number && p.mobile_number?.trim() === user!.mobile_number.trim())
      ) || null;
      
      // Strict pharmacy isolation: match by owner name or single pharmacy fallback only
      if (!myPharm && user!.role === 'PHARMACY') {
        const matchingByName = pharms.find(p => p.owner_name?.toLowerCase() === user!.full_name?.toLowerCase());
        if (matchingByName) {
          myPharm = matchingByName;
        } else if (pharms.length === 1) {
          myPharm = pharms[0];
        }
      }
      setCurrentPharm(myPharm);

      // Load dynamic therapeutic categories from database/catalog
      const cats = await api.getTherapeuticCategories();
      setCategories(cats && cats.length > 0 ? cats : THERAPEUTIC_CATEGORIES);

      // Load catalogue
      const catalogue = await api.getMedicines();
      setMedicinesCatalogue(catalogue);

      if (myPharm) {
        // Load inventory for currently logged-in pharmacy only
        const inv = await api.getInventory({ pharmacyId: myPharm.id });
        setInventory(inv);

        // Load reservations
        const pharmRes = await api.getPharmacyReservations(myPharm.id);
        setReservations(pharmRes);

        // Load bills
        const pharmBills = await api.getPharmacyBills(myPharm.id);
        setBills(pharmBills);
        
        // Load alerts
        const alts = await api.getPharmacyAlerts(myPharm.id);
        setAlerts(alts);
      }
    } catch (e) {
      console.error('Failed loading pharmacy data', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Matches category taking into account full names and therapeutic aliases
  const matchesCategory = (medCategory: string, catQuery: string): boolean => {
    if (!medCategory || !catQuery) return false;
    const mCat = medCategory.trim().toLowerCase();
    const qCat = catQuery.trim().toLowerCase();
    if (mCat === qCat) return true;

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
    if (qCat === 'antibiotic' || qCat === 'antibiotics' || qCat === 'bacterial') return mCat.includes('bacterial') || mCat.includes('antibiotic');
    if (qCat === 'antifungal' || qCat === 'fungal') return mCat.includes('antifungal');
    if (qCat === 'antiviral' || qCat === 'viral') return mCat.includes('antiviral');
    if (qCat === 'vitamin' || qCat === 'vitamins') return mCat.includes('vitamin');

    return mCat.includes(qCat) || qCat.includes(mCat);
  };

  // Filter medicines by selected category & search query (Requirement 1.B)
  const categoryMedicines = selectedCategory
    ? medicinesCatalogue.filter(m => matchesCategory(m.category, selectedCategory))
    : [];

  const suggestedMedicines = categoryMedicines.filter(m => {
    if (!categorySearchQuery.trim()) return true;
    const q = categorySearchQuery.trim().toLowerCase();
    return (
      m.display_name.toLowerCase().includes(q) ||
      m.generic_name.toLowerCase().includes(q) ||
      (m.composition && m.composition.toLowerCase().includes(q)) ||
      (m.active_ingredient && m.active_ingredient.toLowerCase().includes(q)) ||
      m.strength_form.toLowerCase().includes(q)
    );
  });

  const activeMedicine = medicinesCatalogue.find(m => m.id === selectedMedId) || null;
  const activeVariant = activeMedicine?.variants?.find(v => v.id === selectedVariantId) || activeMedicine?.variants?.[0] || null;

  const suggestMedicinePrice = (med: Medicine): string => {
    const g = (med.generic_name || '').toLowerCase();
    if (g.includes('telmisartan')) return '48.00';
    if (g.includes('amlodipine')) return '28.50';
    if (g.includes('losartan')) return '35.00';
    if (g.includes('atenolol')) return '22.00';
    if (g.includes('metoprolol')) return '38.00';
    if (g.includes('ramipril')) return '30.00';
    if (g.includes('enalapril')) return '24.00';
    if (g.includes('metformin')) return '32.00';
    if (g.includes('glimepiride')) return '26.00';
    if (g.includes('paracetamol')) return '15.00';
    if (g.includes('ibuprofen')) return '18.00';
    if (g.includes('amoxicillin')) return '65.00';
    if (g.includes('azithromycin')) return '85.00';
    if (g.includes('pantoprazole')) return '42.00';
    if (g.includes('atorvastatin')) return '55.00';
    if (g.includes('cetirizine')) return '18.00';
    return '30.00';
  };

  const handleSaveStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPharm) return;

    setFormError(null);
    setFormSuccess(null);

    // Validation
    if (!selectedMedId) {
      setFormError('Please select a medicine from the category suggestions.');
      return;
    }
    const qty = parseInt(stockQuantity);
    if (isNaN(qty) || qty < 0) {
      setFormError('Quantity must be a valid whole number (0 or greater).');
      return;
    }
    const price = parseFloat(stockPrice);
    if (isNaN(price) || price < 0) {
      setFormError('Price must be a valid non-negative number.');
      return;
    }
    if (!expiryDate) {
      setFormError('Expiry Date is mandatory.');
      return;
    }

    setIsSavingStock(true);
    try {
      if (isEditingListing) {
        await api.updateInventoryItem(isEditingListing, {
          quantity: qty,
          price: price,
          expiry_date: expiryDate,
          batch_number: batchNumber.trim() || undefined,
        });
        setFormSuccess('Medicine inventory updated successfully!');
      } else {
        await api.addInventoryItem({
          pharmacyId: currentPharm.id,
          medicineId: selectedMedId,
          quantity: qty,
          price: price,
          expiryDate: expiryDate,
          batchNumber: batchNumber.trim() || undefined,
          updatedBy: user?.id,
        });
        const medName = activeMedicine?.display_name || 'Medicine';
        setFormSuccess(`Successfully added ${medName} to your pharmacy stock!`);
      }

      // Reset form
      setSelectedMedId('');
      setSelectedVariantId('');
      setCategorySearchQuery('');
      setStockQuantity('');
      setStockPrice('');
      setBatchNumber('');
      setExpiryDate('');
      setIsEditingListing(null);

      // Refresh inventory
      const inv = await api.getInventory({ pharmacyId: currentPharm.id });
      setInventory(inv);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save medicine listing.');
    } finally {
      setIsSavingStock(false);
    }
  };

  const handleEditClick = (item: InventoryItem) => {
    setIsEditingListing(item.id);
    setSelectedMedId(item.medicine_id);
    if (item.medicine?.category) {
      setSelectedCategory(item.medicine.category);
    }
    setStockQuantity(item.quantity.toString());
    setStockPrice(item.price.toString());
    setBatchNumber(item.batch_number || '');
    setExpiryDate(item.expiry_date);
    setFormError(null);
    setFormSuccess(null);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleDeleteClick = async (listingId: string) => {
    if (!confirm('Are you sure you want to remove this medicine listing from your stock?')) return;
    try {
      await api.deleteInventoryItem(listingId, currentPharm?.id);
      if (currentPharm) {
        const inv = await api.getInventory({ pharmacyId: currentPharm.id });
        setInventory(inv);
      }
    } catch (e: any) {
      alert(e.message || 'Failed to delete listing.');
    }
  };

  // Add New Medicine to Catalog & Stock (Requirement 1.C)
  const handleCreateNewMedicineAndStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPharm) return;

    setNewMedError(null);
    setDuplicateMedicineFound(null);

    if (!newMedDisplayName.trim()) {
      setNewMedError('Medicine Display Name is required.');
      return;
    }
    if (!newMedCategory.trim()) {
      setNewMedError('Please select a medicine category.');
      return;
    }
    if (!newMedGenericName.trim()) {
      setNewMedError('Generic Name is required.');
      return;
    }
    if (!newMedStrength.trim()) {
      setNewMedError('Strength is required (e.g. 5 mg, 500 mg).');
      return;
    }
    const qty = parseInt(newMedQuantity);
    if (isNaN(qty) || qty < 0) {
      setNewMedError('Quantity must be a valid whole number (0 or greater).');
      return;
    }
    const price = parseFloat(newMedPrice);
    if (isNaN(price) || price < 0) {
      setNewMedError('Selling Price must be a valid non-negative number.');
      return;
    }
    if (!newMedExpiryDate) {
      setNewMedError('Expiry Date is mandatory.');
      return;
    }

    const strengthForm = `${newMedStrength.trim()} ${newMedDosageForm.trim()}`;
    const compText = newMedComposition.trim() || `${newMedGenericName.trim()} ${newMedStrength.trim()}`;

    // Duplicate Check: Check whether the medicine already exists in the catalog before creating
    const existing = medicinesCatalogue.find(m => 
      m.generic_name.trim().toLowerCase() === newMedGenericName.trim().toLowerCase() &&
      (m.strength_form.trim().toLowerCase() === strengthForm.toLowerCase() ||
       m.variants?.some(v => v.strength.trim().toLowerCase() === newMedStrength.trim().toLowerCase()))
    );

    if (existing) {
      setDuplicateMedicineFound(existing);
      setNewMedError(`This medicine already exists in the MediStock catalog as "${existing.display_name}". You can select it directly instead of creating a duplicate entry.`);
      return;
    }

    setIsSavingNewMed(true);
    try {
      // 1. Create persistent catalog entry in database
      const createdMed = await api.createMedicine({
        displayName: newMedDisplayName.trim(),
        genericName: newMedGenericName.trim(),
        category: newMedCategory.trim(),
        strengthForm: strengthForm,
        dosageForm: newMedDosageForm.trim(),
        composition: compText,
        activeIngredient: newMedGenericName.trim(),
        manufacturer: newMedManufacturer.trim() || undefined,
        referenceSource: 'Registered Pharmacy Submission',
        createdBy: user?.id,
      });

      // 2. Add stock associated with currently logged-in pharmacy only
      await api.addInventoryItem({
        pharmacyId: currentPharm.id,
        medicineId: createdMed.id,
        quantity: qty,
        price: price,
        expiryDate: newMedExpiryDate,
        batchNumber: newMedBatchNumber.trim() || undefined,
        updatedBy: user?.id,
      });

      // 3. Refresh catalogue and pharmacy inventory
      const [updatedCat, updatedInv] = await Promise.all([
        api.getMedicines(),
        api.getInventory({ pharmacyId: currentPharm.id })
      ]);
      setMedicinesCatalogue(updatedCat);
      setInventory(updatedInv);

      // Close modal and reset fields
      setIsAddingNewMedicineModal(false);
      setNewMedDisplayName('');
      setNewMedGenericName('');
      setNewMedComposition('');
      setNewMedStrength('');
      setNewMedDosageForm('Tablet');
      setNewMedManufacturer('');
      setNewMedQuantity('');
      setNewMedPrice('');
      setNewMedBatchNumber('');
      setNewMedExpiryDate('');
      setDuplicateMedicineFound(null);

      setFormSuccess(`New medicine "${createdMed.display_name}" created in catalog and added to your pharmacy stock!`);
    } catch (err: any) {
      setNewMedError(err.message || 'Failed to save new medicine.');
    } finally {
      setIsSavingNewMed(false);
    }
  };

  const handleSelectExistingDuplicate = (med: Medicine) => {
    setSelectedCategory(med.category);
    setSelectedMedId(med.id);
    if (newMedQuantity) setStockQuantity(newMedQuantity);
    if (newMedPrice) setStockPrice(newMedPrice);
    if (newMedBatchNumber) setBatchNumber(newMedBatchNumber);
    if (newMedExpiryDate) setExpiryDate(newMedExpiryDate);
    setIsAddingNewMedicineModal(false);
    setDuplicateMedicineFound(null);
    setNewMedError(null);
  };

  const handleUpdateReservation = async (reservationId: string, newStatus: ReservationStatus) => {
    try {
      const result = await api.updateReservationStatus(reservationId, newStatus, user?.id);
      if (result.bill) {
        setSelectedBillForPrint(result.bill);
      }
      await loadAllPharmacyData();
    } catch (e: any) {
      alert(e.message || 'Failed to update reservation.');
    }
  };

  // Metrics
  const inStockCount = inventory.filter(i => i.quantity >= 10).length;
  const lowStockCount = inventory.filter(i => i.quantity > 0 && i.quantity < 10).length;
  const outOfStockCount = inventory.filter(i => i.quantity === 0).length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
        <p className="text-sm font-medium">Loading pharmacy operations dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {currentPharm?.name || 'Pharmacy Dashboard'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span>Owner: <strong className="text-slate-700">{currentPharm?.owner_name}</strong></span>
            <span>•</span>
            <span>Licence: <strong className="text-slate-700">{currentPharm?.licence_number}</strong></span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge
            type="verification"
            status={currentPharm?.verification_status || 'PENDING_VERIFICATION'}
          />
        </div>
      </div>

      {/* Verification Safeguard Warning Banner (Fig 9.6) */}
      {currentPharm?.verification_status !== 'APPROVED' && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Awaiting Administrator Verification:</strong> Your pharmacy registration is currently{' '}
            <span className="font-bold underline">{currentPharm?.verification_status}</span>. Once verified by an administrator, your listings will automatically appear in customer search and become available for reservations.
          </div>
        </div>
      )}

      {/* 4 Summary Stat Cards (Exact Fig 9.6) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {/* Card 1: Medicines listed */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-3xl font-black text-slate-900">{inventory.length}</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">Medicines listed</div>
        </div>

        {/* Card 2: In stock */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-3xl font-black text-emerald-600">{inStockCount}</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">In stock</div>
        </div>

        {/* Card 3: Low stock */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-3xl font-black text-amber-600">{lowStockCount}</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">Low stock</div>
        </div>

        {/* Card 4: Out of stock */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-3xl font-black text-rose-600">{outOfStockCount}</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">Out of stock</div>
        </div>
      </div>

      {/* Dashboard Tabs Bar (Fig 9.6) */}
      <div className="flex border-b border-slate-200 mb-6 gap-2 sm:gap-4 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('stock')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'stock'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Store className="w-4 h-4" />
          Stock listings ({inventory.length})
        </button>

        <button
          onClick={() => setActiveTab('reservations')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'reservations'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Reservations
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'alerts'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          Alerts ({alerts.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-emerald-600 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Pharmacy profile
        </button>
      </div>

      {/* TAB CONTENT: STOCK LISTINGS */}
      {activeTab === 'stock' && (
        <div className="space-y-8">
          {/* Inventory Table (or Empty State if 0 listings) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {inventory.length === 0 ? (
              /* EXACT FIG 9.6 EMPTY STATE */
              <div className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Store className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">No stock listed yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Add your first medicine with the form below to make it searchable for local customers.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3.5">Medicine Name</th>
                      <th className="px-6 py-3.5">Generic / Composition</th>
                      <th className="px-6 py-3.5">Batch No.</th>
                      <th className="px-6 py-3.5">Quantity</th>
                      <th className="px-6 py-3.5">Price (₹)</th>
                      <th className="px-6 py-3.5">Expiry Date</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inventory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {item.medicine?.display_name || 'Medicine'}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          <div>{item.medicine?.generic_name} ({item.medicine?.strength_form})</div>
                          {item.medicine?.composition && (
                            <div className="text-[11px] text-slate-400 mt-0.5">{item.medicine.composition}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-600">
                          {item.batch_number || '—'}
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-800">
                          {item.quantity} units
                        </td>
                        <td className="px-6 py-4 font-bold text-emerald-800">
                          ₹{item.price}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          {item.expiry_date}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge type="stock" status={item.status} />
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="p-1 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                            title="Edit Stock"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="p-1 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add or Update Stock Form (Requirement 1: Category-Driven Medicine Stocking) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 mb-6 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isEditingListing ? 'Edit Stock Listing' : 'Add Medicine to Pharmacy Stock'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select disease category to view medicine suggestions, or add a new medicine to your stock.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNewMedCategory(selectedCategory || categories[0]?.name || 'Blood Pressure (BP) and Hypertension');
                    setIsAddingNewMedicineModal(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all shadow-2xs"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-600" />
                  + Add New Medicine (if not in catalog)
                </button>

                {isEditingListing && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingListing(null);
                      setSelectedMedId('');
                      setSelectedVariantId('');
                      setStockQuantity('');
                      setStockPrice('');
                      setBatchNumber('');
                      setExpiryDate('');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline px-2 py-1"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            {formError && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                {formError}
              </div>
            )}

            {formSuccess && (
              <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSaveStock} className="space-y-6">
              {/* Step A: Category Selection */}
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Step 1: Select Disease / Medicine Category *
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedMedId('');
                    setSelectedVariantId('');
                    setCategorySearchQuery('');
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="">-- Choose Disease Category (e.g. Blood Pressure, Diabetes, Heart, Fever) --</option>
                  {categories.map((cat) => (
                    <option key={cat.id || cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500">
                  Categorized per Indian NLEM standards. Selecting a category dynamically filters its catalog medicines.
                </p>
              </div>

              {/* Step B: Category-Based Medicine Selection */}
              {selectedCategory ? (
                <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="block text-xs font-bold text-slate-900">
                      Step 2: Choose Medicine in <span className="text-emerald-800 font-black">"{selectedCategory}"</span> *
                    </label>
                    <span className="text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {categoryMedicines.length} verified medicines in this category
                    </span>
                  </div>

                  {/* Search inside category */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={categorySearchQuery}
                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                      placeholder={`Filter medicines in ${selectedCategory} (e.g. Amlodipine, Telmisartan)...`}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                    />
                  </div>

                  {/* Quick Select Medicine Chips from Catalog */}
                  {categoryMedicines.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-slate-500 font-bold block">
                        Quick Select from Catalog:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {categoryMedicines.slice(0, 8).map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              setSelectedMedId(m.id);
                              if (m.variants && m.variants.length > 0) {
                                setSelectedVariantId(m.variants[0].id);
                              } else {
                                setSelectedVariantId('');
                              }
                              if (!stockPrice || stockPrice === '0') {
                                setStockPrice(suggestMedicinePrice(m));
                              }
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                              selectedMedId === m.id
                                ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                                : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-300'
                            }`}
                          >
                            <span className="font-bold">{m.display_name}</span>
                            <span className="text-[10px] ml-1 opacity-80">({m.strength_form})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions dropdown / select */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Or Select from Full Category Suggestions Dropdown:
                    </label>
                    <select
                      required
                      value={selectedMedId}
                      onChange={(e) => {
                        setSelectedMedId(e.target.value);
                        const chosen = medicinesCatalogue.find(m => m.id === e.target.value);
                        if (chosen?.variants && chosen.variants.length > 0) {
                          setSelectedVariantId(chosen.variants[0].id);
                        } else {
                          setSelectedVariantId('');
                        }
                        if (chosen && (!stockPrice || stockPrice === '0')) {
                          setStockPrice(suggestMedicinePrice(chosen));
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
                    >
                      <option value="">-- Click to select a medicine from suggestions ({suggestedMedicines.length} available) --</option>
                      {suggestedMedicines.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.display_name} • {m.generic_name} ({m.strength_form})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* If selected medicine has verified variants */}
                  {activeMedicine?.variants && activeMedicine.variants.length > 1 && (
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Select Specific Strength / Formulation Variant:
                      </label>
                      <select
                        value={selectedVariantId || activeMedicine.variants[0].id}
                        onChange={(e) => setSelectedVariantId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      >
                        {activeMedicine.variants.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.strength} {v.dosage_form} — {v.composition}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Selected Medicine Preview Badge */}
                  {activeMedicine && (
                    <div className="p-3.5 bg-white rounded-xl border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                      <div className="space-y-0.5 text-xs">
                        <div className="font-extrabold text-slate-900 text-sm">{activeMedicine.display_name}</div>
                        <div className="text-slate-600">
                          <strong>Generic Name:</strong> {activeMedicine.generic_name} | <strong>Form:</strong> {activeVariant ? `${activeVariant.strength} ${activeVariant.dosage_form}` : activeMedicine.strength_form}
                        </div>
                        <div className="text-emerald-800 text-[11px] font-medium">
                          <strong>Composition:</strong> {activeVariant ? activeVariant.composition : (activeMedicine.composition || activeMedicine.generic_name)}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                        Ready to Stock
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                  Please select a disease category above to view available medicines and strengths.
                </div>
              )}

              {/* Step C: Stock Values (Quantity, Price, Batch, Expiry) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-2">
                {/* Quantity */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Stock Quantity (units) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Whole units in pharmacy. 0 marks out of stock.
                  </span>
                </div>

                {/* Price */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Selling Price per unit, ₹ *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={stockPrice}
                    onChange={(e) => setStockPrice(e.target.value)}
                    placeholder="e.g. 28.50"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                {/* Batch Number */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Batch Number
                  </label>
                  <input
                    type="text"
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    placeholder="e.g. BATCH-2026-X1"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Manufacturer lot / batch code.
                  </span>
                </div>

                {/* Expiry Date */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSavingStock}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingStock ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving to stock...
                    </>
                  ) : (
                    'Save to Pharmacy Stock'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB CONTENT: RESERVATIONS */}
      {activeTab === 'reservations' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Customer Pickup Reservations ({reservations.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review and update status of medicine pickup reservations.
              </p>
            </div>
          </div>

          {reservations.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-200">
              No reservations found for your pharmacy yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Medicine & Category</th>
                    <th className="px-4 py-3">Strength / Formulation</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Total (₹)</th>
                    <th className="px-4 py-3">Order Date</th>
                    <th className="px-4 py-3">Last Date to Pick Up</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reservations.map((res) => {
                    const custName = res.user?.full_name || res.customer_name || 'Registered Customer';
                    const custPhone = res.user?.mobile_number || res.customer_phone || '';
                    const medName = res.medicine?.display_name || res.medicine_name || 'Medicine';
                    const medCat = res.medicine?.category || res.medicine_category || 'General';
                    const medStrength = res.variant_details || res.medicine?.strength_form || res.medicine_strength || 'Standard';
                    const medComp = res.medicine?.composition || res.medicine?.active_ingredient || res.medicine_composition || '';
                    const pickupDeadline = new Date(res.expires_at || new Date(res.created_at).getTime() + 48 * 60 * 60 * 1000).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    });

                    return (
                      <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{custName}</div>
                          {custPhone && <div className="text-[11px] text-slate-500 font-medium">+91 {custPhone}</div>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{medName}</div>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {medCat}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-800">{medStrength}</div>
                          {medComp && <div className="text-[10px] text-slate-500 truncate max-w-[140px]" title={medComp}>{medComp}</div>}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-800">{res.quantity}</td>
                        <td className="px-4 py-3 font-bold text-emerald-700">₹{res.total_price}</td>
                        <td className="px-4 py-3 text-slate-500 text-[11px]">
                          {new Date(res.created_at).toLocaleDateString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            {pickupDeadline}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge type="reservation" status={res.status} />
                        </td>
                        <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedResForDetails(res)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-[11px] border border-slate-300 transition-colors"
                          >
                            View Details
                          </button>

                          {res.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleUpdateReservation(res.id, 'ACCEPTED')}
                                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-[11px] transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleUpdateReservation(res.id, 'REJECTED')}
                                className="px-2.5 py-1 border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold rounded text-[11px] transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {res.status === 'ACCEPTED' && (
                            <button
                              onClick={() => handleUpdateReservation(res.id, 'READY_FOR_COLLECTION')}
                              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[11px] transition-colors"
                            >
                              Mark Ready
                            </button>
                          )}

                          {res.status === 'READY_FOR_COLLECTION' && (
                            <button
                              onClick={() => handleUpdateReservation(res.id, 'COMPLETED')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[11px] transition-colors"
                            >
                              Mark Collected / Bill
                            </button>
                          )}

                          {res.status === 'COMPLETED' && res.bill && (
                            <button
                              onClick={() => setSelectedBillForPrint(res.bill!)}
                              className="px-2.5 py-1 border border-emerald-300 text-emerald-800 hover:bg-emerald-50 font-bold rounded text-[11px] transition-colors"
                            >
                              View Invoice
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: BILLING */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Generated Bills & Invoices ({bills.length})
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Official pickup receipts generated when customer collection is marked completed.
          </p>

          {bills.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs bg-slate-50 rounded-xl border border-slate-200">
              No bills generated yet. Completed reservations will appear here with printable tax invoices.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Bill Number</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Medicine</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Amount (₹)</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bills.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">{b.bill_number}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{b.customer?.full_name}</td>
                      <td className="px-4 py-3 text-slate-700">{b.medicine_name}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">{b.quantity}</td>
                      <td className="px-4 py-3 font-bold text-emerald-700">₹{b.total_amount}</td>
                      <td className="px-4 py-3 text-slate-400 text-[11px]">
                        {new Date(b.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedBillForPrint(b)}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-[11px] shadow-sm"
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

      {/* TAB CONTENT: ALERTS */}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            Stock & Freshness Alerts
          </h3>
          {alerts.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs bg-slate-50 rounded-xl border border-slate-200">
              No inventory alerts found. Your stock levels are in good order.
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((a) => {
                const isAutoRestored = a.type === 'STOCK_AUTO_RESTORED';
                const isReminder = a.type === 'PICKUP_REMINDER_30M';
                const isNewRes = a.type === 'NEW_RESERVATION';

                return (
                  <div
                    key={a.id}
                    className={`p-4 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 border ${
                      isAutoRestored
                        ? 'bg-emerald-50 border-emerald-300'
                        : isReminder
                        ? 'bg-amber-50 border-amber-300'
                        : isNewRes
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-2.5">
                      {isAutoRestored ? (
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                          ✓
                        </div>
                      ) : isReminder ? (
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                          ⏰
                        </div>
                      ) : isNewRes ? (
                        <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold">
                          🔔
                        </div>
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isAutoRestored
                              ? 'bg-emerald-200 text-emerald-900'
                              : isReminder
                              ? 'bg-amber-200 text-amber-900'
                              : isNewRes
                              ? 'bg-blue-200 text-blue-900'
                              : 'bg-slate-200 text-slate-800'
                          }`}>
                            {isAutoRestored ? 'Stock Auto-Restored' : isReminder ? '30-Min Pre-Expiry Alert' : isNewRes ? 'New Reservation' : 'System Alert'}
                          </span>
                        </div>
                        <span className={`font-medium ${
                          isAutoRestored ? 'text-emerald-950 font-semibold' : isReminder ? 'text-amber-950 font-semibold' : isNewRes ? 'text-blue-950' : 'text-slate-800'
                        }`}>
                          {a.message}
                        </span>
                      </div>
                    </div>

                    <span className="text-slate-400 text-[10px] whitespace-nowrap self-end sm:self-auto">
                      {new Date(a.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: PHARMACY PROFILE */}
      {activeTab === 'profile' && currentPharm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {currentPharm.name}
                </h3>
                <StatusBadge type="verification" status={currentPharm.verification_status} />
              </div>
              <p className="text-xs text-slate-500">
                Official pharmacy profile and public search visibility details.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditPharmModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Pharmacy Details
            </button>
          </div>

          {profileSuccessMsg && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-semibold">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{profileSuccessMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Store Name
              </span>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                {currentPharm.name}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Registered Owner
              </span>
              <p className="text-sm font-bold text-slate-800">
                {currentPharm.owner_name}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Contact Person & Phone
              </span>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                {currentPharm.contact_person} (+91 {currentPharm.mobile_number})
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Official Email
              </span>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5 font-mono">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                {currentPharm.email}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Drug Licence / Reg Number
              </span>
              <p className="text-sm font-bold text-slate-800 font-mono flex items-center gap-1.5">
                <FileBadge className="w-4 h-4 text-emerald-600 shrink-0" />
                {currentPharm.licence_number}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Operating Hours
              </span>
              <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                {currentPharm.opening_hours}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Physical Store Address
              </span>
              <p className="text-sm font-bold text-slate-800 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {currentPharm.address}, {currentPharm.city}, {currentPharm.state} - {currentPharm.pin_code}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 pl-5 font-mono">
                GPS Coordinates: {currentPharm.latitude?.toFixed(4)}, {currentPharm.longitude?.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal to Add New Medicine to Catalog & Pharmacy Stock (Requirement 1.C) */}
      <Modal
        isOpen={isAddingNewMedicineModal}
        onClose={() => {
          setIsAddingNewMedicineModal(false);
          setDuplicateMedicineFound(null);
          setNewMedError(null);
        }}
        title="Add New Medicine to Catalog & Stock"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleCreateNewMedicineAndStock} className="space-y-4">
          <p className="text-xs text-slate-500">
            If the medicine is not available in the existing catalog list, fill out its certified composition and inventory details below. New medicines are permanently stored in the catalog and added to your stock.
          </p>

          {newMedError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 space-y-2">
              <p className="font-semibold">{newMedError}</p>
              {duplicateMedicineFound && (
                <button
                  type="button"
                  onClick={() => handleSelectExistingDuplicate(duplicateMedicineFound)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Select Existing "{duplicateMedicineFound.display_name}" and Stock It
                </button>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Medicine Display Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Medicine Name *
              </label>
              <input
                type="text"
                required
                value={newMedDisplayName}
                onChange={(e) => setNewMedDisplayName(e.target.value)}
                placeholder="e.g. Amlodipine 5 mg Tablet"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Medicine Category *
              </label>
              <select
                required
                value={newMedCategory}
                onChange={(e) => setNewMedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="">-- Select Category --</option>
                {categories.map((c) => (
                  <option key={c.id || c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Generic Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Generic Name *
              </label>
              <input
                type="text"
                required
                value={newMedGenericName}
                onChange={(e) => setNewMedGenericName(e.target.value)}
                placeholder="e.g. Amlodipine"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Composition / Active Ingredients */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Composition / Active Ingredients
              </label>
              <input
                type="text"
                value={newMedComposition}
                onChange={(e) => setNewMedComposition(e.target.value)}
                placeholder="e.g. Amlodipine Besylate IP 5 mg"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Strength */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Strength *
              </label>
              <input
                type="text"
                required
                value={newMedStrength}
                onChange={(e) => setNewMedStrength(e.target.value)}
                placeholder="e.g. 5 mg, 500 mg, 10 mg/ml"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Dosage Form */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dosage Form *
              </label>
              <select
                value={newMedDosageForm}
                onChange={(e) => setNewMedDosageForm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Oral Suspension">Oral Suspension</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
                <option value="Cream">Cream</option>
                <option value="Eye Drops">Eye Drops</option>
                <option value="Ear Drops">Ear Drops</option>
                <option value="Inhaler / Respules">Inhaler / Respules</option>
              </select>
            </div>

            {/* Manufacturer */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                value={newMedManufacturer}
                onChange={(e) => setNewMedManufacturer(e.target.value)}
                placeholder="e.g. Cipla Ltd / Sun Pharmaceutical"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                min="0"
                required
                value={newMedQuantity}
                onChange={(e) => setNewMedQuantity(e.target.value)}
                placeholder="e.g. 50"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Selling Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Price per unit (₹) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={newMedPrice}
                onChange={(e) => setNewMedPrice(e.target.value)}
                placeholder="e.g. 28.50"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Batch Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Batch Number
              </label>
              <input
                type="text"
                value={newMedBatchNumber}
                onChange={(e) => setNewMedBatchNumber(e.target.value)}
                placeholder="e.g. BATCH-2026-X1"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="date"
                required
                value={newMedExpiryDate}
                onChange={(e) => setNewMedExpiryDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setIsAddingNewMedicineModal(false);
                setDuplicateMedicineFound(null);
                setNewMedError(null);
              }}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSavingNewMed}
              className="px-5 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSavingNewMed ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving Medicine & Stock...
                </>
              ) : (
                'Save Medicine & Add to Stock'
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={Boolean(selectedBillForPrint)}
        onClose={() => setSelectedBillForPrint(null)}
        bill={selectedBillForPrint}
      />

      {/* Reservation Details Modal (Requirement 3) */}
      <ReservationDetailsModal
        isOpen={Boolean(selectedResForDetails)}
        onClose={() => setSelectedResForDetails(null)}
        reservation={selectedResForDetails}
        currentUser={user}
      />

      {/* Edit Pharmacy Details Modal */}
      <EditPharmacyModal
        isOpen={isEditPharmModalOpen}
        onClose={() => setIsEditPharmModalOpen(false)}
        pharmacy={currentPharm}
        onSuccess={(updated) => {
          setCurrentPharm(updated);
          setProfileSuccessMsg('Pharmacy details updated successfully! Map location has been re-synchronized.');
          refreshUser();
        }}
      />
    </div>
  );
};
