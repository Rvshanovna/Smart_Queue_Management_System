import { BaseEntity } from 'src/common/BaseEntity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('specialty')
export class Specialty extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @OneToMany(() => Doctor, (doctors) => doctors.specialty)
  doctors: Doctor[];
}
