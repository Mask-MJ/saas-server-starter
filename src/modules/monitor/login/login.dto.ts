import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';

export class CreateLoginDto {
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsString()
  sessionId: string;

  @IsString()
  username: string;

  @IsString()
  ip: string;
}

export class QueryLoginDto extends PartialType(
  IntersectionType(PickType(CreateLoginDto, ['username']), BaseDto),
) {}
