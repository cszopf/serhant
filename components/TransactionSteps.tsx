
import React, { useState } from 'react';
import { TransactionStep, BrandConfig, Document, TitleIssue, ExperienceLevel } from '../types';
import { REAL_PROPERTY_MOCK, PREFERRED_LENDERS } from '../constants';

interface StepProps {
  step: TransactionStep;
  brand: BrandConfig;
  onNext: () => void;
  onBack?: () => void;
  experienceLevel?: ExperienceLevel;
  optInInsurance?: boolean;
  setOptInInsurance?: (val: boolean) => void;
  optInMortgage?: boolean;
  setOptInMortgage?: (val: boolean) => void;
}

const ExpectationBox: React.FC<{ title: string; description: string; estTime: string; brand: BrandConfig; experienceLevel?: ExperienceLevel }> = ({ title, description, estTime, brand, experienceLevel = 'standard' }) => {
  if (experienceLevel === 'simple') return null;

  return (
    <div className="mt-12 p-8 bg-slate-50 border-l-4 border-black rounded-r-[2rem] shadow-sm animate-in fade-in slide-in-from-left-4 duration-1000">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">SERHANT Intelligence Insight</h4>
        <span className="text-[10px] font-black uppercase tracking-tighter bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-900 shadow-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
          Est. Phase: {estTime}
        </span>
      </div>
      <p className="font-bold text-slate-900 text-lg mb-2 uppercase tracking-tighter">{title}</p>
      {experienceLevel === 'complete' && (
        <p className="text-sm text-slate-600 leading-relaxed italic font-medium">{description}</p>
      )}
    </div>
  );
};

const StepHeader: React.FC<{ title: string; subtitle: string; brand: BrandConfig; stepNum: number }> = ({ title, subtitle, brand, stepNum }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[11px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full text-white bg-black">Phase {stepNum} of 9</span>
      <div className="h-px flex-1 bg-slate-100"></div>
    </div>
    <h2 className="font-header uppercase-tracking-150 text-4xl md:text-6xl mb-4 leading-tight font-black" style={{ color: brand.primaryColor }}>
      {title}
    </h2>
    <p className="font-subheader text-slate-500 text-xl leading-relaxed max-w-2xl">
      {subtitle}
    </p>
  </div>
);

const Button: React.FC<{ label: string; onClick: () => void; primary?: boolean; brand: BrandConfig; className?: string }> = ({ label, onClick, primary, brand, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-10 py-5 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase transition-all shadow-xl active:scale-95 ${className} ${primary ? 'bg-black text-white hover:bg-slate-800' : 'bg-white text-black border-2 border-slate-100 hover:border-slate-300'}`}
  >
    {label}
  </button>
);

const NavActions: React.FC<{ onNext: () => void; onBack?: () => void; brand: BrandConfig; nextLabel?: string; showBack?: boolean }> = ({ onNext, onBack, brand, nextLabel = "Continue", showBack = true }) => (
  <div className="flex flex-wrap gap-4 mt-12 pb-12">
    {showBack && onBack && (
      <Button label="Back" onClick={onBack} brand={brand} />
    )}
    <Button label={nextLabel} onClick={onNext} primary brand={brand} />
  </div>
);

export const TransactionContent: React.FC<StepProps> = ({ 
  step, brand, onNext, onBack, experienceLevel = 'standard',
  optInInsurance, setOptInInsurance 
}) => {
  const [financingPath, setFinancingPath] = useState<'choose' | 'existing' | 'shop' | 'new' | 'cash'>('choose');

  switch (step) {
    case TransactionStep.STARTED:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={1}
            title="Transaction Initiated" 
            subtitle={`SERHANT.title has opened File #${REAL_PROPERTY_MOCK.parcelId} for your acquisition of ${REAL_PROPERTY_MOCK.address}.`} 
            brand={brand} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Contract Price</p>
              <p className="font-black text-slate-900 text-3xl tracking-tighter">${REAL_PROPERTY_MOCK.salePrice.toLocaleString()}</p>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <p className="font-black text-blue-600 text-3xl tracking-tighter uppercase">Filing Open</p>
            </div>
          </div>
          <ExpectationBox 
            title="Legal Compliance Mapping" 
            estTime="24 Hours" 
            experienceLevel={experienceLevel}
            description="Our specialized Florida compliance team is auditing the purchase contract for statutory compliance and recording requirements."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} showBack={false} nextLabel="Acknowledge & Continue" />
        </div>
      );

    case TransactionStep.FINANCING:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={2}
            title="Capital Coordination" 
            subtitle="Confirm your lending path or leverage SERHANT Preferred Partners." 
            brand={brand} 
          />
          
          {financingPath === 'choose' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <PathCard title="Existing Lender" subtitle="Continue with contract lender" icon="🏦" onClick={() => setFinancingPath('existing')} />
              <PathCard title="SERHANT Partners" subtitle="Review luxury rate options" icon="📊" onClick={() => setFinancingPath('shop')} />
              <PathCard title="Update Approval" subtitle="Switch pre-approval docs" icon="📝" onClick={() => setFinancingPath('new')} />
              <PathCard title="Cash Purchase" subtitle="No financing required" icon="💰" onClick={() => setFinancingPath('cash')} />
            </div>
          )}

          {financingPath === 'cash' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-white border-2 border-slate-100 p-10 rounded-[3rem] shadow-sm">
                 <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] border-b border-slate-50 pb-4">Cash Acquisition Verified</h4>
                 <p className="text-slate-600 text-lg font-medium leading-relaxed mt-4">This file is classified as a Cash Purchase. We will proceed without lender directives.</p>
              </div>
              <NavActions onNext={onNext} onBack={() => setFinancingPath('choose')} brand={brand} />
            </div>
          )}

          {financingPath !== 'choose' && financingPath !== 'cash' && (
             <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-white border-2 border-slate-100 p-10 rounded-[3rem] shadow-sm">
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Lender Verification In Progress</h4>
                   <p className="text-slate-600">Our team is coordinating with {financingPath === 'shop' ? 'SERHANT Partners' : REAL_PROPERTY_MOCK.lender} for loan instructions.</p>
                </div>
                <NavActions onNext={onNext} onBack={() => setFinancingPath('choose')} brand={brand} />
             </div>
          )}

          <ExpectationBox 
            title="Institutional Coordination" 
            estTime="Continuous" 
            experienceLevel={experienceLevel}
            description="We coordinate directly with your financial steward. All closing instructions are mapped to the digital ledger."
            brand={brand}
          />
          {financingPath === 'choose' && <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Choose Path First" />}
        </div>
      );

    case TransactionStep.IDENTITY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={3}
            title="Biometric Verification" 
            subtitle={`Government-grade identity verification required for ${REAL_PROPERTY_MOCK.buyerName}.`} 
            brand={brand} 
          />
          <div className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem] mb-12 flex items-center gap-8 shadow-inner text-black">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
              </div>
              <p className="text-lg font-bold">Secure identity matching initiated. Please have your ID ready.</p>
          </div>
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Start Secure Scan" />
        </div>
      );

    case TransactionStep.DOCUMENTS:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={4}
            title="Vault Collection" 
            subtitle="Secure access to your transaction package. Please review and complete missing items." 
            brand={brand} 
          />
          <div className="space-y-6 mb-12">
            {[
              { name: "Purchase Agreement", status: "Verified", color: "text-green-600" },
              { name: "Title Commitment", status: "Ready for Review", color: "text-blue-600" },
              { name: "Buyer Info Sheet", status: "Action Needed", color: "text-red-600" },
              { name: "Homeowners Insurance", status: "Pending", color: "text-slate-400" },
            ].map((doc, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="p-6 bg-white border border-slate-100 rounded-2xl flex justify-between items-center shadow-sm">
                   <span className="font-black text-slate-900 uppercase tracking-tighter">{doc.name}</span>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${doc.color}`}>{doc.status}</span>
                </div>
                {doc.name === "Homeowners Insurance" && (
                  <div className="ml-4 p-4 bg-pink-50 border border-pink-100 rounded-2xl flex items-center justify-between animate-in slide-in-from-left-4 duration-1000">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-pink-500 font-black text-xs">L</span>
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">Need Insurance?</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Instant quotes for SERHANT clients</p>
                      </div>
                    </div>
                    <button 
                      className="px-6 py-2 bg-pink-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-pink-600 transition-all active:scale-95 shadow-md shadow-pink-200/50"
                      onClick={() => window.open('https://lemonade.com', '_blank')}
                    >
                      Get a Free Quote from Lemonade
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.SEARCH:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={5}
            title="Title Examination" 
            subtitle="Our examiners are verifying a clear path to ownership across Florida land records." 
            brand={brand} 
          />
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <p className="text-sm font-bold text-slate-900">Miami-Dade County Records: Scanned</p>
             </div>
             <p className="text-xs text-slate-500 italic">"Examiner Status: Zero active encumbrances identified. Preliminary clear found."</p>
          </div>
          <ExpectationBox 
            title="Smart Spaces Automation" 
            estTime="Instant" 
            experienceLevel={experienceLevel}
            description="Our AI-powered engine is cross-referencing public records with private ledgers to identify chain-of-title anomalies."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.CLEARING:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={6}
            title="Curative Phase" 
            subtitle="Finalizing payoff and municipal tax certificates to ensure a clean transfer." 
            brand={brand} 
          />
          <div className="p-8 bg-white border-2 border-slate-100 rounded-[3rem] shadow-sm">
             <div className="flex justify-between items-center py-4 border-b border-slate-50">
                <span className="text-sm font-bold text-slate-900">Municipal Lien Search</span>
                <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-3 py-1 rounded-full">Cleared</span>
             </div>
             <div className="flex justify-between items-center py-4">
                <span className="text-sm font-bold text-slate-900">Tax Certification</span>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Finalizing</span>
             </div>
             <div className="flex justify-between items-center py-4 border-t border-slate-50">
                <span className="text-sm font-bold text-slate-900">HOA Estoppel</span>
                <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-3 py-1 rounded-full">Verified</span>
             </div>
          </div>
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.SCHEDULE:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={7}
            title="Signing Coordinator" 
            subtitle={`Target Closing Date: ${REAL_PROPERTY_MOCK.closingDate}. Choose your signing experience.`} 
            brand={brand} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-8 border-2 border-black bg-white rounded-[2.5rem] shadow-xl group cursor-pointer">
               <div className="text-3xl mb-4">📍</div>
               <p className="font-black text-slate-900 uppercase tracking-tighter">Luxury In-Office</p>
               <p className="text-xs text-slate-500 mt-1">Brickell Office or Private Client Lounge.</p>
            </div>
            <div className="p-8 border-2 border-slate-100 bg-slate-50 opacity-60 rounded-[2.5rem] cursor-not-allowed">
               <div className="text-3xl mb-4 grayscale">💻</div>
               <p className="font-black text-slate-400 uppercase tracking-tighter">Remote Online (RON)</p>
               <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-2 bg-slate-200 px-2 py-1 rounded inline-block">Lender Restrictive</p>
            </div>
          </div>
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Schedule Time" />
        </div>
      );

    case TransactionStep.SUMMARY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-8 border-black pb-8 gap-6">
             <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Institutional Review</h3>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">Closing Disclosure</h2>
             </div>
             <div className="md:text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Authenticated Reference</p>
                <p className="text-lg font-black text-slate-900">{REAL_PROPERTY_MOCK.parcelId}</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="space-y-6">
               <p className="text-[11px] font-black uppercase text-slate-400 border-b-2 border-slate-50 pb-2 tracking-widest">Acquisition Summary</p>
               <div className="space-y-6">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Sale Price</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">${REAL_PROPERTY_MOCK.salePrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Loan Principal</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">${REAL_PROPERTY_MOCK.loanAmount.toLocaleString()}</p>
                  </div>
               </div>
            </div>
            <div className="md:col-span-2">
               <p className="text-[11px] font-black uppercase text-slate-400 border-b-2 border-slate-50 pb-2 tracking-widest">Monthly Commitment Analysis</p>
               <div className="bg-slate-50 p-8 rounded-[3rem] flex justify-between items-center border-2 border-slate-100 shadow-inner mt-4">
                  <div>
                    <p className="text-xs text-slate-500 font-black uppercase tracking-tighter mb-1">P&I Payment</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">$10,937.42 <span className="text-sm font-bold text-slate-400">/mo</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-black uppercase tracking-tighter mb-1">Escrow Projection</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">$2,150.00 <span className="text-sm font-bold text-slate-400">/mo</span></p>
                  </div>
               </div>
            </div>
          </div>

          {/* Secure Wire Instructions Section */}
          <div className="mb-16 bg-blue-50 border-2 border-blue-200 p-8 md:p-12 rounded-[3rem] relative overflow-hidden group">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                   </svg>
                </div>
                <div>
                   <h3 className="text-lg font-black text-blue-900 uppercase tracking-tighter">Secure Wire Instructions</h3>
                   <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">End-to-End Encrypted Verification</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Bank Information</p>
                   <div className="space-y-2">
                      <p className="text-sm font-bold text-slate-900">CITIBANK, N.A. (PRIVATE WEALTH)</p>
                      <p className="text-xs text-slate-500">Beneficiary: SERHANT.title Escrow, LLC</p>
                      <p className="text-xs font-mono bg-white p-2 rounded border border-blue-100 select-all">ACCOUNT: ********4829</p>
                      <p className="text-xs font-mono bg-white p-2 rounded border border-blue-100 select-all">ROUTING: 021000089</p>
                   </div>
                </div>
                <div className="bg-white/50 p-6 rounded-2xl border border-blue-100">
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Fraud Protection Protocol</p>
                   <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                      "SERHANT.title will NEVER change wire instructions via email. Always call our office at (561) 555-0100 to verify before initiating any transfer."
                   </p>
                   <div className="mt-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Identity Match: VERIFIED</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white border-4 border-black rounded-[4rem] overflow-hidden shadow-2xl mb-16">
             <div className="bg-black p-8 text-white flex justify-between items-center">
               <span className="text-xs font-black uppercase tracking-[0.3em]">Capital Distribution at Closing</span>
               <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Final Audit Verified</span>
             </div>
             <div className="p-10 md:p-16">
                <div className="flex flex-col gap-12 mb-16 border-b-2 border-slate-50 pb-12">
                   <div>
                      <h4 className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-2">Total Acquisition Costs</h4>
                      <p className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">${(48755.91).toLocaleString()}</p>
                   </div>
                   <div>
                      <h4 className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-2">Funds to Close</h4>
                      <p className="text-5xl md:text-7xl font-black text-blue-600 tracking-tighter leading-none">${(687578.04).toLocaleString()}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100">
                      <p className="text-[11px] font-black uppercase text-slate-900 tracking-widest mb-6">Service & Loan Directives</p>
                      <div className="space-y-4">
                         <SummaryRow label="Origination Charges" value="$12,500.00" />
                         <SummaryRow label="Institutional Services" value="$2,402.00" />
                      </div>
                   </div>
                   <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100">
                      <p className="text-[11px] font-black uppercase text-slate-900 tracking-widest mb-6">Escrows & Statutories</p>
                      <div className="space-y-4">
                         <SummaryRow label="Taxes & Gov Recording" value="$1,262.50" />
                         <SummaryRow label="Initial Escrow Deposit" value="$25,084.80" />
                         <SummaryRow label="Adjustment Credit" value="-$1,494.13" highlight />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-16">
             <Button label="Print Archive PDF" onClick={() => window.print()} brand={brand} />
             <Button label="Execute Final Signing" onClick={onNext} primary brand={brand} className="px-16" />
          </div>
        </div>
      );

    case TransactionStep.CLOSED:
      return (
        <div className="animate-in fade-in duration-1000 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <div className="relative mb-16">
               <div className="absolute inset-0 bg-blue-100 rounded-full scale-[2] blur-[120px] opacity-40 animate-pulse"></div>
               <div className="relative z-10 w-32 md:w-48 h-32 md:h-48 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-black group overflow-hidden">
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24 text-black group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
               </div>
            </div>

            <div className="space-y-8 max-w-3xl">
              <h2 className="font-header text-5xl md:text-8xl tracking-tighter text-slate-900 leading-none font-black">
                Verification Complete.
              </h2>
              <p className="text-xl md:text-3xl text-slate-500 font-medium leading-tight px-4 italic">
                “Closing, simplified.”
              </p>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                Ownership of <span className="text-black font-black">{REAL_PROPERTY_MOCK.address}</span> is now legally recorded. Your 90-day comprehensive protection period has begun.
              </p>
            </div>

            <div className="mt-20 flex flex-col items-center gap-6">
               <button 
                  onClick={onNext}
                  className="px-16 py-6 bg-black text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-black/30 active:scale-95 transition-all hover:bg-slate-800"
               >
                  Enter Owner ONE Dashboard
               </button>
               <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.4em]">
                 90-Day Free Real Estate Advisory Access
               </p>
            </div>
        </div>
      );

    default:
      return null;
  }
};

const PathCard = ({ title, subtitle, icon, onClick }: { title: string, subtitle: string, icon: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] text-left hover:border-black hover:shadow-2xl transition-all active:scale-[0.98] group"
  >
    <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
    <p className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tighter uppercase leading-none">{title}</p>
    <p className="text-xs text-slate-500 font-bold leading-snug uppercase tracking-tighter">{subtitle}</p>
  </button>
);

const SummaryRow = ({ label, value, bold, highlight }: { label: string, value: string, bold?: boolean, highlight?: boolean }) => (
  <div className="flex justify-between items-center text-sm">
     <span className={`text-slate-500 font-medium ${bold ? 'font-black text-slate-900' : ''}`}>{label}</span>
     <span className={`font-black ${highlight ? 'text-blue-600' : 'text-slate-900'} ${bold ? 'text-lg' : ''}`}>{value}</span>
  </div>
);
