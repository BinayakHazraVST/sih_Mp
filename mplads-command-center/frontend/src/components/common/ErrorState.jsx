import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({ title = 'Failed to load data', message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-rose-500/10 border border-rose-500/20 rounded-xl text-center">
      <AlertCircle className="w-10 h-10 text-rose-400 mb-2" />
      <h4 className="text-base font-semibold text-rose-200">{title}</h4>
      <p className="text-sm text-rose-300/80 mt-1 mb-4">{message || 'An error occurred while fetching information.'}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} icon={RefreshCw}>
          Retry Request
        </Button>
      )}
    </div>
  );
};
