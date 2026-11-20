import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { api } from './services/api';
import { initSupabaseRealtime } from './services/supabase';

// Pages
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { PharmacyDetailsPage } from './pages/PharmacyDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PendingVerificationPage } from './pages/PendingVerificationPage';
import { PharmacyDashboardPage } from './pages/PharmacyDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CustomerReservationsPage } from './pages/CustomerReservationsPage';
import { MedicineCatalogPage } from './pages/MedicineCatalogPage';
import { AdminSetupPage } from './pages/AdminSetupPage';

// Route guards
const ProtectedPharmacyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isPharmacy, pharmacy } = useAuth();
  if (!user || !isPharmacy) return <Navigate to="/login" replace />;
  if (pharmacy?.verification_status === 'PENDING_VERIFICATION') {
    return <Navigate to="/pending-verification" replace />;
  }
  return <>{children}</>;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const ProtectedCustomerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Automatic 48-Hour Reservation Expiry Watcher

// Continuous Multi-Device Real-Time Cloud Database Synchronizer
const CloudDatabaseSyncWatcher: React.FC = () => {
  useEffect(() => {
    initSupabaseRealtime(async () => { await api.syncCloudDatabase(); });
    api.syncCloudDatabase();
    const interval = setInterval(() => {
      api.syncCloudDatabase();
    }, 12000); // Poll and synchronize every 12 seconds
    return () => clearInterval(interval);
  }, []);
  return null;
};

const AutoExpiryWatcher: React.FC = () => {
  useEffect(() => {
    // Run immediately on mount
    api.checkAndExpireReservations().catch((err) => {
      console.warn('Auto-expiry check error:', err);
    });

    // Run every 60 seconds
    const interval = setInterval(() => {
      api.checkAndExpireReservations().catch((err) => {
        console.warn('Auto-expiry check interval error:', err);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CloudDatabaseSyncWatcher />
        <AutoExpiryWatcher />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Discovery Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/catalog" element={<MedicineCatalogPage />} />
              <Route path="/pharmacy/:id" element={<PharmacyDetailsPage />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin/setup" element={<AdminSetupPage />} />
              <Route path="/setup-admin" element={<AdminSetupPage />} />
              <Route path="/pending-verification" element={<PendingVerificationPage />} />

              {/* Protected Role Dashboards */}
              <Route
                path="/pharmacy"
                element={
                  <ProtectedPharmacyRoute>
                    <PharmacyDashboardPage />
                  </ProtectedPharmacyRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboardPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/customer/reservations"
                element={
                  <ProtectedCustomerRoute>
                    <CustomerReservationsPage />
                  </ProtectedCustomerRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
