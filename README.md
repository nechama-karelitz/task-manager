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
│   ├── __tests__/       # Unit tests for services and utilities
│   │   ├── validation.test.ts        # Tests for validation functions
│   │   ├── category.service.test.ts  # Tests for category service
│   │   ├── task.service.test.ts      # Tests for task service
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
   git clone https://github.com/nechama-karelitz/task-manager.git
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

## MongoDB Setup
### MongoDB Installation and Running
1. **Install MongoDB** (if not already installed):
   - If you don't have MongoDB installed, you can follow the guide [MongoDB Installation](https://www.mongodb.com/docs/manual/installation/).
2. **Start MongoDB:**
   - If you are running MongoDB locally, you can start it by running:
   ```sh
   mongod
   ```
   - This command will start MongoDB on the default port (`27017`).
3. **Connecting to the Database:**
   - If you are using MongoDB Atlas or another cloud service, you should define the connection URI in the `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/task_manager
   ```
   - If you're using a MongoDB service in the cloud, you will need to adjust the connection string with your credentials.

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

## **Testing**

This project uses **Jest** for unit testing to ensure data integrity and business logic correctness.

### **Running Tests**
To execute the test suite, run:
```sh
npm test
```

### **Test Coverage**
The following services and utilities have unit tests:
- **Validation:** Ensures correct data structure and values.
- **Category Service:** Tests for creating, retrieving, and validating categories.
- **Task Service:** Tests for creating, updating, deleting, and filtering tasks.

### **Example: Running a Single Test File**
If you want to run tests only for a specific service, use:
```sh
npm test -- category.service.test.ts
```
Or a specific test within a file:
```sh
npm test -- category.service.test.ts -t "createCategory"
```
