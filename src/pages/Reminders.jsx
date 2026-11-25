import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  getReminders,
  getRemindersByUser,
  saveReminders,
} from "../utils/storage";

// Reminders Page: add, view, complete, and delete job search reminders
function Reminders() {
  const currentUser = getCurrentUser();
  const today = new Date().toISOString().split("T")[0];

  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today);
  const [type, setType] = useState("Follow-up");
  const [notes, setNotes] = useState("");
  const [filterMode, setFilterMode] = useState("all");
  const [formError, setFormError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  function loadUserReminders() {
    if (!currentUser) return;
    const list = getRemindersByUser(currentUser.id).sort((a, b) =>
      (a.date || "").localeCompare(b.date || "")
    );
    setReminders(list);
  }

  useEffect(() => {
    loadUserReminders();
  }, []);

  function handleAddReminder(event) {
    event.preventDefault();
    setFormError("");
    setStatusMessage("");

    if (!title.trim() || !date) {
      setFormError("Please enter a reminder title and select a date.");
      return;
    }

    const newReminder = {
      id: `rem-${Date.now()}`,
      userId: currentUser.id,
      title: title.trim(),
      date,
      type,
      notes: notes.trim(),
      completed: false,
    };

    const allReminders = getReminders();
    saveReminders([...allReminders, newReminder]);
    loadUserReminders();

    setTitle("");
    setDate(today);
    setType("Follow-up");
    setNotes("");
    setStatusMessage("Reminder added successfully.");
  }

  function handleToggleComplete(reminderId) {
    const allReminders = getReminders();
    const updated = allReminders.map((rem) =>
      rem.id === reminderId ? { ...rem, completed: !rem.completed } : rem
    );
    saveReminders(updated);
    loadUserReminders();
  }

  function handleDeleteReminder(reminderId) {
    const allReminders = getReminders();
    const remaining = allReminders.filter((rem) => rem.id !== reminderId);
    saveReminders(remaining);
    loadUserReminders();
    setStatusMessage("Reminder deleted.");
  }

  const visibleReminders = reminders.filter((rem) => {
    if (filterMode === "upcoming") return !rem.completed;
    if (filterMode === "completed") return rem.completed;
    return true;
  });

  const typeBadgeColor = {
    "Follow-up": { bg: "#DBEAFE", color: "#1D4ED8" },
    Interview: { bg: "#EDE9FE", color: "#6D28D9" },
    "Application Deadline": { bg: "#FEE2E2", color: "#B91C1C" },
    Other: { bg: "#F1F5F9", color: "#334155" },
  };

  return (
    <div className="container-fluid px-0">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">Reminders</h1>
        <p className="text-secondary mb-0">
          Stay ahead of follow-ups, scheduled interviews, and application deadlines.
        </p>
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

      <div className="row g-4">
        {/* Add Reminder Form */}
        <div className="col-lg-4">
          <section className="jt-card p-4">
            <h2 className="h5 fw-bold mb-3">Add New Reminder</h2>

            {formError && (
              <div className="alert alert-danger py-2 small" role="alert">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddReminder} noValidate>
              <div className="mb-3">
                <label htmlFor="reminderTitle" className="form-label small">
                  Reminder Title <span className="text-danger">*</span>
                </label>
                <input
                  id="reminderTitle"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Follow up with HR at Stripe"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="reminderDate" className="form-label small">
                  Reminder Date <span className="text-danger">*</span>
                </label>
                <input
                  id="reminderDate"
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="reminderType" className="form-label small">
                  Reminder Type
                </label>
                <select
                  id="reminderType"
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Follow-up">Follow-up</option>
                  <option value="Interview">Interview</option>
                  <option value="Application Deadline">
                    Application Deadline
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="reminderNotes" className="form-label small">
                  Notes
                </label>
                <textarea
                  id="reminderNotes"
                  rows="3"
                  className="form-control"
                  placeholder="Meeting link, questions to ask, or checklist..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                <i className="bi bi-plus-circle me-2" aria-hidden="true"></i>
                Add Reminder
              </button>
            </form>
          </section>
        </div>

        {/* Reminders Card List */}
        <div className="col-lg-8">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h2 className="h5 fw-bold mb-0">
              Upcoming &amp; Saved Reminders ({visibleReminders.length})
            </h2>

            <div className="btn-group" role="group" aria-label="Filter reminders">
              <button
                type="button"
                className={`btn btn-sm ${
                  filterMode === "all" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilterMode("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  filterMode === "upcoming"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setFilterMode("upcoming")}
              >
                Upcoming
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  filterMode === "completed"
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setFilterMode("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          {visibleReminders.length === 0 ? (
            <div className="jt-card p-5 text-center">
              <i
                className="bi bi-bell-slash fs-1 text-muted d-block mb-2"
                aria-hidden="true"
              ></i>
              <p className="text-secondary mb-0">
                No reminders match this view. Add one using the form!
              </p>
            </div>
          ) : (
            <div className="row g-3">
              {visibleReminders.map((rem) => {
                const badge = typeBadgeColor[rem.type] || typeBadgeColor.Other;
                return (
                  <div key={rem.id} className="col-md-6">
                    <article
                      className={`jt-card p-4 h-100 d-flex flex-column ${
                        rem.completed ? "opacity-75 bg-light" : "jt-card-hover"
                      }`}
                    >
                      <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                        <span
                          className="status-badge"
                          style={{
                            backgroundColor: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {rem.type}
                        </span>
                        <span className="small fw-semibold text-muted">
                          <i className="bi bi-calendar3 me-1" aria-hidden="true"></i>
                          {rem.date}
                        </span>
                      </div>

                      <h3
                        className={`h6 fw-bold mb-2 ${
                          rem.completed ? "text-decoration-line-through text-muted" : ""
                        }`}
                      >
                        {rem.title}
                      </h3>

                      <p className="small text-secondary flex-grow-1 mb-3">
                        {rem.notes || "No extra notes."}
                      </p>

                      <div className="pt-3 border-top d-flex justify-content-between align-items-center gap-2">
                        <button
                          type="button"
                          className={`btn btn-sm ${
                            rem.completed
                              ? "btn-outline-secondary"
                              : "btn-outline-success"
                          }`}
                          onClick={() => handleToggleComplete(rem.id)}
                        >
                          <i
                            className={`bi ${
                              rem.completed
                                ? "bi-arrow-counterclockwise"
                                : "bi-check2-circle"
                            } me-1`}
                            aria-hidden="true"
                          ></i>
                          {rem.completed ? "Reopen" : "Mark Completed"}
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteReminder(rem.id)}
                          aria-label={`Delete reminder ${rem.title}`}
                        >
                          <i className="bi bi-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reminders;
