import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { BaseDto, TimeDto } from 'src/common/dto/base.dto';
import dayjs from 'dayjs';

export class CreateValveDto {
  /**
   * 来源
   * @example 'hart'
   */
  @IsString()
  @IsOptional()
  source?: string;
  /**
   * 编码
   * @example '123456'
   */
  @IsString()
  @IsOptional()
  no?: string;
  /**
   * 阀门位号
   * @example 'FV-3001B'
   */
  @IsString()
  tag: string;
  /**
   * 装置
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  unit?: string;
  /**
   * 介质
   * @example '氨水'
   */
  @IsString()
  @IsOptional()
  fluidName?: string;

  /**
   * 关键应用
   * @example '反应器'
   */
  @IsString()
  @IsOptional()
  criticalApplication?: string;

  /**
   * 投用时间
   * @example 1714752000000
   */
  @IsOptional()
  @Transform(({ value }) => (value ? dayjs(value).format() : null), {
    toClassOnly: true,
  })
  since?: Date;

  /**
   * 阀体序列号
   * @example '123456'
   */
  @IsString()
  @IsOptional()
  serialNumber?: string;

  /**
   * 阀体品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  valveBrand?: string;

  /**
   * 系列
   * @example '系列'
   */
  @IsString()
  @IsOptional()
  valveSeries?: string;

  /**
   * 阀体类型
   * @example '球阀'
   */
  // @IsString()
  // @IsOptional()
  // valveType?: string;

  /**
   * 阀体口径
   * @example 'DN50'
   */
  @IsString()
  @IsOptional()
  valveSize?: string;

  /**
   * 阀体流量系数
   * @example 'DN50'
   */
  @IsString()
  @IsOptional()
  valveCv?: string;

  /**
   * 阀体磅级
   * @example '150LB'
   */
  @IsString()
  @IsOptional()
  valveRating?: string;

  /**
   * 阀体连接形式
   * @example '法兰'
   */
  @IsString()
  @IsOptional()
  valveEndConnection?: string;

  /**
   * 阀体阀体材质
   * @example '碳钢'
   */
  @IsString()
  @IsOptional()
  valveBodyMaterial?: string;

  /**
   * 阀盖形式
   * @example '法兰'
   */
  @IsString()
  @IsOptional()
  valveBonnet?: string;

  /**
   * 阀内件
   * @example '316'
   */
  @IsString()
  @IsOptional()
  valveTrim?: string;

  /**
   * 阀体泄漏等级
   * @example 'V'
   */
  @IsString()
  @IsOptional()
  valveSeatLeakage?: string;

  /**
   * 阀体描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  valveDescription?: string;

  /**
   * 执行机构品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  actuatorBrand?: string;

  /**
   * 执行机构类型
   * @example '气动'
   */
  // @IsString()
  // @IsOptional()
  // actuatorType?: string;

  /**
   * 执行机构系列
   * @example 'DN50'
   */
  @IsString()
  @IsOptional()
  actuatorSeries?: string;

  /**
   * 执行机构尺寸
   * @example 'DN50'
   */
  @IsString()
  @IsOptional()
  actuatorSize?: string;

  /**
   * 手轮
   * @example '有'
   */
  @IsString()
  @IsOptional()
  handwheel?: string;

  /**
   * 执行机构作用形式
   * @example 'DN50'
   */
  @IsString()
  @IsOptional()
  actuatorActionForm?: string;

  /**
   * 执行机构描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  actuatorDescription?: string;

  /**
   * 过滤减压阀品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  regulatorBrand?: string;

  /**
   * 过滤减压阀型号
   * @example '气动'
   */
  @IsString()
  @IsOptional()
  regulatorModel?: string;

  /**
   * 过滤减压阀描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  regulatorDescription?: string;

  /**
   * 定位器品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  positionerBrand?: string;

  /**
   * 定位器类型
   * @example '气动'
   */
  @IsString()
  @IsOptional()
  positionerModel?: string;

  /**
   * 定位器描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  positionerDescription?: string;

  /**
   * 电磁阀品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  sovBrand?: string;

  /**
   * 电磁阀型号
   * @example '气动'
   */
  @IsString()
  @IsOptional()
  sovModel?: string;

  /**
   * 电磁阀数量
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  sovQty?: number;

  /**
   * 电磁阀描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  sovDescription?: string;

  /**
   * 限位开关品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  lsBrand?: string;

  /**
   * 限位开关型号
   * @example '气动'
   */
  @IsString()
  @IsOptional()
  lsModel?: string;

  /**
   * 限位开关数量
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  lsQty?: number;

  /**
   * 限位开关描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  lsDescription?: string;

  /**
   * 保位阀品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  tripValveBrand?: string;

  /**
   * 保位阀型号
   * @example '气动'
   */
  @IsString()
  @IsOptional()
  tripValveModel?: string;

  /**
   * 保位阀描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  tripValveDescription?: string;

  /**
   * 放大器品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  vbBrand?: string;

  /**
   * 放大器型号
   * @example '气动'
   */
  @IsString()
  @IsOptional()
  vbModel?: string;

  /**
   * 放大器数量
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  vbQty?: number;

  /**
   * 放大器描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  vbDescription?: string;

  /**
   * 快排阀品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  qeBrand?: string;

  /**
   * 快排阀型号
   * @example '气动'
   */
  @IsString()
  @IsOptional()
  qeModel?: string;

  /**
   * 快排阀数量
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  qeQty?: number;

  /**
   * 快排阀描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  qeDescription?: string;

  /**
   * 气控阀品牌
   * @example 'Fisher'
   */
  @IsString()
  @IsOptional()
  pilotBrand?: string;

  /**
   * 气控阀型号
   * @example '气动'
   */
  @IsString()
  @IsOptional()
  pilotModel?: string;

  /**
   * 气控阀数量
   * @example 1
   */
  @IsNumber()
  @IsOptional()
  pilotQty?: number;

  /**
   * 气控阀描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  pilotDescription?: string;

  /**
   * 阀体阀杆尺寸
   * @example 'DN50'
   */
  @IsString()
  @IsOptional()
  valveStemSize?: string;

  /**
   * 行程
   * @example 'DN50'
   */
  @IsString()
  @IsOptional()
  stroke?: string;

  /**
   * 信号比较器品牌
   * @example '...'
   */
  @IsString()
  @IsOptional()
  signalComparatorBrand?: string;

  /**
   * 信号比较器型号
   * @example '...'
   */
  @IsString()
  @IsOptional()
  signalComparatorModel?: string;

  /**
   * 信号比较器描述
   * @example '...'
   */
  @IsString()
  @IsOptional()
  signalComparatorDescription?: string;

  /**
   * 备件
   * @example '...'
   */
  @IsString()
  @IsOptional()
  parts?: string;

  /**
   * 装置id
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  deviceId?: number;

  /**
   * 工厂id
   * @example 1
   */
  @IsNumber()
  @Type(() => Number)
  factoryId: number;

  /**
   * 分析任务id
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  analysisTaskId?: number;
}
export class QueryValveDto extends PartialType(
  IntersectionType(
    PickType(CreateValveDto, [
      'tag',
      'factoryId',
      'deviceId',
      'analysisTaskId',
    ]),
    BaseDto,
  ),
) {}

export class UpdateValveDto extends PartialType(CreateValveDto) {
  @IsNumber()
  id: number;
}

export class QueryValveListDto extends PartialType(TimeDto) {
  @IsNumber()
  @Type(() => Number)
  valveId: number;
}
