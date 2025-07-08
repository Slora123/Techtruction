import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { JobProvider } from "./context/JobContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeUpload from "./pages/ResumeUpload.jsx";
import ResumeAnalysis from "./pages/ResumeAnalysis.jsx";
import JobMatching from "./pages/JobMatching.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <JobProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:bg-gray-950 dark:text-gray-100">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Landing />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/resume-upload"
            element={user ? <ResumeUpload /> : <Navigate to="/login" />}
          />
          <Route
            path="/resume-analysis"
            element={user ? <ResumeAnalysis /> : <Navigate to="/login" />}
          />
          <Route
            path="/job-matching"
            element={user ? <JobMatching /> : <Navigate to="/login" />}
          />
          <Route
            path="/resume-builder"
            element={user ? <ResumeBuilder /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </JobProvider>
  );
}

export default App;
