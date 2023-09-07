import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data transfer object for user credentials.
 */

export class UserCredentialsDto {
  @IsNotEmpty({ message: 'Username must not be empty' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Password must not be empty' })
  @IsString()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
