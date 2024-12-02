# Solidithai Assignment 1

This repository contains the source code for the Solidithai Assignment 1. It is a full-stack application divided into two main components:

- **Backend**: Implemented in Go.
- **Frontend**: Built using React.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Documentation](#api-documentation)

---

## Project Overview

This project is designed as a full-stack application to showcase practical implementation skills. The backend provides RESTful APIs, while the frontend consumes these APIs to deliver a seamless user experience.

---

## Technologies Used

### Backend:
- Go (Golang)
- Gin Web Framework
- MongoDB
- JWT for Authentication

### Frontend:
- React
- Yarn (Package Manager)
- CSS for Styling

---

## Setup Instructions

### Prerequisites
- Go installed (for backend development).
- Node.js and Yarn installed (for frontend development).

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Start the server:
   ```bash
   go run main.go
   ```
4. The backend should now be running on `http://localhost:8081`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn start
   ```
4. Access the frontend at `http://localhost:3000`.

---

## Project Structure

```plaintext
solidithai-assignment-1/
├── backend/
│   ├── main.go
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
│   │   └── index.js
└── README.md
└── .gitignore
```

- **Backend**: Contains Go source code and application logic.
- **Frontend**: Includes React components and services.

---

## Features

### Backend:
- User Authentication (JWT-based).
- CRUD Operations.
- MongoDB Integration.

### Frontend:
- Responsive UI.
- Integration with backend APIs.
- Modern styling for a clean user experience.
---

## API Documentation

The API documentation for this project is available at the following link:

[View API Documentation](https://documenter.getpostman.com/view/26586964/2sAYBYgVtq)
