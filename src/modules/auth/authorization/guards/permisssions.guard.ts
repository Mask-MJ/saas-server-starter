import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { PrismaService } from 'nestjs-prisma';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Permission } from '@prisma/client';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '../../auth.constants';
import { PrismaService } from '@/common/datebase/prisma.extension';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('PrismaService')
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const contextPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!contextPermissions) return true;
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    const userInfo = await this.prisma.client.user.findUnique({
      where: { id: user.sub },
      include: {
        role: { include: { menu: { include: { permission: true } } } },
      },
    });

    if (!userInfo) return false;
    if (userInfo.isAdmin) return true;
    const permissionsName = userInfo.role
      .reduce((acc, role) => acc.concat(role.menu), [] as any[])
      .reduce((acc, menu) => acc.concat(menu.permissions), [] as Permission[])
      .map((p: Permission) => p.value);

    return contextPermissions.every((permission) =>
      permissionsName.includes(permission),
    );
  }
}
