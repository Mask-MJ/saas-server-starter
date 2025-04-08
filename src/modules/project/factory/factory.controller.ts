import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
} from '@nestjs/common';
import { FactoryService } from './factory.service';
import { Permissions } from 'src/modules/auth/authorization/decorators/permissions.decorator';
import { ActiveUser } from '@/modules/auth/decorators/active-user.decorator';
import { ActiveUserData } from '@/modules/auth/interfaces/active-user-data.interface';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FactoryEntity } from './factory.entity';
import {
  CreateFactoryDto,
  QueryFactoryDto,
  UpdateFactoryDto,
} from './factory.dto';

@ApiTags('工厂管理')
@ApiBearerAuth('bearer')
@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  /**
   * 创建工厂
   */
  @Post()
  @ApiCreatedResponse({ type: FactoryEntity })
  @Permissions('project:factory:create')
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createFactoryDto: CreateFactoryDto,
  ) {
    return this.factoryService.create(user, createFactoryDto);
  }

  /**
   * 获取工厂列表
   */
  @Get()
  @Permissions('project:factory:query')
  findAll(
    @ActiveUser() user: ActiveUserData,
    @Query() queryFactoryDto: QueryFactoryDto,
  ) {
    return this.factoryService.findAll(user, queryFactoryDto);
  }

  /**
   * 获取单个工厂
   */
  @Get(':id')
  @ApiOkResponse({ type: FactoryEntity })
  @Permissions('project:factory:query')
  findOne(@Param('id') id: string) {
    return this.factoryService.findOne(+id);
  }

  /**
   * 更新工厂
   */
  @Patch(':id')
  @ApiOkResponse({ type: FactoryEntity })
  @Permissions('project:factory:update')
  update(@Param('id') id: number, @Body() updateFactoryDto: UpdateFactoryDto) {
    return this.factoryService.update(id, updateFactoryDto);
  }

  /**
   * 删除工厂
   */
  @Delete(':id')
  remove(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: number,
    @Headers('X-Real-IP') ip: string,
  ) {
    return this.factoryService.remove(user, id, ip);
  }
}
