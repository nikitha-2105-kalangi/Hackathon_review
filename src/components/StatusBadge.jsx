import React from "react";

// Maps each application status to a CSS badge class and Bootstrap icon
const STATUS_CONFIG = {
  Applied: {
    className: "status-applied",
    icon: "bi-send-fill",
  },
  Interview: {
    className: "status-interview",
    icon: "bi-calendar-event-fill",
  },
  Selected: {
    className: "status-selected",
    icon: "bi-check-circle-fill",
  },
  Rejected: {
    className: "status-rejected",
    icon: "bi-x-circle-fill",
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Applied;

  return (
    <span className={`status-badge ${config.className}`}>
      <i className={`bi ${config.icon}`} aria-hidden="true"></i>
      <span>{status}</span>
    </span>
  );
}

export default StatusBadge;
