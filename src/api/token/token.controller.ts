import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenService } from './token.service';
import { Controller, Put, Body } from '@nestjs/common';

@Controller('api/token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put('refresh')
  async refresh(@Body() data: RefreshTokenDto) {
    return await this.tokenService.refreshToken(data.oldToken);
  }
}
