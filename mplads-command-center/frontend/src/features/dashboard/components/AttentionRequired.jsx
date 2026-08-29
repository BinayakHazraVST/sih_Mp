import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Clock, AlertCircle, FileCheck, ShieldAlert } from 'lucide-react';

export const AttentionRequired = ({ alerts = [] }) => {
  const navigate = useNavigate();

  if (!alerts || alerts.length === 0) return null;

  const severityConfig = {
    critical: {
      dot: 'bg-rose-500 ring-4 ring-rose-100',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: AlertCircle,
      iconColor: 'text-rose-600',
      container: 'hover:border-rose-300 hover:bg-rose-50/30'
    },
    warning: {
      dot: 'bg-amber-500 ring-4 ring-amber-100',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      container: 'hover:border-amber-300 hover:bg-amber-50/30'
    },
    info: {
      dot: 'bg-indigo-500 ring-4 ring-indigo-100',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: FileCheck,
      iconColor: 'text-indigo-600',
      container: 'hover:border-indigo-300 hover:bg-indigo-50/30'
    }
  };

  return (
    <div className="bg-white border-2 border-amber-300/80 rounded-2xl p-5 shadow-xs transition duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Attention Required</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {alerts.length} items require your attention
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Priority bottlenecks and verification signals requiring MP directive
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/projects')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>View All Issues</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Alert Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {alerts.map((item) => {
          const cfg = severityConfig[item.severity] || severityConfig.warning;
          const Icon = cfg.icon;

          return (
            <div
              key={item.id}
              onClick={() => navigate(item.targetPath)}
              className={`p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 flex flex-col justify-between cursor-pointer transition ${cfg.container}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {item.category}
                    </span>
                  </div>
                  {item.area && (
                    <span className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                      {item.area}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  {item.issue}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-indigo-600 group">
                <span>{item.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
