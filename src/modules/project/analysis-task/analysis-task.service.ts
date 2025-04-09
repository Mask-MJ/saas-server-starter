import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '@/common/datebase/prisma.extension';
import {
  CreateAnalysisTaskDto,
  QueryAnalysisTaskDto,
  UpdateAnalysisTaskDto,
} from './analysis-task.dto';
import { ActiveUserData } from '@/modules/auth/interfaces/active-user-data.interface';
import { UploadDto } from '@/common/dto/base.dto';
import { MinioService } from 'src/common/minio/minio.service';
import PDFParser from 'pdf2json';
import { HttpService } from '@nestjs/axios';
import fs from 'fs';
import { firstValueFrom } from 'rxjs';
import { transformPdfData } from './task.helper';
import mockData from './mock';

@Injectable()
export class AnalysisTaskService {
  constructor(
    @Inject('PrismaService') private readonly prisma: PrismaService,
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2,
    private readonly minioClient: MinioService,
    @Inject(HttpService) private httpService: HttpService,
  ) {}

  async create(
    user: ActiveUserData,
    createAnalysisTaskDto: CreateAnalysisTaskDto,
    ip: string,
  ) {
    const analysisTask = await this.prisma.client.analysisTask.create({
      data: {
        ...createAnalysisTaskDto,
        createBy: user.username,
      },
    });
    this.eventEmitter.emit('create', {
      title: `创建名称为${analysisTask.name}的分析任务`,
      businessType: 1,
      module: '分析任务',
      username: user.username,
      ip,
    });
    return analysisTask;
  }

  async findAll(queryAnalysisTaskDto: QueryAnalysisTaskDto) {
    const { name, factoryId, page, pageSize } = queryAnalysisTaskDto;
    const [rows, meta] = await this.prisma.client.analysisTask
      .paginate({
        where: { name: { contains: name, mode: 'insensitive' }, factoryId },
        include: { factory: true },
        orderBy: { createdAt: 'desc' },
      })
      .withPages({ page, limit: pageSize, includePageCount: true });
    return { rows, ...meta };
  }

  async findOne(id: number) {
    return this.prisma.client.analysisTask.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    user: ActiveUserData,
    updateAnalysisTaskDto: UpdateAnalysisTaskDto,
  ) {
    return this.prisma.client.analysisTask.update({
      where: { id },
      data: { ...updateAnalysisTaskDto, updateBy: user.username },
    });
  }

  async remove(user: ActiveUserData, id: number, ip: string) {
    const analysisTask = await this.prisma.client.analysisTask.delete({
      where: { id },
    });
    this.eventEmitter.emit('delete', {
      title: `删除ID为${id}, 名称为${analysisTask.name}的分析任务`,
      businessType: 2,
      module: '分析任务',
      username: user.username,
      ip,
    });
    return '删除成功';
  }

  async removeAll(user: ActiveUserData, ip: string) {
    await this.prisma.client.analysisTask.deleteMany({});
    this.eventEmitter.emit('delete', {
      title: `删除所有分析任务`,
      businessType: 2,
      module: '分析任务',
      username: user.username,
      ip,
    });
    return '全部删除成功';
  }

  async upload(file: Express.Multer.File, body: UploadDto) {
    // 加上时间戳，避免文件名重复
    const fileName = `${Date.now()}-${body.fileName}`;
    await this.minioClient.uploadFile('pdf', fileName, file.buffer);
    const url = await this.minioClient.getUrl('pdf', fileName);
    const urlWithoutParams = url.split('?')[0];
    return { url: urlWithoutParams, name: fileName };
  }

  async result(id: number) {
    const analysisTask =
      await this.prisma.client.analysisTask.findUniqueOrThrow({
        where: { id },
      });
    const result = analysisTask.result;
    if (!result || result.length === 0) {
      throw new NotFoundException('分析结果不存在');
    }

    return this.prisma.client.valveOperatingData.findMany({
      where: { id: { in: result } },
    });
  }

  async execute(user: ActiveUserData, id: number) {
    const analysisTask =
      await this.prisma.client.analysisTask.findUniqueOrThrow({
        where: { id },
      });
    await this.prisma.client.analysisTask.update({
      where: { id },
      data: { status: 1 },
    });
    console.log('开始执行分析任务', analysisTask);
    // const pdfParser = new PDFParser(this, true);
    // pdfParser.on('pdfParser_dataError', (errData: any) =>
    //   console.error(errData.parserError),
    // );
    // pdfParser.on('pdfParser_dataReady', (pdfData) => {
    //   const pdfStringData: string[] = pdfData.Pages.reduce(
    //     (acc: string[], page) => {
    //       const texts = page.Texts.map((text) =>
    //         decodeURIComponent(text.R[0].T),
    //       );
    //       return [...acc, ...texts];
    //     },
    //     [],
    //   );
    //   // 写入到 json 文件中
    //   fs.writeFileSync('pdf-zh.json', JSON.stringify(pdfStringData, null, 2));
    //   transformPdfData(pdfStringData);
    // });

    // let pdfs: { name: string; url: string }[] = [];
    // if (typeof analysisTask.pdfs === 'string') {
    //   pdfs = JSON.parse(analysisTask.pdfs);
    // }
    // const { data } = await firstValueFrom(
    //   this.httpService.get(pdfs[0].url, { responseType: 'arraybuffer' }),
    // );

    // pdfParser.parseBuffer(data);
    const result = transformPdfData(mockData);
    fs.writeFileSync('pdf-zh.json', JSON.stringify(result, null, 2));

    return '分析任务执行成功';
  }
}
