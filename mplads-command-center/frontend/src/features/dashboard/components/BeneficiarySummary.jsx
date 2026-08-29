import React from 'react';
import { Card } from '../../../components/common/Card';
import { Users, MapPin } from 'lucide-react';

export const BeneficiarySummary = ({ beneficiaries = 245000, villagesCovered = 126 }) => {
  return (
    <Card title="Constituency Reach">
      <div className="space-y-4">
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3.5 rounded-lg">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Total Estimated Beneficiaries</span>
            <span className="text-xl font-bold font-display text-slate-100">{beneficiaries.toLocaleString('en-IN')} Citizens</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 p-3.5 rounded-lg">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Gram Panchayats & Villages Covered</span>
            <span className="text-xl font-bold font-display text-slate-100">{villagesCovered} Villages</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
