import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Intervention } from './intervention.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';

import { Device, DeviceStatus } from '../devices/device.entity';
import { SparePart } from '../parts/sparepart.entity';

@Injectable()
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepo: Repository<Intervention>,

    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,

    @InjectRepository(SparePart)
    private readonly partRepo: Repository<SparePart>,

    private readonly dataSource: DataSource, // hedhi لازمة لل transaction
  ) {}

  async create(dto: CreateInterventionDto, userId: number) {
    // transaction: ya kol chay يصير ya ma يصير chay
    const qr = this.dataSource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try {
      // 1) nثبت device mawjoud wala le
      const device = await qr.manager.findOne(Device, {
        where: { id: dto.deviceId },
      });
      if (!device) throw new NotFoundException('Device non trouvé');

      // 2) njib parts (ken fama) w nثبت stock ثم ننقص
      const partIds = dto.partIds ?? []; // ken ma fama chay => []
      const parts: SparePart[] = [];

      for (const pid of partIds) {
        const part = await qr.manager.findOne(SparePart, { where: { id: pid } });
        if (!part) throw new NotFoundException(`Pièce ${pid} non trouvée`);

        // DS يقول stock, ama enti 3andek quantity => نستعملو quantity
        const stock = (part as any).quantity ?? (part as any).stock;

        if (stock == null) {
          throw new BadRequestException('Champ stock/quantity manquant fi SparePart');
        }

        if (stock < 1) {
          throw new BadRequestException('Stock insuffisant');
        }

        // ننقص unité وحدة لكل pièce (simple w conforme scénario DS)
        if ((part as any).quantity != null) (part as any).quantity -= 1;
        if ((part as any).stock != null) (part as any).stock -= 1;

        await qr.manager.save(SparePart, part);
        parts.push(part);
      }

      // 3) nbadel status device -> REPAIRING
      device.status = DeviceStatus.REPAIRING; // hedha enum مش string
      await qr.manager.save(Device, device);

      // 4) nخلق intervention w نربطها ب user + device + parts
      const intervention = qr.manager.create(Intervention, {
        description: dto.description,
        device,
        user: { id: userId } as any, // rabt سريع (user mawjoud déjà)
        parts, // ManyToMany
      });

      const saved = await qr.manager.save(Intervention, intervention);

      await qr.commitTransaction();
      return saved;
    } catch (e) {
      await qr.rollbackTransaction();
      throw e;
    } finally {
      await qr.release();
    }
  }
}
