-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL
);

-- Create Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Insert users
INSERT INTO users (username, email) VALUES ('johndoe', 'john.doe@example.com');
INSERT INTO users (username, email) VALUES ('janedoe', 'jane.doe@example.com');

-- Insert tasks
INSERT INTO tasks (title, description, completed, userId) VALUES ('Finish homework', 'Complete the math homework assigned in class', 0, 1);
INSERT INTO tasks (title, description, completed, userId) VALUES ('Buy groceries', 'Milk, eggs, and bread', 0, 1);
INSERT INTO tasks (title, description, completed, userId) VALUES ('Read a book', 'Read the new novel by my favorite author', 1, 2);
