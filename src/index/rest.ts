import express from "express";
import { json } from "body-parser";
import UserRepository from "../adapter/out/sqlite/UserRepository";
import UserService from "../application/domain/services/UserService";
import UserController from "../adapter/in/web/UserController";
import logger from "../utils/logger";

// Load environment variables if dotenv is available
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not installed, using defaults
}

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// ------------------ ROUTING ------------------

app.get('/users/:id', (req, res) => userController.getUserById(req, res));
app.post('/users', (req, res) => userController.createUser(req, res));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        code: 'INTERNAL_ERROR'
    });
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
})

