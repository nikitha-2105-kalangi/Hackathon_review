import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearCurrentUser, getCurrentUser } from "../utils/storage";

// Sidebar navigation items for standard users
const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "bi-grid-1x2-fill" },
  { to: "/applications", label: "My Applications", icon: "bi-briefcase-fill" },
  { to: "/add-job", label: "Add Job", icon: "bi-plus-circle-fill" },
  { to: "/reminders", label: "Reminders", icon: "bi-bell-fill" },
  { to: "/reports", label: "Reports", icon: "bi-bar-chart-fill" },
  { to: "/profile", label: "My Profile", icon: "bi-person-circle" },
];

// Reusable vertical Sidebar component + responsive mobile drawer
function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Compute user initials for avatar badge
  const initials = currentUser?.fullName
    ? currentUser.fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "JT";

  function handleLogout() {
    clearCurrentUser();
    setMobileOpen(false);
    navigate("/");
  }

  function renderSidebarContent(onLinkClick) {
    return (
      <>
        <div className="p-4 border-bottom d-flex align-items-center justify-content-between">
          <div className="jt-brand-logo">
            <span className="jt-brand-icon" aria-hidden="true">
              <i className="bi bi-briefcase-fill"></i>
            </span>
            <span>JobTrack</span>
          </div>

          {onLinkClick && (
            <button
              type="button"
              className="btn btn-sm btn-light d-lg-none"
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>

        <nav className="jt-sidebar-nav py-3 flex-grow-1" aria-label="Sidebar">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `jt-sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <i className={`bi ${item.icon}`} aria-hidden="true"></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-top">
          {currentUser && (
            <div className="d-flex align-items-center gap-2 px-2 py-2 mb-2 rounded-3 bg-light">
              <div className="jt-avatar" aria-hidden="true">
                {initials}
              </div>
              <div className="overflow-hidden">
                <p className="fw-semibold small mb-0 text-truncate">
                  {currentUser.fullName}
                </p>
                <p className="text-muted small mb-0 text-truncate">
                  @{currentUser.username}
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            className="jt-sidebar-link text-danger fw-semibold"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
            <span>Logout</span>
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop permanent sidebar */}
      <aside className="jt-sidebar d-none d-lg-flex">
        {renderSidebarContent(undefined)}
      </aside>

      {/* Mobile top bar */}
      <header className="jt-mobile-topbar d-lg-none px-3 py-2 d-flex align-items-center justify-content-between">
        <div className="jt-brand-logo fs-6">
          <span
            className="jt-brand-icon"
            style={{ width: "32px", height: "32px", fontSize: "0.95rem" }}
            aria-hidden="true"
          >
            <i className="bi bi-briefcase-fill"></i>
          </span>
          <span>JobTrack</span>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-2"
          aria-expanded={mobileOpen}
          aria-label="Open sidebar navigation"
          onClick={() => setMobileOpen(true)}
        >
          <i className="bi bi-list fs-5" aria-hidden="true"></i>
          <span>Menu</span>
        </button>
      </header>

      {/* Mobile slide-over drawer */}
      {mobileOpen && (
        <>
          <div
            className="jt-drawer-backdrop d-lg-none"
            onClick={() => setMobileOpen(false)}
          ></div>
          <aside className="jt-mobile-drawer d-lg-none" aria-label="Mobile menu">
            {renderSidebarContent(() => setMobileOpen(false))}
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;
