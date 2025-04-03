import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/datebase/prisma.extension';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './role.dto';
import { ActiveUserData } from '@/modules/auth/interfaces/active-user-data.interface';

@Injectable()
export class RoleService {
  constructor(
    @Inject('PrismaService')
    private readonly prisma: PrismaService,
  ) {}
  async create(user: ActiveUserData, createRoleDto: CreateRoleDto) {
    const { menuIds, ...rest } = createRoleDto;
    return await this.prisma.client.role.create({
      data: {
        ...rest,
        createBy: user.username,
        menu: { connect: menuIds.map((id) => ({ id })) },
      },
    });
  }

  async findAll(queryRoleDto: QueryRoleDto) {
    const { name, value, page, pageSize } = queryRoleDto;
    const [rows, meta] = await this.prisma.client.role
      .paginate({
        where: { name: { contains: name }, value: { contains: value } },
        orderBy: { sort: 'asc' },
      })
      .withPages({ page, limit: pageSize, includePageCount: true });
    return { rows, ...meta };
  }

  async findOne(id: number) {
    const role = await this.prisma.client.role.findUniqueOrThrow({
      where: { id },
      include: { menu: true },
    });
    const { menu, ...rest } = role;

    return {
      ...rest,
      menuIds: menu.map((menu) => menu.id),
    };
  }

  async update(id: number, user: ActiveUserData, updateRoleDto: UpdateRoleDto) {
    const { menuIds = [], ...rest } = updateRoleDto;
    return await this.prisma.client.role.update({
      where: { id },
      data: {
        ...rest,
        updateBy: user.username,
        menu: { connect: menuIds.map((id) => ({ id })) },
      },
    });
  }

  remove(id: number) {
    return this.prisma.client.role.delete({ where: { id } });
  }
}
