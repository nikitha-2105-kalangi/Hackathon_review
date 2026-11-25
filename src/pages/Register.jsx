import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, saveUsers } from "../utils/storage";

// Registration page that validates user input and saves new accounts in LocalStorage
function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  function validateForm() {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    const existingUsers = getUsers();
    const emailExists = existingUsers.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (emailExists) {
      newErrors.email = "An account with this email already exists.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    const existingUsers = getUsers();

    // Generate a clean unique username from the email prefix
    const baseUsername = email
      .trim()
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "");
    let uniqueUsername = baseUsername || "user";
    let counter = 1;
    while (
      existingUsers.some(
        (u) => u.username.toLowerCase() === uniqueUsername.toLowerCase()
      )
    ) {
      uniqueUsername = `${baseUsername}${counter}`;
      counter += 1;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      username: uniqueUsername,
      password,
      role: "user",
      createdAt: new Date().toISOString().split("T")[0],
    };

    saveUsers([...existingUsers, newUser]);
    setSuccessMessage(
      `Account created! Your username is "${uniqueUsername}". Redirecting to Login...`
    );

    // Navigate to Login page shortly after showing confirmation
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  return (
    <div className="jt-auth-wrapper py-5 px-3">
      <div className="container my-auto">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="text-center mb-4">
              <Link to="/" className="jt-brand-logo justify-content-center mb-2">
                <span className="jt-brand-icon" aria-hidden="true">
                  <i className="bi bi-briefcase-fill"></i>
                </span>
                <span>JobTrack</span>
              </Link>
              <p className="text-secondary small mb-0">
                Create your personal job tracking workspace
              </p>
            </div>

            <main className="jt-card p-4 p-md-5 bg-white">
              <h1 className="h3 fw-bold mb-1">Create Account</h1>
              <p className="text-secondary small mb-4">
                Start organizing your applications and interviews today.
              </p>

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
                  <label htmlFor="regFullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="regFullName"
                    type="text"
                    className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                    placeholder="e.g. Priya Sharma"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: "" });
                    }}
                    aria-invalid={Boolean(errors.fullName)}
                    required
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="regEmail" className="form-label">
                    Email
                  </label>
                  <input
                    id="regEmail"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="you@example.com"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    aria-invalid={Boolean(errors.email)}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="regPassword" className="form-label">
                    Password
                  </label>
                  <input
                    id="regPassword"
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    aria-invalid={Boolean(errors.password)}
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="regConfirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="regConfirmPassword"
                    type="password"
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) {
                        setErrors({ ...errors, confirmPassword: "" });
                      }
                    }}
                    aria-invalid={Boolean(errors.confirmPassword)}
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2">
                  Get Started
                </button>
              </form>

              <p className="text-center small text-secondary mt-4 mb-0">
                Already have an account?{" "}
                <Link to="/login" className="fw-semibold text-decoration-none">
                  Login here
                </Link>
              </p>
            </main>

            <div className="text-center mt-3">
              <Link to="/" className="small text-secondary text-decoration-none">
                <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
                Back to Landing Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
