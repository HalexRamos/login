import { TokenService } from './../token/token.service';
import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
    this.tokenService.save(token, user.email);
    return {
      token,
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findByEmail(email);
    } catch (error) {
      return null;
    }

    let isPasswordValid;

    if (user) {
      isPasswordValid = compareSync(password, user.password);
    }

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
