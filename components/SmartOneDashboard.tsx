
import React, { useState, useEffect } from 'react';
import { BrandConfig, AgentInfo } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface DashboardProps {
  brand: BrandConfig;
  agent: AgentInfo;
  daysRemaining: number;
}

const SmartOneDashboard: React.FC<DashboardProps> = ({ brand, agent, daysRemaining }) => {
  const [lastScan, setLastScan] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setLastScan(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} PM Today`);
  }, []);

  const protectionColorClass = daysRemaining <= 15 ? 'text-red-600' : 'text-black';
  const protectionStatusLabel = daysRemaining <= 15 ? 'Action Required: Renew Compliance Protection' : '90-Day Comprehensive Compliance Check';

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-32">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-slate-50 pb-12 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black text-xs tracking-tighter">S1</div>
             <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">SERHANT.title Real Estate Advisory</p>
          </div>
          <h2 className="font-header text-5xl text-slate-900 tracking-tighter mb-2 font-black leading-none">
            {REAL_PROPERTY_MOCK.address}
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <p className="text-lg font-bold text-slate-500">90-Day Smart ONE Compliance Monitoring</p>
          </div>
        </div>
        
        <div className="bg-white px-8 py-6 rounded-[2.5rem] border-2 border-slate-100 flex items-center gap-8 shadow-xl min-w-[320px]">
           <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{protectionStatusLabel}</p>
              <p className={`text-3xl font-black leading-none tracking-tighter ${protectionColorClass}`}>{daysRemaining} Days Left</p>
           </div>
           <div className="w-16 h-16 rounded-full border-4 border-slate-50 flex items-center justify-center relative bg-white">
              <svg className={`absolute inset-0 w-full h-full -rotate-90 ${daysRemaining <= 15 ? 'text-red-500' : 'text-black'}`} viewBox="0 0 36 36">
                <path
                  className="stroke-current"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(daysRemaining / 90) * 100}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="text-xs font-black text-slate-900 z-10">{Math.round((daysRemaining / 90) * 100)}%</span>
           </div>
        </div>
      </div>

      <section className="bg-white border-4 border-slate-100 rounded-[4rem] overflow-hidden shadow-2xl">
         <div className="p-10 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-50 pb-12 lg:pb-0 lg:pr-12">
               <div className="w-20 h-20 bg-black rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
               </div>
               <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Compliance Guard™</h3>
               <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium italic">Continuous real-time audit of post-closing land records and municipal filings.</p>
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">90-Day Status</span>
                     <span className="font-black text-blue-600 uppercase tracking-widest text-sm">Active Monitoring</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Integrity Check</span>
                     <span className="font-black text-slate-900 uppercase tracking-widest text-sm">Ledger Match</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Compliance Risks</span>
                     <span className="font-black text-slate-900 uppercase tracking-widest text-sm">0 Found</span>
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-7">
               <div className="flex items-center justify-between mb-10">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900">Security Node Activity</h4>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">SYNCHRONIZED: {lastScan}</p>
               </div>
               <div className="space-y-8">
                  <ActivityLine title="Deed Integrity Scan" desc="Post-closing verification of recording Volume 3182. Chain verified." time="16:04" active />
                  <ActivityLine title="Tax Ledger Verification" desc="Verified post-sale tax adjustments and certificates." time="11:20" />
                  <ActivityLine title="Lien Sweep" desc="90-day comprehensive sweep of municipal records for new encumbrances." time="09:45" />
               </div>
            </div>
         </div>
      </section>

      <section className="bg-black rounded-[4rem] p-12 md:p-20 text-white overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
         <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
               <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-300">SERHANT Private Capital Access</p>
            </div>
            <h3 className="text-5xl md:text-7xl font-header tracking-tighter mb-8 leading-none font-black">
              Equity Accelerator
            </h3>
            <p className="text-slate-400 text-xl md:text-2xl mb-12 leading-relaxed font-medium">
              Your verified ownership position qualifies for institutional liquidity up to <span className="text-white font-black underline decoration-blue-500 decoration-4">$150,000</span> for improvements.
            </p>
            <div className="flex flex-wrap gap-8 items-center">
               <button className="px-12 py-6 bg-white text-black rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all active:scale-95 hover:bg-slate-100">
                  View Capital Options
               </button>
               <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest max-w-[200px]">Institutional Underwriting Powered by SERHANT.ventures</p>
            </div>
         </div>
      </section>

    </div>
  );
};

const ActivityLine = ({ title, desc, time, active }: { title: string, desc: string, time: string, active?: boolean }) => (
  <div className="flex gap-8 items-start pb-8 border-b border-slate-50 last:border-0 last:pb-0">
     <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${active ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]' : 'bg-slate-200'}`}></div>
     <div className="flex-1">
        <p className="text-base font-black text-slate-900 tracking-tight">{title}</p>
        <p className="text-sm text-slate-500 mt-2 font-medium italic">{desc}</p>
     </div>
     <span className="text-[10px] font-mono text-slate-400 font-black">{time}</span>
  </div>
);

export default SmartOneDashboard;
