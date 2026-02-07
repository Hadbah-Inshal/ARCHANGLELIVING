
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">漢</span>
            </div>
            <span className="font-oswald text-xl font-bold tracking-tighter uppercase">
              ARCHANGEL<span className="text-red-600">LIVING</span>
            </span>
          </div>
          <p className="text-neutral-500 max-w-sm">
            Forging strength, discipline, and character since 2005. Join the elite community of martial artists dedicated to mastery.
          </p>
        </div>
        
        <div>
          <h4 className="font-oswald uppercase text-white mb-6 tracking-widest">Dojo Location</h4>
          <p className="text-neutral-500 leading-relaxed">
            123 Warrior Path<br />
            Zen District, CA 90210<br />
            United States
          </p>
        </div>

        <div>
          <h4 className="font-oswald uppercase text-white mb-6 tracking-widest">Connect</h4>
          <div className="flex flex-col gap-4 text-neutral-500">
            <a href="#" className="hover:text-red-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-red-500 transition-colors">YouTube</a>
            <a href="#" className="hover:text-red-500 transition-colors">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-900 text-center text-neutral-600 text-sm">
        &copy; {new Date().getFullYear()} ARCHANGELLIVING. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
