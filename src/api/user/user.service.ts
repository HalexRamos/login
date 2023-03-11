import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'phone',
        'role',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    });
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository.findOne({
        where: { id },
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'phone',
          'role',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        select: [
          'id',
          'firstName',
          'lastName',
          'email',
          'phone',
          'role',
          'password',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto) {
    const userAlreadyExists = await this.findByEmail(data.email);
    if (userAlreadyExists) {
      throw new ForbiddenException('email already exists');
    } else {
      const user = await this.userRepository.create(data);
      return await this.userRepository.save(user);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneById(id);
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async destroy(id: string) {
    await this.userRepository.findOneById(id);
    this.userRepository.softDelete(id);
  }
}
