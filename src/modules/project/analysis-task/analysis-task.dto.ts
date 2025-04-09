import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsJSON,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateAnalysisTaskDto {
  /**
   * 任务名称
   * @example '分析任务1'
   */
  @IsString()
  name: string;
  /**
   * 状态 (0: 待执行, 1: 执行中, 2: 已完成, 3: 失败)
   * @example 1
   */
  @IsEnum([0, 1, 2, 3])
  status: number = 0;
  /**
   * pdf路径
   */
  @IsJSON()
  @Transform(({ value }) => JSON.stringify(value))
  pdfs: string;
  /**
   * 工厂ID
   * @example 1
   */
  @IsNumber()
  factoryId: number;
  /**
   * 规则ID
   * @example 1
   */
  @IsNumber()
  ruleId: number;
  /**
   * 备注
   * @example '备注'
   */
  @IsString()
  @IsOptional()
  remark?: string;
}

export class QueryAnalysisTaskDto extends PartialType(
  IntersectionType(
    PickType(CreateAnalysisTaskDto, ['name', 'status', 'factoryId']),
    BaseDto,
  ),
) {}

export class UpdateAnalysisTaskDto extends PartialType(CreateAnalysisTaskDto) {
  @IsNumber()
  id: number;
}
