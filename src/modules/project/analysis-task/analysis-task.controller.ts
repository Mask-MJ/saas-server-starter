import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnalysisTaskService } from './analysis-task.service';
import { Permissions } from 'src/modules/auth/authorization/decorators/permissions.decorator';
import { AnalysisTaskEntity } from './analysis-task.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateAnalysisTaskDto,
  QueryAnalysisTaskDto,
  UpdateAnalysisTaskDto,
} from './analysis-task.dto';
import { ActiveUser } from '@/modules/auth/decorators/active-user.decorator';
import { ActiveUserData } from '@/modules/auth/interfaces/active-user-data.interface';
import { ApiPaginatedResponse } from '@/common/response/paginated.response';
import { UploadDto } from '@/common/dto/base.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValveOperatingDataEntity } from '../valve/valve.entity';

@ApiTags('分析任务')
@ApiBearerAuth('bearer')
@Controller('analysis-task')
export class AnalysisTaskController {
  constructor(private readonly analysisTaskService: AnalysisTaskService) {}

  /**
   * 创建分析任务
   */
  @Post()
  @ApiCreatedResponse({ type: AnalysisTaskEntity })
  @Permissions('project:analysisTask:create')
  create(
    @ActiveUser() user: ActiveUserData,
    @Body() createAnalysisTaskDto: CreateAnalysisTaskDto,
    @Headers('X-Real-IP') ip: string,
  ) {
    return this.analysisTaskService.create(user, createAnalysisTaskDto, ip);
  }

  /**
   * 获取分析任务列表
   * */
  @Get()
  @ApiPaginatedResponse(AnalysisTaskEntity)
  @Permissions('project:analysisTask:query')
  findAll(@Query() queryAnalysisTaskDto: QueryAnalysisTaskDto) {
    return this.analysisTaskService.findAll(queryAnalysisTaskDto);
  }

  /**
   * 执行分析任务
   * */
  @Post('execute/:id')
  @Permissions('project:analysisTask:create')
  execute(@ActiveUser() user: ActiveUserData, @Param('id') id: number) {
    return this.analysisTaskService.execute(user, id);
  }

  /**
   * 上传PDF文件
   * */
  @Post('uploadPdf')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Body() body: UploadDto) {
    return this.analysisTaskService.upload(file, body);
  }

  /**
   * 获取分析任务结果
   * */
  @Get('result/:id')
  @ApiOkResponse({ type: ValveOperatingDataEntity })
  @Permissions('project:analysisTask:query')
  result(@Param('id') id: number) {
    return this.analysisTaskService.result(id);
  }

  /**
   * 删除所有分析任务
   * */
  @Delete('removeAll')
  @Permissions('project:analysisTask:delete')
  removeAll(
    @ActiveUser() user: ActiveUserData,
    @Headers('X-Real-IP') ip: string,
  ) {
    return this.analysisTaskService.removeAll(user, ip);
  }

  /**
   *  获取分析任务详情
   * */
  @Get(':id')
  @ApiOkResponse({ type: AnalysisTaskEntity })
  @Permissions('project:analysisTask:query')
  findOne(@Param('id') id: number) {
    return this.analysisTaskService.findOne(id);
  }

  /**
   * 获取分析任务详情
   * */
  @Patch(':id')
  @ApiOkResponse({ type: AnalysisTaskEntity })
  @Permissions('project:analysisTask:update')
  update(
    @Param('id') id: number,
    @ActiveUser() user: ActiveUserData,
    @Body() updateAnalysisTaskDto: UpdateAnalysisTaskDto,
  ) {
    return this.analysisTaskService.update(id, user, updateAnalysisTaskDto);
  }

  /**
   * 删除分析任务
   * */
  @Delete(':id')
  @Permissions('project:analysisTask:delete')
  remove(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: number,
    @Headers('X-Real-IP') ip: string,
  ) {
    return this.analysisTaskService.remove(user, id, ip);
  }
}
