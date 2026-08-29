import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import { dashboardService } from './dashboardService';
import { AttentionRequired } from './components/AttentionRequired';
import { CommandKpiRow } from './components/CommandKpiRow';
import { FundPositionPipeline } from './components/FundPositionPipeline';
import { ExpenditurePerformanceChart } from './components/ExpenditurePerformanceChart';
import { ConstituencyMapSnapshot } from './components/ConstituencyMapSnapshot';
import { AgencyPerformance } from './components/AgencyPerformance';
import { IntegrityRiskSignals } from './components/IntegrityRiskSignals';
import { Loader } from '../../components/common/Loader';
import { ErrorState } from '../../components/common/ErrorState';
import { Clock, RefreshCw } from 'lucide-react';

export const Dashboard = () => {
  const { currentMP } = useAuth();
  const { financialYear } = useUser();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = async () => {
    if (!currentMP?.id) return;
    setLoading(true);
    setError(null);
    try {
      const result = await dashboardService.getDashboardData(currentMP.id, financialYear);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load command center telemetry');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [currentMP?.id, financialYear]);

  if (loading) return <Loader label="Retrieving Parliamentary Command Telemetry..." />;
  if (error) return <ErrorState message={error} onRetry={loadDashboard} />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* 3. PAGE TITLE & DATA FRESHNESS INDICATOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">
            {data.mp.name} — Command Dashboard
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Constituency: <span className="text-slate-800 font-bold">{data.mp.constituency}, {data.mp.state}</span> | Financial Year: <span className="text-indigo-700 font-bold">{financialYear}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-500 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>Last updated: {data.lastUpdated}</span>
          </div>

          <button
            onClick={loadDashboard}
            title="Refresh Telemetry"
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. ⚠ ACTION REQUIRED ALERT SECTION */}
      <AttentionRequired alerts={data.attentionRequired} />

      {/* 5. DECISION-ORIENTED KPI OVERVIEW */}
      <CommandKpiRow kpis={data.kpis} fundPosition={data.fundPosition} />

      {/* 6. FUND POSITION & FINANCIAL FLOW */}
      <FundPositionPipeline fundPosition={data.fundPosition} financialYear={financialYear} />

      {/* 11 & 12. EXPENDITURE PERFORMANCE + CONSTITUENCY MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenditurePerformanceChart
          performance={data.expenditurePerformance}
          financialYear={financialYear}
        />
        <ConstituencyMapSnapshot
          constituencyMap={data.constituencyMap}
          constituencyName={data.mp.constituency}
        />
      </div>

      {/* 13 & 14. FIELD AGENCY & CONTRACTOR PERFORMANCE */}
      <AgencyPerformance
        agencyPerformance={data.agencyPerformance}
        contractorPerformance={data.contractorPerformance}
      />

      {/* 15. INTEGRITY & RISK SIGNALS */}
      <IntegrityRiskSignals signals={data.integrityRiskSignals} />
    </div>
  );
};
