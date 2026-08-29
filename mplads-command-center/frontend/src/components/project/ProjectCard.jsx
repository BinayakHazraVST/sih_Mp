import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { PROJECT_STATUS_COLORS, PROJECT_STATUS_LABELS } from '../../constants/projectStatus';
import { formatCurrency } from '../../utils/formatCurrency';
import { MapPin, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  if (!project) return null;

  const badgeVariant = PROJECT_STATUS_COLORS[project.status] || 'slate';

  return (
    <Card className="hover:border-slate-600 transition duration-200 cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{project.sector}</span>
          <h4 className="text-base font-bold text-slate-100 line-clamp-1 mt-0.5">{project.name}</h4>
        </div>
        <Badge variant={badgeVariant}>
          {PROJECT_STATUS_LABELS[project.status] || project.status}
        </Badge>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="truncate">{project.location?.village}, {project.location?.district}</span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-400">Physical Progress</span>
          <span className="text-indigo-400">{project.completionPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${project.completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="pt-3 border-t border-slate-700/40 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-slate-500 text-[11px] block">Sanctioned</span>
          <span className="font-bold text-slate-200">{formatCurrency(project.sanctionedAmount, true)}</span>
        </div>
        <div>
          <span className="text-slate-500 text-[11px] block">Utilized</span>
          <span className="font-bold text-emerald-400">{formatCurrency(project.utilizedAmount, true)}</span>
        </div>
      </div>
    </Card>
  );
};
