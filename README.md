# Team Nexus — Student Team Members Management Application

> **Course:** 21CSS301T – Full Stack Development  
> **Institute:** SRM Institute of Science and Technology  
> **Assessment:** CLAT-2 (Online Assessment)  

A full-stack web application for managing student team members, built with React.js on the frontend and Node.js + Express + MongoDB on the backend.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js + React Router v6 |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| File Upload | Multer |
| HTTP Client | Axios |
| Code Editor | Visual Studio Code |
| DB GUI | MongoDB Compass |

---

## App Pages

| Page | Route | Description |
|------|-------|-------------|
| Home Page | `/` | Landing page with team name, welcome message, and navigation |
| Add Member | `/add` | Form to register a new team member with image upload |
| View Members | `/view` | Card grid of all registered members |
| Member Details | `/members/:id` | Full profile page of a single member |

---

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally on port 27017)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-team-name>.git
cd <your-team-name>
```

### 2. Set up the backend
```bash
cd backend
npm install
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
```

---

## Running the App

### Start MongoDB
Make sure MongoDB is running locally:
```bash
mongod
```

### Start the backend (in `/backend`)
```bash
npm start
# or for development with auto-reload:
npm run dev
```
Backend runs on: **http://localhost:5000**

### Start the frontend (in `/frontend`)
```bash
npm start
```
Frontend runs on: **http://localhost:3000**

---

## API Endpoints

### Members

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/members` | Add a new team member (multipart/form-data with image) |
| `GET` | `/members` | Retrieve all team members |
| `GET` | `/members/:id` | Retrieve a single member by ID |
| `DELETE` | `/members/:id` | Delete a member by ID |
| `GET` | `/api/members` | Same as GET /members (browser testable) |
| `GET` | `/api/members/:id` | Same as GET /members/:id (browser testable) |

### Testing in Browser
- View all members: http://localhost:5000/api/members
- View single member: http://localhost:5000/api/members/<member_id>

### POST /members — Form Fields
| Field | Type | Required |
|-------|------|----------|
| name | string | ✅ |
| roll | string | ✅ |
| year | string | ✅ |
| degree | string | ✅ |
| email | string | ❌ |
| role | string | ❌ |
| aboutProject | string | ❌ |
| hobbies | string (comma separated) | ❌ |
| certificate | string | ❌ |
| internship | string | ❌ |
| aboutYourAim | string | ❌ |
| image | file (image/*) | ❌ |

---

## Project Structure

```
team-nexus/
├── backend/
│   ├── server.js          # Express server, Mongoose models, all API routes
│   ├── uploads/           # Uploaded member images (auto-created)
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Root component with React Router
│   │   ├── App.css        # Global design system & CSS variables
│   │   ├── index.js       # React entry point
│   │   ├── components/
│   │   │   └── Navbar.js  # Shared navigation bar
│   │   └── pages/
│   │       ├── HomePage.js          # Landing page
│   │       ├── HomePage.css
│   │       ├── AddMemberPage.js     # Add member form
│   │       ├── AddMemberPage.css
│   │       ├── ViewMembersPage.js   # Members grid
│   │       ├── ViewMembersPage.css
│   │       ├── MemberDetailsPage.js # Single member profile
│   │       └── MemberDetailsPage.css
│   └── package.json
├── .gitignore
└── README.md
```

---

## Features

- ✅ Display Team Name (TEAM NEXUS) on all pages  
- ✅ Add new members via form with image upload (Multer → `uploads/` folder)  
- ✅ Input validation on the Add Member form  
- ✅ Axios POST to backend for adding members  
- ✅ View all members with profile image, name, roll number, role  
- ✅ "View Details" button navigates to full member profile  
- ✅ Axios GET for all members and single member  
- ✅ API accessible at `/api/members` and `/api/members/:id` for browser testing  
- ✅ Responsive design  
- ✅ React Router v6 for navigation  
