import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, Wallet, FolderKanban, CheckCircle2, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatCurrency';

export const CommandKpiRow = ({ kpis, fundPosition }) => {
  const navigate = useNavigate();

  if (!kpis) return null;

  const items = [
    {
      id: 'allocation',
      title: 'Annual Allocation',
      value: formatCurrency(kpis.annualAllocation, true),
      subtitle: 'MoSPI Cap FY 2026–27',
      icon: Landmark,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50 border-indigo-100',
      badge: 'Cap Fixed',
      badgeColor: 'bg-slate-100 text-slate-700',
      path: '/finance'
    },
    {
      id: 'utilized',
      title: 'Utilized Amount',
      value: formatCurrency(kpis.utilizedAmount, true),
      subtitle: `${kpis.utilizationPct}% of annual allocation`,
      icon: Wallet,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50 border-emerald-100',
      badge: `${kpis.utilizationPct}% Grounded`,
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      path: '/finance'
    },
    {
      id: 'proposed',
      title: 'Projects Proposed',
      value: kpis.projectsProposed,
      subtitle: 'Identified in constituency plan',
      icon: FolderKanban,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50 border-indigo-100',
      badge: '10 Vetted',
      badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      path: '/projects'
    },
    {
      id: 'completed',
      title: 'Projects Completed',
      value: kpis.projectsCompleted,
      subtitle: 'Assets dedicated to public',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50 border-emerald-100',
      badge: 'Verified Works',
      badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      path: '/projects'
    },
    {
      id: 'ongoing',
      title: 'Projects Ongoing',
      value: kpis.projectsOngoing,
      subtitle: 'Under active ground execution',
      icon: Clock,
      color: 'text-sky-700',
      bgColor: 'bg-sky-50 border-sky-100',
      badge: 'In Progress',
      badgeColor: 'bg-sky-50 text-sky-700 border border-sky-200',
      path: '/projects'
    },
    {
      id: 'atRisk',
      title: 'Projects At Risk / Delayed',
      value: `${kpis.projectsAtRisk + (kpis.projectsDelayed || 0)}`,
      subtitle: `${kpis.projectsDelayed || 2} delayed • ${kpis.projectsAtRisk || 1} at risk`,
      icon: AlertTriangle,
      color: 'text-rose-700',
      bgColor: 'bg-rose-50 border-rose-100',
      badge: 'Needs Review',
      badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200',
      path: '/projects'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
            className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md hover:border-indigo-300 transition duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className={`w-9 h-9 rounded-lg ${item.bgColor} border flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500 block leading-tight">
                {item.title}
              </span>
              <span className="text-2xl font-extrabold font-display text-slate-900 mt-1 block">
                {item.value}
              </span>
            </div>

            <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span className="truncate">{item.subtitle}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
