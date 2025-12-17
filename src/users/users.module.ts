import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // hedhi باش نربط User بالـ DB
  ],
  providers: [
    UsersService, // service mta3 users
  ],
  exports: [
    UsersService, // باش AuthModule ينجم يستعملو
  ],
})
export class UsersModule {}

