// LocalStorage helper functions for JobTrack.
// All data is stored in the browser using LocalStorage so no backend is needed.

const USERS_KEY = "jobtrack_users";
const CURRENT_USER_KEY = "jobtrack_current_user";
const APPLICATIONS_KEY = "jobtrack_applications";
const REMINDERS_KEY = "jobtrack_reminders";

// Default seed users: includes the required demo admin and a sample normal user
const DEFAULT_USERS = [
  {
    id: "user-admin",
    fullName: "System Administrator",
    email: "admin@jobtrack.app",
    username: "admin",
    password: "admin123",
    role: "admin",
    createdAt: "2026-10-01",
  },
  {
    id: "user-demo",
    fullName: "Alex Rivera",
    email: "alex@jobtrack.app",
    username: "demo",
    password: "demo123",
    role: "user",
    createdAt: "2026-10-15",
  },
];

// Realistic starter applications for the demo user account
export function getSampleApplications(userId) {
  return [
    {
      id: `app-${Date.now()}-1`,
      userId,
      companyName: "Stripe",
      jobRole: "Frontend Developer",
      location: "Remote",
      jobType: "Full-time",
      applicationDate: "2026-11-18",
      jobDescription: "Build accessible checkout UI components in React and modern CSS.",
      jobLink: "https://stripe.com/jobs",
      status: "Interview",
      notes: "Technical UI round scheduled with the design systems team.",
    },
    {
      id: `app-${Date.now()}-2`,
      userId,
      companyName: "Linear",
      jobRole: "Product Engineer Intern",
      location: "San Francisco, CA",
      jobType: "Internship",
      applicationDate: "2026-11-14",
      jobDescription: "Work on fast keyboard-first project workflows and client state.",
      jobLink: "https://linear.app/careers",
      status: "Selected",
      notes: "Received offer! Reviewing start date details.",
    },
    {
      id: `app-${Date.now()}-3`,
      userId,
      companyName: "Vercel",
      jobRole: "Junior React Engineer",
      location: "Hybrid - New York, NY",
      jobType: "Full-time",
      applicationDate: "2026-11-10",
      jobDescription: "Improve developer dashboard analytics and deployment logs.",
      jobLink: "https://vercel.com/careers",
      status: "Applied",
      notes: "Submitted portfolio and GitHub links along with resume.",
    },
    {
      id: `app-${Date.now()}-4`,
      userId,
      companyName: "Atlassian",
      jobRole: "UI Software Engineer",
      location: "Bengaluru, India",
      jobType: "Full-time",
      applicationDate: "2026-11-05",
      jobDescription: "Collaborate on Jira board performance and responsive layouts.",
      jobLink: "https://www.atlassian.com/company/careers",
      status: "Interview",
      notes: "Completed HR screening; preparing for React live coding.",
    },
    {
      id: `app-${Date.now()}-5`,
      userId,
      companyName: "Figma",
      jobRole: "Web Platform Trainee",
      location: "Remote",
      jobType: "Part-time",
      applicationDate: "2026-10-28",
      jobDescription: "Assist with documentation portal components and accessibility.",
      jobLink: "https://www.figma.com/careers",
      status: "Rejected",
      notes: "Position filled internally. Asked for feedback for next cohort.",
    },
    {
      id: `app-${Date.now()}-6`,
      userId,
      companyName: "Notion",
      jobRole: "Associate Frontend Engineer",
      location: "Remote",
      jobType: "Full-time",
      applicationDate: "2026-11-21",
      jobDescription: "Develop workspace sidebar interactions and rich card views.",
      jobLink: "https://www.notion.so/careers",
      status: "Applied",
      notes: "Applied via referral from university alumni.",
    },
  ];
}

// Realistic starter reminders for the demo user account
export function getSampleReminders(userId) {
  return [
    {
      id: `rem-${Date.now()}-1`,
      userId,
      title: "Stripe Technical Interview Prep",
      date: "2026-11-27",
      type: "Interview",
      notes: "Review React state patterns, accessibility, and CSS Grid.",
      completed: false,
    },
    {
      id: `rem-${Date.now()}-2`,
      userId,
      title: "Follow up with Vercel Recruiter",
      date: "2026-11-28",
      type: "Follow-up",
      notes: "Send a polite follow-up email referencing the Junior React role.",
      completed: false,
    },
    {
      id: `rem-${Date.now()}-3`,
      userId,
      title: "Submit Updated Portfolio for Notion",
      date: "2026-11-30",
      type: "Application Deadline",
      notes: "Upload final case study screenshots before deadline.",
      completed: false,
    },
    {
      id: `rem-${Date.now()}-4`,
      userId,
      title: "Send Thank-You Note to Atlassian HR",
      date: "2026-11-20",
      type: "Other",
      notes: "Sent thank-you message right after screening call.",
      completed: true,
    },
  ];
}

// Initialize LocalStorage with default demo data if empty
export function initializeStorage() {
  if (localStorage.getItem(USERS_KEY) === null) {
    localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
  if (localStorage.getItem(APPLICATIONS_KEY) === null) {
    localStorage.setItem(
      APPLICATIONS_KEY,
      JSON.stringify(getSampleApplications("user-demo"))
    );
  }
  if (localStorage.getItem(REMINDERS_KEY) === null) {
    localStorage.setItem(
      REMINDERS_KEY,
      JSON.stringify(getSampleReminders("user-demo"))
    );
  }
}

// Safely parse JSON from LocalStorage
function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from LocalStorage:`, error);
    return fallback;
  }
}

// --- Users ---
export function getUsers() {
  initializeStorage();
  return readJson(USERS_KEY, []);
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// --- Current Logged-In Session ---
export function getCurrentUser() {
  return readJson(CURRENT_USER_KEY, null);
}

export function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// --- Job Applications ---
export function getApplications() {
  initializeStorage();
  return readJson(APPLICATIONS_KEY, []);
}

export function saveApplications(applications) {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}

export function getApplicationsByUser(userId) {
  const all = getApplications();
  return all.filter((app) => app.userId === userId);
}

// --- Reminders ---
export function getReminders() {
  initializeStorage();
  return readJson(REMINDERS_KEY, []);
}

export function saveReminders(reminders) {
  localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
}

export function getRemindersByUser(userId) {
  const all = getReminders();
  return all.filter((reminder) => reminder.userId === userId);
}

// Load sample applications and reminders for a newly registered user if they click the demo button
export function loadSampleDataForUser(userId) {
  const existingApps = getApplications();
  const existingReminders = getReminders();
  const sampleApps = getSampleApplications(userId);
  const sampleReminders = getSampleReminders(userId);

  saveApplications([...sampleApps, ...existingApps]);
  saveReminders([...sampleReminders, ...existingReminders]);
}

// Calculate dynamic statistics from any list of applications
export function calculateStats(applications) {
  const total = applications.length;
  const applied = applications.filter((a) => a.status === "Applied").length;
  const interview = applications.filter((a) => a.status === "Interview").length;
  const selected = applications.filter((a) => a.status === "Selected").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  // Success rate = percentage of applications that resulted in Selected
  const successRate = total > 0 ? Math.round((selected / total) * 100) : 0;

  // Interview conversion = percentage of applications that reached Interview or Selected
  const interviewRate =
    total > 0 ? Math.round(((interview + selected) / total) * 100) : 0;

  return {
    total,
    applied,
    interview,
    selected,
    rejected,
    successRate,
    interviewRate,
  };
}
