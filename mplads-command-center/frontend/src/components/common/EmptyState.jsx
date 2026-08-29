import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({ title = 'No Data Found', description = 'There are no records available for this selection.', action = null }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-800/30 border border-dashed border-slate-700 rounded-xl">
      <FolderOpen className="w-12 h-12 text-slate-500 mb-3" />
      <h4 className="text-base font-semibold text-slate-200">{title}</h4>
      <p className="text-sm text-slate-400 max-w-sm mt-1 mb-4">{description}</p>
      {action}
    </div>
  );
};
