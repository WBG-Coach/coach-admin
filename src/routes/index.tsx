import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProtectedLayout } from "../components/Layouts/ProtectedLayout";
import Login from "@/pages/Login";
import DashboardPage from "@/pages/Dashboard";
import CompetenciesPage from "@/pages/Competencies";
import QuestionsPage from "@/pages/Questions";
import SchoolsPage from "@/pages/Schools";
import CoachesPage from "@/pages/Coaches";
import SessionsPage from "@/pages/Sessions";
import SettingsPage from "@/pages/Settings";
import TeachersPage from "@/pages/Teacher";

export const Router = () => {
  const { user } = useContext(UserContext);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {!user ? (
          <>
            <Route path="/" element={<Login />} />
          </>
        ) : (
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="competencies" element={<CompetenciesPage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="schools" element={<SchoolsPage />} />
            <Route path="coaches" element={<CoachesPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="sessions" element={<SessionsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};
