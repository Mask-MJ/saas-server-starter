import { ApiProperty } from '@nestjs/swagger';
import { AnalysisTask } from '@prisma/client';
import { FactoryEntity } from 'src/modules/project/factory/factory.entity';

export class AnalysisTaskEntity implements AnalysisTask {
  id: number;
  name: string;
  status: number;
  remark: string;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: { name: { type: 'string' }, url: { type: 'string' } },
    },
  })
  pdfs: { name: string; url: string }[];
  factoryId: number;
  factory: FactoryEntity;
  result: number[];
  ruleId: number;
  createBy: string;
  updateBy: string;
  createdAt: Date;
  updatedAt: Date;
}
