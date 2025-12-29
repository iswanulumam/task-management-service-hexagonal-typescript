import { Request, Response } from "express";
import UserService from "../../../application/port/UserService";
import logger from '../../../utils/logger';

interface ErrorResponse {
    error: string;
    code: string;
    details?: any;
}

export default class UserController {
    constructor(private userService: UserService) {}

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const idParam = req.params.id;
            const id = parseInt(idParam, 10);
            
            if (isNaN(id) || id <= 0) {
                const errorResponse: ErrorResponse = {
                    error: 'Invalid user ID',
                    code: 'INVALID_USER_ID'
                };
                res.status(400).json(errorResponse);
                return;
            }
            
            const user = await this.userService.getUserById(id);

            if (user) {
                res.json(user);
            } else {
                const errorResponse: ErrorResponse = {
                    error: 'User not found',
                    code: 'USER_NOT_FOUND'
                };
                res.status(404).json(errorResponse);
            }
        } catch (error) {
            logger.error('Error fetching user:', error);
            const errorResponse: ErrorResponse = {
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            };
            res.status(500).json(errorResponse);
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email } = req.body;

            if (!username || !email) {
                const errorResponse: ErrorResponse = {
                    error: 'Username and email are required',
                    code: 'MISSING_REQUIRED_FIELDS',
                    details: {
                        required: ['username', 'email']
                    }
                };
                res.status(400).json(errorResponse);
                return;
            }

            // Validate email format (basic)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const errorResponse: ErrorResponse = {
                    error: 'Invalid email format',
                    code: 'INVALID_EMAIL_FORMAT'
                };
                res.status(400).json(errorResponse);
                return;
            }

            // Create user via UserService
            const user = await this.userService.createUser(username, email);

            if (user) {
                res.status(201).json(user);
            } else {
                const errorResponse: ErrorResponse = {
                    error: 'Failed to create user',
                    code: 'USER_CREATION_FAILED'
                };
                res.status(400).json(errorResponse);
            }
        } catch (error) {
            logger.error('Error creating user:', error);
            const errorResponse: ErrorResponse = {
                error: 'Internal server error',
                code: 'INTERNAL_ERROR'
            };
            res.status(500).json(errorResponse);
        }
    }
}