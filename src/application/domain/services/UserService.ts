import UserService from "../../port/UserService";
import UserRepository from "../../port/UserRepository";
import User from "../entity/User";
import 'reflect-metadata';
import { validate } from 'class-validator';
import logger from '../../../utils/logger';

export default class UserServiceImpl implements UserService {
    constructor(private userRepository: UserRepository) {}

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.getUserById(id);
    }

    async createUser(username: string, email: string): Promise<User | null> {
        const user = new User(username, email);

        const errors = await validate(user);

        if (errors.length > 0) {
            logger.error('Validation failed:', errors);
            return null;
        }
        
        return this.userRepository.createUser(username, email);
    }
   
}