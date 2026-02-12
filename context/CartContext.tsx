import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTS, SERVICES } from '../constants';

export type CartItem =
  | { kind: 'product'; id: string; quantity: number }
  | { kind: 'service'; id: string; quantity: 1 };

type CartState = {
  items: CartItem[];
};

type CartToastState =
  | {
      visible: boolean;
      label: string;
      kind: 'product' | 'service';
    }
  | null;

type CartAPI = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addProduct: (id: string, quantity?: number) => void;
  addService: (id: string) => void;
  removeItem: (kind: CartItem['kind'], id: string) => void;
  setProductQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CART_STORAGE_KEY = 'iron-spirit-cart-v1';

const CartContext = createContext<CartAPI | null>(null);

function clampInt(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function readCartFromStorage(): CartState {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return { items: [] };
    const items = (parsed as { items?: unknown }).items;
    if (!Array.isArray(items)) return { items: [] };

    const normalized: CartItem[] = [];
    for (const it of items) {
      if (!it || typeof it !== 'object') continue;
      const kind = (it as { kind?: unknown }).kind;
      const id = (it as { id?: unknown }).id;
      const quantity = (it as { quantity?: unknown }).quantity;

      if (typeof kind !== 'string' || typeof id !== 'string') continue;
      if (kind === 'product') {
        const q = typeof quantity === 'number' ? quantity : Number.parseInt(String(quantity || '1'), 10);
        normalized.push({ kind: 'product', id, quantity: clampInt(Number.isFinite(q) ? q : 1, 1, 99) });
      } else if (kind === 'service') {
        normalized.push({ kind: 'service', id, quantity: 1 });
      }
    }

    // De-duplicate products by merging quantities; services are unique by id.
    const merged: CartItem[] = [];
    for (const item of normalized) {
      if (item.kind === 'product') {
        const existing = merged.find((m) => m.kind === 'product' && m.id === item.id) as CartItem | undefined;
        if (existing && existing.kind === 'product') {
          existing.quantity = clampInt(existing.quantity + item.quantity, 1, 99);
        } else {
          merged.push({ ...item });
        }
      } else {
        if (!merged.some((m) => m.kind === 'service' && m.id === item.id)) {
          merged.push({ ...item });
        }
      }
    }

    return { items: merged };
  } catch {
    return { items: [] };
  }
}

function writeCartToStorage(state: CartState) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
}

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<CartState>(() => readCartFromStorage());
  const didInit = useRef(false);
  const [toast, setToast] = useState<CartToastState>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  // Load from storage once on mount (helps when StrictMode double-invokes initializers in dev).
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    setState(readCartFromStorage());
  }, []);

  useEffect(() => {
    writeCartToStorage(state);
    // optional: allow non-context listeners to update
    window.dispatchEvent(new CustomEvent('cart:changed'));
  }, [state]);

  useEffect(() => {
    if (!toast || !toast.visible) return;
    if (hideTimeoutRef.current != null) {
      window.clearTimeout(hideTimeoutRef.current);
    }
    const id = window.setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, visible: false } : prev));
    }, 2000);
    hideTimeoutRef.current = id;
    return () => {
      if (hideTimeoutRef.current != null) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [toast]);

  const addProduct = useCallback((id: string, quantity = 1) => {
    const qty = clampInt(quantity, 1, 99);
    const product = PRODUCTS.find((x) => x.id === id);
    setState((prev) => {
      const existingIdx = prev.items.findIndex((i) => i.kind === 'product' && i.id === id);
      if (existingIdx >= 0) {
        const next = [...prev.items];
        const existing = next[existingIdx] as Extract<CartItem, { kind: 'product' }>;
        next[existingIdx] = { ...existing, quantity: clampInt(existing.quantity + qty, 1, 99) };
        return { items: next };
      }
      return { items: [...prev.items, { kind: 'product', id, quantity: qty }] };
    });
    setToast({
      visible: true,
      label: product ? product.name : 'Item',
      kind: 'product',
    });
  }, []);

  const addService = useCallback((id: string) => {
    const service = SERVICES.find((x) => x.id === id);
    setState((prev) => {
      if (prev.items.some((i) => i.kind === 'service' && i.id === id)) return prev;
      return { items: [...prev.items, { kind: 'service', id, quantity: 1 }] };
    });
    setToast({
      visible: true,
      label: service ? service.title : 'Membership',
      kind: 'service',
    });
  }, []);

  const removeItem = useCallback((kind: CartItem['kind'], id: string) => {
    setState((prev) => ({ items: prev.items.filter((i) => !(i.kind === kind && i.id === id)) }));
  }, []);

  const setProductQuantity = useCallback((id: string, quantity: number) => {
    const qty = clampInt(quantity, 1, 99);
    setState((prev) => ({
      items: prev.items.map((i) => (i.kind === 'product' && i.id === id ? { ...i, quantity: qty } : i)),
    }));
  }, []);

  const clear = useCallback(() => setState({ items: [] }), []);

  const itemCount = useMemo(() => {
    return state.items.reduce((sum, i) => sum + (i.kind === 'product' ? i.quantity : 1), 0);
  }, [state.items]);

  const subtotal = useMemo(() => {
    let total = 0;
    for (const item of state.items) {
      if (item.kind === 'product') {
        const p = PRODUCTS.find((x) => x.id === item.id);
        if (p) total += p.price * item.quantity;
      } else {
        const s = SERVICES.find((x) => x.id === item.id);
        if (s) total += s.price;
      }
    }
    return total;
  }, [state.items]);

  const api = useMemo<CartAPI>(
    () => ({
      items: state.items,
      itemCount,
      subtotal,
      addProduct,
      addService,
      removeItem,
      setProductQuantity,
      clear,
    }),
    [addProduct, addService, clear, itemCount, removeItem, setProductQuantity, state.items, subtotal]
  );

  return (
    <CartContext.Provider value={api}>
      {children}
      {toast && toast.visible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-neutral-900/95 border border-neutral-700 px-5 py-4 rounded-sm shadow-xl shadow-black/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="w-9 h-9 rounded-full bg-red-600/90 flex items-center justify-center text-white text-lg">
              {toast.kind === 'product' ? '🛒' : '🥋'}
            </div>
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Added to cart</p>
              <p className="text-sm text-white font-oswald uppercase tracking-widest mt-1 line-clamp-1">
                {toast.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
};

export function useCart(): CartAPI {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

