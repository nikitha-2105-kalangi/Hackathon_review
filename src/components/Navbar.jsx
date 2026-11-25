import React, { useState } from "react";
import { Link } from "react-router-dom";

// Top navigation bar used on the public Landing Page
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu after clicking a link
  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky-top jt-navbar">
      <nav className="navbar navbar-expand-lg py-3" aria-label="Primary">
        <div className="container">
          <Link className="jt-brand-logo" to="/" onClick={handleNavClick}>
            <span className="jt-brand-icon" aria-hidden="true">
              <i className="bi bi-briefcase-fill"></i>
            </span>
            <span>JobTrack</span>
          </Link>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            aria-controls="landingNavbar"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} fs-3`}></i>
          </button>

          <div
            id="landingNavbar"
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
              <li className="nav-item">
                <a
                  className="nav-link fw-medium text-dark px-2"
                  href="#home"
                  onClick={handleNavClick}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium text-dark px-2"
                  href="#features"
                  onClick={handleNavClick}
                >
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fw-medium text-dark px-2"
                  href="#about"
                  onClick={handleNavClick}
                >
                  About
                </a>
              </li>
            </ul>

            <div className="d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0">
              <Link
                to="/login"
                className="btn btn-outline-primary"
                onClick={handleNavClick}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                onClick={handleNavClick}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
