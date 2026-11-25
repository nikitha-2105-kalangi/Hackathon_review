import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import {
  calculateStats,
  getApplicationsByUser,
  getCurrentUser,
} from "../utils/storage";

// Reports Page: calculates dynamic application statistics, conversion rates, and charts
function Reports() {
  const currentUser = getCurrentUser();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    setApplications(getApplicationsByUser(currentUser.id));
  }, []);

  const stats = calculateStats(applications);

  // Breakdown by Job Type
  const fullTimeCount = applications.filter(
    (app) => app.jobType === "Full-time"
  ).length;
  const partTimeCount = applications.filter(
    (app) => app.jobType === "Part-time"
  ).length;
  const internshipCount = applications.filter(
    (app) => app.jobType === "Internship"
  ).length;

  // Build SVG Donut chart segments using stroke-dasharray on circles
  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  const statusSegments = [
    { label: "Applied", count: stats.applied, color: "#2563EB" },
    { label: "Interview", count: stats.interview, color: "#7C3AED" },
    { label: "Selected", count: stats.selected, color: "#22C55E" },
    { label: "Rejected", count: stats.rejected, color: "#EF4444" },
  ];

  let cumulativeOffset = 0;

  return (
    <div className="container-fluid px-0">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">Reports &amp; Analytics</h1>
        <p className="text-secondary mb-0">
          Dynamic statistics calculated directly from your saved job applications.
        </p>
      </div>

      {/* Top Statistic Cards */}
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
            title="Interview"
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

      {/* Conversion Rate Highlight Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="jt-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2 className="h5 fw-bold mb-0">Application Success Rate</h2>
              <span
                className="fw-bold fs-4"
                style={{ color: "#22C55E" }}
              >
                {stats.successRate}%
              </span>
            </div>
            <p className="small text-secondary mb-3">
              Percentage of total applications that resulted in an offer / selection (
              {stats.selected} of {stats.total}).
            </p>
            <div className="progress" style={{ height: "12px", backgroundColor: "#F1F5F9" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${stats.successRate}%`,
                  backgroundColor: "#22C55E",
                }}
                aria-valuenow={stats.successRate}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Application success rate"
              ></div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="jt-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h2 className="h5 fw-bold mb-0">Interview Conversion Rate</h2>
              <span
                className="fw-bold fs-4"
                style={{ color: "#7C3AED" }}
              >
                {stats.interviewRate}%
              </span>
            </div>
            <p className="small text-secondary mb-3">
              Percentage of applications that reached the Interview or Selected stage (
              {stats.interview + stats.selected} of {stats.total}).
            </p>
            <div className="progress" style={{ height: "12px", backgroundColor: "#F1F5F9" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${stats.interviewRate}%`,
                  backgroundColor: "#7C3AED",
                }}
                aria-valuenow={stats.interviewRate}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Interview conversion rate"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Breakdown Row */}
      <div className="row g-4">
        {/* Application Status Donut Chart */}
        <div className="col-lg-6">
          <section className="jt-card p-4 h-100">
            <h2 className="h5 fw-bold mb-1">Application Status Chart</h2>
            <p className="text-muted small mb-4">
              Visual distribution of application outcomes
            </p>

            <div className="row align-items-center gy-4">
              <div className="col-sm-6 text-center">
                <svg
                  viewBox="0 0 180 180"
                  className="mx-auto d-block"
                  style={{ maxWidth: "200px" }}
                  role="img"
                  aria-label="Donut chart of application status distribution"
                >
                  {/* Base track circle */}
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="22"
                  />

                  {stats.total > 0 &&
                    statusSegments.map((seg) => {
                      if (seg.count === 0) return null;
                      const fraction = seg.count / stats.total;
                      const dashLength = fraction * circumference;
                      const dashOffset = -cumulativeOffset;
                      cumulativeOffset += dashLength;

                      return (
                        <circle
                          key={seg.label}
                          cx="90"
                          cy="90"
                          r={radius}
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="22"
                          strokeDasharray={`${dashLength} ${circumference}`}
                          strokeDashoffset={dashOffset}
                          transform="rotate(-90 90 90)"
                        />
                      );
                    })}

                  <text
                    x="90"
                    y="86"
                    textAnchor="middle"
                    fontSize="26"
                    fontWeight="800"
                    fill="#1E293B"
                  >
                    {stats.total}
                  </text>
                  <text
                    x="90"
                    y="108"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    fill="#64748B"
                  >
                    TOTAL
                  </text>
                </svg>
              </div>

              <div className="col-sm-6">
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  {statusSegments.map((seg) => {
                    const pct =
                      stats.total > 0
                        ? Math.round((seg.count / stats.total) * 100)
                        : 0;
                    return (
                      <li
                        key={seg.label}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span className="d-flex align-items-center gap-2 small fw-semibold">
                          <span
                            style={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "4px",
                              backgroundColor: seg.color,
                              display: "inline-block",
                            }}
                            aria-hidden="true"
                          ></span>
                          {seg.label}
                        </span>
                        <span className="small text-muted fw-semibold">
                          {seg.count} ({pct}%)
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Job Type & Accessible Summary Table */}
        <div className="col-lg-6">
          <section className="jt-card p-4 h-100">
            <h2 className="h5 fw-bold mb-1">Job Type Breakdown</h2>
            <p className="text-muted small mb-4">
              Applications grouped by employment type
            </p>

            <div className="table-responsive">
              <table className="table jt-table mb-0">
                <caption className="visually-hidden">
                  Job application count and percentage by job type
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Job Type</th>
                    <th scope="col">Applications</th>
                    <th scope="col">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Full-time", count: fullTimeCount },
                    { label: "Part-time", count: partTimeCount },
                    { label: "Internship", count: internshipCount },
                  ].map((row) => {
                    const share =
                      stats.total > 0
                        ? Math.round((row.count / stats.total) * 100)
                        : 0;
                    return (
                      <tr key={row.label}>
                        <td className="fw-semibold">{row.label}</td>
                        <td>{row.count}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px", minWidth: "80px" }}
                            >
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${share}%`,
                                  backgroundColor: "#2563EB",
                                }}
                              ></div>
                            </div>
                            <span className="small text-muted">{share}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Reports;
