import React, { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddJob from "./pages/AddJob";
import Reminders from "./pages/Reminders";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { getCurrentUser } from "./utils/storage";

// Wrapper layout for authenticated normal-user pages.
// Keeps the vertical Sidebar permanent while rendering one page at a time inside <Outlet />.
function DashboardLayout() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="jt-app-shell">
      <a href="#dashboard-main" className="skip-link">
        Skip to main content
      </a>
      <Sidebar />
      <main id="dashboard-main" tabIndex="-1" className="jt-main-area p-3 p-md-4 p-lg-5">
        <Outlet />
      </main>
    </div>
  );
}

// Route guard for the separate Admin Dashboard
function AdminRoute({ children }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  // Simple state trigger so Sidebar updates immediately when Profile edits user details
  const [, setProfileVersion] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Dashboard Pages (each rendered on its own separate page) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/profile"
            element={
              <Profile
                onUserUpdate={() => setProfileVersion((count) => count + 1)}
              />
            }
          />
        </Route>

        {/* Separate Admin Page */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
