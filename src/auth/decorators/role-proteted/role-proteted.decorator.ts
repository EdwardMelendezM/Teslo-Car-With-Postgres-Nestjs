import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/auth/interfaces';

export const META_ROLS = 'roles';

export const RoleProteted = (...args: ValidRoles[]) => {
  return SetMetadata(META_ROLS, args);
};
