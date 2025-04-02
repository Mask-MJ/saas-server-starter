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
  create(user: ActiveUserData, createRoleDto: CreateRoleDto) {
    const {
      menuIds,
      // factoryIds,
      ...rest
    } = createRoleDto;
    return this.prisma.client.role.create({
      data: {
        ...rest,
        createBy: user.username,
        menu: { connect: menuIds.map((id) => ({ id })) },
        // factory: { connect: factoryIds.map((id) => ({ id })) },
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
    const role = await this.prisma.client.role.findUnique({
      where: { id },
      include: { menu: true, factory: true },
    });

    const { menu, factory, ...rest } = role;

    return {
      ...rest,
      menuIds: menu.map((menu) => menu.id),
      factoryIds: factory.map((factory) => factory.id),
    };
  }

  update(id: number, user: ActiveUserData, updateRoleDto: UpdateRoleDto) {
    const { menuIds, factoryIds, ...rest } = updateRoleDto;
    return this.prisma.client.role.update({
      where: { id },
      data: {
        ...rest,
        updateBy: user.username,
        menu: { connect: menuIds.map((id) => ({ id })) },
        factory: { connect: factoryIds.map((id) => ({ id })) },
      },
    });
  }

  remove(id: number) {
    return this.prisma.client.role.delete({ where: { id } });
  }
}
