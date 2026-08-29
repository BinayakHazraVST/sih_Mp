import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Demo Disclaimer Note */}
          <div className="mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300/90 flex items-center justify-between">
            <span>
              <strong>Development Notice:</strong> All data in this demo environment is fictional and used only for development/testing.
            </span>
            <span className="font-semibold uppercase tracking-wider text-[10px] text-amber-400">Task 01 Foundation</span>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};
