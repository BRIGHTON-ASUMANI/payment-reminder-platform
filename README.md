# voice-reminder-system
[![Jest](https://img.shields.io/badge/tested%20with-jest-9749ff)](https://jestjs.io/)
![Screenshot from 2025-01-06 21-31-01](https://github.com/user-attachments/assets/591da81c-140f-4bd1-b207-886d780b7eef)
![Screenshot from 2025-01-06 21-30-38](https://github.com/user-attachments/assets/e220e917-1d25-4e08-85da-deecb00203f1)
![Screenshot from 2025-01-06 21-30-08](https://github.com/user-attachments/assets/2db86742-bf3c-4b35-b368-a8220b33b907)
![Screenshot from 2025-01-06 21-33-40](https://github.com/user-attachments/assets/d96ed067-3a69-46e2-a0b5-9cbae9bce9eb)


This repository contains a full-stack application with separate frontend and backend directories. The frontend is built with Next.js, while the backend uses Node.js with Prisma ORM and PostgreSQL database. Authentication is implemented using JSON Web Tokens (JWT).

## Project Structure
project-root/ 
    ├── frontend/ # Next.js frontend application 
    └── backend/ # Node.js backend application



## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **PostgreSQL**

## Getting Started

### Backend Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up your environment variables:  
   Create a `.env` file in the backend directory with the following variables:

    ```plaintext
    DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
    JWT_SECRET="your-secret-key"
    
    ```

5. Start the backend server:

    ```bash
    node src/app.js
    ```

The backend server will start running on `http://localhost:<port>`.

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    yarn dev
    ```

The frontend application will be available at `http://localhost:3000`.

## API Documentation

API documentation is available at the `/api-docs` endpoint once the backend server is running. This provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## Technical Stack

### Frontend

- **Next.js** - A React framework for building server-side rendered web applications.
- **React** - A JavaScript library for building user interfaces.
- **Shadcn UI**

### Backend

- **Node.js** - JavaScript runtime for building server-side applications.
- **Express.js** - A minimal web framework for Node.js.
- **Prisma ORM** - A modern database toolkit for Node.js and TypeScript.
- **PostgreSQL** - A relational database used to store application data.
- **JWT (JSON Web Tokens)** - Authentication mechanism to ensure secure access to protected routes.

## Features

- **User authentication using JWT**: Secure login and token management.
- **Voice reminder creation**: Users can create, manage, and view voice reminders.
- [Add any additional features here, such as reminder notifications, reminder updates, etc.]

## Database Schema

The application uses Prisma ORM with PostgreSQL. The schema can be found in `backend/prisma/schema.prisma`. This defines the tables and relationships necessary for the application, including models for users and reminders.

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. To access protected routes, you must include a valid JWT token in the `Authorization` header of your request:

```plaintext
Authorization: Bearer <your-token>
