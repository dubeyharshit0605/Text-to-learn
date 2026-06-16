# Text-to-Learn

AI-powered course generator that turns a free-form topic into a structured course with modules, lessons, objectives, quizzes, video resources, Hinglish explanations, and PDF export.

## Features

- Prompt-to-course generation with 5 modules and 20 structured lessons
- Lesson renderer for headings, paragraphs, code, videos, and MCQs
- Saved course list and course detail pages
- PDF export for individual lessons
- Optional Auth0 login
- Optional MongoDB persistence, with JSON-file fallback for local demos
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
