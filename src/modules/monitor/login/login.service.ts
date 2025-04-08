import { Inject, Injectable } from '@nestjs/common';
import { CreateLoginDto, QueryLoginDto } from './login.dto';
import { PrismaService } from '@/common/datebase/prisma.extension';
import IP2Region from 'ip2region';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class LoginService {
  constructor(
    @Inject('PrismaService') private readonly prisma: PrismaService,
  ) {}

  async create(createLoginDto: CreateLoginDto) {
    const query = new IP2Region();
    const addressInfo = query.search(createLoginDto.ip);
    const address = addressInfo ? addressInfo.province + addressInfo.city : '';
    return this.prisma.client.login.create({
      data: { ...createLoginDto, address },
    });
  }

  async findAll(queryLoginDto: QueryLoginDto) {
    const { pageSize, page, username } = queryLoginDto;
    const [rows, meta] = await this.prisma.client.login
      .paginate({
        where: { username },
        orderBy: { createdAt: 'desc' },
      })
      .withPages({ limit: pageSize, page, includePageCount: true });

    return { rows, ...meta };
  }

  async findOne(id: number) {
    return this.prisma.client.login.findUnique({ where: { id } });
  }

  @OnEvent('login')
  async handleLoginEvent(payload: CreateLoginDto) {
    await this.create(payload);
  }
}
