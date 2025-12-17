import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // hedhi تلوج على user بالemail
  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  // hedhi تجيب user بالid
  findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }

  // hedhi تعمل compte TECH (par défaut)
  createTech(data: { email: string; username: string; password: string }) {
    const user = this.usersRepo.create({
      ...data,
      role: UserRole.TECH,
    });
    return this.usersRepo.save(user);
  }

  // hedhi تعمل compte ADMIN
  createAdmin(data: { email: string; username: string; password: string }) {
    const user = this.usersRepo.create({
      ...data,
      role: UserRole.ADMIN,
    });
    return this.usersRepo.save(user);
  }
}

