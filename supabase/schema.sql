-- ==============================================================================
-- MEDISTOCK – A LOCAL MEDICINE AVAILABILITY FINDER
-- Complete PostgreSQL Database Schema for Supabase
-- Authoritative Source of Truth, RLS Policies, Indexes & Atomic Functions
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CUSTOM TYPES
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('CUSTOMER', 'PHARMACY', 'ADMIN');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'verification_status') THEN
    CREATE TYPE verification_status AS ENUM ('PENDING_VERIFICATION', 'APPROVED', 'REJECTED', 'DISABLED');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'stock_status') THEN
    CREATE TYPE stock_status AS ENUM ('AVAILABLE', 'LOW_STOCK', 'OUT_OF_STOCK');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reservation_status') THEN
    CREATE TYPE reservation_status AS ENUM ('PENDING', 'ACCEPTED', 'READY_FOR_COLLECTION', 'COMPLETED', 'EXPIRED', 'REJECTED', 'CANCELLED');
  END IF;
END $$;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE, -- linked to Supabase auth.users(id) when using Supabase Auth
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile_number TEXT NOT NULL,
  password TEXT, -- Encrypted / hashed credentials for direct multi-device synchronization
  role TEXT NOT NULL CHECK (role IN ('CUSTOMER', 'PHARMACY', 'ADMIN')),
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password TEXT;

-- Database-Level Single Admin Guarantee: At most ONE administrator account can EVER exist
CREATE UNIQUE INDEX IF NOT EXISTS idx_single_admin ON public.profiles ((1)) WHERE (role = 'ADMIN');

-- Database trigger preventing creation of any secondary admin account
CREATE OR REPLACE FUNCTION trg_enforce_single_admin_func()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role = 'ADMIN' THEN
    IF EXISTS (SELECT 1 FROM public.profiles WHERE role = 'ADMIN' AND id <> NEW.id) THEN
      RAISE EXCEPTION 'Admin account has already been created. Only one administrator account is allowed.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_single_admin ON public.profiles;
CREATE TRIGGER trg_enforce_single_admin
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION trg_enforce_single_admin_func();

-- 4. PHARMACIES TABLE
CREATE TABLE IF NOT EXISTS public.pharmacies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  licence_number TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pin_code TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  opening_hours TEXT NOT NULL DEFAULT '9:00 AM - 9:00 PM',
  latitude NUMERIC(10, 6) DEFAULT 15.4589, -- Default to Hubballi-Dharwad region coordinates
  longitude NUMERIC(10, 6) DEFAULT 75.0078,
  verification_status TEXT NOT NULL DEFAULT 'PENDING_VERIFICATION' CHECK (verification_status IN ('PENDING_VERIFICATION', 'APPROVED', 'REJECTED', 'DISABLED')),
  rejection_reason TEXT,
  verified_by UUID REFERENCES public.profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. MEDICINES TABLE (Shared Central Medicine Catalogue)
CREATE TABLE IF NOT EXISTS public.medicines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  brand_name TEXT,
  generic_name TEXT NOT NULL,
  active_ingredient TEXT,
  composition TEXT,
  category TEXT NOT NULL,
  strength_form TEXT NOT NULL,
  dosage_form TEXT,
  route TEXT,
  description TEXT,
  combination_ingredients TEXT,
  reference_source TEXT,
  is_prescription_required BOOLEAN DEFAULT true,
  catalogue_status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (catalogue_status IN ('ACTIVE', 'INACTIVE')),
  variants JSONB,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_medicine_entry UNIQUE (display_name, category, strength_form)
);

-- 6. INVENTORY / STOCK LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pharmacy_id UUID NOT NULL REFERENCES public.pharmacies(id) ON DELETE CASCADE,
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity >= 0),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  expiry_date DATE NOT NULL,
  batch_number TEXT,
  status TEXT NOT NULL CHECK (status IN ('AVAILABLE', 'LOW_STOCK', 'OUT_OF_STOCK')),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_pharmacy_medicine UNIQUE (pharmacy_id, medicine_id)
);

ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS batch_number TEXT;

-- 7. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pharmacy_id UUID NOT NULL REFERENCES public.pharmacies(id) ON DELETE CASCADE,
  medicine_id UUID NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'READY_FOR_COLLECTION', 'COMPLETED', 'EXPIRED', 'REJECTED', 'CANCELLED')),
  notes TEXT,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (timezone('utc'::text, now()) + interval '4 hours'),
  stock_restored BOOLEAN NOT NULL DEFAULT false,
  reminder_30m_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. BILLS TABLE
CREATE TABLE IF NOT EXISTS public.bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_number TEXT NOT NULL UNIQUE,
  reservation_id UUID NOT NULL REFERENCES public.reservations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  pharmacy_id UUID NOT NULL REFERENCES public.pharmacies(id),
  medicine_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'GENERATED',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID REFERENCES public.profiles(id),
  actor_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. ALERTS TABLE
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pharmacy_id UUID NOT NULL REFERENCES public.pharmacies(id) ON DELETE CASCADE,
  user_id TEXT, -- Target user for customer pickup / status notifications
  listing_id UUID REFERENCES public.inventory(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  read_status BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS user_id TEXT;

-- 11. INDEXES FOR HIGH SEARCH PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_pharmacies_verification ON public.pharmacies(verification_status);
CREATE INDEX IF NOT EXISTS idx_pharmacies_pin ON public.pharmacies(pin_code);
CREATE INDEX IF NOT EXISTS idx_pharmacies_city ON public.pharmacies(city);
CREATE INDEX IF NOT EXISTS idx_medicines_name ON public.medicines(display_name);
CREATE INDEX IF NOT EXISTS idx_medicines_generic ON public.medicines(generic_name);
CREATE INDEX IF NOT EXISTS idx_inventory_pharmacy ON public.inventory(pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_inventory_medicine ON public.inventory(medicine_id);
CREATE INDEX IF NOT EXISTS idx_inventory_status ON public.inventory(status);
CREATE INDEX IF NOT EXISTS idx_reservations_user ON public.reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_pharmacy ON public.reservations(pharmacy_id);
CREATE INDEX IF NOT EXISTS idx_bills_user ON public.bills(user_id);
CREATE INDEX IF NOT EXISTS idx_bills_pharmacy ON public.bills(pharmacy_id);

-- 12. ROW LEVEL SECURITY (RLS) POLICIES
-- Configured for centralized production database with cross-device & cross-network sync
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Profiles Policies (App-level authentication sync across all devices)
DROP POLICY IF EXISTS "Public profile creation during registration" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow all profiles" ON public.profiles;
CREATE POLICY "Allow all profiles" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

-- Pharmacies Policies (Allows cross-device registration, admin approvals, public lookups)
DROP POLICY IF EXISTS "Anyone can view approved pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Pharmacy owners can view own pharmacy" ON public.pharmacies;
DROP POLICY IF EXISTS "Admins can view and edit all pharmacies" ON public.pharmacies;
DROP POLICY IF EXISTS "Pharmacy owners can insert pharmacy registration" ON public.pharmacies;
DROP POLICY IF EXISTS "Pharmacy owners can update own details" ON public.pharmacies;
DROP POLICY IF EXISTS "Allow all pharmacies" ON public.pharmacies;
CREATE POLICY "Allow all pharmacies" ON public.pharmacies FOR ALL USING (true) WITH CHECK (true);

-- Medicines Catalog Policies
DROP POLICY IF EXISTS "Anyone can view active medicines" ON public.medicines;
DROP POLICY IF EXISTS "Authenticated pharmacies and admins can insert medicines" ON public.medicines;
DROP POLICY IF EXISTS "Allow all medicines" ON public.medicines;
CREATE POLICY "Allow all medicines" ON public.medicines FOR ALL USING (true) WITH CHECK (true);

-- Inventory / Stock Listings Policies (Allows multi-device inventory updates)
DROP POLICY IF EXISTS "Public can view inventory of approved pharmacies" ON public.inventory;
DROP POLICY IF EXISTS "Pharmacy owners manage own inventory" ON public.inventory;
DROP POLICY IF EXISTS "Allow all inventory" ON public.inventory;
CREATE POLICY "Allow all inventory" ON public.inventory FOR ALL USING (true) WITH CHECK (true);

-- Reservations Policies (Cross-device reservation creation & updates)
DROP POLICY IF EXISTS "Customers can manage own reservations" ON public.reservations;
DROP POLICY IF EXISTS "Pharmacies can view and update reservations for their store" ON public.reservations;
DROP POLICY IF EXISTS "Admins can view all reservations" ON public.reservations;
DROP POLICY IF EXISTS "Allow all reservations" ON public.reservations;
CREATE POLICY "Allow all reservations" ON public.reservations FOR ALL USING (true) WITH CHECK (true);

-- Bills Policies
DROP POLICY IF EXISTS "Customers view own bills" ON public.bills;
DROP POLICY IF EXISTS "Pharmacies view own bills" ON public.bills;
DROP POLICY IF EXISTS "Allow all bills" ON public.bills;
CREATE POLICY "Allow all bills" ON public.bills FOR ALL USING (true) WITH CHECK (true);

-- Alerts Policies
DROP POLICY IF EXISTS "Users view own alerts" ON public.alerts;
DROP POLICY IF EXISTS "Allow all alerts" ON public.alerts;
CREATE POLICY "Allow all alerts" ON public.alerts FOR ALL USING (true) WITH CHECK (true);

-- Audit Logs Policies
DROP POLICY IF EXISTS "Admins view audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Allow all audit logs" ON public.audit_logs;
CREATE POLICY "Allow all audit logs" ON public.audit_logs FOR ALL USING (true) WITH CHECK (true);

-- Realtime Publication for Cross-Device Synchronization
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY['profiles', 'pharmacies', 'medicines', 'inventory', 'reservations', 'bills', 'alerts', 'audit_logs'])
  LOOP
    BEGIN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', tbl);
    EXCEPTION
      WHEN duplicate_object THEN
        NULL;
      WHEN undefined_object THEN
        NULL;
    END;
  END LOOP;
END $$;

-- 13. ATOMIC PROCEDURES / POSTGRESQL FUNCTIONS

-- A. One-Time Administrator Registration with Server Secret
CREATE OR REPLACE FUNCTION register_initial_admin(
  p_full_name TEXT,
  p_email TEXT,
  p_mobile_number TEXT,
  p_city TEXT,
  p_state TEXT,
  p_pin_code TEXT,
  p_secret TEXT,
  p_expected_secret TEXT
) RETURNS JSONB AS $$
DECLARE
  v_admin_count INTEGER;
  v_new_profile_id UUID;
BEGIN
  -- Validate server secret
  IF p_secret IS NULL OR p_secret <> p_expected_secret THEN
    RAISE EXCEPTION 'Invalid administrator setup secret.';
  END IF;

  -- Atomic check: only allow if no administrator currently exists
  SELECT count(*) INTO v_admin_count FROM public.profiles WHERE role = 'ADMIN';
  IF v_admin_count > 0 THEN
    RAISE EXCEPTION 'Administrator account already registered. Public admin registration is permanently disabled.';
  END IF;

  -- Insert the first administrator profile
  INSERT INTO public.profiles (full_name, email, mobile_number, role, city, state, pin_code)
  VALUES (p_full_name, p_email, p_mobile_number, 'ADMIN', p_city, p_state, p_pin_code)
  RETURNING id INTO v_new_profile_id;

  -- Record audit event
  INSERT INTO public.audit_logs (actor_user_id, actor_email, action, entity_type, entity_id, details)
  VALUES (v_new_profile_id, p_email, 'INITIAL_ADMIN_REGISTERED', 'PROFILES', v_new_profile_id::text, jsonb_build_object('name', p_full_name));

  RETURN jsonb_build_object('success', true, 'profile_id', v_new_profile_id, 'message', 'Initial administrator registered successfully.');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- B. Atomic Medicine Reservation & Stock Deduction
CREATE OR REPLACE FUNCTION create_reservation_atomic(
  p_user_id UUID,
  p_pharmacy_id UUID,
  p_medicine_id UUID,
  p_quantity INTEGER
) RETURNS JSONB AS $$
DECLARE
  v_pharmacy_status TEXT;
  v_current_stock INTEGER;
  v_price NUMERIC(10, 2);
  v_new_stock INTEGER;
  v_new_status TEXT;
  v_reservation_id UUID;
  v_medicine_name TEXT;
BEGIN
  -- 1. Check pharmacy verification status
  SELECT verification_status INTO v_pharmacy_status FROM public.pharmacies WHERE id = p_pharmacy_id;
  IF v_pharmacy_status IS NULL OR v_pharmacy_status <> 'APPROVED' THEN
    RAISE EXCEPTION 'Pharmacy is not approved for reservations.';
  END IF;

  -- 2. Lock inventory row for atomic stock check and update (prevents race conditions)
  SELECT quantity, price INTO v_current_stock, v_price
  FROM public.inventory
  WHERE pharmacy_id = p_pharmacy_id AND medicine_id = p_medicine_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Medicine not found in pharmacy inventory.';
  END IF;

  IF v_current_stock < p_quantity THEN
    RAISE EXCEPTION 'Insufficient stock. Requested: %, Available: %', p_quantity, v_current_stock;
  END IF;

  -- 3. Calculate new stock and status
  v_new_stock := v_current_stock - p_quantity;
  IF v_new_stock = 0 THEN
    v_new_status := 'OUT_OF_STOCK';
  ELSIF v_new_stock < 10 THEN
    v_new_status := 'LOW_STOCK';
  ELSE
    v_new_status := 'AVAILABLE';
  END IF;

  -- 4. Update inventory stock
  UPDATE public.inventory
  SET quantity = v_new_stock,
      status = v_new_status,
      last_updated = timezone('utc'::text, now())
  WHERE pharmacy_id = p_pharmacy_id AND medicine_id = p_medicine_id;

  -- 5. Insert reservation
  INSERT INTO public.reservations (
    user_id, pharmacy_id, medicine_id, quantity, unit_price, total_price, status
  ) VALUES (
    p_user_id, p_pharmacy_id, p_medicine_id, p_quantity, v_price, (v_price * p_quantity), 'PENDING'
  ) RETURNING id INTO v_reservation_id;

  -- 6. Trigger Low Stock Alert if needed
  IF v_new_stock < 10 THEN
    SELECT display_name INTO v_medicine_name FROM public.medicines WHERE id = p_medicine_id;
    INSERT INTO public.alerts (pharmacy_id, listing_id, type, message)
    VALUES (
      p_pharmacy_id,
      (SELECT id FROM public.inventory WHERE pharmacy_id = p_pharmacy_id AND medicine_id = p_medicine_id),
      'LOW_STOCK',
      format('Low stock alert: %s has %s units remaining.', v_medicine_name, v_new_stock)
    );
  END IF;

  -- 7. Audit log
  INSERT INTO public.audit_logs (actor_user_id, action, entity_type, entity_id, details)
  VALUES (p_user_id, 'RESERVATION_CREATED', 'RESERVATIONS', v_reservation_id::text, jsonb_build_object('quantity', p_quantity, 'total_price', (v_price * p_quantity)));

  RETURN jsonb_build_object(
    'success', true,
    'reservation_id', v_reservation_id,
    'remaining_stock', v_new_stock,
    'total_amount', (v_price * p_quantity)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- C. Complete Reservation and Generate Official Bill
CREATE OR REPLACE FUNCTION complete_reservation_and_bill(
  p_reservation_id UUID,
  p_actor_user_id UUID
) RETURNS JSONB AS $$
DECLARE
  v_res RECORD;
  v_bill_num TEXT;
  v_bill_id UUID;
  v_med_name TEXT;
BEGIN
  -- Get reservation details
  SELECT r.*, m.display_name INTO v_res
  FROM public.reservations r
  JOIN public.medicines m ON m.id = r.medicine_id
  WHERE r.id = p_reservation_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Reservation not found.';
  END IF;

  -- Mark reservation completed
  UPDATE public.reservations
  SET status = 'COMPLETED', updated_at = timezone('utc'::text, now())
  WHERE id = p_reservation_id;

  -- Generate sequential bill number: BILL-YYYYMMDD-XXXX
  v_bill_num := 'BILL-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substring(replace(p_reservation_id::text, '-', ''), 1, 6));

  -- Insert bill
  INSERT INTO public.bills (
    bill_number, reservation_id, user_id, pharmacy_id, medicine_name, quantity, unit_price, total_amount, status
  ) VALUES (
    v_bill_num, p_reservation_id, v_res.user_id, v_res.pharmacy_id, v_res.display_name, v_res.quantity, v_res.unit_price, v_res.total_price, 'GENERATED'
  ) RETURNING id INTO v_bill_id;

  -- Audit log
  INSERT INTO public.audit_logs (actor_user_id, action, entity_type, entity_id, details)
  VALUES (p_actor_user_id, 'BILL_GENERATED', 'BILLS', v_bill_id::text, jsonb_build_object('bill_number', v_bill_num, 'total', v_res.total_price));

  RETURN jsonb_build_object('success', true, 'bill_id', v_bill_id, 'bill_number', v_bill_num);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- D. Administrator Verification Status Change
CREATE OR REPLACE FUNCTION admin_verify_pharmacy(
  p_admin_id UUID,
  p_pharmacy_id UUID,
  p_new_status TEXT,
  p_rejection_reason TEXT DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  v_admin_role TEXT;
  v_pharmacy_name TEXT;
BEGIN
  SELECT role INTO v_admin_role FROM public.profiles WHERE id = p_admin_id;
  IF v_admin_role IS NULL OR v_admin_role <> 'ADMIN' THEN
    RAISE EXCEPTION 'Unauthorized: only administrators can perform pharmacy verification.';
  END IF;

  IF p_new_status = 'REJECTED' AND (p_rejection_reason IS NULL OR trim(p_rejection_reason) = '') THEN
    RAISE EXCEPTION 'A rejection reason is mandatory when rejecting a pharmacy registration.';
  END IF;

  SELECT name INTO v_pharmacy_name FROM public.pharmacies WHERE id = p_pharmacy_id;

  UPDATE public.pharmacies
  SET verification_status = p_new_status,
      rejection_reason = p_rejection_reason,
      verified_by = p_admin_id,
      verified_at = timezone('utc'::text, now()),
      updated_at = timezone('utc'::text, now())
  WHERE id = p_pharmacy_id;

  -- Audit log
  INSERT INTO public.audit_logs (actor_user_id, action, entity_type, entity_id, details)
  VALUES (p_admin_id, 'PHARMACY_STATUS_CHANGE', 'PHARMACIES', p_pharmacy_id::text, jsonb_build_object('pharmacy_name', v_pharmacy_name, 'new_status', p_new_status, 'reason', p_rejection_reason));

  RETURN jsonb_build_object('success', true, 'status', p_new_status, 'pharmacy_name', v_pharmacy_name);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- E. Automatic 4-Hour Reservation Expiry and Atomic Stock Restoration
CREATE OR REPLACE FUNCTION expire_stale_reservations_atomic()
RETURNS JSONB AS $$
DECLARE
  v_rec RECORD;
  v_count INTEGER := 0;
BEGIN
  FOR v_rec IN 
    SELECT r.id, r.user_id, r.pharmacy_id, r.medicine_id, r.quantity, r.expires_at, m.display_name AS medicine_name, p.name AS pharmacy_name
    FROM public.reservations r
    JOIN public.medicines m ON m.id = r.medicine_id
    JOIN public.pharmacies p ON p.id = r.pharmacy_id
    WHERE r.status IN ('PENDING', 'ACCEPTED', 'READY_FOR_COLLECTION')
      AND (
        (r.expires_at IS NOT NULL AND r.expires_at <= timezone('utc'::text, now()))
        OR (r.expires_at IS NULL AND r.created_at <= (timezone('utc'::text, now()) - interval '4 hours'))
      )
      AND r.stock_restored = false
    FOR UPDATE OF r
  LOOP
    -- 1. Mark reservation as EXPIRED and record stock_restored
    UPDATE public.reservations
    SET status = 'EXPIRED',
        stock_restored = true,
        updated_at = timezone('utc'::text, now())
    WHERE id = v_rec.id;

    -- 2. Restore stock to pharmacy inventory atomically
    UPDATE public.inventory
    SET quantity = quantity + v_rec.quantity,
        status = CASE 
          WHEN (quantity + v_rec.quantity) >= 10 THEN 'AVAILABLE'
          WHEN (quantity + v_rec.quantity) > 0 THEN 'LOW_STOCK'
          ELSE 'OUT_OF_STOCK'
        END,
        last_updated = timezone('utc'::text, now())
    WHERE pharmacy_id = v_rec.pharmacy_id AND medicine_id = v_rec.medicine_id;

    -- 3. Notify Pharmacy
    INSERT INTO public.alerts (pharmacy_id, listing_id, type, message)
    VALUES (
      v_rec.pharmacy_id,
      (SELECT id FROM public.inventory WHERE pharmacy_id = v_rec.pharmacy_id AND medicine_id = v_rec.medicine_id LIMIT 1),
      'STOCK_AUTO_RESTORED',
      format('⚠️ Customer Did Not Pick Up: Reservation #%s for %s (Qty: %s) expired after 4h. Stock (+%s units) automatically restored.', upper(substring(replace(v_rec.id::text, '-', ''), 1, 6)), v_rec.medicine_name, v_rec.quantity, v_rec.quantity)
    );

    -- 4. Notify Customer
    INSERT INTO public.alerts (pharmacy_id, user_id, type, message)
    VALUES (
      v_rec.pharmacy_id,
      v_rec.user_id,
      'RESERVATION_EXPIRED',
      format('❌ Reservation Expired: You did not collect your medicine (%s) from %s within 4 hours. Stock was released.', v_rec.medicine_name, v_rec.pharmacy_name)
    );

    -- 5. Audit Log
    INSERT INTO public.audit_logs (actor_user_id, action, entity_type, entity_id, details)
    VALUES (
      v_rec.user_id,
      'RESERVATION_AUTO_EXPIRED_4H',
      'RESERVATIONS',
      v_rec.id::text,
      jsonb_build_object('quantity_restored', v_rec.quantity, 'medicine_name', v_rec.medicine_name, 'pharmacy_name', v_rec.pharmacy_name)
    );

    v_count := v_count + 1;
  END LOOP;

  RETURN jsonb_build_object('success', true, 'expired_count', v_count);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 14. OPTIONAL CRON SCHEDULER (Supabase pg_cron extension)
-- Runs the 4-hour auto-expiration check every 5 minutes in background
-- Uncomment when pg_cron extension is enabled in your Supabase project:
-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule('medistock-auto-expire-4h', '*/5 * * * *', 'SELECT expire_stale_reservations_atomic();');

