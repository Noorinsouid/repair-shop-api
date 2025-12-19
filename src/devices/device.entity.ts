import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Intervention } from '../interventions/intervention.entity';

export enum DeviceStatus {
  PENDING = 'PENDING', 
  REPAIRING = 'REPAIRING', 
  READY = 'READY', 
}

export enum DeviceGrade {
  A = 'A', // comme neuf
  B = 'B', // très bon
  C = 'C', // correct
  NONE = 'NONE', // ma3andhech état
}

@Entity() // hedhi table device
export class Device {
  @PrimaryGeneratedColumn()
  id: number; // id auto

  @Column()
  serialNumber: string; // serial mta3 appareil

  @Column()
  brand: string; // marque

  @Column()
  model: string; // model

  @Column({ type: 'enum', enum: DeviceStatus, default: DeviceStatus.PENDING })
  status: DeviceStatus; // statut mta3 appareil

  @Column({ type: 'enum', enum: DeviceGrade, default: DeviceGrade.NONE })
  grade: DeviceGrade; // grade mta3 appareil

  @OneToMany(() => Intervention, (i) => i.device)
  interventions: Intervention[]; // liste interventions mta3 device
}
