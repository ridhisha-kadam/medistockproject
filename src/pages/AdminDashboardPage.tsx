import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Pharmacy, AuditLog, VerificationStatus, Profile, Medicine, MedicineVariant } from '../types/database';
import { THERAPEUTIC_CATEGORIES } from '../data/medicineCatalogData';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { EditPharmacyModal } from '../components/EditPharmacyModal';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Ban, 
  XCircle, 
  Users, 
  FileText, 
  Activity, 
  BarChart3, 
  LogOut,
  Loader2,
  AlertTriangle,
  Edit3,
  BookOpen,
  Plus,
  PlusCircle,
  Search,
  Trash2,
  Layers,
  Pill,
  Check,
  Database,
  Download
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<'verification' | 'catalog' | 'users' | 'audit' | 'reports'>('verification');
  const [pharmacyTab, setPharmacyTab] = useState<VerificationStatus>('PENDING_VERIFICATION');

  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedPharmForEdit, setSelectedPharmForEdit] = useState<Pharmacy | null>(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalPharmacies: 0,
    pendingPharmacies: 0,
    approvedPharmacies: 0,
    rejectedPharmacies: 0,
    disabledPharmacies: 0,
    totalMedicines: 0,
    totalVariants: 0,
    totalCategories: 0,
    totalInventoryListings: 0,
    totalReservations: 0,
    activeReservations: 0,
    collectedReservations: 0,
    expiredReservations: 0,
    cancelledReservations: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Catalog Section State
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('');
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);
  const [isEditMedModalOpen, setIsEditMedModalOpen] = useState(false);
  const [targetMedForVariant, setTargetMedForVariant] = useState<Medicine | null>(null);
  const [targetMedForEdit, setTargetMedForEdit] = useState<Medicine | null>(null);
  const [medActionError, setMedActionError] = useState<string | null>(null);
  const [medActionSuccess, setMedActionSuccess] = useState<string | null>(null);

  // Add Medicine Form
  const [newMedForm, setNewMedForm] = useState({
    genericName: '',
    displayName: '',
    category: THERAPEUTIC_CATEGORIES[0]?.name || 'Blood Pressure (BP) and Hypertension',
    activeIngredient: '',
    composition: '',
    strength: '500 mg',
    dosageForm: 'Tablet',
    route: 'Oral',
    referenceSource: 'NLEM 2022 / IP',
    description: '',
    isPrescriptionRequired: true,
  });

  // Add Variant Form
  const [newVariantForm, setNewVariantForm] = useState({
    strength: '',
    dosageForm: 'Tablet',
    route: 'Oral',
    composition: '',
    referenceSource: 'NLEM 2022 / IP',
    isPrescriptionRequired: true,
  });

  // Safe Cleanup & Backup State (Requirement 4)
  const [cleanupMessage, setCleanupMessage] = useState<string | null>(null);

  const handleBackupDatabase = () => {
    const jsonStr = api.backupDatabase();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medistock_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExecuteSafeCleanup = async () => {
    if (!confirm('Are you sure you want to perform safe database cleanup?\n\n• ALL pharmacy names and accounts will be KEPT.\n• ALL customer accounts and passwords will be KEPT.\n• ALL master catalog medicines will be KEPT.\n• Pharmacy stock will be cleared to empty.\n• Reservations will be cleared.\n\nA backup will be created automatically first.')) return;
    try {
      const res = api.performSafeDatabaseCleanup();
      setCleanupMessage(`Safe cleanup executed successfully! Automatic backup saved under "${res.backupKey}". Pharmacy stock and reservations are now clean.`);
      await loadAdminData();
    } catch (e: any) {
      alert(e.message || 'Cleanup error.');
    }
  };

  const handleExecuteCompleteReset = async () => {
    if (!confirm('WARNING: Complete Database Reset will reset the platform to a brand-new application state.\n\n• All operational data will be deleted.\n• All accounts will be cleared.\n• An automatic JSON backup will be created in browser storage.\n• You will be redirected to the First-Time Admin Setup page.\n\nAre you sure you want to proceed?')) return;
    try {
      const res = api.resetToCleanState();
      alert(`Database successfully reset to clean initial state. Backup saved under "${res.backupKey}". You will now be redirected to set up the primary administrator account.`);
      navigate('/admin/setup');
    } catch (e: any) {
      alert(e.message || 'Reset error.');
    }
  };

  // Edit Medicine Form
  const [editMedForm, setEditMedForm] = useState({
    displayName: '',
    genericName: '',
    category: '',
    activeIngredient: '',
    composition: '',
    strengthForm: '',
    dosageForm: '',
    route: '',
    referenceSource: '',
    description: '',
    isPrescriptionRequired: true,
  });

  // Reject Modal state
  const [selectedPharmForReject, setSelectedPharmForReject] = useState<Pharmacy | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [rejectError, setRejectError] = useState<string | null>(null);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAdminDashboardData();
      setStats({
        totalCustomers: data.totalCustomers,
        totalPharmacies: data.totalPharmacies,
        pendingPharmacies: data.pendingPharmacies,
        approvedPharmacies: data.approvedPharmacies,
        rejectedPharmacies: data.rejectedPharmacies,
        disabledPharmacies: data.disabledPharmacies,
        totalMedicines: data.totalMedicines,
        totalVariants: data.totalVariants || 0,
        totalCategories: data.totalCategories || 40,
        totalInventoryListings: data.totalInventoryListings,
        totalReservations: data.totalReservations,
        activeReservations: data.activeReservations || 0,
        collectedReservations: data.collectedReservations || 0,
        expiredReservations: data.expiredReservations || 0,
        cancelledReservations: data.cancelledReservations || 0,
      });
      setPharmacies(data.pharmacies);
      setMedicines(data.medicines || []);
      setAuditLogs(data.auditLogs);
    } catch (e) {
      console.error('Failed loading admin dashboard data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
      return;
    }
    loadAdminData();
  }, [isAdmin]);

  const handleApprovePharmacy = async (pharmacyId: string) => {
    if (!confirm('Approve this pharmacy registration? This will enable public customer visibility.')) return;
    try {
      await api.verifyPharmacy({
        pharmacyId,
        status: 'APPROVED',
        adminId: user?.id,
      });
      await loadAdminData();
    } catch (e: any) {
      alert(e.message || 'Failed to approve pharmacy.');
    }
  };

  const handleDisablePharmacy = async (pharmacyId: string) => {
    if (!confirm('Disable this pharmacy? It will be immediately removed from customer search results.')) return;
    try {
      await api.verifyPharmacy({
        pharmacyId,
        status: 'DISABLED',
        adminId: user?.id,
      });
      await loadAdminData();
    } catch (e: any) {
      alert(e.message || 'Failed to disable pharmacy.');
    }
  };

  const handleOpenRejectModal = (pharm: Pharmacy) => {
    setSelectedPharmForReject(pharm);
    setRejectionReason('');
    setRejectError(null);
  };

  const handleConfirmRejection = async () => {
    if (!selectedPharmForReject) return;
    if (!rejectionReason.trim()) {
      setRejectError('A rejection reason is mandatory per MediStock regulations.');
      return;
    }

    setIsRejecting(true);
    try {
      await api.verifyPharmacy({
        pharmacyId: selectedPharmForReject.id,
        status: 'REJECTED',
        rejectionReason: rejectionReason.trim(),
        adminId: user?.id,
      });
      setSelectedPharmForReject(null);
      await loadAdminData();
    } catch (e: any) {
      setRejectError(e.message || 'Failed to reject pharmacy.');
    } finally {
      setIsRejecting(false);
    }
  };

  // FEATURE 5: Admin Catalog Management Handlers
  const handleAddMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    setMedActionError(null);
    setMedActionSuccess(null);

    if (!newMedForm.genericName.trim()) {
      setMedActionError('Generic Medicine Name is required.');
      return;
    }
    if (!newMedForm.category.trim()) {
      setMedActionError('Therapeutic Category is required.');
      return;
    }
    if (!newMedForm.activeIngredient.trim()) {
      setMedActionError('Active Ingredient is required.');
      return;
    }
    if (!newMedForm.composition.trim()) {
      setMedActionError('Complete Composition is required.');
      return;
    }

    try {
      const displayName = newMedForm.displayName.trim() || `${newMedForm.genericName.trim()} ${newMedForm.strength.trim()} ${newMedForm.dosageForm.trim()}`;
      await api.createMedicine({
        genericName: newMedForm.genericName.trim(),
        displayName,
        category: newMedForm.category.trim(),
        activeIngredient: newMedForm.activeIngredient.trim(),
        composition: newMedForm.composition.trim(),
        strengthForm: `${newMedForm.strength.trim()} ${newMedForm.dosageForm.trim()}`,
        dosageForm: newMedForm.dosageForm.trim(),
        route: newMedForm.route.trim(),
        referenceSource: newMedForm.referenceSource.trim() || 'NLEM 2022 / IP',
        description: newMedForm.description.trim() || `${newMedForm.genericName.trim()} for ${newMedForm.category.trim()}`,
        isPrescriptionRequired: newMedForm.isPrescriptionRequired,
        createdBy: user?.id,
      });

      setMedActionSuccess(`Medicine "${newMedForm.genericName.trim()}" added to catalog successfully!`);
      setIsAddMedModalOpen(false);
      setNewMedForm({
        genericName: '',
        displayName: '',
        category: THERAPEUTIC_CATEGORIES[0]?.name || 'Blood Pressure (BP) and Hypertension',
        activeIngredient: '',
        composition: '',
        strength: '500 mg',
        dosageForm: 'Tablet',
        route: 'Oral',
        referenceSource: 'NLEM 2022 / IP',
        description: '',
        isPrescriptionRequired: true,
      });
      await loadAdminData();
    } catch (err: any) {
      setMedActionError(err.message || 'Failed to add medicine to catalog.');
    }
  };

  const handleOpenAddVariant = (med: Medicine) => {
    setTargetMedForVariant(med);
    setNewVariantForm({
      strength: '',
      dosageForm: med.dosage_form || 'Tablet',
      route: med.route || 'Oral',
      composition: med.composition || med.active_ingredient || '',
      referenceSource: med.reference_source || 'NLEM 2022 / IP',
      isPrescriptionRequired: med.is_prescription_required !== false,
    });
    setMedActionError(null);
    setMedActionSuccess(null);
    setIsAddVariantModalOpen(true);
  };

  const handleAddVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMedForVariant) return;
    setMedActionError(null);
    setMedActionSuccess(null);

    if (!newVariantForm.strength.trim()) {
      setMedActionError('Strength is required (e.g. 650 mg).');
      return;
    }
    if (!newVariantForm.dosageForm.trim()) {
      setMedActionError('Dosage Form is required (e.g. Tablet).');
      return;
    }

    try {
      await api.addMedicineVariant(targetMedForVariant.id, {
        strength: newVariantForm.strength.trim(),
        dosage_form: newVariantForm.dosageForm.trim(),
        route: newVariantForm.route.trim() || 'Oral',
        composition: newVariantForm.composition.trim() || targetMedForVariant.composition || '',
        reference_source: newVariantForm.referenceSource.trim() || 'NLEM 2022 / IP',
        is_prescription_required: newVariantForm.isPrescriptionRequired,
      });

      setMedActionSuccess(`Variant "${newVariantForm.strength} ${newVariantForm.dosageForm}" added to ${targetMedForVariant.generic_name}!`);
      setIsAddVariantModalOpen(false);
      setTargetMedForVariant(null);
      await loadAdminData();
    } catch (err: any) {
      setMedActionError(err.message || 'Failed to add variant.');
    }
  };

  const handleDeleteVariant = async (medId: string, variantId: string) => {
    if (!confirm('Are you sure you want to delete this formulation variant?')) return;
    try {
      await api.deleteMedicineVariant(medId, variantId);
      await loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete variant.');
    }
  };

  const handleOpenEditMedicine = (med: Medicine) => {
    setTargetMedForEdit(med);
    setEditMedForm({
      displayName: med.display_name,
      genericName: med.generic_name,
      category: med.category,
      activeIngredient: med.active_ingredient || '',
      composition: med.composition || '',
      strengthForm: med.strength_form,
      dosageForm: med.dosage_form || '',
      route: med.route || '',
      referenceSource: med.reference_source || 'NLEM 2022 / IP',
      description: med.description || '',
      isPrescriptionRequired: med.is_prescription_required !== false,
    });
    setMedActionError(null);
    setMedActionSuccess(null);
    setIsEditMedModalOpen(true);
  };

  const handleSaveEditMedicine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMedForEdit) return;
    setMedActionError(null);

    try {
      await api.updateMedicine(targetMedForEdit.id, {
        display_name: editMedForm.displayName.trim(),
        generic_name: editMedForm.genericName.trim(),
        category: editMedForm.category.trim(),
        active_ingredient: editMedForm.activeIngredient.trim(),
        composition: editMedForm.composition.trim(),
        strength_form: editMedForm.strengthForm.trim(),
        dosage_form: editMedForm.dosageForm.trim(),
        route: editMedForm.route.trim(),
        reference_source: editMedForm.referenceSource.trim(),
        description: editMedForm.description.trim(),
        is_prescription_required: editMedForm.isPrescriptionRequired,
      });

      setMedActionSuccess(`Medicine "${editMedForm.genericName}" updated successfully!`);
      setIsEditMedModalOpen(false);
      setTargetMedForEdit(null);
      await loadAdminData();
    } catch (err: any) {
      setMedActionError(err.message || 'Failed to update medicine.');
    }
  };

  const handleDeleteMedicine = async (medId: string, medName: string) => {
    if (!confirm(`Are you sure you want to delete "${medName}" from the catalog? This cannot be undone.`)) return;
    try {
      await api.deleteMedicine(medId);
      await loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete medicine.');
    }
  };

  // Case-Insensitive, Exact-Spelling Catalog Filter (FEATURE 3)
  const filteredCatalog = medicines.filter((med) => {
    if (catalogCategory && med.category !== catalogCategory) {
      return false;
    }

    const q = catalogSearch.trim().toLowerCase();
    if (!q) return true;

    const generic = (med.generic_name || '').trim().toLowerCase();
    const display = (med.display_name || '').trim().toLowerCase();
    const active = (med.active_ingredient || '').trim().toLowerCase();
    const cat = (med.category || '').trim().toLowerCase();

    if (generic === q || display === q || active === q || cat === q) {
      return true;
    }

    if (med.variants?.some(v => {
      const vStr = v.strength.trim().toLowerCase();
      const vComb = `${generic} ${vStr}`;
      return vStr === q || vComb === q;
    })) {
      return true;
    }

    return false;
  });

  // Filtered pharmacies for the active verification tab
  const filteredPharmacies = pharmacies.filter(p => p.verification_status === pharmacyTab);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-3" />
        <p className="text-sm font-medium">Loading administrative security portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-slate-50">
      {/* Left Dark Green Sidebar (Exact Fig 9.7) */}
      <aside className="w-full md:w-64 bg-emerald-950 text-white flex flex-col shrink-0 border-r border-emerald-900">
        <div className="p-6 border-b border-emerald-900/60 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xl">
            +
          </div>
          <span className="text-xl font-bold tracking-tight">MediStock</span>
        </div>

        <nav className="p-4 space-y-1.5 flex-1 text-xs font-semibold">
          <button
            onClick={() => setActiveSection('verification')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeSection === 'verification'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'text-emerald-100/70 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Pharmacy verification
          </button>

          <button
            onClick={() => setActiveSection('catalog')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
              activeSection === 'catalog'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'text-emerald-100/70 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Medicine Catalogue</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-800 text-emerald-200">
              {stats.totalMedicines || 245}
            </span>
          </button>

          <button
            onClick={() => setActiveSection('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeSection === 'users'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'text-emerald-100/70 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            Users
          </button>

          <button
            onClick={() => setActiveSection('audit')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeSection === 'audit'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'text-emerald-100/70 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            Records / audit log
          </button>

          <button
            onClick={() => setActiveSection('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeSection === 'reports'
                ? 'bg-emerald-700 text-white font-bold shadow-sm'
                : 'text-emerald-100/70 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            System reports
          </button>
        </nav>

        <div className="p-4 border-t border-emerald-900/60">
          <div className="flex items-center justify-between px-2">
            <div>
              <span className="text-xs font-bold text-white block">Administrator</span>
              <span className="text-[10px] text-emerald-400">admin@medistock.local</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
              ADMIN
            </span>
          </div>
        </div>
      </aside>

      {/* Main Administrative Work Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 capitalize">
              {activeSection === 'verification' 
                ? 'Pharmacy verification' 
                : activeSection === 'catalog'
                ? 'Medicine Catalogue Management'
                : activeSection}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeSection === 'catalog'
                ? 'Comprehensive catalog of 200+ generic medicines across 40 therapeutic categories. Add, edit, manage formulations & variants.'
                : 'Strict administrative review portal. Pharmacy details must originate only from self-registration.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">Administrator</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              ADMIN
            </span>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* SECTION 1: PHARMACY VERIFICATION (Exact Fig 9.7) */}
        {activeSection === 'verification' && (
          <div className="space-y-8">
            {/* 3 Metric Cards (Exact Fig 9.7) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1: Pending review */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">Pending review</span>
                  <div className="text-3xl font-black text-amber-600">{stats.pendingPharmacies}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              {/* Card 2: Verified */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">Verified</span>
                  <div className="text-3xl font-black text-emerald-600">{stats.approvedPharmacies}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>

              {/* Card 3: Disabled */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">Disabled</span>
                  <div className="text-3xl font-black text-slate-700">{stats.disabledPharmacies}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Ban className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Filter Tabs Bar (Exact Fig 9.7) */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPharmacyTab('PENDING_VERIFICATION')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  pharmacyTab === 'PENDING_VERIFICATION'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Pending ({stats.pendingPharmacies})
              </button>

              <button
                onClick={() => setPharmacyTab('APPROVED')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  pharmacyTab === 'APPROVED'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Verified ({stats.approvedPharmacies})
              </button>

              <button
                onClick={() => setPharmacyTab('REJECTED')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  pharmacyTab === 'REJECTED'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Rejected ({stats.rejectedPharmacies})
              </button>

              <button
                onClick={() => setPharmacyTab('DISABLED')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  pharmacyTab === 'DISABLED'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Disabled ({stats.disabledPharmacies})
              </button>
            </div>

            {/* Pharmacy Table (Exact Fig 9.7) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {filteredPharmacies.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-sm">
                  No pharmacies currently in {pharmacyTab.toLowerCase().replace('_', ' ')} state.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Pharmacy</th>
                        <th className="px-6 py-4">Owner / Contact</th>
                        <th className="px-6 py-4">Licence Number</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPharmacies.map((pharm) => (
                        <tr key={pharm.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{pharm.name}</div>
                            <div className="text-xs text-slate-500">{pharm.address}, {pharm.city}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-800">{pharm.owner_name}</div>
                            <div className="text-xs text-slate-500">{pharm.mobile_number}</div>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs font-medium text-slate-700">
                            {pharm.licence_number}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge type="verification" status={pharm.verification_status} />
                            {pharm.rejection_reason && (
                              <div className="text-[11px] text-rose-600 mt-1 max-w-xs">
                                Reason: {pharm.rejection_reason}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => setSelectedPharmForEdit(pharm)}
                              className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                              title="Edit Pharmacy Details"
                            >
                              <Edit3 className="w-3 h-3 text-slate-500" />
                              Edit
                            </button>

                            {pharm.verification_status === 'PENDING_VERIFICATION' && (
                              <>
                                <button
                                  onClick={() => handleApprovePharmacy(pharm.id)}
                                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleOpenRejectModal(pharm)}
                                  className="px-3.5 py-1.5 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {pharm.verification_status === 'APPROVED' && (
                              <button
                                onClick={() => handleDisablePharmacy(pharm.id)}
                                className="px-3.5 py-1.5 border border-rose-300 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors"
                              >
                                Disable
                              </button>
                            )}

                            {(pharm.verification_status === 'DISABLED' || pharm.verification_status === 'REJECTED') && (
                              <button
                                onClick={() => handleApprovePharmacy(pharm.id)}
                                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
                              >
                                Reactivate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Audit Events Section (Exact Fig 9.7) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-700" />
                Recent audit events
              </h3>

              {auditLogs.length === 0 ? (
                <div className="p-4 text-slate-400 text-xs">
                  No administrative audit events recorded yet.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {auditLogs.slice(0, 8).map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between text-xs py-2 border-b border-slate-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-400 text-[11px]">
                          {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {log.actor_email || 'System'}:
                        </span>
                        <span className="text-slate-600">
                          {log.action.replace(/_/g, ' ').toLowerCase()}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(log.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: MEDICINE CATALOG MANAGEMENT (FEATURES 1, 2, 3, 5) */}
        {activeSection === 'catalog' && (
          <div className="space-y-6">
            {/* Top Catalog Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">Generic Medicines</span>
                  <div className="text-3xl font-black text-emerald-700">{stats.totalMedicines}</div>
                  <span className="text-[11px] text-emerald-600 font-medium">Distinct Generic Active Ingredients</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <Pill className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">Verified Variants & Strengths</span>
                  <div className="text-3xl font-black text-blue-600">{stats.totalVariants}</div>
                  <span className="text-[11px] text-blue-600 font-medium">Formulations & Dosages</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">Therapeutic Categories</span>
                  <div className="text-3xl font-black text-purple-600">{stats.totalCategories}</div>
                  <span className="text-[11px] text-purple-600 font-medium">BP, Diabetes, Heart, Fever, etc.</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Notifications */}
            {medActionSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{medActionSuccess}</span>
                </div>
                <button onClick={() => setMedActionSuccess(null)} className="text-emerald-600 hover:text-emerald-900">
                  ✕
                </button>
              </div>
            )}

            {medActionError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{medActionError}</span>
                </div>
                <button onClick={() => setMedActionError(null)} className="text-rose-600 hover:text-rose-900">
                  ✕
                </button>
              </div>
            )}

            {/* Catalog Filter and Actions Bar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                {/* Exact Spelling Search (Feature 3) */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search medicine (exact spelling: e.g. Paracetamol)..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                  {catalogSearch && (
                    <button
                      onClick={() => setCatalogSearch('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                <select
                  value={catalogCategory}
                  onChange={(e) => setCatalogCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="">All 40 Categories ({stats.totalMedicines} medicines)</option>
                  {THERAPEUTIC_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add New Medicine Button */}
              <button
                onClick={() => {
                  setMedActionError(null);
                  setMedActionSuccess(null);
                  setIsAddMedModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add New Medicine
              </button>
            </div>

            {/* Catalog Medicines Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  Showing {filteredCatalog.length} of {medicines.length} generic medicines
                  {catalogCategory && ` in ${catalogCategory}`}
                </span>
                {catalogSearch && (
                  <span className="text-slate-500 font-mono text-[11px]">
                    Exact match: "{catalogSearch.trim()}"
                  </span>
                )}
              </div>

              {filteredCatalog.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  <Pill className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-slate-700">No medicines found</p>
                  <p className="mt-1">
                    Search requires exact spelling per MediStock specification. Check spelling or clear filters.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3.5">Generic Medicine</th>
                        <th className="px-5 py-3.5">Category</th>
                        <th className="px-5 py-3.5">Active Ingredient / Composition</th>
                        <th className="px-5 py-3.5">Verified Variants ({stats.totalVariants})</th>
                        <th className="px-5 py-3.5">Reference / Rx</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCatalog.map((med) => (
                        <tr key={med.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-slate-900 text-sm">{med.generic_name}</div>
                            <div className="text-[11px] text-slate-500 font-medium">{med.display_name}</div>
                          </td>

                          <td className="px-5 py-3.5">
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                              {med.category}
                            </span>
                          </td>

                          <td className="px-5 py-3.5 max-w-xs">
                            <div className="font-medium text-slate-800">{med.active_ingredient}</div>
                            <div className="text-[11px] text-slate-500 truncate" title={med.composition}>
                              {med.composition}
                            </div>
                          </td>

                          <td className="px-5 py-3.5">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {med.variants && med.variants.length > 0 ? (
                                med.variants.map((v) => (
                                  <span
                                    key={v.id}
                                    className="group inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  >
                                    <span>{v.strength} {v.dosage_form}</span>
                                    {med.variants && med.variants.length > 1 && (
                                      <button
                                        onClick={() => handleDeleteVariant(med.id, v.id)}
                                        className="text-rose-400 hover:text-rose-700 opacity-60 hover:opacity-100 transition-opacity"
                                        title="Delete variant"
                                      >
                                        ✕
                                      </button>
                                    )}
                                  </span>
                                ))
                              ) : (
                                <span className="text-[11px] text-slate-400">{med.strength_form}</span>
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-3.5">
                            <div className="text-[11px] font-mono text-slate-600">
                              {med.reference_source || 'NLEM 2022 / IP'}
                            </div>
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold mt-0.5 ${
                              med.is_prescription_required !== false 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {med.is_prescription_required !== false ? 'Prescription Required' : 'Non-Prescription / OTC'}
                            </span>
                          </td>

                          <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => handleOpenAddVariant(med)}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                              title="Add formulation variant (strength / dosage form)"
                            >
                              <PlusCircle className="w-3 h-3 text-emerald-700" />
                              + Variant
                            </button>

                            <button
                              onClick={() => handleOpenEditMedicine(med)}
                              className="px-2.5 py-1 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                              title="Edit medicine details"
                            >
                              <Edit3 className="w-3 h-3 text-slate-500" />
                              Edit
                            </button>

                            <button
                              onClick={() => handleDeleteMedicine(med.id, med.generic_name)}
                              className="px-2 py-1 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
                              title="Delete medicine"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 2: USERS MANAGEMENT */}
        {activeSection === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2">Registered System Users</h3>
            <p className="text-xs text-slate-500 mb-6">
              Total registered customers: {stats.totalCustomers}
            </p>
            <div className="text-xs text-slate-500 bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
              Customer accounts and role bindings are maintained securely via Supabase Auth and Row Level Security.
            </div>
          </div>
        )}

        {/* SECTION 3: AUDIT LOGS FULL VIEW */}
        {activeSection === 'audit' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">Complete System Audit Logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Entity Type</th>
                    <th className="p-3">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="p-3 text-slate-500">{new Date(log.created_at).toLocaleString()}</td>
                      <td className="p-3 font-bold text-slate-800">{log.action}</td>
                      <td className="p-3 text-slate-600">{log.entity_type}</td>
                      <td className="p-3 text-slate-600">{JSON.stringify(log.details || {})}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 4: SYSTEM REPORTS & METRICS */}
        {activeSection === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">System Analytics & Distribution</h3>
              <p className="text-xs text-slate-500 mb-6">
                Comprehensive overview of central catalog medicines, verified formulations, active listings, and 48-hour reservation lifecycle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs mb-6">
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
                  <span className="font-bold text-slate-800 block mb-1">Total Generic Medicines</span>
                  <span className="text-2xl font-black text-emerald-700">{stats.totalMedicines}</span>
                  <p className="text-[11px] text-slate-500 mt-1">Predefined verified active ingredients</p>
                </div>

                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200">
                  <span className="font-bold text-slate-800 block mb-1">Formulation Variants</span>
                  <span className="text-2xl font-black text-blue-700">{stats.totalVariants}</span>
                  <p className="text-[11px] text-slate-500 mt-1">Verified dosage forms & strengths</p>
                </div>

                <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200">
                  <span className="font-bold text-slate-800 block mb-1">Therapeutic Categories</span>
                  <span className="text-2xl font-black text-purple-700">{stats.totalCategories}</span>
                  <p className="text-[11px] text-slate-500 mt-1">Full therapeutic disease classification</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Active Listings</span>
                  <span className="text-xl font-black text-slate-900">{stats.totalInventoryListings}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Total Reservations</span>
                  <span className="text-xl font-black text-slate-900">{stats.totalReservations}</span>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-900 block mb-1">Active (Within 48h)</span>
                  <span className="text-xl font-black text-amber-700">{stats.activeReservations}</span>
                </div>

                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                  <span className="font-bold text-rose-900 block mb-1">Expired (48h limit)</span>
                  <span className="text-xl font-black text-rose-700">{stats.expiredReservations}</span>
                </div>
              </div>
            </div>

            {/* Database Maintenance & Safe Cleanup Card (Requirement 4) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Database Safety & Maintenance</h3>
                  <p className="text-xs text-slate-500">
                    Safe backup and cleanup utility per MediStock database safety specifications.
                  </p>
                </div>
              </div>

              {cleanupMessage && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-950 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{cleanupMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-extrabold text-emerald-800 block mb-1">✓ Pharmacy Accounts</span>
                  <p className="text-slate-600">All registered pharmacy names and credentials remain 100% intact.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-extrabold text-emerald-800 block mb-1">✓ Customer Accounts</span>
                  <p className="text-slate-600">All registered customers, phone numbers, and logins are preserved.</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-extrabold text-emerald-800 block mb-1">✓ Medicine Catalog</span>
                  <p className="text-slate-600">All 245 predefined generic medicines and categories are preserved.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">
                  Safe cleanup empties pharmacy stock and reservations only (no DROP TABLE or database reset).
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBackupDatabase}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    Download JSON Backup
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteSafeCleanup}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    <Database className="w-3.5 h-3.5" />
                    Execute Safe Cleanup
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteCompleteReset}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Complete Reset (Clean Slate)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mandatory Rejection Reason Modal (Section 10) */}
      <Modal
        isOpen={Boolean(selectedPharmForReject)}
        onClose={() => setSelectedPharmForReject(null)}
        title="Reject Pharmacy Registration"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            MediStock compliance requires a clear, mandatory rejection reason explaining why this pharmacy registration cannot be approved.
          </p>

          {rejectError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{rejectError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Rejection Reason *
            </label>
            <textarea
              required
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Drug licence number could not be verified on state register."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setSelectedPharmForReject(null)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isRejecting}
              onClick={handleConfirmRejection}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
            >
              {isRejecting ? 'Rejecting...' : 'Confirm Rejection'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Admin Edit Pharmacy Details Modal */}
      <EditPharmacyModal
        isOpen={Boolean(selectedPharmForEdit)}
        onClose={() => setSelectedPharmForEdit(null)}
        pharmacy={selectedPharmForEdit}
        onSuccess={() => {
          loadAdminData();
        }}
      />

      {/* FEATURE 5: Add New Generic Medicine to Catalog Modal */}
      <Modal
        isOpen={isAddMedModalOpen}
        onClose={() => setIsAddMedModalOpen(false)}
        title="Add New Generic Medicine to Catalogue"
      >
        <form onSubmit={handleAddMedicine} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <p className="text-xs text-slate-500">
            Add a verified generic medicine to the central MediStock catalog. Complete composition and therapeutic category are required per NLEM / WHO ATC standards.
          </p>

          {medActionError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {medActionError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Generic Medicine Name *
              </label>
              <input
                type="text"
                required
                value={newMedForm.genericName}
                onChange={(e) => setNewMedForm({ ...newMedForm, genericName: e.target.value })}
                placeholder="e.g. Paracetamol"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Display Name (Optional)
              </label>
              <input
                type="text"
                value={newMedForm.displayName}
                onChange={(e) => setNewMedForm({ ...newMedForm, displayName: e.target.value })}
                placeholder="e.g. Paracetamol 500 mg Tablet"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Therapeutic Category *
            </label>
            <select
              required
              value={newMedForm.category}
              onChange={(e) => setNewMedForm({ ...newMedForm, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {THERAPEUTIC_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Active Ingredient *
              </label>
              <input
                type="text"
                required
                value={newMedForm.activeIngredient}
                onChange={(e) => setNewMedForm({ ...newMedForm, activeIngredient: e.target.value })}
                placeholder="e.g. Paracetamol"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Complete Composition *
              </label>
              <input
                type="text"
                required
                value={newMedForm.composition}
                onChange={(e) => setNewMedForm({ ...newMedForm, composition: e.target.value })}
                placeholder="e.g. Paracetamol 500 mg"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Initial Strength *
              </label>
              <input
                type="text"
                required
                value={newMedForm.strength}
                onChange={(e) => setNewMedForm({ ...newMedForm, strength: e.target.value })}
                placeholder="e.g. 500 mg"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dosage Form *
              </label>
              <select
                required
                value={newMedForm.dosageForm}
                onChange={(e) => setNewMedForm({ ...newMedForm, dosageForm: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Oral Suspension">Oral Suspension</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
                <option value="Cream">Cream</option>
                <option value="Eye Drops">Eye Drops</option>
                <option value="Inhaler">Inhaler</option>
                <option value="Powder">Powder</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Route *
              </label>
              <select
                required
                value={newMedForm.route}
                onChange={(e) => setNewMedForm({ ...newMedForm, route: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Oral">Oral</option>
                <option value="Intravenous">Intravenous</option>
                <option value="Intramuscular">Intramuscular</option>
                <option value="Topical">Topical</option>
                <option value="Inhalation">Inhalation</option>
                <option value="Ophthalmic">Ophthalmic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reference Source
              </label>
              <input
                type="text"
                value={newMedForm.referenceSource}
                onChange={(e) => setNewMedForm({ ...newMedForm, referenceSource: e.target.value })}
                placeholder="e.g. NLEM 2022 / IP / WHO ATC"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={newMedForm.isPrescriptionRequired}
                  onChange={(e) => setNewMedForm({ ...newMedForm, isPrescriptionRequired: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Prescription Required (Schedule H / Rx)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={newMedForm.description}
              onChange={(e) => setNewMedForm({ ...newMedForm, description: e.target.value })}
              placeholder="Standard clinical formulation details..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddMedModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Save Medicine to Catalog
            </button>
          </div>
        </form>
      </Modal>

      {/* FEATURE 5.2: Add Additional Variant Modal */}
      <Modal
        isOpen={isAddVariantModalOpen}
        onClose={() => setIsAddVariantModalOpen(false)}
        title={`Add Formulation Variant to ${targetMedForVariant?.generic_name || 'Medicine'}`}
      >
        <form onSubmit={handleAddVariant} className="space-y-4">
          <p className="text-xs text-slate-500">
            Add another verified strength or dosage form to <strong>{targetMedForVariant?.generic_name}</strong> (e.g. 650 mg Tablet, or 125 mg/5 mL Oral Suspension).
          </p>

          {medActionError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {medActionError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Strength *
              </label>
              <input
                type="text"
                required
                value={newVariantForm.strength}
                onChange={(e) => setNewVariantForm({ ...newVariantForm, strength: e.target.value })}
                placeholder="e.g. 650 mg, or 120 mg/5 mL"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dosage Form *
              </label>
              <select
                required
                value={newVariantForm.dosageForm}
                onChange={(e) => setNewVariantForm({ ...newVariantForm, dosageForm: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Oral Suspension">Oral Suspension</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
                <option value="Cream">Cream</option>
                <option value="Eye Drops">Eye Drops</option>
                <option value="Inhaler">Inhaler</option>
                <option value="Powder">Powder</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Route
              </label>
              <select
                value={newVariantForm.route}
                onChange={(e) => setNewVariantForm({ ...newVariantForm, route: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Oral">Oral</option>
                <option value="Intravenous">Intravenous</option>
                <option value="Intramuscular">Intramuscular</option>
                <option value="Topical">Topical</option>
                <option value="Inhalation">Inhalation</option>
                <option value="Ophthalmic">Ophthalmic</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reference Source
              </label>
              <input
                type="text"
                value={newVariantForm.referenceSource}
                onChange={(e) => setNewVariantForm({ ...newVariantForm, referenceSource: e.target.value })}
                placeholder="e.g. NLEM 2022 / IP"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Variant Specific Composition
            </label>
            <input
              type="text"
              value={newVariantForm.composition}
              onChange={(e) => setNewVariantForm({ ...newVariantForm, composition: e.target.value })}
              placeholder={`e.g. ${targetMedForVariant?.generic_name || 'Active Ingredient'} ${newVariantForm.strength}`}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddVariantModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Add Variant
            </button>
          </div>
        </form>
      </Modal>

      {/* FEATURE 5.3: Edit Medicine Modal */}
      <Modal
        isOpen={isEditMedModalOpen}
        onClose={() => setIsEditMedModalOpen(false)}
        title={`Edit Medicine: ${targetMedForEdit?.generic_name || ''}`}
      >
        <form onSubmit={handleSaveEditMedicine} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          {medActionError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {medActionError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Generic Name *
              </label>
              <input
                type="text"
                required
                value={editMedForm.genericName}
                onChange={(e) => setEditMedForm({ ...editMedForm, genericName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Display Name *
              </label>
              <input
                type="text"
                required
                value={editMedForm.displayName}
                onChange={(e) => setEditMedForm({ ...editMedForm, displayName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Therapeutic Category *
            </label>
            <select
              required
              value={editMedForm.category}
              onChange={(e) => setEditMedForm({ ...editMedForm, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {THERAPEUTIC_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Active Ingredient
              </label>
              <input
                type="text"
                value={editMedForm.activeIngredient}
                onChange={(e) => setEditMedForm({ ...editMedForm, activeIngredient: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Complete Composition
              </label>
              <input
                type="text"
                value={editMedForm.composition}
                onChange={(e) => setEditMedForm({ ...editMedForm, composition: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Strength / Form
              </label>
              <input
                type="text"
                value={editMedForm.strengthForm}
                onChange={(e) => setEditMedForm({ ...editMedForm, strengthForm: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dosage Form
              </label>
              <input
                type="text"
                value={editMedForm.dosageForm}
                onChange={(e) => setEditMedForm({ ...editMedForm, dosageForm: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Route
              </label>
              <input
                type="text"
                value={editMedForm.route}
                onChange={(e) => setEditMedForm({ ...editMedForm, route: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reference Source
              </label>
              <input
                type="text"
                value={editMedForm.referenceSource}
                onChange={(e) => setEditMedForm({ ...editMedForm, referenceSource: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={editMedForm.isPrescriptionRequired}
                  onChange={(e) => setEditMedForm({ ...editMedForm, isPrescriptionRequired: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Prescription Required</span>
              </label>
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditMedModalOpen(false)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
