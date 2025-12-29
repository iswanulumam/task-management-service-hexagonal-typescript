# 🚀 Task Management Service

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

**A production-ready task management service built with Hexagonal Architecture (Ports & Adapters) pattern in TypeScript**

[Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [API Documentation](#-api-documentation) • [Project Structure](#-project-structure)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Contributing](#-contributing)

---

## 🎯 Overview

This project demonstrates a **clean, maintainable, and scalable** backend service built using the **Hexagonal Architecture** (also known as Ports & Adapters) pattern. It showcases best practices in:

- ✅ **Separation of Concerns** - Business logic isolated from infrastructure
- ✅ **Dependency Inversion** - High-level modules don't depend on low-level modules
- ✅ **Testability** - Easy to test with mockable interfaces
- ✅ **Flexibility** - Easy to swap implementations (e.g., SQLite → PostgreSQL)
- ✅ **Type Safety** - Full TypeScript with strict mode
- ✅ **Production Ready** - Error handling, logging, validation, and more

### Why Hexagonal Architecture?

The Hexagonal Architecture pattern allows the application core to be independent of external concerns like databases, web frameworks, or CLI interfaces. This makes the codebase:

- **Maintainable** - Changes to infrastructure don't affect business logic
- **Testable** - Business logic can be tested without external dependencies
- **Flexible** - Easy to add new adapters (GraphQL, gRPC, different databases)
- **Portable** - Core logic can be reused across different platforms

---

## ✨ Features

### Core Functionality
- 🔐 **User Management** - Create and retrieve users via REST API
- 💻 **CLI Interface** - Command-line interface for user operations
- 🗄️ **SQLite Database** - Lightweight, file-based database
- ✅ **Input Validation** - Class-validator for request validation
- 📝 **Structured Logging** - Custom logger with multiple log levels
- 🔧 **Environment Configuration** - Configurable via environment variables

### Production Features
- 🛡️ **Error Handling** - Comprehensive error handling with standardized responses
- 🏥 **Health Checks** - Health endpoint for monitoring
- 📊 **Type Safety** - Full TypeScript with strict mode enabled
- 🎯 **RESTful API** - Clean, RESTful API design
- 📦 **Modular Design** - Clean separation of concerns

---

## 🏗️ Architecture

This project follows the **Hexagonal Architecture** pattern, which separates the application into three main layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Core                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Domain Layer                             │   │
│  │  • Entities (User)                                   │   │
│  │  • Domain Services (UserService)                      │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Ports (Interfaces)                       │   │
│  │  • UserRepository (Port)                             │   │
│  │  • UserService (Port)                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
        ┌───────────────────┴───────────────────┐
        │                                       │
┌───────▼────────┐                    ┌───────▼────────┐
│  Inbound       │                    │  Outbound       │
│  Adapters      │                    │  Adapters       │
│                │                    │                 │
│  • Web         │                    │  • SQLite       │
│    Controller  │                    │    Repository   │
│  • CLI         │                    │  • (Future:     │
│    Controller  │                    │     PostgreSQL) │
└────────────────┘                    └─────────────────┘
```

### Layer Breakdown

#### 1. **Domain Layer** (`src/application/domain/`)
The core business logic, independent of external frameworks:
- **Entities**: Domain models (e.g., `User`)
- **Services**: Business logic implementations

#### 2. **Ports** (`src/application/port/`)
Interfaces that define contracts between layers:
- **Repository Ports**: Define data access contracts
- **Service Ports**: Define business service contracts

#### 3. **Adapters** (`src/adapter/`)
Implementations that connect the core to external systems:

**Inbound Adapters** (Driving/Input):
- `web/` - REST API controllers
- `cli/` - Command-line interface controllers

**Outbound Adapters** (Driven/Output):
- `sqlite/` - SQLite database repository implementation

### Benefits of This Architecture

1. **Independence**: Core business logic doesn't depend on Express, SQLite, or CLI
2. **Testability**: Easy to mock ports for unit testing
3. **Flexibility**: Can swap SQLite for PostgreSQL without changing business logic
4. **Clarity**: Clear boundaries between layers

---

## 🛠️ Tech Stack

### Core Technologies
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Embedded database

### Key Libraries
- **class-validator** - Decorator-based validation
- **class-transformer** - Object transformation
- **commander** - CLI framework
- **dotenv** - Environment variable management

### Development Tools
- **TypeScript** - Compiler with strict mode
- **nodemon** - Development server with hot-reload
- **ts-node** - TypeScript execution

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **yarn** >= 1.22.0)
- **SQLite3** (usually comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-service-hexagonal-typescript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   PORT=3000
   DB_PATH=./db_sqlite/database.sqlite
   NODE_ENV=development
   ```

4. **Initialize the database**
   ```bash
   sqlite3 db_sqlite/database.sqlite < script.sql
   ```

### Running the Application

#### Development Mode (with hot-reload)
```bash
npm run dev
```
Server starts at `http://localhost:3000`

#### Production Mode
```bash
npm run build
npm start
```

#### CLI Usage
```bash
# Build first
npm run build

# Get user by ID
node dist/index/cli.js get-user --id 1

# Or using Gulp
gulp get-user --id 1
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 🏥 Health Check

Check if the server is running.

**Request:**
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Example:**
```bash
curl http://localhost:3000/health
```

---

#### 👤 Get User by ID

Retrieve a user by their unique identifier.

**Request:**
```http
GET /users/:id
```

**Parameters:**
| Parameter | Type   | Location | Required | Description           |
|-----------|--------|----------|----------|-----------------------|
| id        | number | path     | Yes      | User ID (positive integer) |

**Success Response (200 OK):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john.doe@example.com"
}
```

**Error Responses:**

| Status Code | Description                | Response Body                              |
|-------------|----------------------------|--------------------------------------------|
| 400         | Invalid user ID            | `{"error": "Invalid user ID", "code": "INVALID_USER_ID"}` |
| 404         | User not found             | `{"error": "User not found", "code": "USER_NOT_FOUND"}` |
| 500         | Internal server error      | `{"error": "Internal server error", "code": "INTERNAL_ERROR"}` |

**Example:**
```bash
curl http://localhost:3000/users/1
```

---

#### ➕ Create User

Create a new user account.

**Request:**
```http
POST /users
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com"
}
```

**Validation Rules:**
- `username`: Required, string, 3-20 characters
- `email`: Required, valid email format

**Success Response (201 Created):**
```json
{
  "id": 3,
  "username": "newuser",
  "email": "newuser@example.com"
}
```

**Error Responses:**

| Status Code | Description                | Response Body                              |
|-------------|----------------------------|--------------------------------------------|
| 400         | Missing required fields    | `{"error": "Username and email are required", "code": "MISSING_REQUIRED_FIELDS"}` |
| 400         | Invalid email format       | `{"error": "Invalid email format", "code": "INVALID_EMAIL_FORMAT"}` |
| 400         | User creation failed        | `{"error": "Failed to create user", "code": "USER_CREATION_FAILED"}` |
| 500         | Internal server error      | `{"error": "Internal server error", "code": "INTERNAL_ERROR"}` |

**Example:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "newuser@example.com"
  }'
```

### Error Response Format

All error responses follow a consistent format:

```json
{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_CODE",
  "details": {
    // Optional additional details
  }
}
```

---

## 📁 Project Structure

```
task-management-service-hexagonal-typescript/
│
├── src/
│   ├── adapter/                    # Adapters (Ports & Adapters pattern)
│   │   ├── in/                     # Inbound adapters (driving)
│   │   │   ├── cli/                # CLI controllers
│   │   │   │   └── UserController.ts
│   │   │   └── web/                # Web controllers
│   │   │       └── UserController.ts
│   │   └── out/                    # Outbound adapters (driven)
│   │       └── sqlite/             # SQLite implementation
│   │           ├── Database.ts     # Database connection
│   │           └── UserRepository.ts
│   │
│   ├── application/                # Application core
│   │   ├── domain/                 # Domain layer
│   │   │   ├── entity/             # Domain entities
│   │   │   │   └── User.ts
│   │   │   └── services/           # Domain services
│   │   │       └── UserService.ts
│   │   └── port/                   # Ports (interfaces)
│   │       ├── UserRepository.ts
│   │       └── UserService.ts
│   │
│   ├── index/                      # Entry points
│   │   ├── cli.ts                  # CLI entry point
│   │   └── rest.ts                 # REST API entry point
│   │
│   └── utils/                      # Utility modules
│       └── logger.ts               # Structured logging
│
├── db_sqlite/                      # SQLite database files
│   └── database.sqlite
│
├── script.sql                      # Database schema
├── .env.example                    # Environment variables template
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

### Key Directories

- **`src/adapter/in/`** - Controllers that receive input (REST, CLI)
- **`src/adapter/out/`** - Implementations that output data (database, external APIs)
- **`src/application/domain/`** - Pure business logic, no external dependencies
- **`src/application/port/`** - Interfaces that define contracts
- **`src/index/`** - Application entry points

---

## 💻 Development

### Building the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Development Server

```bash
npm run dev
```

Starts the server with `nodemon` for automatic reloading on file changes.

### TypeScript Configuration

The project uses TypeScript with **strict mode** enabled:
- Strict type checking
- No implicit `any`
- Strict null checks
- Source maps for debugging

### Logging

The project includes a custom logger (`src/utils/logger.ts`) with the following levels:

- **ERROR** - Error messages (always logged)
- **WARN** - Warning messages (always logged)
- **INFO** - Informational messages (always logged)
- **DEBUG** - Debug messages (only in development)

Example usage:
```typescript
import logger from './utils/logger';

logger.info('Server started');
logger.error('Error occurred:', error);
logger.debug('Debug information');
```

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL
);
```

#### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Environment Variables

| Variable   | Default                          | Description                    |
|------------|----------------------------------|--------------------------------|
| `PORT`     | `3000`                           | Server port number             |
| `DB_PATH`  | `./db_sqlite/database.sqlite`    | Path to SQLite database file   |
| `NODE_ENV` | `development`                    | Environment mode                |

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Guidelines

1. **Follow Hexagonal Architecture**
   - Keep business logic in the domain layer
   - Use ports (interfaces) for contracts
   - Implement adapters for external concerns

2. **Code Quality**
   - Use TypeScript strict mode
   - Add proper error handling
   - Use the logger utility (not `console.log`)
   - Follow existing code style

3. **Testing** (when tests are added)
   - Write unit tests for domain logic
   - Write integration tests for adapters
   - Mock ports in tests

4. **Documentation**
   - Update README for new features
   - Add JSDoc comments for public APIs
   - Keep architecture diagrams updated

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🗺️ Roadmap

### Planned Features

- [ ] **Authentication & Authorization** - JWT-based auth system
- [ ] **Task Management** - Full CRUD operations for tasks
- [ ] **API Documentation** - Swagger/OpenAPI integration
- [ ] **Testing** - Comprehensive test suite (Jest)
- [ ] **Database Migrations** - Migration system for schema changes
- [ ] **Rate Limiting** - Protect API from abuse
- [ ] **Security Headers** - Helmet.js integration
- [ ] **Request Validation Middleware** - Centralized validation
- [ ] **Docker Support** - Containerization

### Architecture Improvements

- [ ] **Event Sourcing** - Event-driven architecture
- [ ] **CQRS** - Command Query Responsibility Segregation
- [ ] **Multiple Database Support** - PostgreSQL, MongoDB adapters
- [ ] **Caching Layer** - Redis integration
- [ ] **Message Queue** - RabbitMQ/Kafka for async processing

---

## 🙏 Acknowledgments

- **Hexagonal Architecture** - Alistair Cockburn
- **Clean Architecture** - Robert C. Martin
- **TypeScript** - Microsoft
- **Express.js** - StrongLoop

---

<div align="center">

**Built with ❤️ using Hexagonal Architecture**

[⭐ Star this repo](https://github.com/iswanulumam/task-management-service-hexagonal-typescript) if you find it helpful!

</div>
