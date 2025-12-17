import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // service mta3 users (DB)
    private readonly jwt: JwtService, // service mta3 JWT
  ) {}

  async register(dto: RegisterDto) {
    // houni nverifiw ken email deja mawjoud wala le
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) {
      // ken email deja mawjoud nraja3 erreur
      throw new BadRequestException('Email déjà utilisé');
    }

    // houni n3mlou hash lel password 9bal ما نkhaznouh
    const hash = await bcrypt.hash(dto.password, 10);

    // houni nخلقو user jdid role mta3ou TECH par défaut
    const user = await this.usersService.createTech({
      email: dto.email,
      username: dto.username,
      password: hash,
    });

    // nraja3ou data safe (bla password)
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  async login(dto: LoginDto) {
    // nlawjou 3al user bel email
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      // ken email ghalet
      throw new UnauthorizedException('Identifiants invalides');
    }

    // ncompariw password eli ja men request m3a eli fil DB
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) {
      // ken password ghalet
      throw new UnauthorizedException('Identifiants invalides');
    }

    // payload eli باش يتحط fil JWT
    const payload = { id: user.id, role: user.role };

    // nraja3ou JWT token
    return {
      accessToken: await this.jwt.signAsync(payload),
    };
  }
}
