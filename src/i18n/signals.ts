import { useSyncExternalStore, useRef } from "react";
import {
  allLangs,
  defaultLang,
  detectInitialLanguage,
  getLanguageConfig,
  getLocale,
  getCurrency,
  getCurrencySymbol,
} from "./langs";

/**
 * Lightweight, high-performance Signal implementation for reactive state
 * compatible with React 18/19 via useSyncExternalStore.
 */
export interface Signal<T> {
  value: T;
  subscribe: (listener: () => void) => () => void;
  get: () => T;
  set: (newValue: T | ((prev: T) => T)) => void;
}

export function signal<T>(initialValue: T): Signal<T> {
  let currentValue = initialValue;
  const listeners = new Set<() => void>();

  return {
    get value() {
      return currentValue;
    },
    set value(newValue: T) {
      if (currentValue !== newValue) {
        currentValue = newValue;
        listeners.forEach((l) => l());
      }
    },
    get() {
      return currentValue;
    },
    set(updater: T | ((prev: T) => T)) {
      const next =
        typeof updater === "function"
          ? (updater as (prev: T) => T)(currentValue)
          : updater;
      if (currentValue !== next) {
        currentValue = next;
        listeners.forEach((l) => l());
      }
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

/**
 * Hook to read and subscribe to a global Signal reactively in a React component.
 */
export function useSignalValue<T>(sig: Signal<T>): T {
  return useSyncExternalStore(
    sig.subscribe,
    () => sig.get(),
    () => sig.get(),
  );
}

/**
 * Hook to create a local Signal inside a component (Section 108)
 */
export function useSignal<T>(initialValue: T): Signal<T> {
  const signalRef = useRef<Signal<T> | null>(null);
  if (!signalRef.current) {
    signalRef.current = signal(initialValue);
  }
  useSyncExternalStore(
    signalRef.current.subscribe,
    () => signalRef.current!.get(),
    () => signalRef.current!.get(),
  );
  return signalRef.current;
}

// -------------------------------------------------------------
// CENTRALIZED i18n & APP SIGNALS (Sections 107, 110, 125)
// -------------------------------------------------------------

/** Single Source of Truth for current language */
export const languageSignal = signal<string>(detectInitialLanguage());

/** Global Mobile Menu state signal */
export const mobileMenuSignal = signal<boolean>(false);

/** Global Currency selection signal */
export const selectedCurrencySignal = signal<string>(
  getCurrency(languageSignal.value),
);

/** Global Exchange rate cache signal */
export const exchangeRateSignal = signal<number | null>(null);

/**
 * Centralized language change dispatcher (Section 110 & 114)
 */
export function setLanguage(newLang: string) {
  const config = getLanguageConfig(newLang);
  const targetLang = config.value;

  if (languageSignal.value === targetLang) return;

  // 1. Update Signal value (triggers synchronous UI re-render across all components)
  languageSignal.value = targetLang;

  // 2. Update dependent currency
  selectedCurrencySignal.value = config.currency;

  // 3. Persist to storage
  try {
    localStorage.setItem("i18nextLng", targetLang);
    localStorage.setItem("elleva_lang", targetLang);
  } catch (e) {
    console.warn("Storage write failed", e);
  }

  // 4. Update document HTML lang attribute (Section 119)
  if (typeof document !== "undefined") {
    document.documentElement.lang = config.valueWhithCurrrency || targetLang;
    document.documentElement.setAttribute(
      "lang",
      config.valueWhithCurrrency || targetLang,
    );
  }
}

export function getLanguage(): string {
  return languageSignal.value;
}

export { getLanguageConfig, getLocale, getCurrency, getCurrencySymbol };
