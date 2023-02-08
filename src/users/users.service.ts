import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    bcrypt.hash(createUserDto.password, 10, (error: any, hash: string) => {
      createUserDto.password = hash;
      return this.userModel.create(createUserDto as any);
    });
  }

  findAll() {
    return this.userModel.findAll({
      where: {
        deleted_at: null,
      },
    });
  }

  findOne(id: string) {
    return this.userModel.findOne({
      where: {
        id,
        deleted_at: null,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    bcrypt.hash(updateUserDto.password, 10, (error: any, hash: string) => {
      updateUserDto.password = hash;
      return this.userModel.update(updateUserDto, {
        where: { id, deleted_at: null },
      });
    });
  }

  undoRemove(id: string) {
    return this.userModel.restore({
      where: { id },
    });
  }

  remove(id: string) {
    return this.userModel.destroy({
      where: { id },
    });
  }
}
