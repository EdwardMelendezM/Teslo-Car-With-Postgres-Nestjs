/* eslint-disable prettier/prettier */

import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProteted } from './role-proteted/role-proteted.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../interfaces';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

export function Auth(...roles:ValidRoles[]) {
  return applyDecorators(
    RoleProteted(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
