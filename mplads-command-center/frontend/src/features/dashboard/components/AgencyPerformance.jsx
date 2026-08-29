import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Building2, AlertTriangle, CheckCircle2, ArrowUpRight, HardHat, ShieldAlert } from 'lucide-react';

export const AgencyPerformance = ({ agencyPerformance = [], contractorPerformance = [] }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('agencies'); // 'agencies' | 'contractors'

  return (
    <Card
      title="Field Agency & Contractor Performance"
      subtitle="Execution velocity, compliance bottlenecks, and delayed works audit"
      action={
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs font-bold">
            <button
              onClick={() => setTab('agencies')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                tab === 'agencies'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Line Agencies
            </button>
            <button
              onClick={() => setTab('contractors')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                tab === 'contractors'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Empanelled Contractors
            </button>
          </div>

          <button
            onClick={() => navigate(tab === 'agencies' ? '/contractors' : '/contractors')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer ml-1"
          >
            <span>View Full Directory</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      }
    >
      {tab === 'agencies' ? (
        <div className="space-y-3">
          {/* Agency Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Line Agency</th>
                  <th className="py-3 px-3 text-center">Assigned Works</th>
                  <th className="py-3 px-3 text-center">On Track</th>
                  <th className="py-3 px-3 text-center">Delayed Works</th>
                  <th className="py-3 px-3">Fund Utilization</th>
                  <th className="py-3 px-4 text-right">Agency Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {agencyPerformance.map((agency, idx) => {
                  const hasDelays = agency.delayed > 0;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                          <div>
                            <span className="font-bold text-slate-900 block text-sm">{agency.name}</span>
                            <span className="text-[11px] text-slate-400">{agency.fullName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-900">
                        {agency.projects}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                          {agency.onTrack}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`font-bold px-2 py-0.5 rounded border ${
                            hasDelays
                              ? 'text-rose-700 bg-rose-50 border-rose-200'
                              : 'text-slate-400 bg-slate-50 border-slate-200'
                          }`}
                        >
                          {agency.delayed}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 border border-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-indigo-600 h-full rounded-full"
                              style={{ width: agency.utilization }}
                            />
                          </div>
                          <span className="font-bold text-slate-800">{agency.utilization}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {agency.alert ? (
                          <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> {agency.alert}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {agency.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Highlight Warning Banner */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span><strong>Agency Action Flag:</strong> PMC has 2 projects delayed beyond 14 days. Meeting notice suggested for municipal engineer.</span>
            </span>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs font-bold text-amber-800 underline hover:text-amber-950 shrink-0 cursor-pointer"
            >
              Filter PMC Works →
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Contractor Name</th>
                <th className="py-3 px-3 text-center">Assigned Works</th>
                <th className="py-3 px-3 text-center">Completed</th>
                <th className="py-3 px-3 text-center">Delayed</th>
                <th className="py-3 px-3">Payment Milestones</th>
                <th className="py-3 px-4 text-right">Integrity / Risk Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {contractorPerformance.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <HardHat className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-800">{c.projects}</td>
                  <td className="py-3.5 px-3 text-center text-emerald-700 font-bold">{c.completed}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`font-bold ${c.delayed > 0 ? 'text-rose-700' : 'text-slate-400'}`}>
                      {c.delayed}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">{c.paymentStatus}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded border inline-block ${
                        c.riskLevel === 'High'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : c.riskLevel === 'Medium'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {c.riskSignal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
