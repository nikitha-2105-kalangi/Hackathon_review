import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getApplications,
  getCurrentUser,
  saveApplications,
} from "../utils/storage";

// Add Job Page: dedicated form to log a new job application into LocalStorage
function AddJob() {
  const currentUser = getCurrentUser();
  const today = new Date().toISOString().split("T")[0];

  const initialFormState = {
    companyName: "",
    jobRole: "",
    location: "",
    jobType: "Full-time",
    applicationDate: today,
    jobDescription: "",
    jobLink: "",
    status: "Applied",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!formData.jobRole.trim()) {
      newErrors.jobRole = "Job role is required.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Job location is required.";
    }
    if (!formData.applicationDate) {
      newErrors.applicationDate = "Application date is required.";
    }
    if (formData.jobLink.trim()) {
      try {
        new URL(formData.jobLink.trim());
      } catch {
        newErrors.jobLink =
          "Please enter a valid URL starting with https:// or http://";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSavedSuccess(false);

    if (!validateForm() || !currentUser) {
      return;
    }

    const newApplication = {
      id: `app-${Date.now()}`,
      userId: currentUser.id,
      companyName: formData.companyName.trim(),
      jobRole: formData.jobRole.trim(),
      location: formData.location.trim(),
      jobType: formData.jobType,
      applicationDate: formData.applicationDate,
      jobDescription: formData.jobDescription.trim(),
      jobLink: formData.jobLink.trim(),
      status: formData.status,
      notes: formData.notes.trim(),
    };

    const existingApplications = getApplications();
    saveApplications([newApplication, ...existingApplications]);

    setSavedSuccess(true);
    setFormData(initialFormState);
    setErrors({});
  }

  function handleReset() {
    setFormData(initialFormState);
    setErrors({});
    setSavedSuccess(false);
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">Add Job Application</h1>
          <p className="text-secondary mb-0">
            Save a new opportunity to track its progress and interview updates.
          </p>
        </div>

        <Link to="/applications" className="btn btn-outline-primary">
          <i className="bi bi-briefcase me-2" aria-hidden="true"></i>
          View My Applications
        </Link>
      </div>

      {savedSuccess && (
        <div
          className="alert alert-success d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3"
          role="status"
        >
          <div>
            <i className="bi bi-check-circle-fill me-2" aria-hidden="true"></i>
            <strong>Application saved!</strong> Your dashboard statistics and
            applications list have been updated.
          </div>
          <Link to="/applications" className="btn btn-sm btn-success text-nowrap">
            Go to My Applications
          </Link>
        </div>
      )}

      <div className="jt-card p-4 p-lg-5">
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-4">
            <div className="col-md-6">
              <label htmlFor="companyName" className="form-label">
                Company Name <span className="text-danger">*</span>
              </label>
              <input
                id="companyName"
                type="text"
                className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                placeholder="e.g. Google, Microsoft, Stripe"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                aria-invalid={Boolean(errors.companyName)}
                required
              />
              {errors.companyName && (
                <div className="invalid-feedback">{errors.companyName}</div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="jobRole" className="form-label">
                Job Role <span className="text-danger">*</span>
              </label>
              <input
                id="jobRole"
                type="text"
                className={`form-control ${errors.jobRole ? "is-invalid" : ""}`}
                placeholder="e.g. Frontend Developer, Software Intern"
                value={formData.jobRole}
                onChange={(e) => handleChange("jobRole", e.target.value)}
                aria-invalid={Boolean(errors.jobRole)}
                required
              />
              {errors.jobRole && (
                <div className="invalid-feedback">{errors.jobRole}</div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="jobLocation" className="form-label">
                Job Location <span className="text-danger">*</span>
              </label>
              <input
                id="jobLocation"
                type="text"
                className={`form-control ${errors.location ? "is-invalid" : ""}`}
                placeholder="e.g. Remote, Bengaluru, New York"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                aria-invalid={Boolean(errors.location)}
                required
              />
              {errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="jobType" className="form-label">
                Job Type
              </label>
              <select
                id="jobType"
                className="form-select"
                value={formData.jobType}
                onChange={(e) => handleChange("jobType", e.target.value)}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="applicationDate" className="form-label">
                Application Date <span className="text-danger">*</span>
              </label>
              <input
                id="applicationDate"
                type="date"
                className={`form-control ${
                  errors.applicationDate ? "is-invalid" : ""
                }`}
                value={formData.applicationDate}
                onChange={(e) => handleChange("applicationDate", e.target.value)}
                aria-invalid={Boolean(errors.applicationDate)}
                required
              />
              {errors.applicationDate && (
                <div className="invalid-feedback">{errors.applicationDate}</div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="applicationStatus" className="form-label">
                Application Status
              </label>
              <select
                id="applicationStatus"
                className="form-select"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="jobLink" className="form-label">
                Job Link
              </label>
              <input
                id="jobLink"
                type="url"
                className={`form-control ${errors.jobLink ? "is-invalid" : ""}`}
                placeholder="https://company.com/careers/role"
                value={formData.jobLink}
                onChange={(e) => handleChange("jobLink", e.target.value)}
                aria-invalid={Boolean(errors.jobLink)}
              />
              {errors.jobLink && (
                <div className="invalid-feedback">{errors.jobLink}</div>
              )}
            </div>

            <div className="col-12">
              <label htmlFor="jobDescription" className="form-label">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                rows="3"
                className="form-control"
                placeholder="Key skills, tech stack, or role summary..."
                value={formData.jobDescription}
                onChange={(e) => handleChange("jobDescription", e.target.value)}
              ></textarea>
            </div>

            <div className="col-12">
              <label htmlFor="jobNotes" className="form-label">
                Notes
              </label>
              <textarea
                id="jobNotes"
                rows="3"
                className="form-control"
                placeholder="Recruiter name, referral info, salary range, or next steps..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-3 mt-4 pt-3 border-top">
            <button type="submit" className="btn btn-primary px-4">
              <i className="bi bi-check2-circle me-2" aria-hidden="true"></i>
              Save Application
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJob;
