
# Employee CRUD API

A RESTful API for managing employees, built with **NestJS**, **TypeORM**, **PostgreSQL**, and **Docker**.

## 🚀 Prerequisites

Before running this project, ensure you have the following installed:
* **Node.js** (v16 or higher)
* **pnpm** (preferred package manager)
* **Docker** & **Docker Compose**

## 🛠️ Installation & Setup

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/yaseen-doodleblue/employee-crud-task.git](https://github.com/yaseen-doodleblue/employee-crud-task.git)
cd employee-crud-task

```

### 2. Install Dependencies

```bash
pnpm install

```

### 3. Configure Environment Variables

The project needs an environment file to connect to the database.

1. Create a new file named `.env` in the root folder.
2. Copy the contents from `.env.example` into `.env`.
3. (Optional) You can leave the default values if you are using the provided Docker setup.

### 4. Start the Database (Docker)

This command will download PostgreSQL and start it in a container.

```bash
docker-compose up -d

```

> *Check if the database is running:* `docker ps`

### 5. Start the Application

Run the NestJS server in development mode.

```bash
pnpm start:dev

```

The server will start on: `http://localhost:3000`

---

## 📡 API Endpoints

You can test these endpoints using **Postman** or **Thunder Client**.

### Employees

| Method | Endpoint | Description | Body (JSON) |
| --- | --- | --- | --- |
| **POST** | `/employees` | Create a new employee | `{ "firstName": "John", "lastName": "Doe", "email": "john@test.com", "department": "IT", "salary": 50000 }` |
| **GET** | `/employees` | Get all employees | N/A |
| **GET** | `/employees/:id` | Get employee by ID | N/A |
| **PUT** | `/employees/:id` | Update employee | `{ "salary": 60000 }` (Partial updates allowed) |
| **DELETE** | `/employees/:id` | Delete employee | N/A |

---

## 🛑 How to Stop

To stop the application and database:

1. Stop the server: Press `Ctrl + C` in the terminal.
2. Stop Docker:

```bash
docker-compose down

```

## 👨‍💻 Tech Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **Database:** PostgreSQL
* **ORM:** TypeORM
* **Containerization:** Docker

```

```
