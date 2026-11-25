import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import {
  calculateStats,
  getApplicationsByUser,
  getCurrentUser,
  getRemindersByUser,
  loadSampleDataForUser,
} from "../utils/storage";

// Main Dashboard Page showing summary KPIs, charts, recent applications, and upcoming interviews
function Dashboard() {
  const currentUser = getCurrentUser();
  const [applications, setApplications] = useState([]);
  const [reminders, setReminders] = useState([]);

  function loadDashboardData() {
    if (!currentUser) return;
    setApplications(getApplicationsByUser(currentUser.id));
    setReminders(getRemindersByUser(currentUser.id));
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  const stats = calculateStats(applications);

  // Sort recent applications by date (newest first) and take up to 5
  const recentApplications = [...applications]
    .sort((a, b) => (b.applicationDate || "").localeCompare(a.applicationDate || ""))
    .slice(0, 5);

  // Filter applications currently in Interview stage
  const interviewApplications = applications.filter(
    (app) => app.status === "Interview"
  );

  // Filter upcoming (incomplete) Interview reminders
  const upcomingInterviewReminders = reminders
    .filter((rem) => !rem.completed && rem.type === "Interview")
    .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

  // Data for the simple SVG bar chart
  const chartBars = [
    { label: "Applied", count: stats.applied, color: "#2563EB" },
    { label: "Interview", count: stats.interview, color: "#7C3AED" },
    { label: "Selected", count: stats.selected, color: "#22C55E" },
    { label: "Rejected", count: stats.rejected, color: "#EF4444" },
  ];

  const maxBarValue = Math.max(1, ...chartBars.map((item) => item.count));

  function handleLoadSample() {
    if (!currentUser) return;
    loadSampleDataForUser(currentUser.id);
    loadDashboardData();
  }

  return (
    <div className="container-fluid px-0">
      {/* Header Row */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">Welcome back!</h1>
          <p className="text-secondary mb-0">
            Here is your job search summary,{" "}
            <span className="fw-semibold text-dark">{currentUser?.fullName}</span>.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {applications.length === 0 && (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleLoadSample}
            >
              <i className="bi bi-magic me-2" aria-hidden="true"></i>
              Load Sample Data
            </button>
          )}
          <Link to="/add-job" className="btn btn-primary">
            <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
            Add Job
          </Link>
        </div>
      </div>

      {/* 5 Statistic Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-5 g-3 mb-4">
        <div className="col">
          <StatCard
            title="Total Applications"
            value={stats.total}
            icon="bi-folder2-open"
            color="slate"
          />
        </div>
        <div className="col">
          <StatCard
            title="Applied"
            value={stats.applied}
            icon="bi-send-fill"
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
            icon="bi-trophy-fill"
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

      {/* Charts & Status Overview Row */}
      <div className="row g-4 mb-4">
        {/* Application Progress Chart */}
        <div className="col-lg-7">
          <section className="jt-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h2 className="h5 fw-bold mb-0">Application Progress Chart</h2>
                <p className="text-muted small mb-0">
                  Live distribution across each hiring stage
                </p>
              </div>
              <Link to="/reports" className="small fw-semibold text-decoration-none">
                Full Reports &rarr;
              </Link>
            </div>

            <div className="pt-2">
              <svg
                viewBox="0 0 460 220"
                className="w-100 h-auto d-block"
                role="img"
                aria-label="Bar chart showing application counts by status"
              >
                {/* Horizontal grid lines */}
                <line x1="40" y1="30" x2="430" y2="30" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="80" x2="430" y2="80" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="130" x2="430" y2="130" stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="40" y1="180" x2="430" y2="180" stroke="#CBD5E1" strokeWidth="1.5" />

                {chartBars.map((bar, index) => {
                  const barWidth = 52;
                  const x = 68 + index * 96;
                  const maxBarHeight = 135;
                  const barHeight = Math.round((bar.count / maxBarValue) * maxBarHeight);
                  const y = 180 - barHeight;

                  return (
                    <g key={bar.label}>
                      {/* Background track */}
                      <rect
                        x={x}
                        y={45}
                        width={barWidth}
                        height={maxBarHeight}
                        rx="8"
                        fill="#F1F5F9"
                      />
                      {/* Actual value bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={Math.max(barHeight, bar.count > 0 ? 6 : 0)}
                        rx="8"
                        fill={bar.color}
                      />
                      {/* Count label */}
                      <text
                        x={x + barWidth / 2}
                        y={Math.max(24, y - 8)}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="700"
                        fill="#1E293B"
                      >
                        {bar.count}
                      </text>
                      {/* Axis label */}
                      <text
                        x={x + barWidth / 2}
                        y="204"
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="600"
                        fill="#64748B"
                      >
                        {bar.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </section>
        </div>

        {/* Application Status Overview */}
        <div className="col-lg-5">
          <section className="jt-card p-4 h-100">
            <h2 className="h5 fw-bold mb-1">Application Status Overview</h2>
            <p className="text-muted small mb-4">
              Share of applications in each category
            </p>

            <div className="d-flex flex-column gap-3">
              {chartBars.map((item) => {
                const percent =
                  stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;

                return (
                  <div key={item.label}>
                    <div className="d-flex justify-content-between small fw-semibold mb-1">
                      <span>{item.label}</span>
                      <span className="text-muted">
                        {item.count} ({percent}%)
                      </span>
                    </div>
                    <div className="progress" style={{ height: "10px", backgroundColor: "#F1F5F9" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: item.color,
                        }}
                        aria-valuenow={percent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${item.label} percentage`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-top d-flex justify-content-between text-center">
              <div>
                <p className="small text-muted mb-0">Interview Rate</p>
                <p className="h5 fw-bold mb-0" style={{ color: "#7C3AED" }}>
                  {stats.interviewRate}%
                </p>
              </div>
              <div>
                <p className="small text-muted mb-0">Selection Rate</p>
                <p className="h5 fw-bold mb-0" style={{ color: "#22C55E" }}>
                  {stats.successRate}%
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Recent Applications & Upcoming Interviews Row */}
      <div className="row g-4">
        {/* Recent Applications */}
        <div className="col-lg-7">
          <section className="jt-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 fw-bold mb-0">Recent Applications</h2>
              <Link to="/applications" className="small fw-semibold text-decoration-none">
                View All &rarr;
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-briefcase fs-1 text-muted d-block mb-2" aria-hidden="true"></i>
                <p className="text-secondary mb-3">
                  You haven&apos;t added any job applications yet.
                </p>
                <Link to="/add-job" className="btn btn-sm btn-primary">
                  Add Your First Job
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table jt-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Company</th>
                      <th scope="col">Role</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map((app) => (
                      <tr key={app.id}>
                        <td className="fw-semibold">{app.companyName}</td>
                        <td>{app.jobRole}</td>
                        <td className="text-muted small">{app.applicationDate}</td>
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
        </div>

        {/* Upcoming Interviews */}
        <div className="col-lg-5">
          <section className="jt-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 fw-bold mb-0">Upcoming Interviews</h2>
              <Link to="/reminders" className="small fw-semibold text-decoration-none">
                Reminders &rarr;
              </Link>
            </div>

            {interviewApplications.length === 0 &&
            upcomingInterviewReminders.length === 0 ? (
              <div className="text-center py-4">
                <i
                  className="bi bi-calendar2-check fs-1 text-muted d-block mb-2"
                  aria-hidden="true"
                ></i>
                <p className="text-secondary small mb-0">
                  No active interviews or interview reminders yet.
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {upcomingInterviewReminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-3 rounded-3 border bg-light d-flex justify-content-between align-items-start gap-2"
                  >
                    <div>
                      <span className="badge rounded-pill text-bg-primary mb-1">
                        Reminder
                      </span>
                      <p className="fw-semibold mb-0">{rem.title}</p>
                      {rem.notes && (
                        <p className="small text-muted mb-0">{rem.notes}</p>
                      )}
                    </div>
                    <span className="small fw-semibold text-nowrap text-primary">
                      {rem.date}
                    </span>
                  </div>
                ))}

                {interviewApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 rounded-3 border d-flex justify-content-between align-items-start gap-2"
                  >
                    <div>
                      <p className="fw-semibold mb-0">{app.companyName}</p>
                      <p className="small text-secondary mb-0">{app.jobRole}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
