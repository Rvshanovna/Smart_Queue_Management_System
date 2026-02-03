import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { ISuccess } from 'src/common/response.interface';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<ISuccess> {
    const { userName } = createPatientDto;
    const existsPatient = await this.patientRepo.findOne({
      where: { userName },
    });
    if (existsPatient) {
      throw new ConflictException('Patient already exists');
    }
    const newPatient = this.patientRepo.create(createPatientDto);
    await this.patientRepo.save(newPatient);
    return {
      statusCode: 201,
      message: 'success',
      data: newPatient,
    };
  }

  async findAll(): Promise<ISuccess> {
    const patients = await this.patientRepo.find();
    return {
      statusCode: 200,
      message: 'success',
      data: patients,
    };
  }

  async findOne(id: number): Promise<ISuccess> {
    const patient = await this.patientRepo.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return {
      statusCode: 200,
      message: 'success',
      data: patient,
    };
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    await this.patientRepo.update(id, updatePatientDto);
    const patient = await this.patientRepo.findOneBy({ id });
    return patient;
  }

  async remove(id: number): Promise<ISuccess> {
    await this.patientRepo.delete({ id });
    return {
      statusCode: 200,
      message: 'success',
      data: [],
    };
  }
}
