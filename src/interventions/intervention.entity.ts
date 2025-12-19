import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Device } from '../devices/device.entity';
import { SparePart } from '../parts/sparepart.entity';

@Entity() // hedhi table Intervention fi DB
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number; // id auto

  @Column()
  description: string; // chnoua tsala7 / chnoua tsar

  @ManyToOne(() => User, { nullable: false })
  user: User; // tech li 3mel intervention (mta3 token)

  @ManyToOne(() => Device, { nullable: false })
  device: Device; // appareil li tsala7

  @ManyToMany(() => SparePart, { eager: true }) // eager باش يجيب parts مباشرة
  @JoinTable() // hedhi table pivot automatique (intervention_parts)
  parts: SparePart[]; // liste mta3 pieces li tsta3mlou fi intervention

  @CreateDateColumn()
  createdAt: Date; // date automatique
}
