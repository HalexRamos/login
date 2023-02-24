import { MessagesHelper } from './../../../helper/messages.helper';
import { RegExHelper } from './../../../helper/regex.helper';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;

  @IsNotEmpty()
  role: string;
}
