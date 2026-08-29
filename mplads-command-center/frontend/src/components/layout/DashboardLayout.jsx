import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased">
      <Sidebar isCollapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Navbar />
        <main className="flex-1 px-5 py-5 sm:px-8 sm:py-6 overflow-y-auto w-full max-w-[1580px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
