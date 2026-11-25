import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Public Landing Page displayed when opening the website
function Landing() {
  const features = [
    {
      title: "Track Applications",
      description:
        "Save every company, job role, location, link, and note in one organized place instead of messy spreadsheets.",
      icon: "bi-briefcase-fill",
      bg: "#EFF6FF",
      color: "#2563EB",
    },
    {
      title: "Manage Interviews",
      description:
        "Monitor applications moving from Applied to Interview and Selected, with instant status updates and clear badges.",
      icon: "bi-calendar2-check-fill",
      bg: "#F5F3FF",
      color: "#7C3AED",
    },
    {
      title: "Set Reminders",
      description:
        "Never miss a recruiter follow-up, interview slot, or application deadline with dedicated reminder cards.",
      icon: "bi-bell-fill",
      bg: "#F0FDF4",
      color: "#22C55E",
    },
    {
      title: "Analyze Progress",
      description:
        "Understand your job search with real-time charts, interview conversion rates, and success rate insights.",
      icon: "bi-graph-up-arrow",
      bg: "#FEF2F2",
      color: "#EF4444",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Add your job applications",
      description:
        "Log the company name, role, location, job type, application date, and notes in seconds.",
    },
    {
      number: "2",
      title: "Update application status",
      description:
        "Keep statuses current as you advance from Applied to Interview, Selected, or Rejected.",
    },
    {
      number: "3",
      title: "Track your progress",
      description:
        "View live statistics, upcoming interview reminders, and visual reports on your dashboard.",
    },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" tabIndex="-1">
        {/* Hero Section */}
        <section id="home" className="jt-hero py-5">
          <div className="container py-4 py-lg-5">
            <div className="row align-items-center gy-5">
              <div className="col-lg-6">
                <span className="jt-hero-badge mb-3">
                  <i className="bi bi-stars" aria-hidden="true"></i>
                  Smart Career Workspace
                </span>

                <h1 className="display-4 jt-hero-title mb-3">
                  Your Career Journey,{" "}
                  <span className="jt-gradient-text">Organized.</span>
                </h1>

                <p className="lead text-secondary mb-4">
                  JobTrack helps students and job seekers centralize every
                  application, track interview pipelines, set follow-up
                  reminders, and measure progress with clear analytics—right in
                  your browser.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Link to="/register" className="btn btn-primary btn-lg px-4">
                    Get Started
                    <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary btn-lg px-4"
                  >
                    Login
                  </Link>
                </div>

                <div className="d-flex flex-wrap gap-4 mt-4 pt-2 text-muted small fw-medium">
                  <span>
                    <i
                      className="bi bi-check-circle-fill text-success me-2"
                      aria-hidden="true"
                    ></i>
                    100% Browser Storage
                  </span>
                  <span>
                    <i
                      className="bi bi-check-circle-fill text-success me-2"
                      aria-hidden="true"
                    ></i>
                    Real-Time Analytics
                  </span>
                  <span>
                    <i
                      className="bi bi-check-circle-fill text-success me-2"
                      aria-hidden="true"
                    ></i>
                    Mobile Friendly
                  </span>
                </div>
              </div>

              {/* Clean Career Growth & Dashboard SVG Illustration */}
              <div className="col-lg-6">
                <div className="jt-card p-3 p-md-4 bg-white border-0 shadow-lg">
                  <svg
                    viewBox="0 0 560 400"
                    className="w-100 h-auto d-block"
                    role="img"
                    aria-label="Illustration of JobTrack dashboard showing application progress, interview stages, and career growth chart"
                  >
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>

                    {/* Soft background frame */}
                    <rect
                      x="8"
                      y="8"
                      width="544"
                      height="384"
                      rx="22"
                      fill="#F8FAFC"
                      stroke="#E2E8F0"
                      strokeWidth="2"
                    />

                    {/* Top mini window bar */}
                    <circle cx="36" cy="34" r="6" fill="#EF4444" />
                    <circle cx="56" cy="34" r="6" fill="#F59E0B" />
                    <circle cx="76" cy="34" r="6" fill="#22C55E" />
                    <rect
                      x="110"
                      y="26"
                      width="180"
                      height="16"
                      rx="8"
                      fill="#E2E8F0"
                    />

                    {/* Mini sidebar */}
                    <rect
                      x="24"
                      y="60"
                      width="110"
                      height="312"
                      rx="14"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                    />
                    <rect
                      x="38"
                      y="80"
                      width="82"
                      height="24"
                      rx="6"
                      fill="url(#heroGrad)"
                      opacity="0.16"
                    />
                    <rect
                      x="38"
                      y="118"
                      width="72"
                      height="12"
                      rx="6"
                      fill="#CBD5E1"
                    />
                    <rect
                      x="38"
                      y="144"
                      width="64"
                      height="12"
                      rx="6"
                      fill="#CBD5E1"
                    />
                    <rect
                      x="38"
                      y="170"
                      width="78"
                      height="12"
                      rx="6"
                      fill="#CBD5E1"
                    />
                    <rect
                      x="38"
                      y="196"
                      width="58"
                      height="12"
                      rx="6"
                      fill="#CBD5E1"
                    />

                    {/* Stat Cards Row */}
                    <rect
                      x="150"
                      y="60"
                      width="120"
                      height="74"
                      rx="12"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                    />
                    <text
                      x="166"
                      y="88"
                      fontSize="11"
                      fontWeight="600"
                      fill="#64748B"
                    >
                      APPLIED
                    </text>
                    <text
                      x="166"
                      y="118"
                      fontSize="24"
                      fontWeight="800"
                      fill="#2563EB"
                    >
                      18
                    </text>

                    <rect
                      x="284"
                      y="60"
                      width="120"
                      height="74"
                      rx="12"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                    />
                    <text
                      x="300"
                      y="88"
                      fontSize="11"
                      fontWeight="600"
                      fill="#64748B"
                    >
                      INTERVIEWS
                    </text>
                    <text
                      x="300"
                      y="118"
                      fontSize="24"
                      fontWeight="800"
                      fill="#7C3AED"
                    >
                      6
                    </text>

                    <rect
                      x="418"
                      y="60"
                      width="120"
                      height="74"
                      rx="12"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                    />
                    <text
                      x="434"
                      y="88"
                      fontSize="11"
                      fontWeight="600"
                      fill="#64748B"
                    >
                      SELECTED
                    </text>
                    <text
                      x="434"
                      y="118"
                      fontSize="24"
                      fontWeight="800"
                      fill="#22C55E"
                    >
                      3
                    </text>

                    {/* Career Growth Bar Chart Card */}
                    <rect
                      x="150"
                      y="150"
                      width="240"
                      height="222"
                      rx="14"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                    />
                    <text
                      x="170"
                      y="178"
                      fontSize="13"
                      fontWeight="700"
                      fill="#1E293B"
                    >
                      Career Pipeline Progress
                    </text>

                    <rect
                      x="178"
                      y="286"
                      width="28"
                      height="64"
                      rx="6"
                      fill="#2563EB"
                    />
                    <rect
                      x="222"
                      y="252"
                      width="28"
                      height="98"
                      rx="6"
                      fill="#7C3AED"
                    />
                    <rect
                      x="266"
                      y="224"
                      width="28"
                      height="126"
                      rx="6"
                      fill="#2563EB"
                    />
                    <rect
                      x="310"
                      y="200"
                      width="28"
                      height="150"
                      rx="6"
                      fill="#22C55E"
                    />

                    {/* Trend arrow */}
                    <path
                      d="M178 270 L236 238 L280 212 L338 184"
                      fill="none"
                      stroke="url(#heroGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="338" cy="184" r="5" fill="#22C55E" />

                    {/* Upcoming Milestone Card */}
                    <rect
                      x="404"
                      y="150"
                      width="134"
                      height="222"
                      rx="14"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                    />
                    <text
                      x="418"
                      y="178"
                      fontSize="12"
                      fontWeight="700"
                      fill="#1E293B"
                    >
                      Milestones
                    </text>

                    <rect
                      x="416"
                      y="196"
                      width="110"
                      height="46"
                      rx="8"
                      fill="#EFF6FF"
                    />
                    <circle cx="432" cy="219" r="7" fill="#2563EB" />
                    <rect
                      x="446"
                      y="210"
                      width="66"
                      height="8"
                      rx="4"
                      fill="#1E293B"
                      opacity="0.7"
                    />
                    <rect
                      x="446"
                      y="224"
                      width="46"
                      height="6"
                      rx="3"
                      fill="#64748B"
                      opacity="0.5"
                    />

                    <rect
                      x="416"
                      y="254"
                      width="110"
                      height="46"
                      rx="8"
                      fill="#F5F3FF"
                    />
                    <circle cx="432" cy="277" r="7" fill="#7C3AED" />
                    <rect
                      x="446"
                      y="268"
                      width="66"
                      height="8"
                      rx="4"
                      fill="#1E293B"
                      opacity="0.7"
                    />
                    <rect
                      x="446"
                      y="282"
                      width="46"
                      height="6"
                      rx="3"
                      fill="#64748B"
                      opacity="0.5"
                    />

                    <rect
                      x="416"
                      y="312"
                      width="110"
                      height="46"
                      rx="8"
                      fill="#F0FDF4"
                    />
                    <circle cx="432" cy="335" r="7" fill="#22C55E" />
                    <rect
                      x="446"
                      y="326"
                      width="66"
                      height="8"
                      rx="4"
                      fill="#1E293B"
                      opacity="0.7"
                    />
                    <rect
                      x="446"
                      y="340"
                      width="46"
                      height="6"
                      rx="3"
                      fill="#64748B"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-5">
          <div className="container py-4">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "640px" }}>
              <span className="text-primary fw-bold text-uppercase small">
                Powerful Features
              </span>
              <h2 className="fw-bold mt-2 mb-3">
                Everything you need to manage your job hunt
              </h2>
              <p className="text-secondary mb-0">
                Built to keep your applications structured, follow-ups on time,
                and career insights easy to understand.
              </p>
            </div>

            <div className="row g-4">
              {features.map((feature) => (
                <div key={feature.title} className="col-sm-6 col-lg-3">
                  <div className="jt-card jt-card-hover p-4 h-100">
                    <div
                      className="jt-feature-icon mb-3"
                      style={{
                        backgroundColor: feature.bg,
                        color: feature.color,
                      }}
                      aria-hidden="true"
                    >
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                    <h3 className="h5 fw-bold mb-2">{feature.title}</h3>
                    <p className="text-secondary small mb-0">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-5 bg-white border-top border-bottom">
          <div className="container py-4">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: "620px" }}>
              <span className="text-primary fw-bold text-uppercase small">
                Simple Workflow
              </span>
              <h2 className="fw-bold mt-2 mb-3">How It Works</h2>
              <p className="text-secondary mb-0">
                Stay on top of every opportunity in three straightforward steps.
              </p>
            </div>

            <div className="row g-4">
              {steps.map((step) => (
                <div key={step.number} className="col-md-4">
                  <div className="jt-card p-4 h-100">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <span className="jt-step-number">{step.number}</span>
                      <h3 className="h5 fw-bold mb-0">{step.title}</h3>
                    </div>
                    <p className="text-secondary mb-0 small">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-5">
          <div className="container py-4">
            <div className="jt-card p-4 p-lg-5 bg-white">
              <div className="row align-items-center gy-4">
                <div className="col-lg-7">
                  <span className="text-primary fw-bold text-uppercase small">
                    About JobTrack
                  </span>
                  <h2 className="fw-bold mt-2 mb-3">
                    Built for clarity during a stressful job search
                  </h2>
                  <p className="text-secondary mb-3">
                    Applying to internships and full-time roles across dozens of
                    portals quickly becomes overwhelming. JobTrack replaces
                    scattered notes and browser bookmarks with a clean,
                    centralized SaaS dashboard.
                  </p>
                  <p className="text-secondary mb-0">
                    Your applications, interview statuses, reminders, and profile
                    settings persist securely in your browser&apos;s LocalStorage—making
                    it fast, private, and effortless to demonstrate or use daily.
                  </p>
                </div>
                <div className="col-lg-5 text-lg-end">
                  <div className="p-4 rounded-4 bg-light border text-start">
                    <h3 className="h6 fw-bold mb-3">Ready to get organized?</h3>
                    <p className="small text-secondary mb-3">
                      Create a free local account in seconds or explore using the
                      built-in demo credentials on the login page.
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      <Link to="/register" className="btn btn-primary">
                        Get Started Free
                      </Link>
                      <Link to="/login" className="btn btn-outline-primary">
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
