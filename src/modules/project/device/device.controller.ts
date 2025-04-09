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
import { DeviceService } from './device.service';
import { Permissions } from 'src/modules/auth/authorization/decorators/permissions.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateDeviceDto, QueryDeviceDto, UpdateDeviceDto } from './device.dto';
import { DeviceEntity } from './device.entity';
import { ApiPaginatedResponse } from '@/common/response/paginated.response';
import { ActiveUser } from '@/modules/auth/decorators/active-user.decorator';
import { ActiveUserData } from '@/modules/auth/interfaces/active-user-data.interface';

@ApiTags('装置管理')
@ApiBearerAuth('bearer')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  /**
   * 创建装置
   * */
  @Post()
  @ApiCreatedResponse({ type: DeviceEntity })
  @Permissions('project:device:create')
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return this.deviceService.create(user, createDeviceDto);
  }

  /**
   * 获取装置列表
   * */
  @Get()
  @ApiPaginatedResponse(DeviceEntity)
  @Permissions('project:device:query')
  findAll(@Query() queryDeviceDto: QueryDeviceDto) {
    return this.deviceService.findAll(queryDeviceDto);
  }

  /**
   * 全部删除
   * */
  @Delete('removeAll')
  @Permissions('project:device:delete')
  removeAll(
    @ActiveUser() user: ActiveUserData,
    @Headers('X-Real-IP') ip: string,
  ) {
    return this.deviceService.removeAll(user, ip);
  }

  /**
   * 获取装置信息
   * */
  @Get(':id')
  @ApiOkResponse({ type: DeviceEntity })
  @Permissions('project:device:query')
  findOne(@Param('id') id: number) {
    return this.deviceService.findOne(id);
  }

  /**
   * 更新装置
   * */
  @Patch(':id')
  @ApiOkResponse({ type: DeviceEntity })
  @Permissions('project:device:update')
  update(
    @Param('id') id: number,
    @ActiveUser() user: ActiveUserData,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.deviceService.update(id, user, updateDeviceDto);
  }

  /**
   * 删除装置
   * */
  @Delete(':id')
  @Permissions('project:device:delete')
  remove(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: number,
    @Headers('X-Real-IP') ip: string,
  ) {
    return this.deviceService.remove(user, id, ip);
  }
}
