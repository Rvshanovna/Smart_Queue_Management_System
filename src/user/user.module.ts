import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CryptoService } from 'src/utils/Crypto';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController],
  providers: [UserService, CryptoService, FileService],
})
export class UserModule {}
