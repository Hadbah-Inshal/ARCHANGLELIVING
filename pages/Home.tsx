
import React, { useState, useEffect } from 'react';
import { SERVICES, PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import heroVideo from '../images/1.mp4';
import instituteVideo from '../images/2.mp4';

const Home: React.FC = () => {
  const cart = useCart();
  const [shopFilter, setShopFilter] = useState<'all' | 'gear' | 'apparel' | 'equipment'>('all');
  const [formData, setFormData] = useState({ name: '', email: '', program: 'General Inquiry', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const filteredProducts = shopFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === shopFilter);
  const featuredProducts = filteredProducts.slice(0, 4);

  const handleFilterChange = (cat: typeof shopFilter) => {
    if (cat === shopFilter) return;
    setIsFiltering(true);
    setTimeout(() => {
      setShopFilter(cat);
      setIsFiltering(false);
    }, 200);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            src={heroVideo}
            className="w-full h-full object-cover opacity-40"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-red-600 font-oswald uppercase tracking-[0.3em] mb-4 animate-in fade-in slide-in-from-top-4 duration-700">Master Your Discipline</h2>
          <h1 className="text-6xl md:text-9xl font-oswald font-bold uppercase tracking-tighter leading-none mb-8 animate-in fade-in zoom-in duration-1000">
            <span className="text-red-600">ARCHANGEL</span>LIVING
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-neutral-300 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            A sanctuary for those who seek strength through stillness and power through discipline. Join the path of the modern warrior.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <a href="#programs" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-oswald uppercase text-lg tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/20">
              Start Your Journey
            </a>
            <a href="#shop" className="border border-white/20 hover:border-red-600 text-white px-10 py-4 font-oswald uppercase text-lg tracking-widest transition-all backdrop-blur-sm">
              Explore Gear
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none select-none">
          <span className="text-[200px] font-bold leading-none">武士道</span>
        </div>
      </section>

      {/* The Institute Section */}
      <section id="institute" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group overflow-hidden">
            <div className="absolute -inset-4 bg-red-600/10 rounded-sm blur-2xl group-hover:bg-red-600/20 transition-all duration-700"></div>
            <video
              src={instituteVideo}
              className="relative rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105 shadow-2xl w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div>
            <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">The Institute</h2>
            <h3 className="text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter mb-6 leading-none">A Legacy of <span className="text-red-600">Discipline</span></h3>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              Founded on the principles of Bushido, ARCHANGLELIVING is more than a gym. It is a center for holistic martial excellence. We blend the traditional techniques of Karate with the practical efficiency of Brazilian Jiu-Jitsu and the explosive power of Muay Thai.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-oswald text-white uppercase tracking-widest mb-2 border-b border-red-900/50 pb-2">Philosophy</h4>
                <p className="text-neutral-500 text-sm">Character over competition. We build leaders, not just fighters.</p>
              </div>
              <div>
                <h4 className="font-oswald text-white uppercase tracking-widest mb-2 border-b border-red-900/50 pb-2">Heritage</h4>
                <p className="text-neutral-500 text-sm">Rooted in ancient Japanese traditions, adapted for modern combat.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Master Section */}
      <section id="master" className="py-24 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none text-9xl font-bold font-oswald uppercase select-none">SENSEI</div>
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">The Master</h2>
            <h3 className="text-4xl md:text-6xl font-oswald font-bold uppercase tracking-tighter mb-6 leading-none">Sensei <span className="text-red-600">Kaito Nakamura</span></h3>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              With over 30 years of experience and a 7th-degree black belt, Sensei Kaito has dedicated his life to the pursuit of martial perfection. Having trained under world-renowned grandmasters in Osaka, he brings an authentic, high-discipline approach to every session.
            </p>
            <blockquote className="border-l-4 border-red-600 pl-6 py-2 italic text-neutral-300 text-xl mb-8">
              "Your greatest opponent is the version of yourself that wants to quit."
            </blockquote>
            <div className="flex gap-4">
              <div className="bg-neutral-900 px-4 py-2 rounded-sm border border-neutral-800">
                <span className="text-red-600 font-bold block">7th Dan</span>
                <span className="text-xs uppercase tracking-tighter text-neutral-500">Black Belt</span>
              </div>
              <div className="bg-neutral-900 px-4 py-2 rounded-sm border border-neutral-800">
                <span className="text-red-600 font-bold block">15+</span>
                <span className="text-xs uppercase tracking-tighter text-neutral-500">Masters Taught</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm border-2 border-red-900/20">
              <img 
                src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
                alt="Sensei Kaito Nakamura"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="programs" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Training Programs</h2>
          <h3 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter">Choose Your <span className="text-red-600">Path</span></h3>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group relative bg-black border border-neutral-800 p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/10">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-oswald text-4xl font-bold group-hover:text-red-600 group-hover:opacity-20 transition-all">{service.level}</div>
              <h4 className="text-2xl font-oswald font-bold uppercase mb-2 group-hover:text-red-500 transition-colors">{service.title}</h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-oswald font-bold text-white">${service.price}</span>
                <span className="text-neutral-500 uppercase text-xs tracking-widest">/ {service.period}</span>
              </div>
              <ul className="flex-1 space-y-4 mb-10">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-400 text-sm"><span className="text-red-600">✓</span> {feature}</li>
                ))}
              </ul>
              <a 
                href={`#/plan?id=${service.id}`}
                className="w-full bg-transparent border border-red-600 text-white py-3 font-oswald uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 text-center"
              >
                Select Plan
              </a>
              <button
                type="button"
                onClick={() => {
                  cart.addService(service.id);
                }}
                className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3 font-oswald uppercase tracking-widest transition-all active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* The Shop / Armory */}
      <section id="shop" className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Official Dojo Gear</h2>
            <h3 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter">The <span className="text-red-600">Armory</span></h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {(['all', 'gear', 'apparel', 'equipment'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-6 py-2 font-oswald uppercase tracking-widest text-xs border transition-all duration-300 whitespace-nowrap ${
                  shopFilter === cat ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-800 text-neutral-500 hover:border-neutral-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className={`max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-300 ${isFiltering ? 'opacity-0' : 'opacity-100'}`}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden mb-4 border border-neutral-800 transition-all duration-500 group-hover:border-red-900/50">
                <a href={`#/product?id=${product.id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                </a>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                   <div className="flex gap-3 transform translate-y-4 group-hover:translate-y-0 duration-500 transition-transform">
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
              </div>
              <a
                href={`#/product?id=${product.id}`}
                className="font-oswald text-lg uppercase tracking-wider text-white group-hover:text-red-500 transition-colors duration-300"
              >
                {product.name}
              </a>
              <p className="text-neutral-500 text-sm font-light mb-2">{product.category}</p>
              <p className="text-white font-oswald font-bold">${product.price}</p>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-10 text-center">
          <a
            href="#/shop"
            className="inline-block border border-neutral-700 hover:border-red-600 text-white px-10 py-3 font-oswald uppercase tracking-widest text-sm transition-all"
          >
            View More Gear
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Enroll Now</h2>
            <h3 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter mb-8">Enter the <span className="text-red-600">Dojo</span></h3>
            <div className="space-y-8 mt-12">
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-600 flex-shrink-0">📍</div>
                 <div><h5 className="font-oswald uppercase tracking-widest text-white mb-1 text-sm">Our Location</h5><p className="text-neutral-500 text-sm">123 Warrior Path, Zen District, CA 90210</p></div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-600 flex-shrink-0">📧</div>
                 <div><h5 className="font-oswald uppercase tracking-widest text-white mb-1 text-sm">Email Us</h5><p className="text-neutral-500 text-sm">oss@ironspiritdojo.com</p></div>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900/50 p-8 md:p-12 border border-neutral-800 rounded-sm">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-300">
                 <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-4xl mb-6">🙏</div>
                 <h4 className="text-3xl font-oswald uppercase mb-4">Message Received</h4>
                 <p className="text-neutral-500">Respect, student. We will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required placeholder="Full Name" type="text" className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required placeholder="Email" type="email" className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <select className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600" value={formData.program} onChange={(e) => setFormData({...formData, program: e.target.value})}>
                  <option>General Inquiry</option>
                  <option>White Belt Foundation</option>
                  <option>Bushido Masterclass</option>
                  <option>Private Session</option>
                </select>
                <textarea required placeholder="Message" rows={4} className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-oswald uppercase tracking-widest text-lg transition-all active:scale-95 shadow-lg shadow-red-600/10">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
