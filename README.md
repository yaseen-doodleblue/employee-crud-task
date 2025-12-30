# Employee CRUD API

A RESTful API for managing employees, built with **NestJS**, **TypeORM**, **PostgreSQL**, and **Docker**.

---

## 🚀 Prerequisites

Before running this project, ensure you have the following installed:

* **Node.js** (v16 or higher)
* **pnpm** (preferred package manager)
* **Docker**
* **Docker Compose**

---

## 🛠️ Installation & Setup

Follow these steps to get the project running on your local machine.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yaseen-doodleblue/employee-crud-task.git
cd employee-crud-task
```

---

### 2️⃣ Install Dependencies

```bash
pnpm install
```

---

### 3️⃣ Configure Environment Variables

1. Create a `.env` file in the root directory.
2. Copy the contents from `.env.example` into `.env`.
3. Keep default values if using Docker.

---

### 4️⃣ Start PostgreSQL Using Docker

```bash
docker-compose up -d
```

Check if the container is running:

```bash
docker ps
```

---

### 5️⃣ Run the Application

```bash
pnpm start:dev
```

Application runs at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/employees`     | Create employee    |
| GET    | `/employees`     | Get all employees  |
| GET    | `/employees/:id` | Get employee by ID |
| PUT    | `/employees/:id` | Update employee    |
| DELETE | `/employees/:id` | Delete employee    |

---

## 🧪 Sample Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "department": "IT",
  "salary": 50000
}
```

---

## 🛑 Stop the Application

```bash
docker-compose down
```

---

## 👨‍💻 Tech Stack

* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* Docker

---
