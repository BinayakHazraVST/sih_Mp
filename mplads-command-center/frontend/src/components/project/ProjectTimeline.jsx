import React from 'react';
import { formatDate } from '../../utils/formatDate';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';

export const ProjectTimeline = ({ startDate, expectedCompletionDate, completionPercentage }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span>Sanctioned: {formatDate(startDate)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Target: {formatDate(expectedCompletionDate)}</span>
        </div>
      </div>

      <div className="relative pl-6 space-y-3 border-l-2 border-slate-700">
        <div className="relative">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute -left-[31px] top-0 bg-slate-900 rounded-full" />
          <h5 className="text-xs font-bold text-slate-200">Proposal Approved & Sanctioned</h5>
          <p className="text-[11px] text-slate-400">{formatDate(startDate)}</p>
        </div>

        <div className="relative">
          <div className={`w-3.5 h-3.5 rounded-full absolute -left-[30px] top-0 border-2 ${completionPercentage > 0 ? 'bg-indigo-500 border-indigo-400' : 'bg-slate-800 border-slate-600'}`} />
          <h5 className="text-xs font-bold text-slate-200">Physical Construction & Execution</h5>
          <p className="text-[11px] text-slate-400">{completionPercentage}% Completed</p>
        </div>

        <div className="relative">
          <div className={`w-3.5 h-3.5 rounded-full absolute -left-[30px] top-0 border-2 ${completionPercentage === 100 ? 'bg-emerald-500 border-emerald-400' : 'bg-slate-800 border-slate-600'}`} />
          <h5 className="text-xs font-bold text-slate-200">Final Verification & Handover</h5>
          <p className="text-[11px] text-slate-400">Expected {formatDate(expectedCompletionDate)}</p>
        </div>
      </div>
    </div>
  );
};
