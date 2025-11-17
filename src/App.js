import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./pages/layout";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "./pages/userPanel/dashboard";
import UserProfilePage from "./pages/userPanel/userProfile";

function AppRoutes() {
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
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;