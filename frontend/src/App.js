import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AssessmentPage from "./pages/AssessmentPage";
import ReportsPage from "./pages/ReportsPage";
import IndividualReportPage from "./pages/IndividualReportPage";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Check if user is authenticated and retrieve role
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("/api/auth/check-auth");
        setIsAuthenticated(true);
        setUserRole(response.data.role);
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole("");
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<DashboardPage />} />
        {isAuthenticated ? (
          <>
            <Route
              path="/dashboard"
              element={
                userRole === "admin" ? (
                  <DashboardPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/assessment"
              element={
                userRole === "teacher" ? (
                  <AssessmentPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/reports"
              element={
                userRole === "teacher" ? (
                  <ReportsPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/individual-report/:studentId"
              element={<IndividualReportPage />}
            />
          </>
        ) : (
          <Navigate to="/login" />
        )}
      </Routes>
    </Router>
  );
}

export default App;
