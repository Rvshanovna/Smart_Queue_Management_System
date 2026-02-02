import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity()
@Unique(['patient'])
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, (patient) => patient.appointments, { eager: true })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.patients, { eager: true })
  doctor: Doctor;

  @Column({ type: 'timestamp', nullable: true })
  date?: Date;

  @Column({ default: 'scheduled' })
  status: string;
}
