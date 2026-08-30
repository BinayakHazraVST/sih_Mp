import React, { useState } from 'react';
import { Card } from '../../../components/common/Card';
import { formatCurrency } from '../../../utils/formatCurrency';
import { TrendingUp, CheckCircle, AlertCircle, Info } from 'lucide-react';

export const ExpenditurePerformanceChart = ({ performance, financialYear }) => {
  const [activeMonth, setActiveMonth] = useState(null);

  if (!performance || !performance.months) return null;

  const { plannedTotal, actualTotal, achievementPct, months } = performance;
  const maxVal = Math.max(...months.map((m) => Math.max(m.planned, m.actual)), 10000000);

  return (
    <Card
      title="Expenditure Performance"
      subtitle={`Planned vs Actual disbursements — FY ${financialYear}`}
    >
      {/* Top Telemetry Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Target Planned Run-Rate
          </span>
          <span className="text-xl font-extrabold font-display text-slate-900 mt-0.5 block">
            {formatCurrency(plannedTotal, true)}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Cumulative annual milestone
          </span>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Actual Disbursed to Date
          </span>
          <span className="text-xl font-extrabold font-display text-emerald-700 mt-0.5 block">
            {formatCurrency(actualTotal, true)}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Grounded through line agencies
          </span>
        </div>

        <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex flex-col justify-between">
          <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block">
            Plan Adherence Ratio
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xl font-extrabold font-display text-indigo-950">
              {achievementPct}%
            </span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
              Healthy Velocity
            </span>
          </div>
          <span className="text-[11px] text-indigo-800 font-medium">
            ₹45L gap pending Q2 bill settlements
          </span>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-between flex-wrap gap-y-2 mb-4 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-indigo-200 border border-indigo-400" />
            <span>Planned Expenditure</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-indigo-600" />
            <span>Actual Ground Disbursals</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 font-medium italic">
          Hover over bars for exact breakdown
        </span>
      </div>

      {/* Custom Bar Comparison Chart */}
      <div className="pt-4 border-t border-slate-100">
        <div className="h-56 flex items-end gap-2 sm:gap-4 justify-between px-2">
          {months.map((m, idx) => {
            const plannedHeight = (m.planned / maxVal) * 100;
            const actualHeight = (m.actual / maxVal) * 100;
            const isProjected = m.month.includes('Proj');
            const isHovered = activeMonth === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveMonth(idx)}
                onMouseLeave={() => setActiveMonth(null)}
                className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-16 bg-slate-900 text-white text-[11px] px-3 py-1.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-20 animate-fadeIn border border-slate-700">
                    <div className="font-bold border-b border-slate-700 pb-0.5 mb-1">{m.month}</div>
                    <div className="text-slate-300">Planned: <span className="text-white font-bold">{formatCurrency(m.planned)}</span></div>
                    <div className="text-emerald-400">Actual: <span className="text-white font-bold">{formatCurrency(m.actual)}</span></div>
                  </div>
                )}

                {/* Bars Pair Container */}
                <div className="w-full bg-slate-100/70 border border-slate-200/80 rounded-t-xl h-44 flex items-end justify-center gap-1 sm:gap-1.5 p-1 relative">
                  {/* Planned Bar */}
                  <div
                    className="w-1/2 bg-indigo-200 hover:bg-indigo-300 rounded-t transition-all duration-500"
                    style={{ height: `${Math.max(plannedHeight, 6)}%` }}
                    title={`Planned: ${formatCurrency(m.planned)}`}
                  />
                  {/* Actual Bar */}
                  <div
                    className={`w-1/2 rounded-t transition-all duration-500 ${
                      isProjected
                        ? 'bg-gradient-to-t from-indigo-500 to-indigo-400 opacity-75'
                        : 'bg-indigo-600 group-hover:bg-indigo-700'
                    }`}
                    style={{ height: `${Math.max(actualHeight, 6)}%` }}
                    title={`Actual: ${formatCurrency(m.actual)}`}
                  />
                </div>

                {/* Month Label */}
                <span className={`text-[11px] font-bold text-center ${isHovered ? 'text-indigo-600' : 'text-slate-500'}`}>
                  {m.month.split(' ')[0]}
                  {isProjected && <span className="text-[9px] text-amber-600 block leading-none font-semibold">*Proj</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
