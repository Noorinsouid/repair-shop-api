import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InterventionsModule } from './interventions/interventions.module';
import { DevicesModule } from './devices/devices.module';
import { PartsModule } from './parts/parts.module';

// entités mta3 TypeORM (forcées باش نتفاداو المشاكل)
import { User } from './users/user.entity';
import { Device } from './devices/device.entity';
import { SparePart } from './parts/sparepart.entity';
import { Intervention } from './interventions/intervention.entity';

@Module({
  imports: [
    // configuration connexion MySQL
    TypeOrmModule.forRoot({
      type: 'mysql', // type mta3 DB
      host: 'localhost', // serveur local
      port: 3306, // port par défaut mta3 MySQL
      username: 'root', // user mta3 DB
      password: '', // password vide (XAMPP)
      database: 'repair_shop', // esm database
      entities: [User, Device, SparePart, Intervention], // entités li نستعملوهم
      synchronize: true, // ينشئ tables automatiquement (dev seulement)
    }),

    // modules mta3 application
    UsersModule, // gestion users
    AuthModule, // auth + jwt
    InterventionsModule, // gestion interventions
    DevicesModule, // gestion devices
    PartsModule, // gestion spare parts
  ],
  controllers: [AppController], // controller principal
  providers: [AppService], // services globaux
})
export class AppModule {}
