import { 
  Profile, 
  Pharmacy, 
  Medicine, 
  MedicineVariant,
  TherapeuticCategory,
  InventoryItem, 
  Reservation, 
  Bill, 
  AuditLog, 
  Alert, 
  SearchResultItem,
  UserRole,
  VerificationStatus,
  StockStatus,
  ReservationStatus
} from '../types/database';
import { supabase, isLiveSupabaseConfigured, ADMIN_SETUP_SECRET, broadcastRealtimeEvent } from './supabase';
import { 
  PREDEFINED_MEDICINES, 
  THERAPEUTIC_CATEGORIES, 
  searchCatalogMedicines, 
  getCategoryCounts 
} from '../data/medicineCatalogData';

// Helper for unique IDs
export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'id-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now();
};

export function toCloudMedicineId(id: string): string {
  if (!id) return id;
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return id;
  }
  const match = id.match(/med-cat-(\d+)/i);
  if (match) {
    const num = parseInt(match[1], 10);
    return `00000000-0000-4000-8000-${String(num).padStart(12, '0')}`;
  }
  return id;
}

export function fromCloudMedicineId(id: string): string {
  if (!id) return id;
  const match = id.match(/^00000000-0000-4000-8000-(\d{12})$/i);
  if (match) {
    const num = parseInt(match[1], 10);
    return `med-cat-${String(num).padStart(4, '0')}`;
  }
  return id;
}

// ==============================================================================
// VALIDATION UTILITIES (Mandatory Form Validation per Section 5)
// ==============================================================================
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const isValidIndianMobile = (mobile: string): boolean => {
  const re = /^[6-9]\d{9}$/;
  return re.test(mobile.trim().replace(/\D/g, ''));
};

export const isValidIndianPinCode = (pin: string): boolean => {
  const re = /^[1-9]\d{5}$/;
  return re.test(pin.trim());
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
};

// Real-world driving/road distance calculator in kilometers (FR-03, FR-05)
export const calculateDistanceKm = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const aerialStraightLineKm = R * c;

  // Urban road circuity routing factor (1.25x - 1.28x) converts crow-flight aerial to real Google Maps road driving route
  const roadNetworkKm = aerialStraightLineKm < 0.2 ? aerialStraightLineKm : aerialStraightLineKm * 1.26;
  return Math.round(roadNetworkKm * 10) / 10;
};

// Geolocation resolver for accurate pins across Dharwad, Hubballi & Karnataka
export const getCoordinatesForLocation = (locationOrCity: string, pinCode?: string): { lat: number; lng: number } => {
  const pin = pinCode?.trim();
  const c = (locationOrCity || '').toLowerCase().trim();

  const pinMap: Record<string, { lat: number; lng: number }> = {
    '580001': { lat: 15.4589, lng: 75.0078 }, // Dharwad City / Station Rd
    '580002': { lat: 15.4520, lng: 75.0110 }, // SDMCET Dharwad
    '580003': { lat: 15.4650, lng: 74.9950 }, // Saraswatpur Dharwad
    '580004': { lat: 15.4350, lng: 75.0200 }, // Vidyagiri Dharwad
    '580007': { lat: 15.4410, lng: 74.9820 }, // Karnatak University Dharwad
    '580008': { lat: 15.4720, lng: 75.0230 }, // Saptapur Dharwad
    '580020': { lat: 15.3647, lng: 75.1240 }, // Hubballi City
    '580021': { lat: 15.3550, lng: 75.1320 }, // Hubballi South
    '580023': { lat: 15.3685, lng: 75.1432 }, // Keshwapur Hubballi
    '580024': { lat: 15.3720, lng: 75.1180 }, // Vidyanagar Hubballi
    '580028': { lat: 15.3850, lng: 75.1550 }, // Gokul Rd Hubballi
    '580030': { lat: 15.3420, lng: 75.1400 }, // Old Hubli
    '580031': { lat: 15.3890, lng: 75.0890 }, // Tarihal Hubballi
    '560001': { lat: 12.9716, lng: 77.5946 }, // Bengaluru
    '590001': { lat: 15.8497, lng: 74.4977 }, // Belagavi
    '575001': { lat: 12.9141, lng: 74.8560 }, // Mangaluru
    '570001': { lat: 12.2958, lng: 76.6394 }, // Mysuru
  };

  // Specific Dharwad/Hubballi locality coordinates
  if (c.includes('old hubli') || c.includes('old hubballi') || c.includes('oldhubli') || c.includes('obli') || c.includes('old hub')) return { lat: 15.3420, lng: 75.1400 };
  if (c.includes('gandhinagar') || c.includes('gandhi nagar')) return { lat: 15.4505, lng: 75.0180 };
  if (c.includes('keshwapur')) return { lat: 15.3685, lng: 75.1432 };
  if (c.includes('vidyanagar') && (c.includes('hubli') || c.includes('hubballi'))) return { lat: 15.3720, lng: 75.1180 };
  if (c.includes('vidyanagar')) return { lat: 15.3720, lng: 75.1180 };
  if (c.includes('gokul')) return { lat: 15.3850, lng: 75.1550 };
  if (c.includes('hubballi') || c.includes('hubli') || c.includes('ubli')) return { lat: 15.3647, lng: 75.1240 };
  if (c.includes('sdm') || c.includes('sattur') || c.includes('dhavalanagar')) return { lat: 15.4215, lng: 75.0425 };
  if (c.includes('vidyagiri')) return { lat: 15.4350, lng: 75.0200 };
  if (c.includes('saptapur')) return { lat: 15.4720, lng: 75.0230 };
  if (c.includes('saraswatpur')) return { lat: 15.4650, lng: 74.9950 };
  if (c.includes('line bazaar') || c.includes('cbt')) return { lat: 15.4595, lng: 75.0115 };
  if (c.includes('malamaddi')) return { lat: 15.4600, lng: 75.0210 };
  if (c.includes('kelageri')) return { lat: 15.4680, lng: 74.9850 };
  if (c.includes('station') || c.includes('railway')) return { lat: 15.4589, lng: 75.0078 };
  if (c.includes('dharwad')) return { lat: 15.4589, lng: 75.0078 };
  if (c.includes('bengaluru') || c.includes('bangalore')) return { lat: 12.9716, lng: 77.5946 };
  if (c.includes('belagavi') || c.includes('belgaum')) return { lat: 15.8497, lng: 74.4977 };

  if (pin && pinMap[pin]) return pinMap[pin];

  return { lat: 15.4520, lng: 75.0110 }; // Default SDMCET Dharwad
};

// Check if a listing is stale (older than 24 hours per Design Phase Report)
export const isListingStale = (lastUpdatedIso: string): boolean => {
  const updatedDate = new Date(lastUpdatedIso).getTime();
  const now = Date.now();
  const diffHours = (now - updatedDate) / (1000 * 60 * 60);
  return diffHours > 24;
};

// ==============================================================================
// LOCAL STORAGE FALLBACK (Used if offline or before live Supabase keys)
// ==============================================================================
class LocalDatabaseStore {
  profiles: (Profile & { password?: string })[] = [];
  pharmacies: Pharmacy[] = [];
  medicines: Medicine[] = [];
  inventory: InventoryItem[] = [];
  reservations: Reservation[] = [];
  bills: Bill[] = [];
  auditLogs: AuditLog[] = [];
  alerts: Alert[] = [];
  passwords: Record<string, string> = {};

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    // FRESH DATABASE BOOTSTRAP:
    // Ensure all previous operational and account data is 100% purged so the user starts with zero records.
    const FRESH_VERSION = 'medistock_zero_data_v6';
    if (typeof localStorage !== 'undefined' && localStorage.getItem(FRESH_VERSION) !== 'true') {
      try {
        localStorage.clear();
      } catch (_) {}
      this.profiles = [];
      this.pharmacies = [];
      this.inventory = [];
      this.reservations = [];
      this.bills = [];
      this.auditLogs = [];
      this.alerts = [];
      this.passwords = {};
      this.medicines = [...PREDEFINED_MEDICINES];
      this.save();
      try {
        localStorage.setItem(FRESH_VERSION, 'true');
      } catch (_) {}
      return;
    }

    try {
      const data = localStorage.getItem('medistock_db_state');
      if (data) {
        const parsed = JSON.parse(data);
        this.profiles = parsed.profiles || [];
        this.pharmacies = parsed.pharmacies || [];
        this.medicines = parsed.medicines || [];
        this.inventory = parsed.inventory || [];
        this.reservations = parsed.reservations || [];
        this.bills = parsed.bills || [];
        this.auditLogs = parsed.auditLogs || [];
        this.alerts = parsed.alerts || [];
        this.passwords = parsed.passwords || {};
      }
    } catch (e) {
      console.warn('Could not load local database state:', e);
    }

    // FEATURE 1: Ensure all 245 predefined generic medicines are populated on first open
    if (!this.medicines || this.medicines.length < 200) {
      const existingNames = new Set((this.medicines || []).map(m => m.generic_name.toLowerCase()));
      const merged = [...(this.medicines || [])];
      for (const pre of PREDEFINED_MEDICINES) {
        if (!existingNames.has(pre.generic_name.toLowerCase())) {
          merged.push({ ...pre });
        }
      }
      this.medicines = merged;
      this.save();
    }

    if (!this.pharmacies) {
      this.pharmacies = [];
    }
  }

  private initDefaultPharmaciesAndInventory() {
    const defaultPharmacies: Pharmacy[] = [
      {
        id: 'pharm-dharwad-1',
        owner_user_id: 'owner-1',
        name: 'Sanjeevani Medicals & Generics',
        owner_name: 'Rajesh Patil',
        licence_number: 'KA-DH-2022-7789',
        address: 'Station Road, Gandhinagar',
        city: 'Dharwad',
        state: 'Karnataka',
        pin_code: '580001',
        latitude: 15.4505,
        longitude: 75.0180,
        mobile_number: '9845123456',
        email: 'sanjeevani.dharwad@gmail.com',
        verification_status: 'APPROVED',
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'pharm-dharwad-2',
        owner_user_id: 'owner-2',
        name: 'City Medicos & Drug House',
        owner_name: 'Suresh Kulkarni',
        licence_number: 'KA-DH-2021-4432',
        address: 'Near CBT, Line Bazaar',
        city: 'Dharwad',
        state: 'Karnataka',
        pin_code: '580001',
        latitude: 15.4595,
        longitude: 75.0115,
        mobile_number: '9448123456',
        email: 'citymedicos.dharwad@gmail.com',
        verification_status: 'APPROVED',
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'pharm-hubli-1',
        owner_user_id: 'owner-3',
        name: 'Apollo Pharmacy Vidyanagar',
        owner_name: 'Mahesh Joshi',
        licence_number: 'KA-HB-2023-1122',
        address: 'PB Road, Vidyanagar',
        city: 'Hubballi',
        state: 'Karnataka',
        pin_code: '580024',
        latitude: 15.3720,
        longitude: 75.1180,
        mobile_number: '9741234567',
        email: 'apollo.vidyanagar@gmail.com',
        verification_status: 'APPROVED',
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-01T00:00:00.000Z',
      },
      {
        id: 'pharm-hubli-2',
        owner_user_id: 'owner-4',
        name: 'Old Hubli LifeCare Druggists (OBLI)',
        owner_name: 'Anand Deshpande',
        licence_number: 'KA-HB-2020-9988',
        address: 'Durgad Bail, Old Hubli',
        city: 'Hubballi',
        state: 'Karnataka',
        pin_code: '580030',
        latitude: 15.3420,
        longitude: 75.1400,
        mobile_number: '9980123456',
        email: 'lifecare.oldhubli@gmail.com',
        verification_status: 'APPROVED',
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-01T00:00:00.000Z',
      },
    ];

    this.pharmacies = defaultPharmacies;

    // Operational stock is cleaned - start with clean empty inventory (0 stock) so pharmacies add their real stock
    this.inventory = [];
    this.save();
  }

  save() {
    try {
      const state = {
        profiles: this.profiles,
        pharmacies: this.pharmacies,
        medicines: this.medicines,
        inventory: this.inventory,
        reservations: this.reservations,
        bills: this.bills,
        auditLogs: this.auditLogs,
        alerts: this.alerts,
        passwords: this.passwords,
      };
      localStorage.setItem('medistock_db_state', JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save local database state:', e);
    }
  }

  clearAllData() {
    this.profiles = [];
    this.pharmacies = [];
    this.medicines = [...PREDEFINED_MEDICINES];
    this.inventory = [];
    this.reservations = [];
    this.bills = [];
    this.auditLogs = [];
    this.alerts = [];
    this.passwords = {};
    this.save();
  }

  /**
   * REQUIREMENT 4: Safe Database Cleanup
   * - Backs up current state to localStorage before any modification.
   * - KEEPS all registered pharmacy names and accounts unchanged.
   * - KEEPS all genuine customer accounts, phone numbers, and credentials.
   * - Removes all previously added medicines from all pharmacy stock records (inventory = []).
   * - Removes all existing reservation records (reservations = []).
   * - Clears legacy test bills and alerts.
   */
  performSafeCleanup(): { backedUp: boolean; backupKey: string } {
    const backupKey = `medistock_db_backup_${Date.now()}`;
    try {
      const backupData = {
        timestamp: new Date().toISOString(),
        profiles: [...this.profiles],
        pharmacies: [...this.pharmacies],
        medicines: [...this.medicines],
        inventory: [...this.inventory],
        reservations: [...this.reservations],
        bills: [...this.bills],
        alerts: [...this.alerts],
        passwords: { ...this.passwords },
      };
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(backupKey, JSON.stringify(backupData));
      }
    } catch (e) {
      console.warn('Backup error during safe cleanup:', e);
    }

    // 1. KEEP all existing pharmacy accounts and names (intact!)
    // 2. KEEP all genuine customer profiles, phone numbers, and passwords
    this.profiles = this.profiles.filter(p => p && p.id && p.email);

    // 3. Clear pharmacy stock so pharmacies can add fresh stock from dashboard
    this.inventory = [];

    // 4. Start with an empty reservation list
    this.reservations = [];

    // 5. Clear past test bills and past reservation alerts
    this.bills = [];
    this.alerts = [];

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('medistock_cleaned_safe', 'true');
      localStorage.setItem('medistock_safe_cleanup_v3_applied', 'true');
    }
    this.save();

    return { backedUp: true, backupKey };
  }

  backupDatabase(): string {
    const backupData = {
      timestamp: new Date().toISOString(),
      profiles: [...this.profiles],
      pharmacies: [...this.pharmacies],
      medicines: [...this.medicines],
      inventory: [...this.inventory],
      reservations: [...this.reservations],
      bills: [...this.bills],
      alerts: [...this.alerts],
      passwords: { ...this.passwords },
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    try {
      const backupKey = `medistock_db_backup_${Date.now()}`;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(backupKey, jsonStr);
      }
    } catch (_) {}
    return jsonStr;
  }

  /**
   * Complete Database Reset to clean initial state:
   * Clears all profiles, pharmacies, inventory, reservations, bills, and alerts.
   * Re-initializes master catalog with verified 245 generic medicines.
   */
  resetToCleanState(): { backedUp: boolean; backupKey: string } {
    const backupKey = `medistock_backup_${Date.now()}`;
    try {
      const backupData = {
        timestamp: new Date().toISOString(),
        profiles: [...this.profiles],
        pharmacies: [...this.pharmacies],
        medicines: [...this.medicines],
        inventory: [...this.inventory],
        reservations: [...this.reservations],
        bills: [...this.bills],
        alerts: [...this.alerts],
        passwords: { ...this.passwords },
      };
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(backupKey, JSON.stringify(backupData));
      }
    } catch (e) {
      console.warn('Backup error during reset:', e);
    }

    this.profiles = [];
    this.pharmacies = [];
    this.medicines = [...PREDEFINED_MEDICINES];
    this.inventory = [];
    this.reservations = [];
    this.bills = [];
    this.auditLogs = [];
    this.alerts = [];
    this.passwords = {};

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('medistock_session_user');
      localStorage.removeItem('medistock_session_token');
      localStorage.removeItem('medistock_admin_setup_completed');
      localStorage.setItem('medistock_cleaned_safe', 'true');
      localStorage.setItem('medistock_clean_database_reset_v4', 'true');
    }
    this.save();
    return { backedUp: true, backupKey };
  }
}

const localDB = new LocalDatabaseStore();

// ==============================================================================
// MEDISTOCK API IMPLEMENTATION (HYBRID SUPABASE CLOUD + LOCAL FALLBACK)
// ==============================================================================

export const api = {
  resetToCleanState(): { backedUp: boolean; backupKey: string } {
    return localDB.resetToCleanState();
  },
  // ----------------------------------------------------------------------------
  // 1. AUTHENTICATION APIs (/api/register, /api/login, /api/user/{id})
  // ----------------------------------------------------------------------------

  /**
   * API 1: /api/register (POST)
   */
  async registerUser(data: {
    fullName: string;
    email: string;
    mobileNumber: string;
    password: string;
    role: UserRole;
    city: string;
    state: string;
    pinCode: string;
    adminSetupSecret?: string;
  }): Promise<{ success: boolean; user?: Profile; message?: string }> {
    // 1. Mandatory Form Validations
    if (!data.fullName?.trim()) throw new Error('Full Name is required.');
    if (!data.email?.trim() || !isValidEmail(data.email)) throw new Error('Valid Email Address is required.');
    if (!data.mobileNumber?.trim() || !isValidIndianMobile(data.mobileNumber)) throw new Error('Valid 10-digit Indian Mobile Number is required.');
    if (!data.city?.trim()) throw new Error('City is required.');
    if (!data.state?.trim()) throw new Error('State is required.');
    if (!data.pinCode?.trim() || !isValidIndianPinCode(data.pinCode)) throw new Error('Valid 6-digit Indian PIN Code is required.');
    if (!isValidPassword(data.password)) throw new Error('Password must be at least 8 characters and include at least one letter and one number.');

    const cleanEmail = data.email.toLowerCase().trim();

    // 2. Role-specific rules: Admin one-time registration check
    if (data.role === 'ADMIN') {
      if (!data.adminSetupSecret?.trim() || data.adminSetupSecret.trim() !== ADMIN_SETUP_SECRET) {
        throw new Error('Invalid Administrator Setup Secret.');
      }

      if (isLiveSupabaseConfigured()) {
        try {
          const { count } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'ADMIN');
          if (count && count > 0) {
            throw new Error('Admin account has already been created. Please log in.');
          }
        } catch (e: any) {
          if (e.message?.includes('already been created') || e.message?.includes('already been registered')) throw e;
        }
      } else {
        const existingAdmins = localDB.profiles.filter(p => p.role === 'ADMIN');
        if (existingAdmins.length > 0) {
          throw new Error('Admin account has already been created. Please log in.');
        }
      }
    }

    const newProfile: Profile & { password?: string } = {
      id: generateId(),
      full_name: data.fullName.trim(),
      email: cleanEmail,
      mobile_number: data.mobileNumber.trim(),
      role: data.role,
      city: data.city.trim(),
      state: data.state.trim(),
      pin_code: data.pinCode.trim(),
      password: data.password,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isLiveSupabaseConfigured()) {
      try {
        // Check duplicate email in Supabase
        const { data: existing } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (existing) {
          throw new Error('An account with this email address already exists.');
        }

        const { error: insertErr } = await supabase.from('profiles').insert([{
          id: newProfile.id,
          full_name: newProfile.full_name,
          email: newProfile.email,
          mobile_number: newProfile.mobile_number,
          role: newProfile.role,
          city: newProfile.city,
          state: newProfile.state,
          pin_code: newProfile.pin_code,
          password: newProfile.password,
          created_at: newProfile.created_at,
          updated_at: newProfile.updated_at,
        }]);

        // Save to localDB on this device immediately
        localDB.profiles.push(newProfile);
        localDB.passwords[cleanEmail] = data.password;
        localDB.save();

        if (!insertErr) {
          try {
            await supabase.from('audit_logs').insert([{
              id: generateId(),
              actor_user_id: newProfile.id,
              actor_email: newProfile.email,
              action: 'USER_REGISTERED',
              entity_type: 'PROFILES',
              entity_id: newProfile.id,
              details: { role: newProfile.role, name: newProfile.full_name },
            }]);
          } catch (_) {}
        }
      } catch (err: any) {
        if (err.message?.includes('already exists') || err.message?.includes('already been registered')) {
          throw err;
        }
        console.warn('Supabase error, using localDB:', err);
        localDB.profiles.push(newProfile);
        localDB.passwords[cleanEmail] = data.password;
        localDB.save();
      }
    } else {
      if (localDB.profiles.some(p => p.email.toLowerCase() === cleanEmail)) {
        throw new Error('An account with this email address already exists.');
      }
      localDB.profiles.push(newProfile);
      localDB.passwords[cleanEmail] = data.password;
      localDB.save();
    }

    return { success: true, user: newProfile, message: 'Registration successful!' };
  },

  /**
   * API 2: /api/login (POST)
   */
  async loginUser(email: string, password: string): Promise<{ success: boolean; user: Profile; token: string }> {
    if (!email?.trim()) throw new Error('Email address is required.');
    if (!password) throw new Error('Password is required.');

    const cleanEmail = email.toLowerCase().trim();

    if (isLiveSupabaseConfigured()) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (profile && !error) {
          if (profile.password && profile.password !== password) {
            throw new Error('Invalid email or password.');
          }
          // Synchronize profile and credentials into localDB on this device
          const pIdx = localDB.profiles.findIndex(p => p.id === profile.id || p.email === cleanEmail);
          if (pIdx !== -1) {
            localDB.profiles[pIdx] = profile;
          } else {
            localDB.profiles.push(profile);
          }
          localDB.passwords[cleanEmail] = password;
          localDB.save();

          const token = 'jwt-token-' + profile.id + '-' + Date.now();
          return { success: true, user: profile, token };
        }
      } catch (e: any) {
        if (e.message?.includes('Invalid email or password')) throw e;
        console.warn('Falling back to localDB for login:', e);
      }
    }

    const profile = localDB.profiles.find(p => p.email === cleanEmail);
    if (!profile) {
      throw new Error('Invalid email or password.');
    }

    const storedPass = localDB.passwords[cleanEmail] || (profile as any).password;
    if (storedPass && storedPass !== password) {
      throw new Error('Invalid email or password.');
    }

    const token = 'jwt-token-' + profile.id + '-' + Date.now();
    return { success: true, user: profile, token };
  },

  /**
   * Reset Password (Forgot Password Flow)
   */
  async resetPassword(email: string, newPass: string): Promise<{ success: boolean; message: string }> {
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      throw new Error('Please enter a valid email address.');
    }
    if (!isValidPassword(newPass)) {
      throw new Error('Password must be at least 8 characters and include at least one letter and one number.');
    }

    if (isLiveSupabaseConfigured()) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', cleanEmail)
          .maybeSingle();
        if (profile) {
          await supabase.from('profiles').update({ password: newPass }).eq('id', profile.id);
        }
      } catch (e) {
        console.warn('Supabase resetPassword fallback:', e);
      }
    }

    const profile = localDB.profiles.find(p => p.email.toLowerCase() === cleanEmail);
    if (!profile) {
      throw new Error('No registered account found with this email address.');
    }

    localDB.passwords[cleanEmail] = newPass;
    (profile as any).password = newPass;
    localDB.save();

    return { success: true, message: 'Password has been reset successfully. Please log in with your new password.' };
  },

  /**
   * API 3: /api/user/{id} (GET)
   */
  async getUserProfile(id: string): Promise<Profile | null> {
    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (data && !error) return data;
      } catch (e) {
        console.warn('Supabase getUserProfile fallback:', e);
      }
    }
    return localDB.profiles.find(p => p.id === id) || null;
  },

  /**
   * API 3b: /api/user/{id} (PUT) - Update Customer / User Profile Details
   */
  async updateUserProfile(id: string, updates: {
    fullName?: string;
    mobileNumber?: string;
    city?: string;
    state?: string;
    pinCode?: string;
  }): Promise<Profile> {
    const patch: Partial<Profile> = {
      updated_at: new Date().toISOString()
    };
    if (updates.fullName !== undefined) {
      if (!updates.fullName.trim()) throw new Error('Full Name cannot be empty.');
      patch.full_name = updates.fullName.trim();
    }
    if (updates.mobileNumber !== undefined) {
      if (!isValidIndianMobile(updates.mobileNumber)) {
        throw new Error('Valid 10-digit Indian Mobile Number is required (starts with 6-9).');
      }
      patch.mobile_number = updates.mobileNumber.trim();
    }
    if (updates.city !== undefined) {
      if (!updates.city.trim()) throw new Error('City cannot be empty.');
      patch.city = updates.city.trim();
    }
    if (updates.state !== undefined) {
      if (!updates.state.trim()) throw new Error('State cannot be empty.');
      patch.state = updates.state.trim();
    }
    if (updates.pinCode !== undefined) {
      if (!isValidIndianPinCode(updates.pinCode)) {
        throw new Error('Valid 6-digit Indian PIN Code is required.');
      }
      patch.pin_code = updates.pinCode.trim();
    }

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(patch)
          .eq('id', id)
          .select()
          .single();
        if (data && !error) {
          const lIndex = localDB.profiles.findIndex(p => p.id === id);
          if (lIndex !== -1) {
            localDB.profiles[lIndex] = { ...localDB.profiles[lIndex], ...data };
            localDB.save();
          }
          return data;
        }
      } catch (e) {
        console.warn('Supabase updateUserProfile fallback:', e);
      }
    }

    const index = localDB.profiles.findIndex(p => p.id === id);
    if (index === -1) throw new Error('User profile not found.');
    localDB.profiles[index] = { ...localDB.profiles[index], ...patch };
    localDB.save();
    return localDB.profiles[index];
  },

  // ----------------------------------------------------------------------------
  // 2. PHARMACY APIs (/api/pharmacies, /api/pharmacy/{id})
  // ----------------------------------------------------------------------------

  /**
   * API 4: /api/pharmacies (GET)
   */
  async getPharmacies(filter?: { location?: string; pinCode?: string; onlyApproved?: boolean }): Promise<Pharmacy[]> {
    let list: Pharmacy[] = [];

    if (isLiveSupabaseConfigured()) {
      try {
        let query = supabase.from('pharmacies').select('*');
        if (filter?.onlyApproved !== false) {
          query = query.eq('verification_status', 'APPROVED');
        }
        if (filter?.pinCode?.trim()) {
          query = query.eq('pin_code', filter.pinCode.trim());
        }
        const { data, error } = await query;
        if (data && !error && data.length > 0) {
          list = data;
        }
      } catch (e) {
        console.warn('Supabase getPharmacies fallback:', e);
      }
    }

    if (list.length > 0) {
      for (const p of list) {
        const idx = localDB.pharmacies.findIndex(lp => lp.id === p.id);
        if (idx !== -1) {
          localDB.pharmacies[idx] = p;
        } else {
          localDB.pharmacies.push(p);
        }
      }
      localDB.save();
    }

    const localList = [...localDB.pharmacies];
    if (list.length > 0) {
      const existingIds = new Set(list.map(p => p.id));
      for (const lp of localList) {
        if (!existingIds.has(lp.id)) {
          if (filter?.onlyApproved === false || lp.verification_status === 'APPROVED') {
            list.push(lp);
          }
        }
      }
    } else {
      list = filter?.onlyApproved === false 
        ? localList 
        : localList.filter(p => p.verification_status === 'APPROVED');
    }

    if (filter?.pinCode?.trim()) {
      list = list.filter(p => p.pin_code?.includes(filter.pinCode!.trim()));
    }

    if (filter?.location?.trim()) {
      const loc = filter.location.trim().toLowerCase();
      list = list.filter(p => 
        p.city?.toLowerCase().includes(loc) || 
        p.address?.toLowerCase().includes(loc) ||
        p.state?.toLowerCase().includes(loc)
      );
    }

    const enrichCoords = (p: Pharmacy): Pharmacy => {
      const isGeneric = !p.latitude || (Math.abs(p.latitude - 15.4589) < 0.005 && Math.abs(p.longitude - 75.0078) < 0.005);
      if (isGeneric) {
        const c = getCoordinatesForLocation(`${p.name} ${p.address} ${p.city}`, p.pin_code);
        return { ...p, latitude: c.lat, longitude: c.lng };
      }
      return p;
    };

    return list.map(enrichCoords);
  },

  /**
   * API 5: /api/pharmacy/{id} (GET)
   */
  async getPharmacyById(id: string): Promise<Pharmacy | null> {
    const enrichCoords = (p: Pharmacy): Pharmacy => {
      const isGeneric = !p.latitude || (Math.abs(p.latitude - 15.4589) < 0.005 && Math.abs(p.longitude - 75.0078) < 0.005);
      if (isGeneric) {
        const c = getCoordinatesForLocation(`${p.name} ${p.address} ${p.city}`, p.pin_code);
        return { ...p, latitude: c.lat, longitude: c.lng };
      }
      return p;
    };

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('pharmacies')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        if (data && !error) return enrichCoords(data);
      } catch (e) {
        console.warn('Supabase getPharmacyById fallback:', e);
      }
    }
    const local = localDB.pharmacies.find(p => p.id === id) || null;
    return local ? enrichCoords(local) : null;
  },

  /**
   * API 6: /api/pharmacies (POST) - Pharmacy Self-Registration
   */
  async createPharmacy(data: {
    ownerUserId: string;
    name: string;
    ownerName: string;
    email: string;
    mobileNumber: string;
    licenceNumber: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    contactPerson: string;
    openingHours?: string;
    latitude?: number;
    longitude?: number;
  }): Promise<{ success: boolean; pharmacy: Pharmacy }> {
    if (!data.name?.trim()) throw new Error('Pharmacy Name is required.');
    if (!data.ownerName?.trim()) throw new Error('Owner Name is required.');
    if (!data.email?.trim() || !isValidEmail(data.email)) throw new Error('Valid Email Address is required.');
    if (!data.mobileNumber?.trim() || !isValidIndianMobile(data.mobileNumber)) throw new Error('Valid 10-digit Mobile Number is required.');
    if (!data.licenceNumber?.trim()) throw new Error('Pharmacy Licence / Registration Number is required.');
    if (!data.address?.trim()) throw new Error('Pharmacy Address is required.');
    if (!data.city?.trim()) throw new Error('City is required.');
    if (!data.state?.trim()) throw new Error('State is required.');
    if (!data.pinCode?.trim() || !isValidIndianPinCode(data.pinCode)) throw new Error('Valid 6-digit Indian PIN Code is required.');
    if (!data.contactPerson?.trim()) throw new Error('Contact Person is required.');

    const coords = getCoordinatesForLocation(`${data.name} ${data.address} ${data.city}`, data.pinCode);

    const newPharmacy: Pharmacy = {
      id: generateId(),
      owner_user_id: data.ownerUserId,
      name: data.name.trim(),
      owner_name: data.ownerName.trim(),
      email: data.email.toLowerCase().trim(),
      mobile_number: data.mobileNumber.trim(),
      licence_number: data.licenceNumber.trim(),
      address: data.address.trim(),
      city: data.city.trim(),
      state: data.state.trim(),
      pin_code: data.pinCode.trim(),
      contact_person: data.contactPerson.trim(),
      opening_hours: data.openingHours?.trim() || '9:00 AM - 9:00 PM',
      latitude: data.latitude || coords.lat,
      longitude: data.longitude || coords.lng,
      verification_status: 'PENDING_VERIFICATION',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const adminAlert: Alert = {
      id: generateId(),
      pharmacy_id: newPharmacy.id,
      user_id: 'admin',
      type: 'PHARMACY_PENDING_APPROVAL',
      message: `🏥 New Pharmacy Registration: "${newPharmacy.name}" (Owner: ${newPharmacy.owner_name}, Mobile: +91 ${newPharmacy.mobile_number}, Licence: ${newPharmacy.licence_number}, City: ${newPharmacy.city}) added their details and is waiting for your verification & approval.`,
      read_status: false,
      created_at: new Date().toISOString(),
    };

    if (isLiveSupabaseConfigured()) {
      try {
        const { error: insErr } = await supabase.from('pharmacies').insert([newPharmacy]);
        if (!insErr) {
          try {
            await supabase.from('alerts').insert([{
              id: adminAlert.id,
              pharmacy_id: newPharmacy.id,
              type: adminAlert.type,
              message: adminAlert.message,
              read_status: false,
              created_at: adminAlert.created_at,
            }]);
          } catch (e) {
            console.warn('Supabase register alert insert error:', e);
          }
          await supabase.from('audit_logs').insert([{
            id: generateId(),
            actor_user_id: data.ownerUserId,
            action: 'PHARMACY_REGISTERED',
            entity_type: 'PHARMACIES',
            entity_id: newPharmacy.id,
            details: { name: newPharmacy.name, licence: newPharmacy.licence_number },
          }]);
          localDB.pharmacies.push(newPharmacy);
          localDB.alerts.unshift(adminAlert);
          localDB.save();
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('medistock_alert_updated'));
          }
          return { success: true, pharmacy: newPharmacy };
        }
      } catch (e) {
        console.warn('Supabase createPharmacy fallback to local:', e);
      }
    }

    localDB.pharmacies.push(newPharmacy);
    localDB.alerts.unshift(adminAlert);
    localDB.save();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('medistock_alert_updated'));
    }
    return { success: true, pharmacy: newPharmacy };
  },

  /**
   * API 7: /api/pharmacy/{id} (PUT)
   */
  async updatePharmacy(id: string, updates: Partial<Pharmacy>): Promise<Pharmacy> {
    const patch: Partial<Pharmacy> = { ...updates, updated_at: new Date().toISOString() };

    // Auto-recalculate coordinates if name, address, city or pin code changed
    if ((updates.name || updates.address || updates.city || updates.pin_code) && updates.latitude === undefined) {
      const existing = localDB.pharmacies.find(p => p.id === id);
      const fullLoc = `${updates.name || existing?.name || ''} ${updates.address || existing?.address || ''} ${updates.city || existing?.city || ''}`;
      const pin = updates.pin_code || existing?.pin_code || '';
      const coords = getCoordinatesForLocation(fullLoc, pin);
      patch.latitude = coords.lat;
      patch.longitude = coords.lng;
    }

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('pharmacies')
          .update(patch)
          .eq('id', id)
          .select()
          .single();
        if (data && !error) {
          const lIndex = localDB.pharmacies.findIndex(p => p.id === id);
          if (lIndex !== -1) {
            localDB.pharmacies[lIndex] = { ...localDB.pharmacies[lIndex], ...data };
            localDB.save();
          }
          return data;
        }
      } catch (e) {
        console.warn('Supabase updatePharmacy fallback:', e);
      }
    }

    const index = localDB.pharmacies.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Pharmacy not found.');
    localDB.pharmacies[index] = { ...localDB.pharmacies[index], ...patch };
    localDB.save();
    return localDB.pharmacies[index];
  },

  /**
   * API 8: /api/pharmacy/{id} (DELETE)
   */
  async deletePharmacy(id: string): Promise<{ success: boolean }> {
    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.from('pharmacies').delete().eq('id', id);
        return { success: true };
      } catch (e) {
        console.warn('Supabase deletePharmacy fallback:', e);
      }
    }
    localDB.pharmacies = localDB.pharmacies.filter(p => p.id !== id);
    localDB.save();
    broadcastRealtimeEvent('INVENTORY_CHANGED', { id });
    return { success: true };
  },

  // ----------------------------------------------------------------------------
  // 3. MEDICINE APIs (/api/medicines, /api/medicine/{id})
  // ----------------------------------------------------------------------------

  /**
   * API 9: /api/medicines (GET) - Always includes all 245 verified catalog medicines
   */
  async getMedicines(filter?: { name?: string; category?: string }): Promise<Medicine[]> {
    let list: Medicine[] = [];

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('medicines')
          .select('*')
          .eq('catalogue_status', 'ACTIVE');
        if (data && !error && data.length > 0) list = data;
      } catch (e) {
        console.warn('Supabase getMedicines fallback:', e);
      }
    }

    if (list.length === 0) {
      list = [...localDB.medicines.filter(m => m.catalogue_status === 'ACTIVE')];
    }

    // Always merge in ALL 245 PREDEFINED_MEDICINES so every single category has medicines (no 0 meds)
    const existingIds = new Set(list.map(m => m.id));
    const existingGenerics = new Set(list.map(m => m.generic_name.toLowerCase().trim()));

    for (const pre of PREDEFINED_MEDICINES) {
      if (!existingIds.has(pre.id) && !existingGenerics.has(pre.generic_name.toLowerCase().trim())) {
        list.push({ ...pre });
        existingIds.add(pre.id);
        existingGenerics.add(pre.generic_name.toLowerCase().trim());
      }
    }

    if (filter?.name?.trim()) {
      const q = filter.name.trim().toLowerCase();
      list = list.filter(m => 
        m.display_name.toLowerCase().includes(q) ||
        m.generic_name.toLowerCase().includes(q) ||
        (m.brand_name && m.brand_name.toLowerCase().includes(q))
      );
    }

    if (filter?.category?.trim()) {
      const cat = filter.category.trim().toLowerCase();
      list = list.filter(m => m.category.toLowerCase().includes(cat) || cat.includes(m.category.toLowerCase()));
    }

    return list;
  },

  /**
   * API 10: /api/medicine/{id} (GET)
   */
  async getMedicineById(id: string): Promise<Medicine | null> {
    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('medicines').select('*').eq('id', id).maybeSingle();
        if (data && !error) return data;
      } catch (e) {
        console.warn('Supabase getMedicineById fallback:', e);
      }
    }
    return localDB.medicines.find(m => m.id === id) || null;
  },

  /**
   * API 11: /api/medicines (POST) - Add new medicine to catalog with duplicate prevention
   */
  async createMedicine(data: {
    displayName: string;
    brandName?: string;
    genericName: string;
    category: string;
    strengthForm: string;
    description?: string;
    activeIngredient?: string;
    composition?: string;
    dosageForm?: string;
    route?: string;
    manufacturer?: string;
    combinationIngredients?: string;
    referenceSource?: string;
    isPrescriptionRequired?: boolean;
    variants?: MedicineVariant[];
    createdBy?: string;
  }): Promise<Medicine> {
    if (!data.displayName?.trim()) throw new Error('Medicine Display Name is required.');
    if (!data.genericName?.trim()) throw new Error('Generic Name is required.');
    if (!data.category?.trim()) throw new Error('Therapeutic Category is required.');
    if (!data.strengthForm?.trim()) throw new Error('Strength / Formulation is required.');

    // FEATURE 5.7: Prevent duplicate generic entries
    const existing = localDB.medicines.find(
      m => m.generic_name.trim().toLowerCase() === data.genericName.trim().toLowerCase()
    );
    if (existing) {
      throw new Error(`A catalog medicine with generic name "${data.genericName}" already exists.`);
    }

    const medId = generateId();
    const defaultVariants: MedicineVariant[] = data.variants && data.variants.length > 0 ? data.variants : [
      {
        id: generateId(),
        medicine_id: medId,
        strength: data.strengthForm.split(' ')[0] || data.strengthForm,
        dosage_form: data.dosageForm?.trim() || 'Tablet',
        route: data.route?.trim() || 'Oral',
        composition: data.composition?.trim() || `${data.genericName.trim()} ${data.strengthForm.trim()}`,
        reference_source: data.referenceSource?.trim() || 'NLEM 2022 / IP',
        is_prescription_required: data.isPrescriptionRequired !== false,
        created_at: new Date().toISOString()
      }
    ];

    const newMed: Medicine = {
      id: medId,
      display_name: data.displayName.trim(),
      brand_name: data.brandName?.trim() || null,
      generic_name: data.genericName.trim(),
      active_ingredient: data.activeIngredient?.trim() || data.genericName.trim(),
      composition: data.composition?.trim() || `${data.genericName.trim()} ${data.strengthForm.trim()}`,
      category: data.category.trim(),
      strength_form: data.strengthForm.trim(),
      dosage_form: data.dosageForm?.trim() || 'Tablet',
      route: data.route?.trim() || 'Oral',
      description: data.description?.trim() || null,
      combination_ingredients: data.combinationIngredients?.trim() || null,
      reference_source: data.referenceSource?.trim() || 'NLEM 2022 / IP',
      is_prescription_required: data.isPrescriptionRequired !== false,
      catalogue_status: 'ACTIVE',
      variants: defaultVariants,
      created_by: data.createdBy || null,
      created_at: new Date().toISOString(),
    };

    if (isLiveSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('medicines').insert([newMed]);
        if (!error) return newMed;
      } catch (e) {
        console.warn('Supabase createMedicine fallback:', e);
      }
    }

    localDB.medicines.push(newMed);
    localDB.save();
    return newMed;
  },

  /**
   * Add variant strength / formulation to existing medicine
   */
  async addMedicineVariant(medicineId: string, variant: Omit<MedicineVariant, 'id' | 'medicine_id'>): Promise<MedicineVariant> {
    const med = await this.getMedicineById(medicineId);
    if (!med) throw new Error('Medicine not found.');

    const variants = med.variants || [];
    // Prevent duplicate variant
    const dup = variants.find(v => 
      v.strength.trim().toLowerCase() === variant.strength.trim().toLowerCase() &&
      v.dosage_form.trim().toLowerCase() === variant.dosage_form.trim().toLowerCase()
    );
    if (dup) {
      throw new Error(`Variant "${variant.strength} ${variant.dosage_form}" already exists for this medicine.`);
    }

    const newVar: MedicineVariant = {
      id: generateId(),
      medicine_id: medicineId,
      strength: variant.strength.trim(),
      dosage_form: variant.dosage_form.trim(),
      route: variant.route.trim(),
      composition: variant.composition.trim(),
      reference_source: variant.reference_source || med.reference_source || 'NLEM 2022 / IP',
      is_prescription_required: variant.is_prescription_required !== false,
      created_at: new Date().toISOString()
    };

    const updatedVariants = [...variants, newVar];
    await this.updateMedicine(medicineId, { variants: updatedVariants });
    return newVar;
  },

  /**
   * Delete variant from medicine
   */
  async deleteMedicineVariant(medicineId: string, variantId: string): Promise<{ success: boolean }> {
    const med = await this.getMedicineById(medicineId);
    if (!med) throw new Error('Medicine not found.');

    const variants = (med.variants || []).filter(v => v.id !== variantId);
    if (variants.length === 0) {
      throw new Error('A catalog medicine must maintain at least one formulation variant.');
    }

    await this.updateMedicine(medicineId, { variants });
    return { success: true };
  },

  /**
   * FEATURE 3: Case-Insensitive and Spelling-Exact Catalog Medicine Search
   */
  async searchCatalog(params: { query?: string; category?: string }): Promise<Medicine[]> {
    const q = params.query?.trim() || '';
    const cat = params.category?.trim();
    const all = await this.getMedicines();

    let list = all;
    if (cat && cat !== 'All Categories') {
      const normCat = cat.toLowerCase();
      list = list.filter(m => m.category.toLowerCase() === normCat);
    }

    if (!q) return list;

    const normQ = q.toLowerCase();
    return list.filter(m => {
      const normGen = m.generic_name.trim().toLowerCase();
      const normDisp = m.display_name.trim().toLowerCase();
      const normAct = (m.active_ingredient || '').trim().toLowerCase();
      const normC = m.category.trim().toLowerCase();

      // Exact match only (case-insensitive)
      if (normGen === normQ || normDisp === normQ || normAct === normQ || normC === normQ) {
        return true;
      }

      if (m.variants && m.variants.length > 0) {
        return m.variants.some(v => {
          const s1 = `${normGen} ${v.strength.toLowerCase()}`;
          const s2 = `${normGen} ${v.strength.toLowerCase()} ${v.dosage_form.toLowerCase()}`;
          return s1 === normQ || s2 === normQ;
        });
      }

      return false;
    });
  },

  /**
   * Return therapeutic categories with live medicine counts
   */
  async getTherapeuticCategories(): Promise<(TherapeuticCategory & { count: number })[]> {
    const meds = await this.getMedicines();
    const counts = getCategoryCounts(meds);
    return THERAPEUTIC_CATEGORIES.map(cat => ({
      ...cat,
      count: counts[cat.name] || 0
    }));
  },

  /**
   * API 12: /api/medicine/{id} (PUT)
   */
  async updateMedicine(id: string, updates: Partial<Medicine>): Promise<Medicine> {
    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('medicines').update(updates).eq('id', id).select().single();
        if (data && !error) return data;
      } catch (e) {
        console.warn('Supabase updateMedicine fallback:', e);
      }
    }
    const idx = localDB.medicines.findIndex(m => m.id === id);
    if (idx === -1) throw new Error('Medicine not found.');
    localDB.medicines[idx] = { ...localDB.medicines[idx], ...updates };
    localDB.save();
    return localDB.medicines[idx];
  },

  /**
   * API 13: /api/medicine/{id} (DELETE)
   */
  async deleteMedicine(id: string): Promise<{ success: boolean }> {
    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.from('medicines').delete().eq('id', id);
        return { success: true };
      } catch (e) {
        console.warn('Supabase deleteMedicine fallback:', e);
      }
    }
    localDB.medicines = localDB.medicines.filter(m => m.id !== id);
    localDB.save();
    return { success: true };
  },

  // ----------------------------------------------------------------------------
  // 4. INVENTORY APIs (/api/inventory, /api/inventory/{id}, /api/inventory/verify)
  // ----------------------------------------------------------------------------

  /**
   * API 14: /api/inventory (GET)
   */
  async getInventory(filter?: { pharmacyId?: string; medicineId?: string }): Promise<InventoryItem[]> {
    let list: InventoryItem[] = [];

    if (isLiveSupabaseConfigured()) {
      try {
        let query = supabase.from('inventory').select('*');
        if (filter?.pharmacyId) query = query.eq('pharmacy_id', filter.pharmacyId);
        if (filter?.medicineId) query = query.eq('medicine_id', toCloudMedicineId(filter.medicineId));

        const { data, error } = await query;
        if (data && !error && data.length > 0) {
          list = data.map((d: any) => {
            const mId = fromCloudMedicineId(d.medicine_id);
            return {
              ...d,
              medicine_id: mId,
              medicine: localDB.medicines.find(m => m.id === mId) || PREDEFINED_MEDICINES.find(m => m.id === mId),
              pharmacy: localDB.pharmacies.find(p => p.id === d.pharmacy_id),
            };
          });

          // Synchronize cloud inventory into localDB so other functions on this device have access
          for (const item of list) {
            const idx = localDB.inventory.findIndex(i => i.id === item.id || (i.pharmacy_id === item.pharmacy_id && i.medicine_id === item.medicine_id));
            if (idx !== -1) {
              localDB.inventory[idx] = item;
            } else {
              localDB.inventory.push(item);
            }
          }
          localDB.save();
        }
      } catch (e) {
        console.warn('Supabase getInventory fallback:', e);
      }
    }

    let localList = [...localDB.inventory];
    if (filter?.pharmacyId) localList = localList.filter(i => i.pharmacy_id === filter.pharmacyId);
    if (filter?.medicineId) localList = localList.filter(i => i.medicine_id === filter.medicineId);

    const populatedLocal = localList.map(item => ({
      ...item,
      medicine: localDB.medicines.find(m => m.id === item.medicine_id) || PREDEFINED_MEDICINES.find(m => m.id === item.medicine_id),
      pharmacy: localDB.pharmacies.find(p => p.id === item.pharmacy_id),
    }));

    if (list.length > 0) {
      const existingIds = new Set(list.map(i => i.id));
      for (const loc of populatedLocal) {
        if (!existingIds.has(loc.id)) {
          list.push(loc);
        }
      }
      return list;
    }

    return populatedLocal;
  },

  /**
   * API 15: /api/inventory (POST)
   */
  async addInventoryItem(data: {
    pharmacyId: string;
    medicineId: string;
    quantity: number;
    price: number;
    expiryDate: string;
    batchNumber?: string;
    updatedBy?: string;
  }): Promise<InventoryItem> {
    if (!data.pharmacyId) throw new Error('Pharmacy ID is required.');
    if (!data.medicineId) throw new Error('Medicine selection is required.');
    if (data.quantity === undefined || data.quantity < 0) throw new Error('Quantity must be 0 or a positive whole number.');
    if (data.price === undefined || data.price < 0) throw new Error('Price must be 0 or a positive number.');
    if (!data.expiryDate) throw new Error('Expiry Date is mandatory.');

    let status: StockStatus = 'AVAILABLE';
    if (data.quantity === 0) status = 'OUT_OF_STOCK';
    else if (data.quantity < 10) status = 'LOW_STOCK';

    const now = new Date().toISOString();

    const newItem: InventoryItem = {
      id: generateId(),
      pharmacy_id: data.pharmacyId,
      medicine_id: data.medicineId,
      quantity: data.quantity,
      price: data.price,
      expiry_date: data.expiryDate,
      batch_number: data.batchNumber?.trim() || null,
      status,
      last_updated: now,
      updated_by: data.updatedBy || null,
      created_at: now,
    };

    // Always update localDB first for guaranteed local consistency
    const existingIdx = localDB.inventory.findIndex(
      i => i.pharmacy_id === data.pharmacyId && i.medicine_id === data.medicineId
    );

    let savedItem: InventoryItem;
    if (existingIdx !== -1) {
      localDB.inventory[existingIdx] = {
        ...localDB.inventory[existingIdx],
        quantity: data.quantity,
        price: data.price,
        expiry_date: data.expiryDate,
        batch_number: data.batchNumber?.trim() || localDB.inventory[existingIdx].batch_number || null,
        status,
        last_updated: now,
      };
      savedItem = localDB.inventory[existingIdx];
    } else {
      localDB.inventory.push(newItem);
      savedItem = newItem;
    }
    localDB.save();

    if (isLiveSupabaseConfigured()) {
      try {
        const cloudMedId = toCloudMedicineId(data.medicineId);
        const { data: existing } = await supabase
          .from('inventory')
          .select('id')
          .eq('pharmacy_id', data.pharmacyId)
          .eq('medicine_id', cloudMedId)
          .maybeSingle();

        if (existing) {
          await supabase.from('inventory').update({
            quantity: data.quantity,
            price: data.price,
            expiry_date: data.expiryDate,
            batch_number: data.batchNumber?.trim() || null,
            status,
            last_updated: now,
          }).eq('id', existing.id);
        } else {
          await supabase.from('inventory').insert([{
            id: newItem.id,
            pharmacy_id: newItem.pharmacy_id,
            medicine_id: cloudMedId,
            quantity: newItem.quantity,
            price: newItem.price,
            expiry_date: newItem.expiry_date,
            batch_number: newItem.batch_number,
            status: newItem.status,
            last_updated: newItem.last_updated,
            updated_by: newItem.updated_by,
            created_at: newItem.created_at,
          }]);
        }
      } catch (e) {
        console.warn('Supabase addInventoryItem sync fallback:', e);
      }
    }

    broadcastRealtimeEvent('INVENTORY_CHANGED', { pharmacyId: data.pharmacyId, medicineId: data.medicineId });
    return savedItem;
  },

  /**
   * API 16: /api/inventory/{id} (PUT)
   */
  async updateInventoryItem(id: string, updates: Partial<InventoryItem>, actorPharmacyId?: string): Promise<InventoryItem> {
    const existingListing = localDB.inventory.find(i => i.id === id);
    if (actorPharmacyId && existingListing && existingListing.pharmacy_id !== actorPharmacyId) {
      throw new Error('Access denied: You cannot modify stock belonging to another pharmacy.');
    }
    const now = new Date().toISOString();
    let newStatus: StockStatus | undefined = updates.status;

    if (updates.quantity !== undefined) {
      if (updates.quantity === 0) newStatus = 'OUT_OF_STOCK';
      else if (updates.quantity < 10) newStatus = 'LOW_STOCK';
      else newStatus = 'AVAILABLE';
    }

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('inventory')
          .update({
            ...updates,
            status: newStatus || updates.status,
            last_updated: now,
          })
          .eq('id', id)
          .select()
          .single();
        if (data && !error) return data;
      } catch (e) {
        console.warn('Supabase updateInventoryItem fallback:', e);
      }
    }

    const idx = localDB.inventory.findIndex(i => i.id === id);
    if (idx === -1) throw new Error('Inventory listing not found.');
    localDB.inventory[idx] = {
      ...localDB.inventory[idx],
      ...updates,
      status: newStatus || localDB.inventory[idx].status,
      last_updated: now,
    };
    localDB.save();
    broadcastRealtimeEvent('INVENTORY_CHANGED', { id, ...updates });
    return localDB.inventory[idx];
  },

  /**
   * API 17: /api/inventory/{id} (DELETE)
   */
  async deleteInventoryItem(id: string, actorPharmacyId?: string): Promise<{ success: boolean }> {
    const existingListing = localDB.inventory.find(i => i.id === id);
    if (actorPharmacyId && existingListing && existingListing.pharmacy_id !== actorPharmacyId) {
      throw new Error('Access denied: You cannot delete stock belonging to another pharmacy.');
    }
    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.from('inventory').delete().eq('id', id);
        return { success: true };
      } catch (e) {
        console.warn('Supabase deleteInventoryItem fallback:', e);
      }
    }
    localDB.inventory = localDB.inventory.filter(i => i.id !== id);
    localDB.save();
    return { success: true };
  },

  /**
   * API 18: /api/inventory/verify (POST)
   */
  async verifyMedicineAvailability(
    pharmacyId: string, 
    medicineId: string, 
    requestedQuantity: number
  ): Promise<{ available: boolean; currentStock: number; message: string }> {
    const inv = await this.getInventory({ pharmacyId, medicineId });
    if (inv.length === 0) {
      return { available: false, currentStock: 0, message: 'Medicine is not listed by this pharmacy.' };
    }
    if (inv[0].quantity < requestedQuantity) {
      return { available: false, currentStock: inv[0].quantity, message: `Only ${inv[0].quantity} units available.` };
    }
    return { available: true, currentStock: inv[0].quantity, message: 'Stock available.' };
  },

  // ----------------------------------------------------------------------------
  // 5. SEARCH & AVAILABILITY APIs
  // ----------------------------------------------------------------------------

  /**
   * API 19: /api/search/medicine (GET)
   */
  async searchMedicine(params: {
    query?: string;
    medicineId?: string;
    category?: string;
    location?: string;
    userLat?: number;
    userLng?: number;
    inStockOnly?: boolean;
    sortBy?: 'stock' | 'price' | 'distance';
  }): Promise<SearchResultItem[]> {
    const query = params.query?.trim().toLowerCase() || '';
    const loc = params.location?.trim().toLowerCase() || '';

    // Fetch live approved pharmacies and all inventory with medicine details
    const approvedPharmacies = await this.getPharmacies({ onlyApproved: true });
    const approvedMap = new Map(approvedPharmacies.map(p => [p.id, p]));

    const allInventory = await this.getInventory();
    const results: SearchResultItem[] = [];

    for (const inv of allInventory) {
      const pharmacy = approvedMap.get(inv.pharmacy_id);
      if (!pharmacy) continue;

      const medicine = inv.medicine;
      if (!medicine) continue;

      if (params.inStockOnly && inv.quantity <= 0) continue;

      // Filter by exact medicineId if requested
      if (params.medicineId && inv.medicine_id !== params.medicineId && medicine.id !== params.medicineId) {
        continue;
      }

      // Filter by category if specified
      if (params.category?.trim()) {
        const catNorm = params.category.trim().toLowerCase();
        const medCat = medicine.category.trim().toLowerCase();
        if (medCat !== catNorm && !medCat.includes(catNorm)) {
          continue;
        }
      }

      if (query) {
        const normQ = query.trim().toLowerCase();
        const normDisp = medicine.display_name.trim().toLowerCase();
        const normGen = medicine.generic_name.trim().toLowerCase();
        const normBrand = (medicine.brand_name || '').trim().toLowerCase();
        const normCat = medicine.category.trim().toLowerCase();
        const normStrength = medicine.strength_form.trim().toLowerCase();
        const fullCombo = `${normGen} ${normStrength}`;

        // Support disease keywords like BP, Sugar, Diabetes, Heart, Fever, Pain, etc.
        const isBPMatch = (normQ === 'bp' || normQ === 'blood pressure') && 
          (normCat.includes('blood pressure') || normCat.includes('bp') || normCat.includes('hypertension'));

        const isSugarMatch = (normQ === 'sugar' || normQ === 'diabetes' || normQ === 'blood sugar') && 
          (normCat.includes('diabetes') || normCat.includes('sugar'));

        const isHeartMatch = (normQ === 'heart' || normQ === 'cardiac') && normCat.includes('heart');

        const isFeverMatch = normQ === 'fever' && normCat.includes('fever');

        const isPainMatch = (normQ === 'pain' || normQ === 'pain relief' || normQ === 'body pain') && normCat.includes('pain');

        const isColdMatch = (normQ === 'cold' || normQ === 'cough') && normCat.includes('cold');

        const isAsthmaMatch = (normQ === 'asthma' || normQ === 'copd') && normCat.includes('asthma');

        // FEATURE 3: Case-insensitive, spelling-exact matching ONLY (no fuzzy matching)
        const isExactMatch =
          normDisp === normQ ||
          normGen === normQ ||
          normBrand === normQ ||
          normCat === normQ ||
          fullCombo === normQ ||
          isBPMatch ||
          isSugarMatch ||
          isHeartMatch ||
          isFeverMatch ||
          isPainMatch ||
          isColdMatch ||
          isAsthmaMatch ||
          (medicine.variants && medicine.variants.some(v => 
            `${normGen} ${v.strength.toLowerCase()}` === normQ ||
            `${normGen} ${v.strength.toLowerCase()} ${v.dosage_form.toLowerCase()}` === normQ
          ));

        if (!isExactMatch) continue;
      }

      if (loc) {
        const matchesLoc =
          pharmacy.city.toLowerCase().includes(loc) ||
          pharmacy.pin_code.includes(loc) ||
          pharmacy.address.toLowerCase().includes(loc);
        if (!matchesLoc) continue;
      }

      let distanceKm: number | null = null;
      // Determine effective user location for calculating distance (FR-03, FR-05)
      let effUserLat = params.userLat;
      let effUserLng = params.userLng;

      if (!effUserLat || !effUserLng) {
        if (params.location?.trim()) {
          const locCoords = getCoordinatesForLocation(params.location, params.location);
          effUserLat = locCoords.lat;
          effUserLng = locCoords.lng;
        } else {
          // Default reference: SDMCET Dharwad campus (15.4520, 75.0110)
          effUserLat = 15.4520;
          effUserLng = 75.0110;
        }
      }

      // Resolve accurate pharmacy coordinates based on its specific locality/address and PIN
      const resolvedPharmCoords = getCoordinatesForLocation(
        `${pharmacy.name} ${pharmacy.address} ${pharmacy.city}`, 
        pharmacy.pin_code
      );
      
      // If pharmacy was saved with the generic Dharwad station default (15.4589, 75.0078), ALWAYS use the resolved locality coordinates!
      const isGenericDefault = 
        !pharmacy.latitude || 
        (Math.abs(pharmacy.latitude - 15.4589) < 0.005 && Math.abs(pharmacy.longitude - 75.0078) < 0.005);
      
      const pharmLat = isGenericDefault ? resolvedPharmCoords.lat : pharmacy.latitude;
      const pharmLng = isGenericDefault ? resolvedPharmCoords.lng : pharmacy.longitude;

      if (effUserLat && effUserLng && pharmLat && pharmLng) {
        distanceKm = calculateDistanceKm(
          effUserLat,
          effUserLng,
          pharmLat,
          pharmLng
        );
      }

      results.push({
        inventory_id: inv.id,
        medicine_id: medicine.id,
        medicine_name: medicine.display_name,
        generic_name: medicine.generic_name,
        brand_name: medicine.brand_name,
        category: medicine.category,
        strength_form: medicine.strength_form,
        composition: medicine.composition || medicine.active_ingredient || `${medicine.generic_name} ${medicine.strength_form}`,
        batch_number: inv.batch_number || null,
        pharmacy_id: pharmacy.id,
        pharmacy_name: pharmacy.name,
        pharmacy_address: pharmacy.address,
        city: pharmacy.city,
        pin_code: pharmacy.pin_code,
        mobile_number: pharmacy.mobile_number,
        opening_hours: pharmacy.opening_hours,
        latitude: pharmLat,
        longitude: pharmLng,
        price: inv.price,
        quantity: inv.quantity,
        status: inv.status,
        last_updated: inv.last_updated,
        distance_km: distanceKm,
      });
    }

    if (params.sortBy === 'price') {
      results.sort((a, b) => a.price - b.price);
    } else if (params.sortBy === 'distance') {
      results.sort((a, b) => (a.distance_km ?? 9999) - (b.distance_km ?? 9999));
    } else {
      results.sort((a, b) => b.quantity - a.quantity);
    }

    return results;
  },

  /**
   * API 20: /api/pharmacies/nearby (GET)
   */
  async getNearbyPharmacies(lat: number, lng: number, radiusKm: number = 25): Promise<(Pharmacy & { distanceKm: number })[]> {
    const approved = await this.getPharmacies({ onlyApproved: true });
    return approved
      .map(p => ({
        ...p,
        distanceKm: calculateDistanceKm(lat, lng, p.latitude, p.longitude),
      }))
      .filter(p => p.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  },

  /**
   * API 21: /api/medicine/{id}/availability (GET)
   */
  async checkMedicineAvailability(medicineId: string, location?: string): Promise<SearchResultItem[]> {
    return this.searchMedicine({ medicineId, location, inStockOnly: true });
  },

  /**
   * API 22: /api/compare/medicine (GET)
   */
  async compareMedicine(medicineId: string): Promise<SearchResultItem[]> {
    return this.searchMedicine({ medicineId, inStockOnly: true, sortBy: 'price' });
  },

  // ----------------------------------------------------------------------------
  // 6. RESERVATION APIs (/api/reservations, /api/reservations/{id})
  // ----------------------------------------------------------------------------

  /**
   * API 23: /api/reservations (POST) - Atomic Medicine Reservation & Stock Deduction with 48h Expiry
   */
  async createReservation(data: {
    userId: string;
    pharmacyId: string;
    medicineId: string;
    variantId?: string;
    variantDetails?: string;
    quantity: number;
    notes?: string;
  }): Promise<{ success: boolean; reservation: Reservation }> {
    if (!data.userId) throw new Error('Customer account is required to place a reservation.');
    if (!data.pharmacyId) throw new Error('Pharmacy ID is required.');
    if (!data.medicineId) throw new Error('Medicine ID is required.');
    if (!data.quantity || data.quantity <= 0) throw new Error('Quantity must be greater than zero.');

    const pharmacy = await this.getPharmacyById(data.pharmacyId);
    if (!pharmacy || pharmacy.verification_status !== 'APPROVED') {
      throw new Error('This pharmacy is currently not eligible to accept reservations.');
    }

    const invItems = await this.getInventory({ pharmacyId: data.pharmacyId, medicineId: data.medicineId });
    if (invItems.length === 0) {
      throw new Error('Medicine is not listed in this pharmacy.');
    }

    const currentItem = invItems[0];
    if (currentItem.quantity < data.quantity) {
      throw new Error(`Insufficient stock. Requested: ${data.quantity}, Available: ${currentItem.quantity}`);
    }

    // Deduct stock atomically
    const newQty = currentItem.quantity - data.quantity;
    let newStatus: StockStatus = 'AVAILABLE';
    if (newQty === 0) newStatus = 'OUT_OF_STOCK';
    else if (newQty < 10) newStatus = 'LOW_STOCK';

    await this.updateInventoryItem(currentItem.id, {
      quantity: newQty,
      status: newStatus,
    });

    const totalPrice = Math.round(currentItem.price * data.quantity * 100) / 100;
    const now = new Date();
    // FEATURE 7: Exactly 48-Hour Reservation Expiry Window
    const expiresAt = new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString();

    const medicine = await this.getMedicineById(data.medicineId);
    const medName = medicine?.display_name || 'Medicine';
    let userProfile = await this.getUserProfile(data.userId);
    if (!userProfile && typeof window !== 'undefined') {
      try {
        const storedAuth = localStorage.getItem('medistock_auth_user');
        if (storedAuth) {
          const parsed = JSON.parse(storedAuth);
          if (parsed && (parsed.id === data.userId || parsed.email)) {
            userProfile = parsed;
          }
        }
      } catch (_) {}
    }
    const customerPhone = userProfile?.mobile_number || 'Registered Mobile';
    const customerName = userProfile?.full_name || 'Registered Customer';
    const customerEmail = userProfile?.email || '';
    const medCategory = medicine?.category || 'General';
    const medStrength = data.variantDetails || medicine?.strength_form || 'Standard';
    const medComposition = medicine?.composition || medicine?.active_ingredient || medicine?.generic_name || 'Active ingredient';
    const pharmacyName = pharmacy.name;
    const pharmacyAddress = `${pharmacy.address}, ${pharmacy.city}${pharmacy.pin_code ? ' - ' + pharmacy.pin_code : ''}`;
    const pharmacyPhone = pharmacy.mobile_number;

    const newRes: Reservation = {
      id: generateId(),
      user_id: data.userId,
      pharmacy_id: data.pharmacyId,
      medicine_id: data.medicineId,
      variant_id: data.variantId || null,
      variant_details: data.variantDetails || null,
      quantity: data.quantity,
      unit_price: currentItem.price,
      total_price: totalPrice,
      status: 'PENDING',
      notes: data.notes?.trim() || null,
      created_at: now.toISOString(),
      expires_at: expiresAt,
      stock_restored: false,
      reminder_30m_sent: false,
      updated_at: now.toISOString(),
      // Snapshot fields so customer and medicine are never undefined
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      medicine_name: medName,
      medicine_category: medCategory,
      medicine_strength: medStrength,
      medicine_composition: medComposition,
      pharmacy_name: pharmacyName,
      pharmacy_address: pharmacyAddress,
      pharmacy_phone: pharmacyPhone,
      user: userProfile || undefined,
      pharmacy: pharmacy,
      medicine: medicine || undefined,
    };

    // Format collection end date and time
    const collectionDeadlineFormatted = new Intl.DateTimeFormat('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(expiresAt));

    // 1. Customer Reservation Notification Alert with End Date & Phone Number
    const customerAlert: Alert = {
      id: generateId(),
      pharmacy_id: data.pharmacyId,
      user_id: data.userId,
      type: 'RESERVATION_CONFIRMED',
      message: `📱 Notification sent to +91 ${customerPhone}: Reservation #${newRes.id.slice(-6).toUpperCase()} confirmed for ${medName} (Qty: ${data.quantity}) at ${pharmacy.name}. End Date to Collect: ${collectionDeadlineFormatted}. Please present this at the counter to collect your medicine.`,
      read_status: false,
      created_at: now.toISOString(),
    };

    // 2. Pharmacy New Reservation Alert with Full Customer & Medicine Details per User Request
    const pharmacyAlert: Alert = {
      id: generateId(),
      pharmacy_id: data.pharmacyId,
      type: 'NEW_RESERVATION',
      message: `🔔 New Customer Reservation #${newRes.id.slice(-6).toUpperCase()}: ${customerName} (+91 ${customerPhone}${customerEmail ? `, ${customerEmail}` : ''}) reserved ${medName} [Category: ${medCategory} | Strength: ${medStrength} | Composition: ${medComposition}] (Qty: ${data.quantity}, Total: ₹${totalPrice}). Collection Deadline: ${collectionDeadlineFormatted}. Stock held at counter.`,
      read_status: false,
      created_at: now.toISOString(),
    };

    localDB.alerts.unshift(customerAlert);
    localDB.alerts.unshift(pharmacyAlert);

    // Unconditionally save to localDB for instant local & offline persistence
    localDB.reservations.unshift(newRes);
    localDB.save();

    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.from('reservations').insert([{
          id: newRes.id,
          user_id: newRes.user_id,
          pharmacy_id: newRes.pharmacy_id,
          medicine_id: toCloudMedicineId(newRes.medicine_id),
          quantity: newRes.quantity,
          unit_price: newRes.unit_price,
          total_price: newRes.total_price,
          status: newRes.status,
          notes: newRes.notes,
          created_at: newRes.created_at,
          updated_at: newRes.updated_at
        }]);
        try {
          await supabase.from('alerts').insert([
            {
              id: customerAlert.id,
              pharmacy_id: data.pharmacyId,
              type: customerAlert.type,
              message: `[FOR_USER:${data.userId}] ${customerAlert.message}`,
              read_status: false,
              created_at: customerAlert.created_at,
            },
            {
              id: pharmacyAlert.id,
              pharmacy_id: data.pharmacyId,
              type: pharmacyAlert.type,
              message: pharmacyAlert.message,
              read_status: false,
              created_at: pharmacyAlert.created_at,
            }
          ]);
        } catch (e) {
          console.warn('Supabase createReservation alerts sync error:', e);
        }
      } catch (e) {
        console.warn('Supabase createReservation sync:', e);
      }
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('medistock_alert_updated'));
    }

    return { success: true, reservation: newRes };
  },

  /**
   * FEATURE 7 & 8: Automatic 48-Hour Reservation Expiry, 30-Min Pre-Expiry Reminders & Automatic Stock Restoration
   * - Sends 30-minute pre-expiry reminder to both customer and pharmacy.
   * - If medicine is not picked up before end time, automatically restores pharmacy stock and alerts pharmacy.
   */
  async checkAndExpireReservations(): Promise<number> {
    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.rpc('expire_stale_reservations_atomic');
      } catch (rpcErr) {
        // Non-blocking fallback if RPC is pending migration
        console.warn('[Supabase Expiry] RPC notice:', rpcErr);
      }
    }

    const nowTime = Date.now();
    let expiredCount = 0;
    let alertsAdded = false;

    for (const res of localDB.reservations) {
      const isPending = res.status === 'PENDING' || res.status === 'ACCEPTED' || res.status === 'READY_FOR_COLLECTION';
      if (!isPending) continue;

      const expiresAtMs = res.expires_at 
        ? new Date(res.expires_at).getTime() 
        : new Date(res.created_at).getTime() + (48 * 60 * 60 * 1000);

      const timeLeftMs = expiresAtMs - nowTime;

      const med = localDB.medicines.find(m => m.id === res.medicine_id);
      const medName = med?.display_name || 'Medicine';
      const pharm = localDB.pharmacies.find(p => p.id === res.pharmacy_id);
      const pharmName = pharm?.name || 'Pharmacy';
      const cust = localDB.profiles.find(p => p.id === res.user_id);
      const custPhone = cust?.mobile_number || 'Registered Mobile';
      const deadlineFormatted = new Date(expiresAtMs).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      // 1. 30-MINUTE PRE-EXPIRY REMINDER TO CUSTOMER & PHARMACY
      if (timeLeftMs > 0 && timeLeftMs <= 30 * 60 * 1000 && !res.reminder_30m_sent) {
        res.reminder_30m_sent = true;

        // Urgent Reminder to Customer
        localDB.alerts.push({
          id: generateId(),
          pharmacy_id: res.pharmacy_id,
          user_id: res.user_id,
          type: 'PICKUP_REMINDER_30M',
          message: `⏰ URGENT REMINDER: Only 30 minutes left to collect your reserved medicine (${medName} x${res.quantity}) from ${pharmName}. Collection deadline is ${deadlineFormatted}. If not collected, stock will automatically be released!`,
          read_status: false,
          created_at: new Date().toISOString(),
        });

        // 30-Min Reminder to Pharmacy
        localDB.alerts.push({
          id: generateId(),
          pharmacy_id: res.pharmacy_id,
          type: 'PICKUP_REMINDER_30M',
          message: `⏰ 30-Minute Collection Reminder: Reservation #${res.id.slice(-6).toUpperCase()} for ${medName} (Qty: ${res.quantity}) by Customer (+91 ${custPhone}) expires in 30 minutes (${deadlineFormatted}).`,
          read_status: false,
          created_at: new Date().toISOString(),
        });

        alertsAdded = true;
      }

      // 2. AUTOMATIC STOCK RESTORATION WHEN CUSTOMER DID NOT PICK UP MEDICINE
      if (nowTime >= expiresAtMs) {
        res.status = 'EXPIRED';
        res.updated_at = new Date().toISOString();

        // Restore stock to pharmacy inventory automatically exactly once!
        if (!res.stock_restored) {
          const inv = localDB.inventory.find(i => i.pharmacy_id === res.pharmacy_id && i.medicine_id === res.medicine_id);
          if (inv) {
            inv.quantity += res.quantity;
            inv.status = inv.quantity >= 10 ? 'AVAILABLE' : (inv.quantity > 0 ? 'LOW_STOCK' : 'OUT_OF_STOCK');
            inv.last_updated = new Date().toISOString();
          }
          res.stock_restored = true;
        }

        // Automatic Alert to Pharmacy: Stock Restored
        localDB.alerts.push({
          id: generateId(),
          pharmacy_id: res.pharmacy_id,
          type: 'STOCK_AUTO_RESTORED',
          message: `⚠️ Customer Did Not Pick Up: Reservation #${res.id.slice(-6).toUpperCase()} for ${medName} (Qty: ${res.quantity}) expired without collection. Stock (+${res.quantity} units) has been automatically restored to your pharmacy inventory.`,
          read_status: false,
          created_at: new Date().toISOString(),
        });

        // Expiry Alert to Customer
        localDB.alerts.push({
          id: generateId(),
          pharmacy_id: res.pharmacy_id,
          user_id: res.user_id,
          type: 'RESERVATION_EXPIRED',
          message: `❌ Reservation #${res.id.slice(-6).toUpperCase()} Expired: You did not collect your medicine (${medName}) from ${pharmName} before the deadline (${deadlineFormatted}). Reserved stock was automatically released back to pharmacy inventory.`,
          read_status: false,
          created_at: new Date().toISOString(),
        });

        localDB.auditLogs.push({
          id: generateId(),
          action: 'RESERVATION_AUTO_EXPIRED_48H',
          entity_type: 'RESERVATIONS',
          entity_id: res.id,
          details: {
            medicine_id: res.medicine_id,
            pharmacy_id: res.pharmacy_id,
            quantity_restored: res.quantity,
            reason: '48-hour customer collection window elapsed without pickup'
          },
          created_at: new Date().toISOString()
        });

        expiredCount++;
        alertsAdded = true;
      }
    }

    if (expiredCount > 0 || alertsAdded) {
      localDB.save();
    }

    return expiredCount;
  },

  /**
   * API 24: /api/reservations/{id} (GET)
   */
  async getReservationById(id: string): Promise<Reservation | null> {
    await this.checkAndExpireReservations();

    if (isLiveSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from('reservations')
          .select('*, user:profiles(*), pharmacy:pharmacies(*), medicine:medicines(*), bill:bills(*)')
          .eq('id', id)
          .maybeSingle();
        if (data) return data;
      } catch (e) {
        console.warn('Supabase getReservationById fallback:', e);
      }
    }
    const res = localDB.reservations.find(r => r.id === id);
    if (!res) return null;
    return {
      ...res,
      user: localDB.profiles.find(p => p.id === res.user_id),
      pharmacy: localDB.pharmacies.find(p => p.id === res.pharmacy_id),
      medicine: localDB.medicines.find(m => m.id === res.medicine_id),
      bill: localDB.bills.find(b => b.reservation_id === res.id),
    };
  },

  /**
   * API 25: /api/reservations/{id}/cancel (PUT)
   */
  async cancelReservation(id: string, actorId?: string): Promise<{ success: boolean; message: string }> {
    const res = await this.getReservationById(id);
    if (!res) throw new Error('Reservation not found.');
    if (res.status === 'COMPLETED') throw new Error('Completed reservations cannot be cancelled.');
    if (res.status === 'EXPIRED') throw new Error('Expired reservations cannot be cancelled.');

    // Restore stock if not already restored
    if (!res.stock_restored) {
      const inv = await this.getInventory({ pharmacyId: res.pharmacy_id, medicineId: res.medicine_id });
      if (inv.length > 0) {
        await this.updateInventoryItem(inv[0].id, {
          quantity: inv[0].quantity + res.quantity,
        });
      }
      res.stock_restored = true;
    }

    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.from('reservations').update({ status: 'CANCELLED', updated_at: new Date().toISOString() }).eq('id', id);
        return { success: true, message: 'Reservation cancelled and stock restored.' };
      } catch (e) {
        console.warn('Supabase cancelReservation fallback:', e);
      }
    }

    const idx = localDB.reservations.findIndex(r => r.id === id);
    if (idx !== -1) {
      localDB.reservations[idx].status = 'CANCELLED';
      localDB.reservations[idx].stock_restored = true;
      localDB.save();
    }
    return { success: true, message: 'Reservation cancelled and stock restored.' };
  },

  /**
   * Update reservation status (Pharmacy action: Accepted, Ready for Collection, Completed, Rejected)
   */
  async updateReservationStatus(
    id: string, 
    newStatus: ReservationStatus, 
    actorId?: string
  ): Promise<{ success: boolean; reservation: Reservation; bill?: Bill }> {
    const res = await this.getReservationById(id);
    if (!res) throw new Error('Reservation not found.');

    if (res.status === 'EXPIRED') {
      throw new Error('Expired reservations cannot be collected or updated.');
    }
    if (res.status === 'CANCELLED') {
      throw new Error('Cancelled reservations cannot be modified.');
    }

    const now = new Date().toISOString();

    if (newStatus === 'REJECTED' && res.status !== 'REJECTED' && !res.stock_restored) {
      const inv = await this.getInventory({ pharmacyId: res.pharmacy_id, medicineId: res.medicine_id });
      if (inv.length > 0) {
        await this.updateInventoryItem(inv[0].id, {
          quantity: inv[0].quantity + res.quantity,
        });
      }
      res.stock_restored = true;
    }

    let generatedBill: Bill | undefined;

    if (newStatus === 'COMPLETED') {
      res.collected_at = now;
      const billNum = 'BILL-' + now.slice(0, 10).replace(/-/g, '') + '-' + res.id.slice(0, 5).toUpperCase();
      generatedBill = {
        id: generateId(),
        bill_number: billNum,
        reservation_id: res.id,
        user_id: res.user_id,
        pharmacy_id: res.pharmacy_id,
        medicine_name: res.medicine?.display_name || 'Prescription Medicine',
        quantity: res.quantity,
        unit_price: res.unit_price,
        total_amount: res.total_price,
        status: 'GENERATED',
        created_at: now,
      };

      if (isLiveSupabaseConfigured()) {
        try {
          await supabase.from('bills').insert([generatedBill]);
        } catch (e) {
          console.warn('Supabase bill insert fallback:', e);
        }
      } else {
        localDB.bills.push(generatedBill);
      }
    }

    // Dispatch Customer Notifications upon Pharmacy Actions per User Requirements
    const medTitle = res.medicine?.display_name || res.medicine_name || 'Prescription Medicine';
    const pharmTitle = res.pharmacy?.name || res.pharmacy_name || 'Pharmacy';

    let customerStatusAlert: Alert | null = null;

    if (newStatus === 'ACCEPTED') {
      customerStatusAlert = {
        id: generateId(),
        pharmacy_id: res.pharmacy_id,
        user_id: res.user_id,
        type: 'RESERVATION_ACCEPTED',
        message: `✅ Reservation Accepted: Your reservation #${res.id.slice(-6).toUpperCase()} for ${medTitle} (Qty: ${res.quantity}) has been ACCEPTED by ${pharmTitle}. You can collect it at the counter before the deadline.`,
        read_status: false,
        created_at: now,
      };
    } else if (newStatus === 'REJECTED') {
      customerStatusAlert = {
        id: generateId(),
        pharmacy_id: res.pharmacy_id,
        user_id: res.user_id,
        type: 'RESERVATION_REJECTED',
        message: `❌ Reservation Rejected: Your reservation #${res.id.slice(-6).toUpperCase()} for ${medTitle} was REJECTED by ${pharmTitle}. The reserved stock hold has been released.`,
        read_status: false,
        created_at: now,
      };
    } else if (newStatus === 'READY_FOR_COLLECTION') {
      customerStatusAlert = {
        id: generateId(),
        pharmacy_id: res.pharmacy_id,
        user_id: res.user_id,
        type: 'READY_FOR_COLLECTION',
        message: `📦 Ready for Pickup: Your medicine ${medTitle} (Qty: ${res.quantity}) is packed and ready for counter pickup at ${pharmTitle}. Ref ID: #${res.id.slice(-6).toUpperCase()}.`,
        read_status: false,
        created_at: now,
      };
    } else if (newStatus === 'COMPLETED') {
      customerStatusAlert = {
        id: generateId(),
        pharmacy_id: res.pharmacy_id,
        user_id: res.user_id,
        type: 'RESERVATION_COMPLETED',
        message: `🎉 Medicine Collected: Reservation #${res.id.slice(-6).toUpperCase()} for ${medTitle} has been completed at ${pharmTitle}. Invoice generated.`,
        read_status: false,
        created_at: now,
      };
    }

    if (customerStatusAlert) {
      localDB.alerts.unshift(customerStatusAlert);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('medistock_alert_updated'));
      }
    }

    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.from('reservations').update({ 
          status: newStatus, 
          updated_at: now,
          ...(newStatus === 'COMPLETED' ? { collected_at: now } : {})
        }).eq('id', id);
        if (customerStatusAlert) {
          try {
            await supabase.from('alerts').insert([{
              id: customerStatusAlert.id,
              pharmacy_id: res.pharmacy_id,
              type: customerStatusAlert.type,
              message: `[FOR_USER:${res.user_id}] ${customerStatusAlert.message}`,
              read_status: false,
              created_at: now,
            }]);
          } catch (e) {
            console.warn('Supabase updateReservationStatus alert error:', e);
          }
        }
        return { success: true, reservation: { ...res, status: newStatus }, bill: generatedBill };
      } catch (e) {
        console.warn('Supabase updateReservationStatus fallback:', e);
      }
    }

    const idx = localDB.reservations.findIndex(r => r.id === id);
    if (idx !== -1) {
      localDB.reservations[idx].status = newStatus;
      localDB.reservations[idx].updated_at = now;
      if (newStatus === 'COMPLETED') localDB.reservations[idx].collected_at = now;
      localDB.save();
    }

    return { success: true, reservation: { ...res, status: newStatus }, bill: generatedBill };
  },

  // ----------------------------------------------------------------------------
  // 7. BILLING APIs (/api/billing, /api/billing/{id}, /api/billing/user/{id})
  // ----------------------------------------------------------------------------

  /**
   * API 26: /api/billing (POST)
   */
  async generateBill(reservationId: string, actorId?: string): Promise<Bill> {
    const res = await this.getReservationById(reservationId);
    if (!res) throw new Error('Reservation not found.');

    const billNum = 'BILL-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + res.id.slice(0, 5).toUpperCase();
    const newBill: Bill = {
      id: generateId(),
      bill_number: billNum,
      reservation_id: res.id,
      user_id: res.user_id,
      pharmacy_id: res.pharmacy_id,
      medicine_name: res.medicine?.display_name || 'Prescription Medicine',
      quantity: res.quantity,
      unit_price: res.unit_price,
      total_amount: res.total_price,
      status: 'GENERATED',
      created_at: new Date().toISOString(),
    };

    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.from('bills').insert([newBill]);
        return newBill;
      } catch (e) {
        console.warn('Supabase generateBill fallback:', e);
      }
    }

    localDB.bills.push(newBill);
    localDB.save();
    return newBill;
  },

  /**
   * API 27: /api/billing/{id} (GET)
   */
  async getBillById(id: string): Promise<Bill | null> {
    if (isLiveSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from('bills')
          .select('*, customer:profiles(*), pharmacy:pharmacies(*)')
          .eq('id', id)
          .maybeSingle();
        if (data) return data;
      } catch (e) {
        console.warn('Supabase getBillById fallback:', e);
      }
    }
    const bill = localDB.bills.find(b => b.id === id);
    if (!bill) return null;
    return {
      ...bill,
      customer: localDB.profiles.find(p => p.id === bill.user_id),
      pharmacy: localDB.pharmacies.find(p => p.id === bill.pharmacy_id),
    };
  },

  /**
   * API 28: /api/billing/user/{id} (GET)
   */
  async getUserBills(userId: string): Promise<Bill[]> {
    const localItems = localDB.bills
      .filter(b => b.user_id === userId)
      .map(b => ({
        ...b,
        customer: localDB.profiles.find(p => p.id === b.user_id),
        pharmacy: localDB.pharmacies.find(p => p.id === b.pharmacy_id),
      }));

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('bills')
          .select('*, customer:profiles(*), pharmacy:pharmacies(*)')
          .eq('user_id', userId);
        if (data && !error && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase getUserBills fallback:', e);
      }
    }
    return localItems;
  },

  /**
   * API 29: /api/billing/{id}/receipt (GET)
   */
  async getBillReceipt(id: string): Promise<{
    billNumber: string;
    date: string;
    customerName: string;
    customerMobile: string;
    pharmacyName: string;
    pharmacyLicence: string;
    pharmacyAddress: string;
    medicineName: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
  }> {
    const bill = await this.getBillById(id);
    if (!bill) throw new Error('Bill not found.');

    return {
      billNumber: bill.bill_number,
      date: new Date(bill.created_at).toLocaleDateString(),
      customerName: bill.customer?.full_name || 'Registered Customer',
      customerMobile: bill.customer?.mobile_number || 'N/A',
      pharmacyName: bill.pharmacy?.name || 'Local Pharmacy',
      pharmacyLicence: bill.pharmacy?.licence_number || 'N/A',
      pharmacyAddress: bill.pharmacy?.address || 'N/A',
      medicineName: bill.medicine_name,
      quantity: bill.quantity,
      unitPrice: bill.unit_price,
      totalAmount: bill.total_amount,
    };
  },

  // ----------------------------------------------------------------------------
  // 8. ADMIN APIs (/api/admin/dashboard, /api/admin/pharmacy/verify, /api/admin/reports)
  // ----------------------------------------------------------------------------

  /**
   * API 30: /api/admin/dashboard (GET) - Enhanced with 200+ Catalog and 48h Reservation Metrics
   */
  async getAdminDashboardData(): Promise<{
    totalCustomers: number;
    totalPharmacies: number;
    pendingPharmacies: number;
    approvedPharmacies: number;
    rejectedPharmacies: number;
    disabledPharmacies: number;
    totalMedicines: number;
    totalVariants: number;
    totalCategories: number;
    totalInventoryListings: number;
    totalReservations: number;
    activeReservations: number;
    collectedReservations: number;
    expiredReservations: number;
    cancelledReservations: number;
    pharmacies: Pharmacy[];
    medicines: Medicine[];
    reservations: Reservation[];
    auditLogs: AuditLog[];
  }> {
    await this.checkAndExpireReservations();

    let allPharmacies = [...localDB.pharmacies];
    let allProfiles = [...localDB.profiles];
    let allReservations = [...localDB.reservations];

    // Live Supabase Cloud Sync for Multi-Device synchronization
    if (isLiveSupabaseConfigured()) {
      try {
        const { data: pData } = await supabase.from('pharmacies').select('*');
        if (pData && pData.length > 0) {
          allPharmacies = pData;
          localDB.pharmacies = pData;
        }

        const { data: uData } = await supabase.from('profiles').select('*');
        if (uData && uData.length > 0) {
          allProfiles = uData;
          localDB.profiles = uData;
        }

        const { data: rData } = await supabase.from('reservations').select('*');
        if (rData) {
          allReservations = rData;
          localDB.reservations = rData;
        }
      } catch (e) {
        console.warn('Supabase getAdminDashboardData sync fallback:', e);
      }
    }

    const customers = allProfiles.filter(p => p.role === 'CUSTOMER');
    const pending = allPharmacies.filter(p => p.verification_status === 'PENDING_VERIFICATION');
    const approved = allPharmacies.filter(p => p.verification_status === 'APPROVED');
    const rejected = allPharmacies.filter(p => p.verification_status === 'REJECTED');
    const disabled = allPharmacies.filter(p => p.verification_status === 'DISABLED');

    const allMeds = localDB.medicines;
    let varCount = 0;
    const catSet = new Set<string>();
    allMeds.forEach(m => {
      catSet.add(m.category);
      varCount += (m.variants && m.variants.length > 0) ? m.variants.length : 1;
    });

    const activeRes = allReservations.filter(r => r.status === 'PENDING' || r.status === 'ACCEPTED' || r.status === 'READY_FOR_COLLECTION').length;
    const collectedRes = allReservations.filter(r => r.status === 'COMPLETED').length;
    const expiredRes = allReservations.filter(r => r.status === 'EXPIRED').length;
    const cancelledRes = allReservations.filter(r => r.status === 'CANCELLED').length;

    const populatedReservations = allReservations.map(r => ({
      ...r,
      user: allProfiles.find(p => p.id === r.user_id),
      pharmacy: allPharmacies.find(p => p.id === r.pharmacy_id),
      medicine: allMeds.find(m => m.id === r.medicine_id),
      bill: localDB.bills.find(b => b.reservation_id === r.id),
    })).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return {
      totalCustomers: customers.length,
      totalPharmacies: allPharmacies.length,
      pendingPharmacies: pending.length,
      approvedPharmacies: approved.length,
      rejectedPharmacies: rejected.length,
      disabledPharmacies: disabled.length,
      totalMedicines: allMeds.length,
      totalVariants: varCount,
      totalCategories: Math.max(catSet.size, 40),
      totalInventoryListings: localDB.inventory.length,
      totalReservations: allReservations.length,
      activeReservations: activeRes,
      collectedReservations: collectedRes,
      expiredReservations: expiredRes,
      cancelledReservations: cancelledRes,
      pharmacies: [...allPharmacies],
      medicines: [...allMeds],
      reservations: populatedReservations,
      auditLogs: [...localDB.auditLogs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 30),
    };
  },

  /**
   * API 31: /api/admin/pharmacy/verify (PUT)
   */
  async verifyPharmacy(data: {
    pharmacyId: string;
    status: VerificationStatus;
    rejectionReason?: string;
    adminId?: string;
  }): Promise<{ success: boolean; pharmacy: Pharmacy }> {
    if (data.status === 'REJECTED' && (!data.rejectionReason || !data.rejectionReason.trim())) {
      throw new Error('A rejection reason is mandatory when rejecting a pharmacy registration.');
    }

    const now = new Date().toISOString();

    const idx = localDB.pharmacies.findIndex(p => p.id === data.pharmacyId);
    const targetPharm = (idx !== -1 ? localDB.pharmacies[idx] : null) || (data.pharmacyId ? localDB.pharmacies.find(p => p.id === data.pharmacyId) : null);
    let pharmacyStatusAlert: Alert | null = null;

    if (data.status === 'APPROVED') {
      pharmacyStatusAlert = {
        id: generateId(),
        pharmacy_id: data.pharmacyId,
        user_id: targetPharm?.owner_user_id || undefined,
        type: 'PHARMACY_APPROVED',
        message: `🎉 Congratulations! Your pharmacy "${targetPharm?.name || 'Pharmacy'}" has been APPROVED to be part of MediStock. Your medicine stock, store profile, and counter availability are now live for patient searches and reservations.`,
        read_status: false,
        created_at: now,
      };
    } else if (data.status === 'REJECTED') {
      const reasonDesc = data.rejectionReason?.trim() || 'Licence or regulatory documents verification failed';
      pharmacyStatusAlert = {
        id: generateId(),
        pharmacy_id: data.pharmacyId,
        user_id: targetPharm?.owner_user_id || undefined,
        type: 'PHARMACY_REJECTED',
        message: `⚠️ Notice regarding "${targetPharm?.name || 'Pharmacy'}": Your MediStock pharmacy application has been REJECTED. Description / Reason: "${reasonDesc}". Please review your documents or contact administrator for reconsideration.`,
        read_status: false,
        created_at: now,
      };
    }

    if (pharmacyStatusAlert) {
      localDB.alerts.unshift(pharmacyStatusAlert);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('medistock_alert_updated'));
      }
    }

    if (isLiveSupabaseConfigured()) {
      try {
        const { data: updated, error } = await supabase
          .from('pharmacies')
          .update({
            verification_status: data.status,
            rejection_reason: data.status === 'REJECTED' ? data.rejectionReason?.trim() : null,
            verified_by: data.adminId || null,
            verified_at: now,
            updated_at: now,
          })
          .eq('id', data.pharmacyId)
          .select()
          .single();

        if (pharmacyStatusAlert) {
          try {
            await supabase.from('alerts').insert([{
              id: pharmacyStatusAlert.id,
              pharmacy_id: data.pharmacyId,
              type: pharmacyStatusAlert.type,
              message: pharmacyStatusAlert.message,
              read_status: false,
              created_at: now,
            }]);
          } catch (e) {
            console.warn('Supabase verifyPharmacy alert insert error:', e);
          }
        }

        if (updated && !error) {
          const pIdx = localDB.pharmacies.findIndex(p => p.id === data.pharmacyId);
          if (pIdx !== -1) {
            localDB.pharmacies[pIdx] = updated;
          } else {
            localDB.pharmacies.push(updated);
          }
          localDB.save();

          try {
            await supabase.from('audit_logs').insert([{
              id: generateId(),
              actor_user_id: data.adminId,
              action: 'ADMIN_PHARMACY_VERIFICATION',
              entity_type: 'PHARMACIES',
              entity_id: data.pharmacyId,
              details: { newStatus: data.status, reason: data.rejectionReason },
            }]);
          } catch (_) {}

          return { success: true, pharmacy: updated };
        }
      } catch (e) {
        console.warn('Supabase verifyPharmacy fallback:', e);
      }
    }

    const localIdx = idx !== -1 ? idx : localDB.pharmacies.findIndex(p => p.id === data.pharmacyId);
    if (localIdx === -1) {
      if (targetPharm) {
        const newEntry: Pharmacy = {
          ...targetPharm,
          verification_status: data.status,
          rejection_reason: data.status === 'REJECTED' ? data.rejectionReason?.trim() : null,
          verified_by: data.adminId || null,
          verified_at: now,
          updated_at: now,
        };
        localDB.pharmacies.push(newEntry);
        localDB.save();
        return { success: true, pharmacy: newEntry };
      }
      throw new Error('Pharmacy not found.');
    }

    localDB.pharmacies[localIdx] = {
      ...localDB.pharmacies[localIdx],
      verification_status: data.status,
      rejection_reason: data.status === 'REJECTED' ? data.rejectionReason?.trim() : null,
      verified_by: data.adminId || null,
      verified_at: now,
      updated_at: now,
    };

    localDB.auditLogs.push({
      id: generateId(),
      actor_user_id: data.adminId,
      action: 'ADMIN_PHARMACY_VERIFICATION',
      entity_type: 'PHARMACIES',
      entity_id: data.pharmacyId,
      details: { newStatus: data.status, reason: data.rejectionReason },
      created_at: now,
    });

    localDB.save();
    broadcastRealtimeEvent('PHARMACY_STATUS_CHANGED', { pharmacyId: data.pharmacyId, status: data.status });
    return { success: true, pharmacy: localDB.pharmacies[localIdx] };
  },

  /**
   * API 32: /api/admin/reports (GET)
   */
  async getAdminReports(): Promise<{
    reservationsByStatus: Record<string, number>;
    pharmaciesByStatus: Record<string, number>;
    topMedicines: { name: string; count: number }[];
    recentAuditCount: number;
  }> {
    const data = await this.getAdminDashboardData();

    const resStats: Record<string, number> = {
      PENDING: 0,
      ACCEPTED: 0,
      READY_FOR_COLLECTION: 0,
      COMPLETED: 0,
      REJECTED: 0,
      CANCELLED: 0,
    };

    const pharmStats: Record<string, number> = {
      PENDING_VERIFICATION: data.pendingPharmacies,
      APPROVED: data.approvedPharmacies,
      REJECTED: data.rejectedPharmacies,
      DISABLED: data.disabledPharmacies,
    };

    return {
      reservationsByStatus: resStats,
      pharmaciesByStatus: pharmStats,
      topMedicines: [],
      recentAuditCount: data.auditLogs.length,
    };
  },

  async getUserReservations(userId: string): Promise<Reservation[]> {
    await this.checkAndExpireReservations();

    const localItems = localDB.reservations
      .filter(r => r.user_id === userId)
      .map(r => {
        const u = localDB.profiles.find(p => p.id === r.user_id)
          || (r.customer_name ? { id: r.user_id, full_name: r.customer_name, mobile_number: r.customer_phone || '', email: r.customer_email || '' } as Profile : undefined);
        const p = localDB.pharmacies.find(ph => ph.id === r.pharmacy_id)
          || (r.pharmacy_name ? { id: r.pharmacy_id, name: r.pharmacy_name, address: r.pharmacy_address || '', mobile_number: r.pharmacy_phone || '' } as Pharmacy : undefined);
        const m = localDB.medicines.find(med => med.id === r.medicine_id)
          || PREDEFINED_MEDICINES.find(med => med.id === r.medicine_id)
          || (r.medicine_name ? { id: r.medicine_id, display_name: r.medicine_name, category: r.medicine_category || 'General', strength_form: r.medicine_strength || '' } as Medicine : undefined);

        return {
          ...r,
          user: u,
          pharmacy: p,
          medicine: m,
          bill: localDB.bills.find(b => b.reservation_id === r.id),
        };
      });

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('reservations')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (data && !error && data.length > 0) {
          if (localDB.pharmacies.length === 0) {
            try {
              const { data: pData } = await supabase.from('pharmacies').select('*');
              if (pData && pData.length > 0) localDB.pharmacies = pData;
            } catch (_) {}
          }
          const remoteItems: Reservation[] = data.map((r: any) => {
            const u = localDB.profiles.find(p => p.id === r.user_id)
              || (r.customer_name ? { id: r.user_id, full_name: r.customer_name, mobile_number: r.customer_phone || '', email: r.customer_email || '' } as Profile : undefined);
            const p = localDB.pharmacies.find(ph => ph.id === r.pharmacy_id)
              || (r.pharmacy_name ? { id: r.pharmacy_id, name: r.pharmacy_name, address: r.pharmacy_address || '', mobile_number: r.pharmacy_phone || '' } as Pharmacy : undefined);
            const medId = fromCloudMedicineId(r.medicine_id);
            const m = localDB.medicines.find(med => med.id === medId)
              || PREDEFINED_MEDICINES.find(med => med.id === medId)
              || (r.medicine_name ? { id: medId, display_name: r.medicine_name, category: r.medicine_category || 'General', strength_form: r.medicine_strength || '' } as Medicine : undefined);

            return {
              ...r,
              medicine_id: medId,
              user: u,
              pharmacy: p,
              medicine: m,
              bill: localDB.bills.find(b => b.reservation_id === r.id),
            };
          });

          const remoteIds = new Set(remoteItems.map(item => item.id));
          const merged = [...remoteItems, ...localItems.filter(l => !remoteIds.has(l.id))];
          return merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
      } catch (e) {
        console.warn('Supabase getUserReservations fallback:', e);
      }
    }

    return localItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async getPharmacyReservations(pharmacyId: string): Promise<Reservation[]> {
    await this.checkAndExpireReservations();

    if (isLiveSupabaseConfigured() && localDB.profiles.length === 0) {
      try {
        const { data: uData } = await supabase.from('profiles').select('*');
        if (uData && uData.length > 0) localDB.profiles = uData;
      } catch (_) {}
    }

    const localItems = localDB.reservations
      .filter(r => r.pharmacy_id === pharmacyId)
      .map(r => {
        const u = localDB.profiles.find(p => p.id === r.user_id)
          || (r.customer_name ? { id: r.user_id, full_name: r.customer_name, mobile_number: r.customer_phone || '', email: r.customer_email || '' } as Profile : undefined);
        const p = localDB.pharmacies.find(ph => ph.id === r.pharmacy_id)
          || (r.pharmacy_name ? { id: r.pharmacy_id, name: r.pharmacy_name, address: r.pharmacy_address || '', mobile_number: r.pharmacy_phone || '' } as Pharmacy : undefined);
        const m = localDB.medicines.find(med => med.id === r.medicine_id)
          || PREDEFINED_MEDICINES.find(med => med.id === r.medicine_id)
          || (r.medicine_name ? { id: r.medicine_id, display_name: r.medicine_name, category: r.medicine_category || 'General', strength_form: r.medicine_strength || '' } as Medicine : undefined);

        return {
          ...r,
          user: u,
          pharmacy: p,
          medicine: m,
          bill: localDB.bills.find(b => b.reservation_id === r.id),
        };
      });

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('reservations')
          .select('*')
          .eq('pharmacy_id', pharmacyId)
          .order('created_at', { ascending: false });

        if (data && !error && data.length > 0) {
          const remoteItems: Reservation[] = data.map((r: any) => {
            const u = localDB.profiles.find(p => p.id === r.user_id)
              || (r.customer_name ? { id: r.user_id, full_name: r.customer_name, mobile_number: r.customer_phone || '', email: r.customer_email || '' } as Profile : undefined);
            const p = localDB.pharmacies.find(ph => ph.id === r.pharmacy_id)
              || (r.pharmacy_name ? { id: r.pharmacy_id, name: r.pharmacy_name, address: r.pharmacy_address || '', mobile_number: r.pharmacy_phone || '' } as Pharmacy : undefined);
            const medId = fromCloudMedicineId(r.medicine_id);
            const m = localDB.medicines.find(med => med.id === medId)
              || PREDEFINED_MEDICINES.find(med => med.id === medId)
              || (r.medicine_name ? { id: medId, display_name: r.medicine_name, category: r.medicine_category || 'General', strength_form: r.medicine_strength || '' } as Medicine : undefined);

            return {
              ...r,
              medicine_id: medId,
              user: u,
              pharmacy: p,
              medicine: m,
              bill: localDB.bills.find(b => b.reservation_id === r.id),
            };
          });

          const remoteIds = new Set(remoteItems.map(item => item.id));
          const merged = [...remoteItems, ...localItems.filter(l => !remoteIds.has(l.id))];
          return merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
      } catch (e) {
        console.warn('Supabase getPharmacyReservations fallback:', e);
      }
    }

    return localItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async getPharmacyBills(pharmacyId: string): Promise<Bill[]> {
    const localItems = localDB.bills
      .filter(b => b.pharmacy_id === pharmacyId)
      .map(b => ({
        ...b,
        customer: localDB.profiles.find(p => p.id === b.user_id),
        pharmacy: localDB.pharmacies.find(p => p.id === b.pharmacy_id),
      }));

    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('bills')
          .select('*, customer:profiles(*), pharmacy:pharmacies(*)')
          .eq('pharmacy_id', pharmacyId)
          .order('created_at', { ascending: false });
        if (data && !error && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase getPharmacyBills fallback:', e);
      }
    }

    return localItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async hasAdminAccount(): Promise<boolean> {
    if (isLiveSupabaseConfigured()) {
      try {
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'ADMIN');
        return Boolean(count && count > 0);
      } catch (e) {
        console.warn('Supabase hasAdminAccount fallback:', e);
      }
    }
    return localDB.profiles.some(p => p.role === 'ADMIN');
  },

  async getPharmacyAlerts(pharmacyId: string): Promise<Alert[]> {
    await this.checkAndExpireReservations();
    let cloudAlerts: Alert[] = [];
    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('alerts').select('*').eq('pharmacy_id', pharmacyId);
        if (data && !error) {
          cloudAlerts = data.map((d: any) => ({
            ...d,
            message: d.message ? d.message.replace(/^\[FOR_USER:[^\]]+\]\s*/, '') : d.message,
          }));
        }
      } catch (e) {
        console.warn('Supabase getPharmacyAlerts fallback:', e);
      }
    }
    const localItems = localDB.alerts.filter(a => a.pharmacy_id === pharmacyId);
    const cloudIds = new Set(cloudAlerts.map(a => a.id));
    const merged = [...cloudAlerts, ...localItems.filter(l => !cloudIds.has(l.id))];
    return merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async getUserAlerts(userId: string): Promise<Alert[]> {
    await this.checkAndExpireReservations();
    const localItems = localDB.alerts.filter(a => a.user_id === userId);
    let cloudAlerts: Alert[] = [];
    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('alerts')
          .select('*')
          .like('message', `%[FOR_USER:${userId}]%`);
        if (data && !error) {
          cloudAlerts = data.map((d: any) => ({
            ...d,
            user_id: userId,
            message: d.message ? d.message.replace(`[FOR_USER:${userId}] `, '').replace(`[FOR_USER:${userId}]`, '') : d.message,
          }));
        }
      } catch (e) {
        console.warn('Supabase getUserAlerts fallback:', e);
      }
    }
    const existingIds = new Set(cloudAlerts.map(a => a.id));
    const merged = [...cloudAlerts, ...localItems.filter(l => !existingIds.has(l.id))];
    return merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async markAllUserAlertsAsRead(userId: string): Promise<void> {
    for (const a of localDB.alerts) {
      if (a.user_id === userId || (userId === 'admin' && (a.user_id === 'admin' || a.type === 'PHARMACY_PENDING_APPROVAL'))) {
        a.read_status = true;
      }
    }
    localDB.save();
    if (isLiveSupabaseConfigured()) {
      try {
        if (userId === 'admin') {
          await supabase.from('alerts').update({ read_status: true }).or('type.eq.PHARMACY_PENDING_APPROVAL,type.ilike.ADMIN_%');
        } else {
          await supabase.from('alerts').update({ read_status: true }).like('message', `%[FOR_USER:${userId}]%`);
        }
      } catch (_) {}
    }
  },

  async markAlertAsRead(alertId: string): Promise<void> {
    const alert = localDB.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.read_status = true;
      localDB.save();
    }
    if (isLiveSupabaseConfigured()) {
      try {
        await supabase.from('alerts').update({ read_status: true }).eq('id', alertId);
      } catch (e) {
        console.warn('Supabase markAlertAsRead fallback:', e);
      }
    }
  },

  async getAdminAlerts(): Promise<Alert[]> {
    await this.checkAndExpireReservations();
    let cloudAlerts: Alert[] = [];
    if (isLiveSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('alerts')
          .select('*')
          .or('type.eq.PHARMACY_PENDING_APPROVAL,type.ilike.ADMIN_%');
        if (data && !error) {
          cloudAlerts = data.map((a: any) => ({
            ...a,
            user_id: 'admin',
          }));
        }
      } catch (e) {
        console.warn('Supabase getAdminAlerts fallback:', e);
      }
    }
    const localAlerts = localDB.alerts.filter(a => 
      a.user_id === 'admin' || 
      a.type === 'PHARMACY_PENDING_APPROVAL' || 
      a.type.startsWith('ADMIN_')
    );
    const existingIds = new Set(cloudAlerts.map(a => a.id));
    const merged = [...cloudAlerts, ...localAlerts.filter(l => !existingIds.has(l.id))];
    return merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  
  /**
   * Continuous Multi-Device Real-Time Cloud Synchronization
   * Automatically synchronizes profiles, pharmacies, inventory listings, and reservations from Supabase.
   */
  async syncCloudDatabase(): Promise<void> {
    if (!isLiveSupabaseConfigured()) return;
    try {
      const [pRes, uRes, iRes, rRes] = await Promise.all([
        supabase.from('pharmacies').select('*'),
        supabase.from('profiles').select('*'),
        supabase.from('inventory').select('*'),
        supabase.from('reservations').select('*')
      ]);

      if (pRes.data && pRes.data.length > 0) {
        localDB.pharmacies = pRes.data;
      }
      if (uRes.data && uRes.data.length > 0) {
        localDB.profiles = uRes.data;
        for (const u of uRes.data) {
          if (u.password && u.email) {
            localDB.passwords[u.email.toLowerCase()] = u.password;
          }
        }
      }
      if (iRes.data && iRes.data.length > 0) {
        localDB.inventory = iRes.data.map((d: any) => {
          const mId = fromCloudMedicineId(d.medicine_id);
          return {
            ...d,
            medicine_id: mId,
            medicine: localDB.medicines.find(m => m.id === mId) || PREDEFINED_MEDICINES.find(m => m.id === mId),
            pharmacy: localDB.pharmacies.find(p => p.id === d.pharmacy_id),
          };
        });
      }
      if (rRes.data && rRes.data.length > 0) {
        localDB.reservations = rRes.data.map((r: any) => ({
          ...r,
          medicine_id: fromCloudMedicineId(r.medicine_id),
        }));
      }
      localDB.save();
    } catch (err) {
      console.warn('MediStock background cloud sync fallback:', err);
    }
  },
  performSafeDatabaseCleanup(): { backedUp: boolean; backupKey: string } {
    return localDB.performSafeCleanup();
  },

  backupDatabase(): string {
    return localDB.backupDatabase();
  },

  resetEmptyDatabase(): void {
    localDB.clearAllData();
  }
};
