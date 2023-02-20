import { IsNotEmpty, Matches } from 'class-validator';
import { RegExHelper } from '../../helpers/regex.helper';

export class UpdateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password)
  password: string;

  @IsNotEmpty()
  role: string;
}
