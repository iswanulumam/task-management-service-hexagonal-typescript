# Task Management Service

A task management service built with **Hexagonal Architecture** (Ports and Adapters) in TypeScript, using Express.js and SQLite.

## Architecture

This project follows the **Hexagonal Architecture** pattern, which separates the business logic from external concerns:

- **Domain Layer** (`src/application/domain/`): Core business entities and services
- **Ports** (`src/application/port/`): Interfaces defining contracts
- **Adapters** (`src/adapter/`):
  - **Inbound (In)**: Web controllers, CLI controllers
  - **Outbound (Out)**: Database repositories, external services

## Features

- ✅ RESTful API for user management
- ✅ CLI interface for user operations
- ✅ SQLite database integration
- ✅ Input validation using class-validator
- ✅ Structured logging
- ✅ Environment configuration support
- ✅ Error handling and standardized error responses
- ✅ Health check endpoint

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TypeScript

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management-service-hexagonal-typescript
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
cp .env.example .env
```

Edit `.env` file:
```
PORT=3000
DB_PATH=./db_sqlite/database.sqlite
NODE_ENV=development
```

4. Initialize the database:
```bash
sqlite3 db_sqlite/database.sqlite < script.sql
```

## Usage

### Development Mode

Start the development server with hot-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

### Production Mode

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

### CLI Usage

Get a user by ID:
```bash
npm run build
node dist/index/cli.js get-user --id 1
```

Or using Gulp:
```bash
gulp get-user --id 1
```

## API Endpoints

### Health Check

**GET** `/health`

Returns server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Get User by ID

**GET** `/users/:id`

Retrieves a user by their ID.

**Parameters:**
- `id` (path parameter): User ID (must be a positive integer)

**Success Response (200):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john.doe@example.com"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid user ID
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

**Example:**
```bash
curl http://localhost:3000/users/1
```

### Create User

**POST** `/users`

Creates a new user.

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com"
}
```

**Success Response (201):**
```json
{
  "id": 3,
  "username": "newuser",
  "email": "newuser@example.com"
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields or invalid email format
- `500 Internal Server Error`: Server error

**Example:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "email": "newuser@example.com"}'
```

## Error Response Format

All error responses follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

## Project Structure

```
src/
├── adapter/
│   ├── in/              # Inbound adapters (controllers)
│   │   ├── cli/         # CLI controllers
│   │   └── web/         # Web controllers
│   └── out/             # Outbound adapters
│       └── sqlite/      # SQLite repository implementation
├── application/
│   ├── domain/          # Domain layer
│   │   ├── entity/      # Domain entities
│   │   └── services/    # Domain services
│   └── port/            # Ports (interfaces)
├── index/               # Entry points
│   ├── cli.ts           # CLI entry point
│   └── rest.ts          # REST API entry point
└── utils/               # Utility modules
    └── logger.ts        # Logging utility
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)
- `DB_PATH`: Path to SQLite database file (default: `./db_sqlite/database.sqlite`)
- `NODE_ENV`: Environment mode (development/production)

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Configuration is in `tsconfig.json`.

## Development

### Building

```bash
npm run build
```

### Running Tests

Tests are not yet configured. To add tests:
1. Install a testing framework (Jest, Mocha, etc.)
2. Create test files in a `__tests__` or `test` directory
3. Add test scripts to `package.json`

### Linting

Linting is not yet configured. To add linting:
1. Install ESLint and Prettier
2. Create configuration files
3. Add lint scripts to `package.json`

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL
);
```

### Tasks Table

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

## Logging

The project uses a custom logger utility (`src/utils/logger.ts`) that provides:
- Timestamped log messages
- Different log levels (ERROR, WARN, INFO, DEBUG)
- JSON formatting for structured data
- Environment-aware debug logging

## Contributing

1. Follow the hexagonal architecture pattern
2. Maintain separation of concerns
3. Add proper error handling
4. Use the logger utility instead of console.log
5. Follow TypeScript best practices

## License

ISC

## Future Improvements

- [ ] Add authentication and authorization
- [ ] Implement task management endpoints
- [ ] Add comprehensive test coverage
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add rate limiting
- [ ] Add security headers middleware
- [ ] Add database migrations
- [ ] Add request validation middleware
- [ ] Add connection pooling for database
