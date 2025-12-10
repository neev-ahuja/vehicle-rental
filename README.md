# Vehicle Rental App

A comprehensive full-stack application for browsing and renting vehicles, featuring a modern UI and a robust backend.

## 🚀 Features

- **User Authentication**: Secure login and registration.
- **Vehicle Browsing**: View available vehicles for rent.
- **Booking System**: Streamlined process to book vehicles.
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS.
- **Modern UI**: Polished look and feel using Shadcn UI components.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State/Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: JWT (JSON Web Tokens)

## 📋 Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## ⚙️ Installation & Setup

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (based on `.env.example` if available) and configure your database and JWT secret:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=vehicle_rental
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
# Server generally runs on http://localhost:5000
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
# App generally runs on http://localhost:5173
```

## 🏃 Usage

1.  Ensure the PostgreSQL database is running.
2.  Start the backend server.
3.  Start the frontend application.
4.  Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).
5.  Register a new account or log in to start browsing vehicles.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
