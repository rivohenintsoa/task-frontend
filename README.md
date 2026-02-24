# Task Management Frontend

## About

This is the frontend application for the Task Management system.  
It is built with **React 19**, **Vite**, **TailwindCSS**, and **TypeScript**, and communicates with the **Task Management API**.

Features:

- User authentication
- Display task lists with filters (status, assigned user, search)
- Create, update, delete tasks depending on user role
- Responsive UI
- Integration with the Task Management API
- Form validation with React Hook Form + Zod

---

## Requirements

- Node.js >= 18
- npm or yarn
- Access to the Task Management API

---

## Installation

### Clone the repository

```bash
git clone https://github.com/rivohenintsoa/task-frontend.git
cd task-frontend
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Configure environment variables

Create a .env file in the project root:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

Adjust the URL to point to your running Task Management API.

### Run the development server

```bash
npm run dev
# or
yarn dev
```

### The app will be available at:

```bash
http://localhost:5173
```
