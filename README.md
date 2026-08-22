# Jobify — Job Application Tracker

A full-stack MERN application for tracking job applications: create and manage
listings, filter and search across them, and view aggregate stats on a dashboard.

**Live:** [jobify-mern-stack-app-1.onrender.com](https://jobify-mern-stack-app-1.onrender.com)
— hosted on Render's free tier, so the first request may take up to a minute to wake.

Built on current major versions throughout — Express 5, React 19, React Query v5,
React Router 7, Mongoose 9. Notes on that below.

---

## Stack

**Backend** — Node.js, Express 5, MongoDB with Mongoose 9, JWT auth in httpOnly
cookies, bcryptjs, Cloudinary + Multer for avatar uploads, express-validator,
Helmet, express-rate-limit, express-mongo-sanitize

**Frontend** — React 19, Vite 8, React Router 7 (loaders and actions), TanStack Query
v5, styled-components 6, Recharts, react-toastify, Day.js

---

## Features

- Cookie-based JWT authentication — token stored httpOnly, never exposed to JS
- Role-based access with an admin route for application-wide stats
- Full CRUD on job entries, scoped so users can only touch their own records
- Search, filter by status and job type, sort, and pagination — handled server-side
- Stats dashboard: monthly application charts and status breakdowns via a Mongoose
  aggregation pipeline
- Avatar upload to Cloudinary, with the previous image cleaned up on replace
- Demo user account so the live site can be explored without signing up
- Security layer: Helmet headers, rate limiting on auth routes, request validation,
  NoSQL injection sanitization

<!-- TODO: Trim anything above that isn't actually implemented. An overstated feature
     list is worse than a short accurate one. -->

---

## Notes on the version stack

Most MERN tutorials and starters still target Express 4, React 18, and React Query v4.
Running this on current majors meant working through the breaking changes in each:

<!-- TODO: This section is the most valuable part of this README — it's the part that
     is unambiguously yours. Fill in what you actually hit. Likely candidates:

     - React Query v4 → v5: the object-signature change for useQuery/useMutation,
       and isLoading → isPending
     - React Router 6.10 → 7: import path and API changes
     - Express 4 → 5: async error handling, req.query now a getter, changed
       wildcard/path-matching syntax
     - Mongoose 9: removed callback APIs, stricter query behaviour
     - styled-components 5 → 6

     One or two sentences each: what broke, what you changed. This section is the
     part of the README that is unambiguously your own work — three real entries here
     are worth more than the entire feature list above. -->

---

## Running locally

```bash
git clone https://github.com/asadlatif316/JOBIFY---MERN-STACK-APP.git
cd JOBIFY---MERN-STACK-APP
npm run setup-project
```

Create a `.env` in the root:

```
NODE_ENV=development
PORT=5100
MONGO_URL=
JWT_SECRET=
JWT_EXPIRES_IN=1d
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

<!-- TODO: Confirm these names match your code, and commit a .env.example. -->

```bash
npm run dev       # client + server together via concurrently
node populate.js  # optional: seed sample job data
```

---

## Known issues

- `express-mongo-sanitize` may not function correctly under Express 5, since
  `req.query` is now a getter. Needs verification.
- Free-tier hosting means cold starts on the live demo.

<!-- TODO: Keep this section honest and short. A known-issues list signals you actually
     understand your own codebase. Remove entries as you fix them. -->
