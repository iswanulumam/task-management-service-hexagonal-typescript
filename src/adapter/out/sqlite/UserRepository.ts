import openDb from "./Database";
import User from '../../../application/domain/entity/User';
import UserRepository from "../../../application/port/UserRepository";
import logger from '../../../utils/logger';

export default class SqliteUserRepository implements UserRepository {
    async getUserById(id: number): Promise<User | null> {
        const db = await openDb();
        const row = await db.get('SELECT * FROM users WHERE id = ?', id);
        if (row) {
            return new User(row.username, row.email, row.id);
        }
        return null;
    }

    async createUser(username: string, email: string): Promise<User | null> {
        try {
            const db = await openDb();
            const result = await db.run(
                'INSERT INTO users (username, email) VALUES (?, ?)',
                username, email
            );

            // Retrieve the auto-incremented ID assigned by SQLite
            const newUserId = result.lastID;

            // Return a new User instance with the assigned ID
            return new User(username, email, newUserId);
        } catch (error) {
            logger.error('Error creating user:', (error as Error).message);
            return null;
        }
    }
}
