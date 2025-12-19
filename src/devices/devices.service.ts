import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  // ajout appareil jdiiid
  create(dto: CreateDeviceDto) {
    const device = this.deviceRepo.create(dto); // نحضّر الجهاز
    return this.deviceRepo.save(device); // نسجلو في DB
  }

  // liste ta3 les appareils
  findAll() {
    return this.deviceRepo.find({ order: { id: 'DESC' } });
  }

  // nlawwej 3la appareil b id
  async findOne(id: number) {
    const device = await this.deviceRepo.findOne({ where: { id } });
    if (!device) throw new NotFoundException('Appareil non trouvé');
    return device;
  }

  // suppression (admin bark)
  async remove(id: number) {
    const device = await this.findOne(id);
    return this.deviceRepo.remove(device);
  }
}
