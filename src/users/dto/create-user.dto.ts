import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { RegExHelper } from '../../helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password)
  password: string;

  @IsNotEmpty()
  role: string;
}
