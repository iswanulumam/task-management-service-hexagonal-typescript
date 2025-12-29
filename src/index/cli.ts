import { Command } from 'commander';
import UserRepository from '../adapter/out/sqlite/UserRepository';
import UserService from '../application/domain/services/UserService';
import UserController from '../adapter/in/cli/UserController';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// CLI Setup
const program = new Command();

program
  .command('get-user')
  .description('Get a user by ID')
  .requiredOption('-i, --id <id>', 'ID of the user to fetch')
  .action(async (options) => {
    const { id } = options;
    const userId = parseInt(id, 10);
    
    if (isNaN(userId) || userId <= 0) {
      console.error('Error: Invalid user ID. ID must be a positive number.');
      process.exit(1);
    }
    
    try {
        const user = await userController.getUserById(userId);
        if (user) {
          console.log('<< RESULT >>');
          console.log(`ID: ${user.id}`);
          console.log(`Username: ${user.username}`);
          console.log(`Email: ${user.email}`);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        process.exit(1);
      }
  });

program.parse(process.argv);