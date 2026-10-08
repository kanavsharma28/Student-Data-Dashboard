# StudentHub – Student Management System

> An intermediate-to-advanced React.js administration dashboard for managing student enrollments, course analytics, and academic records. Built with **React 18**, **Vite**, **React Router v6**, **Axios**, and **JSON Server REST API**.

---

## 📌 Project Overview

**StudentHub** is a production-quality, responsive single-page application (SPA) crafted for school administrators, department heads, and academic advisors. Rather than a basic tutorial CRUD demo, it is engineered with real-world administrative features including:
- Dynamic dashboard metrics and course enrollment progress distributions calculated from API data.
- Live multi-field search and multi-criteria filtering working in combination (Search + Course + Gender + Status + City).
- Client-side multi-field validation for student registrations and modifications.
- Desktop table view with seamless responsive collapse to mobile student cards.
- Persistent Light / Dark mode theme system.
- Resilient REST API client with graceful offline failure recovery.

---

## 🚀 Key Features

- **📊 Comprehensive Analytics Dashboard (`/`)**:
  - Live metric cards: Total Students, Active Students, Inactive Students, Total Courses.
  - Dynamic course breakdown with colored progress bars.
  - Recent enrollments feed with quick-view actions.
  - Quick-action shortcuts for adding new students and viewing records.
- **👥 Student Management Hub (`/students`)**:
  - Desktop data table with sortable columns, custom avatars, status badges, and action toolbars.
  - Mobile/tablet cards view tailored for touch targets.
  - Real-time case-insensitive search across name, email, course, and city.
  - Multi-faceted filters: Course, Gender, Status, and dynamically generated unique Cities.
  - 6-way sorting: Name A-Z, Name Z-A, Age Low-High, Age High-Low, Newest/Oldest Enrollment.
  - Dynamic pagination (10 students per page) with auto-reset upon filter change.
  - Accessible confirmation modal for deletion with immediate list state synchronization.
- **➕ Student Registration (`/students/add`)**:
  - Fully controlled form using `useState`.
  - Comprehensive field-level client-side validation (regex email, phone formatting, age range 15–100, required course/city/address).
  - Instant error feedback under each input field.
  - Automatic `useNavigate()` redirection without page reload.
- **🔍 Detailed Student Profile (`/students/:id`)**:
  - Profile banner and avatar generator.
  - Complete record viewer (name, email, phone, age, gender, course, address, enrollment date, status).
  - Quick action links for editing or deleting the student record.
- **✏️ Record Editing (`/students/edit/:id`)**:
  - Pre-filled form with current student details fetched via `useParams()` and Axios.
  - Complete validation before `PUT` submission.
  - Automatic synchronization with global state.
- **🌓 Light & Dark Theme Support**:
  - Theme switcher located in Navbar.
  - Persisted in browser `localStorage`.
  - Full CSS custom properties ensuring high contrast and accessibility in both modes.
- **🛡️ Error Handling & Offline Recovery**:
  - Auto-dismissing toast notifications for CRUD actions (`Student added successfully.`, `Student updated successfully.`, `Student deleted successfully.`).
  - Friendly troubleshooting alerts if JSON Server is offline (`npm run server`).
- **📱 Fully Responsive Design**:
  - Tested across mobile, tablet, laptop, and desktop viewports.
  - Mobile hamburger navigation drawer.
- **🚫 404 Not Found Page**:
  - Catch-all route with quick return navigation.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI component architecture and state management |
| **JavaScript (ES6+)** | Modern modular application logic |
| **Vite** | Blazing-fast development server and production bundler |
| **React Router v6** | Client-side routing (`BrowserRouter`, `Routes`, `Route`, `useNavigate`, `useParams`, `NavLink`) |
| **Axios** | Promise-based HTTP client for REST API communication |
| **JSON Server** | Full local REST API backend simulation on port 3000 |
| **CSS3 & CSS Variables** | Custom design system, dark mode tokens, and responsive layout |

---

## 📁 Folder Structure

```
student-management-system/
├── public/
│   └── favicon.svg                  # Brand SVG favicon
├── src/
│   ├── components/
│   │   ├── Icons.jsx                # Self-contained SVG icon library
│   │   ├── Navbar.jsx               # Responsive navbar with theme toggle and mobile menu
│   │   ├── Footer.jsx               # Branded footer with API connectivity status
│   │   ├── Loader.jsx               # Animated spinner and loading feedback
│   │   ├── ErrorMessage.jsx         # User-friendly error alert with retry button
│   │   ├── EmptyState.jsx           # Contextual empty state with action CTAs
│   │   ├── Modal.jsx                # Accessible confirmation dialog for deletion
│   │   ├── Notification.jsx         # Auto-dismissing toast notifications
│   │   ├── StudentTable.jsx         # Desktop table layout with actions
│   │   ├── StudentCard.jsx          # Mobile/tablet card layout
│   │   ├── SearchFilterBar.jsx      # Search, multi-filters, and sorting controls
│   │   └── Pagination.jsx           # Dynamic page controls and item counter
│   ├── pages/
│   │   ├── Home.jsx                 # Dashboard with metrics, course charts, and recent records
│   │   ├── Students.jsx             # Main student list with search, filter, sort, & pagination
│   │   ├── AddStudent.jsx           # Controlled registration form with client validation
│   │   ├── StudentDetails.jsx       # Complete student profile viewer
│   │   ├── EditStudent.jsx          # Pre-filled edit form with update handling
│   │   └── NotFound.jsx             # 404 fallback page
│   ├── services/
│   │   └── studentApi.js            # Centralized Axios client & CRUD service functions
│   ├── context/
│   │   ├── StudentContext.jsx       # Global student state, async actions, & notifications
│   │   └── ThemeContext.jsx         # Theme state & localStorage synchronization
│   ├── App.jsx                      # Route definitions and layout shell
│   ├── main.jsx                     # Application bootstrap and context provider tree
│   ├── index.css                    # CSS entrypoint
│   └── styles/                      # Shared, component, page, and responsive CSS files
├── db.json                          # REST API database with 22+ realistic student records
├── package.json                     # Project manifest and scripts
├── vite.config.js                   # Vite configuration
├── README.md                        # Documentation and guides
└── .gitignore                       # Git ignore file
```

---

## 🧠 React Concepts Used & Learning Flow

The core data lifecycle is cleanly separated across the codebase:
$$\text{Component} \longrightarrow \text{State} \longrightarrow \text{Event} \longrightarrow \text{API Request} \longrightarrow \text{API Response} \longrightarrow \text{State Update} \longrightarrow \text{UI Update} \longrightarrow \text{Routing}$$

- **Components & Props**: Modular, single-responsibility components with well-defined prop contracts.
- **Hooks**:
  - `useState`: Form fields, filter inputs, modal visibility, pagination index.
  - `useEffect`: API data fetching, notification auto-dismiss timer, Escape key listeners.
  - `useMemo`: Computing live metrics, filter results, and pagination slices efficiently.
  - `useCallback`: Memoizing data fetch functions.
  - `useParams`: Extracting `:id` parameter from URL in details and edit pages.
  - `useNavigate`: Programmatic route transitions after CRUD operations.
- **Context API**:
  - `StudentContext`: Eliminates prop drilling for student list mutations and global toasts.
  - `ThemeContext`: Provides dark/light mode state across the entire DOM tree.
- **Controlled Components**: Every input, select, and textarea is bound to React state with custom input sanitization.
- **Conditional Rendering**: Clean UI switches for Loading (`Loader`), Error (`ErrorMessage`), Empty State (`EmptyState`), and Table vs Card views.

---

## 📡 REST API & CRUD Endpoints

The application connects to **JSON Server** running at `http://localhost:3000`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/students` | Fetch all student records |
| `GET` | `/students/:id` | Fetch a single student by ID |
| `POST` | `/students` | Register a new student |
| `PUT` | `/students/:id` | Update an existing student |
| `DELETE` | `/students/:id` | Remove a student record |

---

## ⚡ Getting Started & How to Run

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended, tested on Node v22.16.0)
- **npm** (v9.0.0 or higher)

### 2. Installation
Open your terminal in the project directory:
```bash
npm install
```

### 3. Start the JSON Server (Backend API)
In terminal window #1:
```bash
npm run server
```
*JSON Server will start at `http://localhost:3000` watching `db.json`.*

### 4. Start the Vite React Application (Frontend)
In terminal window #2:
```bash
npm run dev
```
*Vite will launch the local development server at `http://localhost:5173`.*

---

## 📸 Application Pages & Screenshots Guide

1. **Dashboard (`/`)**: Displays welcome hero, total/active/inactive metrics, course distribution bars, and recent enrollments.
2. **Students Directory (`/students`)**: Search bar, course/gender/status/city dropdowns, sort options, 10-item pagination, and desktop table / mobile cards.
3. **Add Student (`/students/add`)**: 10-field controlled form with real-time error messages and validation guards.
4. **Student Details (`/students/:id`)**: High-fidelity profile card with banner, contact details, status pill, and action buttons.
5. **Edit Student (`/students/edit/:id`)**: Pre-filled update form with immediate validation and synchronization.
6. **Delete Confirmation Dialog**: Accessible overlay confirming deletion before making the API call.
7. **Dark Mode**: High-contrast theme toggle accessible directly in the navigation bar.

---

## 🔮 Future Enhancements

- CSV / Excel export for student directories.
- Bulk student operations (bulk status activation / batch delete).
- Upload student profile avatars with image cropping.
- Attendance and grading tracking module.
