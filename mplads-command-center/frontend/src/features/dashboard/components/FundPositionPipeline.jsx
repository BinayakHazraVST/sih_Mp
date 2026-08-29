import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/common/Card';
import { formatCurrency } from '../../../utils/formatCurrency';
import { 
  Landmark, 
  CheckSquare, 
  TrendingUp, 
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
  const released = fundPosition.released; // ₹3.80 Cr
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
        <div className="min-w-[1060px] max-w-6xl mx-auto px-2 py-2 select-none">
          {/* --- UNIFIED PIXEL-PERFECT SANKEY SVG DIAGRAM --- */}
          <div className="w-full relative h-[400px]">
            <svg
              viewBox="0 0 1080 370"
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

                {/* Flow 2: Cyan -> Green */}
                <linearGradient id="flow-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.75" />
                </linearGradient>

                {/* Flow 3: Green -> Purple */}
                <linearGradient id="flow-3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#DDD6FE" stopOpacity="0.75" />
                </linearGradient>

                {/* Flow 4 Top: Purple -> Rose */}
                <linearGradient id="flow-4-top" x1="0%" y1="50%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#FECDD3" stopOpacity="0.85" />
                </linearGradient>

                {/* Flow 4 Bottom: Purple -> Amber */}
                <linearGradient id="flow-4-bottom" x1="0%" y1="50%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.85" />
                </linearGradient>

                {/* Arrow Drop Shadow */}
                <filter id="arrow-shadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.12" />
                </filter>
              </defs>

              {/* ========================================================================= */}
              {/* 1. SEAMLESS SANKEY CONNECTING RIBBONS (EXACT CARD-TO-CARD GEOMETRY) */}
              {/* ========================================================================= */}

              {/* Ribbon 1: Card 1 (x:150) -> Card 2 (x:235) */}
              <path
                d="M 150 40 C 192.5 40, 192.5 55, 235 55 L 235 305 C 192.5 305, 192.5 320, 150 320 Z"
                fill="url(#flow-1)"
              />

              {/* Ribbon 2: Card 2 (x:370) -> Card 3 (x:455) */}
              <path
                d="M 370 55 C 412.5 55, 412.5 70, 455 70 L 455 290 C 412.5 290, 412.5 305, 370 305 Z"
                fill="url(#flow-2)"
              />

              {/* Ribbon 3: Card 3 (x:590) -> Card 4 (x:675) */}
              <path
                d="M 590 70 C 632.5 70, 632.5 85, 675 85 L 675 275 C 632.5 275, 632.5 290, 590 290 Z"
                fill="url(#flow-3)"
              />

              {/* Ribbon 4 Top: Card 4 (x:810) -> Released Utilized Card (x:900) */}
              <path
                d="M 810 85 C 855 85, 855 15, 900 15 L 900 170 C 855 170, 855 180, 810 180 Z"
                fill="url(#flow-4-top)"
              />

              {/* Ribbon 4 Bottom: Card 4 (x:810) -> Unspent Card (x:900) */}
              <path
                d="M 810 180 C 855 180, 855 195, 900 195 L 900 350 C 855 350, 855 275, 810 275 Z"
                fill="url(#flow-4-bottom)"
              />

              {/* ========================================================================= */}
              {/* 2. DIRECTIONAL ARROW CIRCULAR BADGES (EXACTLY CENTERED IN FLOW CONDUITS) */}
              {/* ========================================================================= */}

              {/* Arrow 1: Between Card 1 & 2 (x: 192.5, y: 180) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="192.5" cy="180" r="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 188 180 L 197 180 M 193 175 L 198 180 L 193 185" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Arrow 2: Between Card 2 & 3 (x: 412.5, y: 180) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="412.5" cy="180" r="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 408 180 L 417 180 M 413 175 L 418 180 L 413 185" stroke="#0891B2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Arrow 3: Between Card 3 & 4 (x: 632.5, y: 180) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="632.5" cy="180" r="16" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 628 180 L 637 180 M 633 175 L 638 180 L 633 185" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Arrow 4 Top: Leading to Released Utilized (x: 855, y: 92.5) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="855" cy="92.5" r="15" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 851 92.5 L 859 92.5 M 855.5 88.5 L 860 92.5 L 855.5 96.5" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Arrow 4 Bottom: Leading to Unspent (x: 855, y: 272.5) */}
              <g filter="url(#arrow-shadow)">
                <circle cx="855" cy="272.5" r="15" fill="#FFFFFF" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 851 272.5 L 859 272.5 M 855.5 268.5 L 860 272.5 L 855.5 276.5" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* ========================================================================= */}
              {/* 3. PROPORTIONAL STAGE CARDS (<foreignObject> for Crisp Responsive UI)   */}
              {/* ========================================================================= */}

              {/* CARD 1: TOTAL PARLIAMENTARY CAP (100% - Height: 280px, y: 40px) */}
              <foreignObject x="15" y="40" width="135" height="280">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-blue-50/50 border-2 border-blue-400 p-3.5 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center mb-2 shadow-xs">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Total Parliamentary Cap
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

              {/* CARD 2: ADMINISTRATIVELY APPROVED (84% - Height: 250px, y: 55px) */}
              <foreignObject x="235" y="55" width="135" height="250">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-cyan-50/50 border-2 border-cyan-400 p-3.5 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-700 flex items-center justify-center mb-2 shadow-xs">
                      <CheckSquare className="w-5 h-5" />
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

              {/* CARD 3: TRANSFERRED TO DISTRICT (76% - Height: 220px, y: 70px) */}
              <foreignObject x="455" y="70" width="135" height="220">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-emerald-50/50 border-2 border-emerald-400 p-3.5 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-2 shadow-xs">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Transferred to District
                    </span>
                  </div>

                  <div className="my-auto">
                    <span className="text-2xl font-black font-display text-slate-900 block tracking-tight">
                      {formatCurrency(released, true)}
                    </span>
                    <span className="text-base font-extrabold text-emerald-600 mt-1 block">
                      76%
                    </span>
                  </div>
                </div>
              </foreignObject>

              {/* CARD 4: GROUND EXPENDITURE (63% - Height: 190px, y: 85px) */}
              <foreignObject x="675" y="85" width="135" height="190">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-indigo-50/50 border-2 border-indigo-400 p-3.5 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center mb-1.5 shadow-xs">
                      <Database className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      Ground Expenditure
                    </span>
                  </div>

                  <div className="my-auto">
                    <span className="text-2xl font-black font-display text-slate-900 block tracking-tight">
                      {formatCurrency(utilized, true)}
                    </span>
                    <span className="text-base font-extrabold text-indigo-600 mt-0.5 block">
                      63%
                    </span>
                  </div>
                </div>
              </foreignObject>

              {/* CARD 5 (TOP-RIGHT): RELEASED (UTILIZED) (Height: 155px, y: 15px, Width: 150px) */}
              <foreignObject x="900" y="15" width="150" height="155">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-rose-50/70 border-2 border-rose-300 p-3 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
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

              {/* CARD 6 (BOTTOM-RIGHT): UNSPENT / UNUTILIZED (Height: 155px, y: 195px, Width: 150px) */}
              <foreignObject x="900" y="195" width="150" height="155">
                <div
                  onClick={() => navigate('/finance')}
                  className="w-full h-full rounded-2xl bg-amber-50/70 border-2 border-amber-300 p-3 flex flex-col justify-between items-center text-center shadow-xs hover:shadow-md transition cursor-pointer box-border"
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
              <span>Total Cap</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span>Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Transferred</span>
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
