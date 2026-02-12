
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: 'General Inquiry',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // Simulate API call
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-red-600 font-oswald uppercase tracking-[0.2em] mb-4">Get In Touch</h2>
          <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase tracking-tighter mb-8">Enter the <span className="text-red-600">Dojo</span></h1>
          <p className="text-neutral-500 text-lg leading-relaxed mb-12">
            Ready to start your transformation? Have questions about our training philosophy or scheduling? Send us a message and a Sensei will get back to you within 24 hours.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
               <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-600 text-xl flex-shrink-0">📍</div>
               <div>
                 <h4 className="font-oswald uppercase tracking-widest text-white mb-1">Our Location</h4>
                 <p className="text-neutral-500">123 Warrior Path, Zen District, CA 90210</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-600 text-xl flex-shrink-0">📧</div>
               <div>
                 <h4 className="font-oswald uppercase tracking-widest text-white mb-1">Email Us</h4>
                 <p className="text-neutral-500">oss@ironspiritdojo.com</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-600 text-xl flex-shrink-0">📞</div>
               <div>
                 <h4 className="font-oswald uppercase tracking-widest text-white mb-1">Call Sensei</h4>
                 <p className="text-neutral-500">+1 (555) SPIRIT-0</p>
               </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900/50 p-8 md:p-12 border border-neutral-800 rounded-sm">
          {isSent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in zoom-in duration-300">
               <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-4xl mb-6">🙏</div>
               <h3 className="text-3xl font-oswald uppercase mb-4">Message Received</h3>
               <p className="text-neutral-500">Respect, student. We will review your inquiry and reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">Interested Program</label>
                <select 
                  className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                  value={formData.program}
                  onChange={(e) => setFormData({...formData, program: e.target.value})}
                >
                  <option>General Inquiry</option>
                  <option>White Belt Foundation</option>
                  <option>Bushido Masterclass</option>
                  <option>Private Session</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-bold">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 font-oswald uppercase tracking-widest text-lg transition-all active:scale-95 shadow-lg shadow-red-600/10"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
