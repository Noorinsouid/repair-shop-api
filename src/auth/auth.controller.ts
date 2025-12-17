import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth') // hedha prefix mta3 routes: /auth
export class AuthController {
  constructor(private readonly auth: AuthService) {} // injection mta3 AuthService

  @Post('register') // POST /auth/register (inscription)
  register(@Body() dto: RegisterDto) {
    // houni nab3thou les infos lel service باش يkhalleq user jdid
    return this.auth.register(dto);
  }

  @Post('login') // POST /auth/login (connexion)
  login(@Body() dto: LoginDto) {
    // houni nverifiw email + password w nraj3ou JWT token
    return this.auth.login(dto);
  }

  @UseGuards(JwtAuthGuard) // guard يتحقق elli token mawjoud w s7i7
  @Get('me') // GET /auth/me (route protégée)
  me(@Req() req: any) {
    // req.user تجي men jwt.strategy (payload mta3 token)
    // fih id, role, iat, exp
    return req.user;
  }
}
