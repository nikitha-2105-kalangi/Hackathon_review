import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, setCurrentUser } from "../utils/storage";

// Login page supporting both standard users and the demo admin account
function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    const trimmedIdentifier = identifier.trim().toLowerCase();

    if (!trimmedIdentifier || !password) {
      setErrorMessage("Please enter both your email/username and password.");
      return;
    }

    const users = getUsers();

    // Match by either email or username (case-insensitive)
    const matchedUser = users.find(
      (user) =>
        (user.email.toLowerCase() === trimmedIdentifier ||
          user.username.toLowerCase() === trimmedIdentifier) &&
        user.password === password
    );

    if (!matchedUser) {
      setErrorMessage("Invalid email/username or password. Please try again.");
      return;
    }

    // Save logged-in user session in LocalStorage
    setCurrentUser(matchedUser);

    // Redirect Admin to Admin Dashboard and normal users to User Dashboard
    if (matchedUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }

  // Convenience helper to pre-fill demo credentials for easy testing
  function fillDemoCredentials(userValue, passValue) {
    setIdentifier(userValue);
    setPassword(passValue);
    setErrorMessage("");
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
                Sign in to manage your job applications
              </p>
            </div>

            <main className="jt-card p-4 p-md-5 bg-white">
              <h1 className="h3 fw-bold mb-1">Welcome Back</h1>
              <p className="text-secondary small mb-4">
                Enter your credentials to access your dashboard.
              </p>

              {errorMessage && (
                <div className="alert alert-danger py-2 small" role="alert">
                  <i
                    className="bi bi-exclamation-triangle-fill me-2"
                    aria-hidden="true"
                  ></i>
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="loginIdentifier" className="form-label">
                    Email or Username
                  </label>
                  <input
                    id="loginIdentifier"
                    type="text"
                    className="form-control"
                    placeholder="e.g. demo or alex@jobtrack.app"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      id="loginPassword"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      aria-pressed={showPassword}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2">
                  Login to Dashboard
                </button>
              </form>

              <p className="text-center small text-secondary mt-4 mb-0">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="fw-semibold text-decoration-none">
                  Create an account
                </Link>
              </p>

              {/* Demo Credentials Helper Box */}
              <div className="mt-4 p-3 rounded-3 bg-light border">
                <p className="small fw-bold mb-2 text-dark">
                  <i className="bi bi-info-circle me-1 text-primary" aria-hidden="true"></i>
                  Demo Credentials
                </p>
                <div className="d-flex flex-column gap-2 small">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-1">
                    <span>
                      <strong>User:</strong> <code>demo</code> / <code>demo123</code>
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary py-0 px-2"
                      onClick={() => fillDemoCredentials("demo", "demo123")}
                    >
                      Use
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-1">
                    <span>
                      <strong>Admin:</strong> <code>admin</code> / <code>admin123</code>
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary py-0 px-2"
                      onClick={() => fillDemoCredentials("admin", "admin123")}
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
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

export default Login;
