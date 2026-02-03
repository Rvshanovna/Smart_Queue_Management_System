import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { ISuccess } from 'src/common/response.interface';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto): Promise<ISuccess> {
    const { doctorId } = createAppointmentDto;
    const existsAppointment = await this.appointmentRepo.findOne({
      where: { doctorId },
    });
    if (existsAppointment) {
      throw new ConflictException('Appointment already exists');
    }
    const newAppointment = this.appointmentRepo.create(createAppointmentDto);
    await this.appointmentRepo.save(newAppointment);
    return {
      statusCode: 201,
      message: 'success',
      data: newAppointment,
    };
  }

  async findAll(): Promise<ISuccess> {
    const appointments = await this.appointmentRepo.find();
    return {
      statusCode: 200,
      message: 'success',
      data: appointments,
    };
  }

  async findOne(id: number): Promise<ISuccess> {
    const appointment = await this.appointmentRepo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return {
      statusCode: 200,
      message: 'success',
      data: appointment,
    };
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    await this.appointmentRepo.update(id, updateAppointmentDto);
    const appointment = await this.appointmentRepo.findOneBy({ id });
    return appointment;
  }

  async remove(id: number): Promise<ISuccess> {
    await this.appointmentRepo.delete({ id });
    return {
      statusCode: 200,
      message: 'success',
      data: [],
    };
  }
}
