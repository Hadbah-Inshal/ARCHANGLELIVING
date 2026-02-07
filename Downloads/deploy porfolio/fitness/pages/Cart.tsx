import React, { useMemo } from 'react';
import { PRODUCTS, SERVICES } from '../constants';
import { useCart } from '../context/CartContext';

const clampInt = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const Cart: React.FC = () => {
  const cart = useCart();

  const lines = useMemo(() => {
    return cart.items
      .map((item) => {
        if (item.kind === 'product') {
          const p = PRODUCTS.find((x) => x.id === item.id);
          if (!p) return null;
          return {
            key: `product:${p.id}`,
            kind: 'product' as const,
            id: p.id,
            title: p.name,
            description: p.description,
            image: p.image,
            unitPrice: p.price,
            quantity: item.quantity,
            lineTotal: p.price * item.quantity,
          };
        }

        const s = SERVICES.find((x) => x.id === item.id);
        if (!s) return null;
        return {
          key: `service:${s.id}`,
          kind: 'service' as const,
          id: s.id,
          title: s.title,
          description: `Membership fee billed per ${s.period}.`,
          image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=600',
          unitPrice: s.price,
          quantity: 1,
          lineTotal: s.price,
        };
      })
      .filter(Boolean);
  }, [cart.items]);

  if (lines.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Your Cart</h2>
          <h1 className="text-5xl md:text-6xl font-oswald font-bold uppercase tracking-tighter">Empty</h1>
          <p className="text-neutral-500 mt-6 leading-relaxed">
            Add a plan or some gear, then come back here to checkout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="#programs"
              className="border border-neutral-800 hover:border-red-600 text-white px-8 py-4 font-oswald uppercase tracking-widest text-sm transition-all"
            >
              Browse Programs
            </a>
            <a
              href="#shop"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-oswald uppercase tracking-widest text-sm transition-all active:scale-95"
            >
              Browse Shop
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Your Cart</h2>
              <h1 className="text-5xl font-oswald font-bold uppercase tracking-tighter leading-none">
                Review <span className="text-red-600">Items</span>
              </h1>
            </div>
            <button
              type="button"
              onClick={() => cart.clear()}
              className="text-neutral-500 hover:text-white transition-colors uppercase tracking-widest text-xs"
            >
              Clear cart
            </button>
          </div>

          <div className="space-y-6">
            {lines.map((l) => (
              <div
                key={l!.key}
                className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-sm flex flex-col sm:flex-row gap-6"
              >
                <div className="w-full sm:w-40 h-44 bg-neutral-950 border border-neutral-800 overflow-hidden flex-shrink-0">
                  <img src={l!.image} alt={l!.title} className="w-full h-full object-cover grayscale brightness-90" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-oswald font-bold uppercase mb-2">{l!.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">{l!.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.removeItem(l!.kind, l!.id)}
                      className="text-neutral-500 hover:text-red-500 transition-colors uppercase tracking-widest text-xs"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">Unit</div>
                        <div className="text-white font-oswald font-bold text-xl">${l!.unitPrice.toFixed(2)}</div>
                      </div>

                      {l!.kind === 'product' ? (
                        <div>
                          <div className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">Qty</div>
                          <div className="flex items-center border border-neutral-800 bg-neutral-950">
                            <button
                              type="button"
                              onClick={() => cart.setProductQuantity(l!.id, clampInt(l!.quantity - 1, 1, 99))}
                              className="px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <div className="px-4 py-2 min-w-12 text-center font-oswald">{l!.quantity}</div>
                            <button
                              type="button"
                              onClick={() => cart.setProductQuantity(l!.id, clampInt(l!.quantity + 1, 1, 99))}
                              className="px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">Qty</div>
                          <div className="text-white font-oswald font-bold text-xl">1</div>
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">Line total</div>
                      <div className="text-red-600 font-oswald font-bold text-2xl">${l!.lineTotal.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-10 rounded-sm sticky top-28 h-fit">
          <h3 className="text-2xl font-oswald font-bold uppercase mb-6">Order Summary</h3>

          <div className="space-y-4">
            <div className="flex justify-between text-neutral-500 uppercase tracking-widest text-xs">
              <span>Items</span>
              <span>{cart.itemCount}</span>
            </div>
            <div className="flex justify-between text-neutral-500 uppercase tracking-widest text-xs">
              <span>Subtotal</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-500 uppercase tracking-widest text-xs border-b border-neutral-800 pb-4">
              <span>Shipping / Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-white font-oswald font-bold text-xl uppercase pt-2">
              <span>Total</span>
              <span className="text-red-600">${cart.subtotal.toFixed(2)}</span>
            </div>
          </div>

          <a
            href="#/checkout"
            className="block w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-4 font-oswald uppercase tracking-[0.2em] text-center transition-all active:scale-95 shadow-xl shadow-red-600/10"
          >
            Proceed to Checkout
          </a>

          <div className="flex gap-4 mt-4">
            <a
              href="#programs"
              className="flex-1 border border-neutral-800 hover:border-neutral-600 text-white py-3 font-oswald uppercase tracking-widest text-xs text-center transition-all"
            >
              Add a Plan
            </a>
            <a
              href="#shop"
              className="flex-1 border border-neutral-800 hover:border-neutral-600 text-white py-3 font-oswald uppercase tracking-widest text-xs text-center transition-all"
            >
              Add Gear
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

