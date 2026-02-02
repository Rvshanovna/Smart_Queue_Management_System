import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SpecialtiesModule } from './specialties/specialties.module';
import { DoctorsModule } from './doctors/doctors.module';
import { Specialty } from './specialties/entities/specialty.entity';
import { Doctor } from './doctors/entities/doctor.entity';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envConfig.DB_URL,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Specialty, Doctor],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '..', envConfig.FILE_PATH),
      serveRoot: `/api${envConfig.FILE_PATH}`,
    }),
    UserModule,
    AuthModule,
    SpecialtiesModule,
    DoctorsModule,
    PatientsModule
  ],
})
export class AppModule {}
