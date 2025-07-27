# Period Cycle Tracker

A modern, full-stack application to help users track and predict their menstrual cycles, built with React, Spring Boot, and Clerk for authentication.

## Overview

This application provides a user-friendly interface for logging period dates, symptoms, and moods. It offers predictions for future cycles and fertility windows. The frontend is built as a responsive single-page application, communicating with a robust Spring Boot backend via a REST API. All user data is kept private and secure behind a robust JWT-based authentication system powered by Clerk.

## 📷 Screenshot

Coming soon!

## ✨ Features

- `Secure User Authentication`: Full sign-up, sign-in, and profile management handled by Clerk.
- `Dashboard Overview`: A central hub to view the current cycle status and upcoming predictions.
- `Cycle Logging`: Easily log start and end dates of periods.
- `Personalized Settings`: Users can manage their profile and application settings.
- `API Mocking`: Uses Mock Service Worker (MSW) to simulate API calls for a smooth development experience while the backend is in progress.
- `Protected Routes`: API and UI routes are protected, ensuring user data is secure.
- `Responsive Design`: Styled with Tailwind CSS for a great experience on any device.

## 🏗️ Project Architecture

This project is built with a modern, decoupled architecture.

| Tier       | Technology        | Description                                                                                 |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------- |
| Frontend   | React (with Vite) | A fast, modern single-page application using TypeScript and React Router v6 for navigation. |
|            | Tailwind CSS      | A utility-first CSS framework for rapid UI development.                                     |
| Backend    | Spring Boot       | A robust Java framework (version 17+) for building the REST API.                            |
| Database   | PostgreSQL        | A powerful, open-source object-relational database system.                                  |
| API & Auth | REST API (JSON)   | The communication protocol between the frontend and backend.                                |
|            | JWT via Clerk     | Handles all user authentication, authorization, and management.                             |
|            | DevOps            | Docker For containerizing both the frontend and backend applications.                       |
|            | GitHub Actions    | For continuous integration and continuous deployment (CI/CD).                               |
|            | Deployment        | Planned for Render or AWS EC2.                                                              |

## 🚀 Getting Started (Frontend)

These instructions will get the frontend development server running on your local machine. It currently uses a mock API server (MSW) for data.

### Prerequisites

- Node.js (v18 or newer recommended)
- npm (or yarn/pnpm)
- A Clerk.dev account to get your API keys.

### Installation

#### 1. Clone the repository:

```Bash
git clone https://github.com/bcdipesh/period-cycle-tracker.git
cd period-cycle-tracker/client
```

#### 2. Install dependencies:

```Bash
npm install
```

#### 3. Set up environment variables:

Create a `.env` file in the root of your project by copying the example file:

```Bash
cp .env.example .env
```

Open the `.env` file and add your Vite Clerk Publishable Key and Clerk Secret Key. You can find this on the API Keys page of your Clerk Dashboard.

```
# Clerk Secret Keys

VITE_CLERK_PUBLISHABLE_KEY=pk_test\***\*\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***
CLERK_SECRET_KEY=sk_test\***\*\*\*\*\*\***\*\*\*\*\***\*\*\*\*\***
```

#### 4. Run the development server:

```Bash
npm run dev
```

The application should now be running on `http://localhost:5173`.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with MSW enabled.
- `npm run build`: Builds the app for production to the dist folder.
- `npm run lint`: Lints the code using ESLint to find and fix problems.
- `npm run preview`: Serves the production build locally to preview it.

## 📄 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.

Creating with ❤️ for my wife by Dipesh B C [@bcdipesh](https://dipeshbc.com)
