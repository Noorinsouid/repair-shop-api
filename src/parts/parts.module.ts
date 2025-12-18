import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './sparepart.entity';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SparePart]), // hedhi تربط SparePart بالـ DB
  ],
  providers: [PartsService],
  controllers: [PartsController],
})
export class PartsModule {}
