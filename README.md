# MERN Expense Tracker

This is a full-stack web application for tracking personal expenses, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **User Authentication**: Secure JWT-based authentication (Sign Up, Login, Logout).
- **Expense Management**: Create, Read, Update, and Delete expenses.
- **Dashboard Analytics**: View daily, monthly, and total spending at a glance.
- **Visual Reports**: Interactive charts showing spending by category and monthly trends.
- **Filtering**: Filter expenses by date range and category.
- **Responsive UI**: Modern, clean interface built with Material-UI.
- **Dark Mode**: Toggle between light and dark themes.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (with Mongoose), JWT, bcryptjs
- **Frontend**: React, Vite, React Router, Material-UI, Recharts, Axios

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or a local MongoDB instance)

## Setup Instructions

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create an environment file:**
    -   Copy `.env.example` to a new file named `.env`.
    -   Update the `MONGO_URI` with your MongoDB connection string.
    -   Optionally, change the `JWT_SECRET` to a new random string.

4.  **Start the backend server:**
    ```sh
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Create an environment file (optional):**
    -   If your backend is running on a different port, copy `.env.example` to `.env` and update `VITE_API_URL`.

4.  **Start the frontend development server:**
    ```sh
    npm run dev
    ```
    The application will open automatically in your browser at `http://localhost:5173`.

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/expenses`
- `POST /api/expenses`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`
- `GET /api/expenses/daily`
- `GET /api/expenses/monthly`
