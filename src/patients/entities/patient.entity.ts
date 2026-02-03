// src/patients/entities/patient.entity.ts
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Entity()
export class Patient extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  userName: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ type: 'int', unique: true, nullable: true })
  doctorId: number;

  // 🔹 Yangi relation: patient faqat bitta doctorga yoziladi
  @ManyToOne(() => Doctor, (doctor) => doctor.patients, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor?: Doctor;

  appointments: any;
}
