import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInterventionDto {
  @IsString()
  @IsNotEmpty()
  description: string; // chnoua tsala7na

  @IsInt()
  deviceId: number; // id mta3 device

  @IsOptional()
  @IsArray()
  partIds?: number[]; // liste ids mta3 pieces (ex: [1,2])
}
