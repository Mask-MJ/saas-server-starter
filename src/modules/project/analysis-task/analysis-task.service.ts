import { Injectable } from '@nestjs/common';
import { CreateAnalysisTaskDto } from './dto/create-analysis-task.dto';
import { UpdateAnalysisTaskDto } from './dto/update-analysis-task.dto';

@Injectable()
export class AnalysisTaskService {
  create(createAnalysisTaskDto: CreateAnalysisTaskDto) {
    return 'This action adds a new analysisTask';
  }

  findAll() {
    return `This action returns all analysisTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analysisTask`;
  }

  update(id: number, updateAnalysisTaskDto: UpdateAnalysisTaskDto) {
    return `This action updates a #${id} analysisTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} analysisTask`;
  }
}
