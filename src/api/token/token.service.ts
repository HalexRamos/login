import { AuthService } from './../auth/auth.service';
import { UserService } from './../user/user.service';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';
import {
  Injectable,
  ForbiddenException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async save(hash: string, email: string) {
    const objToken = await this.tokenRepository.findOne({ where: { email } });

    if (objToken) {
      this.tokenRepository.update(objToken.id, { hash });
    } else {
      this.tokenRepository.insert({
        hash,
        email,
      });
    }
  }

  async refreshToken(oldToken: string) {
    const objToken = await this.tokenRepository.findOne({
      where: { hash: oldToken },
    });

    if (objToken) {
      const usuario = await this.userService.findByEmail(objToken.email);
      return this.authService.login(usuario);
    } else {
      throw new ForbiddenException('email already exists');
    }
  }
}
