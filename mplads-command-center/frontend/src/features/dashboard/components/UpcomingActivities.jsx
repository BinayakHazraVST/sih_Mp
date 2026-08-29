import React from 'react';
import { Card } from '../../../components/common/Card';
import { Calendar, CheckCircle } from 'lucide-react';

export const UpcomingActivities = () => {
  const activities = [
    { title: 'District Collectorate MPLADS Quarterly Review Meeting', date: '2026-09-05', type: 'Review' },
    { title: 'Site Inspection: Community Health Centre Haveli', date: '2026-09-12', type: 'Inspection' },
    { title: 'Inauguration: Primary School Smart Science Lab', date: '2026-09-20', type: 'Event' },
  ];

  return (
    <Card title="Upcoming Constituency Schedule">
      <div className="space-y-3">
        {activities.map((act, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
            <Calendar className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <h5 className="text-xs font-semibold text-slate-200">{act.title}</h5>
              <span className="text-[11px] text-slate-400">{act.date} • {act.type}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
