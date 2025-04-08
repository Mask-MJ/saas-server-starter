import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/datebase/prisma.extension';
import { CreateMenuDto, QueryMenuDto, UpdateMenuDto } from './menu.dto';
import { ActiveUserData } from '@/modules/auth/interfaces/active-user-data.interface';
import { transformationTree } from '@/common/utils';

@Injectable()
export class MenuService {
  constructor(
    @Inject('PrismaService') private readonly prisma: PrismaService,
  ) {}
  async create(user: ActiveUserData, createMenuDto: CreateMenuDto) {
    const suffix = createMenuDto.path
      .replace(/:id$/, '')
      .replace(/^\//, '')
      .replace(/\//g, ':');
    return this.prisma.client.menu.create({
      data: {
        ...createMenuDto,
        createBy: user.username,
        permission: {
          createMany: {
            data: [
              { name: '创建', value: suffix + ':create' },
              { name: '读取', value: suffix + ':read' },
              { name: '更新', value: suffix + ':update' },
              { name: '删除', value: suffix + ':delete' },
            ],
          },
        },
      },
    });
  }

  async findAll(user: ActiveUserData, queryMenuDto: QueryMenuDto) {
    const { name } = queryMenuDto;
    const userData = await this.prisma.client.user.findUnique({
      where: { id: user.sub },
      include: { role: true },
    });
    if (userData?.isAdmin) {
      const menus = await this.prisma.client.menu.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
      });
      return transformationTree(menus, null);
    } else {
      const roleIds = userData?.role.map((role) => role.id);
      const menus = await this.prisma.client.menu.findMany({
        where: {
          name: { contains: name, mode: 'insensitive' },
          role: { some: { id: { in: roleIds } } },
        },
        include: { permission: true },
      });
      return transformationTree(menus, null);
    }
  }

  async findOne(id: number) {
    return this.prisma.client.menu.findUnique({ where: { id } });
  }

  async update(id: number, user: ActiveUserData, updateMenuDto: UpdateMenuDto) {
    return this.prisma.client.menu.update({
      where: { id },
      data: { ...updateMenuDto, updateBy: user.username },
    });
  }

  async remove(id: number) {
    return this.prisma.client.menu.delete({ where: { id } });
  }
}
