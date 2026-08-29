import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Landmark, 
  MapPin, 
  Building2, 
  FileSpreadsheet,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { AshokStambhLogo } from '../common/AshokStambhLogo';

export const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard }
      ]
    },
    {
      title: 'DEVELOPMENT',
      items: [
        { label: 'Projects', path: ROUTES.PROJECTS, icon: FolderKanban },
        { label: 'Constituency Geography', path: ROUTES.GEOGRAPHY, icon: MapPin }
      ]
    },
    {
      title: 'FINANCIAL',
      items: [
        { label: 'Financial Overview', path: ROUTES.FINANCE, icon: Landmark },
        { label: 'Contractors Directory', path: ROUTES.CONTRACTORS, icon: Building2 }
      ]
    },
    {
      title: 'ACCOUNTABILITY',
      items: [
        { label: 'Reports & Audits', path: ROUTES.REPORTS, icon: FileSpreadsheet }
      ]
    }
  ];

  return (
    <aside
      className={`sticky top-0 h-screen bg-white border-r border-slate-200 flex flex-col shrink-0 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Logo Header with Toggle Button */}
      <div className={`h-16 border-b border-slate-200 shrink-0 bg-white flex items-center justify-between transition-all ${
        isCollapsed ? 'px-3 justify-center' : 'px-4'
      }`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <AshokStambhLogo className="w-10 h-10 shrink-0" theme="light" />
          {!isCollapsed && (
            <div className="min-w-0 transition-opacity duration-200">
              <h1 className="font-display font-extrabold text-slate-900 text-base tracking-tight leading-none truncate">
                MPLADS AI
              </h1>
              <span className="text-xs font-semibold text-slate-500 block mt-1 leading-tight truncate">
                Monitoring Platform
              </span>
            </div>
          )}
        </div>

        {/* Sidebar Collapse/Expand Toggle Button */}
        <button
          onClick={onToggle}
          title={isCollapsed ? "Expand Sidebar (Ctrl+B)" : "Collapse Sidebar (Ctrl+B)"}
          className={`p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition cursor-pointer shrink-0 ${
            isCollapsed ? 'hidden' : 'block'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto overflow-x-hidden">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed ? (
              <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-opacity">
                {group.title}
              </div>
            ) : (
              gIdx > 0 && <div className="my-2 border-t border-slate-100" />
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl transition-all ${
                      isCollapsed
                        ? 'justify-center px-0 py-2.5 w-12 mx-auto'
                        : 'px-3 py-2 text-xs font-semibold'
                    } ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Status Banner / Toggle Pill */}
      {isCollapsed ? (
        <div className="shrink-0 p-3 border-t border-slate-100 flex flex-col items-center gap-2">
          <button
            onClick={onToggle}
            title="Expand Sidebar"
            className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div
            title="Portal Status: MP Active"
            className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 cursor-help"
          >
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>
      ) : (
        <div className="shrink-0 p-3 m-3 bg-slate-50 border border-slate-200 rounded-xl transition-all">
          <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-700 mb-1">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Portal Status</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            MP Portal Active. Nodal Officer verification layer ready.
          </p>
        </div>
      )}
    </aside>
  );
};
