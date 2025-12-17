import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Intervention } from '../interventions/intervention.entity';

export enum UserRole {
  ADMIN = 'ADMIN', // admin mta3 système
  TECH = 'TECH',   // technicien
}

@Entity() // hedhi table User fi MySQL
export class User {
  @PrimaryGeneratedColumn()
  id: number; // id auto increment

  @Column({ unique: true })
  email: string; // email mta3 user, unique

  @Column()
  password: string; // password hashé

  @Column()
  username: string; // hedha username mta3 user

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TECH,
  })
  role: UserRole; // rôle mta3 user (ADMIN wala TECH)

  @OneToMany(
    () => Intervention,
    (intervention: Intervention) => intervention.technician,
  )
  interventions: Intervention[]; // interventions li 3malhom technicien
}
