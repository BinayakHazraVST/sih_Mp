import React from 'react';
import { Card } from '../../../components/common/Card';
import { formatCurrency } from '../../../utils/formatCurrency';
import { Landmark, TrendingUp, CheckCircle, Wallet } from 'lucide-react';

export const FundSummary = ({ fund }) => {
  if (!fund) return null;

  const metrics = [
    { label: 'Annual Allocation Cap', amount: fund.allocation, icon: Landmark, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Sanctioned Amount', amount: fund.sanctioned, icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Released Amount', amount: fund.released, icon: Wallet, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Utilized Amount', amount: fund.utilized, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <Card key={idx} className="p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${m.bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-6 h-6 ${m.color}`} />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">{m.label}</span>
              <span className="text-xl font-bold font-display text-slate-100 mt-0.5 block">
                {formatCurrency(m.amount, true)}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
