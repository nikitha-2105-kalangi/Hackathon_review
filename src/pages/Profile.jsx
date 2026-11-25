import React, { useState } from "react";
import {
  getCurrentUser,
  getUsers,
  saveUsers,
  setCurrentUser,
} from "../utils/storage";

// My Profile Page: view and edit user profile details persisted in LocalStorage
function Profile({ onUserUpdate }) {
  const initialUser = getCurrentUser();

  const [fullName, setFullName] = useState(initialUser?.fullName || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [username, setUsername] = useState(initialUser?.username || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const initials = fullName
    ? fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "JT";

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    if (!trimmedName || !trimmedEmail || !trimmedUsername) {
      setErrorMessage("Full Name, Email, and Username cannot be empty.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const users = getUsers();

    // Prevent colliding with another user's email or username
    const duplicateUser = users.find(
      (u) =>
        u.id !== initialUser.id &&
        (u.email.toLowerCase() === trimmedEmail.toLowerCase() ||
          u.username.toLowerCase() === trimmedUsername.toLowerCase())
    );

    if (duplicateUser) {
      setErrorMessage(
        "Another account already uses that email or username."
      );
      return;
    }

    const updatedUser = {
      ...initialUser,
      fullName: trimmedName,
      email: trimmedEmail,
      username: trimmedUsername,
    };

    const updatedUsersList = users.map((u) =>
      u.id === initialUser.id ? updatedUser : u
    );

    saveUsers(updatedUsersList);
    setCurrentUser(updatedUser);

    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }

    setSuccessMessage("Your profile details have been updated.");
  }

  return (
    <div className="container-fluid px-0">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">My Profile</h1>
        <p className="text-secondary mb-0">
          View and update your personal account information.
        </p>
      </div>

      <div className="row g-4">
        {/* Profile Summary Card */}
        <div className="col-lg-4">
          <div className="jt-card p-4 text-center h-100">
            <div
              className="jt-avatar jt-avatar-lg mx-auto mb-3"
              aria-hidden="true"
            >
              {initials}
            </div>
            <h2 className="h5 fw-bold mb-1">{fullName || "User"}</h2>
            <p className="text-muted small mb-2">@{username}</p>
            <span className="badge rounded-pill text-bg-primary px-3 py-2">
              {initialUser?.role === "admin" ? "Administrator" : "Job Seeker"}
            </span>

            <hr className="my-4" />

            <div className="text-start small d-flex flex-column gap-2">
              <div>
                <span className="text-muted d-block">Email</span>
                <span className="fw-semibold">{email}</span>
              </div>
              <div>
                <span className="text-muted d-block">Member Since</span>
                <span className="fw-semibold">
                  {initialUser?.createdAt || "2026"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="col-lg-8">
          <div className="jt-card p-4 p-md-5 h-100">
            <h2 className="h5 fw-bold mb-3">Edit Profile Details</h2>

            {errorMessage && (
              <div className="alert alert-danger py-2 small" role="alert">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success py-2 small" role="status">
                <i
                  className="bi bi-check-circle-fill me-2"
                  aria-hidden="true"
                ></i>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="profileFullName" className="form-label">
                  Full Name
                </label>
                <input
                  id="profileFullName"
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="profileEmail" className="form-label">
                  Email
                </label>
                <input
                  id="profileEmail"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="profileUsername" className="form-label">
                  Username
                </label>
                <input
                  id="profileUsername"
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary px-4">
                <i className="bi bi-save me-2" aria-hidden="true"></i>
                Save Profile Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
