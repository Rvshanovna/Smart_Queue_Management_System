import { BaseEntity } from 'src/common/BaseEntity';
import { Days } from 'src/enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class Appointment extends BaseEntity {
  @Column({ type: 'enum', enum: Days })
  day: Days;

  @Column({ type: 'int', nullable: true, unique: true })
  doctorId: number;

  @Column({ type: 'int', unique: true, nullable: true })
  patientId: number;
}
