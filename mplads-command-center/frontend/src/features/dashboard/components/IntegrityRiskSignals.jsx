import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/common/Card';
import { ShieldAlert, AlertCircle, AlertTriangle, FileCheck, ArrowRight, ArrowUpRight, Scale } from 'lucide-react';

export const IntegrityRiskSignals = ({ signals = [] }) => {
  const navigate = useNavigate();

  if (!signals || signals.length === 0) return null;

  const levelStyles = {
    critical: {
      border: 'border-rose-200 bg-rose-50/40 hover:border-rose-300',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      iconColor: 'text-rose-600',
      btnText: 'text-rose-700 hover:text-rose-900',
      dot: 'bg-rose-500'
    },
    warning: {
      border: 'border-amber-200 bg-amber-50/40 hover:border-amber-300',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      iconColor: 'text-amber-600',
      btnText: 'text-amber-700 hover:text-amber-900',
      dot: 'bg-amber-500'
    },
    notice: {
      border: 'border-slate-200 bg-slate-50/60 hover:border-slate-300',
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      iconColor: 'text-indigo-600',
      btnText: 'text-indigo-700 hover:text-indigo-900',
      dot: 'bg-indigo-500'
    }
  };

  return (
    <Card
      title="Integrity & Risk Signals"
      subtitle="Automated anomaly detection and governance verification triggers"
      action={
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            5 Signals Active
          </span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {signals.map((sig) => {
          const cfg = levelStyles[sig.level] || levelStyles.notice;

          return (
            <div
              key={sig.id}
              onClick={() => navigate(sig.investigatePath)}
              className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition shadow-xs group ${cfg.border}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Risk Signal
                    </span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${cfg.badge}`}>
                    {sig.count} {sig.unit}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-indigo-950 transition">
                  {sig.title}
                </h4>

                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  {sig.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                <span className={cfg.btnText}>Investigate</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${cfg.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
