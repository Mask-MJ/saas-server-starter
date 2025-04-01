import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  id: number;
  isAdmin: boolean;
  account: string;
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
