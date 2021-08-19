import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async findUser(username: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user) return user;
    return null;
  }

  comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
