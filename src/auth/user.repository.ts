import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialsDto } from './DTO/user-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../enums/user-role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async createUserWithRole(
    userCredentialsDto: UserCredentialsDto,
    role: UserRole,
  ): Promise<{ message: string }> {
    try {
      const { username, password } = userCredentialsDto;
      const existingUser = await this.findOne({ username });

      if (existingUser) {
        return {
          message:
            'Username already exists. Please choose a different username.',
        };
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User();
      user.username = username;
      user.password = hashedPassword;
      user.role = role;

      await this.save(user);

      return { message: `${role} created successfully!` };
    } catch (error) {
      return {
        message: 'An error occurred while signing up. Please try again later.',
      };
    }
  }

  async createUser(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    return this.createUserWithRole(userCredentialsDto, UserRole.USER);
  }

  async createAdmin(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    return this.createUserWithRole(userCredentialsDto, UserRole.ADMIN);
  }
}
