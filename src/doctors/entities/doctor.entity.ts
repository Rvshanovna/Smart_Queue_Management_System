// src/doctors/entities/doctor.entity.ts
import { BaseEntity } from 'src/common/BaseEntity';
import { Specialty } from 'src/specialties/entities/specialty.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';

@Entity('doctor')
export class Doctor extends BaseEntity {
  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'int', nullable: true })
  roomNumber?: number;

  @Column({ type: 'int', nullable: true })
  experience?: number;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.doctors, {
    eager: false,
  })
  @JoinColumn({ name: 'specialty_id' })
  specialty: Specialty;

  // 🔹 Yangi relation: doctor bir kunda ko‘plab patientlarni qabul qiladi
  @OneToMany(() => Patient, (patient) => patient.doctor)
  patients: Patient[];

  appointments: any;
}
