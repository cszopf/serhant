
import React, { useRef, useEffect } from 'react';
import { BrandConfig, AgentInfo } from '../types';
import { LOGO_URL } from '../constants';

interface LayoutProps {
  brand: BrandConfig;
  agent: AgentInfo;
  children: React.ReactNode;
  propertyAddress: string;
}

const Layout: React.FC<LayoutProps> = ({ brand, agent, children, propertyAddress }) => {
  const scrollContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [children]);

  const primaryPhone = agent.phone.split('|')[0].trim();

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden h-screen fixed inset-0">
      <aside 
        className="w-full md:w-80 bg-white md:bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col p-5 md:p-10 md:sticky md:top-0 h-auto md:h-screen overflow-y-auto shrink-0 z-20"
      >
        <div className="md:mb-16 mb-0 flex md:flex-col justify-between items-center md:items-start">
          <div className="flex flex-col">
            <img 
              src={LOGO_URL} 
              alt={brand.logoName} 
              className="h-6 md:h-10 w-auto object-contain mb-1"
            />
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
              SERHANT.title powered by smart
            </p>
          </div>
          
          <div className="md:mt-6 text-right md:text-left">
            <p className="text-[11px] md:text-sm font-black text-slate-900 flex items-center gap-2 justify-end md:justify-start tracking-tighter">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="truncate max-w-[150px] md:max-w-none uppercase font-bold">{propertyAddress}</span>
            </p>
          </div>
        </div>

        <div className="mt-auto hidden md:block">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-100 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-black transition-all group-hover:w-full group-hover:opacity-5"></div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-400 mb-6">Your Real Estate Agent</h3>
            <div className="flex items-center gap-5 mb-8">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="w-16 h-16 rounded-[1.25rem] object-cover border-2 border-slate-100 shadow-lg transition-all" 
              />
              <div>
                <p className="font-black text-slate-900 text-lg leading-none tracking-tight">{agent.name}</p>
                <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{agent.brokerage}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 relative z-10">
              <div className="flex gap-2">
                <button 
                  className="flex-1 py-3 text-[10px] font-black rounded-xl border border-slate-200 uppercase tracking-widest transition-all hover:bg-slate-50 text-black"
                  onClick={() => window.location.href = `tel:${primaryPhone}`}
                >
                  CALL
                </button>
                <button 
                  className="flex-1 py-3 text-[10px] font-black rounded-xl text-white uppercase tracking-widest transition-all shadow-md active:scale-95 bg-black"
                  onClick={() => window.location.href = `mailto:${agent.email}`}
                >
                  SMS
                </button>
              </div>
              <p className="text-[8px] font-bold text-slate-400 text-center uppercase tracking-widest mt-1">
                {agent.phone}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth relative h-full bg-white flex flex-col"
      >
        <div className="max-w-6xl mx-auto w-full p-6 md:p-16 lg:p-24 pb-40 md:pb-32 flex-1">
          {children}
        </div>
      </main>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 flex items-center justify-between z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl bg-white/90">
         <div className="flex items-center gap-4">
            <img src={agent.image} className="w-12 h-12 rounded-2xl border border-slate-100 shadow-md object-cover" alt={agent.name} />
            <div className="flex flex-col text-left">
              <p className="font-black text-slate-900 text-sm uppercase tracking-tighter">{agent.name}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SERHANT Real Estate Agent</p>
            </div>
         </div>
         <div className="flex gap-3">
           <button 
              className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 active:scale-95"
              onClick={() => window.location.href = `tel:${primaryPhone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
           <button 
              className="px-6 py-3 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 bg-black"
            >
              SMS
            </button>
         </div>
      </div>
    </div>
  );
};

export default Layout;
