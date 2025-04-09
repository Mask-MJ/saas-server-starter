import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateDeviceDto, QueryDeviceDto, UpdateDeviceDto } from './device.dto';
import { PrismaService } from '@/common/datebase/prisma.extension';
import { ActiveUserData } from '@/modules/auth/interfaces/active-user-data.interface';

@Injectable()
export class DeviceService {
  constructor(
    @Inject('PrismaService') private readonly prisma: PrismaService,
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(user: ActiveUserData, createDeviceDto: CreateDeviceDto) {
    return this.prisma.client.device.create({
      data: { ...createDeviceDto, createBy: user.username },
    });
  }

  async findAll(queryDeviceDto: QueryDeviceDto) {
    const { name, factoryId, page, pageSize } = queryDeviceDto;
    const [rows, meta] = await this.prisma.client.device
      .paginate({
        where: { name: { contains: name }, factoryId: factoryId },
        include: { factory: true },
        orderBy: { createdAt: 'desc' },
      })
      .withPages({ page, limit: pageSize, includePageCount: true });
    return { rows, ...meta };
  }

  async findOne(id: number) {
    return this.prisma.client.device.findUnique({ where: { id } });
  }

  async update(
    id: number,
    user: ActiveUserData,
    updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.prisma.client.device.update({
      where: { id },
      data: { ...updateDeviceDto, updateBy: user.username },
    });
  }

  async remove(user: ActiveUserData, id: number, ip: string) {
    const device = await this.prisma.client.device.delete({ where: { id } });
    this.eventEmitter.emit('delete', {
      title: `删除ID为${id}, 名称为${device.name}的工厂`,
      businessType: 2,
      module: '工厂管理',
      username: user.username,
      ip,
    });
    return '删除成功';
  }

  async removeAll(user: ActiveUserData, ip: string) {
    console.log('删除所有装置', DeviceService.name);
    await this.prisma.client.device.deleteMany({});
    this.eventEmitter.emit('delete', {
      title: `删除所有装置`,
      businessType: 2,
      module: '装置管理',
      username: user.username,
      ip,
    });
    return '全部删除成功';
  }
}
