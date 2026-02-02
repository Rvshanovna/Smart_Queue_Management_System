import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CryptoService } from 'src/utils/Crypto';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/utils/Token';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoService, TokenService],
})
export class AuthModule {}
