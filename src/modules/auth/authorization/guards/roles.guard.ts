import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from 'nestjs-prisma';
import { REQUEST_USER_KEY } from '../../auth.constants';
import { ActiveUserData } from '../../interfaces/active-user-data.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const contextRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!contextRoles) return true;
    const request = context.switchToHttp().getRequest<{
      route: { path: string };
      [REQUEST_USER_KEY]: ActiveUserData;
    }>();
    const path: string = request.route.path;
    const user = request[REQUEST_USER_KEY];
    const userInfo = await this.prismaService.user.findUnique({
      where: { id: user.sub },
      include: { role: { include: { menu: true } } },
    });

    if (!userInfo) return false;
    return userInfo.role.some((role) =>
      role.menu.some((menu) =>
        path.startsWith('/api/' + menu.path.split('/').pop()),
      ),
    );
  }
}
