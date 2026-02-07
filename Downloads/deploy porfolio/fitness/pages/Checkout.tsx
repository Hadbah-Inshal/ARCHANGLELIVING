
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTS, SERVICES } from '../constants';
import { useCart } from '../context/CartContext';

const Checkout: React.FC = () => {
  type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google' | 'bank';

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const cart = useCart();
  const didConsumeQuery = useRef(false);

  // Back-compat: if someone lands on checkout with ?id&type&qty, add it to cart once, then clean the URL.
  useEffect(() => {
    if (didConsumeQuery.current) return;
    didConsumeQuery.current = true;

    const search = window.location.hash.split('?')[1] || '';
    const params = new URLSearchParams(search);
    const id = params.get('id');
    if (!id) return;

    const type = params.get('type') === 'product' ? 'product' : 'service';
    const qtyRaw = Number.parseInt(params.get('qty') || '1', 10);
    const qty = Number.isFinite(qtyRaw) ? Math.max(1, Math.min(99, qtyRaw)) : 1;

    if (type === 'product') cart.addProduct(id, qty);
    else cart.addService(id);

    // Clean URL so refresh doesn't duplicate.
    window.location.hash = '#/checkout';
  }, [cart]);

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
          image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=400',
          unitPrice: s.price,
          quantity: 1,
          lineTotal: s.price,
        };
      })
      .filter(Boolean);
  }, [cart.items]);

  if (lines.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-4xl font-oswald uppercase font-bold text-red-600 mb-4">Cart is Empty</h2>
          <p className="text-neutral-500 mb-8">Add a plan or product first, then return to checkout.</p>
          <a href="#/cart" className="text-white border-b border-white hover:text-red-500 hover:border-red-500 transition-all">
            Go to Cart
          </a>
        </div>
      </div>
    );
  }

  const subtotal = cart.subtotal;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    cart.clear();
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6 animate-in zoom-in duration-500">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 p-12 text-center rounded-sm">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-2xl shadow-red-600/20">🙏</div>
          <h2 className="text-3xl font-oswald uppercase font-bold mb-4 tracking-tight">Transaction Complete</h2>
          <p className="text-neutral-500 mb-10 leading-relaxed">Your order is being processed. May your spirit remain strong as you await your gear.</p>
          <a href="#home" className="block w-full bg-red-600 hover:bg-red-700 text-white py-4 font-oswald uppercase tracking-widest text-center transition-all">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Order Summary */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div>
            <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Secure Checkout</h2>
            <h1 className="text-5xl font-oswald font-bold uppercase tracking-tighter leading-none">Complete Your <span className="text-red-600">Selection</span></h1>
          </div>

          <div className="space-y-6">
            {lines.map((l) => (
              <div
                key={l!.key}
                className="bg-neutral-900/50 border border-neutral-800 p-6 flex flex-col sm:flex-row gap-6 items-start rounded-sm"
              >
                <div className="w-full sm:w-28 h-32 flex-shrink-0 bg-neutral-950 border border-neutral-800 overflow-hidden">
                  <img src={l!.image} alt={l!.title} className="w-full h-full object-cover grayscale brightness-90" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-oswald font-bold uppercase mb-1">{l!.title}</h3>
                      <p className="text-neutral-500 text-sm line-clamp-2">{l!.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.removeItem(l!.kind, l!.id)}
                      className="text-neutral-500 hover:text-red-500 transition-colors uppercase tracking-widest text-xs"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="text-white font-oswald font-bold">${l!.unitPrice.toFixed(2)}</div>
                      {l!.kind === 'product' ? (
                        <div className="flex items-center border border-neutral-800 bg-neutral-950">
                          <button
                            type="button"
                            onClick={() => cart.setProductQuantity(l!.id, Math.max(1, l!.quantity - 1))}
                            className="px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <div className="px-3 py-2 min-w-10 text-center font-oswald">{l!.quantity}</div>
                          <button
                            type="button"
                            onClick={() => cart.setProductQuantity(l!.id, Math.min(99, l!.quantity + 1))}
                            className="px-3 py-2 text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <div className="text-neutral-500 uppercase tracking-widest text-xs">Qty 1</div>
                      )}
                    </div>
                    <div className="text-red-600 font-oswald font-bold text-xl">${l!.lineTotal.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
            <a href="#/cart" className="inline-block text-neutral-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
              ← Edit cart
            </a>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between text-neutral-500 uppercase tracking-widest text-xs">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-neutral-500 uppercase tracking-widest text-xs border-b border-neutral-900 pb-4">
                <span>Shipping / Tax</span>
                <span>$0.00</span>
             </div>
             <div className="flex justify-between text-white font-oswald font-bold text-xl uppercase pt-2">
                <span>Total Amount</span>
                <span className="text-red-600">${subtotal.toFixed(2)}</span>
             </div>
          </div>
        </div>

        {/* Right: Payment Form */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-700 delay-100 rounded-sm">
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 border-b border-neutral-800 pb-4">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-3 text-xs font-oswald uppercase tracking-widest transition-all ${paymentMethod === 'card' ? 'text-red-600 border-b-2 border-red-600' : 'text-neutral-500 hover:text-white'}`}
              >
                Credit Card
              </button>
              <button 
                onClick={() => setPaymentMethod('paypal')}
                className={`flex-1 py-3 text-xs font-oswald uppercase tracking-widest transition-all ${paymentMethod === 'paypal' ? 'text-red-600 border-b-2 border-red-600' : 'text-neutral-500 hover:text-white'}`}
              >
                PayPal
              </button>
              <button 
                onClick={() => setPaymentMethod('apple')}
                className={`flex-1 py-3 text-xs font-oswald uppercase tracking-widest transition-all ${paymentMethod === 'apple' ? 'text-red-600 border-b-2 border-red-600' : 'text-neutral-500 hover:text-white'}`}
              >
                Apple Pay
              </button>
              <button 
                onClick={() => setPaymentMethod('google')}
                className={`flex-1 py-3 text-xs font-oswald uppercase tracking-widest transition-all ${paymentMethod === 'google' ? 'text-red-600 border-b-2 border-red-600' : 'text-neutral-500 hover:text-white'}`}
              >
                Google Pay
              </button>
              <button 
                onClick={() => setPaymentMethod('bank')}
                className={`flex-1 py-3 text-xs font-oswald uppercase tracking-widest transition-all ${paymentMethod === 'bank' ? 'text-red-600 border-b-2 border-red-600' : 'text-neutral-500 hover:text-white'}`}
              >
                Bank Transfer
              </button>
           </div>

           <form onSubmit={handlePay} className="space-y-6">
              {paymentMethod === 'card' ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Cardholder Name</label>
                    <input required type="text" placeholder="KAITO NAKAMURA" className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 placeholder:opacity-20 uppercase font-oswald" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Card Number</label>
                    <input required type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 placeholder:opacity-20" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Expiry Date</label>
                      <input required type="text" placeholder="MM/YY" className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 placeholder:opacity-20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">CVV</label>
                      <input required type="text" placeholder="***" className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 placeholder:opacity-20" />
                    </div>
                  </div>
                </div>
              ) : paymentMethod === 'bank' ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="bg-neutral-950 border border-neutral-800 p-6 rounded-sm">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2">Bank transfer instructions</div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Use the details below to complete a transfer. After submitting, you’ll see a confirmation screen.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
                      <div>
                        <div className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">Account Name</div>
                        <div className="text-white font-oswald uppercase tracking-wider">ARCHANGELLIVING</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">Reference</div>
                        <div className="text-white font-oswald uppercase tracking-wider">
                          ORDER-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 100000)).padStart(5, '0')}
                        </div>
                      </div>
                      <div>
                        <div className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">Amount</div>
                        <div className="text-white font-oswald uppercase tracking-wider">${subtotal.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-neutral-500 uppercase tracking-widest text-[10px] mb-1">Routing</div>
                        <div className="text-white font-oswald uppercase tracking-wider">110000000</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Your Email (for receipt)</label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 placeholder:opacity-20"
                    />
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center animate-in fade-in duration-300">
                   <p className="text-neutral-400 mb-4">
                     Redirecting to{' '}
                     {paymentMethod === 'paypal'
                       ? 'PayPal'
                       : paymentMethod === 'apple'
                         ? 'Apple Pay'
                         : 'Google Pay'}{' '}
                     Secure Gateway...
                   </p>
                   <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-oswald uppercase tracking-[0.2em] text-lg transition-all active:scale-95 shadow-xl shadow-red-600/10"
              >
                Confirm Purchase
              </button>
           </form>

           <div className="mt-8 pt-8 border-t border-neutral-800 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all">
              <span className="text-[10px] uppercase font-bold tracking-widest">Encrypted SSL</span>
              <div className="flex gap-4 items-center">
                 <div className="w-8 h-5 bg-neutral-700 rounded-sm"></div>
                 <div className="w-8 h-5 bg-neutral-700 rounded-sm"></div>
                 <div className="w-8 h-5 bg-neutral-700 rounded-sm"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
