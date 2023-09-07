import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCredentialsDto } from './DTO/user-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Sign up a new user.
   * @param userCredentialsDto - The user credentials (username and password).
   * @returns A message indicating the result of the operation.
   */
  async signUp(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    return this.userRepository.createUser(userCredentialsDto);
  }

  /**
   * Sign in a user and return an access token.
   * @param userCredentialsDto - The user credentials (username and password).
   * @returns An access token.
   */
  async signIn(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      const { username, password } = userCredentialsDto;
      const user = await this.userRepository.findOne({ username });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username };
        const accessToken: string = await this.jwtService.sign(payload);

        return { accessToken };
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Create an admin user.
   * @param userCredentialsDto - The admin user credentials (username and password).
   * @returns A message indicating the result of the operation.
   */
  async createAdmin(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    return this.userRepository.createAdmin(userCredentialsDto);
  }
}
