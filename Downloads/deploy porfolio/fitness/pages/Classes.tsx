
import React from 'react';
import { SERVICES } from '../constants';

const Classes: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Training Programs</h2>
        <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter">Choose Your <span className="text-red-600">Path</span></h1>
        <p className="text-neutral-500 mt-6 max-w-2xl mx-auto">
          Whether you are looking to build foundational skills or master advanced combat techniques, we have a program tailored for you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div 
            key={service.id} 
            className="group relative bg-neutral-900 border border-neutral-800 p-8 flex flex-col transition-all hover:-translate-y-2 hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/10"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 font-oswald text-4xl font-bold group-hover:text-red-600 group-hover:opacity-20 transition-all">
              {service.level}
            </div>
            
            <h3 className="text-2xl font-oswald font-bold uppercase mb-2 group-hover:text-red-500 transition-colors">
              {service.title}
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-oswald font-bold text-white">${service.price}</span>
              <span className="text-neutral-500 uppercase text-xs tracking-widest">/ {service.period}</span>
            </div>

            <ul className="flex-1 space-y-4 mb-10">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-400 text-sm">
                  <span className="text-red-600">✓</span> {feature}
                </li>
              ))}
            </ul>

            <a
              href={`#/plan?id=${service.id}`}
              className="w-full bg-transparent border border-red-600 text-white py-3 font-oswald uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 text-center"
            >
              Select Plan
            </a>
          </div>
        ))}
      </div>
      
      {/* Testimonial Feature */}
      <div className="max-w-4xl mx-auto mt-32 text-center bg-neutral-950 p-12 border border-neutral-900 rounded-sm">
         <div className="flex justify-center gap-2 mb-6">
            {[1,2,3,4,5].map(i => <span key={i} className="text-red-600">★</span>)}
         </div>
        <p className="text-xl md:text-2xl text-neutral-300 italic font-light leading-relaxed mb-6">
          "The discipline I cultivated at ARCHANGELLIVING transformed not just my body, but my entire approach to life's challenges. The Sensei is world-class."
        </p>
         <cite className="font-oswald uppercase tracking-widest text-red-600 not-italic">— Marcus Vance, Black Belt</cite>
      </div>
    </div>
  );
};

export default Classes;
