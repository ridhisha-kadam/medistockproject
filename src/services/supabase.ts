import { createClient } from '@supabase/supabase-js';

// Production Cloud Supabase configuration for multi-device sync
const PRODUCTION_SUPABASE_URL = 'https://vhwurjcyjbcqyfmnwdaq.supabase.co';
const PRODUCTION_SUPABASE_KEY = 'sb_publishable_Tk30HnWLAgPUyPt20Mh2xg_HUS13KM7';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseUrl = (envUrl && !envUrl.includes('placeholder-project')) 
  ? envUrl 
  : PRODUCTION_SUPABASE_URL;

export const supabaseAnonKey = (envKey && !envKey.includes('placeholder-anon-key')) 
  ? envKey 
  : PRODUCTION_SUPABASE_KEY;

export const isLiveSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('placeholder-project') &&
    supabaseUrl.startsWith('https://')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const ADMIN_SETUP_SECRET = import.meta.env.VITE_ADMIN_SETUP_SECRET || 'MEDISTOCK_SECRET_2026';

let globalRealtimeChannel: any = null;

export const initSupabaseRealtime = (onEvent?: (eventType: string, payload: any) => void) => {
  if (!isLiveSupabaseConfigured() || typeof window === 'undefined') return null;
  if (globalRealtimeChannel) return globalRealtimeChannel;

  try {
    globalRealtimeChannel = supabase.channel('medistock-realtime-sync', {
      config: { broadcast: { self: false } },
    });

    globalRealtimeChannel
      .on('broadcast', { event: 'INVENTORY_CHANGED' }, (p: any) => {
        if (onEvent) onEvent('INVENTORY_CHANGED', p.payload);
        window.dispatchEvent(new CustomEvent('medistock_stock_updated', { detail: p.payload }));
      })
      .on('broadcast', { event: 'PHARMACY_STATUS_CHANGED' }, (p: any) => {
        if (onEvent) onEvent('PHARMACY_STATUS_CHANGED', p.payload);
        window.dispatchEvent(new CustomEvent('medistock_alert_updated', { detail: p.payload }));
        window.dispatchEvent(new CustomEvent('medistock_stock_updated', { detail: p.payload }));
      })
      .on('broadcast', { event: 'RESERVATION_CHANGED' }, (p: any) => {
        if (onEvent) onEvent('RESERVATION_CHANGED', p.payload);
        window.dispatchEvent(new CustomEvent('medistock_alert_updated', { detail: p.payload }));
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, (p: any) => {
        if (onEvent) onEvent('INVENTORY_CHANGED', p);
        window.dispatchEvent(new CustomEvent('medistock_stock_updated', { detail: p }));
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pharmacies' }, (p: any) => {
        if (onEvent) onEvent('PHARMACY_STATUS_CHANGED', p);
        window.dispatchEvent(new CustomEvent('medistock_alert_updated', { detail: p }));
        window.dispatchEvent(new CustomEvent('medistock_stock_updated', { detail: p }));
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, (p: any) => {
        if (onEvent) onEvent('RESERVATION_CHANGED', p);
        window.dispatchEvent(new CustomEvent('medistock_alert_updated', { detail: p }));
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, (p: any) => {
        window.dispatchEvent(new CustomEvent('medistock_alert_updated', { detail: p }));
      })
      .subscribe((status: string) => {
        console.log('[Supabase Realtime] Channel status:', status);
      });

    return globalRealtimeChannel;
  } catch (err) {
    console.warn('[Supabase Realtime] Channel initialization notice:', err);
    return null;
  }
};

export const broadcastRealtimeEvent = (event: 'INVENTORY_CHANGED' | 'PHARMACY_STATUS_CHANGED' | 'RESERVATION_CHANGED', payload: any = {}) => {
  if (!isLiveSupabaseConfigured() || !globalRealtimeChannel) return;
  try {
    globalRealtimeChannel.send({
      type: 'broadcast',
      event,
      payload: { ...payload, clientTimestamp: Date.now() },
    });
  } catch (err) {
    console.warn('[Supabase Realtime] Broadcast notice:', err);
  }
};
