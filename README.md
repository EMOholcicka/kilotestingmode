# Strava Clone

A full-stack web application inspired by Strava, built with React + TypeScript on the frontend and FastAPI + MySQL on the backend, containerized with Docker Compose.

## Features

- User authentication (login, registration)
- Dashboard with activity summaries and charts
- Activity management (list, detail, create, edit, delete)
- Athlete profile with personal records and mileage chart
- Training plans with weekly views and planned vs completed workouts
- Responsive design with sidebar navigation and dark mode

## Tech Stack

- Frontend: React 18, TypeScript, Vite, React Router, Tailwind CSS, Axios, Recharts, Zustand
- Backend: FastAPI, SQLAlchemy, MySQL
- Authentication: JWT
- Containerization: Docker, Docker Compose

## Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd strava-clone
   ```

2. Copy .env example:
   ```bash
   cp .env.example .env
   ```
   Edit .env with your values (DB credentials, JWT secret, etc.)

3. Build and start services:
   ```bash
   docker-compose up --build
   ```

4. The frontend will be available at http://localhost:3000
   Backend at http://localhost:8000
   MySQL runs internally.

5. Register a user at /register, then login.

## Development

- Frontend: cd frontend, npm run dev
- Backend: cd backend, uvicorn app.main:app --reload

For database migrations (if using Alembic), cd backend, alembic upgrade head

## Deployment

For production, build Docker images and deploy to a host with Docker Compose or Kubernetes.

Ensure .env is set for production, and consider adding Nginx for reverse proxy if needed.

