import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { feedbackService } from './feedbackService';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';
import { formatDate } from '../../utils/formatDate';
import { MessageSquare, Star, User } from 'lucide-react';

export const CitizenFeedback = () => {
  const { currentMP } = useAuth();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (!currentMP?.id) return;
      setLoading(true);
      try {
        const data = await feedbackService.getFeedback(currentMP.id);
        setFeedbackList(data);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [currentMP?.id]);

  if (loading) return <Loader label="Loading Citizen Feedback..." />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Citizen Feedback & Grievance Governance"
        description="Direct constituent feedback and suggestions regarding constituency projects."
      />

      <div className="space-y-4">
        {feedbackList.map((fb) => (
          <Card key={fb.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">{fb.citizenName}</h5>
                  <span className="text-xs text-slate-500 font-medium">Village: {fb.village} • {formatDate(fb.date)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(fb.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Badge variant={fb.status === 'RESOLVED' ? 'emerald' : 'amber'}>
                  {fb.status}
                </Badge>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/90 italic">
              "{fb.comment}"
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
