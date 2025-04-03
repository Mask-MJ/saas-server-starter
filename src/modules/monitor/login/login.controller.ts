import { Controller, Get, Param, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiPaginatedResponse } from '@/common/response/paginated.response';
import { QueryLoginDto } from './login.dto';
import { LoginEntity } from './login.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  /**
   * 获取登录日志列表
   */
  @Get()
  @ApiPaginatedResponse(LoginEntity)
  findAll(@Query() queryLoginDto: QueryLoginDto) {
    return this.loginService.findAll(queryLoginDto);
  }

  /**
   * 获取登录日志详情
   */
  @Get(':id')
  @ApiOkResponse({ type: LoginEntity })
  findOne(@Param('id') id: number) {
    return this.loginService.findOne(id);
  }
}
