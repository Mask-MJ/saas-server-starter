import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@/modules/auth/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { BcryptService } from '../auth/hashing/bcrypt.service';
import { HashingService } from '../auth/hashing/hashing.service';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    RoleModule,
  ],
  controllers: [UserController],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    UserService,
  ],
})
export class SystemModule {}
