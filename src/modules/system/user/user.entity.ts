import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  id: number;
  isAdmin: boolean;
  username: string;
  @ApiHideProperty()
  @Exclude()
  password: string;
  nickname: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  sex: number;
  status: boolean;
  createBy: string;
  createdAt: Date;
  updatedAt: Date;
  remark: string;
}
