// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enums/user-role.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
