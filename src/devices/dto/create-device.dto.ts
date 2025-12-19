import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string; // serial mta3 appareil

  @IsString()
  @IsNotEmpty()
  brand: string; // marque

  @IsString()
  @IsNotEmpty()
  model: string; // modèle
}
