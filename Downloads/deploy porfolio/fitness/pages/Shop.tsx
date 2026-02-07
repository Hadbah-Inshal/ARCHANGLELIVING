
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';

const Shop: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'gear' | 'apparel' | 'equipment'>('all');
  const cart = useCart();

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Official Dojo Gear</h2>
          <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter">Armory <span className="text-red-600">&</span> Wear</h1>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {(['all', 'gear', 'apparel', 'equipment'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 font-oswald uppercase tracking-widest text-xs border transition-all whitespace-nowrap ${
                filter === cat ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-800 text-neutral-500 hover:border-neutral-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group flex flex-col">
            <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden mb-4 border border-neutral-800 transition-colors group-hover:border-red-900/50">
              <a href={`#/product?id=${product.id}`} className="block w-full h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </a>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 duration-300 transition-transform">
                   <a
                     href={`#/product?id=${product.id}`}
                     className="bg-white text-black px-5 py-3 font-oswald uppercase text-xs tracking-widest hover:bg-neutral-200 transition-all"
                   >
                     View
                   </a>
                   <button
                     type="button"
                     onClick={() => {
                       cart.addProduct(product.id, 1);
                     }}
                     className="bg-red-600 text-white px-5 py-3 font-oswald uppercase text-xs tracking-widest hover:bg-red-700 transition-all"
                   >
                     Add to Cart
                   </button>
                 </div>
              </div>
              {product.price > 200 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-oswald uppercase tracking-widest px-2 py-1">
                  Premium
                </div>
              )}
            </div>
            
            <a
              href={`#/product?id=${product.id}`}
              className="font-oswald text-lg uppercase tracking-wider text-white group-hover:text-red-500 transition-colors"
            >
              {product.name}
            </a>
            <p className="text-neutral-500 text-sm font-light mb-2">{product.category}</p>
            <p className="text-white font-oswald font-bold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
