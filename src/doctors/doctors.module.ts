import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Specialty } from 'src/specialties/entities/specialty.entity';
import { CryptoService } from 'src/utils/Crypto';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Specialty])],
  controllers: [DoctorsController],
  providers: [DoctorsService, CryptoService, FileService],
})
export class DoctorsModule {}
