import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./pages/layout";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "./pages/userPanel/dashboard";
import UserProfilePage from "./pages/userPanel/userProfile";
import AdminPanelPage from "./pages/userPanel/AdminPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="userProfile" element={<UserProfilePage />} />
            <Route path="admin" element={<AdminPanelPage />} />
          </Route>
        </Routes>
        <ToastContainer position="top-center" autoClose={2500} hideProgressBar closeOnClick pauseOnHover />
      </BrowserRouter>
    </AuthProvider>
  );
}
