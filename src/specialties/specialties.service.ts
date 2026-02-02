import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Repository } from 'typeorm';
import { ISuccess } from 'src/common/response.interface';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepo: Repository<Specialty>,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<ISuccess> {
    const { name } = createSpecialtyDto;
    const existSpecialty = await this.specialtyRepo.findOne({
      where: { name },
    });
    if (existSpecialty) {
      throw new ConflictException('Specialty already exists');
    }
    const newSpecialty = this.specialtyRepo.create(createSpecialtyDto);
    await this.specialtyRepo.save(newSpecialty);
    return {
      statusCode: 201,
      message: 'success',
      data: newSpecialty,
    };
  }

  async findAll(): Promise<ISuccess> {
    const specialties = await this.specialtyRepo.find({
      relations: ['doctors'],
    });
    return {
      statusCode: 200,
      message: 'success',
      data: specialties,
    };
  }

  async findOne(id: number): Promise<ISuccess> {
    const specialty = await this.specialtyRepo.findOne({
      where: { id },
      relations: ['doctors'],
    });
    if (!specialty) {
      throw new NotFoundException('Specailty not found');
    }
    return {
      statusCode: 200,
      message: 'success',
      data: specialty,
    };
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    await this.specialtyRepo.update(id, updateSpecialtyDto);
    const specialty = await this.specialtyRepo.findOneBy({ id });
    return specialty;
  }

  async remove(id: number): Promise<ISuccess> {
    await this.specialtyRepo.delete({ id });
    return {
      statusCode: 200,
      message: 'success',
      data: [],
    };
  }
}
