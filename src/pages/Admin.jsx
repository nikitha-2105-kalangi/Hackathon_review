import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import {
  calculateStats,
  clearCurrentUser,
  getApplications,
  getCurrentUser,
  getReminders,
  getUsers,
  saveApplications,
  saveReminders,
  saveUsers,
} from "../utils/storage";

// Separate Admin Dashboard for managing registered users and inspecting platform applications
function Admin() {
  const navigate = useNavigate();
  const currentAdmin = getCurrentUser();

  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function loadAdminData() {
    setUsers(getUsers());
    setApplications(getApplications());
  }

  useEffect(() => {
    loadAdminData();
  }, []);

  function handleLogout() {
    clearCurrentUser();
    navigate("/");
  }

  // Delete a registered user and clean up their applications & reminders
  function handleDeleteUser(userId, userName) {
    if (userId === currentAdmin?.id) {
      return;
    }

    const updatedUsers = getUsers().filter((u) => u.id !== userId);
    const updatedApps = getApplications().filter((a) => a.userId !== userId);
    const updatedReminders = getReminders().filter((r) => r.userId !== userId);

    saveUsers(updatedUsers);
    saveApplications(updatedApps);
    saveReminders(updatedReminders);
    loadAdminData();
    setStatusMessage(`User "${userName}" and their saved data were removed.`);
  }

  const stats = calculateStats(applications);

  // Map userId -> fullName for showing application owner
  const userLookup = {};
  users.forEach((user) => {
    userLookup[user.id] = user.fullName;
  });

  // Count applications per user
  const appCountByUser = {};
  applications.forEach((app) => {
    appCountByUser[app.userId] = (appCountByUser[app.userId] || 0) + 1;
  });

  const filteredApplications = applications.filter((app) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    const owner = (userLookup[app.userId] || "").toLowerCase();
    return (
      app.companyName.toLowerCase().includes(q) ||
      app.jobRole.toLowerCase().includes(q) ||
      owner.includes(q)
    );
  });

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Dedicated Admin Top Navbar (kept separate from normal user pages) */}
      <header className="bg-white border-bottom sticky-top">
        <div className="container py-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="jt-brand-icon" aria-hidden="true">
              <i className="bi bi-shield-lock-fill"></i>
            </span>
            <div>
              <span className="fw-bold fs-5 d-block lh-1">JobTrack Admin</span>
              <span className="small text-muted">Management Console</span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className="small text-muted d-none d-sm-inline">
              Signed in as <strong>{currentAdmin?.username || "admin"}</strong>
            </span>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1" aria-hidden="true"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container py-4 py-lg-5 flex-grow-1">
        <div className="mb-4">
          <h1 className="h2 fw-bold mb-1">Admin Dashboard</h1>
          <p className="text-secondary mb-0">
            Monitor registered users, total applications, and platform-wide statistics.
          </p>
        </div>

        {statusMessage && (
          <div
            className="alert alert-success alert-dismissible fade show py-2 small"
            role="status"
          >
            {statusMessage}
            <button
              type="button"
              className="btn-close btn-sm"
              aria-label="Dismiss notification"
              onClick={() => setStatusMessage("")}
            ></button>
          </div>
        )}

        {/* Admin Summary Cards */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-5 g-3 mb-4">
          <div className="col">
            <StatCard
              title="Total Users"
              value={users.length}
              icon="bi-people-fill"
              color="slate"
            />
          </div>
          <div className="col">
            <StatCard
              title="Total Applications"
              value={stats.total}
              icon="bi-briefcase-fill"
              color="blue"
            />
          </div>
          <div className="col">
            <StatCard
              title="Interviews"
              value={stats.interview}
              icon="bi-calendar-event-fill"
              color="purple"
            />
          </div>
          <div className="col">
            <StatCard
              title="Selected"
              value={stats.selected}
              icon="bi-check-circle-fill"
              color="green"
            />
          </div>
          <div className="col">
            <StatCard
              title="Rejected"
              value={stats.rejected}
              icon="bi-x-circle-fill"
              color="red"
            />
          </div>
        </div>

        {/* Admin Section Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Admin sections">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "users"}
            className={`btn ${
              activeTab === "users" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <i className="bi bi-people me-2" aria-hidden="true"></i>
            Registered Users ({users.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "applications"}
            className={`btn ${
              activeTab === "applications"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("applications")}
          >
            <i className="bi bi-briefcase me-2" aria-hidden="true"></i>
            Job Applications ({applications.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "statistics"}
            className={`btn ${
              activeTab === "statistics"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("statistics")}
          >
            <i className="bi bi-bar-chart me-2" aria-hidden="true"></i>
            Application Statistics
          </button>
        </div>

        {/* Tab 1: Registered Users */}
        {activeTab === "users" && (
          <section className="jt-card overflow-hidden">
            <div className="p-4 border-bottom">
              <h2 className="h5 fw-bold mb-0">Registered Users</h2>
            </div>
            <div className="table-responsive">
              <table className="table jt-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Applications</th>
                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-semibold">{user.fullName}</td>
                      <td>@{user.username}</td>
                      <td className="text-muted">{user.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "text-bg-dark"
                              : "text-bg-primary"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>{appCountByUser[user.id] || 0}</td>
                      <td className="text-end">
                        {user.role === "admin" ? (
                          <span className="small text-muted">Protected</span>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDeleteUser(user.id, user.fullName)
                            }
                          >
                            <i className="bi bi-trash me-1" aria-hidden="true"></i>
                            Delete User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 2: All Job Applications */}
        {activeTab === "applications" && (
          <section className="jt-card overflow-hidden">
            <div className="p-4 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <h2 className="h5 fw-bold mb-0">All Saved Job Applications</h2>
              <input
                type="search"
                className="form-control"
                style={{ maxWidth: "320px" }}
                placeholder="Search by company, role, or applicant..."
                aria-label="Search platform applications"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {filteredApplications.length === 0 ? (
              <div className="p-5 text-center text-secondary">
                No job applications found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table jt-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Applicant</th>
                      <th scope="col">Company</th>
                      <th scope="col">Role</th>
                      <th scope="col">Type</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app.id}>
                        <td className="fw-medium">
                          {userLookup[app.userId] || "Unknown User"}
                        </td>
                        <td className="fw-bold">{app.companyName}</td>
                        <td>{app.jobRole}</td>
                        <td>{app.jobType}</td>
                        <td className="text-muted small">
                          {app.applicationDate}
                        </td>
                        <td>
                          <StatusBadge status={app.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Tab 3: Platform Application Statistics */}
        {activeTab === "statistics" && (
          <section className="jt-card p-4">
            <h2 className="h5 fw-bold mb-1">Platform Application Statistics</h2>
            <p className="text-muted small mb-4">
              Aggregated metrics across all registered users
            </p>

            <div className="row g-4">
              <div className="col-md-6">
                {[
                  { label: "Applied", count: stats.applied, color: "#2563EB" },
                  { label: "Interview", count: stats.interview, color: "#7C3AED" },
                  { label: "Selected", count: stats.selected, color: "#22C55E" },
                  { label: "Rejected", count: stats.rejected, color: "#EF4444" },
                ].map((item) => {
                  const pct =
                    stats.total > 0
                      ? Math.round((item.count / stats.total) * 100)
                      : 0;
                  return (
                    <div key={item.label} className="mb-3">
                      <div className="d-flex justify-content-between small fw-semibold mb-1">
                        <span>{item.label}</span>
                        <span>
                          {item.count} ({pct}%)
                        </span>
                      </div>
                      <div className="progress" style={{ height: "12px" }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="col-md-6">
                <div className="p-4 rounded-4 bg-light border h-100 d-flex flex-column justify-content-center gap-3">
                  <div>
                    <p className="small text-muted mb-0">
                      Platform Interview Conversion Rate
                    </p>
                    <p className="h3 fw-bold mb-0" style={{ color: "#7C3AED" }}>
                      {stats.interviewRate}%
                    </p>
                  </div>
                  <div>
                    <p className="small text-muted mb-0">
                      Platform Offer / Selection Rate
                    </p>
                    <p className="h3 fw-bold mb-0" style={{ color: "#22C55E" }}>
                      {stats.successRate}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Admin;
