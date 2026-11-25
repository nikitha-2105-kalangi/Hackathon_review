import React from "react";
import { Link } from "react-router-dom";

// Footer displayed on the Landing Page
function Footer() {
  return (
    <footer className="jt-footer py-5 mt-auto">
      <div className="container">
        <div className="row gy-4 align-items-start">
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="jt-brand-icon" aria-hidden="true">
                <i className="bi bi-briefcase-fill"></i>
              </span>
              <span className="fs-5 fw-bold text-white">
                JobTrack – Online Job Application Tracker
              </span>
            </div>
            <p className="text-secondary mb-0 small" style={{ maxWidth: "380px" }}>
              A centralized workspace to organize applications, manage interview
              milestones, set timely reminders, and visualize your career progress.
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <h2 className="h6 text-white fw-semibold mb-3">Explore</h2>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-lg-4">
            <h2 className="h6 text-white fw-semibold mb-3">Account</h2>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              <li>
                <Link to="/login">Login to Dashboard</Link>
              </li>
              <li>
                <Link to="/register">Get Started (Register)</Link>
              </li>
              <li>
                <Link to="/login">Admin Portal</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 small text-secondary">
          <span>
            &copy; {new Date().getFullYear()} JobTrack – Online Job Application Tracker.
          </span>
          <span>Built with React JS, Bootstrap 5 &amp; LocalStorage</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
