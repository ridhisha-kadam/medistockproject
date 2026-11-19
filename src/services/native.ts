import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Network } from '@capacitor/network';
import { Geolocation } from '@capacitor/geolocation';

export const isNative = Capacitor.isNativePlatform();

/**
 * Initialize native mobile integrations (Status Bar, Splash Screen, Back Button, Network)
 */
export async function initNativeMobileApp(onNetworkChange?: (connected: boolean) => void) {
  if (!isNative) return;

  try {
    // 1. Status Bar Setup - prevent status bar from overlapping top navbar on Samsung and Android devices
    await StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
    await StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    await StatusBar.setBackgroundColor({ color: '#0f766e' }).catch(() => {});
  } catch (e) {
    console.debug('StatusBar init notice:', e);
  }

  try {
    // 2. Hide Splash Screen after React initializes
    setTimeout(async () => {
      await SplashScreen.hide().catch(() => {});
    }, 1200);
  } catch (e) {
    console.debug('SplashScreen hide notice:', e);
  }

  try {
    // 3. Android Hardware Back Button Handling
    CapApp.addListener('backButton', ({ canGoBack }) => {
      const pathname = window.location.pathname;
      if (pathname === '/' || pathname === '/login' || pathname === '/admin' || pathname === '/pharmacy') {
        CapApp.exitApp();
      } else if (canGoBack) {
        window.history.back();
      } else {
        window.location.href = '/';
      }
    });
  } catch (e) {
    console.debug('BackButton listener notice:', e);
  }

  try {
    // 4. Network Status Monitoring
    if (onNetworkChange) {
      Network.addListener('networkStatusChange', status => {
        onNetworkChange(status.connected);
      });
      const status = await Network.getStatus();
      onNetworkChange(status.connected);
    }
  } catch (e) {
    console.debug('Network listener notice:', e);
  }
}

/**
 * Unified Geolocation (Native Capacitor GPS with fallback to Web Geolocation)
 */
export async function getDeviceCoordinates(): Promise<{ lat: number; lng: number }> {
  if (isNative) {
    try {
      const perm = await Geolocation.checkPermissions();
      if (perm.location !== 'granted') {
        const req = await Geolocation.requestPermissions();
        if (req.location !== 'granted') {
          throw new Error('Location permission not granted by user.');
        }
      }
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      return {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
    } catch (err) {
      console.warn('Native geolocation failed, attempting browser fallback:', err);
    }
  }

  // Web Browser fallback
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported on this device.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}
