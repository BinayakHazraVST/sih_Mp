import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ label = 'Loading Telemetry...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </div>
  );
};
