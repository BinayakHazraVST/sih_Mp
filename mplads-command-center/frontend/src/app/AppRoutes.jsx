import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Login } from '../features/auth/Login';
import { Dashboard } from '../features/dashboard/Dashboard';
import { Projects } from '../features/projects/Projects';
import { ProjectDetails } from '../features/projects/ProjectDetails';
import { ProjectCreate } from '../features/projects/ProjectCreate';
import { FinancialOverview } from '../features/finance/FinancialOverview';
import { ConstituencyMap } from '../features/geography/ConstituencyMap';
import { Planning } from '../features/planning/Planning';
import { Contractors } from '../features/contractors/Contractors';
import { Beneficiaries } from '../features/beneficiaries/Beneficiaries';
import { CitizenFeedback } from '../features/feedback/CitizenFeedback';
import { Reports } from '../features/reports/Reports';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

        {/* Projects */}
        <Route path={ROUTES.PROJECTS} element={<Projects />} />
        <Route path={ROUTES.PROJECT_CREATE} element={<ProjectCreate />} />
        <Route path={ROUTES.PROJECT_DETAILS} element={<ProjectDetails />} />

        {/* Finance */}
        <Route path={ROUTES.FINANCE} element={<FinancialOverview />} />
        <Route path={ROUTES.FUND_UTILIZATION} element={<FinancialOverview />} />
        <Route path={ROUTES.EXPENDITURE} element={<FinancialOverview />} />

        {/* Geography */}
        <Route path={ROUTES.GEOGRAPHY} element={<ConstituencyMap />} />
        <Route path={ROUTES.DEVELOPMENT_GAPS} element={<ConstituencyMap />} />

        {/* Planning */}
        <Route path={ROUTES.PLANNING} element={<Planning />} />
        <Route path={ROUTES.PROPOSALS} element={<Planning />} />
        <Route path={ROUTES.PRIORITY_ANALYSIS} element={<Planning />} />

        {/* Contractors */}
        <Route path={ROUTES.CONTRACTORS} element={<Contractors />} />
        <Route path={ROUTES.CONTRACTOR_DETAILS} element={<Contractors />} />

        {/* Beneficiaries, Feedback & Reports */}
        <Route path={ROUTES.BENEFICIARIES} element={<Beneficiaries />} />
        <Route path={ROUTES.FEEDBACK} element={<CitizenFeedback />} />
        <Route path={ROUTES.REPORTS} element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};
