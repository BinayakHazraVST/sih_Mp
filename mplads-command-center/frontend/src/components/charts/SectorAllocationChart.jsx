import React from 'react';
import { SECTOR_COLORS } from '../../constants/sectors';
import { formatCurrency } from '../../utils/formatCurrency';

export const SectorAllocationChart = ({ sectors = [] }) => {
  if (!sectors || sectors.length === 0) {
    return <p className="text-xs text-slate-500 italic">No sector allocation available.</p>;
  }

  return (
    <div className="space-y-3">
      {sectors.map((sec, idx) => {
        const color = SECTOR_COLORS[sec.sector] || '#6366f1';
        return (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">{sec.sector}</span>
              <span className="text-slate-400 font-semibold">{formatCurrency(sec.amount, true)} ({sec.percentage}%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-700/50 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${sec.percentage}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
