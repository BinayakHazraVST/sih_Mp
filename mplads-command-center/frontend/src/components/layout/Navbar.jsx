import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { FINANCIAL_YEARS } from '../../constants/financialYears';
import { Calendar, User, LogOut, ChevronDown, Menu } from 'lucide-react';

export const Navbar = ({ onHamburgerClick }) => {
  const { currentMP, availableMPs, switchMP, logout } = useAuth();
  const { financialYear, setFinancialYear } = useUser();

  return (
    <header className="h-auto min-h-14 md:h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 sticky top-0 z-30 shadow-xs">
      {/* Single row on md+; two rows on mobile */}
      <div className="flex items-center justify-between gap-2 h-14 md:h-16">

        {/* LEFT — Hamburger (mobile only) + MP Profile */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Hamburger: visible < md */}
          <button
            onClick={onHamburgerClick}
            className="md:hidden p-2 -ml-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition shrink-0"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* MP Avatar */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
            {currentMP?.avatar ? (
              <img src={currentMP.avatar} alt={currentMP.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
            )}
          </div>

          {/* MP Name & Constituency */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-sm font-bold text-slate-900 truncate max-w-[140px] sm:max-w-none">
                {currentMP?.name || 'Demo Member of Parliament'}
              </h2>
              <span className="hidden sm:inline px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full shrink-0">
                Lok Sabha
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block truncate">
              Constituency: <span className="text-slate-700 font-semibold">{currentMP?.constituency}, {currentMP?.state}</span>
            </p>
          </div>
        </div>

        {/* RIGHT — Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Financial Year Selector — hidden on xs, shown from sm */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-xs">
            <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-500 hidden md:inline">FY:</span>
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {FINANCIAL_YEARS.map((fy) => (
                <option key={fy} value={fy} className="bg-white text-slate-900">
                  {fy}
                </option>
              ))}
            </select>
          </div>

          {/* Demo MP Switcher — hidden on xs, shown from sm */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-xs">
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
              Demo MP
            </span>
            <select
              value={currentMP?.id || 'MP001'}
              onChange={(e) => switchMP(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer max-w-[120px] md:max-w-none truncate"
              title="Demo / Testing Profile Switcher"
            >
              {availableMPs.map((mp) => (
                <option key={mp.id} value={mp.id} className="bg-white text-slate-900">
                  {mp.name} ({mp.constituency}, {mp.state})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none shrink-0" />
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            title="Logout Demo Session"
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile second row: FY + MP Switcher (only on xs/sm) */}
      <div className="sm:hidden flex items-center gap-2 pb-2 flex-wrap">
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs flex-1 min-w-0">
          <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer min-w-0 flex-1"
          >
            {FINANCIAL_YEARS.map((fy) => (
              <option key={fy} value={fy} className="bg-white text-slate-900">{fy}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1 text-xs flex-1 min-w-0">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider shrink-0">Demo</span>
          <select
            value={currentMP?.id || 'MP001'}
            onChange={(e) => switchMP(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer min-w-0 flex-1 truncate"
          >
            {availableMPs.map((mp) => (
              <option key={mp.id} value={mp.id} className="bg-white text-slate-900">
                {mp.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
