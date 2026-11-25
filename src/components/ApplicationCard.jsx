import React from "react";
import StatusBadge from "./StatusBadge";

// Reusable card displaying a single job application with status update, edit, and delete controls
function ApplicationCard({ application, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="jt-card jt-card-hover p-4 h-100 d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
        <div>
          <h3 className="h5 fw-bold mb-1">{application.companyName}</h3>
          <p className="text-primary fw-semibold mb-0">{application.jobRole}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="d-flex flex-wrap gap-3 small text-muted mb-3">
        <span>
          <i className="bi bi-geo-alt me-1" aria-hidden="true"></i>
          {application.location}
        </span>
        <span>
          <i className="bi bi-briefcase me-1" aria-hidden="true"></i>
          {application.jobType}
        </span>
        <span>
          <i className="bi bi-calendar3 me-1" aria-hidden="true"></i>
          {application.applicationDate}
        </span>
      </div>

      {application.notes && (
        <p className="small text-secondary mb-3 flex-grow-1">
          {application.notes}
        </p>
      )}

      {!application.notes && <div className="flex-grow-1"></div>}

      {application.jobLink && (
        <div className="mb-3">
          <a
            href={application.jobLink}
            target="_blank"
            rel="noopener noreferrer"
            className="small fw-semibold text-decoration-none"
          >
            <i className="bi bi-box-arrow-up-right me-1" aria-hidden="true"></i>
            View Job Posting
          </a>
        </div>
      )}

      <div className="pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center gap-2">
          <label
            htmlFor={`card-status-${application.id}`}
            className="small text-muted mb-0"
          >
            Status:
          </label>
          <select
            id={`card-status-${application.id}`}
            className="form-select form-select-sm"
            style={{ width: "auto" }}
            value={application.status}
            onChange={(e) => onStatusChange(application.id, e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(application)}
            aria-label={`Edit ${application.companyName} application`}
          >
            <i className="bi bi-pencil me-1" aria-hidden="true"></i>
            Edit
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(application.id)}
            aria-label={`Delete ${application.companyName} application`}
          >
            <i className="bi bi-trash me-1" aria-hidden="true"></i>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default ApplicationCard;
