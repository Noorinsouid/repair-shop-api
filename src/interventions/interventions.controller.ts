import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InterventionsService } from './interventions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateInterventionDto } from './dto/create-intervention.dto';

@Controller('interventions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InterventionsController {
  constructor(
    private readonly interventionsService: InterventionsService,
  ) {}

  @Post()
  @Roles('TECH') // 🔥 seulement les techniciens
  create(@Body() dto: CreateInterventionDto, @Req() req: any) {
    return this.interventionsService.create(dto, req.user.id);
  }
}
