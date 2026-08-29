import React, { useState, useEffect } from 'react';
import { contractorService } from './contractorService';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';
import { Building2, Star, Phone, Mail, CheckCircle2 } from 'lucide-react';

export const Contractors = () => {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContractors = async () => {
      setLoading(true);
      try {
        const data = await contractorService.getContractors();
        setContractors(data);
      } finally {
        setLoading(false);
      }
    };
    fetchContractors();
  }, []);

  if (loading) return <Loader label="Loading Registered Contractors Directory..." />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Empanelled Contractors Directory"
        description="Verified civil engineering agencies and vendors executing MPLADS works."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contractors.map((c) => (
          <Card key={c.id} className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{c.registrationNumber}</span>
                <h4 className="text-base font-bold text-slate-100 mt-0.5">{c.name}</h4>
              </div>
              <Badge variant="emerald">{c.performanceCategory}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 border border-slate-800 p-3 rounded-lg">
              <div>
                <span className="text-slate-400 block">Performance Score</span>
                <div className="flex items-center gap-1 font-bold text-amber-400 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{c.rating} / 5.0</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block">Works Completed</span>
                <div className="flex items-center gap-1 font-bold text-slate-200 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{c.projectsCompleted} Works</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/40 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Contact: {c.contactPerson}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{c.email}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
