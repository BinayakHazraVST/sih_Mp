import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/common/Card';
import { formatCurrency } from '../../../utils/formatCurrency';
import { 
  Landmark, 
  CheckSquare, 
  Database, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight,
  ArrowUpRight 
} from 'lucide-react';

export const FundPositionPipeline = ({ fundPosition, financialYear }) => {
  const navigate = useNavigate();

  if (!fundPosition) return null;

  const allocation = fundPosition.annualAllocation; // ₹5.00 Cr
  const sanctioned = fundPosition.sanctioned; // ₹4.20 Cr
  const utilized = fundPosition.utilized; // ₹3.15 Cr
  const unspentReleased = fundPosition.unutilizedReleased; // ₹65.00 Lakh

  return (
    <Card
      title="Fund Flow"
      subtitle={`Lifecycle flow and balance traceability for FY ${financialYear}`}
      action={
        <button
          onClick={() => navigate('/finance')}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
        >
          <span>Detailed Audit</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      }
    >
      <div className="py-2 overflow-x-auto">
        <div className="min-w-[1120px] max-w-6xl mx-auto px-2 py-2 select-none">
          {/* --- PROPORTIONAL & SPACIOUS SANKEY SVG FLOW --- */}
          <div className="w-full relative h-[410px]">
            <svg
              viewBox="0 0 1140 370"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Flow 1: Blue -> Cyan */}
                <linearGradient id="flow-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.75" />
                </linearGradient>

                {/* Flow 2: Cyan -> Indigo/Purple */}
                <linearGradient id="flow-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.75" />
                </linearGradient>

                {/* Flow 3 Top: Purple -> Rose */}
                <linearGradient id="flow-3-top" x1="0%" y1="50%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#FECDD3" stopOpacity="0.85" />
                </linearGradient>

                {/* Flow 3 Bottom: Purple -> Amber */}
                <linearGradient id="flow-3-bottom" x1="0%" y1="50%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.85" />
                </linearGradient>

                {/* Arrow Drop Shadow */}
                <filter id="arrow-shadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.12" />
                </filter>
              </defs>

              {/* ========================================================================= */}
              {/* 1. SEAMLESS CONTINUOUS SANKEY RIBBONS                                     */}
              {/* ========================================================================= */}

              {/* Ribbon 1: Card 1 (x:200, 290px height) -> Card 2 (x:350, 255px height) */}
              <path
                d="M 200 35 C 275 35, 275 52.5, 350 52.5 L 350 307.5 C 275 307.5, 275 325, 200 325 Z"
                fill="url(#flow-1)"
              />

              {/* Ribbon 2: Card 2 (x:520, 255px height) -> Card 3 (x:670, 215px height) */}
              <path
                d="M 520 52.5 C 595 52.5, 595 72.5, 670 72.5 L 670 287.5 C 595 287.5, 595 307.5, 520 307.5 Z"
                fill="url(#flow-2)"
              />

              {/* Ribbon 3 Top: Card 3 (x:840) -> Released Utilized Card (x:940) */}
              <path
                d="M 840 72.5 C 890 72.5, 890 15, 940 15 L 940 170 C 890 170, 890 180, 840 180 Z"
                fill="url(#flow-3-top)"
              />

              {/* Ribbon 3 Bottom: Card 3 (x:840) -> Unspent Card (x:940) */}
              <path
                d="M 840 180 C 890 180, 890 190, 940 190 L 940 345 C 890 345, 890 287.5, 840 287.5 Z"
                fill="url(#flow-3-bottom)"
              />

              {/* ========================================================================= */}
              {/* 2. DIRECTIONAL ARROW CIRCULAR BADGES                                      */}
              {/* ========================================================================= */}

              {/* Arrow 1: Centered between Card 1 & 2 (x: 275, y: 180) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="275" cy="180" r="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 270.5 180 L 279.5 180 M 275.5 175 L 280.5 180 L 275.5 185" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Arrow 2: Centered between Card 2 & 3 (x: 595, y: 180) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="595" cy="180" r="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 590.5 180 L 599.5 180 M 595.5 175 L 600.5 180 L 595.5 185" stroke="#0891B2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Arrow 3 Top: Leading to Released Utilized (x: 890, y: 92.5) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="890" cy="92.5" r="15" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 886 92.5 L 894 92.5 M 890.5 88.5 L 895 92.5 L 890.5 96.5" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Arrow 3 Bottom: Leading to Unspent (x: 890, y: 267.5) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="890" cy="267.5" r="15" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 886 267.5 L 894 267.5 M 890.5 263.5 L 895 267.5 L 890.5 271.5" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* ========================================================================= */}
              {/* 3. PROPORTIONAL CONTINUOUS STAGE CARDS                                    */}
              {/* ========================================================================= */}

              {/* CARD 1: TOTAL AVAILABLE CAPITAL (100% - Height: 290px, y: 35px, Width: 170px) */}
              <foreignObject x="30" y="35" width="170" height="290">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-blue-50/50 border-2 border-blue-400 p-4 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center mb-2.5 shadow-xs">
                      <Landmark className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Total Available Capital
                    </span>
                  </div>

                  <div className="my-auto">
                    <span className="text-2xl font-black font-display text-slate-900 block tracking-tight">
                      {formatCurrency(allocation, true)}
                    </span>
                    <span className="text-base font-extrabold text-blue-600 mt-1 block">
                      100%
                    </span>
                  </div>
                </div>
              </foreignObject>

              {/* CARD 2: ADMINISTRATIVELY APPROVED (84% - Height: 255px, y: 52.5px, Width: 170px) */}
              <foreignObject x="350" y="52.5" width="170" height="255">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-cyan-50/50 border-2 border-cyan-400 p-4 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-700 flex items-center justify-center mb-2.5 shadow-xs">
                      <CheckSquare className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Administratively Approved
                    </span>
                  </div>

                  <div className="my-auto">
                    <span className="text-2xl font-black font-display text-slate-900 block tracking-tight">
                      {formatCurrency(sanctioned, true)}
                    </span>
                    <span className="text-base font-extrabold text-cyan-600 mt-1 block">
                      84%
                    </span>
                  </div>
                </div>
              </foreignObject>

              {/* CARD 3: GROUND EXPENDITURE (63% - Height: 215px, y: 72.5px, Width: 170px) */}
              <foreignObject x="670" y="72.5" width="170" height="215">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-indigo-50/50 border-2 border-indigo-400 p-4 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center mb-2 shadow-xs">
                      <Database className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Ground Expenditure
                    </span>
                  </div>

                  <div className="my-auto">
                    <span className="text-2xl font-black font-display text-slate-900 block tracking-tight">
                      {formatCurrency(utilized, true)}
                    </span>
                    <span className="text-base font-extrabold text-indigo-600 mt-1 block">
                      63%
                    </span>
                  </div>
                </div>
              </foreignObject>

              {/* CARD 4A (TOP-RIGHT): RELEASED (UTILIZED) (Height: 155px, y: 15px, Width: 170px) */}
              <foreignObject x="940" y="15" width="170" height="155">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-rose-50/70 border-2 border-rose-300 p-3.5 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center mb-1 shadow-xs">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Released (Utilized)
                    </span>
                  </div>

                  <div className="pb-0.5">
                    <span className="text-xl font-black font-display text-slate-900 block tracking-tight whitespace-nowrap">
                      {formatCurrency(utilized, true)}
                    </span>
                    <span className="text-xs font-extrabold text-rose-600 block mt-0.5">
                      82.9%
                    </span>
                  </div>
                </div>
              </foreignObject>

              {/* CARD 4B (BOTTOM-RIGHT): UNSPENT / UNUTILIZED (Height: 155px, y: 190px, Width: 170px) */}
              <foreignObject x="940" y="190" width="170" height="155">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-amber-50/70 border-2 border-amber-300 p-3.5 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center mb-1 shadow-xs">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Unspent / Unutilized
                    </span>
                  </div>

                  <div className="pb-0.5">
                    <span className="text-xl font-black font-display text-slate-900 block tracking-tight whitespace-nowrap">
                      {formatCurrency(unspentReleased, true)}
                    </span>
                    <span className="text-xs font-extrabold text-amber-600 block mt-0.5">
                      17.1%
                    </span>
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>

          {/* --- BOTTOM LEGEND --- */}
          <div className="flex items-center justify-center flex-wrap gap-6 pt-4 mt-2 border-t border-slate-100 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Total Available Capital</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span>Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>Expenditure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Released (Utilized)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Unspent</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
