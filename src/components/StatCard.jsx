import React from "react";

// Reusable KPI statistic card used on Dashboard, Reports, and Admin pages
function StatCard({ title, value, icon, color = "blue", subtitle }) {
  // Color themes matched to the JobTrack design palette
  const themes = {
    blue: {
      bg: "#EFF6FF",
      text: "#2563EB",
    },
    purple: {
      bg: "#F5F3FF",
      text: "#7C3AED",
    },
    green: {
      bg: "#F0FDF4",
      text: "#22C55E",
    },
    red: {
      bg: "#FEF2F2",
      text: "#EF4444",
    },
    slate: {
      bg: "#F1F5F9",
      text: "#1E293B",
    },
  };

  const theme = themes[color] || themes.blue;

  return (
    <div className="jt-card jt-card-hover p-3 p-md-4 h-100">
      <div className="d-flex align-items-center justify-content-between gap-3">
        <div>
          <p className="text-muted small fw-semibold mb-1">{title}</p>
          <p className="h3 fw-bold mb-0" style={{ color: "#1E293B" }}>
            {value}
          </p>
          {subtitle && (
            <p className="text-muted small mb-0 mt-1">{subtitle}</p>
          )}
        </div>
        <div
          className="jt-stat-icon"
          style={{ backgroundColor: theme.bg, color: theme.text }}
          aria-hidden="true"
        >
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
