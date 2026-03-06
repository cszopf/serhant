
import React, { useState } from 'react';
import { BrandConfig, TransactionStep } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface AgentTransparencyViewProps {
  brand: BrandConfig;
  currentStep: TransactionStep;
}

const AgentTransparencyView: React.FC<AgentTransparencyViewProps> = ({ brand, currentStep }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Milestones as per spec
  const milestones = [
    { id: 1, label: "Contract Received", responsible: "Agent", status: currentStep >= 1 ? 'complete' : 'pending', time: "Feb 14, 8:00 AM" },
    { id: 2, label: "Lender Confirmed", responsible: "Buyer", status: currentStep > 2 ? 'complete' : currentStep === 2 ? 'active' : 'pending', time: "Feb 14, 8:45 AM" },
    { id: 3, label: "Identity Verified", responsible: "Buyer", status: currentStep > 3 ? 'complete' : currentStep === 3 ? 'active' : 'pending', time: "Feb 14, 9:42 AM" },
    { id: 4, label: "Title Search Ordered", responsible: "Title", status: currentStep >= 5 ? 'complete' : currentStep === 4 ? 'active' : 'pending', time: "Feb 15, 10:00 AM" },
    { id: 5, label: "Earnest Money Received", responsible: "Buyer", status: currentStep >= 4 ? 'complete' : 'waiting', note: "Awaiting Bank Verification" },
    { id: 6, label: "Loan Status: Approved", responsible: "Lender", status: currentStep >= 8 ? 'complete' : currentStep >= 2 ? 'active' : 'pending' },
    { id: 7, label: "Closing Scheduled", responsible: "Title", status: currentStep >= 7 ? 'complete' : 'pending' },
    { id: 8, label: "Closing Complete", responsible: "Title", status: currentStep >= 9 ? 'complete' : 'pending' },
  ];

  const activityLog = [
    { event: "Lender order received & verified", time: "Feb 19, 11:20 AM", role: "Lender" },
    { event: "Title commitment issued", time: "Feb 18, 4:33 PM", role: "Title" },
    { event: "Earnest money initiated", time: "Feb 15, 2:10 PM", role: "Buyer" },
    { event: "Buyer completed identity verification", time: "Feb 14, 9:42 AM", role: "Buyer" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500';
      case 'active': return 'bg-blue-600';
      case 'waiting': return 'bg-yellow-500';
      default: return 'bg-slate-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'waiting': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-400';
    }
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-24">
      
      {/* 2.1 Header Section - Institutional Tone */}
      <div className="border-b border-slate-100 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
             <div className="px-3 py-1 bg-slate-900 text-white rounded text-[9px] font-black uppercase tracking-widest">
                Buyer Agent Transparency View
             </div>
             <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 border-2 border-white rounded-full"></span>
             </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{REAL_PROPERTY_MOCK.buyerName}</h2>
          <p className="text-slate-500 font-medium">{REAL_PROPERTY_MOCK.address}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
           <HeaderCard label="Contract Date" value="Feb 12, 2025" />
           <HeaderCard label="Est. Closing" value={REAL_PROPERTY_MOCK.closingDate} highlight />
           <HeaderCard label="Escrow Officer" value="Sarah Jenkins" />
           <HeaderCard label="Smart Concierge" value="Active" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* 2.2 Smart Progress Timeline */}
        <div className="lg:col-span-8">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-l-2 pl-4 border-slate-900">Smart Progress Timeline</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Real-Time Sync: Active</p>
           </div>
           
           <div className="relative pl-6 space-y-6">
              <div className="absolute left-[8px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
              {milestones.map((m) => (
                <div key={m.id} className="relative flex items-start gap-6 group">
                   <div className={`absolute -left-6 w-4 h-4 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-colors mt-1.5
                     ${getStatusColor(m.status)}`}>
                   </div>
                   <div className={`flex-1 p-5 rounded-2xl border transition-all ${m.status === 'active' ? 'bg-blue-50/20 border-blue-200' : 'bg-white border-slate-100'}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                         <div>
                            <p className={`text-sm font-bold ${m.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{m.label}</p>
                            <div className="flex items-center gap-3 mt-1">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">RESPONSIBLE: {m.responsible}</p>
                               {m.time && <p className="text-[10px] font-mono text-slate-400">{m.time}</p>}
                            </div>
                         </div>
                         <div className="flex items-center gap-2">
                            {m.note && <span className="text-[9px] italic text-slate-400 mr-2">{m.note}</span>}
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${getStatusBadge(m.status)}`}>
                               {m.status.replace('-', ' ')}
                            </span>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 2.3 & 3: Activity & Financial Events */}
        <div className="lg:col-span-4 space-y-10">
           
           {/* 3. Financial Event Notifications (Critical) */}
           <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-l-2 pl-4 border-slate-900">Financial Event Monitor</h3>
              <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
                 <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live Funding Status</p>
                    <FinancialRow label="Earnest Money" status="Cleared" timestamp="Feb 15, 2:10 PM" />
                    <FinancialRow label="Lender Order" status="Cleared" timestamp="Feb 19, 11:20 AM" />
                    <FinancialRow label="Closing Wire" status="Scheduled" />
                 </div>
                 <div className="p-4 bg-blue-50/20 text-center">
                    <p className="text-[9px] text-blue-600 font-bold italic">Financial amounts and account details are masked for buyer privacy.</p>
                 </div>
              </div>
           </section>

           {/* 2.3 Real-Time Activity Feed */}
           <section>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 border-l-2 pl-4 border-slate-900">Activity Journal</h3>
              <div className="space-y-4">
                 {activityLog.map((log, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                       <div>
                          <p className="text-xs font-bold text-slate-900 leading-tight">{log.event}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{log.role}</span>
                             <span className="text-[9px] font-mono text-slate-300">•</span>
                             <span className="text-[9px] font-mono text-slate-400">{log.time}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           {/* 4. UX Requirements: Primary CTA Buttons */}
           <section className="pt-6 border-t border-slate-100">
              <div className="space-y-3">
                 <ActionButton label="Message Title Team" primary />
                 <ActionButton label="Message Buyer" />
                 <ActionButton label="Download Commitment" />
                 <ActionButton label="View Closing Details" />
              </div>
              <p className="mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center leading-relaxed">
                 READ-ONLY ACCESS<br/>
                 Audit Logging Enabled: {new Date().toLocaleDateString()}
              </p>
           </section>

        </div>
      </div>
    </div>
  );
};

// Helper Components

const HeaderCard = ({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) => (
  <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-xs font-bold ${highlight ? 'text-blue-600' : 'text-slate-900'}`}>{value}</p>
  </div>
);

const FinancialRow = ({ label, status, timestamp }: { label: string, status: string, timestamp?: string }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
     <div>
        <p className="text-xs font-bold text-slate-900">{label}</p>
        {timestamp && <p className="text-[8px] text-slate-400 font-mono mt-0.5">{timestamp}</p>}
     </div>
     <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
       status === 'Cleared' ? 'bg-green-100 text-green-700' : 
       status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
       'bg-slate-100 text-slate-400'
     }`}>
        {status}
     </span>
  </div>
);

const ActionButton = ({ label, primary }: { label: string, primary?: boolean }) => (
  <button className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-sm
    ${primary ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50'}`}>
    {label}
  </button>
);

export default AgentTransparencyView;
