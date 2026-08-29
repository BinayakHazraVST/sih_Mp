import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Landmark, 
  MapPin, 
  Lightbulb, 
  Building2, 
  Users, 
  MessageSquare, 
  FileSpreadsheet,
  ShieldAlert
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Projects', path: ROUTES.PROJECTS, icon: FolderKanban },
    { label: 'Financial Overview', path: ROUTES.FINANCE, icon: Landmark },
    { label: 'Constituency Geography', path: ROUTES.GEOGRAPHY, icon: MapPin },
    { label: 'Planning & Proposals', path: ROUTES.PLANNING, icon: Lightbulb },
    { label: 'Contractors Directory', path: ROUTES.CONTRACTORS, icon: Building2 },
    { label: 'Beneficiaries Impact', path: ROUTES.BENEFICIARIES, icon: Users },
    { label: 'Citizen Feedback', path: ROUTES.FEEDBACK, icon: MessageSquare },
    { label: 'Reports & Audits', path: ROUTES.REPORTS, icon: FileSpreadsheet },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-screen">
      {/* Brand Logo Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
          MP
        </div>
        <div>
          <h1 className="font-display font-bold text-slate-100 text-sm tracking-wide leading-none">
            MPLADS
          </h1>
          <span className="text-[10px] font-semibold text-amber-400 tracking-wider uppercase">
            Command Center
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          MP Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Role Architecture Info Banner */}
      <div className="p-3 m-3 bg-slate-800/40 border border-slate-700/50 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Portal Status</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-snug">
          MP Portal Active. Nodal Officer verification layer ready for integration.
        </p>
      </div>
    </aside>
  );
};
