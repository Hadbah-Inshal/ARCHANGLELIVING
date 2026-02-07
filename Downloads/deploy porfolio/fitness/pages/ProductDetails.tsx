import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';

const clampInt = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const ProductDetails: React.FC = () => {
  const cart = useCart();
  const params = useMemo(() => {
    const search = window.location.hash.split('?')[1] || '';
    return new URLSearchParams(search);
  }, []);

  const productId = params.get('id');

  const product = useMemo(() => {
    if (!productId) return undefined;
    return PRODUCTS.find((p) => p.id === productId);
  }, [productId]);

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-4xl font-oswald uppercase font-bold text-red-600 mb-4">Item Not Found</h2>
          <a href="#shop" className="text-white border-b border-white hover:text-red-500 hover:border-red-500 transition-all">
            Return to the Armory
          </a>
        </div>
      </div>
    );
  }

  const subtotal = product.price * qty;

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-10">
          <a href="#shop" className="text-neutral-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
            ← Back to Shop
          </a>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                cart.addProduct(product.id, qty);
              }}
              className="border border-neutral-800 hover:border-neutral-600 text-white px-6 py-3 font-oswald uppercase tracking-widest text-sm transition-all"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                cart.addProduct(product.id, qty);
                window.location.hash = '#/checkout';
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-oswald uppercase tracking-widest text-sm transition-all active:scale-95"
            >
              Checkout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative border border-neutral-800 bg-neutral-950 overflow-hidden rounded-sm">
            <img src={product.image} alt={product.name} className="w-full h-[520px] object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] bg-black/60 border border-white/10 px-3 py-1 text-neutral-200">
                  {product.category}
                </span>
                {product.price > 200 && (
                  <span className="text-[10px] uppercase tracking-[0.2em] bg-red-600/80 border border-red-500/40 px-3 py-1 text-white">
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Purchase Details</h2>
              <h1 className="text-5xl md:text-6xl font-oswald font-bold uppercase tracking-tighter leading-none">
                {product.name.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-red-600">{product.name.split(' ').slice(-1)[0]}</span>
              </h1>
              <p className="text-neutral-400 mt-6 leading-relaxed">{product.description}</p>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 uppercase tracking-widest text-xs">Unit Price</span>
                <span className="text-white font-oswald font-bold text-2xl">${product.price.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <span className="text-neutral-500 uppercase tracking-widest text-xs">Quantity</span>
                <div className="flex items-center border border-neutral-800 bg-neutral-950">
                  <button
                    type="button"
                    onClick={() => setQty((q) => clampInt(q - 1, 1, 99))}
                    className="px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="px-4 py-2 min-w-12 text-center font-oswald">{qty}</div>
                  <button
                    type="button"
                    onClick={() => setQty((q) => clampInt(q + 1, 1, 99))}
                    className="px-4 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <span className="text-white font-oswald font-bold text-xl uppercase">Subtotal</span>
                <span className="text-red-600 font-oswald font-bold text-2xl">${subtotal.toFixed(2)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    cart.addProduct(product.id, qty);
                  }}
                  className="w-full border border-neutral-800 hover:border-neutral-600 text-white py-4 font-oswald uppercase tracking-[0.2em] text-center transition-all active:scale-95"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    cart.addProduct(product.id, qty);
                    window.location.hash = '#/checkout';
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-oswald uppercase tracking-[0.2em] text-center transition-all active:scale-95 shadow-xl shadow-red-600/10"
                >
                  Checkout Now
                </button>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed">
                You’ll choose your preferred payment method on the next page (card, PayPal, Apple Pay, and more).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

