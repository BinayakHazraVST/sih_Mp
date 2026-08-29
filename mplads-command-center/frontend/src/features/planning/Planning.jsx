import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { planningService } from './planningService';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { Lightbulb, Target, Sparkles } from 'lucide-react';

export const Planning = () => {
  const { currentMP } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanning = async () => {
      if (!currentMP?.id) return;
      setLoading(true);
      try {
        const [propData, analysisData] = await Promise.all([
          planningService.getProposedProjects(currentMP.id),
          planningService.getPriorityAnalysis(currentMP.id)
        ]);
        setProposals(propData);
        setAnalysis(analysisData);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanning();
  }, [currentMP?.id]);

  if (loading) return <Loader label="Evaluating Planning Intelligence..." />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Planning & Proposed Works"
        description="Priority analysis matrix and upcoming project recommendations for constituency development."
      />

      {/* Priority Matrix Overview */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">High Priority Proposals</span>
              <span className="text-xl font-bold font-display text-slate-100">{analysis.highPriorityCount} Proposals</span>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Top Requested Sector</span>
              <span className="text-xl font-bold font-display text-indigo-300">{analysis.topRequestedSector}</span>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Average Impact Score</span>
              <span className="text-xl font-bold font-display text-emerald-400">{analysis.averageImpactScore} / 100</span>
            </div>
          </Card>
        </div>
      )}

      {/* Proposals List */}
      <Card title="Constituency Proposed Works Pipeline">
        <div className="space-y-4">
          {proposals.map((prop) => (
            <div key={prop.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{prop.sector}</span>
                  <Badge variant={prop.urgency === 'HIGH' ? 'rose' : 'amber'}>{prop.urgency} Urgency</Badge>
                </div>
                <h4 className="text-base font-bold text-slate-100">{prop.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proposed Location: {prop.proposedVillage} | Estimated Cost: {formatCurrency(prop.estimatedCost)}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">Impact Rating</span>
                  <span className="text-base font-bold text-emerald-400">{prop.impactScore} pts</span>
                </div>
                <Badge variant={prop.status === 'APPROVED' ? 'emerald' : 'slate'}>
                  {prop.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
