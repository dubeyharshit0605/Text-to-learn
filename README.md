# Text-to-Learn

AI-powered course generator that turns a free-form topic into a structured course with modules, lessons, objectives, quizzes, video resources, Hinglish explanations, and PDF export.

## Features

- Prompt-to-course generation with 3 modules and 9 structured lessons
- Lesson renderer for headings, paragraphs, code, videos, and MCQs
- Saved course list and course detail pages
- PDF export for individual lessons
- Optional Auth0 login
- In-memory backend demo storage plus browser local storage fallback
- Optional YouTube and Gemini integrations with graceful fallbacks

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, Mongoose
- Auth: Auth0
- Integrations: YouTube Data API, Gemini text/audio

## Local Setup

Install dependencies if needed:

```bash
cd server
npm install

cd ../client
npm install
```

Run the backend:

```bash
cd server
npm start
```

Run the frontend:

```bash
cd client
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend runs at `http://localhost:8000`.

From the repository root, you can also run:

```bash
npm start
npm run client
```

## Environment Variables

Backend `.env` inside `server/`:

```bash
PORT=8000
CLIENT_URL=http://localhost:5173
MONGO_URI=
SKIP_DB=true
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
YOUTUBE_API_KEY=
GEMINI_API_KEY=
```

Frontend `.env` inside `client/`:

```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
```

Auth0, MongoDB, YouTube, and Gemini keys are optional for local demo mode.

You can copy the starter files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

## Deployment on Render

This repo is configured to deploy both apps on Render with the included `render.yaml` Blueprint:

- `text-to-learn-api-dubeyharshit0605`: Node/Express backend
- `text-to-learn-frontend-dubeyharshit0605`: React/Vite static frontend

### Render Blueprint

1. Push this repository to GitHub.
2. In Render, choose **New +** > **Blueprint**.
3. Connect `dubeyharshit0605/Text-to-learn`.
4. Render reads `render.yaml` from the repo root and creates both services.
5. Optional secret variables can be left blank for demo mode: `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`, `YOUTUBE_API_KEY`, `GEMINI_API_KEY`.

The expected production URLs are:

```bash
Frontend: https://text-to-learn-frontend-dubeyharshit0605.onrender.com
Backend:  https://text-to-learn-api-dubeyharshit0605.onrender.com
API:      https://text-to-learn-api-dubeyharshit0605.onrender.com/api
Health:   https://text-to-learn-api-dubeyharshit0605.onrender.com/api/health
```

If Render changes either generated URL, update these environment variables in the Render dashboard:

```bash
# Backend service
CLIENT_URL=https://your-frontend-service.onrender.com

# Frontend static site
VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
```

Then redeploy both services.

### Manual Render Setup

Backend Web Service:

```bash
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

Backend environment variables:

```bash
NODE_ENV=production
SKIP_DB=true
CLIENT_URL=https://your-frontend-service.onrender.com
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
YOUTUBE_API_KEY=
GEMINI_API_KEY=
```

Frontend Static Site:

```bash
Root Directory: leave blank
Build Command: cd client && npm install && npm run build
Publish Directory: client/dist
```

Frontend environment variables:

```bash
VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
```

Add a frontend rewrite rule for React Router:

```bash
Source: /*
Destination: /index.html
Action: Rewrite
```

## API Overview

- `POST /api/courses/generate` creates and saves a course from `{ "prompt": "Intro to React Hooks" }`
- `GET /api/courses` lists saved courses
- `GET /api/courses/:id` returns one course with modules and lessons
- `GET /api/youtube?query=...` returns embeddable video results or a YouTube search fallback
- `POST /api/explanations/hinglish-text` returns a Hinglish explanation
- `POST /api/explanations/hinglish-audio` returns WAV audio when Gemini is configured

## Demo Flow

1. Enter a topic on the home page.
2. Open the generated course syllabus.
3. Navigate into any lesson.
4. Try MCQs, video resources, Hinglish explanation, and PDF download.
