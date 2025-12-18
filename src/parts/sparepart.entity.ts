import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // hedhi table sparepart
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number; // id auto

  @Column()
  name: string; // esm el piece

  @Column({ default: 0 })
  stock: number; // 9addech stock

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number; // soum el piece
}
