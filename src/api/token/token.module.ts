import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './../user/user.module';
import { AuthService } from './../auth/auth.service';
import { User } from './../user/entities/user.entity';
import { UserService } from './../user/user.service';
import { TokenController } from './token.controller';
import { Token } from './entities/token.entity';
import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Token, User]),
    UserModule,
  ],
  providers: [TokenService, UserService, AuthService, JwtService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
