import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('devices')
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  deviceType: string;

  @Column()
  os: string;

  @Column()
  browser: string;

  @Column()
  version: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUsed: Date;
}
