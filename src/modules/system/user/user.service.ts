import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './user.dto';
import { PrismaService } from '@/common/datebase/prisma.extension';

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService,
  ) {}

  // Exclude keys from user
  // https://www.prisma.io/docs/orm/prisma-client/queries/excluding-fields
  private exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user as Record<string, any>).filter(
        ([key]) => !keys.includes(key as Key),
      ),
    ) as Omit<User, Key>;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
