import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phoneNumber: string;
}
