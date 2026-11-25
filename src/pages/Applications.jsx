import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ApplicationCard from "../components/ApplicationCard";
import StatusBadge from "../components/StatusBadge";
import {
  getApplications,
  getApplicationsByUser,
  getCurrentUser,
  saveApplications,
} from "../utils/storage";

// My Applications Page: view, search, filter, edit, delete, and update status
function Applications() {
  const currentUser = getCurrentUser();

  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table");

  // Edit modal state
  const editDialogRef = useRef(null);
  const [editingApp, setEditingApp] = useState(null);
  const [editError, setEditError] = useState("");

  // Delete confirmation modal state
  const deleteDialogRef = useRef(null);
  const [deletingAppId, setDeletingAppId] = useState(null);

  const [statusMessage, setStatusMessage] = useState("");

  function loadUserApplications() {
    if (!currentUser) return;
    setApplications(getApplicationsByUser(currentUser.id));
  }

  useEffect(() => {
    loadUserApplications();
  }, []);

  // Filter applications by search query (company or role) and status
  const filteredApplications = applications.filter((app) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      app.companyName.toLowerCase().includes(query) ||
      app.jobRole.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Update application status immediately and persist to LocalStorage
  function handleStatusChange(appId, newStatus) {
    const allApps = getApplications();
    const updatedAll = allApps.map((app) =>
      app.id === appId ? { ...app, status: newStatus } : app
    );
    saveApplications(updatedAll);
    loadUserApplications();
    setStatusMessage(`Application status updated to "${newStatus}".`);
  }

  // Open Edit Modal using native <dialog>.showModal()
  function handleOpenEdit(app) {
    setEditingApp({ ...app });
    setEditError("");
    editDialogRef.current?.showModal();
  }

  function handleCloseEdit() {
    editDialogRef.current?.close();
    setEditingApp(null);
  }

  function handleSaveEdit(event) {
    event.preventDefault();
    if (!editingApp) return;

    if (
      !editingApp.companyName.trim() ||
      !editingApp.jobRole.trim() ||
      !editingApp.location.trim()
    ) {
      setEditError("Company Name, Job Role, and Location are required.");
      return;
    }

    const allApps = getApplications();
    const updatedAll = allApps.map((app) =>
      app.id === editingApp.id
        ? {
            ...editingApp,
            companyName: editingApp.companyName.trim(),
            jobRole: editingApp.jobRole.trim(),
            location: editingApp.location.trim(),
          }
        : app
    );

    saveApplications(updatedAll);
    loadUserApplications();
    handleCloseEdit();
    setStatusMessage("Application details updated successfully.");
  }

  // Open Delete Confirmation Modal
  function handleRequestDelete(appId) {
    setDeletingAppId(appId);
    deleteDialogRef.current?.showModal();
  }

  function handleConfirmDelete() {
    if (!deletingAppId) return;
    const allApps = getApplications();
    const remaining = allApps.filter((app) => app.id !== deletingAppId);
    saveApplications(remaining);
    loadUserApplications();
    deleteDialogRef.current?.close();
    setDeletingAppId(null);
    setStatusMessage("Application deleted.");
  }

  return (
    <div className="container-fluid px-0">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">My Applications</h1>
          <p className="text-secondary mb-0">
            Search, filter, update statuses, and manage all saved applications.
          </p>
        </div>

        <Link to="/add-job" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
          Add New Job
        </Link>
      </div>

      {statusMessage && (
        <div
          className="alert alert-success alert-dismissible fade show py-2 small"
          role="status"
        >
          <i className="bi bi-check-circle-fill me-2" aria-hidden="true"></i>
          {statusMessage}
          <button
            type="button"
            className="btn-close btn-sm"
            aria-label="Dismiss notification"
            onClick={() => setStatusMessage("")}
          ></button>
        </div>
      )}

      {/* Search, Filter, and View Switcher Toolbar */}
      <div className="jt-card p-3 p-md-4 mb-4">
        <search>
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label htmlFor="searchApplications" className="form-label small">
                Search by Company or Role
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted" aria-hidden="true"></i>
                </span>
                <input
                  id="searchApplications"
                  type="search"
                  className="form-control"
                  placeholder="e.g. Stripe or Frontend Developer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="col-sm-6 col-md-3">
              <label htmlFor="statusFilter" className="form-label small">
                Filter by Status
              </label>
              <select
                id="statusFilter"
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="col-sm-6 col-md-4 d-flex justify-content-md-end align-items-center gap-2">
              <span className="small text-muted me-auto me-md-2">
                Showing <strong>{filteredApplications.length}</strong> of{" "}
                {applications.length}
              </span>

              <div className="btn-group" role="group" aria-label="View layout toggle">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    viewMode === "table" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setViewMode("table")}
                >
                  <i className="bi bi-table me-1" aria-hidden="true"></i>
                  Table
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    viewMode === "cards" ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setViewMode("cards")}
                >
                  <i className="bi bi-grid me-1" aria-hidden="true"></i>
                  Cards
                </button>
              </div>
            </div>
          </div>
        </search>
      </div>

      {/* Empty State */}
      {filteredApplications.length === 0 ? (
        <div className="jt-card p-5 text-center">
          <i className="bi bi-inbox fs-1 text-muted d-block mb-2" aria-hidden="true"></i>
          <h2 className="h5 fw-bold mb-2">No matching applications found</h2>
          <p className="text-secondary small mb-3">
            {applications.length === 0
              ? "Add your first job application to start tracking your progress."
              : "Try clearing your search text or selecting 'All Statuses'."}
          </p>
          {applications.length === 0 ? (
            <Link to="/add-job" className="btn btn-primary">
              Add Job Application
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : viewMode === "cards" ? (
        /* Card Layout */
        <div className="row g-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="col-md-6 col-xl-4">
              <ApplicationCard
                application={app}
                onEdit={handleOpenEdit}
                onDelete={handleRequestDelete}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Responsive Table Layout */
        <div className="jt-card overflow-hidden">
          <div className="table-responsive">
            <table className="table jt-table mb-0">
              <thead>
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">Job Role</th>
                  <th scope="col">Location</th>
                  <th scope="col">Applied Date</th>
                  <th scope="col">Job Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Notes</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div className="fw-bold">{app.companyName}</div>
                      {app.jobLink && (
                        <a
                          href={app.jobLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="small text-decoration-none"
                        >
                          Job Link{" "}
                          <i
                            className="bi bi-box-arrow-up-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      )}
                    </td>
                    <td className="fw-medium">{app.jobRole}</td>
                    <td className="text-muted small">{app.location}</td>
                    <td className="text-muted small text-nowrap">
                      {app.applicationDate}
                    </td>
                    <td>
                      <span className="badge text-bg-light border">
                        {app.jobType}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <StatusBadge status={app.status} />
                        <select
                          aria-label={`Update status for ${app.companyName}`}
                          className="form-select form-select-sm mt-1"
                          style={{ minWidth: "120px" }}
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value)
                          }
                        >
                          <option value="Applied">Applied</option>
                          <option value="Interview">Interview</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </td>
                    <td className="small text-secondary" style={{ maxWidth: "220px" }}>
                      {app.notes || "—"}
                    </td>
                    <td className="text-end text-nowrap">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleOpenEdit(app)}
                        aria-label={`Edit ${app.companyName}`}
                      >
                        <i className="bi bi-pencil" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRequestDelete(app.id)}
                        aria-label={`Delete ${app.companyName}`}
                      >
                        <i className="bi bi-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Native Accessible Edit Dialog */}
      <dialog
        ref={editDialogRef}
        className="jt-dialog"
        aria-labelledby="editDialogTitle"
      >
        {editingApp && (
          <form onSubmit={handleSaveEdit} className="p-4">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <h2 id="editDialogTitle" className="h5 fw-bold mb-0">
                Edit Application
              </h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Close edit dialog"
                onClick={handleCloseEdit}
              ></button>
            </div>

            {editError && (
              <div className="alert alert-danger py-2 small" role="alert">
                {editError}
              </div>
            )}

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="editCompany" className="form-label small">
                  Company Name
                </label>
                <input
                  id="editCompany"
                  type="text"
                  className="form-control"
                  value={editingApp.companyName}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, companyName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="editRole" className="form-label small">
                  Job Role
                </label>
                <input
                  id="editRole"
                  type="text"
                  className="form-control"
                  value={editingApp.jobRole}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, jobRole: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="editLocation" className="form-label small">
                  Location
                </label>
                <input
                  id="editLocation"
                  type="text"
                  className="form-control"
                  value={editingApp.location}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, location: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="editDate" className="form-label small">
                  Application Date
                </label>
                <input
                  id="editDate"
                  type="date"
                  className="form-control"
                  value={editingApp.applicationDate}
                  onChange={(e) =>
                    setEditingApp({
                      ...editingApp,
                      applicationDate: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="editType" className="form-label small">
                  Job Type
                </label>
                <select
                  id="editType"
                  className="form-select"
                  value={editingApp.jobType}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, jobType: e.target.value })
                  }
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="editStatus" className="form-label small">
                  Application Status
                </label>
                <select
                  id="editStatus"
                  className="form-select"
                  value={editingApp.status}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, status: e.target.value })
                  }
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="col-12">
                <label htmlFor="editLink" className="form-label small">
                  Job Link
                </label>
                <input
                  id="editLink"
                  type="url"
                  className="form-control"
                  value={editingApp.jobLink || ""}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, jobLink: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
                <label htmlFor="editNotes" className="form-label small">
                  Notes
                </label>
                <textarea
                  id="editNotes"
                  rows="3"
                  className="form-control"
                  value={editingApp.notes || ""}
                  onChange={(e) =>
                    setEditingApp({ ...editingApp, notes: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleCloseEdit}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </dialog>

      {/* Native Accessible Delete Confirmation Dialog */}
      <dialog
        ref={deleteDialogRef}
        className="jt-dialog"
        style={{ width: "min(420px, 92vw)" }}
        aria-labelledby="deleteDialogTitle"
      >
        <div className="p-4">
          <h2 id="deleteDialogTitle" className="h5 fw-bold mb-2">
            Delete Application?
          </h2>
          <p className="text-secondary small mb-4">
            Are you sure you want to remove this job application? This action
            cannot be undone.
          </p>
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                deleteDialogRef.current?.close();
                setDeletingAppId(null);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Applications;
