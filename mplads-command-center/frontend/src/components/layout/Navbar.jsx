import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { FINANCIAL_YEARS } from '../../constants/financialYears';
import { Calendar, User, LogOut, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { currentMP, availableMPs, switchMP, logout } = useAuth();
  const { financialYear, setFinancialYear } = useUser();

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Active MP Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
          {currentMP?.avatar ? (
            <img src={currentMP.avatar} alt={currentMP.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-slate-400" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100">{currentMP?.name || 'Demo Member of Parliament'}</h2>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
              Lok Sabha
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Constituency: <span className="text-slate-200 font-medium">{currentMP?.constituency}, {currentMP?.state}</span>
          </p>
        </div>
      </div>

      {/* Global Controls: Financial Year & MP Switcher */}
      <div className="flex items-center gap-4">
        {/* Financial Year Selector */}
        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-1.5">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-medium text-slate-400">FY:</span>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer"
          >
            {FINANCIAL_YEARS.map((fy) => (
              <option key={fy} value={fy} className="bg-slate-900 text-slate-100">
                {fy}
              </option>
            ))}
          </select>
        </div>

        {/* Demo MP Switcher Dropdown */}
        <div className="flex items-center gap-2 bg-indigo-950/40 border border-indigo-500/30 rounded-lg px-3 py-1.5">
          <span className="text-xs font-medium text-indigo-300">Switch MP:</span>
          <select
            value={currentMP?.id || 'MP001'}
            onChange={(e) => switchMP(e.target.value)}
            className="bg-transparent text-xs font-bold text-indigo-200 focus:outline-none cursor-pointer"
          >
            {availableMPs.map((mp) => (
              <option key={mp.id} value={mp.id} className="bg-slate-900 text-slate-100">
                {mp.name} ({mp.constituency})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-indigo-400 pointer-events-none" />
        </div>

        {/* Logout Action */}
        <button
          onClick={logout}
          title="Logout Demo Session"
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
