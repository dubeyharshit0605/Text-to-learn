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

## Deployment

Deploy the backend first, then the frontend. The frontend needs the final backend URL, and the backend needs the final frontend URL for CORS.

### Backend on Render

Option A: use the included Blueprint:

1. Push this repository to GitHub.
2. In Render, create a new Blueprint and select this repository.
3. Render reads `render.yaml` from the repo root.
4. Fill `CLIENT_URL` after the Vercel frontend URL is available. For the first backend deploy, you can temporarily set it to your expected Vercel URL or update it after frontend deployment.
5. Optional variables: `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`, `YOUTUBE_API_KEY`, `GEMINI_API_KEY`.

Option B: create a Render Web Service manually:

```bash
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

Render environment variables:

```bash
NODE_ENV=production
SKIP_DB=true
CLIENT_URL=https://your-vercel-app.vercel.app
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
YOUTUBE_API_KEY=
GEMINI_API_KEY=
```

After deploy, verify:

```bash
https://your-render-service.onrender.com/api/health
```

### Frontend on Vercel

In Vercel, import the same GitHub repository and set:

```bash
Root Directory: client
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Vercel environment variables:

```bash
VITE_API_BASE_URL=https://your-render-service.onrender.com/api
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
VITE_AUTH0_AUDIENCE=
```

The included `client/vercel.json` adds an SPA rewrite so direct routes like `/courses/:id` work after refresh.

### Final Production Checklist

1. Deploy backend on Render.
2. Copy the Render URL.
3. Set `VITE_API_BASE_URL` in Vercel to `https://your-render-service.onrender.com/api`.
4. Deploy frontend on Vercel.
5. Copy the Vercel URL.
6. Set `CLIENT_URL` in Render to the Vercel URL.
7. Redeploy the backend after updating `CLIENT_URL`.
8. Open the Vercel URL and generate a course.

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
