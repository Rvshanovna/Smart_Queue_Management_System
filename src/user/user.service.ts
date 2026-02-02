import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/common/BaseService';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'src/enum';
import { CryptoService } from 'src/utils/Crypto';
import { successRes } from 'src/utils/success-res';
import { FileService } from 'src/file/file.service';

@Injectable()
export class UserService
  extends BaseService<CreateUserDto, UpdateUserDto, User>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly crypto: CryptoService,
    private readonly fileService: FileService,
  ) {
    super(userRepo);
  }

  async onModuleInit() {
    const existsSuperAdmin = await this.getRepository.findOne({
      where: { role: Roles.SUPERADMIN },
    });
    if (!existsSuperAdmin) {
      const superAdmin = this.getRepository.create({
        username: 'malika',
        password: await this.crypto.decrypt('Malika_01!'),
        phoneNumber: '+998930379736',
        role: Roles.SUPERADMIN,
      });
      await this.getRepository.save(superAdmin);
    }
  }

  async createUser(dto: CreateUserDto, role: Roles) {
    const { username, phoneNumber, password } = dto;
    const existsUsername = await this.getRepository.findOne({
      where: { username },
    });
    if (existsUsername) {
      throw new ConflictException('Username already exists');
    }
    const existsPhone = await this.getRepository.findOne({
      where: { phoneNumber },
    });
    if (existsPhone) {
      throw new ConflictException('Phone number already exits');
    }
    const hashedPassword = await this.crypto.decrypt(password);
    const user = this.getRepository.create({
      ...dto,
      password: hashedPassword,
      role,
    });
    await this.getRepository.save(user);
    return successRes(user, 201);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.getRepository.findOne({ where: { id } });
    if (!user) {
      throw new ConflictException('User not found');
    }
    if (file) {
      if (user.image) {
        await this.fileService.delete(user.image);
      }
      const imageUrl = await this.fileService.create(file);
      user.image = imageUrl;
    }

    Object.assign(user, updateUserDto);
    await this.getRepository.save(user);

    return successRes(user);
  }
}
