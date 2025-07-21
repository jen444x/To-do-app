# PERN To-Do App

This is a basic to-do list application built with the PERN stack (PostgreSQL, Express, React, Node.js). It allows users to create, view, update, and delete tasks.

## Features

- Create new tasks with a name and optional description
- Edit existing tasks
- Delete tasks
- View all tasks

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: PostgreSQL

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL

### Backend Setup

1. Go to the backend directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

4. Create the database and tables using the included SQL file:

   ```bash
   psql -U your_user -d your_database -f database.sql
   ```

5. Start the backend server:

   ```bash
   node index.js
   ```

### Frontend Setup

1. Go to the frontend directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

## API Routes

- `GET /todos` – Retrieve all tasks
- `GET /todos/:id` – Retrieve a specific task by ID
- `POST /todos` – Create a new task
- `PUT /todos/:id` – Update an existing task by ID
- `DELETE /todos/:id` – Delete a task by ID
