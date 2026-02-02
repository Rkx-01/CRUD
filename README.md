## Student Management API (SESD Workshop Assignment)

A simple **Student Management CRUD backend** built with **Node.js**, **Express**, and **TypeScript**, designed to demonstrate **OOP** and a **layered architecture**:

- **Models** → represent domain entities (e.g. `Student`)
- **Repositories** → data access logic (in-memory store in this project)
- **Services** → business rules and validations
- **Controllers** → HTTP request handling

The main entity is `Student`, and the API supports full CRUD along with **search**, **filtering**, **sorting**, **pagination**, **validation**, and **clean error handling**.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Validation**: Joi
- **Logging**: morgan
- **CORS**: cors

Data is stored in an **in-memory repository** for simplicity (sufficient for the assignment); it can be swapped for a real database later.

---

## Project Structure

```text
src/
  app.ts              # Express app setup (middlewares + routes)
  server.ts           # App bootstrap & server start

  config/
    env.ts            # Environment configuration (port, etc.)

  models/
    Student.ts        # Student entity (OOP class)

  repositories/
    StudentRepository.ts   # Data access layer for students (search/filter/sort/pagination)

  services/
    StudentService.ts      # Business logic for students

  controllers/
    StudentController.ts   # HTTP handlers for student routes

  routes/
    index.ts               # Root router
    studentRoutes.ts       # Student-related routes

  middlewares/
    errorHandler.ts        # Global error handler
    validate.ts            # Request body validation middleware

  validations/
    studentValidation.ts   # Joi schemas for create/update student

  utils/
    ApiError.ts            # Custom error class with HTTP status codes
```

This structure clearly separates **controllers → services → repositories**, with proper `Student` model classes to show **OOP in Node.js**.

---

## Getting Started

### 1. Install dependencies

From the project root:

```bash
npm install
```

*(If you cloned the repo and `node_modules` is missing.)*

### 2. Run in development mode

```bash
npm run dev
```

The server will start on `http://localhost:3000` by default (see `src/config/env.ts`).

### 3. Build for production

```bash
npm run build
```

### 4. Run compiled code

```bash
npm start
```

---

## Core Entity: Student

Each **student** contains:

- `id` (string, generated)
- `name` (string, required)
- `email` (string, required, email format)
- `rollNumber` (string, required)
- `department` (string, required, e.g. CSE, ECE)
- `year` (number, 1–4)
- `section` (string, optional)
- `cgpa` (number, optional, 0–10)
- `createdAt` / `updatedAt` (dates, set automatically)

The OOP `Student` class also exposes an `update` method that encapsulates how a student can be modified.

---

## API Endpoints

All endpoints are prefixed with `/api`.

### Create Student

- **URL**: `POST /api/students`
- **Body**:

```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "rollNumber": "CSE23-001",
  "department": "CSE",
  "year": 2,
  "section": "A",
  "cgpa": 8.7
}
```

- **Responses**:
  - `201 Created` with `{ "data": { ...student } }`
  - `400 Bad Request` for validation errors

---

### Get Students (List with search/filter/sort/pagination)

- **URL**: `GET /api/students`
- **Query params (all optional)**:
  - `search` – matches `name`, `email`, or `rollNumber`
  - `department` – exact department (e.g. `CSE`)
  - `year` – integer `1–4`
  - `section` – e.g. `A`
  - `minCgpa` / `maxCgpa` – numeric range
  - `sort` – e.g. `name:asc,cgpa:desc`
  - `page` – page number (default `1`)
  - `limit` – page size (default `10`)

- **Example**:

`GET /api/students?search=alice&department=CSE&year=2&sort=cgpa:desc,name:asc&page=1&limit=5`

- **Response**:

```json
{
  "data": [ /* array of students */ ],
  "meta": {
    "total": 12,
    "page": 1,
    "limit": 5,
    "totalPages": 3
  }
}
```

---

### Get Single Student

- **URL**: `GET /api/students/:id`
- **Response**:
  - `200 OK` with `{ "data": { ...student } }`
  - `404 Not Found` if id does not exist

---

### Update Student

- **URL**: `PUT /api/students/:id`
- **Body**: any subset of the fields from **Create Student** (all optional).
- **Response**:
  - `200 OK` with updated `{ "data": { ...student } }`
  - `400 Bad Request` for validation errors
  - `404 Not Found` if id does not exist

---

### Delete Student

- **URL**: `DELETE /api/students/:id`
- **Response**:
  - `204 No Content` on success
  - `404 Not Found` if id does not exist

---

## Validation & Error Handling

- **Validation**:
  - Implemented using **Joi** schemas (`studentValidation.ts`).
  - `validate` middleware runs before controller handlers and throws a custom `ApiError` when the body is invalid.
  - Examples:
    - `year` must be between `1` and `4`
    - `cgpa` must be between `0` and `10`
    - `email` must be a valid email

- **Error handling**:
  - Centralised `errorHandler` middleware catches all errors.
  - Known errors use the `ApiError` class with a specific HTTP status code.
  - Responses follow the shape:

```json
{
  "error": {
    "message": "Validation error",
    "details": [ "year must be less than or equal to 4", "email must be a valid email" ]
  }
}
```

---

## How OOP and Layers Are Used

- **Model (`Student` class)**:
  - Represents the student domain object with its own `update` method.
- **Repository (`StudentRepository`)**:
  - Encapsulates data operations (`create`, `findById`, `findAll`, `update`, `delete`).
  - Handles **search**, **filter**, **sorting**, **pagination** logic.
- **Service (`StudentService`)**:
  - Contains domain rules (e.g. year must be 1–4, CGPA 0–10).
  - Calls the repository and converts domain errors into `ApiError`s.
- **Controller (`StudentController`)**:
  - Handles Express `Request`/`Response`, parses query params, and maps HTTP to service calls.

This is the classic **controllers → services → repositories** pattern expected in the assignment.

---

## Notes for Submission

- This project is suitable as the **“full-fledged CRUD App backend”** for the SESD Workshop Assignment:
  - Non-Todo domain (**students**, easy and relatable for 2nd-year students).
  - Full CRUD with extra features:
    - **Create / Get single / Get list / Update / Delete**
    - **Search, filter, sorting, pagination**
    - **Validation + clean error handling**
  - Clean OOP and layered structure.
- Push this folder to a GitHub repository and include the repo link in the submission form.

# CRUD
