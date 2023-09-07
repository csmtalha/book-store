import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './DTO/user-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('admin/create')
  createAdmin(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    return this.authService.createAdmin(userCredentialsDto);
  }
  @Post('signup')
  signUp(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ message: string }> {
    return this.authService.signUp(userCredentialsDto);
  }
  @Post('signin')
  signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userCredentialsDto);
  }
}
