import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { ISuccess } from 'src/common/response.interface';
import { Specialty } from 'src/specialties/entities/specialty.entity';
import { CryptoService } from 'src/utils/Crypto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(Specialty)
    private readonly specialtyRepo: Repository<Specialty>,
    private readonly crypto: CryptoService,
  ) {}
  async create(createDoctorDto: CreateDoctorDto): Promise<ISuccess> {
    const { email, specialty, password } = createDoctorDto;
    const existsSpecialty = await this.specialtyRepo.findOne({
      where: { id: specialty },
    });
    if (!existsSpecialty) {
      throw new NotFoundException('Specialty not found');
    }
    const existsEmail = await this.doctorRepo.findOneBy({ email });
    if (existsEmail) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await this.crypto.decrypt(password);
    const newDoctor = this.doctorRepo.create({
      ...createDoctorDto,
      password: hashedPassword,
      specialty: existsSpecialty,
    });

    await this.doctorRepo.save(newDoctor);
    return {
      statusCode: 201,
      message: 'success',
      data: newDoctor,
    };
  }

  async findAll(): Promise<ISuccess> {
    const doctors = await this.doctorRepo.find({
      relations: ['specialty'],
      order: { created_at: 'DESC' },
      select: {
        id: true,
        fullName: true,
        password: true,
        email: true,
        specialty: {
          name: true,
          description: true,
          created_at: false,
          updatedAt: false,
        },
        experience: true,
        image: true,
        roomNumber: true,
      },
    });
    return {
      statusCode: 200,
      message: 'success',
      data: doctors,
    };
  }

  async findOne(id: number): Promise<ISuccess> {
    const doctor = await this.doctorRepo.findOne({
      where: { id },
      relations: ['specialty'],
      select: {
        specialty: {
          name: true,
          description: true,
          created_at: false,
          updatedAt: false,
        },
      },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return {
      statusCode: 200,
      message: 'success',
      data: doctor,
    };
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const { specialty } = updateDoctorDto;
    const existsDoctor = await this.doctorRepo.findOne({
      where: { id },
      relations: ['specialty'],
    });
    if (!existsDoctor) {
      throw new NotFoundException('Doctor not found');
    }
    let existsSpecialty = existsDoctor.specialty;
    if (specialty) {
      const isSpecialty = await this.specialtyRepo.findOne({
        where: { id: specialty },
      });
      if (!isSpecialty) {
        throw new NotFoundException('Specialty not found');
      }
      existsSpecialty = isSpecialty;
      delete updateDoctorDto.specialty;
    }
    await this.doctorRepo.update(id, {
      ...updateDoctorDto,
      specialty: existsSpecialty,
    });
    const doctor = await this.doctorRepo.findOne({
      where: { id },
      relations: ['specialty'],
      select: {
        specialty: {
          name: true,
          description: true,
          created_at: true,
          updatedAt: true,
        },
      },
    });

    return doctor;
  }

  async remove(id: number): Promise<ISuccess> {
    await this.doctorRepo.delete({ id });
    return {
      statusCode: 200,
      message: 'success',
      data: [],
    };
  }
}
