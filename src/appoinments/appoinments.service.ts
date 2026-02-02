// src/appointments/appointments.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Appointment } from './entities/appoinment.entity';
import { CreateAppointmentDto } from './dto/create-appoinment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
  ) {}

  async create(patientId: number, dto: CreateAppointmentDto) {
    const patient = await this.patientRepo.findOne({ where: { id: patientId } });
    if (!patient) throw new NotFoundException('Patient not found');

    const existing = await this.appointmentRepo.findOne({
      where: { patient: { id: patientId } },
    });
    if (existing) throw new ConflictException('Patient is already assigned to a doctor');

    const doctor = await this.doctorRepo.findOne({ where: { id: dto.doctorId } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const appointment = this.appointmentRepo.create({
      patient,
      doctor,
      date: dto.date,
    });

    await this.appointmentRepo.save(appointment);
    return appointment;
  }

  async findAll() {
    return this.appointmentRepo.find({ relations: ['patient', 'doctor'] });
  }

  async findByPatient(patientId: number) {
    return this.appointmentRepo.findOne({
      where: { patient: { id: patientId } },
      relations: ['doctor'],
    });
  }
}
