import React, { useMemo } from 'react';
import { SERVICES } from '../constants';
import { useCart } from '../context/CartContext';

const PlanDetails: React.FC = () => {
  const cart = useCart();
  const params = useMemo(() => {
    const search = window.location.hash.split('?')[1] || '';
    return new URLSearchParams(search);
  }, []);

  const planId = params.get('id');

  const plan = useMemo(() => {
    if (!planId) return undefined;
    return SERVICES.find((s) => s.id === planId);
  }, [planId]);

  if (!plan) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-4xl font-oswald uppercase font-bold text-red-600 mb-4">Plan Not Found</h2>
          <a href="#programs" className="text-white border-b border-white hover:text-red-500 hover:border-red-500 transition-all">
            Return to Programs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-6 mb-10">
          <a href="#programs" className="text-neutral-400 hover:text-white transition-colors uppercase tracking-widest text-xs">
            ← Back to Programs
          </a>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                cart.addService(plan.id);
              }}
              className="border border-neutral-800 hover:border-neutral-600 text-white px-6 py-3 font-oswald uppercase tracking-widest text-sm transition-all"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                cart.addService(plan.id);
                window.location.hash = '#/checkout';
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-oswald uppercase tracking-widest text-sm transition-all active:scale-95"
            >
              Checkout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Program Overview</h2>
              <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter leading-none">
                {plan.title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-red-600">{plan.title.split(' ').slice(-1)[0]}</span>
              </h1>
              <p className="text-neutral-400 mt-6 leading-relaxed">
                Train under our instructors with a structured curriculum designed for measurable growth. This plan includes:
              </p>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-sm">
              <div className="flex items-baseline justify-between gap-6 mb-6">
                <div>
                  <div className="text-neutral-500 uppercase tracking-widest text-xs mb-2">Membership Fee</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-oswald font-bold text-white">${plan.price}</span>
                    <span className="text-neutral-500 uppercase text-xs tracking-widest">/ {plan.period}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-neutral-500 uppercase tracking-widest text-xs mb-2">Level</div>
                  <div className="inline-flex px-4 py-2 border border-neutral-800 bg-neutral-950 font-oswald uppercase tracking-widest text-sm">
                    {plan.level}
                  </div>
                </div>
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                    <span className="text-red-600">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => {
                    cart.addService(plan.id);
                  }}
                  className="w-full border border-neutral-800 hover:border-neutral-600 text-white py-4 font-oswald uppercase tracking-[0.2em] text-center transition-all active:scale-95"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    cart.addService(plan.id);
                    window.location.hash = '#/checkout';
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-oswald uppercase tracking-[0.2em] text-center transition-all active:scale-95 shadow-xl shadow-red-600/10"
                >
                  Checkout Now
                </button>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed mt-4">
                On checkout you can pick your preferred payment method (card, PayPal, Apple Pay, and more).
              </p>
            </div>
          </div>

          <div className="border border-neutral-800 bg-neutral-950 rounded-sm overflow-hidden">
            <div className="p-10">
              <h3 className="text-2xl font-oswald font-bold uppercase tracking-tight mb-4">What you’ll get</h3>
              <p className="text-neutral-500 leading-relaxed mb-8">
                A focused training experience built around progressive skill development, accountability, and real-world application.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-black border border-neutral-800 p-6">
                  <div className="text-red-600 font-oswald uppercase tracking-widest text-xs mb-2">Structured Curriculum</div>
                  <div className="text-neutral-300 text-sm">Clear milestones, techniques, and skill checks to track progress.</div>
                </div>
                <div className="bg-black border border-neutral-800 p-6">
                  <div className="text-red-600 font-oswald uppercase tracking-widest text-xs mb-2">Community & Discipline</div>
                  <div className="text-neutral-300 text-sm">Train with purpose alongside dedicated practitioners.</div>
                </div>
                <div className="bg-black border border-neutral-800 p-6">
                  <div className="text-red-600 font-oswald uppercase tracking-widest text-xs mb-2">Personal Growth</div>
                  <div className="text-neutral-300 text-sm">Strength, confidence, and mental toughness through consistent practice.</div>
                </div>
              </div>
            </div>
            <div className="h-40 bg-gradient-to-r from-red-600/15 via-black to-red-600/15 border-t border-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;

