# Task Manager API

## Overview

Task Manager is a simple task management API built with Node.js, Express, and MongoDB. It allows users to create, update, delete, and retrieve tasks and categories.

## Features

- **Task Management:** Create, update, delete, and retrieve tasks.
- **Category Management:** Create and list categories.
- **Filtering:** Retrieve tasks by status and category.
- **Validation:** Data validation for tasks and categories.
- **Error Handling:** Standardized error messages.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Frontend:** AngularJS (minimal setup)
- **Validation:** Custom validation utilities

## Project Structure

```
backend/
│── src/
│   ├── config/          # Database and environment configurations
│   ├── controllers/     # API controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript interfaces and types
│   ├── constants/       # Application-wide constants
│   ├── index.ts         # Entry point of the backend
│── .env                 # Environment variables
│── package.json         # Dependencies and scripts
│── tsconfig.json        # TypeScript configuration

frontend/
│── index.html           # Single-page frontend (AngularJS)
│── app.js               # Frontend logic
```

## Installation

### Prerequisites

- Node.js v16+
- MongoDB installed and running

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/task-manager.git
   cd task-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory and define the following:
     ```env
     MONGO_URI=mongodb://localhost:27017/task_manager
     PORT=5001
     ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
5. Open `index.html` in a browser to interact with the frontend.

## API Endpoints

### Task Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| POST   | `/api/tasks`     | Create a new task |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

### Category Endpoints

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/api/categories` | Get all categories    |
| POST   | `/api/categories` | Create a new category |

## Validation Rules

- **Task Title:** Required, trimmed.
- **Description:** Optional, max 500 characters.
- **Status:** Must be one of `Pending`, `In Progress`, or `Completed`.
- **Category:** Must reference an existing category.